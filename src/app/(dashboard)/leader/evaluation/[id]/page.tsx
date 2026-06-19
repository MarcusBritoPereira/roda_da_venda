import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CalibrationForm } from "@/components/leader/CalibrationForm";
import { getAreas } from "@/actions/evaluations";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function IndividualCalibrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: sellerId } = await params;
  const areas = await getAreas();

  // Mock de dados para a página de calibragem individual
  // Em produção, aqui buscaríamos as notas reais dadas pelo vendedor para este sellerId
  const mockAreasWithScores = areas.length > 0 ? areas.map((a, index) => ({
    ...a,
    self_score: 5 + (index % 5),
    justification: "Acredito que tive um bom desempenho nesta área, superando os desafios do mês.",
    real_metric_value: 10 + (index * 7),
    threshold: 25
  })) : [
    { id: '1', name: 'Conversão', self_score: 8, justification: "Taxa de fechamento em alta.", real_metric_value: 22, threshold: 25 },
    { id: '2', name: 'Ticket Médio', self_score: 6, justification: "Baixou um pouco para ganhar volume.", real_metric_value: 4500, threshold: 5000 },
    { id: '3', name: 'Abordagem', self_score: 9, justification: "Primeiro contato excelente.", real_metric_value: 85, threshold: 80 },
    { id: '4', name: 'Volume', self_score: 5, justification: "Volume de ligações caiu na última semana.", real_metric_value: 120, threshold: 150 },
    { id: '5', name: 'Follow-up', self_score: 7, justification: "Régua de contato mantida.", real_metric_value: 92, threshold: 95 },
    { id: '6', name: 'Produtividade', self_score: 8, justification: "Uso eficiente do tempo de trabalho.", real_metric_value: 88, threshold: 85 },
    { id: '7', name: 'Comunicação', self_score: 7, justification: "Clareza nas propostas enviadas.", real_metric_value: 75, threshold: 80 },
    { id: '8', name: 'Execução', self_score: 6, justification: "Processo seguido conforme manual.", real_metric_value: 70, threshold: 80 },
    { id: '9', name: 'Disciplina', self_score: 9, justification: "Pontualidade e entrega de relatórios.", real_metric_value: 95, threshold: 90 },
    { id: '10', name: 'Liderança', self_score: 5, justification: "Potencial de auxílio aos novos membros.", real_metric_value: 50, threshold: 60 }
  ];

  return (
    <DashboardLayout>
      <div className="mb-12 flex justify-between items-center">
        <Link href="/leader">
          <Button variant="ghost" className="text-ui-muted hover:text-vulp-white p-0">
            <ChevronLeft size={18} className="mr-2" /> Voltar ao Time
          </Button>
        </Link>
        <div className="text-right">
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">ID de Avaliação</p>
          <p className="font-mono text-xs text-vulp-lilac">EVAL-{sellerId.substring(0, 8).toUpperCase()}</p>
        </div>
      </div>

      <CalibrationForm 
        sellerName="André Silveira" 
        areas={mockAreasWithScores} 
        evaluationId={sellerId} 
      />
    </DashboardLayout>
  );
}
