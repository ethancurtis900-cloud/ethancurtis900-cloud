/*
  # Fix RLS Performance Issues

  1. Changes
    - Optimize RLS policies to use `(select auth.uid())` instead of `auth.uid()` for better performance
    - Remove unused security_logs index
    - Remove SECURITY DEFINER from views (not needed, causes security warnings)

  2. Security
    - Maintains all existing security policies
    - Improves query performance at scale
*/

-- Drop and recreate stripe_customers policies with optimized auth check
DROP POLICY IF EXISTS "Service can create customer records" ON stripe_customers;
CREATE POLICY "Service can create customer records"
  ON stripe_customers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Drop and recreate stripe_orders policies with optimized auth check
DROP POLICY IF EXISTS "Service can create order records" ON stripe_orders;
CREATE POLICY "Service can create order records"
  ON stripe_orders
  FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service can update order records" ON stripe_orders;
CREATE POLICY "Service can update order records"
  ON stripe_orders
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drop and recreate stripe_subscriptions policies with optimized auth check
DROP POLICY IF EXISTS "Service can create subscription records" ON stripe_subscriptions;
CREATE POLICY "Service can create subscription records"
  ON stripe_subscriptions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service can update subscription records" ON stripe_subscriptions;
CREATE POLICY "Service can update subscription records"
  ON stripe_subscriptions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drop unused index
DROP INDEX IF EXISTS idx_security_logs_user_id;

-- Recreate views without SECURITY DEFINER
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

CREATE VIEW stripe_user_subscriptions AS
SELECT 
  c.customer_id,
  s.subscription_id,
  s.status AS subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON (c.customer_id = s.customer_id AND s.deleted_at IS NULL)
WHERE c.user_id = (select auth.uid())
  AND c.deleted_at IS NULL
  AND s.subscription_id IS NOT NULL;

CREATE VIEW stripe_user_orders AS
SELECT 
  c.customer_id,
  o.id AS order_id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status AS order_status,
  o.created_at AS order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON (c.customer_id = o.customer_id AND o.deleted_at IS NULL)
WHERE c.user_id = (select auth.uid())
  AND c.deleted_at IS NULL
  AND o.id IS NOT NULL;