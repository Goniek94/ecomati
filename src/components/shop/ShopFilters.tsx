"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";

interface ShopFiltersProps {
  activeCategory: string;
  setCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: any[]; // Products from database
}

interface FilterGroup {
  id: string;
  name: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

// Helper function to build filter groups dynamically from products with subcategories
function buildFilterGroups(products: any[]): FilterGroup[] {
  const categoryMap = new Map<
    string,
    { count: number; subcategories: Map<string, number> }
  >();

  products.forEach((product) => {
    const category = product.category;
    const subcategory = product.productGroup;

    if (!categoryMap.has(category)) {
      categoryMap.set(category, { count: 0, subcategories: new Map() });
    }

    const catData = categoryMap.get(category)!;
    catData.count++;

    if (subcategory) {
      catData.subcategories.set(
        subcategory,
        (catData.subcategories.get(subcategory) || 0) + 1,
      );
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, data]) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      count: data.count,
      subcategories: Array.from(data.subcategories.entries())
        .map(([subName, subCount]) => ({
          name: subName,
          count: subCount,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function ShopFilters({
  activeCategory,
  setCategory,
  searchQuery,
  setSearchQuery,
  products,
}: ShopFiltersProps) {
  // Dynamically build filter groups from products
  const FILTER_GROUPS = buildFilterGroups(products);

  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    FILTER_GROUPS[0]?.id || "",
  ]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const getCount = (categoryName: string) => {
    if (categoryName === "all") return products.length;
    return products.filter((p) => p.category === categoryName).length;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* --- WYSZUKIWARKA --- */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1F2A14]/40 group-focus-within:text-[#3A4A22] transition-colors">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Szukaj produktu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-8 py-3 bg-white border border-[#1F2A14]/10 rounded-xl text-sm text-[#1F2A14] placeholder:text-[#1F2A14]/30 focus:outline-none focus:border-[#3A4A22]/50 focus:ring-1 focus:ring-[#3A4A22]/20 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2A14]/40 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* HEADER KATEGORII */}
      <div className="hidden lg:block pb-2 border-b border-[#1F2A14]/10">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1F2A14]">
          Kategorie
        </h3>
      </div>

      {/* PRZYCISK "WSZYSTKIE" */}
      <button
        onClick={() => setCategory("all")}
        className={`
          flex items-center justify-between w-full text-left group cursor-pointer
          ${activeCategory === "all" ? "text-[#3A4A22] font-bold" : "text-[#1F2A14] font-medium"}
        `}
      >
        <span>Wszystkie produkty</span>
        <span className="text-xs font-mono text-[#6B705C]/60">
          ({products.length})
        </span>
      </button>

      {/* LISTA GRUP */}
      <div className="flex flex-col gap-3">
        {FILTER_GROUPS.map((group: FilterGroup) => {
          const isGroupActive = activeCategory === group.name;
          const isExpanded = expandedGroups.includes(group.id);
          const groupCount = group.count;
          const hasSubcategories = group.subcategories.length > 0;

          return (
            <div key={group.id} className="flex flex-col">
              {/* NAGŁÓWEK GRUPY */}
              <div className="flex items-center justify-between group/btn py-1">
                <div
                  className="flex items-center gap-2 flex-1 cursor-pointer"
                  onClick={() => {
                    setCategory(group.name);
                  }}
                >
                  <span
                    className={`text-sm tracking-wide transition-colors ${isGroupActive ? "font-bold text-[#1F2A14]" : "font-medium text-[#1F2A14]/80 group-hover/btn:text-[#1F2A14]"}`}
                  >
                    {group.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#6B705C]/60">
                    ({groupCount})
                  </span>
                  {hasSubcategories && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleGroup(group.id);
                      }}
                      className="p-1 hover:bg-[#1F2A14]/5 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-[#3A4A22]" />
                      ) : (
                        <ChevronRight size={16} className="text-[#1F2A14]/60" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* PODKATEGORIE */}
              <AnimatePresence>
                {isExpanded && hasSubcategories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pl-4 pt-2 border-l-2 border-[#1F2A14]/10 ml-2">
                      {group.subcategories.map((sub) => {
                        const isSubActive =
                          activeCategory === `${group.name}:${sub.name}`;
                        return (
                          <button
                            key={sub.name}
                            onClick={() =>
                              setCategory(`${group.name}:${sub.name}`)
                            }
                            className={`flex items-center justify-between text-left py-1.5 px-2 rounded-lg transition-all ${
                              isSubActive
                                ? "bg-[#3A4A22]/10 text-[#3A4A22] font-semibold"
                                : "text-[#1F2A14]/70 hover:bg-[#1F2A14]/5 hover:text-[#1F2A14]"
                            }`}
                          >
                            <span className="text-xs">{sub.name}</span>
                            <span className="text-xs font-mono text-[#6B705C]/50">
                              ({sub.count})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
