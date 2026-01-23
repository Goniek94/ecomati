// Seed database with healthy food products
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    name: "Olej kokosowy BIO",
    slug: "olej-kokosowy-bio",
    shortDescription: "Ekologiczny olej kokosowy tłoczony na zimno",
    longDescription:
      "Najwyższej jakości olej kokosowy BIO, tłoczony na zimno z ekologicznych kokosów. Idealny do gotowania, pieczenia oraz pielęgnacji skóry i włosów. Bogaty w kwasy tłuszczowe MCT wspierające metabolizm.",
    price: 34.99,
    category: "oils",
    productGroup: "cooking-oils",
    tags: ["olej", "kokosowy", "bio", "ekologiczny", "tłoczony na zimno"],
    properties: ["BIO", "Tłoczony na zimno", "Wegański", "Bez GMO"],
    allergens: ["orzechy kokosowe"],
    certifications: ["BIO", "Ekologiczne"],
    metaKeywords: ["olej kokosowy", "bio", "ekologiczny", "zdrowy"],
    stockQuantity: 45,
    isAvailable: true,
    isFeatured: true,
    mainImage: "/Img/Olejkokosowy.png",
    galleryImages: ["/Img/Olejkokosowy.png"],
    ingredients: "100% olej kokosowy z ekologicznych upraw",
    nutritionalInfo: {
      calories: 862,
      fat: 100,
      saturatedFat: 87,
      carbohydrates: 0,
      protein: 0,
      servingSize: "100g",
    },
    weightOptions: {
      available: ["250ml", "500ml", "1000ml"],
      prices: {
        "250ml": 34.99,
        "500ml": 59.99,
        "1000ml": 99.99,
      },
    },
    usageInstructions:
      "Idealny do smażenia, pieczenia, dodawania do smoothie i kawy. Można stosować również jako kosmetyk naturalny.",
    storageInstructions:
      "Przechowywać w suchym i chłodnym miejscu, z dala od światła słonecznego.",
    originCountry: "Sri Lanka",
    producer: "EcoMati Organic",
  },
  {
    name: "Olej lniany BIO",
    slug: "olej-lniany-bio",
    shortDescription: "Ekologiczny olej lniany tłoczony na zimno",
    longDescription:
      "Olej lniany BIO tłoczony na zimno z ekologicznych nasion lnu. Doskonałe źródło kwasów Omega-3, wspierających zdrowie serca i mózgu. Idealny do sałatek i dań na zimno.",
    price: 29.99,
    category: "oils",
    productGroup: "cooking-oils",
    tags: ["olej", "lniany", "bio", "omega-3", "tłoczony na zimno"],
    properties: ["BIO", "Tłoczony na zimno", "Wegański", "Omega-3"],
    allergens: [],
    certifications: ["BIO", "Ekologiczne"],
    metaKeywords: ["olej lniany", "bio", "omega-3", "zdrowy"],
    stockQuantity: 38,
    isAvailable: true,
    isFeatured: true,
    mainImage: "/Img/Olejbio.png",
    galleryImages: ["/Img/Olejbio.png"],
    ingredients: "100% olej z nasion lnu z ekologicznych upraw",
    nutritionalInfo: {
      calories: 884,
      fat: 100,
      saturatedFat: 9,
      omega3: 53,
      carbohydrates: 0,
      protein: 0,
      servingSize: "100ml",
    },
    weightOptions: {
      available: ["250ml", "500ml"],
      prices: {
        "250ml": 29.99,
        "500ml": 49.99,
      },
    },
    usageInstructions:
      "Nie nadaje się do smażenia! Dodawaj do sałatek, jogurtów, smoothie i dań na zimno. Spożywaj w ciągu 6 tygodni od otwarcia.",
    storageInstructions:
      "Przechowywać w lodówce po otwarciu. Chronić przed światłem i wysoką temperaturą.",
    originCountry: "Polska",
    producer: "EcoMati Organic",
  },
  {
    name: "Migdały surowe BIO",
    slug: "migdaly-surowe-bio",
    shortDescription: "Ekologiczne migdały surowe, nieprażone",
    longDescription:
      "Najwyższej jakości migdały surowe BIO z ekologicznych upraw. Bogate w białko, błonnik, witaminę E i magnez. Idealna przekąska dla aktywnych i dbających o zdrowie.",
    price: 39.99,
    category: "nuts",
    productGroup: "raw-nuts",
    tags: ["migdały", "orzechy", "bio", "surowe", "przekąska"],
    properties: ["BIO", "Surowe", "Wegańskie", "Bez dodatków"],
    allergens: ["orzechy"],
    certifications: ["BIO", "Ekologiczne"],
    metaKeywords: ["migdały", "bio", "surowe", "zdrowa przekąska"],
    stockQuantity: 62,
    isAvailable: true,
    isFeatured: true,
    mainImage: "/Img/Migdały.png",
    galleryImages: ["/Img/Migdały.png"],
    ingredients: "100% migdały surowe z ekologicznych upraw",
    nutritionalInfo: {
      calories: 579,
      fat: 49.9,
      saturatedFat: 3.8,
      carbohydrates: 21.6,
      fiber: 12.5,
      protein: 21.2,
      vitaminE: 25.6,
      magnesium: 270,
      servingSize: "100g",
    },
    weightOptions: {
      available: ["250g", "500g", "1000g"],
      prices: {
        "250g": 39.99,
        "500g": 69.99,
        "1000g": 119.99,
      },
    },
    usageInstructions:
      "Idealne jako przekąska, dodatek do sałatek, owsianki, jogurtów. Można również prażyć lub wykorzystać do wypieku.",
    storageInstructions:
      "Przechowywać w szczelnie zamkniętym pojemniku, w suchym i chłodnym miejscu.",
    originCountry: "Hiszpania",
    producer: "EcoMati Organic",
  },
  {
    name: "Nasiona dyni łuskane BIO",
    slug: "nasiona-dyni-luskane-bio",
    shortDescription: "Ekologiczne łuskane nasiona dyni",
    longDescription:
      "Łuskane nasiona dyni BIO z ekologicznych upraw. Bogate w cynk, magnez i kwasy tłuszczowe omega-3. Wspierają zdrowie prostaty i układu moczowego. Doskonała przekąska i dodatek do potraw.",
    price: 24.99,
    category: "seeds",
    productGroup: "raw-seeds",
    tags: ["nasiona", "dynia", "bio", "cynk", "przekąska"],
    properties: ["BIO", "Łuskane", "Wegańskie", "Bez dodatków"],
    allergens: [],
    certifications: ["BIO", "Ekologiczne"],
    metaKeywords: ["nasiona dyni", "bio", "cynk", "zdrowa przekąska"],
    stockQuantity: 55,
    isAvailable: true,
    isFeatured: false,
    mainImage: "/Img/Dynia.png",
    galleryImages: ["/Img/Dynia.png"],
    ingredients: "100% łuskane nasiona dyni z ekologicznych upraw",
    nutritionalInfo: {
      calories: 559,
      fat: 49,
      saturatedFat: 8.7,
      carbohydrates: 10.7,
      fiber: 6,
      protein: 30.2,
      zinc: 7.8,
      magnesium: 592,
      servingSize: "100g",
    },
    weightOptions: {
      available: ["250g", "500g", "1000g"],
      prices: {
        "250g": 24.99,
        "500g": 44.99,
        "1000g": 79.99,
      },
    },
    usageInstructions:
      "Idealne jako przekąska, dodatek do sałatek, pieczywa, owsianki. Można również prażyć z przyprawami.",
    storageInstructions:
      "Przechowywać w szczelnie zamkniętym pojemniku, w suchym i chłodnym miejscu.",
    originCountry: "Austria",
    producer: "EcoMati Organic",
  },
];

async function seed() {
  console.log("🌱 Starting database seed with healthy food products...\n");

  try {
    // First, delete old products (motor oil and filters)
    console.log("🗑️  Removing old products...");
    await prisma.product.deleteMany({
      where: {
        OR: [{ slug: "olej-silnikowy-5w-30" }, { slug: "filtr-oleju" }],
      },
    });
    console.log("✅ Old products removed\n");

    console.log("📦 Inserting healthy food products...");

    for (const product of products) {
      const created = await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created: ${created.name} (ID: ${created.id})`);
    }

    console.log(`\n✅ Successfully inserted ${products.length} products!`);
    console.log("\n🎉 Database seeded successfully with healthy food!");
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
