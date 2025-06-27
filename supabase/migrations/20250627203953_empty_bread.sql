/*
  # Complete Tender Management Platform Database Schema

  1. New Tables
    - `companies` - Company profiles linked to authenticated users
    - `tenders` - Available tender opportunities
    - `proposals` - Company proposals for tenders
    - `certifications` - Company certifications and credentials
    - `documents` - File attachments for tenders, companies, and proposals
    - `attestations` - Blockchain-verified reputation records
    - `tender_requirements` - Specific requirements for each tender
    - `tender_contacts` - Contact information for tender inquiries

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for tenders and related information
    - Secure access patterns for company and proposal data

  3. Performance
    - Indexes on frequently queried columns
    - Foreign key relationships for data integrity
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  registration_number text UNIQUE NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  industry text NOT NULL,
  employees integer NOT NULL DEFAULT 0,
  established date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tenders table
CREATE TABLE IF NOT EXISTS tenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  organization text NOT NULL,
  location text NOT NULL,
  budget numeric NOT NULL,
  deadline timestamptz NOT NULL,
  published_date timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closing_soon', 'closed')),
  category text NOT NULL,
  bid_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id uuid REFERENCES tenders(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected')),
  submitted_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  issued_by text NOT NULL,
  issue_date date NOT NULL,
  expiry_date date,
  document_url text,
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  size bigint NOT NULL,
  url text NOT NULL,
  upload_date timestamptz DEFAULT now(),
  tender_id uuid REFERENCES tenders(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  proposal_id uuid REFERENCES proposals(id) ON DELETE CASCADE
);

-- Attestations table
CREATE TABLE IF NOT EXISTS attestations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('completion', 'quality', 'compliance', 'reputation')),
  issuer text NOT NULL,
  recipient text NOT NULL,
  description text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  date timestamptz NOT NULL,
  blockchain_tx_id text NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tender requirements table
CREATE TABLE IF NOT EXISTS tender_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id uuid REFERENCES tenders(id) ON DELETE CASCADE,
  requirement text NOT NULL,
  order_index integer NOT NULL DEFAULT 0
);

-- Tender contacts table
CREATE TABLE IF NOT EXISTS tender_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id uuid REFERENCES tenders(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE attestations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tender_contacts ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Users can read own company data"
  ON companies
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company data"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own company data"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tenders policies (public read for authenticated users)
CREATE POLICY "Anyone can read tenders"
  ON tenders
  FOR SELECT
  TO authenticated
  USING (true);

-- Proposals policies
CREATE POLICY "Users can read own proposals"
  ON proposals
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own proposals"
  ON proposals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own proposals"
  ON proposals
  FOR UPDATE
  TO authenticated
  USING (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  );

-- Certifications policies
CREATE POLICY "Users can manage own certifications"
  ON certifications
  FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
  );

-- Documents policies
CREATE POLICY "Users can manage own documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT id FROM companies WHERE user_id = auth.uid()
    )
    OR proposal_id IN (
      SELECT p.id FROM proposals p
      JOIN companies c ON p.company_id = c.id
      WHERE c.user_id = auth.uid()
    )
  );

-- Attestations policies (read-only for users)
CREATE POLICY "Users can read attestations"
  ON attestations
  FOR SELECT
  TO authenticated
  USING (true);

-- Tender requirements policies (public read)
CREATE POLICY "Anyone can read tender requirements"
  ON tender_requirements
  FOR SELECT
  TO authenticated
  USING (true);

-- Tender contacts policies (public read)
CREATE POLICY "Anyone can read tender contacts"
  ON tender_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_tenders_status ON tenders(status);
CREATE INDEX IF NOT EXISTS idx_tenders_category ON tenders(category);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline ON tenders(deadline);
CREATE INDEX IF NOT EXISTS idx_proposals_tender_id ON proposals(tender_id);
CREATE INDEX IF NOT EXISTS idx_proposals_company_id ON proposals(company_id);
CREATE INDEX IF NOT EXISTS idx_certifications_company_id ON certifications(company_id);
CREATE INDEX IF NOT EXISTS idx_documents_tender_id ON documents(tender_id);
CREATE INDEX IF NOT EXISTS idx_documents_company_id ON documents(company_id);
CREATE INDEX IF NOT EXISTS idx_attestations_recipient ON attestations(recipient);

-- Insert sample data for testing
INSERT INTO tenders (title, description, organization, location, budget, deadline, category, status) VALUES
('Smart City Infrastructure Development', 'Comprehensive smart city infrastructure project including IoT sensors, traffic management systems, and digital citizen services platform.', 'City of San Francisco', 'San Francisco, CA', 2500000, '2025-03-15 23:59:59', 'Technology', 'open'),
('Hospital Management System Upgrade', 'Complete overhaul of existing hospital management system including patient records, appointment scheduling, and billing.', 'Regional Medical Center', 'Austin, TX', 850000, '2025-02-28 23:59:59', 'Healthcare', 'closing_soon'),
('Renewable Energy Consulting Services', 'Strategic consulting for transitioning municipal energy systems to renewable sources.', 'Green Valley Municipality', 'Denver, CO', 125000, '2025-04-30 23:59:59', 'Energy', 'open'),
('Educational Technology Platform', 'Development of comprehensive e-learning platform for K-12 education with interactive content and assessment tools.', 'State Department of Education', 'Columbus, OH', 1200000, '2025-05-15 23:59:59', 'Education', 'open');

-- Insert tender requirements
INSERT INTO tender_requirements (tender_id, requirement, order_index) 
SELECT t.id, req.requirement, req.order_index
FROM tenders t
CROSS JOIN (
  VALUES 
    ('Minimum 5 years experience in smart city projects', 1),
    ('ISO 27001 certification required', 2),
    ('Local business registration preferred', 3),
    ('Previous government contract experience', 4)
) AS req(requirement, order_index)
WHERE t.title = 'Smart City Infrastructure Development';

-- Insert tender contacts
INSERT INTO tender_contacts (tender_id, name, email, phone)
SELECT t.id, 'John Smith', 'j.smith@sf.gov', '+1-415-555-0123'
FROM tenders t
WHERE t.title = 'Smart City Infrastructure Development';

INSERT INTO tender_contacts (tender_id, name, email, phone)
SELECT t.id, 'Dr. Sarah Johnson', 'procurement@regionalmed.com', '+1-512-555-0456'
FROM tenders t
WHERE t.title = 'Hospital Management System Upgrade';