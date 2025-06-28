/*
  # Create experiences table for company project history

  1. New Tables
    - `experiences`
      - `id` (uuid, primary key)
      - `company_id` (uuid, foreign key to companies)
      - `project_name` (text)
      - `client_name` (text)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date, nullable for ongoing projects)
      - `project_value` (numeric, nullable)
      - `category` (text)
      - `status` (text with check constraint)
      - `location` (text)
      - `key_achievements` (text array)
      - `technologies` (text array, nullable)
      - `team_size` (integer, nullable)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `experiences` table
    - Add policy for users to manage their own company experiences
*/

CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_name text NOT NULL,
  client_name text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  project_value numeric,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  location text NOT NULL,
  key_achievements text[] DEFAULT '{}',
  technologies text[],
  team_size integer,
  role text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT experiences_status_check CHECK (status IN ('completed', 'ongoing', 'cancelled'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experiences_company_id ON experiences(company_id);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON experiences(status);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_start_date ON experiences(start_date);

-- Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own company experiences
CREATE POLICY "Users can manage own company experiences"
  ON experiences
  FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_experiences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_experiences_updated_at();