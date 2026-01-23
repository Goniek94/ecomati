"use client";

import { useState } from "react";
import HeroNav from "@/components/hero/HeroNav";
import ShopHeader from "./ShopHeader";
import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Footer from "@/components/layout/Footer";

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
            <aside>
              <ShopFilters
                activeCategory={category}
                setCategory={setCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
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
