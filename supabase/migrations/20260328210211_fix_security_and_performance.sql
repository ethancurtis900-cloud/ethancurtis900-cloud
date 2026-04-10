/*
  # Fix Security and Performance Issues

  1. Changes
    - Add index for security_logs.user_id foreign key for better query performance
    - Recreate views without SECURITY DEFINER to resolve security warnings

  2. Security
    - Improves query performance for security_logs lookups
    - Removes unnecessary SECURITY DEFINER from views
*/

-- Add index for security_logs foreign key
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);

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