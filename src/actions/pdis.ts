'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMyPDIs() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado')

  const { data, error } = await supabase
    .from('pdis')
    .select('*')
    .eq('seller_id', user.id)
    .order('deadline', { ascending: true })

  if (error) return []
  return data
}

export async function updatePDIStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('pdis')
    .update({ status })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
}
