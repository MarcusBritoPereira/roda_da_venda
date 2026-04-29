import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getTeamMembers } from "@/actions/leader";
import { getMyPDIs } from "@/actions/pdis"; // Vamos reaproveitar ou criar uma para o líder
import { CheckCircle2, Clock, PlayCircle, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function LeaderPDITrackingPage() {
  const members = await getTeamMembers();

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-sm font-bold text-ui-muted uppercase tracking-[0.4em] mb-2">Monitoramento de Evolução</h1>
          <h2 className="text-4xl font-black italic uppercase">Acompanhamento de PDIs</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de Time com Status de PDI */}
        <div className="lg:col-span-2 space-y-6">
          {members.map((member) => (
            <Card key={member.id} className="rounded-none border-ui-border bg-ui-surface/10 overflow-hidden group">
              <div className="flex items-center p-6 gap-6">
                <div className="w-16 h-16 bg-vulp-brand/20 border border-vulp-brand flex items-center justify-center font-black text-xl text-vulp-lilac">
                  {member.full_name.substring(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black italic uppercase tracking-tight">{member.full_name}</h3>
                      <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest italic">Vendedor em Evolução</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Conclusão</p>
                       <p className="text-xl font-black text-status-promote">75%</p>
                    </div>
                  </div>
                  
                  {/* Mini Barra de Progresso */}
                  <div className="w-full bg-ui-border h-1 mt-4">
                    <div className="bg-vulp-brand h-full shadow-glow-electric" style={{ width: '75%' }} />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-ui-muted">
                      <CheckCircle2 size={12} className="text-status-promote" /> 3 Feitas
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-ui-muted">
                      <Clock size={12} className="text-vulp-brand" /> 1 Pendente
                    </div>
                  </div>
                </div>
                <div className="px-4">
                   <Link href={`/leader/pdi-tracking/${member.id}`}>
                    <Button variant="ghost" size="icon" className="text-vulp-lilac hover:bg-vulp-lilac/10">
                      <ArrowRight size={20} />
                    </Button>
                   </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Resumo de Metas do Time */}
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

          <Card className="rounded-none border-ui-border bg-ui-surface/5 p-8">
            <h4 className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-6">Média de Adesão do Time</h4>
            <div className="relative w-full h-48 flex items-center justify-center">
               <div className="absolute inset-0 border-[16px] border-ui-border rounded-full" />
               <div className="absolute inset-0 border-[16px] border-vulp-brand rounded-full border-t-transparent border-l-transparent rotate-45" />
               <div className="text-center">
                 <p className="text-4xl font-black italic">68%</p>
                 <p className="text-[8px] text-ui-muted uppercase font-bold">Missões Concluídas</p>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
