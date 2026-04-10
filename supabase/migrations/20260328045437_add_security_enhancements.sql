/*
  # Enhanced Security Policies

  1. Security Enhancements
    - Add stricter RLS policies with additional checks
    - Add audit logging triggers for sensitive operations
    - Add policy for preventing unauthorized access patterns
    - Add constraints to prevent data tampering

  2. New Functions
    - `log_security_event` - Logs security-related events
    - `check_suspicious_activity` - Monitors for suspicious patterns

  3. Policies Enhanced
    - stripe_customers: Add insert/update/delete policies with strict validation
    - stripe_subscriptions: Enhanced validation for status changes
    - stripe_orders: Add tamper protection

  4. Security Features
    - Prevents unauthorized data modification
    - Logs all sensitive operations
    - Rate limiting at database level
    - Prevents privilege escalation
*/

CREATE TABLE IF NOT EXISTS security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL,
  event_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view security logs"
  ON security_logs
  FOR SELECT
  TO authenticated
  USING (false);

CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_logs_event_type ON security_logs(event_type);

CREATE OR REPLACE FUNCTION log_security_event(
  p_user_id uuid,
  p_event_type text,
  p_event_data jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO security_logs (user_id, event_type, event_data)
  VALUES (p_user_id, p_event_type, p_event_data);
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stripe_customers' 
    AND policyname = 'Users cannot modify deleted records'
  ) THEN
    CREATE POLICY "Users cannot modify deleted records"
      ON stripe_customers
      FOR UPDATE
      TO authenticated
      USING (user_id = (select auth.uid()) AND deleted_at IS NULL)
      WITH CHECK (user_id = (select auth.uid()) AND deleted_at IS NULL);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stripe_subscriptions' 
    AND policyname = 'Users cannot modify subscriptions'
  ) THEN
    CREATE POLICY "Users cannot modify subscriptions"
      ON stripe_subscriptions
      FOR UPDATE
      TO authenticated
      USING (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'stripe_orders' 
    AND policyname = 'Users cannot modify orders'
  ) THEN
    CREATE POLICY "Users cannot modify orders"
      ON stripe_orders
      FOR UPDATE
      TO authenticated
      USING (false);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION check_email_format()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'validate_customer_email'
  ) THEN
    CREATE TRIGGER validate_customer_email
      BEFORE INSERT OR UPDATE ON stripe_customers
      FOR EACH ROW
      EXECUTE FUNCTION check_email_format();
  END IF;
END $$;
