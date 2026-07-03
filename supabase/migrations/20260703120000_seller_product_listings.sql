-- Extend products with fields needed for real seller listings
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS images TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'TZS';

-- Link seller_id to the actual authenticated user who owns the listing.
-- Existing demo rows have seller_id = NULL, which is fine with a FK.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'products_seller_id_fkey'
  ) THEN
    ALTER TABLE products
      ADD CONSTRAINT products_seller_id_fkey
      FOREIGN KEY (seller_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);

-- The original policies from 001_initial_schema.sql let ANY authenticated
-- user insert/update/delete ANY product, not just their own. Replace them
-- with policies scoped to the actual owner (or an admin).
DROP POLICY IF EXISTS "insert_products_admin" ON products;
DROP POLICY IF EXISTS "update_products_admin" ON products;
DROP POLICY IF EXISTS "delete_products_admin" ON products;

CREATE POLICY "sellers_insert_own_products" ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    seller_id = auth.uid()
    AND (public.has_role(auth.uid(), 'seller') OR public.has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "sellers_update_own_products" ON products FOR UPDATE
  TO authenticated
  USING (seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "sellers_delete_own_products" ON products FOR DELETE
  TO authenticated
  USING (seller_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Storage bucket for seller-uploaded product photos. Public read (product
-- photos need to be visible on the storefront), writes scoped to a folder
-- named after the uploader's own user id.
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_product_images" ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "sellers_upload_own_product_images" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "sellers_update_own_product_images" ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "sellers_delete_own_product_images" ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
