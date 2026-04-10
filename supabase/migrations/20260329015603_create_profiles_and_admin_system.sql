/*
  # Create User Profiles Table with Admin System

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `email` (text) - User email from auth
      - `full_name` (text) - User's full name
      - `company_name` (text, nullable) - Optional company name
      - `phone` (text, nullable) - Optional phone number
      - `avatar_url` (text, nullable) - Optional profile picture URL
      - `bio` (text, nullable) - Optional user bio
      - `is_admin` (boolean) - Admin role flag (only metronexa@gmail.com)
      - `created_at` (timestamptz) - Profile creation timestamp
      - `updated_at` (timestamptz) - Profile last update timestamp

  2. Security
    - Enable RLS on `profiles` table
    - Users can read their own profile
    - Users can update their own profile (except is_admin field)
    - Users can insert their own profile
    - Admins can view all profiles
    - Only metronexa@gmail.com gets admin privileges automatically
    
  3. Triggers
    - Auto-create profile when user signs up
    - Auto-set admin status for metronexa@gmail.com
    - Auto-update updated_at timestamp on changes
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  company_name text,
  phone text,
  avatar_url text,
  bio text,
  is_admin boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Add index for admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = true;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for regular users
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid()));

-- Policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_admin)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    CASE WHEN new.email = 'metronexa@gmail.com' THEN true ELSE false END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profile changes
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add admin policy for viewing subscriptions
CREATE POLICY "Admins can view all subscriptions"
  ON public.stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Add admin policy for viewing customers
CREATE POLICY "Admins can view all customers"
  ON public.stripe_customers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );