'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { saveLeaderCalibration } from "@/actions/leader";
import { ChevronRight, Save, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Area {
  id: string;
  name: string;
  self_score: number;
  justification: string;
  real_metric_value: number;
  threshold: number;
}

interface CalibrationFormProps {
  sellerName: string;
  areas: Area[];
  evaluationId: string;
}

export function CalibrationForm({ sellerName, areas, evaluationId }: CalibrationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [leaderScores, setLeaderScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  
  const area = areas[currentStep];
  const currentLeaderScore = leaderScores[area.id] || 0;

  // Preparar dados para o Radar em tempo real
  const labels = areas.map(a => a.name.substring(0, 3).toUpperCase());
  const selfScores = areas.map(a => a.self_score);
  const liveLeaderScores = areas.map(a => leaderScores[a.id] || a.self_score); // Inicia igual ao self para preview

  const isDisparate = Math.abs((leaderScores[area.id] || area.self_score) - area.self_score) > 2;

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      
      {/* Coluna Esquerda: Form de Calibragem */}
      <div className="lg:col-span-7 space-y-8">
        <div className="flex justify-between items-center border-b border-ui-border pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-vulp-brand/20 border border-vulp-brand flex items-center justify-center font-black text-vulp-lilac">
              {sellerName.substring(0, 1)}
            </div>
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tight">{sellerName}</h2>
              <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Avaliação Individual</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Progresso</p>
             <p className="text-lg font-mono">{currentStep + 1} / {areas.length}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-4xl font-black italic uppercase italic text-vulp-lilac">{area.name}</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Autoavaliação do Vendedor */}
            <div className="p-6 bg-ui-surface/10 border border-ui-border">
              <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-4">Autoavaliação</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black italic">{area.self_score}</span>
                <span className="text-ui-muted mb-1">/ 10</span>
              </div>
              <p className="text-xs text-ui-muted leading-relaxed italic">
                "{area.justification || "Nenhuma justificativa fornecida."}"
              </p>
            </div>

            {/* Dados Reais do CRM */}
            <div className="p-6 bg-vulp-void/50 border border-vulp-brand/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 bg-vulp-brand/20 text-[8px] font-black uppercase text-vulp-brand">Fator Realidade</div>
              <p className="text-[10px] text-vulp-brand uppercase font-bold tracking-widest mb-4">Métrica Real (CRM)</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black italic text-vulp-white">{area.real_metric_value}%</span>
              </div>
              <p className="text-[10px] text-ui-muted uppercase">Meta: {area.threshold}%</p>
              <div className="mt-4">
                 {area.real_metric_value < area.threshold ? (
                   <div className="flex items-center gap-2 text-status-critical text-[10px] font-bold uppercase">
                     <AlertTriangle size={12} /> Nota sugerida abaixo de 5
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-status-promote text-[10px] font-bold uppercase">
                     <CheckCircle2 size={12} /> Performance dentro da meta
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Input do Líder */}
          <Card className="rounded-none border-vulp-lilac/30 bg-vulp-lilac/5">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-ui-muted">Nota do Líder (Calibragem)</label>
                  {isDisparate && <Badge variant="critical">Alta Disparidade</Badge>}
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button 
                      key={num}
                      type="button"
                      onClick={() => setLeaderScores(prev => ({ ...prev, [area.id]: num }))}
                      className={`h-12 flex items-center justify-center font-mono text-sm border transition-all ${
                        currentLeaderScore === num 
                        ? "bg-vulp-lilac border-vulp-lilac text-white shadow-glow-lilac" 
                        : "bg-vulp-void/50 border-ui-border text-ui-muted hover:border-vulp-lilac"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-ui-muted">Feedback de Calibragem</label>
                <textarea 
                  value={comments[area.id] || ""}
                  onChange={(e) => setComments(prev => ({ ...prev, [area.id]: e.target.value }))}
                  className="w-full h-32 bg-vulp-void/50 border border-ui-border p-4 text-sm focus:outline-none focus:border-vulp-lilac transition-all placeholder:text-ui-muted"
                  placeholder="Explique o motivo desta nota baseando-se nos dados reais..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between pt-8 border-t border-ui-border">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="rounded-none"
          >
            Anterior
          </Button>

          {currentStep < areas.length - 1 ? (
            <Button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="rounded-none bg-vulp-brand px-12"
            >
              Próxima Área <ChevronRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button 
              className="rounded-none bg-status-promote px-12 shadow-glow-electric border-none"
            >
              Salvar Calibragem <Save size={18} className="ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Coluna Direita: Radar Real-time */}
      <div className="lg:col-span-5 space-y-8">
        <Card className="rounded-none border-ui-border bg-ui-surface/5 sticky top-8">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-ui-muted">Impacto Visual da Calibragem</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-vulp-lilac/10 blur-[60px] rounded-full" />
               <RadarWheel 
                size={340} 
                labels={labels} 
                scores={selfScores} 
                scoresCompare={liveLeaderScores}
              />
            </div>
            
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-ui-muted uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-vulp-brand" /> Autoavaliação
                </span>
                <span className="text-[10px] font-bold text-ui-muted uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 border border-dashed border-status-dismiss" /> Sua Calibragem
                </span>
              </div>
              
              <div className="p-4 bg-ui-surface/30 border border-ui-border text-center">
                 <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-1">Score Calibrado Final</p>
                 <p className="text-4xl font-black italic text-vulp-white">
                    {(liveLeaderScores.reduce((a, b) => a + b, 0) / areas.length).toFixed(1)}
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
