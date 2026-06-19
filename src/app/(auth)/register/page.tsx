import React from "react";
import { registerSaaS } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Zap, ShieldCheck, Rocket, Building2, User, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-vulp-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-vulp-lilac/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Lado Esquerdo: Valor do SaaS */}
        <div className="hidden lg:block space-y-12">
           <div className="flex items-center gap-4 mb-12">
              <img src="/logo/vulp-icon-branco.png" alt="Vulp" className="w-16 h-16" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Roda da Venda</h1>
           </div>

           <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-black italic uppercase text-white leading-tight tracking-tighter">
                  Ontem você dormiu pensando nisso.
                </h2>
              </div>

              <div className="space-y-6 text-xl text-ui-muted leading-relaxed font-medium italic">
                <p>&quot;Meu time não bateu a meta de novo&quot;</p>
                <p>&quot;Tenho 2 vendedores bons. Se eu perder eles já era minhas vendas&quot;</p>
                <p>&quot;Sei que meu time precisa melhorar, mas não sei por onde começar&quot;</p>
              </div>

              <div className="p-8 bg-vulp-brand/10 border-l-4 border-vulp-brand backdrop-blur-sm space-y-4">
                <p className="text-white font-bold text-lg leading-snug">Mais de 500 donos de loja já descobriram exatamente onde estava o buraco.</p>
                <p className="text-vulp-brand font-black uppercase italic tracking-widest text-3xl shadow-glow-lilac-sm">
                  AGORA É SUA VEZ.
                </p>
              </div>
           </div>
        </div>

        {/* Lado Direito: Formulário */}
        <Card className="vulp-card border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-12">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-3xl font-black italic uppercase tracking-tight text-white mb-2">Comece Agora</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form action={registerSaaS} className="space-y-4">
              {searchParams.error && (
                <div className="p-4 bg-status-critical/10 border border-status-critical/20 text-status-critical text-xs font-bold uppercase rounded-lg mb-6">
                  {searchParams.error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
                  <input name="full_name" required className="vulp-input pl-10 h-12 w-full" placeholder="Ex: Marcus Rodrigo" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
                  <input name="email" type="email" required className="vulp-input pl-10 h-12 w-full" placeholder="marcus@sualoja.com.br" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest">Nome da sua Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
                  <input name="company_name" required className="vulp-input pl-10 h-12 w-full" placeholder="Ex: Vulp Automotive Store" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest">Cadastrar senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
                  <input name="password" type="password" required className="vulp-input pl-10 h-12 w-full" placeholder="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest">Confirme sua Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-muted" size={16} />
                  <input name="confirm_password" type="password" required className="vulp-input pl-10 h-12 w-full" placeholder="••••••••" />
                </div>
              </div>

              <Button type="submit" className="w-full btn-vulp py-7 text-sm shadow-glow-purple mt-6 group">
                QUERO ATIVAR MINHA EQUIPE <Zap size={16} className="ml-2 group-hover:scale-125 transition-transform" />
              </Button>

              <div className="text-center pt-6">
                <p className="text-[10px] text-ui-muted font-bold uppercase tracking-widest">
                  Já tem uma conta? <Link href="/login" className="text-vulp-brand hover:underline">Faça Login</Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
