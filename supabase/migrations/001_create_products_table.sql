-- Create products table for ecomati shop
-- This table stores all product information including details, properties, and usage

CREATE TABLE IF NOT EXISTS products (
  -- Primary key
  id BIGSERIAL PRIMARY KEY,
  
  -- Basic product information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly name (e.g., "olej-lniany-bio")
  short_description TEXT, -- Short description for cards (e.g., "250 ml · tłoczony na zimno")
  long_description TEXT, -- Detailed product description
  
  -- Pricing
  price DECIMAL(10, 2) NOT NULL, -- Price in PLN (e.g., 29.90)
  original_price DECIMAL(10, 2), -- Original price if on sale
  currency TEXT DEFAULT 'PLN',
  
  -- Images
  main_image TEXT, -- Main product image URL
  gallery_images TEXT[], -- Array of additional image URLs
  
  -- Categorization
  category TEXT NOT NULL, -- Specific category (e.g., "olej-lniany")
  product_group TEXT NOT NULL, -- Main group (e.g., "oleje", "maki", "dodatki")
  tags TEXT[], -- Additional tags for filtering (e.g., ["bio", "wegańskie", "bezglutenowe"])
  
  -- Product details
  weight_options JSONB, -- Available weights/sizes (e.g., [{"value": "250ml", "price": 29.90}, {"value": "500ml", "price": 49.90}])
  ingredients TEXT, -- Product ingredients
  nutritional_info JSONB, -- Nutritional information (e.g., {"calories": 900, "fat": 100, "protein": 0})
  
  -- Properties and usage
  properties TEXT[], -- Product properties (e.g., ["Tłoczony na zimno", "Bogaty w Omega-3"])
  usage_instructions TEXT, -- How to use the product
  storage_instructions TEXT, -- How to store the product
  allergens TEXT[], -- Allergen information
  
  -- Certifications and labels
  certifications TEXT[], -- Certifications (e.g., ["BIO", "Ekologiczne", "Wegańskie"])
  origin_country TEXT, -- Country of origin
  producer TEXT, -- Producer/brand name
  
  -- Inventory and availability
  stock_quantity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false, -- Featured on homepage
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_group ON products(product_group);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_available ON products(is_available) WHERE is_available = true;
CREATE INDEX idx_products_deleted ON products(deleted_at) WHERE deleted_at IS NULL;

-- Create full-text search index for product search
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('polish', name || ' ' || COALESCE(short_description, '') || ' ' || COALESCE(long_description, '')));

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE products IS 'Main products table for the ecomati e-commerce shop';
COMMENT ON COLUMN products.slug IS 'URL-friendly unique identifier for the product';
COMMENT ON COLUMN products.weight_options IS 'JSON array of available sizes/weights with their prices';
COMMENT ON COLUMN products.nutritional_info IS 'JSON object containing nutritional information per 100g';
COMMENT ON COLUMN products.is_featured IS 'Whether the product should be displayed on the homepage';
COMMENT ON COLUMN products.deleted_at IS 'Soft delete timestamp - NULL means product is active';
