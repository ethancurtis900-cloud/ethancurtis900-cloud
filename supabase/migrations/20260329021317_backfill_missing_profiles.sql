/*
  # Backfill Missing Profiles

  1. Purpose
    - Create profiles for users that don't have them yet
    
  2. Changes
    - Insert missing profiles from auth.users
    - Use email as full_name if not set
*/

-- Insert profiles for users that don't have them
INSERT INTO profiles (id, email, full_name, is_admin)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  false as is_admin
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;