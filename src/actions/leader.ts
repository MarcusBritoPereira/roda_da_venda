'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { autoAssignPDI } from './automation'

export async function getTeamMembers() {
  const supabase = await createClient()
  
  // 1. Obter ID do líder logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado')

  // 2. Buscar membros do time (sellers vinculados a este leader_id)
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      role,
      avatar_url,
      evaluations (
        self_score,
        leader_score,
        calibrated_score,
        area_id
      )
    `)
    .eq('leader_id', user.id)
    .eq('role', 'seller')

  if (error) throw error
  return data
}

export async function saveLeaderCalibration(
  evaluationId: string, 
  calibrations: Array<{ areaId: string; areaName: string; score: number; comment: string }>
) {
  const supabase = await createClient()
  
  // 1. Validar ID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(evaluationId);
  
  if (!isUuid) {
    console.warn(`[Mock Mode] Simulando salvamento de ${calibrations.length} áreas`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: "Modo demonstração: Análise concluída e PDIs vinculados." };
  }

  // 2. Buscar dados da avaliação (seller_id)
  const { data: evalData } = await supabase
    .from('evaluations')
    .select('seller_id')
    .eq('id', evaluationId)
    .single()

  if (!evalData) throw new Error('Avaliação não encontrada')

  // 3. Atualizar cada área (No banco real, isso seria uma tabela de junção ou JSONB)
  // Para simplificar no protótipo, atualizamos a nota final e o comentário principal
  // Em uma estrutura robusta, salvaríamos cada nota individualmente.
  
  // Identificar a pior área para o PDI
  const worstArea = calibrations.reduce((prev, curr) => (prev.score < curr.score) ? prev : curr);

  const { error } = await supabase
    .from('evaluations')
    .update({
      leader_score: worstArea.score, // Registramos o score mais crítico no cabeçalho
      leader_comment: `Foco em: ${worstArea.areaName}. ${worstArea.comment}`,
    })
    .eq('id', evaluationId)

  if (error) {
    console.error('Erro ao salvar calibragem:', error);
    return { success: false, error: error.message };
  }

  // 4. Disparar automação de PDI para a pior área
  await autoAssignPDI(evalData.seller_id, worstArea.areaName, worstArea.score);

  revalidatePath('/leader')
  return { success: true };
}

export async function getTeamStats() {
  // Mock ou consulta complexa de agregação para média do time
  return {
    avgScore: 6.8,
    pendingReviews: 4,
    activeSellers: 12,
    topArea: 'Abordagem'
  }
}
