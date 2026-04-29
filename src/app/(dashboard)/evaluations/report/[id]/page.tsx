import React from "react";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Printer, Download, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EvaluationReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock de dados para o relatório
  const labels = ["Conversão", "Ticket Médio", "Abordagem", "Volume", "Follow-up", "Prospecção", "Comunicação", "Execução", "Disciplina", "Liderança"];
  const selfScores = [7.2, 5.5, 8.4, 4.2, 3.8, 6.1, 7.5, 5.9, 8.0, 4.5];
  const leaderScores = [6.5, 5.0, 7.8, 4.0, 3.5, 5.8, 7.0, 5.5, 7.5, 4.0];

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 md:p-16 print:p-0">
      {/* Botões de Ação (Escondidos na Impressão) */}
      <div className="max-w-4xl mx-auto mb-12 flex justify-between items-center print:hidden">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-slate-500">
            <ChevronLeft size={18} className="mr-2" /> Voltar ao Dashboard
          </Button>
        </Link>
        <div className="flex gap-4">
          <Button onClick={() => typeof window !== 'undefined' && window.print()} className="bg-slate-900 text-white rounded-none">
            <Printer size={18} className="mr-2" /> Imprimir Relatório
          </Button>
        </div>
      </div>

      {/* Container do Relatório */}
      <div className="max-w-4xl mx-auto border-[12px] border-slate-900 p-12 relative overflow-hidden bg-white shadow-2xl print:shadow-none print:border-[8px]">
        
        {/* Marca d'água/Background Decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 -mr-32 -mt-32 rotate-45" />
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Relatório de Performance</h1>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Roda da Venda 2.0 | VULP Business</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase text-slate-400">Ciclo de Avaliação</p>
            <p className="text-lg font-black italic">ABRIL 2026</p>
          </div>
        </div>

        {/* Info do Vendedor */}
        <div className="grid grid-cols-2 gap-12 mb-16 border-b border-slate-200 pb-12">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Vendedor(a)</p>
            <p className="text-2xl font-bold">Marcus Rodrigo Brito Pereira</p>
            <p className="text-sm text-slate-500 mt-1">vulp-enterprise / Time de Vendas Sul</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Score Calibrado Final</p>
            <p className="text-5xl font-black italic text-slate-900">7.2</p>
          </div>
        </div>

        {/* Gráfico Radar Central */}
        <div className="flex flex-col items-center mb-16">
          <div className="bg-slate-50 p-8 rounded-full border border-slate-100">
            <RadarWheel 
              size={400} 
              labels={labels.map(l => l.substring(0, 3).toUpperCase())} 
              scores={selfScores} 
              scoresCompare={leaderScores}
              darkColor="#0f172a"
              lightColor="#94a3b8"
            />
          </div>
          <div className="mt-8 flex gap-8 text-[10px] font-bold uppercase tracking-widest">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-slate-900" /> Autoavaliação
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 border border-dashed border-slate-400" /> Calibragem Líder
             </div>
          </div>
        </div>

        {/* Detalhamento de Áreas */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-16">
          {labels.slice(0, 6).map((label, i) => (
            <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{label}</span>
              <div className="flex gap-4 font-mono text-xs">
                 <span className="text-slate-400">{selfScores[i]}</span>
                 <span className="font-bold">{leaderScores[i]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé / Autenticidade */}
        <div className="flex justify-between items-end pt-12 border-t-2 border-slate-900">
          <div>
            <p className="text-[8px] font-mono text-slate-400">DOCUMENTO GERADO EM 29/04/2026 ÀS 08:25</p>
            <p className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">HASH: {id.substring(0, 16).toUpperCase()}-VULP-CERT</p>
          </div>
          <div className="w-32 h-12 bg-slate-900 flex items-center justify-center font-black text-white italic tracking-tighter">
            VULP
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
