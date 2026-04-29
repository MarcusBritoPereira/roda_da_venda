import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RadarWheel } from "@/components/charts/RadarWheel";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { Target, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Home() {
  const sampleLabels = ["Conv.", "Ticket", "Abord.", "Volume", "Follow", "Prod.", "Comun.", "Exec.", "Discip.", "Lider."];
  const sampleScores = [7.4, 5.2, 8.1, 4.5, 3.2, 6.7, 7.8, 5.5, 8.4, 4.1];

  return (
    <main className="min-h-screen bg-vulp-void text-vulp-white p-6 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-vulp-brand rounded-lg flex items-center justify-center font-black text-xl">
            V
          </div>
          <div>
            <h1 className="text-2xl">VULP</h1>
            <p className="text-[10px] tracking-[0.2em] text-vulp-lilac uppercase -mt-1">
              Roda da Venda 2.0
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button variant="primary" size="sm">Começar Agora</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <Badge variant="promote" className="mb-4">NOVA VERSÃO 2026</Badge>
          <h2 className="text-5xl md:text-7xl mb-6 leading-tight">
            Performar agora.<br />
            <span className="text-vulp-lilac">Liderar depois.</span>
          </h2>
          <p className="text-ui-muted text-lg max-w-md mb-8">
            A plataforma definitiva para gestão de performance em vendas. 
            Calibragem real, feedbacks precisos e evolução guiada por dados.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Acessar Sistema</Button>
            <Button variant="outline" size="lg">Conhecer Método</Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-vulp-electric/20 blur-3xl rounded-full" />
          <Card className="relative border-vulp-electric/30 bg-ui-surface/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Meu Score Atual</CardTitle>
                <Badge variant="train">Treinar</Badge>
              </div>
              <CardDescription>Ciclo Abril 2026</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-7xl font-black text-white mb-8 drop-shadow-glow-electric">
                7.4
              </div>
              <RadarWheel 
                size={280} 
                labels={sampleLabels} 
                scores={sampleScores}
              />
              <div className="w-full mt-8 space-y-4">
                <ScoreBar label="Conversão" score={7.4} color="var(--color-vulp-lilac)" />
                <ScoreBar label="Follow-up" score={3.2} color="var(--color-status-dismiss)" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Target className="w-8 h-8 text-vulp-lilac mb-2" />
            <CardTitle>Fator Realidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ui-muted">
              Chega de avaliações subjetivas. Seus indicadores reais calibram sua pontuação automaticamente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-vulp-lilac mb-2" />
            <CardTitle>PDI Dinâmico</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ui-muted">
              Plano de Desenvolvimento Individual gerado automaticamente com foco nos seus maiores gaps.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle2 className="w-8 h-8 text-vulp-lilac mb-2" />
            <CardTitle>Multi-Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ui-muted">
              Interfaces otimizadas para Vendedores, Líderes e Diretores. Visão clara para todos os níveis.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-24 pt-8 border-t border-ui-border text-center">
        <p className="text-xs text-ui-muted uppercase tracking-widest">
          VULP DESIGN SYSTEM • RODA DA VENDA 2.0
        </p>
      </footer>
    </main>
  );
}
