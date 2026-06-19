import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getTeamMembers } from "@/actions/leader";
import { CheckCircle2, Clock, PlayCircle, Trophy, ArrowRight, Zap, TrendingUp, AlertCircle, BarChart3, Users } from "lucide-react";
import Link from "next/link";

export default async function LeaderPDITrackingPage() {
  const members = await getTeamMembers();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-sm font-bold text-muted uppercase tracking-[0.4em] mb-2">Monitoramento de Evolução</h1>
          <h2 className="text-4xl font-black italic uppercase text-foreground">Acompanhamento de PDIs</h2>
        </div>
        <Button className="btn-vulp">Atribuir Nova Missão</Button>
      </div>

      {/* Top Widgets - Preenchendo o espaço nobre */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card className="vulp-card p-6 border-l-4 border-l-vulp-brand">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-vulp-brand/10 text-vulp-brand rounded-lg"><PlayCircle size={24} /></div>
              <div>
                 <p className="text-[10px] text-muted uppercase font-bold tracking-widest">PDIs Ativos</p>
                 <p className="text-2xl font-black italic text-foreground">08</p>
              </div>
           </div>
        </Card>
        <Card className="vulp-card p-6 border-l-4 border-l-status-promote">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-status-promote/10 text-status-promote rounded-lg"><Zap size={24} /></div>
              <div>
                 <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Aceleração Média</p>
                 <p className="text-2xl font-black italic text-foreground">+14%</p>
              </div>
           </div>
        </Card>
        <Card className="vulp-card p-6 border-l-4 border-l-status-train">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-status-train/10 text-status-train rounded-lg"><AlertCircle size={24} /></div>
              <div>
                 <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Gargalos Críticos</p>
                 <p className="text-2xl font-black italic text-foreground">03</p>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coluna Principal: Progresso Individual */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={14} className="text-vulp-brand" /> Progresso Individual do Time
            </h3>
            
            {members && members.length > 0 ? (
              <div className="space-y-4">
                {members.map((member) => (
                  <Card key={member.id} className="vulp-card overflow-hidden group hover:border-vulp-brand/50 transition-all">
                    <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                      <div className="w-14 h-14 rounded-full bg-vulp-brand/10 border border-vulp-brand/20 flex items-center justify-center font-black text-xl text-vulp-brand italic">
                        {member.full_name.substring(0, 1)}
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tight text-foreground">{member.full_name}</h3>
                            <p className="text-[10px] text-muted uppercase font-bold tracking-widest italic">Performance em Calibragem</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Aderência ao PDI</p>
                             <p className="text-xl font-black text-vulp-brand">75%</p>
                          </div>
                        </div>
                        
                        <div className="w-full bg-border-vulp h-2 rounded-full overflow-hidden">
                          <div className="bg-vulp-brand h-full shadow-glow-purple transition-all duration-1000" style={{ width: '75%' }} />
                        </div>

                        <div className="flex gap-6 mt-4">
                          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted">
                            <CheckCircle2 size={12} className="text-vulp-brand" /> 3 Missões Batidas
                          </div>
                          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted">
                            <Clock size={12} className="text-status-train" /> 1 Ativa
                          </div>
                        </div>
                      </div>
                      <div className="md:border-l border-border-vulp pl-6 flex items-center h-full">
                         <Link href={`/leader/pdi-tracking/${member.id}`}>
                          <Button variant="ghost" className="text-vulp-brand hover:bg-vulp-brand/10 font-bold uppercase text-[10px] tracking-tighter">
                            Gerenciar <ArrowRight size={14} className="ml-2" />
                          </Button>
                         </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="vulp-card p-12 text-center border-dashed border-2 border-border-vulp bg-transparent">
                 <div className="max-w-xs mx-auto space-y-4">
                    <div className="w-16 h-16 bg-vulp-brand/5 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Users size={32} className="text-vulp-brand opacity-20" />
                    </div>
                    <h4 className="text-sm font-black uppercase italic text-foreground">Nenhuma Calibragem Realizada</h4>
                    <p className="text-xs text-ui-muted leading-relaxed">Para visualizar o progresso, você precisa primeiro realizar a calibragem de um vendedor no dashboard principal.</p>
                    <Link href="/leader" className="inline-block mt-4">
                       <Button variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">Ir para Dashboard</Button>
                    </Link>
                 </div>
              </Card>
            )}
          </div>

          {/* Heatmap de Competências do Time */}
          <Card className="vulp-card p-8 bg-gradient-to-br from-ui-surface/50 to-background">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 size={14} className="text-vulp-brand" /> Mapa de Calor de Gaps (Equipe)
                </h3>
                <Badge variant="train">Visão Mensal</Badge>
             </div>
             <div className="space-y-4">
                {[
                  { area: "Follow-up", gap: 85, color: "bg-status-critical" },
                  { area: "Fechamento", gap: 60, color: "bg-status-train" },
                  { area: "Abordagem", gap: 30, color: "bg-status-promote" },
                  { area: "CRM/Processo", gap: 15, color: "bg-vulp-brand" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                      <span className="text-foreground">{item.area}</span>
                      <span className="text-muted">{item.gap}% de Gap</span>
                    </div>
                    <div className="w-full bg-border-vulp/30 h-1.5 rounded-full overflow-hidden">
                       <div className={`${item.color} h-full`} style={{ width: `${item.gap}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>

        {/* Coluna Direita: Sidebar Analítica */}
        <div className="space-y-8">
          <Card className="rounded-none border-vulp-brand/30 bg-vulp-brand/5 p-8">
            <CardHeader className="p-0 mb-6">
              <Trophy size={32} className="text-vulp-brand mb-4 opacity-50" />
              <CardTitle className="text-xl font-black italic uppercase">Elite do Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
               <div className="flex justify-between items-center text-xs border-b border-ui-border/30 pb-2">
                 <span className="text-ui-muted uppercase font-bold tracking-widest">1. André Silveira</span>
                 <span className="font-mono font-bold text-vulp-lilac">100%</span>
               </div>
               <div className="flex justify-between items-center text-xs border-b border-ui-border/30 pb-2">
                 <span className="text-ui-muted uppercase font-bold tracking-widest">2. Beatriz Santos</span>
                 <span className="font-mono font-bold text-vulp-lilac">80%</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-ui-muted uppercase font-bold tracking-widest">3. Daniela Lima</span>
                 <span className="font-mono font-bold text-vulp-lilac">75%</span>
               </div>
            </CardContent>
          </Card>

          <Card className="vulp-card p-8">
            <h4 className="text-[10px] text-muted uppercase font-bold tracking-widest mb-6 text-center">Adesão Média da Equipe</h4>
            <div className="relative w-full h-48 flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-border-vulp" />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 68) / 100}
                  strokeLinecap="round"
                  className="text-vulp-brand shadow-glow-purple transition-all duration-1000"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-3xl font-black italic text-foreground leading-none">68%</p>
                <p className="text-[8px] text-muted uppercase font-bold tracking-widest mt-1">Nível de Execução</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
