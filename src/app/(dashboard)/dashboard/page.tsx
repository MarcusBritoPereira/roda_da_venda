import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { MissionLog } from "@/components/dashboard/MissionLog";
import { TrendingUp, Target, AlertTriangle, Calendar, MessageSquare, ArrowRight, Award, Zap } from "lucide-react";
import { getMyPDIs } from "@/actions/pdis";
import { getLatestEvaluation } from "@/actions/evaluations";
import { differenceInDays } from "date-fns";
import Link from "next/link";

export default async function DashboardPage() {
  const missions = await getMyPDIs();
  const latestEvaluation = await getLatestEvaluation();
  
  // Mock de dados para o radar caso não haja avaliação real
  const defaultScores = [7, 6, 8, 5, 4, 6, 7, 5, 8, 5];
  const defaultLeaderScores = [6, 5, 7, 4, 3, 5, 6, 4, 7, 4];
  const labels = ["CONV.", "TICKET", "ABORD.", "VOL.", "FOLLOW", "PROD.", "COMUN.", "EXEC.", "DISC.", "LIDER."];

  const targetDate = new Date("2024-12-31");
  const daysRemaining = Math.max(0, differenceInDays(targetDate, new Date()));

  const summaryCards = [
    { label: "Score Calibrado", value: latestEvaluation?.calibrated_score?.toFixed(1) || "7.2", icon: <Target className="text-vulp-brand" />, status: "train" as const, statusLabel: "Nível Pro" },
    { label: "Aderência PDI", value: "85%", icon: <TrendingUp className="text-status-promote" />, status: "promote" as const, statusLabel: "Em Evolução" },
    { label: "Gap de Confiança", value: "-1.2", icon: <AlertTriangle className="text-status-critical" />, status: "critical" as const, statusLabel: "Atenção" },
    { label: "Ciclo Ativo", value: "Abril", icon: <Calendar className="text-foreground" />, status: "default" as const, statusLabel: "Em Dia" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-sm font-bold text-muted uppercase tracking-[0.4em] mb-2">Visão do Vendedor</h1>
          <h2 className="text-4xl font-black italic uppercase text-foreground">Sua Performance</h2>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/print-manual" target="_blank">
            <Button variant="outline" className="border-vulp-brand/30 text-vulp-brand hover:bg-vulp-brand/5 font-bold">
              FORMULÁRIO MANUAL (PDF)
            </Button>
          </Link>
          <Link href="/evaluations/new">
            <Button className="btn-vulp shadow-glow-purple group">
              <Zap size={16} className="mr-2 group-hover:animate-pulse" /> NOVA AUTOAVALIAÇÃO
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Coluna do Radar */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="vulp-card min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-10">
               <div>
                  <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Roda da Venda</h3>
                  <p className="text-lg font-black italic uppercase text-foreground">Diagnóstico 360°</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vulp-brand rounded-full" />
                    <span className="text-[10px] font-bold text-muted uppercase">Líder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 border border-vulp-brand rounded-full" />
                    <span className="text-[10px] font-bold text-muted uppercase">Você</span>
                  </div>
               </div>
            </div>
            
            <div className="relative flex items-center justify-center w-full py-12">
              <div className="absolute inset-0 bg-vulp-brand/5 blur-[100px] rounded-full scale-75" />
              <RadarWheel 
                size={380} 
                labels={labels} 
                scores={latestEvaluation ? defaultScores : defaultScores} // Mock fallback
                scoresCompare={latestEvaluation ? defaultLeaderScores : defaultLeaderScores}
              />
            </div>
          </Card>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <Card key={card.label} className="vulp-card p-6 flex flex-col justify-between border-t-2 border-t-vulp-brand/20 hover:border-t-vulp-brand transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-ui-surface rounded-lg border border-ui-border">
                    {card.icon}
                  </div>
                  <Badge variant={card.status} className="text-[8px]">{card.statusLabel}</Badge>
                </div>
                <div>
                  <p className="text-[9px] text-muted uppercase tracking-widest font-bold mb-1">{card.label}</p>
                  <p className="text-2xl font-black italic text-foreground">{card.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Coluna Lateral: PDI e Feedback */}
        <div className="lg:col-span-4 space-y-8">
          {/* Missão Ativa */}
          <Card className="rounded-none border-vulp-brand bg-vulp-brand/5 p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 bg-vulp-brand text-[9px] font-black uppercase text-white">Missão Ativa</div>
             <div className="flex items-center gap-3 mb-6">
               <Award className="text-vulp-brand" size={24} />
               <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Seu Próximo Passo</h3>
             </div>
             <h4 className="text-xl font-black italic uppercase tracking-tight text-foreground leading-tight mb-4">Dominando o Follow-up de Resgate</h4>
             <div className="space-y-4">
                <div className="w-full bg-border-vulp h-1.5 rounded-full overflow-hidden">
                   <div className="bg-vulp-brand h-full shadow-glow-purple" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase">
                   <span className="text-muted">Progresso</span>
                   <span className="text-vulp-brand">45%</span>
                </div>
                <Button className="w-full btn-vulp text-[10px] h-10 mt-4">CONTINUAR TREINAMENTO</Button>
             </div>
          </Card>

          {/* Feedback do Líder */}
          <Card className="vulp-card p-8 bg-gradient-to-br from-ui-surface/50 to-background">
             <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-vulp-brand" size={20} />
                <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Recado do seu Líder</h3>
             </div>
             <div className="relative">
                <span className="absolute -top-4 -left-2 text-4xl text-vulp-brand opacity-20 font-serif">"</span>
                <p className="text-sm text-foreground italic leading-relaxed pl-4 border-l-2 border-vulp-brand/30">
                  "André, você tem um talento natural para a abertura de vendas, mas o dinheiro está no acompanhamento. Foque nessa missão de follow-up e veremos seu ticket médio explodir!"
                </p>
             </div>
             <p className="text-[9px] text-muted uppercase font-bold mt-6 tracking-widest">— Marcus Rodrigo (Líder Comercial)</p>
          </Card>

          {/* Histórico de Conquistas */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Suas Conquistas</h3>
             <div className="flex gap-2 flex-wrap">
                <Badge variant="promote" className="h-8 px-3 text-[9px] uppercase font-black italic">Mestre da Abertura</Badge>
                <Badge variant="train" className="h-8 px-3 text-[9px] uppercase font-black italic opacity-50">Fechador de Elite</Badge>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
