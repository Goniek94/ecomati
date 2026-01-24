"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface ProductVariant {
  size: string;
  price: string;
  priceNumeric: number;
}

interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  displaySize?: string;
  variantCount?: number;
  image: string;
  category: string;
  group: string;
  featured?: boolean;
  sizes?: string[];
  variants?: ProductVariant[];
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-[#F6F5EE] pb-32 pt-16">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        {/* NAGŁÓWEK GRIDU */}
        <div className="flex justify-between items-end mb-12">
          <h3 className="text-xl md:text-xl font-bold text-[#1F2A14] tracking-widest uppercase text-center md:text-left w-full md:w-auto">
            Wybrane dla Ciebie
          </h3>
          <Link
            href="/sklep"
            className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B705C] hover:text-[#3A4A22] transition-colors"
          >
            Zobacz wszystko <ArrowRight size={14} />
          </Link>
        </div>

        {/* GRID PRODUKTÓW (3 rzędy po 4 kolumny) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* PRZYCISK MOBILNY */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link
            href="/sklep"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1F2A14]"
          >
            Zobacz pełną ofertę <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
