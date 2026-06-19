'use client'

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error("As senhas não coincidem.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0], // Nome provisório
            }
          }
        });
        if (error) throw error;
        alert("Verifique seu e-mail para confirmar o cadastro!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vulp-void flex items-stretch overflow-hidden">
      {/* Lado Esquerdo: Formulário */}
      <div className="w-full lg:w-[480px] p-8 md:p-16 flex flex-col justify-center bg-ui-surface/5 backdrop-blur-3xl border-r border-white/5 relative z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vulp-brand via-vulp-lilac to-vulp-brand animate-gradient-x" />
        
        <Link href="/" className="flex flex-col items-center gap-3 mb-12 group">
          <div className="relative group">
            <div className="absolute inset-0 bg-vulp-brand/20 blur-2xl rounded-full transition-all group-hover:bg-vulp-brand/40" />
            <img 
              src="/logo/vulp-icon-branco.png" 
              alt="Vulp" 
              className="relative w-16 h-16 object-contain" 
            />
          </div>
          <span className="font-bold text-lg tracking-tight">VULP</span>
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
            {mode === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h1>
          {mode === 'login' && (
            <p className="text-sm text-ui-muted font-medium">
              Acesse sua central de performance estratégica.
            </p>
          )}
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted ml-1">E-mail Corporativo</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-muted" size={18} />
              <Input 
                type="email" 
                placeholder="exemplo@vulp.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 h-14 pl-12 rounded-none focus:border-vulp-brand/50 transition-all text-white placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted ml-1">
              {mode === 'login' ? 'Senha de Acesso' : 'Cadastrar senha'}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-muted" size={18} />
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 h-14 pl-12 rounded-none focus:border-vulp-brand/50 transition-all text-white placeholder:text-white/20"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-ui-muted ml-1">Confirme sua Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-muted" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 h-14 pl-12 rounded-none focus:border-vulp-brand/50 transition-all text-white placeholder:text-white/20"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-status-critical/10 border border-status-critical/20 text-status-critical text-xs font-bold uppercase tracking-widest animate-shake">
              {error}
            </div>
          )}

          <Button 
            disabled={loading}
            className="w-full h-14 bg-vulp-brand hover:shadow-glow-electric rounded-none uppercase font-black tracking-[0.2em] text-xs transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>{mode === 'login' ? 'Entrar no Sistema' : 'Finalizar Cadastro'} <ArrowRight size={18} className="ml-2" /></>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest text-ui-muted">
            {mode === 'login' ? 'Não tem uma conta?' : 'Já possui acesso?'} 
            <Link 
              href={mode === 'login' ? '/login?mode=signup' : '/login?mode=login'} 
              className="ml-2 text-vulp-brand hover:text-vulp-white transition-colors"
            >
              {mode === 'login' ? 'Cadastre-se agora' : 'Faça login'}
            </Link>
          </p>
        </div>
      </div>

      {/* Lado Direito: Visual Imersivo */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-vulp-void overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vulp-brand/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        
        <div className="relative z-10 text-center px-20">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8 text-vulp-white">
            Meta batida e <br />
            <span className="text-vulp-brand">time ativado!</span>
          </h2>
          <p className="text-xl text-ui-muted font-medium italic">
            o controle da perfomance do seu time em suas mãos.
          </p>
        </div>

        {/* Decoração Industrial (Grid) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    </div>
  );
}
