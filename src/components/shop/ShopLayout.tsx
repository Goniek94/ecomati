"use client";

import { useState } from "react";
import ShopHeader from "./ShopHeader";
import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import { products } from "./Products";

export default function ShopLayout() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  return (
    <section className="bg-[#F6F5EE] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-10">
        <ShopHeader />

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-20 mt-24">
          <ShopFilters
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

          <ProductGrid products={products} category={category} sort={sort} />
        </div>
      </div>
    </section>
  );
}
