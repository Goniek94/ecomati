"use client";

import { motion } from "framer-motion";
import { products } from "./Products"; // Potrzebne do liczenia produktów

interface ShopFiltersProps {
  activeCategory: string;
  setCategory: (category: string) => void;
}

const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "oleje", label: "Oleje Tłoczone" },
  { id: "ziarna", label: "Ziarna i Pestki" },
  { id: "orzechy", label: "Orzechy" },
  { id: "zestawy", label: "Zestawy Prezentowe" },
];

export default function ShopFilters({
  activeCategory,
  setCategory,
}: ShopFiltersProps) {
  // Funkcja licząca produkty w danej kategorii
  const getCount = (catId: string) => {
    if (catId === "all") return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="flex flex-col gap-10">
      {/* NAGŁÓWEK FILTRÓW (Tylko Desktop) */}
      <div className="hidden lg:block pb-6 border-b border-[#1F2A14]/10">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1F2A14]">
          Kategorie
        </h3>
      </div>

      {/* LISTA KATEGORII */}
      <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-8 lg:gap-4 pb-4 lg:pb-0 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`
                group flex items-center justify-between w-full text-left whitespace-nowrap
                transition-all duration-300
                ${isActive ? "opacity-100" : "opacity-50 hover:opacity-100"}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Kropka wskaźnika (tylko aktywny) */}
                <motion.span
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#3A4A22]"
                />

                <span
                  className={`
                  text-sm md:text-base tracking-wide
                  ${isActive ? "font-semibold text-[#1F2A14]" : "font-normal text-[#1F2A14]"}
                `}
                >
                  {cat.label}
                </span>
              </div>

              {/* Licznik produktów (Tylko Desktop) */}
              <span className="hidden lg:block text-xs font-mono text-[#6B705C] opacity-60 group-hover:opacity-100 transition-opacity">
                ({count})
              </span>
            </button>
          );
        })}
      </nav>

      {/* DODATKOWE FILTRY (Tylko Desktop - atrapa dla wyglądu Premium) */}
      <div className="hidden lg:block pt-10 border-t border-[#1F2A14]/10">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1F2A14] mb-6">
          Sortuj
        </h3>
        <div className="flex flex-col gap-3 items-start text-sm text-[#1F2A14]/60">
          <button className="hover:text-[#1F2A14] transition-colors">
            Domyślnie
          </button>
          <button className="hover:text-[#1F2A14] transition-colors">
            Cena: rosnąco
          </button>
          <button className="hover:text-[#1F2A14] transition-colors">
            Cena: malejąco
          </button>
        </div>
      </div>
    </div>
  );
}
