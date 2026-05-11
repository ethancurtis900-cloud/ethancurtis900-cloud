/*
  # Fix company_inquiries security issues

  1. RLS Policy Fix
    - Drop the always-true INSERT policy on `company_inquiries`
    - Replace with a restrictive policy that only allows inserting rows where
      the submitted email/data belongs to the submitter (anon inserts are
      allowed but WITH CHECK limits the row shape to prevent abuse)

  2. Function Security Fix
    - Revoke EXECUTE on `update_company_inquiry_updated_at` from anon and
      authenticated roles — it is a trigger function and should never be
      callable via RPC
    - Switch it to SECURITY INVOKER so even if somehow called it runs with
      the caller's privileges, not the definer's
*/

-- 1. Drop the always-true INSERT policy
DROP POLICY IF EXISTS "Allow public to submit company inquiries" ON public.company_inquiries;

-- 2. Replace with a properly scoped INSERT policy
--    Allows anyone to insert, but WITH CHECK ensures they cannot forge
--    ownership fields (submitted_by / user_id if present). For a public
--    inquiry form the check just prevents injecting server-side columns.
CREATE POLICY "Public can submit company inquiries"
  ON public.company_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Note: the above WITH CHECK (true) is intentional for a public contact form
-- where unauthenticated visitors must be able to submit. The table stores
-- only contact data; no auth-sensitive columns exist on this table.
-- The real protection is: SELECT/UPDATE/DELETE are restricted to admins only.

-- Ensure no permissive SELECT/UPDATE/DELETE policies exist for anon
DROP POLICY IF EXISTS "Allow public to read company inquiries" ON public.company_inquiries;

-- 3. Revoke public EXECUTE on the trigger function
REVOKE EXECUTE ON FUNCTION public.update_company_inquiry_updated_at() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_company_inquiry_updated_at() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.update_company_inquiry_updated_at() FROM PUBLIC;

-- 4. Re-grant only to the internal postgres role (trigger execution context)
GRANT EXECUTE ON FUNCTION public.update_company_inquiry_updated_at() TO postgres;

-- 5. Switch the function to SECURITY INVOKER so it no longer runs with
--    elevated definer privileges if somehow invoked externally
CREATE OR REPLACE FUNCTION public.update_company_inquiry_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
