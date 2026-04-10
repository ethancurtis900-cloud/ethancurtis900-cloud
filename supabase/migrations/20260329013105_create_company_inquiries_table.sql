/*
  # Create Company Inquiries Table

  1. New Tables
    - `company_inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `first_name` (text) - Contact's first name
      - `last_name` (text) - Contact's last name
      - `email` (text) - Contact email address
      - `phone` (text) - Contact phone number
      - `company_name` (text) - Name of the company
      - `company_type` (text) - Type/industry of the company
      - `message` (text) - Optional project description
      - `status` (text) - Inquiry status (new, contacted, completed)
      - `created_at` (timestamptz) - Timestamp of inquiry submission
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `company_inquiries` table
    - Add policy for anonymous users to insert their own inquiries
    - Add policy for authenticated admins to view all inquiries

  3. Indexes
    - Index on email for quick lookup
    - Index on created_at for sorting
    - Index on status for filtering
*/

-- Create company_inquiries table
CREATE TABLE IF NOT EXISTS company_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_name text NOT NULL,
  company_type text NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE company_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert inquiries (no auth required)
CREATE POLICY "Anyone can submit company inquiries"
  ON company_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view inquiries (for admin dashboard)
CREATE POLICY "Authenticated users can view all inquiries"
  ON company_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update inquiry status
CREATE POLICY "Authenticated users can update inquiries"
  ON company_inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS company_inquiries_email_idx ON company_inquiries(email);
CREATE INDEX IF NOT EXISTS company_inquiries_created_at_idx ON company_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS company_inquiries_status_idx ON company_inquiries(status);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_company_inquiry_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS update_company_inquiries_updated_at ON company_inquiries;
CREATE TRIGGER update_company_inquiries_updated_at
  BEFORE UPDATE ON company_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_company_inquiry_updated_at();
