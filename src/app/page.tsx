import React from "react";
import Link from "next/link";
import { ArrowRight, Target, Activity, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RadarWheel } from "@/components/charts/RadarWheel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-vulp-void text-vulp-white selection:bg-vulp-brand/30 overflow-x-hidden">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 bg-vulp-void/10 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo/vulp-roxo.png" alt="Vulp" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">VULP</span>
              <span className="text-[8px] text-vulp-brand uppercase tracking-[0.3em] font-black">Roda da Venda</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-ui-muted">
            <Link href="#metodo" className="hover:text-vulp-white transition-colors">Método</Link>
            <Link href="#solucoes" className="hover:text-vulp-white transition-colors">Soluções</Link>
            <Link href="#empresa" className="hover:text-vulp-white transition-colors">Empresa</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[10px] uppercase font-bold tracking-widest text-ui-muted hover:text-vulp-white">Entrar</Button>
            </Link>
            <Link href="/login?mode=signup">
              <Button className="bg-vulp-brand hover:shadow-glow-electric rounded-none uppercase text-[10px] font-black tracking-[0.2em] px-6">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-vulp-brand/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-vulp-lilac/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vulp-brand/10 border border-vulp-brand/20 text-vulp-brand text-[10px] font-black uppercase tracking-widest mb-8 animate-pulse">
              <Zap size={12} /> Nova Versão 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
              Performar <span className="text-vulp-brand">agora.</span><br />
              Liderar <span className="text-vulp-lilac">depois.</span>
            </h1>
            <p className="text-lg text-ui-muted max-w-lg mb-12 leading-relaxed">
              A plataforma definitiva para gestão de performance em vendas. Calibragem real, feedbacks precisos e evolução guiada por dados para times de alta escala.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/dashboard">
                <Button size="lg" className="bg-vulp-brand hover:shadow-glow-electric rounded-none uppercase font-black tracking-widest px-10 h-16 text-xs w-full sm:w-auto">
                  Acessar Sistema <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="#metodo">
                <Button variant="outline" size="lg" className="border-ui-border text-ui-muted hover:text-vulp-white hover:bg-white/5 rounded-none uppercase font-bold tracking-widest px-10 h-16 text-xs w-full sm:w-auto">
                  Conhecer Método
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            {/* Mockup do Dashboard */}
            <div className="bg-ui-surface/20 backdrop-blur-3xl border border-white/10 p-8 relative overflow-hidden group hover:border-vulp-brand/30 transition-all duration-700 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-vulp-lilac mb-1">Meu Score Atual</h3>
                  <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Ciclo Abril 2026</p>
                </div>
                <div className="px-3 py-1 bg-status-train/10 border border-status-train/20 text-status-train text-[8px] font-black uppercase tracking-widest">
                  Treinar
                </div>
              </div>
              
              <div className="flex flex-col items-center py-8">
                <div className="text-7xl font-black italic text-vulp-white mb-8 group-hover:scale-110 transition-transform duration-700">7.4</div>
                <RadarWheel 
                  size={280} 
                  labels={["CONV.", "TICKET", "ABORD.", "VOLUME", "FOLLOW", "PROD.", "COMUN.", "EXEC.", "DISCIP.", "LIDER."]} 
                  scores={[7.4, 5.2, 8.1, 4.5, 3.2, 6.8, 7.5, 5.9, 8.2, 4.1]} 
                />
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ui-muted">Conversão</span>
                  <span className="text-xs font-mono font-bold">7.4</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 overflow-hidden">
                  <div className="h-full bg-vulp-brand w-[74%] shadow-glow-electric" />
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ui-muted">Follow-up</span>
                  <span className="text-xs font-mono font-bold text-status-critical">3.2</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 overflow-hidden">
                  <div className="h-full bg-status-critical w-[32%] shadow-glow-critical" />
                </div>
              </div>
            </div>
            {/* Decoração Industrial */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-4 border-b-4 border-vulp-brand/30 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-4 border-t-4 border-vulp-lilac/30 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Features Rápidas */}
      <section className="py-20 border-t border-white/5 bg-ui-surface/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex gap-6">
            <div className="p-4 bg-vulp-brand/10 border border-vulp-brand/20 h-fit text-vulp-brand">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black italic uppercase mb-2">Calibragem Real</h4>
              <p className="text-sm text-ui-muted leading-relaxed">Elimine a subjetividade com o Fator Realidade que cruza percepção e dados brutos.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-vulp-lilac/10 border border-vulp-lilac/20 h-fit text-vulp-lilac">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black italic uppercase mb-2">Evolução Guiada</h4>
              <p className="text-sm text-ui-muted leading-relaxed">PDIs automatizados baseados em gaps reais de performance do time.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-status-promote/10 border border-status-promote/20 h-fit text-status-promote">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black italic uppercase mb-2">Decisão Estratégica</h4>
              <p className="text-sm text-ui-muted leading-relaxed">Saiba quem promover, treinar ou desligar com dashboards de alta precisão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] text-ui-muted uppercase font-bold tracking-[0.5em]">VULP Business &copy; 2026 | Gestão de Performance</p>
      </footer>
    </div>
  );
}
