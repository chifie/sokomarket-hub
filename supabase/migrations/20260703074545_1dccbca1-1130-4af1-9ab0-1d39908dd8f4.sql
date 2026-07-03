
-- Products table for seller listings
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_name TEXT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating NUMERIC(2,1),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true OR auth.uid() = seller_id OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Sellers can create their own products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = seller_id AND (public.has_role(auth.uid(),'seller') OR public.has_role(auth.uid(),'admin')));

CREATE POLICY "Sellers can update their own products"
  ON public.products FOR UPDATE TO authenticated
  USING (auth.uid() = seller_id OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (auth.uid() = seller_id OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "Sellers can delete their own products"
  ON public.products FOR DELETE TO authenticated
  USING (auth.uid() = seller_id OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_products_seller ON public.products(seller_id);
CREATE INDEX idx_products_category ON public.products(category);

-- Storage policies for product-images bucket
CREATE POLICY "Public read for product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Sellers upload own product images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Sellers update own product images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Sellers delete own product images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND (storage.foldername(name))[1] = auth.uid()::text);
