// Seed database using Prisma
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    name: "Olej silnikowy 5W-30",
    slug: "olej-silnikowy-5w-30",
    shortDescription: "Syntetyczny olej silnikowy najwyższej jakości",
    longDescription:
      "Wysokiej jakości syntetyczny olej silnikowy 5W-30, idealny do nowoczesnych silników benzynowych i diesla.",
    price: 89.99,
    category: "oils",
    productGroup: "motor-oils",
    tags: ["olej", "silnikowy", "syntetyczny"],
    properties: ["5W-30", "Syntetyczny", "Uniwersalny"],
    allergens: [],
    certifications: [],
    metaKeywords: ["olej", "silnikowy", "5w30"],
    stockQuantity: 50,
    isAvailable: true,
    isFeatured: true,
    mainImage: "/images/products/oil-5w30.jpg",
    galleryImages: ["/images/products/oil-5w30.jpg"],
  },
  {
    name: "Filtr oleju",
    slug: "filtr-oleju",
    shortDescription: "Wysokiej jakości filtr oleju",
    longDescription:
      "Oryginalny filtr oleju zapewniający optymalne filtrowanie i ochronę silnika.",
    price: 29.99,
    category: "filters",
    productGroup: "oil-filters",
    tags: ["filtr", "oleju"],
    properties: ["Uniwersalny", "Wysokiej jakości"],
    allergens: [],
    certifications: [],
    metaKeywords: ["filtr", "oleju"],
    stockQuantity: 100,
    isAvailable: true,
    isFeatured: false,
    mainImage: "/images/products/oil-filter.jpg",
    galleryImages: ["/images/products/oil-filter.jpg"],
  },
];

async function seed() {
  console.log("🌱 Starting database seed with Prisma...\n");

  try {
    console.log("📦 Inserting products...");

    for (const product of products) {
      const created = await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created: ${created.name} (ID: ${created.id})`);
    }

    console.log(`\n✅ Successfully inserted ${products.length} products!`);
    console.log("\n🎉 Database seeded successfully!");
    console.log(
      "\nCheck: https://supabase.com/dashboard/project/cverystftscqagcllyfw/editor",
    );
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error("Full error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
