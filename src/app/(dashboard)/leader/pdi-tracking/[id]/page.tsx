import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, PlayCircle, Clock, CheckCircle2, Target, Trophy } from "lucide-react";
import Link from "next/link";

export default async function IndividualPDIPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock de dados do PDI baseado no maior gap (simulando a inteligência da calibragem)
  const sellerName = "André Silveira"; // Em prod, buscaria pelo ID
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link href="/leader/pdi-tracking" className="text-[10px] font-bold text-muted hover:text-vulp-brand uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors">
          <ChevronLeft size={14} /> Voltar ao Acompanhamento
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-sm font-bold text-vulp-brand uppercase tracking-[0.4em] mb-2">Plano de Desenvolvimento Individual</h1>
            <h2 className="text-5xl font-black italic uppercase text-foreground tracking-tighter">{sellerName}</h2>
          </div>
          <div className="flex gap-4">
            <Badge variant="promote" className="h-8 px-4 text-xs">Membro Elite</Badge>
            <div className="p-4 bg-vulp-brand/10 border border-vulp-brand/20 text-center">
              <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Score Geral</p>
              <p className="text-2xl font-black italic text-vulp-brand">7.8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Missão Ativa (O PDI gerado pela Calibragem) */}
        <div className="lg:col-span-8 space-y-8">
           <Card className="rounded-none border-vulp-brand bg-vulp-brand/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 bg-vulp-brand text-[10px] font-black uppercase text-white shadow-glow-purple">Missão Prioritária</div>
             <CardHeader className="p-8">
               <div className="flex items-center gap-3 mb-4">
                 <Target className="text-vulp-brand" size={24} />
                 <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Foco de Desenvolvimento: Follow-up</h3>
               </div>
               <CardTitle className="text-3xl font-black italic uppercase tracking-tight">Dominando a Re-conversão</CardTitle>
               <p className="text-sm text-ui-muted leading-relaxed max-w-2xl mt-4">
                 André, com base na sua última calibragem, identificamos que o follow-up é o ponto que está limitando sua conversão. Esta missão foca em técnicas de resgate de leads frios e cadência de contato.
               </p>
             </CardHeader>
             <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                   <div className="p-4 bg-background border border-border-vulp">
                     <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Prazo</p>
                     <p className="text-sm font-bold text-foreground">15 Dias</p>
                   </div>
                   <div className="p-4 bg-background border border-border-vulp">
                     <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Status</p>
                     <p className="text-sm font-bold text-status-train uppercase">Iniciado</p>
                   </div>
                   <div className="p-4 bg-background border border-border-vulp">
                     <p className="text-[9px] text-muted uppercase font-bold tracking-widest">Progresso</p>
                     <p className="text-sm font-bold text-vulp-brand">12%</p>
                   </div>
                </div>

                <div className="space-y-3">
                   <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Etapas da Missão</p>
                   {[
                     { task: "Curso: Psicologia da Persistência no WhatsApp", status: "completed" },
                     { task: "Roleplay: Reversão de lead 'estou apenas olhando'", status: "active" },
                     { task: "Configuração: Funil de Resgate no CRM", status: "pending" }
                   ].map((item, idx) => (
                     <div key={idx} className={`p-4 border ${item.status === 'completed' ? 'border-status-promote bg-status-promote/5' : 'border-border-vulp bg-background/50'} flex items-center justify-between transition-all`}>
                        <span className={`text-xs font-bold ${item.status === 'completed' ? 'text-status-promote line-through' : 'text-foreground'}`}>{item.task}</span>
                        {item.status === 'completed' ? <CheckCircle2 size={16} className="text-status-promote" /> : item.status === 'active' ? <PlayCircle size={16} className="text-vulp-brand animate-pulse" /> : <Clock size={16} className="text-muted" />}
                     </div>
                   ))}
                </div>
             </CardContent>
           </Card>

           {/* Histórico de Conquistas */}
           <div className="space-y-4">
             <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Missões Concluídas</h3>
             <div className="grid md:grid-cols-2 gap-4">
                <Card className="vulp-card p-6 border-status-promote/30 opacity-60">
                   <Trophy size={20} className="text-status-promote mb-4" />
                   <h4 className="text-sm font-black uppercase italic mb-1">Abertura de Impacto</h4>
                   <p className="text-[10px] text-muted">Concluído em 12/03/2026</p>
                </Card>
                <Card className="vulp-card p-6 border-status-promote/30 opacity-60">
                   <Trophy size={20} className="text-status-promote mb-4" />
                   <h4 className="text-sm font-black uppercase italic mb-1">Fechamento Agressivo</h4>
                   <p className="text-[10px] text-muted">Concluído em 05/02/2026</p>
                </Card>
             </div>
           </div>
        </div>

        {/* Sidebar de Insights do Líder */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="vulp-card p-8">
              <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-6">Diário de Evolução</h3>
              <div className="space-y-6">
                 {[
                   { date: "Há 2 horas", msg: "Calibragem concluída: Novo gap em 'Follow-up' identificado." },
                   { date: "Há 2 dias", msg: "André concluiu o módulo de Abordagem com nota 9.5." },
                   { date: "Há 1 semana", msg: "Aderência ao CRM aumentou em 15% após mentorias." }
                 ].map((log, idx) => (
                   <div key={idx} className="border-l-2 border-vulp-brand pl-4 py-1">
                      <p className="text-[9px] text-vulp-brand uppercase font-black">{log.date}</p>
                      <p className="text-xs text-foreground mt-1 font-medium">{log.msg}</p>
                   </div>
                 ))}
              </div>
              <Button className="w-full btn-vulp mt-8 text-[10px] h-10">Adicionar Anotação</Button>
           </Card>

           <Card className="bg-status-train/5 border-status-train/30 p-8 rounded-none">
              <div className="flex items-center gap-3 mb-4">
                 <Clock size={20} className="text-status-train" />
                 <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Próxima Mentoria</h3>
              </div>
              <p className="text-lg font-black uppercase italic text-foreground leading-tight">Terça-feira, 14:00</p>
              <p className="text-[10px] text-muted mt-2 uppercase font-bold tracking-widest">Foco: Reversão de Objeções</p>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
