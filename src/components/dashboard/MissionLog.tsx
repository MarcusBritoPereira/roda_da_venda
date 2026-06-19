'use client'

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle2, Clock, PlayCircle, Trophy } from "lucide-react";
import { updatePDIStatus } from "@/actions/pdis";

interface PDI {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface MissionLogProps {
  missions: PDI[];
}

export function MissionLog({ missions }: MissionLogProps) {
  
  const displayMissions = missions;

  if (displayMissions.length === 0) {
    return (
      <Card className="rounded-none border-ui-border bg-ui-surface/5 h-full">
        <CardHeader className="flex flex-row items-center justify-between border-b border-ui-border/50 pb-4">
          <div>
            <CardTitle className="text-xl font-black italic uppercase tracking-tight">Log de Missões (PDI)</CardTitle>
            <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Nenhuma missão atribuída no momento</p>
          </div>
          <Trophy size={24} className="text-vulp-white/10" />
        </CardHeader>
        <CardContent className="p-12 flex flex-col items-center justify-center text-center opacity-20">
          <Clock size={48} className="mb-4" />
          <p className="text-xs uppercase font-bold tracking-widest">O seu plano aparecerá aqui após a calibragem do líder.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-status-promote" size={18} />;
      case 'in_progress': return <PlayCircle className="text-vulp-brand" size={18} />;
      default: return <Clock className="text-ui-muted" size={18} />;
    }
  };

  return (
    <Card className="rounded-none border-ui-border bg-ui-surface/5 h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-ui-border/50 pb-4">
        <div>
          <CardTitle className="text-xl font-black italic uppercase tracking-tight">Log de Missões (PDI)</CardTitle>
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Seu plano de evolução para este ciclo</p>
        </div>
        <Trophy size={24} className="text-vulp-lilac opacity-50" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-ui-border/30">
          {displayMissions.map((mission) => (
            <div key={mission.id} className="p-4 hover:bg-white/5 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(mission.status)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-bold uppercase tracking-tight ${mission.status === 'completed' ? 'line-through text-ui-muted' : ''}`}>
                      {mission.title}
                    </h4>
                    <span className="text-[9px] font-mono text-ui-muted" suppressHydrationWarning>
                      DEADLINE: {new Date(mission.deadline).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-xs text-ui-muted mt-1 leading-relaxed">
                    {mission.description}
                  </p>
                  
                  {mission.status !== 'completed' && (
                    <div className="mt-4 flex gap-2">
                       <button 
                        onClick={() => updatePDIStatus(mission.id, 'completed')}
                        className="text-[9px] font-black uppercase tracking-widest bg-ui-surface px-2 py-1 border border-ui-border hover:bg-vulp-brand hover:text-white transition-all"
                       >
                        Marcar como Feito
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
