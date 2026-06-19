'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createCompany, createInitialCycle } from './management'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/login?error=Invalid credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

/**
 * Registro SaaS: Cria Usuário + Empresa + Perfil Admin + Ciclo Inicial
 */
export async function registerSaaS(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const fullName = formData.get('full_name') as string
  const companyName = formData.get('company_name') as string

  if (password !== confirmPassword) {
    return redirect('/register?error=As senhas não coincidem')
  }

  // 1. Criar Usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })

  if (authError) {
    return redirect(`/register?error=${encodeURIComponent(authError.message)}`)
  }

  const userId = authData.user?.id
  if (!userId) {
    return redirect('/register?error=Falha na criação do usuário')
  }

  try {
    // 2. Criar a Empresa
    const company = await createCompany(companyName)

    // 3. Criar o Perfil de Administrador
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          full_name: fullName,
          email: email.toLowerCase(),
          role: 'admin',
          company_id: company.id,
          status: 'active'
        }
      ])

    if (profileError) throw profileError

    // 4. Criar Ciclo Inicial
    await createInitialCycle(company.id, "Ciclo de Lançamento")

  } catch (err) {
    console.error('Erro no registro SaaS:', err)
    return redirect('/register?error=Erro ao configurar sua empresa. Entre em contato com o suporte.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
