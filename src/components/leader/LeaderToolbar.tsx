'use client'

import React from "react";
import { Button } from "@/components/ui/Button";
import { Filter, Printer, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface AreaItem {
  id: string;
  name: string;
}

interface TeamMemberItem {
  full_name: string;
}

interface LeaderToolbarProps {
  areas: AreaItem[];
  teamData: TeamMemberItem[];
}

export function LeaderToolbar({ areas, teamData }: LeaderToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentArea = searchParams.get('area');

  const handleExport = () => {
    window.print();
  };

  const handleFilter = (areaId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (areaId) {
      params.set('area', areaId);
    } else {
      params.delete('area');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center mb-8 border-b border-ui-border pb-6">
      <div className="flex gap-4">
        <div className="relative group">
          <Button variant="outline" size="sm" className="rounded-none text-[10px] uppercase font-bold tracking-widest group-hover:border-vulp-brand">
            <Filter size={14} className="mr-2" />
            Filtrar Por Área
            <ChevronDown size={12} className="ml-2 opacity-50" />
          </Button>

          <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border-vulp hidden group-hover:block z-50 shadow-2xl rounded-lg overflow-hidden">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => handleFilter(area.id)}
                className={`w-full text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${
                  currentArea === area.id ? 'bg-vulp-brand text-white' : 'hover:bg-vulp-brand/10 text-foreground'
                }`}
              >
                {area.name}
              </button>
            ))}
            <button 
              onClick={() => handleFilter(null)}
              className="w-full text-left px-4 py-3 text-[10px] uppercase font-bold tracking-widest border-t border-border-vulp text-status-dismiss hover:bg-status-dismiss/10 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="vulp-button-outline border-vulp-brand/50 text-vulp-brand"
        >
          <Printer size={14} className="mr-2" /> Imprimir Relatório
        </Button>
      </div>

      <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest italic hidden md:block">
        Mostrando resultados para o Ciclo de Abril 2026
      </p>
    </div>
  );
}
