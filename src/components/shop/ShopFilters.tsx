"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { products } from "./Products";

interface ShopFiltersProps {
  activeCategory: string;
  setCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FILTER_GROUPS = [
  {
    id: "oleje",
    label: "Oleje Tłoczone",
    subcategories: [
      { id: "olej-lniany", label: "Olej Lniany" },
      { id: "olej-czarnuszka", label: "Olej z Czarnuszki" },
      { id: "olej-kokosowy", label: "Olej Kokosowy" },
      { id: "oliwa", label: "Oliwa z Oliwek" },
      { id: "olej-inne", label: "Pozostałe Oleje" },
    ],
  },
  {
    id: "ziarna",
    label: "Ziarna i Nasiona",
    subcategories: [
      { id: "ziarna-dynia", label: "Pestki Dyni" },
      { id: "ziarna-slonecznik", label: "Słonecznik" },
      { id: "ziarna-inne", label: "Chia i Inne" },
    ],
  },
  {
    id: "orzechy",
    label: "Orzechy",
    subcategories: [
      { id: "orzechy-migdaly", label: "Migdały" },
      { id: "orzechy-wloskie", label: "Włoskie" },
      { id: "orzechy-nerkowce", label: "Nerkowce" },
    ],
  },
  {
    id: "kielki",
    label: "Kiełki i Akcesoria",
    subcategories: [
      { id: "nasiona-kielki", label: "Nasiona na Kiełki" },
      { id: "akcesoria", label: "Akcesoria" },
    ],
  },
  {
    id: "maki",
    label: "Mąki Keto/Bio",
    subcategories: [
      { id: "maki-kokosowa", label: "Mąka Kokosowa" },
      { id: "maki-migdalowa", label: "Mąka Migdałowa" },
    ],
  },
  {
    id: "dodatki",
    label: "Zdrowe Dodatki",
    subcategories: [
      { id: "slodziki", label: "Słodziki Naturalne" },
      { id: "sosy", label: "Sosy i Przyprawy" },
    ],
  },
  {
    id: "zestawy",
    label: "Zestawy Prezentowe",
    subcategories: [],
  },
];

export default function ShopFilters({
  activeCategory,
  setCategory,
  searchQuery,
  setSearchQuery,
}: ShopFiltersProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["oleje"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const getCount = (filterId: string, isGroup: boolean) => {
    if (filterId === "all") return products.length;
    if (isGroup) return products.filter((p) => p.group === filterId).length;
    return products.filter((p) => p.category === filterId).length;
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
      <div className="flex flex-col gap-5">
        {FILTER_GROUPS.map((group) => {
          const isGroupActive =
            activeCategory === group.id ||
            group.subcategories.some((sub) => sub.id === activeCategory);
          const isExpanded = expandedGroups.includes(group.id);
          const groupCount = getCount(group.id, true);

          return (
            <div key={group.id} className="flex flex-col">
              {/* NAGŁÓWEK GRUPY */}
              <div
                className="flex items-center justify-between cursor-pointer group/btn py-1"
                onClick={() => {
                  toggleGroup(group.id);
                  if (group.subcategories.length === 0) setCategory(group.id);
                }}
              >
                <div className="flex items-center gap-2">
                  {group.subcategories.length > 0 && (
                    <span className="text-[#1F2A14]/40">
                      {isExpanded ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </span>
                  )}
                  <span
                    className={`text-sm tracking-wide transition-colors ${isGroupActive ? "font-bold text-[#1F2A14]" : "font-medium text-[#1F2A14]/80 group-hover/btn:text-[#1F2A14]"}`}
                  >
                    {group.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#6B705C]/60">
                  ({groupCount})
                </span>
              </div>

              {/* PODKATEGORIE */}
              <AnimatePresence>
                {isExpanded && group.subcategories.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 pl-7 pt-2 border-l-2 border-[#1F2A14]/5 ml-2 mt-1">
                      {/* Opcja "Wszystkie z tej grupy" */}
                      <button
                        onClick={() => setCategory(group.id)}
                        className={`text-left text-xs uppercase tracking-widest py-1 transition-colors cursor-pointer ${activeCategory === group.id ? "text-[#3A4A22] font-bold" : "text-[#1F2A14]/60 hover:text-[#3A4A22]"}`}
                      >
                        Wszystkie
                      </button>

                      {/* Konkretne warianty */}
                      {group.subcategories.map((sub) => {
                        const count = getCount(sub.id, false);
                        const isActive = activeCategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setCategory(sub.id)}
                            className={`flex items-center justify-between w-full text-left py-1 group/sub cursor-pointer ${isActive ? "text-[#1F2A14] font-semibold" : "text-[#1F2A14]/70 font-normal hover:text-[#1F2A14]"}`}
                          >
                            <span className="text-sm">{sub.label}</span>
                            <span
                              className={`text-[10px] font-mono transition-opacity ${isActive ? "text-[#3A4A22] opacity-100" : "text-[#6B705C]/40 opacity-0 group-hover/sub:opacity-100"}`}
                            >
                              {count}
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
