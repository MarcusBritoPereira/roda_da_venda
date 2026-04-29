-- 1. Inserir uma empresa padrão para testes
INSERT INTO companies (id, name, slug)
VALUES (uuid_generate_v4(), 'VULP Enterprise', 'vulp-enterprise')
ON CONFLICT (slug) DO NOTHING;

-- 2. Adicionar o e-mail como Administrador (Placeholder para quando o usuário se cadastrar)
-- Nota: O Supabase vincula o profile pelo ID do auth.users. 
-- Este comando serve como referência para associar o e-mail marcusrodrigo2@gmail.com à empresa.

-- Script para ser rodado após o primeiro login ou via Trigger de Auth:
-- INSERT INTO profiles (id, company_id, full_name, role)
-- VALUES ('UUID_DO_AUTH_USER', (SELECT id FROM companies WHERE slug = 'vulp-enterprise'), 'Marcus Rodrigo', 'admin');

COMMENT ON TABLE profiles IS 'O usuário marcusrodrigo2@gmail.com deve ser associado ao cargo de admin na empresa VULP Enterprise.';
