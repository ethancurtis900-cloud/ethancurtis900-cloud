/*
  # Fix Security Issues

  1. Changes Made
    - Drop unused indexes on security_logs table (not being queried in practice)
    - Fix function search_path mutability by setting search_path explicitly
    - Add comments for future maintenance

  2. Security Improvements
    - Functions now have immutable search_path set to prevent SQL injection
    - Reduced index overhead on audit table

  3. Notes
    - Auth DB connection strategy and leaked password protection must be configured in Supabase dashboard
    - These are project-level settings that cannot be modified via SQL
*/

DROP INDEX IF EXISTS idx_security_logs_user_id;
DROP INDEX IF EXISTS idx_security_logs_created_at;
DROP INDEX IF EXISTS idx_security_logs_event_type;

CREATE OR REPLACE FUNCTION log_security_event(
  p_user_id uuid,
  p_event_type text,
  p_event_data jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO security_logs (user_id, event_type, event_data)
  VALUES (p_user_id, p_event_type, p_event_data);
END;
$$;

CREATE OR REPLACE FUNCTION check_email_format()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON TABLE security_logs IS 'Audit log for security events. Indexes removed as table is write-only for compliance.';
COMMENT ON FUNCTION log_security_event IS 'Logs security events with fixed search_path for security.';
COMMENT ON FUNCTION check_email_format IS 'Validates email format with fixed search_path for security.';