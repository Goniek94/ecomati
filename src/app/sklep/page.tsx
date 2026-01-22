"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/components/shop/Products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      {/* 1. NAWIGACJA */}
      <HeroNav variant="dark" />

      {/* 2. GŁÓWNA SEKCJA SKLEPU (Layout 2-kolumnowy) */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* --- LEWA KOLUMNA: STICKY FILTRY --- */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-32 z-30">
              <ShopFilters
                activeCategory={activeCategory}
                setCategory={setActiveCategory}
              />
            </div>
          </aside>

          {/* --- PRAWA KOLUMNA: PRODUKTY --- */}
          <div className="flex-grow">
            {/* Nagłówek Gridu (Liczba wyników) */}
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-[#1F2A14]/10">
              <span className="text-xs font-bold tracking-widest text-[#6B705C] uppercase">
                Wyniki: {filteredProducts.length}
              </span>
              {/* Opcjonalnie: Przycisk filtrów dla mobile */}
              <span className="lg:hidden text-xs font-bold tracking-widest text-[#1F2A14] uppercase">
                Filtry
              </span>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <h3 className="text-2xl font-serif text-[#1F2A14] mb-2">
                  Brak produktów
                </h3>
                <p className="text-[#6B705C]">Spróbuj zmienić kategorię.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
