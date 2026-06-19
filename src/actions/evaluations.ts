'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Busca o ciclo de avaliação que está 'open' para a empresa do usuário.
 * Risco Mitigado: Evita salvar dados em ciclos inexistentes ou fechados.
 */
export async function getActiveCycle() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Primeiro buscamos a empresa do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  const { data, error } = await supabase
    .from('cycles')
    .select('*')
    .eq('company_id', profile.company_id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Erro ao buscar ciclo ativo:', error);
    return null;
  }

  return data;
}

/**
 * Busca todas as áreas (competências) cadastradas para a empresa.
 * Risco Mitigado: Garante que o formulário sempre tenha campos válidos.
 */
export async function getAreas() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', user.id)
    .single();

  if (!profile) return [];

  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('company_id', profile.company_id)
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro ao buscar áreas:', error);
    return [];
  }

  return data;
}

/**
 * Busca a última avaliação do vendedor logado.
 */
export async function getLatestEvaluation() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('evaluations')
    .select('*')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Erro ao buscar última avaliação:', error);
    return null;
  }

  return data;
}

/**
 * Submete uma nova avaliação.
 * Risco Mitigado: Idempotência e vinculação correta de IDs.
 */
export async function submitEvaluation(formData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', user.id)
    .single();

  if (!profile) throw new Error("Perfil não encontrado");

  const activeCycle = await getActiveCycle();
  if (!activeCycle) throw new Error("Nenhum ciclo ativo encontrado.");

  const { error } = await supabase
    .from('evaluations')
    .insert([
      {
        ...formData,
        seller_id: user.id,
        cycle_id: activeCycle.id,
        company_id: profile.company_id
      }
    ]);

  if (error) {
    console.error('Erro ao submeter avaliação:', error);
    throw new Error("Falha ao salvar avaliação no banco.");
  }

  revalidatePath('/dashboard');
  return { success: true };
}
