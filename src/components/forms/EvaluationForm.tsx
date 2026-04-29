'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { submitEvaluation } from "@/actions/evaluations";
import { ChevronRight, ChevronLeft, Send, Info } from "lucide-react";

interface Area {
  id: string;
  name: string;
  description: string;
}

interface EvaluationFormProps {
  areas: Area[];
  cycleId: string;
}

export function EvaluationForm({ areas, cycleId }: EvaluationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const area = areas[currentStep];
  const progress = ((currentStep + 1) / areas.length) * 100;

  return (
    <form action={submitEvaluation} className="max-w-4xl mx-auto space-y-8 relative">
      <input type="hidden" name="cycle_id" value={cycleId} />
      
      {/* Barra de Progresso "Industrial" */}
      <div className="w-full h-1 bg-ui-surface overflow-hidden">
        <div 
          className="h-full bg-vulp-brand shadow-glow-electric transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="font-mono text-[10px] text-vulp-lilac uppercase tracking-[0.3em] mb-2">
            Métrica {currentStep + 1} de {areas.length}
          </p>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic">{area.name}</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Peso da Área</p>
          <p className="text-2xl font-mono font-bold">x2.0</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Lado Esquerdo: Descrição e Contexto */}
        <div className="space-y-6">
          <div className="p-6 bg-ui-surface/20 border-l-2 border-vulp-brand backdrop-blur-sm">
            <p className="text-lg text-ui-muted leading-relaxed italic">
              "{area.description || "Como você avalia sua performance nesta área durante este ciclo?"}"
            </p>
          </div>
          
          <div className="flex gap-4 p-4 rounded-lg bg-vulp-brand/5 border border-vulp-brand/10">
            <Info className="text-vulp-brand shrink-0" size={20} />
            <p className="text-xs text-vulp-brand/80">
              Dica: Seja honesto consigo mesmo. O Fator Realidade será aplicado comparando sua nota com os dados de CRM.
            </p>
          </div>
        </div>

        {/* Lado Direito: Input de Nota e Justificativa */}
        <Card className="border-vulp-brand/20 bg-vulp-void/40 backdrop-blur-xl rounded-none">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted">Sua Nota (1 a 10)</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <label key={num} className="relative group cursor-pointer">
                    <input 
                      type="radio" 
                      name={`score_${area.id}`} 
                      value={num} 
                      className="peer sr-only"
                      required
                    />
                    <div className="h-12 flex items-center justify-center font-mono text-lg border border-ui-border bg-ui-surface/50 transition-all peer-checked:bg-vulp-brand peer-checked:border-vulp-brand peer-checked:text-white group-hover:border-vulp-lilac">
                      {num}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted">Justificativa (Opcional)</label>
              <textarea 
                name={`justification_${area.id}`}
                className="w-full h-32 bg-vulp-void/50 border border-ui-border p-4 text-sm focus:outline-none focus:border-vulp-brand transition-all placeholder:text-ui-muted"
                placeholder="Por que você se deu essa nota? Cite exemplos ou dados..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center pt-8 border-t border-ui-border">
        <Button 
          type="button"
          variant="outline" 
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
          className="rounded-none px-8"
        >
          <ChevronLeft size={18} className="mr-2" /> Anterior
        </Button>

        {currentStep < areas.length - 1 ? (
          <Button 
            type="button" 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="rounded-none px-8 bg-vulp-brand shadow-glow-electric"
          >
            Próxima Área <ChevronRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button 
            type="submit"
            className="rounded-none px-8 bg-status-promote shadow-glow-electric hover:bg-green-600 border-none"
          >
            Finalizar Avaliação <Send size={18} className="ml-2" />
          </Button>
        )}
      </div>
    </form>
  );
}
