// Seed database using Supabase client
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env" });

// Try both NEXT_PUBLIC_ and regular env vars
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://cverystftscqagcllyfw.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 Checking credentials...");
console.log("URL:", supabaseUrl ? "✅ Found" : "❌ Missing");
console.log("Key:", supabaseKey ? "✅ Found" : "❌ Missing");

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Missing Supabase credentials");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseKey ? "[HIDDEN]" : "undefined");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: "Olej silnikowy 5W-30",
    slug: "olej-silnikowy-5w-30",
    short_description: "Syntetyczny olej silnikowy najwyższej jakości",
    long_description:
      "Wysokiej jakości syntetyczny olej silnikowy 5W-30, idealny do nowoczesnych silników benzynowych i diesla.",
    price: 89.99,
    category: "oils",
    product_group: "motor-oils",
    tags: ["olej", "silnikowy", "syntetyczny"],
    properties: ["5W-30", "Syntetyczny", "Uniwersalny"],
    allergens: [],
    certifications: [],
    meta_keywords: ["olej", "silnikowy", "5w30"],
    stock_quantity: 50,
    is_available: true,
    is_featured: true,
    main_image: "/images/products/oil-5w30.jpg",
    gallery_images: ["/images/products/oil-5w30.jpg"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Filtr oleju",
    slug: "filtr-oleju",
    short_description: "Wysokiej jakości filtr oleju",
    long_description:
      "Oryginalny filtr oleju zapewniający optymalne filtrowanie i ochronę silnika.",
    price: 29.99,
    category: "filters",
    product_group: "oil-filters",
    tags: ["filtr", "oleju"],
    properties: ["Uniwersalny", "Wysokiej jakości"],
    allergens: [],
    certifications: [],
    meta_keywords: ["filtr", "oleju"],
    stock_quantity: 100,
    is_available: true,
    is_featured: false,
    main_image: "/images/products/oil-filter.jpg",
    gallery_images: ["/images/products/oil-filter.jpg"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    console.log("📦 Inserting products...");
    const { data, error } = await supabase
      .from("products")
      .insert(products)
      .select();

    if (error) {
      console.error("❌ Error:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      console.error("Full error object:", error);
      return;
    }

    console.log(`✅ Successfully inserted ${data.length} products!`);
    console.log("\n🎉 Database seeded successfully!");
    console.log(
      "\nCheck: https://supabase.com/dashboard/project/cverystftscqagcllyfw/editor",
    );
  } catch (err) {
    console.error("❌ Fatal error:", err.message);
  }
}

seed();
