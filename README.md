# 🎡 Roda da Venda 2.0 | Manual de Operações

Bem-vindo à documentação oficial de infraestrutura e operações da **Roda da Venda 2.0 (VULP Business)**. Este documento serve como guia para desenvolvedores e administradores de sistema.

---

## 🚀 Stack Tecnológica

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 15 (App Router)](https://nextjs.org/) | Interface de alta performance e SSR. |
| **Estilização** | [Tailwind CSS 4](https://tailwindcss.com/) | Design System "Cyber-Industrial" customizado. |
| **Backend** | [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) | Lógica de negócio segura do lado do servidor. |
| **Banco de Dados** | [PostgreSQL (Supabase)](https://supabase.com/) | Armazenamento relacional com RLS. |
| **Autenticação** | [Supabase Auth](https://supabase.com/auth) | Gestão de usuários e sessões JWT. |

---

## 🔐 Níveis de Acesso (RBAC)

O sistema utiliza um modelo de **Controle de Acesso Baseado em Papéis (RBAC)** integrado ao Row Level Security (RLS) do banco de dados.

| Papel | Descrição | Escopo de Acesso |
| :--- | :--- | :--- |
| **Vendedor (Seller)** | Usuário final que realiza autoavaliações. | Apenas seus próprios dados e missões de PDI. |
| **Líder (Leader)** | Gestor de equipe que calibra notas. | Dados dos vendedores vinculados ao seu `leader_id`. |
| **Administrador (Admin)** | Gestor global da empresa. | Acesso a todas as métricas, ciclos e configurações da empresa. |

> [!IMPORTANT]
> A promoção de um usuário para **Admin** ou **Líder** deve ser feita via banco de dados ou painel administrativo, conforme detalhado em [docs/GOVERNANCA.md](file:///Users/marcuspereira/roda_da_venda/docs/GOVERNANCA.md).

---

## 🛠️ Guia de Início Rápido

### 1. Requisitos
- Node.js 20+
- Instância do Supabase configurada.

### 2. Configuração de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves:
```bash
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
DATABASE_URL=sua_url_de_conexao_postgres
```

### 3. Instalação e Execução
```bash
npm install
npm run dev
```
Acesse: `http://localhost:3001`

---

## 📁 Estrutura de Documentação Complementar
- [Analise de Gaps](file:///Users/marcuspereira/roda_da_venda/docs/analise_gaps_aplicacao.md)
- [Guia de Governança e Acessos](file:///Users/marcuspereira/roda_da_venda/docs/GOVERNANCA.md)
- [Esquema de Banco de Dados](file:///Users/marcuspereira/roda_da_venda/supabase/migrations/20260428_initial_schema.sql)

---
*Documentação mantida pela equipe de DevOps VULP.*
