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

export async function saveLeaderCalibration(evaluationId: string, leaderScore: number, comment: string) {
  const supabase = await createClient()
  
  // 1. Buscar dados da avaliação para a automação
  const { data: evalData } = await supabase
    .from('evaluations')
    .select('seller_id, areas(name)')
    .eq('id', evaluationId)
    .single()

  // 2. Atualizar a nota do líder
  const { error } = await supabase
    .from('evaluations')
    .update({
      leader_score: leaderScore,
      leader_comment: comment,
    })
    .eq('id', evaluationId)

  if (error) throw error

  // 3. Disparar automação de PDI se necessário
  if (evalData && evalData.areas) {
    await autoAssignPDI(evalData.seller_id, (evalData.areas as { name?: string }).name, leaderScore)
  }

  revalidatePath('/leader')
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
