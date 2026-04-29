# ☁️ Operação e Infraestrutura Supabase

Este documento fornece as diretrizes para manter e escalar o backend da **Roda da Venda 2.0**.

---

## 🏗️ Esquema de Banco de Dados

O banco de dados é gerido via migrações SQL localizadas em `/supabase/migrations/`.

### Tabelas Principais:
- `companies`: Tenants (empresas) isoladas.
- `profiles`: Perfis de usuários com metadados de Role e Leader.
- `cycles`: Ciclos de avaliação (ex: Abril 2026).
- `areas`: As 10 competências da Roda da Venda.
- `evaluations`: Onde residem as notas (Self, Leader e Calibrated).
- `pdi_templates`: Biblioteca de conhecimentos extraída do PDF oficial.
- `pdis`: Tarefas individuais geradas pela automação.

---

## 🤖 Automações (Triggers & Edge Functions)

### 1. Novo Usuário
Existe um trigger no banco (`handle_new_user`) que cria automaticamente um registro na tabela `profiles` sempre que alguém se cadastra, vinculando o usuário à empresa padrão e atribuindo o papel de `seller`.

### 2. Automação de PDI
Disparada via Server Action no arquivo `src/actions/automation.ts`.
- **Trigger:** Nota calibrada < 7.
- **Ação:** Cria 3 registros na tabela `pdis` baseados no template da área.

---

## 📈 Manutenção e Backups

### Migrações
Sempre que alterar o esquema do banco, crie uma nova migração:
1. Adicione o SQL em um novo arquivo em `/supabase/migrations/`.
2. Execute no painel do Supabase.
3. Commit no Git.

### Segurança de Dados (Hardening)
Conforme definido em `20260429_hardening_constraints_policies.sql`, o banco possui travas de integridade. **Nunca desabilite as Constraints ou o RLS em produção.**

---

## 🚀 Deploy
O projeto está configurado para deploy via **Vercel** ou qualquer provedor de Edge Functions que suporte Next.js.

**Checklist de Produção:**
- [ ] RLS habilitado em todas as tabelas.
- [ ] Variáveis de ambiente configuradas no provedor.
- [ ] Domínio configurado com HTTPS.
- [ ] Logs do Supabase monitorados.

---
*Equipe de DevOps & Cloud VULP*
