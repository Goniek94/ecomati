import { prisma } from "@/lib/prisma";
import ShopClientView from "./ShopClientView";

// To sprawia, że strona jest dynamiczna i nie cache'uje starych produktów w nieskończoność
export const revalidate = 0;

export default async function ShopPage() {
  // 1. Pobieramy produkty z bazy danych
  const productsFromDb = await prisma.product.findMany({
    where: {
      isAvailable: true,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. Mapujemy dane z formatu bazy (Prisma) na format widoku (Frontend)
  // Musimy zamienić BigInt na Number i Decimal na string
  const formattedProducts = productsFromDb.map((p) => {
    const weightOptions = p.weightOptions as any;
    const hasVariants =
      weightOptions?.variants && weightOptions.variants.length > 0;

    // If product has variants, use first variant's size and price
    const firstVariant = hasVariants ? weightOptions.variants[0] : null;
    const displaySize = firstVariant?.size || "";
    const displayPrice = firstVariant?.price || p.price;
    const variantCount = hasVariants ? weightOptions.variants.length : 0;

    return {
      id: Number(p.id),
      name: p.name,
      desc: p.shortDescription || "",
      // Formatujemy cenę do stringa "XX.XX zł"
      price: `${displayPrice} zł`,
      displaySize,
      variantCount,
      // Jeśli nie ma zdjęcia, dajemy placeholder
      image: p.mainImage || "/Img/Olejbio.png",
      category: p.category,
      group: p.productGroup,
      featured: p.isFeatured,
      longDesc: p.longDescription || "",
      application: p.usageInstructions || "",
      ingredients: p.ingredients || "",
      // Opcjonalnie: obsługa wag z JSONa
      sizes: hasVariants ? weightOptions.variants.map((v: any) => v.size) : [],
    };
  });

  // 3. Przekazujemy gotowe dane do komponentu klienta
  return <ShopClientView initialProducts={formattedProducts} />;
}
