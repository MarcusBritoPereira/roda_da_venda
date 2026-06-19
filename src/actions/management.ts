'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Cadastra uma nova empresa no sistema.
 */
export async function createCompany(name: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('companies')
    .insert([{ name, slug: name.toLowerCase().replace(/ /g, '-') }])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar empresa:', error);
    throw new Error('Falha ao criar empresa');
  }

  return data;
}

/**
 * Cadastra um membro da equipe (Líder ou Vendedor).
 * Nota: Em um sistema real, isso enviaria um convite. Aqui, criamos o perfil vinculado.
 */
export async function createProfile({ 
  name, 
  email, 
  role, 
  company_id 
}: { 
  name: string, 
  email: string, 
  role: 'leader' | 'seller', 
  company_id: string 
}) {
  const supabase = await createClient();

  // 1. Criamos um usuário "placeholder" ou apenas o perfil se o sistema permitir
  // Para simplificar a transcrição, vamos focar na tabela de perfis que alimenta o dashboard
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { 
        full_name: name, 
        email: email.toLowerCase(), 
        role, 
        company_id,
        status: 'active'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar perfil:', error);
    throw new Error(`Falha ao criar perfil: ${name}`);
  }

  return data;
}

/**
 * Cria um ciclo de avaliação ativo para a empresa.
 */
export async function createInitialCycle(company_id: string, name: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('cycles')
    .insert([
      { 
        name, 
        company_id, 
        status: 'active',
        start_date: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) throw new Error('Falha ao criar ciclo');
  return data;
}

/**
 * Busca todos os membros da equipe de uma empresa.
 */
export async function getCompanyTeam(company_id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('company_id', company_id)
    .order('full_name', { ascending: true });

  if (error) return [];
  return data;
}
