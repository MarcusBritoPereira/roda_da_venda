import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { EvaluationForm } from "@/components/forms/EvaluationForm";
import { getAreas, getActiveCycle } from "@/actions/evaluations";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function NewEvaluationPage() {
  const areas = await getAreas();
  const cycle = await getActiveCycle();

  if (!cycle) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="w-20 h-20 bg-status-critical/10 rounded-full flex items-center justify-center text-status-critical">
            <AlertTriangle size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase">Nenhum Ciclo Aberto</h1>
            <p className="text-ui-muted mt-2">No momento não há um ciclo de avaliação ativo para preenchimento.</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Voltar ao Início</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Mock de áreas se o banco estiver vazio para preview inicial
  const displayAreas = areas.length > 0 ? areas : [
    { id: '1', name: 'Conversão', description: 'Capacidade de transformar leads em vendas fechadas.' },
    { id: '2', name: 'Ticket Médio', description: 'Valor médio das vendas realizadas no período.' },
    { id: '3', name: 'Abordagem', description: 'Qualidade do primeiro contato e prospecção inicial.' },
    { id: '4', name: 'Volume', description: 'Quantidade total de contatos e atividades realizadas.' },
    { id: '5', name: 'Follow-up', description: 'Consistência no acompanhamento de leads em aberto.' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="text-sm font-bold text-ui-muted uppercase tracking-[0.4em] mb-4">Novo Lançamento</h1>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-vulp-brand text-white text-[10px] font-black uppercase tracking-tighter italic">
            Ciclo: {cycle.name}
          </div>
          <div className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">
            Expira em: {new Date(cycle.end_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <EvaluationForm areas={displayAreas} cycleId={cycle.id} />
    </DashboardLayout>
  );
}
