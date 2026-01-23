-- Create categories table for better organization
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  icon TEXT, -- Icon name or URL
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_groups table
CREATE TABLE IF NOT EXISTS product_groups (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table for future use
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Shipping address
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'Polska',
  
  -- Order details
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method TEXT, -- transfer, card, cash_on_delivery
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  
  -- Product snapshot (in case product changes later)
  product_name TEXT NOT NULL,
  product_image TEXT,
  selected_size TEXT,
  
  -- Pricing
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table for future use
CREATE TABLE IF NOT EXISTS product_reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_reviews_approved ON product_reviews(is_approved) WHERE is_approved = true;

-- Add triggers for updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_groups_updated_at
    BEFORE UPDATE ON product_groups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default product groups
INSERT INTO product_groups (name, slug, description, display_order) VALUES
  ('Oleje Tłoczone', 'oleje', 'Wysokiej jakości oleje tłoczone na zimno', 1),
  ('Ziarna i Nasiona', 'ziarna', 'Naturalne ziarna i nasiona', 2),
  ('Orzechy', 'orzechy', 'Świeże orzechy bez dodatków', 3),
  ('Kiełki i Akcesoria', 'kielki', 'Nasiona na kiełki i akcesoria do kiełkowania', 4),
  ('Mąki Keto/Bio', 'maki', 'Bezglutenowe mąki alternatywne', 5),
  ('Zdrowe Dodatki', 'dodatki', 'Naturalne słodziki, sosy i przyprawy', 6),
  ('Zestawy Prezentowe', 'zestawy', 'Gotowe zestawy prezentowe', 7)
ON CONFLICT (slug) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  -- Oleje
  ('Olej Lniany', 'olej-lniany', 'Olej lniany tłoczony na zimno', 1),
  ('Olej z Czarnuszki', 'olej-czarnuszka', 'Olej z czarnuszki egipskiej', 2),
  ('Olej Kokosowy', 'olej-kokosowy', 'Nierafinowany olej kokosowy', 3),
  ('Oliwa z Oliwek', 'oliwa', 'Oliwa extra virgin', 4),
  ('Pozostałe Oleje', 'olej-inne', 'Inne oleje tłoczone', 5),
  
  -- Ziarna
  ('Pestki Dyni', 'ziarna-dynia', 'Pestki dyni z polskiej uprawy', 6),
  ('Słonecznik', 'ziarna-slonecznik', 'Łuskany słonecznik', 7),
  ('Chia i Inne', 'ziarna-inne', 'Nasiona chia i inne', 8),
  
  -- Orzechy
  ('Migdały', 'orzechy-migdaly', 'Migdały niesolone', 9),
  ('Włoskie', 'orzechy-wloskie', 'Orzechy włoskie', 10),
  ('Nerkowce', 'orzechy-nerkowce', 'Nerkowce premium', 11),
  
  -- Kiełki
  ('Nasiona na Kiełki', 'nasiona-kielki', 'Nasiona do kiełkowania', 12),
  ('Akcesoria', 'akcesoria', 'Kiełkownice i akcesoria', 13),
  
  -- Mąki
  ('Mąka Kokosowa', 'maki-kokosowa', 'Mąka kokosowa bezglutenowa', 14),
  ('Mąka Migdałowa', 'maki-migdalowa', 'Mąka z blanszowanych migdałów', 15),
  
  -- Dodatki
  ('Słodziki Naturalne', 'slodziki', 'Naturalne zamienniki cukru', 16),
  ('Sosy i Przyprawy', 'sosy', 'Sosy i przyprawy naturalne', 17),
  ('Przyprawy', 'przyprawy', 'Sole i przyprawy', 18)
ON CONFLICT (slug) DO NOTHING;

-- Create view for products with full details
CREATE OR REPLACE VIEW products_full AS
SELECT 
  p.*,
  pg.name as group_name,
  c.name as category_name,
  COALESCE(AVG(pr.rating), 0) as average_rating,
  COUNT(pr.id) as review_count
FROM products p
LEFT JOIN product_groups pg ON p.product_group = pg.slug
LEFT JOIN categories c ON p.category = c.slug
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
WHERE p.deleted_at IS NULL
GROUP BY p.id, pg.name, c.name;

-- Create function to search products
CREATE OR REPLACE FUNCTION search_products(search_query TEXT)
RETURNS TABLE (
  id BIGINT,
  name TEXT,
  slug TEXT,
  short_description TEXT,
  price DECIMAL,
  main_image TEXT,
  category TEXT,
  product_group TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.slug,
    p.short_description,
    p.price,
    p.main_image,
    p.category,
    p.product_group,
    ts_rank(
      to_tsvector('polish', p.name || ' ' || COALESCE(p.short_description, '') || ' ' || COALESCE(p.long_description, '')),
      plainto_tsquery('polish', search_query)
    ) as rank
  FROM products p
  WHERE 
    p.deleted_at IS NULL
    AND p.is_available = true
    AND to_tsvector('polish', p.name || ' ' || COALESCE(p.short_description, '') || ' ' || COALESCE(p.long_description, '')) 
        @@ plainto_tsquery('polish', search_query)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;

-- Add comments
COMMENT ON TABLE categories IS 'Product categories for filtering and organization';
COMMENT ON TABLE product_groups IS 'Main product groups (top-level categories)';
COMMENT ON TABLE orders IS 'Customer orders';
COMMENT ON TABLE order_items IS 'Individual items in orders';
COMMENT ON TABLE product_reviews IS 'Customer product reviews';
COMMENT ON VIEW products_full IS 'Products with joined category and group names, plus review stats';
COMMENT ON FUNCTION search_products IS 'Full-text search function for products using Polish language support';
