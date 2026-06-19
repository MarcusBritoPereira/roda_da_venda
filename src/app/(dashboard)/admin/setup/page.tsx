'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createCompany, createProfile, createInitialCycle } from "@/actions/management";
import { Zap, Users, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SetupConsultancyPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [leadersRaw, setLeadersRaw] = useState("");
  const [sellersRaw, setSellersRaw] = useState("");
  const router = useRouter();

  async function handleSetup() {
    if (!companyName) return alert("Nome da empresa é obrigatório");
    
    setLoading(true);
    try {
      // 1. Criar Empresa
      const company = await createCompany(companyName);

      // 2. Criar Ciclo Inicial
      await createInitialCycle(company.id, "Ciclo Inicial - " + companyName);

      // 3. Processar Líderes
      const leaders = leadersRaw.split("\n").filter(n => n.trim());
      for (const name of leaders) {
        await createProfile({
          name: name.trim(),
          email: `${name.trim().toLowerCase().replace(/ /g, '.')}@vulp.com.br`,
          role: 'leader',
          company_id: company.id
        });
      }

      // 4. Processar Vendedores
      const sellers = sellersRaw.split("\n").filter(n => n.trim());
      for (const name of sellers) {
        await createProfile({
          name: name.trim(),
          email: `${name.trim().toLowerCase().replace(/ /g, '.')}@vulp.com.br`,
          role: 'seller',
          company_id: company.id
        });
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (error) {
      console.error(error);
      alert("Erro no setup. Verifique os logs.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <CheckCircle2 size={80} className="text-status-promote mx-auto mb-6" />
          <h1 className="text-4xl font-black italic uppercase text-white mb-2">Empresa Cadastrada!</h1>
          <p className="text-ui-muted uppercase tracking-widest text-xs font-bold">Redirecionando para o Painel de Controle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
          <div className="w-12 h-12 bg-vulp-brand rounded-xl flex items-center justify-center font-black text-2xl shadow-glow-electric">V</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase italic">Setup de Consultoria</h1>
            <p className="text-xs text-ui-muted uppercase font-black tracking-widest mt-1">Implementação Rápida da Roda da Venda</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="vulp-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="text-vulp-brand" size={20} />
                <h2 className="text-sm font-black uppercase tracking-widest">Dados da Organização</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-ui-muted uppercase mb-2 block">Nome da Empresa</label>
                  <input 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: Vulp Automotive"
                    className="vulp-input w-full"
                  />
                </div>
              </div>
            </Card>

            <Card className="vulp-card p-6 border-l-4 border-l-vulp-brand">
               <div className="flex items-center gap-3 mb-4">
                  <Zap className="text-vulp-brand" size={20} />
                  <h3 className="text-xs font-bold uppercase italic">Dica de Especialista</h3>
               </div>
               <p className="text-[10px] text-ui-muted leading-relaxed uppercase font-bold">
                 Cadastre todos agora para liberar a transcrição das notas de papel. O sistema gerará e-mails automáticos temporários para cada membro.
               </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="vulp-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-vulp-brand" size={20} />
                <h2 className="text-sm font-black uppercase tracking-widest">Time de Vendas (1 Nome por Linha)</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-ui-muted uppercase mb-2 block">Líderes / Gestores</label>
                  <textarea 
                    value={leadersRaw}
                    onChange={(e) => setLeadersRaw(e.target.value)}
                    rows={3}
                    placeholder="Ex: Marcus Rodrigo"
                    className="vulp-input w-full min-h-[100px] py-3"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-ui-muted uppercase mb-2 block">Vendedores</label>
                  <textarea 
                    value={sellersRaw}
                    onChange={(e) => setSellersRaw(e.target.value)}
                    rows={6}
                    placeholder="Ex: André Silva&#10;João Pereira"
                    className="vulp-input w-full min-h-[200px] py-3"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSetup}
                disabled={loading}
                className="w-full btn-vulp mt-8 py-6 text-sm"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" />}
                FINALIZAR SETUP E INICIAR CONSULTORIA
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
