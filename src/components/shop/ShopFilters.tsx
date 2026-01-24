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

// Helper function to build filter groups dynamically from products with product names as subcategories
function buildFilterGroups(products: any[]): FilterGroup[] {
  const categoryMap = new Map<
    string,
    { count: number; subcategories: Map<string, number> }
  >();

  products.forEach((product) => {
    const category = product.category;
    const productName = product.name; // Use product name as subcategory

    if (!categoryMap.has(category)) {
      categoryMap.set(category, { count: 0, subcategories: new Map() });
    }

    const catData = categoryMap.get(category)!;
    catData.count++;

    // Add product name as subcategory (each product is a subcategory)
    if (productName) {
      catData.subcategories.set(productName, 1); // Each product appears once
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
      <div className="pb-3 border-b-2 border-[#3A4A22]/20 relative">
        <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-[#1F2A14] mb-1">
          Kategorie
        </h3>
        <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#FFD966]"></div>
      </div>

      {/* PRZYCISK "WSZYSTKIE" */}
      <button
        onClick={() => setCategory("all")}
        className={`
          flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all
          ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-[#3A4A22] to-[#4A5A32] text-[#F4FFD9] font-bold shadow-md"
              : "bg-[#F6F5EE] text-[#1F2A14] font-medium hover:bg-[#3A4A22]/10 hover:shadow-sm"
          }
        `}
      >
        <span className="text-sm tracking-wide">Wszystkie produkty</span>
        <span
          className={`text-xs font-mono ${activeCategory === "all" ? "text-[#FFD966]" : "text-[#6B705C]/60"}`}
        >
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
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer group/btn ${
                  isGroupActive
                    ? "bg-[#F6F5EE] border-l-4 border-[#3A4A22] shadow-sm"
                    : "hover:bg-[#F6F5EE]/50 border-l-4 border-transparent"
                }`}
                onClick={() => {
                  // Toggle expansion when clicking on category name
                  if (hasSubcategories) {
                    toggleGroup(group.id);
                  } else {
                    setCategory(group.name);
                  }
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span
                    className={`text-sm tracking-wide transition-colors ${
                      isGroupActive
                        ? "font-bold text-[#1F2A14]"
                        : "font-medium text-[#1F2A14]/80 group-hover/btn:text-[#1F2A14]"
                    }`}
                  >
                    {group.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono ${isGroupActive ? "text-[#3A4A22] font-semibold" : "text-[#6B705C]/60"}`}
                  >
                    ({groupCount})
                  </span>
                  {hasSubcategories && (
                    <div className="p-1">
                      {isExpanded ? (
                        <ChevronDown size={16} className="text-[#3A4A22]" />
                      ) : (
                        <ChevronRight size={16} className="text-[#1F2A14]/60" />
                      )}
                    </div>
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
                    <div className="flex flex-col gap-1.5 pl-6 pt-3 pb-2 border-l-2 border-[#FFD966]/40 ml-4">
                      {group.subcategories.map((sub) => {
                        const isSubActive =
                          activeCategory === `${group.name}:${sub.name}`;
                        return (
                          <button
                            key={sub.name}
                            onClick={() =>
                              setCategory(`${group.name}:${sub.name}`)
                            }
                            className={`flex items-center justify-between text-left py-2 px-3 rounded-lg transition-all group/sub ${
                              isSubActive
                                ? "bg-gradient-to-r from-[#FFD966]/20 to-[#FFD966]/10 text-[#1F2A14] font-semibold border border-[#FFD966]/30 shadow-sm"
                                : "text-[#1F2A14]/70 hover:bg-[#F6F5EE] hover:text-[#1F2A14] hover:border hover:border-[#1F2A14]/10"
                            }`}
                          >
                            <span className="text-xs flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  isSubActive
                                    ? "bg-[#FFD966]"
                                    : "bg-[#1F2A14]/20 group-hover/sub:bg-[#3A4A22]"
                                }`}
                              ></span>
                              {sub.name}
                            </span>
                            <span
                              className={`text-xs font-mono ${
                                isSubActive
                                  ? "text-[#3A4A22] font-bold"
                                  : "text-[#6B705C]/50"
                              }`}
                            >
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
