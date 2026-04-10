/*
  # Ensure Stripe Tables and Add Webhook INSERT Policies
  
  This migration ensures the Stripe schema is properly set up and adds the critical
  INSERT policies needed for the webhook to write data.
  
  ## Tables Created (if not exist)
  1. `stripe_customers` - Links users to Stripe customer IDs
  2. `stripe_subscriptions` - Stores subscription data from Stripe
  3. `stripe_orders` - Stores one-time payment/order data
  
  ## New INSERT Policies
  The webhook uses the service role key, which bypasses RLS by default, but we add
  explicit INSERT policies for clarity and to support future non-service-role scenarios:
  
  1. Service role can insert customer records
  2. Service role can insert/upsert subscription records
  3. Service role can insert order records
  
  ## Security
  - RLS remains enabled on all tables
  - SELECT policies ensure users only see their own data
  - INSERT policies allow webhook to create records
  - Service role bypasses RLS but policies document intent
*/

-- Create enum types if they don't exist
DO $$ BEGIN
  CREATE TYPE stripe_subscription_status AS ENUM (
    'not_started',
    'incomplete',
    'incomplete_expired',
    'trialing',
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'paused'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE stripe_order_status AS ENUM (
    'pending',
    'completed',
    'canceled'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  customer_id text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id text UNIQUE NOT NULL,
  subscription_id text DEFAULT NULL,
  price_id text DEFAULT NULL,
  current_period_start bigint DEFAULT NULL,
  current_period_end bigint DEFAULT NULL,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_brand text DEFAULT NULL,
  payment_method_last4 text DEFAULT NULL,
  status stripe_subscription_status NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create stripe_orders table
CREATE TABLE IF NOT EXISTS stripe_orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  checkout_session_id text NOT NULL,
  payment_intent_id text NOT NULL,
  customer_id text NOT NULL,
  amount_subtotal bigint NOT NULL,
  amount_total bigint NOT NULL,
  currency text NOT NULL,
  payment_status text NOT NULL,
  status stripe_order_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

DROP POLICY IF EXISTS "Service role can insert customers" ON stripe_customers;
DROP POLICY IF EXISTS "Service role can insert subscriptions" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Service role can update subscriptions" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Service role can insert orders" ON stripe_orders;

-- SELECT policies for users to view their own data
CREATE POLICY "Users can view their own customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Users can view their own subscription data"
  ON stripe_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can view their own order data"
  ON stripe_orders
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id
      FROM stripe_customers
      WHERE user_id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- INSERT/UPDATE policies for service role (webhook)
-- Note: Service role bypasses RLS, but these policies document the intent
CREATE POLICY "Service role can insert customers"
  ON stripe_customers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can insert subscriptions"
  ON stripe_subscriptions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update subscriptions"
  ON stripe_subscriptions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can insert orders"
  ON stripe_orders
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create or replace views
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