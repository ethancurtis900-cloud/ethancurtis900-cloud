/*
  # Fix Infinite Recursion in Admin Policies

  1. Problem
    - Admin policies were checking profiles table, causing infinite recursion
    
  2. Solution
    - Create security definer function to check admin status
    - Use this function in policies to avoid recursion
    
  3. Security
    - Function uses security definer to bypass RLS
    - Only checks is_admin flag for current user
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON company_inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON company_inquiries;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- Profiles: Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Company Inquiries: Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries"
  ON company_inquiries FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Company Inquiries: Admins can update inquiries  
CREATE POLICY "Admins can update inquiries"
  ON company_inquiries FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());