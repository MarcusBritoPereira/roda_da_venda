'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Lógica de Automação: Atribui PDIs baseados na nota de calibragem
 */
export async function autoAssignPDI(sellerId: string, areaName: string, score: number) {
  const supabase = await createClient()

  // Critério: Nota menor que 7 dispara o PDI automático
  if (score >= 7) return;

  // 1. Buscar o template para esta área
  const { data: template, error: templateError } = await supabase
    .from('pdi_templates')
    .select('*')
    .eq('area_name', areaName)
    .single()

  if (templateError || !template) return;

  // 2. Criar missões baseadas no template
  const missions = template.missions as string[]
  
  const pdiEntries = missions.map(missionTitle => ({
    seller_id: sellerId,
    title: `MISSÃO: ${missionTitle}`,
    description: `Recurso sugerido: ${template.book_suggestion}. Assista ao TED Talk: ${template.ted_talk_url}`,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias de prazo
    status: 'pending'
  }))

  const { error: insertError } = await supabase
    .from('pdis')
    .insert(pdiEntries)

  if (insertError) console.error('Erro ao atribuir PDI automático:', insertError)
}
