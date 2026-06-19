import React from "react";
import { getAreas, getActiveCycle } from "@/actions/evaluations";
import { getCompanyTeam } from "@/actions/management";
import { ManualTranscriptionForm } from "@/components/admin/ManualTranscriptionForm";
import { createClient } from "@/lib/supabase/server";

export default async function TranscribePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return <div>Acesso negado.</div>;

  // Buscar perfil para pegar o company_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', user.id)
    .single();

  if (!profile) return <div>Empresa não encontrada.</div>;

  const areas = await getAreas();
  const sellers = await getCompanyTeam(profile.company_id);
  const activeCycle = await getActiveCycle();

  if (!activeCycle) return (
    <div className="p-12 text-center">
       <h1 className="text-2xl font-black italic uppercase">Nenhum ciclo ativo</h1>
       <p className="text-ui-muted text-xs uppercase font-bold mt-2">Crie um novo ciclo no painel administrativo antes de transcrever.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black italic uppercase text-foreground">Transcrição de Consultoria</h1>
            <p className="text-xs text-ui-muted uppercase font-black tracking-widest mt-1">Digitalização de avaliações físicas (Papel para Digital)</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Ciclo Ativo</p>
             <p className="text-sm font-bold text-vulp-brand">{activeCycle.name}</p>
          </div>
        </div>

        <ManualTranscriptionForm 
          sellers={sellers} 
          areas={areas} 
          companyId={profile.company_id} 
          cycleId={activeCycle.id} 
        />
      </div>
    </div>
  );
}
