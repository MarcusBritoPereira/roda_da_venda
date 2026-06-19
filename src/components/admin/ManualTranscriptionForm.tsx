'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, Loader2, CheckCircle2, User } from "lucide-react";
import { saveManualTranscription } from "@/actions/transcription";
import { useRouter } from "next/navigation";

interface ManualTranscriptionFormProps {
  sellers: any[];
  areas: any[];
  companyId: string;
  cycleId: string;
}

export function ManualTranscriptionForm({ sellers, areas, companyId, cycleId }: ManualTranscriptionFormProps) {
  const [selectedSeller, setSelectedSeller] = useState("");
  const [scores, setScores] = useState<Record<string, { self: number, leader: number, comment: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Inicializar scores se vazio
  const currentScores = { ...scores };
  areas.forEach(area => {
    if (!currentScores[area.id]) {
      currentScores[area.id] = { self: 5, leader: 5, comment: "" };
    }
  });

  const handleSave = async () => {
    if (!selectedSeller) return alert("Selecione um vendedor");
    
    setIsSaving(true);
    try {
      const payload = areas.map(area => ({
        area_id: area.id,
        area_name: area.name,
        self_score: scores[area.id]?.self || 5,
        leader_score: scores[area.id]?.leader || 5,
        comment: scores[area.id]?.comment || ""
      }));

      await saveManualTranscription({
        seller_id: selectedSeller,
        company_id: companyId,
        cycle_id: cycleId,
        scores: payload
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedSeller("");
        setScores({});
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar transcrição.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Seleção do Vendedor */}
      <Card className="vulp-card p-8">
        <div className="flex items-center gap-4 mb-6">
          <User className="text-vulp-brand" size={24} />
          <div className="flex-1">
            <label className="text-[10px] font-bold text-ui-muted uppercase tracking-widest mb-2 block">Selecione o Vendedor para Transcrição</label>
            <select 
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="vulp-input w-full bg-vulp-void/50 h-12"
            >
              <option value="">Escolha um vendedor...</option>
              {sellers.filter(s => s.role === 'seller').map(s => (
                <option key={s.id} value={s.id}>{s.full_name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tabela de Notas */}
      <Card className="vulp-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-vulp-brand/10 text-[10px] font-black uppercase tracking-widest text-vulp-brand border-b border-white/5">
                <th className="p-6">Área / Competência</th>
                <th className="p-6 text-center">Nota Vendedor (Papel)</th>
                <th className="p-6 text-center">Nota Líder (Calibragem)</th>
                <th className="p-6">Breve Comentário (Opcional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <p className="font-bold italic uppercase text-sm text-foreground">{area.name}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-1">
                      <input 
                        type="number"
                        min="1"
                        max="10"
                        value={scores[area.id]?.self || 5}
                        onChange={(e) => setScores(prev => ({
                          ...prev,
                          [area.id]: { ...prev[area.id], self: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-16 h-10 bg-vulp-void border border-white/10 text-center font-mono focus:border-vulp-brand outline-none"
                      />
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-1">
                      <input 
                        type="number"
                        min="1"
                        max="10"
                        value={scores[area.id]?.leader || 5}
                        onChange={(e) => setScores(prev => ({
                          ...prev,
                          [area.id]: { ...prev[area.id], leader: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-16 h-10 bg-vulp-brand/20 border border-vulp-brand text-center font-mono focus:border-vulp-brand outline-none"
                      />
                    </div>
                  </td>
                  <td className="p-6">
                    <input 
                      placeholder="Ex: Evoluir no fechamento..."
                      value={scores[area.id]?.comment || ""}
                      onChange={(e) => setScores(prev => ({
                        ...prev,
                        [area.id]: { ...prev[area.id], comment: e.target.value }
                      }))}
                      className="w-full h-10 bg-vulp-void/50 border border-white/10 px-4 text-xs focus:border-vulp-brand outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-vulp-void/50 flex justify-between items-center">
           <div className="text-xs text-ui-muted font-bold uppercase tracking-widest">
              {selectedSeller ? "Pronto para salvar dados de " + sellers.find(s => s.id === selectedSeller)?.full_name : "Selecione um vendedor para continuar"}
           </div>
           <Button 
             onClick={handleSave}
             disabled={isSaving || !selectedSeller}
             className="btn-vulp px-12 py-6 text-sm shadow-glow-purple"
           >
             {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
             FINALIZAR TRANSCRIÇÃO DIGITAL
           </Button>
        </div>
      </Card>

      {/* Overlay de Sucesso */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in zoom-in duration-300">
           <div className="text-center">
              <CheckCircle2 size={80} className="text-status-promote mx-auto mb-6" />
              <h2 className="text-3xl font-black italic uppercase text-white">Transcrição Concluída!</h2>
              <p className="text-ui-muted text-xs font-bold uppercase mt-2">Os dados foram salvos e o PDI foi gerado.</p>
           </div>
        </div>
      )}
    </div>
  );
}
