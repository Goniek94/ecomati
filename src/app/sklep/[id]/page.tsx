import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!product) return null;

    return {
      id: Number(product.id),
      name: product.name,
      desc: product.shortDescription || "",
      price: `${product.price} zł`,
      image: product.mainImage || "/Img/Olejbio.png",
      category: product.category,
      group: product.productGroup || "",
      featured: product.isFeatured,
      longDesc: product.longDescription || "",
      application: product.usageInstructions || "",
      ingredients: product.ingredients || "",
      properties: product.properties || [],
      details: `Producent: ${product.producer || "Brak danych"}. Kraj pochodzenia: ${product.originCountry || "Brak danych"}.`,
      sizes:
        product.weightOptions && (product.weightOptions as any).variants
          ? (product.weightOptions as any).variants.map((v: any) => v.size)
          : [],
      variants:
        product.weightOptions && (product.weightOptions as any).variants
          ? (product.weightOptions as any).variants
          : [],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentId: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category,
        id: { not: BigInt(currentId) },
        deletedAt: null,
        isAvailable: true,
      },
      take: 4,
    });

    return products.map((p: Product) => ({
      id: Number(p.id),
      name: p.name,
      desc: p.shortDescription || "",
      price: `${p.price} zł`,
      image: p.mainImage || "/Img/Olejbio.png",
      category: p.category,
      group: p.productGroup || "",
      featured: p.isFeatured,
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
  );

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
