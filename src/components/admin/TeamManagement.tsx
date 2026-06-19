'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Shield, 
  Mail, 
  Search, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { getCompanyTeam, createProfile } from "@/actions/management";
import { Badge } from "@/components/ui/Badge";

export default function TeamManagementPage({ companyId }: { companyId: string }) {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "seller" as "leader" | "seller" });

  useEffect(() => {
    loadTeam();
  }, [companyId]);

  async function loadTeam() {
    setLoading(true);
    const data = await getCompanyTeam(companyId);
    setTeam(data);
    setLoading(false);
  }

  async function handleAddMember() {
    if (!newMember.name || !newMember.email) return alert("Preencha todos os campos");
    
    try {
      await createProfile({
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        company_id: companyId
      });
      setIsAdding(false);
      setNewMember({ name: "", email: "", role: "seller" });
      loadTeam();
    } catch (error) {
      alert("Erro ao adicionar membro.");
    }
  }

  const filteredTeam = team.filter(m => 
    m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header com Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-foreground">Gestão de Time</h1>
          <p className="text-xs text-ui-muted uppercase font-black tracking-widest mt-1">Administre seus líderes e vendedores</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="btn-vulp shadow-glow-purple">
          <UserPlus size={16} className="mr-2" /> ADICIONAR MEMBRO
        </Button>
      </div>

      {/* Busca e Filtros */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-muted" size={18} />
        <input 
          placeholder="Buscar por nome ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="vulp-input w-full pl-12 h-14"
        />
      </div>

      {/* Modal / Form de Adição Rápida */}
      {isAdding && (
        <Card className="vulp-card border-vulp-brand animate-in slide-in-from-top duration-300">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Novo Membro da Equipe</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <input 
              placeholder="Nome Completo"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              className="vulp-input"
            />
            <input 
              placeholder="E-mail"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="vulp-input"
            />
            <select 
              value={newMember.role}
              onChange={(e) => setNewMember({...newMember, role: e.target.value as "leader" | "seller"})}
              className="vulp-input bg-vulp-void"
            >
              <option value="seller">Vendedor</option>
              <option value="leader">Líder / Gestor</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={handleAddMember} className="flex-1 btn-vulp">SALVAR</Button>
              <Button onClick={() => setIsAdding(false)} variant="ghost">CANCELAR</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Time */}
      <Card className="vulp-card overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <Loader2 className="animate-spin mx-auto text-vulp-brand mb-4" size={40} />
            <p className="text-xs text-ui-muted uppercase font-bold tracking-widest">Carregando sua tropa...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-ui-muted border-b border-white/5">
                  <th className="p-6">Membro</th>
                  <th className="p-6">Cargo</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-ui-surface rounded-lg border border-white/10 flex items-center justify-center font-black text-vulp-brand">
                          {member.full_name.substring(0, 1)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{member.full_name}</p>
                          <p className="text-[10px] text-ui-muted flex items-center gap-1">
                            <Mail size={10} /> {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        {member.role === 'leader' ? (
                          <Badge variant="promote" className="bg-vulp-lilac/20 text-vulp-lilac border-vulp-lilac/30">
                            <Shield size={10} className="mr-1" /> LÍDER
                          </Badge>
                        ) : (
                          <Badge variant="default" className="bg-white/5 text-ui-muted border-white/10">
                            <Users size={10} className="mr-1" /> VENDEDOR
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                        <span className="w-2 h-2 rounded-full bg-status-promote shadow-glow-electric animate-pulse" />
                        ATIVO
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="text-ui-muted hover:text-status-critical transition-colors p-2">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
