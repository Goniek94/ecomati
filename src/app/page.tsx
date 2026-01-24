import Hero from "@/components/hero/Hero";
import NaturalSelection from "@/components/sections/NaturalSelection";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
        isAvailable: true,
      },
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
    });

    return products.map((p: Product) => {
      const weightOptions = p.weightOptions as any;
      const hasVariants =
        weightOptions?.variants && weightOptions.variants.length > 0;

      // If product has variants, use first variant's size and price
      const firstVariant = hasVariants ? weightOptions.variants[0] : null;
      const displaySize = firstVariant?.size || "";
      const displayPrice = firstVariant?.price || p.price;
      const variantCount = hasVariants ? weightOptions.variants.length : 0;

      // Map variants to frontend format with prices
      const variants = hasVariants
        ? weightOptions.variants.map((v: any) => ({
            size: v.size,
            price: `${v.price} zł`,
            priceNumeric: parseFloat(v.price),
          }))
        : undefined;

      return {
        id: Number(p.id),
        name: p.name,
        desc: p.shortDescription || "",
        price: `${displayPrice} zł`,
        displaySize,
        variantCount,
        image: p.mainImage || "/Img/Olejbio.png",
        category: p.category,
        group: p.productGroup || "",
        featured: p.isFeatured,
        sizes: hasVariants
          ? weightOptions.variants.map((v: any) => v.size)
          : [],
        variants, // Add full variants array
      };
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      {/* 1. HERO (Wideo na pełen ekran) */}
      <Hero />

      {/* 2. NARRACJA ("Naturalna Selekcja" + Cytaty) */}
      <NaturalSelection />

      {/* 3. PRODUKTY (Grid 3x4 wybranych produktów) */}
      <FeaturedProducts products={featuredProducts} />

      {/* 4. HISTORIA (Paralaksa, o nas) */}
      <AboutSection />

      {/* 5. KONTAKT */}
      <ContactSection />

      {/* 6. STOPKA */}
      <Footer />
    </main>
  );
}
