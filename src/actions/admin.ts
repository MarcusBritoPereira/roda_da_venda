'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCycle(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const startDate = formData.get('start_date') as string
  const endDate = formData.get('end_date') as string

  const { error } = await supabase
    .from('cycles')
    .insert({
      name,
      start_date: startDate,
      end_date: endDate,
      company_id: (await supabase.auth.getUser()).data.user?.user_metadata.company_id // Exemplo simplificado
    })

  if (error) throw error
  revalidatePath('/admin/cycles')
}

export async function getCycles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cycles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function updateRealityFactor(areaId: string, cycleId: string, threshold: number, maxScore: number) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('reality_factor_rules')
    .upsert({
      cycle_id: cycleId,
      area_id: areaId,
      threshold,
      max_score_allowed: maxScore,
      metric_key: 'custom_metric' // Placeholder
    }, { onConflict: 'cycle_id,area_id' })

  if (error) throw error
  revalidatePath('/admin/cycles')
}
