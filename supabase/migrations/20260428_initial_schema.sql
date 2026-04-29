-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Empresas (Tenants)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir empresa padrão inicial
INSERT INTO companies (name, slug) VALUES ('VULP Enterprise', 'vulp-enterprise');

-- 2. Perfis de Usuário
CREATE TYPE user_role AS ENUM ('seller', 'leader', 'director', 'admin');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'seller',
  leader_id UUID REFERENCES profiles(id), -- Auto-referência para hierarquia
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Ciclos de Avaliação
CREATE TABLE cycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Ex: "Abril 2026"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Áreas da Roda da Venda
CREATE TABLE areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Ex: "Conversão", "Abordagem"
  weight INTEGER DEFAULT 2,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Regras do Fator Realidade
CREATE TABLE reality_factor_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
  area_id UUID REFERENCES areas(id) ON DELETE CASCADE,
  metric_key TEXT NOT NULL, -- Ex: 'conversion_rate'
  threshold NUMERIC NOT NULL, -- Ex: 25
  max_score_allowed INTEGER NOT NULL, -- Ex: 5
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Avaliações
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  area_id UUID REFERENCES areas(id) ON DELETE CASCADE,
  self_score INTEGER,
  leader_score INTEGER,
  calibrated_score NUMERIC, -- Calculado com base no Fator Realidade
  justification TEXT,
  leader_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Indicadores Reais (Preenchidos pelo vendedor ou integrados)
CREATE TABLE real_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  metrics JSONB NOT NULL, -- Ex: {"revenue": 50000, "conversions": 30, ...}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW-LEVEL SECURITY (RLS)
-- ==========================================

-- Ativar RLS em todas as tabelas
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_metrics ENABLE ROW LEVEL SECURITY;

-- Exemplo de política de isolamento (Multi-tenancy)
-- Presume que o JWT possui a claim 'company_id'

CREATE POLICY tenant_isolation_profiles ON profiles
  FOR ALL USING (company_id = (auth.jwt() ->> 'company_id')::uuid);

CREATE POLICY tenant_isolation_cycles ON cycles
  FOR ALL USING (company_id = (auth.jwt() ->> 'company_id')::uuid);

CREATE POLICY tenant_isolation_areas ON areas
  FOR ALL USING (company_id = (auth.jwt() ->> 'company_id')::uuid);

-- ==========================================
-- AUTOMATION: Promoção Automática de Admin
-- ==========================================

-- Função para criar perfil automático no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_company_id UUID;
BEGIN
  -- Tentar obter a primeira empresa, ou criar uma se não existir
  SELECT id INTO default_company_id FROM public.companies LIMIT 1;
  
  IF default_company_id IS NULL THEN
    INSERT INTO public.companies (name, slug) 
    VALUES ('VULP Enterprise', 'vulp-enterprise')
    RETURNING id INTO default_company_id;
  END IF;

  INSERT INTO public.profiles (id, company_id, full_name, role)
  VALUES (
    new.id,
    default_company_id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Novo Usuário'),
    CASE 
      WHEN new.email = 'marcusrodrigo2@gmail.com' THEN 'admin'::user_role
      ELSE 'seller'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado pelo Supabase Auth
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
