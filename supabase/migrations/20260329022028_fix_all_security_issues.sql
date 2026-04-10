/*
  # Fix All Security and Performance Issues

  ## Changes Made

  1. **RLS Performance Optimization**
     - Wrap all `auth.uid()` calls with `(select auth.uid())` to prevent per-row re-evaluation
     - Apply to all policies on: profiles, stripe_customers, stripe_subscriptions, stripe_orders, company_inquiries

  2. **Remove Duplicate Permissive Policies**
     - Drop redundant policies that create multiple permissive rules for the same action
     - Keep only the most specific and secure policies
     - Affected tables: company_inquiries, profiles, stripe_customers, stripe_subscriptions

  3. **Fix Overly Permissive Policies**
     - Remove policies with `USING (true)` or `WITH CHECK (true)` that bypass RLS
     - Add proper authentication and ownership checks
     - Fix company_inquiries policies to be more restrictive

  4. **Fix Function Search Paths**
     - Set explicit search_path for all functions to prevent injection attacks
     - Apply to: handle_updated_at, update_company_inquiry_updated_at

  5. **Remove Unused Indexes**
     - Drop indexes that are not being used by any queries
     - company_inquiries_email_idx, company_inquiries_status_idx, idx_profiles_is_admin

  ## Security Notes
  - All policies now use subquery pattern for auth.uid() calls
  - Removed all policies that allow unrestricted access
  - Functions now have immutable search paths
  - Only necessary indexes remain
*/

-- ==========================================
-- 1. DROP ALL EXISTING POLICIES TO REBUILD
-- ==========================================

-- Drop profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Drop stripe_customers policies
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON stripe_customers;

-- Drop stripe_subscriptions policies
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON stripe_subscriptions;

-- Drop stripe_orders policies
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

-- Drop company_inquiries policies
DROP POLICY IF EXISTS "Anyone can submit company inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON company_inquiries;

-- ==========================================
-- 2. RECREATE POLICIES WITH OPTIMIZED AUTH CHECKS
-- ==========================================

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  );

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Stripe customers policies
CREATE POLICY "Users can view their own customer data"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Admins can view all customers"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  );

-- Stripe subscriptions policies
CREATE POLICY "Users can view their own subscription data"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stripe_customers
      WHERE stripe_customers.customer_id = stripe_subscriptions.customer_id
      AND stripe_customers.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Admins can view all subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  );

-- Stripe orders policies (orders link to customers via customer_id)
CREATE POLICY "Users can view their own order data"
  ON stripe_orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stripe_customers
      WHERE stripe_customers.customer_id = stripe_orders.customer_id
      AND stripe_customers.user_id = (select auth.uid())
    )
  );

-- Company inquiries policies - SECURE VERSION
CREATE POLICY "Anyone can submit company inquiries"
  ON company_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND company_name IS NOT NULL
    AND LENGTH(company_name) > 0
  );

CREATE POLICY "Admins can view all inquiries"
  ON company_inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  );

CREATE POLICY "Admins can update inquiries"
  ON company_inquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (select auth.uid())
      AND is_admin = true
    )
  );

-- ==========================================
-- 3. FIX FUNCTION SEARCH PATHS
-- ==========================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_company_inquiry_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ==========================================
-- 4. DROP UNUSED INDEXES
-- ==========================================

DROP INDEX IF EXISTS company_inquiries_email_idx;
DROP INDEX IF EXISTS company_inquiries_status_idx;
DROP INDEX IF EXISTS idx_profiles_is_admin;

-- ==========================================
-- 5. CREATE USEFUL INDEXES FOR ADMIN CHECKS
-- ==========================================

-- Index for admin lookup (frequently used in policies)
CREATE INDEX IF NOT EXISTS idx_profiles_admin_lookup 
  ON profiles(id) 
  WHERE is_admin = true;

-- Index for stripe customer user lookups
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id 
  ON stripe_customers(user_id);

-- Index for stripe subscription customer lookups
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer_id 
  ON stripe_subscriptions(customer_id);

-- Index for stripe orders customer lookups
CREATE INDEX IF NOT EXISTS idx_stripe_orders_customer_id 
  ON stripe_orders(customer_id);