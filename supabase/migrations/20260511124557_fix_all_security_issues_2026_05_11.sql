/*
  # Fix All Security Issues

  1. Add missing `is_admin` column to profiles table
  2. Fix mutable search_path on `update_company_inquiry_updated_at`
  3. Fix overly permissive RLS policies on `company_inquiries`
     - INSERT: keep public submission but remove "always true" by scoping properly
     - UPDATE: restrict to admins only (previously allowed any authenticated user with no restriction)
  4. Revoke public EXECUTE on SECURITY DEFINER functions:
     - `handle_new_user()`
     - `log_security_event(uuid, text, jsonb)`
*/

-- 1. Add is_admin column to profiles if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN is_admin boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- 2. Fix mutable search_path on trigger function
CREATE OR REPLACE FUNCTION public.update_company_inquiry_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 3. Fix RLS on company_inquiries

DROP POLICY IF EXISTS "Anyone can submit company inquiries" ON public.company_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.company_inquiries;

-- INSERT: allow anon/authenticated to submit contact form inquiries.
-- WITH CHECK (true) is intentional here for a public contact form,
-- but we scope it to anon and authenticated explicitly rather than all roles.
CREATE POLICY "Allow public to submit company inquiries"
  ON public.company_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- UPDATE: only admins can update inquiries
CREATE POLICY "Admins can update company inquiries"
  ON public.company_inquiries
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- 4. Revoke public execute on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.log_security_event(uuid, text, jsonb) FROM anon, authenticated, public;
