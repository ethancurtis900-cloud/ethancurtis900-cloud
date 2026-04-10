/*
  # Fix SECURITY DEFINER Views
  
  This migration recreates the Stripe views with SECURITY INVOKER to prevent
  privilege escalation vulnerabilities.
  
  ## Changes
  1. Drop and recreate `stripe_user_subscriptions` view with SECURITY INVOKER
  2. Drop and recreate `stripe_user_orders` view with SECURITY INVOKER
  
  ## Security
  - Views now run with caller's permissions instead of owner's permissions
  - Prevents potential privilege escalation attacks
*/

-- Recreate stripe_user_subscriptions with SECURITY INVOKER
DROP VIEW IF EXISTS stripe_user_subscriptions;

CREATE VIEW stripe_user_subscriptions 
WITH (security_invoker = true) AS
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

-- Recreate stripe_user_orders with SECURITY INVOKER
DROP VIEW IF EXISTS stripe_user_orders;

CREATE VIEW stripe_user_orders
WITH (security_invoker = true) AS
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
