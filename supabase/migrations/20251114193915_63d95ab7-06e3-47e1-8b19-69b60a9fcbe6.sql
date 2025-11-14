-- Create storage bucket for project assets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-assets', 'project-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
DO $$ 
BEGIN
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Public assets are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own assets" ON storage.objects;

-- Policy: Anyone can view public assets
CREATE POLICY "Public assets are viewable by everyone"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-assets');

-- Policy: Authenticated users can upload assets
CREATE POLICY "Authenticated users can upload assets"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'project-assets' 
  AND auth.uid() IS NOT NULL
);

-- Policy: Users can update their own assets
CREATE POLICY "Users can update their own assets"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'project-assets' 
  AND auth.uid() IS NOT NULL
);

-- Policy: Users can delete their own assets
CREATE POLICY "Users can delete their own assets"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'project-assets' 
  AND auth.uid() IS NOT NULL
);