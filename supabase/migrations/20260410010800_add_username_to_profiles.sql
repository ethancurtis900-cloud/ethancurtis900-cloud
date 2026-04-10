/*
  # Add username column to profiles

  1. Changes
    - Adds a `username` column to the `profiles` table
      - Unique, optional (nullable), text
      - Max length enforced via check constraint (3–30 chars, alphanumeric plus _ and -)
  2. Security
    - Authenticated users can update their own username via existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE profiles ADD COLUMN username text UNIQUE;
    ALTER TABLE profiles ADD CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_-]{3,30}$');
  END IF;
END $$;
