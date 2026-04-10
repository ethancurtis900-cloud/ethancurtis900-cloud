/*
  # Fix Security Issues

  ## Security Enhancements

  1. **Performance Optimization**
     - Add index on `security_logs.user_id` to optimize foreign key lookups
     - Improves query performance for user-based security log queries

  2. **RLS Policy Improvements for Stripe Tables**
     - Replace overly permissive policies that use `true` conditions
     - Implement proper service role authentication checks
     - Ensure only the service role can perform write operations
     - Users can only read their own records

  ## Changes by Table

  ### security_logs
  - Add index `idx_security_logs_user_id` on `user_id` column

  ### stripe_customers
  - Drop and recreate "Service can create customer records" policy
  - New policy only allows service role to insert records
  - Verified by checking `current_setting('request.jwt.claims')::json->>'role'`

  ### stripe_orders
  - Drop and recreate "Service can create order records" policy
  - Drop and recreate "Service can update order records" policy
  - Both policies now restricted to service role only

  ### stripe_subscriptions
  - Drop and recreate "Service can create subscription records" policy
  - Drop and recreate "Service can update subscription records" policy
  - Both policies now restricted to service role only

  ## Security Notes
  - All Stripe-related write operations now require service role authentication
  - Users maintain read access to their own records
  - Foreign key lookups are now optimized with proper indexing
*/

-- Add index for security_logs foreign key
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON public.security_logs(user_id);

-- Fix stripe_customers RLS policies
DROP POLICY IF EXISTS "Service can create customer records" ON public.stripe_customers;
CREATE POLICY "Service can create customer records"
  ON public.stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- Fix stripe_orders RLS policies
DROP POLICY IF EXISTS "Service can create order records" ON public.stripe_orders;
CREATE POLICY "Service can create order records"
  ON public.stripe_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

DROP POLICY IF EXISTS "Service can update order records" ON public.stripe_orders;
CREATE POLICY "Service can update order records"
  ON public.stripe_orders
  FOR UPDATE
  TO authenticated
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  )
  WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- Fix stripe_subscriptions RLS policies
DROP POLICY IF EXISTS "Service can create subscription records" ON public.stripe_subscriptions;
CREATE POLICY "Service can create subscription records"
  ON public.stripe_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

DROP POLICY IF EXISTS "Service can update subscription records" ON public.stripe_subscriptions;
CREATE POLICY "Service can update subscription records"
  ON public.stripe_subscriptions
  FOR UPDATE
  TO authenticated
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  )
  WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );