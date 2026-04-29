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
  const mockAreasWithScores = areas.length > 0 ? areas.map(a => ({
    ...a,
    self_score: Math.floor(Math.random() * 5) + 5,
    justification: "Acredito que tive um bom desempenho nesta área, superando os desafios do mês.",
    real_metric_value: Math.floor(Math.random() * 40) + 10,
    threshold: 25
  })) : [
    { id: '1', name: 'Conversão', self_score: 8, justification: "Minha taxa de fechamento subiu 10% este mês.", real_metric_value: 22, threshold: 25 },
    { id: '2', name: 'Ticket Médio', self_score: 6, justification: "Foquei em volume, o que baixou um pouco o ticket médio.", real_metric_value: 4500, threshold: 5000 },
    { id: '3', name: 'Abordagem', self_score: 9, justification: "Recebi muitos elogios na primeira abordagem dos clientes.", real_metric_value: 85, threshold: 80 },
    { id: '4', name: 'Volume', self_score: 5, justification: "Tive problemas pessoais e meu volume de ligações caiu.", real_metric_value: 120, threshold: 150 },
    { id: '5', name: 'Follow-up', self_score: 7, justification: "Mantive a régua de contato em dia.", real_metric_value: 92, threshold: 95 }
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
