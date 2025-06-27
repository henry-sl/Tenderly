/*
  # Setup Storage Buckets for Document Management

  1. Storage Buckets
    - Create 'documents' bucket for company documents
    - Create 'certifications' bucket for certification documents
    
  2. Security Policies
    - Allow authenticated users to upload files to their own company folders
    - Allow authenticated users to read files from their own company folders
    - Allow authenticated users to delete files from their own company folders
    
  3. Bucket Configuration
    - Set appropriate file size limits
    - Configure public access settings
*/

-- Create the documents storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- Create the certifications storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certifications',
  'certifications',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Users can upload documents to own company folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view documents from own company folder"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete documents from own company folder"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);

-- Storage policies for certifications bucket
CREATE POLICY "Users can upload certifications to own company folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'certifications' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view certifications from own company folder"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'certifications' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete certifications from own company folder"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'certifications' AND
  (storage.foldername(name))[1] IN (
    SELECT c.id::text
    FROM companies c
    WHERE c.user_id = auth.uid()
  )
);