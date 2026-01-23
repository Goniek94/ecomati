// Test script to check if variants are working correctly
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function testVariants() {
  try {
    console.log("🔍 Checking products with variants...\n");

    // Get all products
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        weightOptions: true,
        stockQuantity: true,
      },
      take: 10,
    });

    console.log(`Found ${products.length} products\n`);

    products.forEach((product) => {
      console.log(`📦 Product ID: ${product.id}`);
      console.log(`   Name: ${product.name}`);
      console.log(`   Stock: ${product.stockQuantity}`);
      console.log(
        `   Weight Options:`,
        JSON.stringify(product.weightOptions, null, 2),
      );
      console.log("---");
    });

    // Check if product ID 70 exists
    console.log("\n🔍 Checking product ID 70...");
    const product70 = await prisma.product.findUnique({
      where: { id: BigInt(70) },
    });

    if (product70) {
      console.log("✅ Product 70 exists:", product70.name);
      console.log("   Deleted:", product70.deletedAt ? "Yes" : "No");
    } else {
      console.log("❌ Product 70 does not exist in database");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testVariants();
