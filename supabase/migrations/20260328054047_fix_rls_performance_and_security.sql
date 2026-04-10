/*
  # Fix RLS Performance and Security Issues

  1. Security Improvements
    - Optimize RLS policies on profiles table to use SELECT wrapper for auth.uid()
    - This prevents re-evaluation of auth.uid() for each row, improving query performance
    - Fix function search_path security issues by setting explicit search_path
    - Remove unused index on security_logs table

  2. Changes
    - Drop and recreate all profiles RLS policies with optimized auth.uid() calls
    - Update handle_new_user function with secure search_path
    - Update handle_updated_at function with secure search_path
    - Drop unused idx_security_logs_user_id_fkey index

  3. Performance Impact
    - Significantly improves query performance at scale
    - Reduces function evaluation overhead in RLS policies
    - Prevents potential security issues with mutable search_path
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate policies with optimized auth.uid() calls using SELECT wrapper
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Fix function search_path security issues
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

-- Remove unused index on security_logs
DROP INDEX IF EXISTS idx_security_logs_user_id_fkey;