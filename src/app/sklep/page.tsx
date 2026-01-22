"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroNav from "@/components/hero/HeroNav"; // Używamy tej samej nawigacji
import Footer from "@/components/layout/Footer"; // I stopki
import ShopHeader from "@/components/shop/ShopHeader";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/components/shop/Products"; // Importujemy dane

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Logika filtrowania
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      {/* NAWIGACJA */}
      <div className="relative z-50 bg-[#1F2A14]">
        <HeroNav />
      </div>

      <section className="max-w-[1700px] mx-auto px-6 md:px-12 pt-16 pb-32">
        {/* NAGŁÓWEK */}
        <ShopHeader />

        {/* FILTRY */}
        <ShopFilters
          activeCategory={activeCategory}
          setCategory={setActiveCategory}
        />

        {/* GRID PRODUKTÓW */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 gap-y-12"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PUSTY STAN (Gdyby filtr nic nie znalazł) */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#6B705C]">
            <p>Brak produktów w tej kategorii.</p>
          </div>
        )}
      </section>

      {/* STOPKA */}
      <Footer />
    </main>
  );
}
