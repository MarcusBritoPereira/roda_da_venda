import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TeamMemberCard } from "@/components/leader/TeamMemberCard";
import { LeaderToolbar } from "@/components/leader/LeaderToolbar";
import { getTeamMembers, getTeamStats } from "@/actions/leader";
import { getAreas } from "@/actions/evaluations";
import { Users, ArrowUpRight } from "lucide-react";

export default async function LeaderDashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ area?: string }> 
}) {
  const { area: selectedAreaId } = await searchParams;
  const allMembers = await getTeamMembers();
  const stats = await getTeamStats();
  const areas = await getAreas();

  // Filtro lógico simples para o protótipo/MVP
  // Em produção, isso seria filtrado diretamente na query do banco
  const members = selectedAreaId 
    ? allMembers.filter(m => m.id === selectedAreaId || Math.random() > 0.5) // Simulação de filtro
    : allMembers;

  return (
    <DashboardLayout>
      {/* Header com Stats Rápidas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-sm font-bold text-muted uppercase tracking-[0.4em] mb-2">Gestão de Equipe</h1>
          <h2 className="text-4xl font-black italic uppercase text-foreground">Dashboard do Líder</h2>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none p-4 bg-surface border border-border-vulp flex items-center gap-4 rounded-xl">
            <div className="p-2 bg-vulp-brand/10 text-vulp-brand">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Time Ativo</p>
              <p className="text-xl font-black text-foreground">{stats.activeSellers} Membros</p>
            </div>
          </div>
          <div className="flex-1 md:flex-none p-4 bg-surface border border-border-vulp flex items-center gap-4 rounded-xl">
            <div className="p-2 bg-status-train/10 text-status-train">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Pendências</p>
              <p className="text-xl font-black text-foreground">{stats.pendingReviews} Calibragens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Ações */}
      <LeaderToolbar areas={areas} teamData={members} />

      {/* Grid de Membros */}
      <div className="grid md:grid-cols-2 gap-8">
        {members.length > 0 ? members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        )) : (
          // Mock para visualização se não houver time no banco
          <>
            <TeamMemberCard member={{ id: '1', full_name: 'André Silveira' }} />
            <TeamMemberCard member={{ id: '2', full_name: 'Beatriz Santos' }} />
            <TeamMemberCard member={{ id: '3', full_name: 'Carlos Mendes' }} />
            <TeamMemberCard member={{ id: '4', full_name: 'Daniela Lima' }} />
          </>
        )}
      </div>

      {/* Seção de Insights do Time */}
      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none bg-vulp-brand shadow-glow-purple rounded-xl p-8 flex items-center gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10 space-y-4 max-w-lg">
            <h3 className="text-2xl font-black italic uppercase tracking-tight leading-none text-white">Insight do Ciclo: <br/>Foco em Follow-up</h3>
            <p className="text-white/90 text-sm leading-relaxed font-medium">
              O time apresenta uma autoavaliação 25% superior aos dados reais de CRM em &quot;Follow-up&quot;. 
              Recomendamos uma reunião de alinhamento sobre o preenchimento da ferramenta para evitar disparidades no Fator Realidade.
            </p>
            <Button className="bg-vulp-void text-white hover:bg-vulp-void/80 border-none uppercase text-xs font-bold tracking-widest rounded-lg px-8 shadow-2xl">
              Ver Análise Completa
            </Button>
          </div>
        </Card>

        <Card className="vulp-card p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl italic font-black uppercase text-foreground">Top Área</CardTitle>
            <CardDescription className="text-vulp-brand font-bold uppercase text-[10px] tracking-widest">Melhor Desempenho do Time</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-end gap-2">
              <span className="text-6xl font-black italic tracking-tighter">8.2</span>
              <span className="text-ui-muted text-sm mb-2 font-mono">/ 10</span>
            </div>
            <p className="text-lg font-bold mt-4 uppercase">Abordagem de Clientes</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
