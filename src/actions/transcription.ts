'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Salva uma transcrição manual vinda do papel.
 * Cria a avaliação já calibrada com os dois conjuntos de notas.
 */
export async function saveManualTranscription({
  seller_id,
  company_id,
  cycle_id,
  scores
}: {
  seller_id: string;
  company_id: string;
  cycle_id: string;
  scores: any[]; // Array de { area_id, self_score, leader_score, comment }
}) {
  const supabase = await createClient();

  // 1. Calcular médias para o resumo
  const avgSelf = scores.reduce((acc, s) => acc + s.self_score, 0) / scores.length;
  const avgLeader = scores.reduce((acc, s) => acc + s.leader_score, 0) / scores.length;

  // 2. Criar a avaliação principal
  const { data: evaluation, error: evalError } = await supabase
    .from('evaluations')
    .insert([
      {
        seller_id,
        company_id,
        cycle_id,
        self_score: avgSelf,
        calibrated_score: avgLeader,
        status: 'completed',
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (evalError) throw evalError;

  // 3. Salvar as notas detalhadas por área
  const areaNotes = scores.map(s => ({
    evaluation_id: evaluation.id,
    area_id: s.area_id,
    self_score: s.self_score,
    leader_score: s.leader_score,
    leader_comment: s.comment || "Transcrição manual de consultoria."
  }));

  const { error: notesError } = await supabase
    .from('evaluation_areas')
    .insert(areaNotes);

  if (notesError) throw notesError;

  // 4. Lógica de PDI Automático: Identificar o maior Gap Negativo
  // (Onde o Líder deu a menor nota)
  const worstArea = scores.sort((a, b) => a.leader_score - b.leader_score)[0];
  
  await supabase
    .from('pdis')
    .insert([
      {
        seller_id,
        company_id,
        evaluation_id: evaluation.id,
        area_id: worstArea.area_id,
        title: `Missão: Dominar ${worstArea.area_name}`,
        description: `Com base no diagnóstico de consultoria, esta foi identificada como a área de maior prioridade para evolução imediata.`,
        status: 'active',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
      }
    ]);

  revalidatePath('/admin');
  revalidatePath('/leader');
  return { success: true, evaluationId: evaluation.id };
}
