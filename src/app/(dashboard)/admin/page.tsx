import React from "react";
import { 
  Users, 
  Target, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Database, 
  Key, 
  BarChart3,
  Search,
  Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  // Dados simulados baseados na estrutura do banco
  const stats = [
    { label: "Vendedores Ativos", value: "47", change: "+12%", color: "text-vulp-brand" },
    { label: "PDIs em Evolução", value: "11", change: "-2%", color: "text-vulp-lilac" },
    { label: "Ciclos Concluídos", value: "3", change: "0%", color: "text-ui-muted" },
    { label: "Média Global", value: "7.2", change: "+0.5", color: "text-vulp-brand" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Top Header - Estilo Supabase */}
      <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-vulp-brand rounded-xl flex items-center justify-center font-black text-2xl shadow-glow-electric">V</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Painel de Controle</h1>
            <p className="text-xs text-ui-muted uppercase font-black tracking-widest mt-1">Visão Geral da Organização</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
            <input 
              placeholder="Buscar vendedor ou PDI..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-vulp-brand/50 transition-all w-64"
            />
          </div>
          <Button className="bg-vulp-brand hover:shadow-glow-electric rounded-lg font-bold text-xs">
            <Plus size={16} className="mr-2" /> Novo Ciclo
          </Button>
        </div>
      </div>

      {/* Grid de Conexões (Top Cards) */}
      <div className="grid md:grid-cols-5 gap-4 mb-12">
        {[
          { label: "Framework", icon: <Database size={18} />, sub: "Use a client library" },
          { label: "Direct", icon: <Activity size={18} />, sub: "Connection string" },
          { label: "ORM", icon: <Zap size={18} />, sub: "Third-party library" },
          { label: "MCP", icon: <Target size={18} />, sub: "Connect your agent" },
          { label: "API Keys", icon: <Key size={18} />, sub: "Manage project keys" },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-lg group hover:border-vulp-brand/30 transition-all cursor-pointer">
            <div className="text-ui-muted group-hover:text-vulp-brand transition-colors mb-4">{item.icon}</div>
            <h4 className="text-sm font-bold mb-1">{item.label}</h4>
            <p className="text-[10px] text-ui-muted">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Título da Seção */}
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-vulp-brand" size={20} />
        <h2 className="text-lg font-bold">Métricas em Tempo Real</h2>
        <div className="h-px bg-white/5 flex-1" />
        <select className="bg-transparent text-xs text-ui-muted border-none focus:ring-0">
          <option>Last 60 minutes</option>
          <option>Last 24 hours</option>
        </select>
      </div>

      {/* Grid de Gráficos (Bento Style) */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#111111] border-white/5 rounded-xl overflow-hidden hover:border-vulp-brand/20 transition-all group">
            <div className="p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-ui-muted mb-4">{stat.label}</p>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black italic tracking-tighter">{stat.value}</span>
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-status-promote' : 'text-status-critical'}`}>
                  {stat.change}
                </span>
              </div>

              {/* Simulação de Gráfico de Barras (Roxo Vulp) */}
              <div className="flex items-end gap-1.5 h-32">
                {[40, 20, 60, 30, 80, 45, 90, 35, 50, 75].map((h, j) => (
                  <div 
                    key={j} 
                    className="flex-1 bg-vulp-brand/20 group-hover:bg-vulp-brand transition-all duration-500 rounded-t-sm"
                    style={{ height: `${h}%`, opacity: (j / 10) + 0.3 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[8px] text-ui-muted font-mono">
                <span>2:14PM</span>
                <span>3:04PM</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Industrial */}
      <div className="mt-16 flex justify-between items-center text-[10px] text-ui-muted font-bold uppercase tracking-widest border-t border-white/5 pt-8">
        <div className="flex gap-8">
          <span className="hover:text-vulp-brand cursor-pointer">Documentação</span>
          <span className="hover:text-vulp-brand cursor-pointer">API Status</span>
          <span className="hover:text-vulp-brand cursor-pointer">Suporte</span>
        </div>
        <div>VULP INFRASTRUCTURE DASHBOARD</div>
      </div>
    </div>
  );
}
