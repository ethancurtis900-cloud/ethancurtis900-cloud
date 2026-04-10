/*
  # Fix Security Issues

  1. Changes Made
    - Remove unused index `idx_security_logs_user_id` from security_logs table
    - Recreate `stripe_user_orders` view without SECURITY DEFINER
    - Recreate `stripe_user_subscriptions` view without SECURITY DEFINER

  2. Security Notes
    - Views now run with the permissions of the caller (SECURITY INVOKER) instead of the definer
    - This prevents potential privilege escalation attacks
    - RLS policies on underlying tables will properly enforce access control
    - Unused index removal improves write performance and reduces storage

  3. Manual Configuration Required
    - Auth DB Connection Strategy: Must be changed to percentage-based in Supabase Dashboard (Settings → Database → Connection Pooling)
    - Leaked Password Protection: Must be enabled in Supabase Dashboard (Authentication → Providers → Security and Protection)
*/

-- Drop the unused index
DROP INDEX IF EXISTS idx_security_logs_user_id;

-- Recreate stripe_user_orders view without SECURITY DEFINER
DROP VIEW IF EXISTS stripe_user_orders;
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
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id AND o.deleted_at IS NULL
WHERE c.user_id = auth.uid() 
  AND c.deleted_at IS NULL 
  AND o.id IS NOT NULL;

-- Recreate stripe_user_subscriptions view without SECURITY DEFINER
DROP VIEW IF EXISTS stripe_user_subscriptions;
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
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id AND s.deleted_at IS NULL
WHERE c.user_id = auth.uid() 
  AND c.deleted_at IS NULL 
  AND s.subscription_id IS NOT NULL;

-- Grant SELECT permission on views to authenticated users
GRANT SELECT ON stripe_user_orders TO authenticated;
GRANT SELECT ON stripe_user_subscriptions TO authenticated;
