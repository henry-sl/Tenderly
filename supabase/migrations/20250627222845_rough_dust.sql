/*
  # Add Proposal Version Control System

  1. New Tables
    - `proposal_versions`
      - `id` (uuid, primary key)
      - `proposal_id` (uuid, foreign key to proposals)
      - `content` (text, stores the HTML/text content)
      - `title` (text, stores the proposal title at time of save)
      - `version_number` (integer, incremental version number)
      - `created_at` (timestamp)
      - `created_by` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `proposal_versions` table
    - Add policy for users to manage versions of their own proposals

  3. Indexes
    - Add indexes for better query performance
*/

-- Create proposal_versions table
CREATE TABLE IF NOT EXISTS proposal_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid REFERENCES proposals(id) ON DELETE CASCADE,
  content text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  version_number integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE proposal_versions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage versions of their own proposals
CREATE POLICY "Users can manage versions of own proposals"
  ON proposal_versions
  FOR ALL
  TO authenticated
  USING (
    proposal_id IN (
      SELECT p.id FROM proposals p
      JOIN companies c ON p.company_id = c.id
      WHERE c.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_proposal_versions_proposal_id ON proposal_versions(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_versions_created_at ON proposal_versions(created_at);
CREATE INDEX IF NOT EXISTS idx_proposal_versions_version_number ON proposal_versions(proposal_id, version_number);

-- Create a unique constraint to ensure version numbers are unique per proposal
CREATE UNIQUE INDEX IF NOT EXISTS idx_proposal_versions_unique_version 
ON proposal_versions(proposal_id, version_number);