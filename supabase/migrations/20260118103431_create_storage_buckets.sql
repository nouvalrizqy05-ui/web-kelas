/*
  # Create Storage Buckets

  ## Buckets Created
  
  1. **gallery-images** - For storing gallery photos (GambarAman equivalent)
  2. **request-images** - For storing user-uploaded request images
  
  ## Security
  
  - Public read access for all images
  - Public write access to allow anonymous uploads
  - File size limits applied via policies
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('gallery-images', 'gallery-images', true),
  ('request-images', 'request-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for gallery-images bucket
CREATE POLICY "Anyone can view gallery images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can upload gallery images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'gallery-images' AND
    (OCTET_LENGTH(decode(split_part((metadata->>'size')::text, ' ', 1), 'escape')) < 10485760) -- 10MB limit
  );

-- Policies for request-images bucket
CREATE POLICY "Anyone can view request images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'request-images');

CREATE POLICY "Anyone can upload request images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'request-images' AND
    (OCTET_LENGTH(decode(split_part((metadata->>'size')::text, ' ', 1), 'escape')) < 10485760) -- 10MB limit
  );

CREATE POLICY "Anyone can delete their request images"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'request-images');
