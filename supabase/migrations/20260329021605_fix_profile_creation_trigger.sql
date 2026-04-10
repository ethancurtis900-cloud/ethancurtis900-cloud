/*
  # Fix Profile Creation Trigger

  1. Purpose
    - Ensure profiles are created automatically when users sign up
    - Handle conflicts gracefully
    
  2. Changes
    - Update trigger function to handle edge cases
    - Add ON CONFLICT clause to prevent errors
*/

-- Drop and recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE WHEN NEW.email = 'metronexa@gmail.com' THEN true ELSE false END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;