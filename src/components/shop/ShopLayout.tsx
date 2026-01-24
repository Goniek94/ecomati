"use client";

import { useState } from "react";
import HeroNav from "@/components/hero/HeroNav";
import ShopHeader from "./ShopHeader";
import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Footer from "@/components/layout/Footer";
import { products } from "@/components/shop/Products"; // <--- 1. DODANY IMPORT

export default function ShopLayout() {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="bg-[#F6F5EE] min-h-screen">
      {/* Nawigacja w wariancie ciemnym dla widoczności na jasnym tle */}
      <HeroNav variant="dark" />

      {/* Sekcja główna z paddingiem górnym dla nawigacji absolute */}
      <section className="pt-48 pb-32">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12">
          <ShopHeader />

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 mt-24">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border-2 border-[#3A4A22]/20 shadow-[0_10px_40px_rgba(58,74,34,0.15),0_4px_12px_rgba(31,42,20,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_15px_50px_rgba(58,74,34,0.2),0_6px_16px_rgba(31,42,20,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[#FFD966]/5 before:to-transparent before:pointer-events-none">
                <ShopFilters
                  products={products} // <--- 2. PRZEKAZANIE PRODUKTÓW (To naprawia błąd)
                  activeCategory={category}
                  setCategory={setCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </aside>

            <main>
              <ProductGrid
                activeCategory={category}
                searchQuery={searchQuery}
              />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
