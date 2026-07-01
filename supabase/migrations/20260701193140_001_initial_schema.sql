-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  seller_id UUID,
  seller_name TEXT,
  location TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  products_count INTEGER DEFAULT 0,
  image_url TEXT,
  specialty TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, product_id)
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products
CREATE POLICY "select_products_public" ON products FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_products_admin" ON products FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "update_products_admin" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_products_admin" ON products FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for sellers
CREATE POLICY "select_sellers_public" ON sellers FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_sellers_admin" ON sellers FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "update_sellers_admin" ON sellers FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_sellers_admin" ON sellers FOR DELETE
  TO authenticated USING (true);

-- RLS Policies for cart_items
CREATE POLICY "select_own_cart" ON cart_items FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "insert_cart_item" ON cart_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_own_cart" ON cart_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_own_cart" ON cart_items FOR DELETE
  TO anon, authenticated USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, seller_name, location, rating, reviews_count, is_featured) VALUES
('Fresh Organic Apples', 'Premium organic apples grown pesticide-free', 4.99, 'Fruits', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400', 'Green Valley Farm', 'Nakuru', 4.80, 234, true),
('Premium Coffee Beans', 'Highland Arabica coffee beans, freshly roasted', 12.50, 'Beverages', 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 'Highland Coffee', 'Kiambu', 4.90, 189, true),
('Handwoven Kikoy', 'Traditional Kenyan textile, handwoven with care', 25.00, 'Textiles', 'https://images.pexels.com/photos/6097894/pexels-photo-6097894.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mombasa Crafts', 'Mombasa', 4.70, 156, true),
('Fresh Honey', '100% raw organic honey from Baringo', 8.99, 'Natural Foods', 'https://images.pexels.com/photos/3083028/pexels-photo-3083028.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bee Happy Farm', 'Baringo', 4.60, 98, true),
('Organic Tea Leaves', 'Premium tea leaves from Kericho highlands', 6.50, 'Beverages', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 'Kericho Tea Estate', 'Kericho', 4.80, 145, false),
('Maasai Beaded Jewelry', 'Handcrafted traditional Maasai beadwork', 35.00, 'Crafts', 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400', 'Maasai Women Co-op', 'Kajiado', 4.90, 267, true),
('Fresh Avocados', 'Organic avocados, perfect ripeness', 3.50, 'Fruits', 'https://images.pexels.com/photos/5754092/pexels-photo-5754092.jpeg?auto=compress&cs=tinysrgb&w=400', 'Muranga Farms', 'Muranga', 4.70, 312, false),
('Cashew Nuts', 'Fresh roasted cashew nuts from the coast', 15.00, 'Nuts', 'https://images.pexels.com/photos/1295592/pexels-photo-1295592.jpeg?auto=compress&cs=tinysrgb&w=400', 'Coastal Nuts', 'Kilifi', 4.50, 89, false);

-- Insert sample sellers
INSERT INTO sellers (name, description, location, rating, products_count, image_url, specialty, is_verified) VALUES
('Green Valley Farm', 'Organic farm specializing in fresh fruits and vegetables', 'Nakuru', 4.8, 25, 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=400', 'Organic Produce', true),
('Highland Coffee', 'Premium coffee roasters from the Kenyan highlands', 'Kiambu', 4.9, 12, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 'Premium Coffee', true),
('Mombasa Crafts', 'Traditional coastal handicrafts and textiles', 'Mombasa', 4.7, 45, 'https://images.pexels.com/photos/6097894/pexels-photo-6097894.jpeg?auto=compress&cs=tinysrgb&w=400', 'Traditional Crafts', true),
('Bee Happy Farm', 'Natural honey and bee products from Baringo', 'Baringo', 4.6, 8, 'https://images.pexels.com/photos/3083028/pexels-photo-3083028.jpeg?auto=compress&cs=tinysrgb&w=400', 'Natural Honey', true),
('Maasai Women Co-op', 'Empowering women through traditional beadwork art', 'Kajiado', 4.9, 32, 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400', 'Beaded Jewelry', true),
('Coastal Nuts', 'Fresh nuts from the Kenyan coast', 'Kilifi', 4.5, 15, 'https://images.pexels.com/photos/1295592/pexels-photo-1295592.jpeg?auto=compress&cs=tinysrgb&w=400', 'Cashew Nuts', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
