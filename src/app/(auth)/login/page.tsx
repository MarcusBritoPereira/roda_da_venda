import { login } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input"; // Vou criar esse componente em seguida
import Link from "next/link";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center bg-vulp-void p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vulp-electric/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vulp-magenta/10 blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md border-vulp-electric/20 bg-ui-surface/60 backdrop-blur-2xl relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-vulp-brand rounded-xl flex items-center justify-center font-black text-2xl shadow-glow-electric">
              V
            </div>
          </div>
          <CardTitle className="text-2xl justify-center">Bem-vindo de volta</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar a Roda da Venda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-1">E-mail</label>
              <Input
                name="email"
                type="email"
                placeholder="exemplo@gmail.com"
                required
                className="bg-vulp-void/50 border-ui-border focus:border-vulp-lilac"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-ui-muted">Senha</label>
                <Link href="#" className="text-[10px] text-vulp-lilac hover:underline">Esqueceu a senha?</Link>
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-vulp-void/50 border-ui-border focus:border-vulp-lilac"
              />
            </div>

            {searchParams.error && (
              <p className="text-xs text-status-dismiss bg-status-dismiss/10 p-3 rounded-lg border border-status-dismiss/20 text-center font-medium">
                {searchParams.error}
              </p>
            )}

            <Button type="submit" className="w-full h-12 text-base mt-4">
              Acessar Plataforma
            </Button>
          </form>

          <p className="text-center text-xs text-ui-muted mt-8">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-vulp-lilac font-bold hover:underline">
              Solicitar Acesso
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
