# Análise completa — Roda da Venda

## Resumo executivo

A aplicação já tem uma base funcional com **Next.js App Router + Supabase + Server Actions**, mas hoje está em estágio de MVP/protótipo, com gaps importantes em **qualidade de código, segurança/autorização fina, integridade de dados, governança multi-tenant, observabilidade e prontidão de produção**.

---

## Principais gaps identificados e como resolver

## 1) Qualidade e estabilidade de front-end/build

### Gap
- O projeto não passa no lint (46 problemas, sendo 26 erros), incluindo:
  - `any` explícito em vários pontos.
  - componente com referência não definida (`Badge` em `CalibrationForm`).
  - uso de `Math.random()` durante render em página server/component, quebrando regra de pureza do React.
  - textos JSX com aspas não escapadas.
  - tipos vazios e imports não usados.

### Impacto
- Build/CI instável.
- Maior chance de bug visual e runtime.
- Dificulta evolução e onboarding técnico.

### Como resolver
1. Definir meta de `lint=0 erros` em curto prazo.
2. Remover `any` com tipos explícitos (interfaces DTO para avaliações, áreas e equipe).
3. Corrigir regras React purity (gerar mocks fora da renderização, em seed/factory estática).
4. Corrigir JSX e símbolos não definidos.
5. Separar/proteger arquivos de design playground (`vulp-design-system.jsx`) para não bloquear CI (mover para pasta `examples/` com eslint override).

---

## 2) Domínio de autorização incompleto (RLS parcial)

### Gap
- RLS foi habilitado em algumas tabelas, mas não em todas as tabelas usadas pelas actions (ex.: `pdis`, `pdi_templates`, `reality_factor_rules`).
- Políticas mostradas cobrem `profiles`, `cycles`, `areas`, mas faltam políticas explícitas por papel para leitura/escrita em `evaluations`, `pdis`, `real_metrics` e regras administrativas.
- Actions de servidor executam updates sem verificação de ownership/role antes da operação (ex.: update de status de PDI por id simples).

### Impacto
- Risco de acesso indevido entre usuários/empresas.
- Violação de segregação por tenant e por função (seller/leader/admin).

### Como resolver
1. Habilitar RLS em todas as tabelas de negócio restantes.
2. Criar políticas por papel e tenant:
   - seller: só seus registros.
   - leader: registros do time vinculado.
   - admin/director: escopo da empresa.
3. Em cada Server Action, validar role + ownership antes de `insert/update`.
4. Criar testes SQL de política (casos de permitir/negar).

---

## 3) Integridade de dados e regras de negócio insuficientes

### Gap
- `evaluations` não aparenta restrição de unicidade por `(cycle_id, seller_id, area_id)`.
- Campos de nota não têm `CHECK` no banco (1..10).
- `cycles.status` é texto livre em vez de enum.
- `createCycle` usa `company_id` vindo de metadata de usuário com comentário de “exemplo simplificado”.
- `submitEvaluation` define parse manual simplificado e schema Zod declarado mas não aplicado.

### Impacto
- Duplicidade e inconsistência de avaliação.
- Risco de dados inválidos persistidos.
- Automações e dashboards com resultados distorcidos.

### Como resolver
1. Adicionar constraints SQL:
   - unique composto em avaliações.
   - `CHECK` de faixa para notas.
   - enum para status de ciclo.
2. Usar Zod efetivamente no payload das actions.
3. Evitar metadados frágeis para `company_id`; preferir lookup do `profiles.company_id`.
4. Encapsular gravações críticas em RPC/transação.

---

## 4) Automação de PDI frágil

### Gap
- `autoAssignPDI` dispara com score < 7, mas sem mecanismo de idempotência (pode criar missões duplicadas em reprocessamentos).
- Uso de string de `area_name` para mapear template (suscetível a divergência nominal).
- Erros apenas com `console.error` sem telemetria.

### Impacto
- Duplicação de tarefas e ruído operacional.
- Baixa confiabilidade da jornada de desenvolvimento do vendedor.

### Como resolver
1. Adotar chave estável (`area_id`) no template.
2. Criar controle idempotente (chave única por seller+cycle+template+mission).
3. Persistir trilha de execução de automação (`automation_runs`).
4. Integrar alertas/monitoramento para falhas.

---

## 5) Lacunas de observabilidade e operação

### Gap
- Não há evidência de stack de observabilidade (logs estruturados, tracing, métricas de erro/SLA).
- Ausência de tratamento consistente de erros para UX (mensagens e fallback).

### Impacto
- Dificuldade para diagnosticar incidentes.
- Percepção de instabilidade pelo usuário final.

### Como resolver
1. Implementar logger estruturado com contexto (user_id, action, tenant, correlation_id).
2. Captura de exceções client/server (ex.: Sentry).
3. Definir SLO básico (latência actions, taxa de erro, falha de automação).

---

## 6) Documentação e prontidão de ambiente

### Gap
- README ainda é padrão do create-next-app e não descreve domínio, setup Supabase, variáveis de ambiente, fluxo de papéis e automações.
- Não há evidência de suíte de testes automatizados (unit, integração, e2e).

### Impacto
- Alto tempo de onboarding.
- Risco de regressão em cada release.

### Como resolver
1. Reescrever README com arquitetura real, modelo de dados, execução local e deploy.
2. Criar testes:
   - unit para regras de score e fator realidade.
   - integração para actions + supabase.
   - e2e para jornada seller/leader/admin.
3. Pipeline CI com `lint + typecheck + test + build` como gate de merge.

---

## 7) Experiência do produto ainda com mocks

### Gap
- Trechos do dashboard/leader usam dados mockados e placeholders.
- Algumas consultas/estatísticas estão hardcoded.

### Impacto
- Decisões de negócio podem ser baseadas em dados não reais.

### Como resolver
1. Substituir mocks por queries reais com fallback explícito.
2. Sinalizar em UI quando dado for estimado/sintético.
3. Definir checklist de “produção-ready por tela”.

---

## Plano priorizado (30/60/90 dias)

### 0–30 dias (estabilização)
- Zerar erros de lint e padronizar tipos.
- Completar RLS + políticas críticas.
- Aplicar constraints de integridade no banco.
- Atualizar README e variáveis de ambiente.

### 31–60 dias (confiabilidade)
- Implementar observabilidade e error tracking.
- Testes de integração das actions.
- Idempotência na automação de PDI.

### 61–90 dias (escala e governança)
- E2E multi-perfil.
- Métricas de produto e operação.
- Hardening de segurança (auditoria de permissões e trilhas de auditoria).

---

## Conclusão

A base é promissora e já contempla os pilares corretos (App Router, Supabase, RLS, ações server-side), mas para virar uma aplicação robusta de operação comercial é essencial atacar imediatamente os blocos de **qualidade técnica, autorização consistente e integridade transacional**.
