/*
  # Fix Admin Check Circular Dependency

  ## Problem
  The "Admins can view all profiles" policy has a circular dependency:
  - To check if a user is admin, we query profiles table
  - But to query profiles table, we need to check if user is admin
  - This creates infinite recursion that prevents admin checks from working

  ## Solution
  Create a SECURITY DEFINER function that bypasses RLS to check admin status.
  This function can safely read the is_admin flag without triggering RLS policies.

  ## Changes
  1. Create `is_admin()` helper function with SECURITY DEFINER
  2. Update all policies that check admin status to use this function
  3. This breaks the circular dependency and allows admin checks to work

  ## Security Notes
  - SECURITY DEFINER is safe here because the function only returns boolean
  - No user input is used in the query (uses auth.uid())
  - Function is immutable with safe search_path
*/

-- ==========================================
-- 1. CREATE ADMIN CHECK HELPER FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_admin = true
  );
$$;

-- ==========================================
-- 2. RECREATE POLICIES USING HELPER FUNCTION
-- ==========================================

-- Drop existing policies that check admin status
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all customers" ON stripe_customers;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON stripe_subscriptions;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON company_inquiries;

-- Recreate profiles admin policy using helper function
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin());

-- Recreate stripe_customers admin policy
CREATE POLICY "Admins can view all customers"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (is_admin());

-- Recreate stripe_subscriptions admin policy
CREATE POLICY "Admins can view all subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (is_admin());

-- Recreate company_inquiries admin policies
CREATE POLICY "Admins can view all inquiries"
  ON company_inquiries FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update inquiries"
  ON company_inquiries FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
