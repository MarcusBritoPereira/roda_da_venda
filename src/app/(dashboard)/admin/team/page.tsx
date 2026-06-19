import React from "react";
import TeamManagementPage from "@/components/admin/TeamManagement";
import { createClient } from "@/lib/supabase/server";

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div>Acesso negado.</div>;

  // Buscar perfil para pegar o company_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id, role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="p-12 text-center">
         <h1 className="text-2xl font-black italic uppercase">Acesso Restrito</h1>
         <p className="text-ui-muted text-xs uppercase font-bold mt-2">Apenas administradores da organização podem gerenciar o time.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-6xl mx-auto">
        <TeamManagementPage companyId={profile.company_id} />
      </div>
    </div>
  );
}
