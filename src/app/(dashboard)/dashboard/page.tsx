import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { TrendingUp, Target, AlertTriangle, Calendar } from "lucide-react";

export default function DashboardPage() {
  // Dados mockados para preview
  const labels = ["Conversão", "Ticket Médio", "Abordagem", "Volume", "Follow-up", "Prospecção", "Comunicação", "Execução", "Disciplina", "Liderança"];
  const scores = [7.2, 5.5, 8.4, 4.2, 3.8, 6.1, 7.5, 5.9, 8.0, 4.5];
  const leaderScores = [6.5, 5.0, 7.8, 4.0, 3.5, 5.5, 7.0, 5.0, 7.5, 4.0];

  const summaryCards = [
    { label: "Score Global", value: "6.1", icon: <Target className="text-vulp-lilac" />, status: "train", statusLabel: "Treinar" },
    { label: "Meta do Ciclo", value: "85%", icon: <TrendingUp className="text-status-promote" />, status: "promote", statusLabel: "No Caminho" },
    { label: "Fator Realidade", value: "-0.4", icon: <AlertTriangle className="text-status-critical" />, status: "critical", statusLabel: "Crítico" },
    { label: "Dias Restantes", value: "12", icon: <Calendar className="text-vulp-white" />, status: "default", statusLabel: "Em Dia" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Card key={card.label} className="p-4 md:p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-ui-surface rounded-lg border border-ui-border">
                  {card.icon}
                </div>
                <Badge variant={card.status as any}>{card.statusLabel}</Badge>
              </div>
              <div>
                <p className="text-xs text-ui-muted uppercase tracking-widest font-bold mb-1">{card.label}</p>
                <p className="text-3xl font-black">{card.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Section: Chart + Indicators */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Card */}
          <Card className="lg:col-span-2 flex flex-col items-center justify-center min-h-[500px]">
            <CardHeader className="w-full text-center mb-8">
              <CardTitle>Roda da Venda</CardTitle>
              <CardDescription>Comparativo: Autoavaliação vs Avaliação do Líder</CardDescription>
            </CardHeader>
            <CardContent className="relative flex items-center justify-center w-full">
              <div className="absolute inset-0 bg-vulp-electric/5 blur-[80px] rounded-full" />
              <RadarWheel 
                size={400} 
                labels={labels} 
                scores={scores} 
                scoresCompare={leaderScores}
              />
            </CardContent>
          </Card>

          {/* Indicators List */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Indicadores Críticos</CardTitle>
                <CardDescription>Foco de desenvolvimento para este ciclo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-status-dismiss/5 border border-status-dismiss/20">
                  <ScoreBar label="Follow-up" score={3.8} color="var(--color-status-dismiss)" className="mb-2" />
                  <p className="text-[10px] text-status-dismiss font-medium uppercase tracking-wider">
                    Gatilho Fator Realidade Ativado: Nota limitada por baixo volume de CRM.
                  </p>
                </div>
                
                <ScoreBar label="Ticket Médio" score={5.5} color="var(--color-status-train)" />
                <ScoreBar label="Volume de Prospecção" score={4.2} color="var(--color-status-critical)" />
                <ScoreBar label="Liderança" score={4.5} color="var(--color-status-critical)" />
                
                <div className="pt-4 mt-4 border-t border-ui-border">
                  <ScoreBar label="Conversão" score={7.2} color="var(--color-vulp-lilac)" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Call */}
        <Card className="bg-vulp-brand text-white border-none shadow-glow-electric overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] -mr-32 -mt-32 rounded-full" />
          <CardHeader>
            <CardTitle className="text-white border-none">Pronto para o PDI?</CardTitle>
            <CardDescription className="text-white/80 ml-0">
              Seu líder já enviou os comentários da última avaliação. Vamos traçar o plano de ação?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="bg-white text-vulp-electric hover:bg-vulp-white">
              Iniciar Plano de Desenvolvimento
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
