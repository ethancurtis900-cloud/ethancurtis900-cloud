/*
  # Fix Stripe User Views

  1. Changes
    - Update `stripe_user_subscriptions` view to properly handle cases with no subscriptions
    - Update `stripe_user_orders` view to properly handle cases with no orders
    - Fix the WHERE clause to allow NULL values from LEFT JOINs

  2. Notes
    - These views filter data per user using auth.uid()
    - The LEFT JOIN should show customer even when no subscription/orders exist
*/

-- Drop existing views
DROP VIEW IF EXISTS stripe_user_subscriptions;
DROP VIEW IF EXISTS stripe_user_orders;

-- Recreate subscription view with proper NULL handling
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
WHERE c.user_id = auth.uid() 
  AND c.deleted_at IS NULL
  AND s.subscription_id IS NOT NULL;

-- Recreate orders view with proper NULL handling
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
WHERE c.user_id = auth.uid() 
  AND c.deleted_at IS NULL
  AND o.id IS NOT NULL;