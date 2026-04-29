import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, Users, Target, Activity, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // Em produção, aqui buscaríamos dados agregados do Supabase
  const stats = {
    totalSellers: 24,
    activeCycles: 1,
    globalAvg: 7.2,
    pdiCompletion: 68
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-sm font-bold text-ui-muted uppercase tracking-[0.4em] mb-2">Painel de Controle</h1>
          <h2 className="text-4xl font-black italic uppercase">Administração Global</h2>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/cycles">
            <Button className="rounded-none bg-vulp-brand hover:shadow-glow-electric transition-all uppercase text-[10px] font-bold tracking-widest px-8">
              Gerenciar Ciclos
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid de Stats Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="rounded-none border-ui-border bg-ui-surface/20 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-vulp-brand/10 text-vulp-lilac">
              <Users size={20} />
            </div>
            <span className="text-[10px] text-status-promote font-bold">+12%</span>
          </div>
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-1">Total de Vendedores</p>
          <p className="text-3xl font-black italic">{stats.totalSellers}</p>
        </Card>

        <Card className="rounded-none border-ui-border bg-ui-surface/20 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-status-train/10 text-status-train">
              <Target size={20} />
            </div>
            <span className="text-[10px] text-ui-muted font-bold italic">ATIVO</span>
          </div>
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-1">Ciclos Ativos</p>
          <p className="text-3xl font-black italic">{stats.activeCycles}</p>
        </Card>

        <Card className="rounded-none border-ui-border bg-ui-surface/20 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-vulp-lilac/10 text-vulp-lilac">
              <Activity size={20} />
            </div>
            <span className="text-[10px] text-status-promote font-bold">ALTO</span>
          </div>
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-1">Média Global</p>
          <p className="text-3xl font-black italic">{stats.globalAvg}</p>
        </Card>

        <Card className="rounded-none border-ui-border bg-ui-surface/20 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-status-promote/10 text-status-promote">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] text-ui-muted font-bold">{stats.pdiCompletion}%</span>
          </div>
          <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest mb-1">Conclusão de PDIs</p>
          <div className="w-full bg-ui-border h-1 mt-2">
            <div className="bg-status-promote h-full" style={{ width: `${stats.pdiCompletion}%` }} />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Gráfico de Evolução da Empresa */}
        <Card className="lg:col-span-2 rounded-none border-ui-border bg-ui-surface/5 p-8 h-[400px] flex flex-col">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-xl italic font-black uppercase">Evolução de Performance</CardTitle>
            <CardDescription className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Comparativo dos últimos 6 meses</CardDescription>
          </CardHeader>
          <div className="flex-1 flex items-end gap-2 px-4">
             {/* Simulação de gráfico de barras industrial */}
             {[4.2, 5.8, 5.1, 6.4, 7.0, 7.2].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div 
                   className="w-full bg-vulp-brand/20 border-t-2 border-vulp-brand transition-all group-hover:bg-vulp-brand/40 group-hover:shadow-glow-electric" 
                   style={{ height: `${val * 10}%` }}
                 />
                 <span className="text-[8px] font-mono text-ui-muted uppercase">{['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'][i]}</span>
               </div>
             ))}
          </div>
        </Card>

        {/* Alertas Administrativos */}
        <div className="space-y-6">
          <Card className="rounded-none border-status-critical/30 bg-status-critical/5 p-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-status-critical mb-4 flex items-center gap-2">
              <Activity size={14} /> Alerta de Gap
            </h4>
            <p className="text-xs text-ui-muted leading-relaxed mb-4">
              A área de **"Follow-up"** está 30% abaixo da meta média da empresa. Recomendamos revisar o treinamento de CRM.
            </p>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-[10px] font-bold uppercase text-status-critical hover:bg-transparent">
              Ver Detalhes <ChevronRight size={12} className="ml-1" />
            </Button>
          </Card>

          <Card className="rounded-none border-ui-border bg-ui-surface/5 p-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-vulp-brand mb-4 flex items-center gap-2">
              <Settings size={14} /> Configurações Rápidas
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-b border-ui-border/30 pb-2">
                <span>Fator Realidade Global</span>
                <span className="text-status-promote text-[8px]">ATIVADO</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-b border-ui-border/30 pb-2">
                <span>Autoavaliações Pendentes</span>
                <span className="text-vulp-lilac">08</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                <span>Membros sem Líder</span>
                <span className="text-status-critical">02</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
