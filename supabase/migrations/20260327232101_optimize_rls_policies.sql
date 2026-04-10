/*
  # Optimize RLS Policies for Performance

  1. Performance Optimization
    - Updates RLS policies on `stripe_customers`, `stripe_subscriptions`, and `stripe_orders`
    - Replaces `auth.uid()` with `(select auth.uid())` to prevent re-evaluation per row
    - This optimization significantly improves query performance at scale
    
  2. Changes Made
    - Drops existing RLS policies
    - Recreates policies with optimized auth function calls
    - Maintains the same security constraints
    
  3. Security
    - No changes to security model
    - Same access restrictions apply
    - Only performance optimization
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

-- Recreate optimized policies

-- Optimized policy for stripe_customers
CREATE POLICY "Users can view their own customer data"
    ON stripe_customers
    FOR SELECT
    TO authenticated
    USING (user_id = (select auth.uid()) AND deleted_at IS NULL);

-- Optimized policy for stripe_subscriptions
CREATE POLICY "Users can view their own subscription data"
    ON stripe_subscriptions
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

-- Optimized policy for stripe_orders
CREATE POLICY "Users can view their own order data"
    ON stripe_orders
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (select auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );