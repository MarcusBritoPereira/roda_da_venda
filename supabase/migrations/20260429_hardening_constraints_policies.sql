-- Hardening: constraints + RLS coverage

-- 1) Integridade de avaliações
ALTER TABLE evaluations
  ADD CONSTRAINT evaluations_unique_cycle_seller_area
  UNIQUE (cycle_id, seller_id, area_id);

ALTER TABLE evaluations
  ADD CONSTRAINT evaluations_self_score_range CHECK (self_score BETWEEN 1 AND 10),
  ADD CONSTRAINT evaluations_leader_score_range CHECK (leader_score IS NULL OR leader_score BETWEEN 1 AND 10),
  ADD CONSTRAINT evaluations_calibrated_score_range CHECK (calibrated_score IS NULL OR calibrated_score BETWEEN 0 AND 10);

-- 2) Integridade de ciclo
ALTER TABLE cycles
  ADD CONSTRAINT cycles_status_valid CHECK (status IN ('open', 'closed'));

-- 3) RLS em tabelas usadas por automação/PDI
ALTER TABLE pdis ENABLE ROW LEVEL SECURITY;
ALTER TABLE reality_factor_rules ENABLE ROW LEVEL SECURITY;

-- 4) Políticas mínimas de tenant/owner
CREATE POLICY pdis_select_own ON pdis
  FOR SELECT USING (seller_id = auth.uid());

CREATE POLICY pdis_update_own ON pdis
  FOR UPDATE USING (seller_id = auth.uid())
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY pdis_insert_admin_service ON pdis
  FOR INSERT WITH CHECK (true);

CREATE POLICY reality_factor_rules_read_tenant ON reality_factor_rules
  FOR SELECT USING (
    cycle_id IN (
      SELECT id FROM cycles
      WHERE company_id = (auth.jwt() ->> 'company_id')::uuid
    )
  );
