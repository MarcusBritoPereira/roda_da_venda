'use client'

import React from "react";
import { Button } from "@/components/ui/Button";
import { Filter, Download, ChevronDown } from "lucide-react";

interface LeaderToolbarProps {
  areas: any[];
  teamData: any[];
}

export function LeaderToolbar({ areas, teamData }: LeaderToolbarProps) {
  
  // Função para exportar CSV
  const handleExport = () => {
    const headers = ["Nome,Auto-Score,Fator Realidade,Status\n"];
    const rows = teamData.map(m => {
      // Mock de dados para o exemplo
      return `${m.full_name},7.4,-0.8,Pendente\n`;
    });
    
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'relatorio_performance_vulp.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex justify-between items-center mb-8 border-b border-ui-border pb-6">
      <div className="flex gap-4">
        {/* Dropdown de Filtro (Simulado com Button por enquanto) */}
        <div className="relative group">
          <Button variant="outline" size="sm" className="rounded-none text-[10px] uppercase font-bold tracking-widest group-hover:border-vulp-brand">
            <Filter size={14} className="mr-2" /> 
            Filtrar Por Área 
            <ChevronDown size={12} className="ml-2 opacity-50" />
          </Button>
          
          {/* Menu de Áreas */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-vulp-void border border-ui-border hidden group-hover:block z-50 shadow-glow-electric/20">
            {areas.map(area => (
              <button 
                key={area.id}
                className="w-full text-left px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-vulp-brand/10 hover:text-vulp-lilac transition-colors"
              >
                {area.name}
              </button>
            ))}
            <button className="w-full text-left px-4 py-2 text-[10px] uppercase font-bold tracking-widest border-t border-ui-border text-status-critical hover:bg-status-critical/5">
              Limpar Filtros
            </button>
          </div>
        </div>

        <Button 
          onClick={handleExport}
          variant="outline" 
          size="sm" 
          className="rounded-none text-[10px] uppercase font-bold tracking-widest hover:bg-vulp-brand/10 hover:border-vulp-brand hover:text-vulp-lilac transition-all"
        >
          <Download size={14} className="mr-2" /> Exportar Relatório
        </Button>
      </div>
      
      <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest italic hidden md:block">
        Mostrando resultados para o Ciclo de Abril 2026
      </p>
    </div>
  );
}
