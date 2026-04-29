import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default async function SignupPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center bg-vulp-void p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-vulp-magenta/10 blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md border-vulp-electric/20 bg-ui-surface/60 backdrop-blur-2xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl justify-center">Criar sua conta</CardTitle>
          <CardDescription>
            Junte-se à plataforma Roda da Venda 2.0
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-1">Nome Completo</label>
              <Input
                name="full_name"
                placeholder="Ex: Marcus Rodrigo"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-1">E-mail Corporativo</label>
              <Input
                name="email"
                type="email"
                placeholder="marcus@exemplo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ui-muted ml-1">Senha</label>
              <Input
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            {searchParams.error && (
              <p className="text-xs text-status-dismiss bg-status-dismiss/10 p-3 rounded-lg border border-status-dismiss/20 text-center font-medium">
                {searchParams.error}
              </p>
            )}

            <Button type="submit" className="w-full h-12 text-base mt-4">
              Cadastrar e Começar
            </Button>
          </form>

          <p className="text-center text-xs text-ui-muted mt-8">
            Já possui acesso?{" "}
            <Link href="/login" className="text-vulp-lilac font-bold hover:underline">
              Fazer Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
