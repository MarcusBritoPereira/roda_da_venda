'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { ChevronRight, Rocket, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface TeamMemberCardProps {
  member: {
    id: string;
    full_name: string;
    avatar_url?: string;
    evaluations?: Array<{ self_score?: number; leader_score?: number }>;
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  // Mock de dados para o radar do card
  const labels = ["C", "T", "A", "V", "F", "P", "Com", "E", "D", "L"];
  const scores = [7, 6, 8, 5, 4, 6, 7, 5, 8, 5];
  const leaderScores = [6, 5, 7, 4, 3, 5, 6, 4, 7, 4];

  return (
    <Card className="vulp-card overflow-hidden group">
      <CardContent className="p-0">
        <div className="flex items-stretch h-full">
          {/* Gráfico Miniatura */}
          <div className="w-40 bg-background flex items-center justify-center p-2 border-r border-border-vulp">
            <RadarWheel 
              size={120} 
              labels={labels} 
              scores={scores} 
              scoresCompare={leaderScores}
            />
          </div>

          {/* Info do Vendedor */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-foreground leading-none">{member.full_name}</h3>
                <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1">Vendedor Performance</p>
              </div>
              <Badge variant="train" className="h-7 px-4 flex items-center justify-center text-[9px] font-black uppercase italic tracking-tighter shrink-0 whitespace-nowrap">
                Calibragem Pendente
              </Badge>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1 p-3 bg-background/50 border border-border-vulp/50 rounded-lg">
                <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Auto-Score</p>
                <p className="text-xl font-mono font-bold text-vulp-brand">7.4</p>
              </div>
              <div className="flex-1 p-3 bg-background/50 border border-border-vulp/50 rounded-lg">
                <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Fator Realidade</p>
                <p className="text-xl font-mono font-bold text-status-critical">-0.8</p>
              </div>
            </div>

            {/* Diagnóstico de Ciclo */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[8px] text-muted uppercase font-black tracking-tighter flex items-center gap-1">
                  <Rocket size={10} className="text-vulp-brand" /> Melhor Área
                </p>
                <p className="text-[11px] font-black uppercase italic text-foreground tracking-tight truncate">Abordagem</p>
              </div>
              <div className="space-y-1 border-l border-border-vulp/50 pl-4">
                <p className="text-[8px] text-muted uppercase font-black tracking-tighter flex items-center gap-1">
                  <AlertTriangle size={10} className="text-status-train" /> Pior Área
                </p>
                <p className="text-[11px] font-black uppercase italic text-vulp-brand tracking-tight truncate">Follow-up</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-border-vulp pt-4">
              <div />
              
              <Link href={`/leader/evaluation/${member.id}`}>
                <Button className="btn-vulp text-[10px] py-1 h-8">
                  CALIBRAR AGORA <ChevronRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
