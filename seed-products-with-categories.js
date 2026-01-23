/**
 * Seed script for adding products with categories to the database
 * Run with: node seed-products-with-categories.js
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Product data organized by categories
const productsData = [
  // OLEJE TŁOCZONE
  {
    name: "Olej Kokosowy",
    slug: "olej-kokosowy",
    shortDescription:
      "Naturalny olej kokosowy tłoczony na zimno, idealny do gotowania i pielęgnacji",
    longDescription:
      "Wysokiej jakości olej kokosowy virgin, tłoczony na zimno z najlepszych kokosów. Bogaty w kwasy tłuszczowe MCT, wspiera zdrowie i metabolizm. Idealny do smażenia w wysokich temperaturach, pieczenia oraz jako dodatek do smoothie i kawy. Można również stosować jako naturalny kosmetyk do pielęgnacji skóry i włosów.",
    price: 29.99,
    originalPrice: null,
    category: "Oleje Tłoczone",
    productGroup: "Oleje",
    mainImage: "/Img/Olejkokosowy.png",
    tags: ["bio", "virgin", "tłoczony na zimno", "wielofunkcyjny"],
    properties: [
      "Tłoczony na zimno",
      "Virgin",
      "Bogaty w MCT",
      "Wielofunkcyjny",
    ],
    ingredients:
      "100% olej kokosowy virgin (Cocos nucifera), tłoczony na zimno",
    usageInstructions:
      "Do smażenia, pieczenia, jako dodatek do smoothie, kawy lub bezpośrednio. Można stosować również kosmetycznie na skórę i włosy.",
    storageInstructions:
      "Przechowywać w temperaturze pokojowej, z dala od światła słonecznego. Olej może krzepnąć poniżej 24°C - jest to naturalne zjawisko.",
    allergens: [],
    certifications: ["BIO", "Vegan"],
    originCountry: "Sri Lanka",
    producer: "Ecomati Natural",
    stockQuantity: 50,
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Olej z Czarnuszki",
    slug: "olej-z-czarnuszki",
    shortDescription:
      "Olej z czarnego kminu tłoczony na zimno, wspiera odporność i zdrowie",
    longDescription:
      "Olej z czarnuszki (czarnego kminu) tłoczony na zimno, znany od wieków ze swoich właściwości zdrowotnych. Bogaty w nienasycone kwasy tłuszczowe, tymochinon i witaminy. Wspiera układ odpornościowy, ma działanie przeciwzapalne i antyoksydacyjne. Idealny jako dodatek do sałatek, smoothie lub bezpośrednio łyżeczka dziennie.",
    price: 39.99,
    originalPrice: null,
    category: "Oleje Tłoczone",
    productGroup: "Oleje",
    mainImage: "/Img/Olejbio.png",
    tags: ["bio", "tłoczony na zimno", "odporność", "czarny kmin"],
    properties: [
      "Tłoczony na zimno",
      "Wspiera odporność",
      "Działanie przeciwzapalne",
      "Bogaty w tymochinon",
    ],
    ingredients: "100% olej z czarnuszki (Nigella sativa), tłoczony na zimno",
    usageInstructions:
      "Spożywać 1 łyżeczkę dziennie na pusty żołądek lub jako dodatek do sałatek, smoothie. Nie podgrzewać.",
    storageInstructions:
      "Przechowywać w ciemnym, chłodnym miejscu. Po otwarciu przechowywać w lodówce i zużyć w ciągu 3 miesięcy.",
    allergens: [],
    certifications: ["BIO", "Vegan"],
    originCountry: "Egipt",
    producer: "Ecomati Natural",
    stockQuantity: 35,
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: "Olej z Pestek Dyni",
    slug: "olej-z-pestek-dyni",
    shortDescription:
      "Olej z pestek dyni tłoczony na zimno, bogaty w cynk i witaminy",
    longDescription:
      "Wysokiej jakości olej z pestek dyni tłoczony na zimno, charakteryzujący się intensywnym, orzechowym smakiem. Bogaty w cynk, magnez, witaminę E i nienasycone kwasy tłuszczowe. Wspiera zdrowie prostaty, układu moczowego i serca. Idealny jako dodatek do sałatek, zup krem i dań z warzyw. Nie nadaje się do smażenia.",
    price: 34.99,
    originalPrice: null,
    category: "Oleje Tłoczone",
    productGroup: "Oleje",
    mainImage: "/Img/Dynia.png",
    tags: ["bio", "tłoczony na zimno", "cynk", "orzechowy smak"],
    properties: [
      "Tłoczony na zimno",
      "Bogaty w cynk",
      "Wspiera zdrowie prostaty",
      "Orzechowy smak",
    ],
    ingredients: "100% olej z pestek dyni (Cucurbita pepo), tłoczony na zimno",
    usageInstructions:
      "Jako dodatek do sałatek, zup krem, past warzywnych. Nie podgrzewać. Spożywać 1-2 łyżki dziennie.",
    storageInstructions:
      "Przechowywać w ciemnym, chłodnym miejscu. Po otwarciu przechowywać w lodówce i zużyć w ciągu 2 miesięcy.",
    allergens: [],
    certifications: ["BIO", "Vegan"],
    originCountry: "Austria",
    producer: "Ecomati Natural",
    stockQuantity: 40,
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Olej z Rokitnika",
    slug: "olej-z-rokitnika",
    shortDescription:
      "Olej z rokitnika bogaty w witaminy i antyoksydanty, wspiera regenerację",
    longDescription:
      "Wyjątkowy olej z owoców rokitnika, jeden z najbogatszych źródeł witaminy C, E, A i karotenoidów. Zawiera rzadkie kwasy tłuszczowe omega-7. Wspiera regenerację skóry, błon śluzowych i układu pokarmowego. Ma silne właściwości antyoksydacyjne i przeciwzapalne. Można stosować wewnętrznie i zewnętrznie.",
    price: 49.99,
    originalPrice: null,
    category: "Oleje Tłoczone",
    productGroup: "Oleje",
    mainImage: "/Img/Olejbio.png",
    tags: ["bio", "omega-7", "witamina C", "regeneracja"],
    properties: [
      "Bogaty w omega-7",
      "Wysoka zawartość witaminy C",
      "Wspiera regenerację",
      "Antyoksydacyjny",
    ],
    ingredients:
      "100% olej z owoców rokitnika (Hippophae rhamnoides), tłoczony na zimno",
    usageInstructions:
      "Spożywać 1 łyżeczkę dziennie przed posiłkiem lub jako dodatek do smoothie. Można stosować zewnętrznie na skórę.",
    storageInstructions:
      "Przechowywać w ciemnym, chłodnym miejscu. Po otwarciu przechowywać w lodówce i zużyć w ciągu 3 miesięcy.",
    allergens: [],
    certifications: ["BIO", "Vegan"],
    originCountry: "Polska",
    producer: "Ecomati Natural",
    stockQuantity: 25,
    isAvailable: true,
    isFeatured: true,
  },

  // ZIARNA I NASIONA
  {
    name: "Pestki Dyni",
    slug: "pestki-dyni",
    shortDescription:
      "Łuskane pestki dyni, bogate w magnez i cynk, idealny zdrowy przekąska",
    longDescription:
      "Wysokiej jakości łuskane pestki dyni z upraw ekologicznych. Doskonałe źródło białka roślinnego, magnezu, cynku, żelaza i witaminy E. Wspierają zdrowie prostaty, serca i układu nerwowego. Idealny zdrowy przekąska, dodatek do sałatek, musli, jogurtów i wypieków. Można również prażyć z przyprawami.",
    price: 19.99,
    originalPrice: null,
    category: "Ziarna i Nasiona",
    productGroup: "Nasiona",
    mainImage: "/Img/Dynia.png",
    tags: ["bio", "białko", "magnez", "cynk", "przekąska"],
    properties: [
      "Bogate w magnez",
      "Wysokobiałkowe",
      "Źródło cynku",
      "Łuskane",
    ],
    ingredients: "100% łuskane pestki dyni (Cucurbita pepo) z upraw BIO",
    usageInstructions:
      "Spożywać bezpośrednio jako przekąskę, dodawać do sałatek, musli, jogurtów, smoothie bowl. Można prażyć na patelni z przyprawami.",
    storageInstructions:
      "Przechowywać w suchym, chłodnym miejscu w szczelnie zamkniętym pojemniku. Po otwarciu zużyć w ciągu 2 miesięcy.",
    allergens: ["może zawierać śladowe ilości orzechów"],
    certifications: ["BIO", "Vegan"],
    originCountry: "Austria",
    producer: "Ecomati Natural",
    stockQuantity: 60,
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Słonecznik",
    slug: "slonecznik",
    shortDescription:
      "Łuskane nasiona słonecznika, bogate w witaminę E i zdrowe tłuszcze",
    longDescription:
      "Łuskane nasiona słonecznika z upraw ekologicznych, doskonałe źródło witaminy E, magnezu, selenu i zdrowych tłuszczów. Wspierają zdrowie serca, skóry i układu odpornościowego. Mają delikatny, orzechowy smak. Idealne jako przekąska, dodatek do sałatek, pieczywa, musli i wypieków.",
    price: 14.99,
    originalPrice: null,
    category: "Ziarna i Nasiona",
    productGroup: "Nasiona",
    mainImage: "/Img/Olejbio.png",
    tags: ["bio", "witamina E", "selen", "przekąska"],
    properties: [
      "Bogate w witaminę E",
      "Źródło selenu",
      "Zdrowe tłuszcze",
      "Łuskane",
    ],
    ingredients:
      "100% łuskane nasiona słonecznika (Helianthus annuus) z upraw BIO",
    usageInstructions:
      "Spożywać bezpośrednio, dodawać do sałatek, musli, jogurtów, wypieków. Można prażyć na patelni.",
    storageInstructions:
      "Przechowywać w suchym, chłodnym miejscu w szczelnie zamkniętym pojemniku. Po otwarciu zużyć w ciągu 2 miesięcy.",
    allergens: ["może zawierać śladowe ilości orzechów"],
    certifications: ["BIO", "Vegan"],
    originCountry: "Polska",
    producer: "Ecomati Natural",
    stockQuantity: 70,
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: "Chia i Inne",
    slug: "chia-i-inne",
    shortDescription:
      "Nasiona chia, bogate w omega-3, błonnik i białko roślinne",
    longDescription:
      "Nasiona chia z upraw ekologicznych, superfood bogaty w kwasy omega-3, błonnik, białko i antyoksydanty. Wspierają trawienie, zdrowie serca i długotrwałe uczucie sytości. Po namoczeniu tworzą żel, idealny do puddingów chia, smoothie, jogurtów i wypieków. Można również dodawać do sałatek i musli.",
    price: 24.99,
    originalPrice: null,
    category: "Ziarna i Nasiona",
    productGroup: "Nasiona",
    mainImage: "/Img/Olejbio.png",
    tags: ["bio", "omega-3", "superfood", "błonnik", "białko"],
    properties: [
      "Bogate w omega-3",
      "Wysokobłonnikowe",
      "Źródło białka",
      "Superfood",
    ],
    ingredients: "100% nasiona chia (Salvia hispanica) z upraw BIO",
    usageInstructions:
      "Namoczyć w wodzie/mleku (1:10) na 15-30 min do powstania żelu. Dodawać do smoothie, jogurtów, musli, wypieków. Można spożywać suche jako posypkę.",
    storageInstructions:
      "Przechowywać w suchym, chłodnym miejscu w szczelnie zamkniętym pojemniku. Po otwarciu zużyć w ciągu 6 miesięcy.",
    allergens: [],
    certifications: ["BIO", "Vegan", "Bezglutenowe"],
    originCountry: "Paragwaj",
    producer: "Ecomati Natural",
    stockQuantity: 45,
    isAvailable: true,
    isFeatured: true,
  },
];

async function main() {
  console.log("🌱 Starting seed process...\n");

  try {
    // First, let's check if we can connect to the database
    await prisma.$connect();
    console.log("✅ Connected to database\n");

    // Count existing products
    const existingCount = await prisma.product.count();
    console.log(`📊 Current products in database: ${existingCount}\n`);

    // Seed products
    console.log("🌾 Seeding products...\n");

    for (const productData of productsData) {
      try {
        // Check if product already exists
        const existing = await prisma.product.findUnique({
          where: { slug: productData.slug },
        });

        if (existing) {
          console.log(
            `⏭️  Product "${productData.name}" already exists, skipping...`,
          );
          continue;
        }

        // Create product
        const product = await prisma.product.create({
          data: productData,
        });

        console.log(`✅ Created: ${product.name} (${product.category})`);
      } catch (error) {
        console.error(
          `❌ Error creating product "${productData.name}":`,
          error.message,
        );
      }
    }

    // Final count
    const finalCount = await prisma.product.count();
    const addedCount = finalCount - existingCount;

    console.log("\n" + "=".repeat(50));
    console.log(`✨ Seed completed successfully!`);
    console.log(`📊 Products added: ${addedCount}`);
    console.log(`📊 Total products in database: ${finalCount}`);
    console.log("=".repeat(50) + "\n");

    // Show products by category
    console.log("📋 Products by category:\n");

    const categories = await prisma.product.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
      where: {
        deletedAt: null,
      },
    });

    categories.forEach((cat) => {
      console.log(`   ${cat.category}: ${cat._count.category} products`);
    });

    console.log("\n");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log("👋 Disconnected from database\n");
  }
}

// Run the seed
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
