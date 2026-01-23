"use client";

import { useState } from "react";
// Usuwamy AnimatePresence, bo nie będziemy animować wyjścia
import { motion } from "framer-motion";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/components/shop/Products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" ||
      product.category === activeCategory ||
      product.group === activeCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query) ||
      (product.longDesc && product.longDesc.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      <HeroNav variant="dark" />

      <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* LEWA KOLUMNA */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="sticky top-32 z-30 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
              <ShopFilters
                activeCategory={activeCategory}
                setCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </aside>

          {/* PRAWA KOLUMNA */}
          <div className="flex-grow">
            <div className="flex justify-between items-end mb-8 pb-4 border-b border-[#1F2A14]/10">
              <span className="text-xs font-bold tracking-widest text-[#6B705C] uppercase">
                Wyniki: {filteredProducts.length}
              </span>
            </div>

            {/* ZMIANA: Zwykły div zamiast motion.div + brak AnimatePresence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center">
                <h3 className="text-2xl font-serif text-[#1F2A14] mb-2">
                  Brak produktów
                </h3>
                <p className="text-[#6B705C]">
                  Nie znaleźliśmy produktów dla frazy &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-6 text-xs font-bold uppercase tracking-widest border-b border-[#1F2A14] pb-1 hover:text-[#3A4A22] transition-colors"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
