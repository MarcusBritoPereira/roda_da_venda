"use client"

import React from "react";
import { RadarWheel } from "@/components/charts/RadarWheel";

const evaluationCriteria = [
  { area: "Conversão", description: "Avalie sua capacidade de transformar leads em vendas reais. 1 = Perde muitas oportunidades; 10 = Fecha quase tudo que chega." },
  { area: "Ticket Médio", description: "Sua habilidade em agregar valor e vender produtos complementares. 1 = Só vende o básico/barato; 10 = Sempre sobe o valor da venda." },
  { area: "Abordagem", description: "Qualidade do primeiro contato e quebra de gelo. 1 = Abordagem fria/robótica; 10 = Gera conexão instantânea e confiança." },
  { area: "Volume", description: "Quantidade de novos contatos e leads gerados proativamente. 1 = Espera o cliente chegar; 10 = Prospecção intensa e constante." },
  { area: "Follow-up", description: "Cadência e persistência no contato com leads que não fecharam de primeira. 1 = Desiste fácil; 10 = Régua de contato impecável." },
  { area: "Produtividade", description: "Uso eficiente do tempo e organização do CRM. 1 = Se perde nas tarefas; 10 = Extremamente produtivo e organizado." },
  { area: "Comunicação", description: "Clareza, tom de voz e poder de persuasão. 1 = Dificuldade em se expressar; 10 = Oratória envolvente e convincente." },
  { area: "Execução", description: "Aderência aos processos e scripts da loja. 1 = Faz do próprio jeito; 10 = Segue o método VULP com perfeição." },
  { area: "Disciplina", description: "Foco, pontualidade e constância nos resultados. 1 = Oscila muito; 10 = Mantém o alto nível todos os dias." },
  { area: "Liderança", description: "Capacidade de ajudar colegas e influenciar o ambiente positivamente. 1 = Individualista; 10 = Inspira e puxa o time para cima." },
];

export default function PrintManualPage() {
  return (
    <div className="bg-white text-black min-h-screen p-10 print:p-0">
      {/* Header de Impressão */}
      <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-10">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tight">Roda da Venda</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Formulário de Autoavaliação Manual</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase">Empresa: ___________________________</p>
          <p className="text-[10px] font-bold uppercase mt-2">Data: ____/____/________</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 items-center mb-12">
        {/* Radar Vazio */}
        <div className="flex flex-col items-center border border-gray-200 p-8">
           <h2 className="text-xs font-black uppercase tracking-widest mb-6">Mapeamento Visual</h2>
           <RadarWheel 
             size={350} 
             labels={["CONV.", "TICKET", "ABORD.", "VOL.", "FOLLOW", "PROD.", "COMUN.", "EXEC.", "DISC.", "LIDER."]} 
             scores={[0,0,0,0,0,0,0,0,0,0]} // Vazio para impressão
           />
           <p className="text-[8px] mt-6 text-gray-500 uppercase italic">Instrução: Marque pontos de 1 a 10 em cada eixo e ligue os pontos para formar sua roda.</p>
        </div>

        {/* Info do Vendedor */}
        <div className="space-y-6">
           <div className="border-b border-black pb-2">
              <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Nome do Vendedor</p>
              <div className="h-8 border-b border-dotted border-black w-full" />
           </div>
           <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-[10px] font-black uppercase mb-4 tracking-widest">Resumo de Objetivos</h3>
              <p className="text-[9px] text-gray-600 leading-relaxed italic">
                O objetivo desta ferramenta é identificar seus pontos de alavancagem. Seja honesto consigo mesmo. 
                A verdadeira evolução começa com um diagnóstico real.
              </p>
           </div>
        </div>
      </div>

      {/* Critérios de Avaliação */}
      <div className="space-y-6">
         <h2 className="text-sm font-black uppercase italic border-b-2 border-black pb-2">Critérios e Notas</h2>
         <div className="grid grid-cols-1 gap-4">
            {evaluationCriteria.map((item, idx) => (
              <div key={idx} className="flex gap-6 border-b border-gray-100 pb-4 items-start">
                 <div className="w-24 shrink-0">
                    <p className="text-[10px] font-black uppercase">{item.area}</p>
                    <div className="mt-2 flex gap-1">
                       <div className="w-6 h-6 border border-black flex items-center justify-center text-[9px] font-bold">___</div>
                       <span className="text-[9px] text-gray-400 self-end">/ 10</span>
                    </div>
                 </div>
                 <div className="flex-1">
                    <p className="text-[9px] text-gray-600 font-medium leading-relaxed">{item.description}</p>
                    <p className="text-[8px] text-gray-400 mt-2 uppercase font-bold italic">Justificativa: _________________________________________________________________________________________________________________________________________________________________</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Rodapé e Assinaturas */}
      <div className="mt-16 grid grid-cols-2 gap-20">
         <div className="text-center">
            <div className="border-t border-black pt-2">
               <p className="text-[9px] font-bold uppercase">Assinatura do Vendedor</p>
            </div>
         </div>
         <div className="text-center">
            <div className="border-t border-black pt-2">
               <p className="text-[9px] font-bold uppercase">Visto do Líder / Gestor</p>
            </div>
         </div>
      </div>

      {/* Botão de Trigger Manual (não aparece no print) */}
      <div className="fixed bottom-8 right-8 print:hidden">
         <button 
           onClick={() => window.print()}
           className="bg-black text-white px-8 py-4 rounded-full font-black uppercase italic tracking-tighter shadow-2xl hover:scale-105 transition-transform"
         >
           Imprimir Agora
         </button>
      </div>
    </div>
  );
}
