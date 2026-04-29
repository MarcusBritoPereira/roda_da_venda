# 🔐 Guia de Governança e Controle de Acesso

Este documento detalha como a **Roda da Venda 2.0** protege os dados e gerencia as permissões dos usuários.

---

## 🏛️ Modelo de Segurança: Row Level Security (RLS)

Diferente de aplicações tradicionais onde a segurança reside apenas no código, a Roda da Venda utiliza **RLS diretamente no PostgreSQL**. Isso significa que mesmo que uma Action do servidor falhe, o banco de dados impedirá o acesso a dados de outros tenants ou usuários.

### 🛡️ Políticas Implementadas:
1.  **Isolamento de Tenant:** Todas as tabelas possuem a coluna `company_id`. O banco filtra automaticamente registros que não pertencem ao `company_id` do usuário logado.
2.  **Propriedade (Ownership):** Vendedores só podem ler/editar suas próprias avaliações e PDIs.
3.  **Hierarquia de Gestão:** Líderes podem ler e atualizar apenas avaliações de perfis onde `leader_id = auth.uid()`.

---

## 👥 Papéis e Fluxos de Acesso

### 1. Vendedor (Seller)
- **Acesso:** `/dashboard`, `/evaluations/new`.
- **Ações:** Realizar autoavaliação, visualizar seu Radar, marcar PDIs como concluídos.
- **Restrição:** Não possui acesso às rotas `/leader` ou `/admin`.

### 2. Líder (Leader)
- **Acesso:** Tudo do Vendedor + `/leader`, `/leader/pdi-tracking`.
- **Ações:** Calibrar notas do seu time, visualizar progresso de PDIs do time.
- **Restrição:** Não possui acesso às configurações globais em `/admin`.

### 3. Administrador (Admin)
- **Acesso:** Acesso total `/admin`, gestão de ciclos e usuários.
- **Ações:** Abrir/Fechar ciclos, definir fatores de realidade globais, gerenciar permissões.

---

## 🔑 Como Promover um Usuário

Atualmente, a promoção de papel é feita via metadados do Supabase ou atualização direta na tabela `profiles`.

### Exemplo SQL para promover a Líder:
```sql
UPDATE profiles 
SET role = 'leader'::user_role 
WHERE id = 'uuid-do-usuario';
```

### Exemplo SQL para vincular Vendedor a um Líder:
```sql
UPDATE profiles 
SET leader_id = 'uuid-do-lider' 
WHERE id = 'uuid-do-vendedor';
```

---

## 🚦 Fluxo de Autenticação
1. O usuário faz login via Supabase Auth.
2. O Middleware do Next.js intercepta a sessão.
3. O DashboardLayout filtra os itens do menu baseando-se no campo `role` do perfil.
4. Caso um usuário tente acessar uma rota não autorizada (ex: Seller tentando entrar em `/admin`), o Next.js redireciona para o `/dashboard`.

---
*Equipe de DevOps & Segurança VULP*
