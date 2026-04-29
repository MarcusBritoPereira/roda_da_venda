'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const evaluationSchema = z.object({
  cycle_id: z.string().uuid(),
  scores: z.record(z.string().uuid(), z.number().min(1).max(10)),
  justifications: z.record(z.string().uuid(), z.string().optional()),
})

export async function submitEvaluation(formData: FormData) {
  const supabase = await createClient()
  
  // 1. Obter usuário logado
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Não autorizado')

  // 2. Parse dos dados (Simplificado para o exemplo, em produção usaríamos um loop pelos campos)
  const cycleId = formData.get('cycle_id') as string
  const scores: Record<string, number> = {}
  const justifications: Record<string, string> = {}

  // Extrair scores do FormData (formato area_ID)
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('score_')) {
      const areaId = key.replace('score_', '')
      scores[areaId] = Number(value)
    }
    if (key.startsWith('justification_')) {
      const areaId = key.replace('justification_', '')
      justifications[areaId] = value as string
    }
  }

  // 3. Salvar cada área na tabela evaluations
  const entries = Object.entries(scores).map(([areaId, score]) => ({
    cycle_id: cycleId,
    seller_id: user.id,
    area_id: areaId,
    self_score: score,
    justification: justifications[areaId] || '',
  }))

  const { error: insertError } = await supabase
    .from('evaluations')
    .insert(entries)

  if (insertError) {
    console.error('Erro ao salvar avaliação:', insertError)
    throw new Error('Falha ao salvar os dados no banco')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=Avaliação enviada com sucesso')
}

export async function getAreas() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export async function getActiveCycle() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cycles')
    .select('*')
    .eq('status', 'open')
    .single()
  
  if (error) return null
  return data
}
