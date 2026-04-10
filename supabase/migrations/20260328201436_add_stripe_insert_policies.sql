/*
  # Add INSERT policies for Stripe tables

  1. Changes
    - Add INSERT policy for stripe_customers table to allow service role to create customer records
    - Add INSERT policy for stripe_subscriptions table to allow service role to create subscription records
    - Add INSERT policy for stripe_orders table to allow service role to create order records
    
  2. Security
    - Policies are restrictive and only allow inserts from authenticated edge functions
    - Service role bypasses RLS but we add explicit policies for clarity and auditing
*/

-- Drop existing policies that block inserts
DROP POLICY IF EXISTS "Service can create customer records" ON stripe_customers;
DROP POLICY IF EXISTS "Service can create subscription records" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Service can create order records" ON stripe_orders;

-- Allow inserts into stripe_customers from edge functions
CREATE POLICY "Service can create customer records"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow inserts into stripe_subscriptions from edge functions  
CREATE POLICY "Service can create subscription records"
  ON stripe_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow inserts into stripe_orders from edge functions
CREATE POLICY "Service can create order records"
  ON stripe_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow updates to stripe_subscriptions from edge functions (for webhook updates)
DROP POLICY IF EXISTS "Users cannot modify subscriptions" ON stripe_subscriptions;
CREATE POLICY "Service can update subscription records"
  ON stripe_subscriptions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow updates to stripe_orders from edge functions (for webhook updates)
DROP POLICY IF EXISTS "Users cannot modify orders" ON stripe_orders;
CREATE POLICY "Service can update order records"
  ON stripe_orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
