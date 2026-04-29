'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { ChevronRight } from "lucide-react";
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
    <Card className="rounded-none border-ui-border bg-ui-surface/10 hover:bg-ui-surface/20 transition-all group overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch h-full">
          {/* Gráfico Miniatura */}
          <div className="w-40 bg-vulp-void flex items-center justify-center p-2 border-r border-ui-border">
            <RadarWheel 
              size={120} 
              labels={labels} 
              scores={scores} 
              scoresCompare={leaderScores}
            />
          </div>

          {/* Info do Vendedor */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter">{member.full_name}</h3>
                <p className="text-[10px] text-ui-muted uppercase tracking-widest font-bold">Vendedor Performance</p>
              </div>
              <Badge variant="train">Calibragem Pendente</Badge>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1 p-3 bg-vulp-void/50 border border-ui-border/50">
                <p className="text-[9px] text-ui-muted uppercase font-bold">Auto-Score</p>
                <p className="text-xl font-mono font-bold text-vulp-lilac">7.4</p>
              </div>
              <div className="flex-1 p-3 bg-vulp-void/50 border border-ui-border/50">
                <p className="text-[9px] text-ui-muted uppercase font-bold">Fator Realidade</p>
                <p className="text-xl font-mono font-bold text-status-critical">-0.8</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-none border border-vulp-brand bg-vulp-brand/20 flex items-center justify-center text-[8px] font-bold">A</div>
                <div className="w-6 h-6 rounded-none border border-status-dismiss bg-status-dismiss/20 flex items-center justify-center text-[8px] font-bold">C</div>
              </div>
              
              <Link href={`/leader/evaluation/${member.id}`}>
                <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest group-hover:text-vulp-lilac transition-colors">
                  Calibrar <ChevronRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
