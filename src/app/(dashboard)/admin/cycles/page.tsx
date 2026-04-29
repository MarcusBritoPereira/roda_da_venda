import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getCycles } from "@/actions/admin";
import { getAreas } from "@/actions/evaluations";
import { Settings, Plus } from "lucide-react";

export default async function AdminCyclesPage() {
  const cycles = await getCycles();
  const areas = await getAreas();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-sm font-bold text-ui-muted uppercase tracking-[0.4em] mb-2">Configuração de Sistema</h1>
          <h2 className="text-4xl font-black italic uppercase">Ciclos de Performance</h2>
        </div>
        <Button className="bg-vulp-brand shadow-glow-electric rounded-none px-6">
          <Plus size={18} className="mr-2" /> Novo Ciclo
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de Ciclos */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-bold text-ui-muted uppercase tracking-widest mb-4">Ciclos Recentes</h3>
          {cycles.length > 0 ? cycles.map((cycle) => (
            <Card key={cycle.id} className={`border-none rounded-none ${cycle.status === 'open' ? 'bg-vulp-brand/10 border-l-2 border-vulp-brand' : 'bg-ui-surface/20'}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold">{cycle.name}</p>
                  <p className="text-[10px] text-ui-muted uppercase">{new Date(cycle.start_date).toLocaleDateString()} - {new Date(cycle.end_date).toLocaleDateString()}</p>
                </div>
                <Badge variant={cycle.status === 'open' ? 'promote' : 'default'}>
                  {cycle.status === 'open' ? 'Ativo' : 'Encerrado'}
                </Badge>
              </CardContent>
            </Card>
          )) : (
            <p className="text-xs text-ui-muted italic">Nenhum ciclo cadastrado.</p>
          )}
        </div>

        {/* Configuração de Fator Realidade */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-none border-ui-border bg-ui-surface/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl">Calibragem de Realidade</CardTitle>
              <CardDescription>Defina as travas de nota baseadas nos indicadores reais do CRM.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {areas.length > 0 ? areas.map((area) => (
                  <div key={area.id} className="grid grid-cols-12 gap-6 items-center p-4 bg-vulp-void/50 border border-ui-border/50">
                    <div className="col-span-4">
                      <p className="font-bold text-sm uppercase tracking-tight">{area.name}</p>
                      <p className="text-[10px] text-ui-muted">Métrica: CRM_DATA_{area.name.toUpperCase()}</p>
                    </div>
                    <div className="col-span-3">
                      <label className="text-[9px] font-bold text-ui-muted uppercase block mb-1">Gatilho (Mínimo)</label>
                      <Input 
                        type="number" 
                        placeholder="Ex: 25%" 
                        className="h-10 text-xs font-mono rounded-none"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="text-[9px] font-bold text-ui-muted uppercase block mb-1">Nota Máxima Permitida</label>
                      <Input 
                        type="number" 
                        placeholder="Ex: 5" 
                        className="h-10 text-xs font-mono rounded-none"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button size="sm" variant="ghost" className="text-vulp-lilac hover:bg-vulp-brand/10">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center p-12 border border-dashed border-ui-border">
                    <p className="text-sm text-ui-muted">Cadastre as áreas da Roda da Venda primeiro para configurar o Fator Realidade.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
