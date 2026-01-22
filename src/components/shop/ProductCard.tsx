"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

// Definicja typu produktu (używana wszędzie)
export type Product = {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  category: string; // Dodajemy kategorię do filtrowania
  featured?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout // Kluczowe dla płynnej animacji filtrowania
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        group flex flex-col h-full bg-white 
        relative overflow-hidden cursor-pointer
        border border-[#1F2A14]/15 shadow-sm
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-[#1F2A14]/40
        hover:shadow-[0_30px_50px_-12px_rgba(31,42,20,0.15)]
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => (window.location.href = `/produkt/${product.id}`)}
    >
      {/* ZDJĘCIE */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F6F5EE] border-b border-[#1F2A14]/10">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {product.featured && (
          <div className="absolute top-0 left-0 bg-[#1F2A14] text-[#F4FFD9] text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 z-10 shadow-sm">
            Bestseller
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-grow p-6 text-center bg-white relative z-10">
        <h3 className="text-xl font-serif text-[#1F2A14] mb-2 group-hover:text-[#3A4A22] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-[10px] text-[#6B705C] uppercase tracking-widest mb-4">
          {product.desc}
        </p>
        <span className="text-lg font-bold text-[#1F2A14] mt-auto">
          {product.price}
        </span>
      </div>

      {/* BUTTONY */}
      <div className="grid grid-cols-[1fr_60px] border-t border-[#1F2A14]/15 bg-white relative z-10">
        <div className="flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1F2A14] group-hover:bg-[#1F2A14] group-hover:text-[#F4FFD9] transition-colors duration-300">
          Szczegóły
        </div>
        <button
          className="flex items-center justify-center border-l border-[#1F2A14]/15 text-[#1F2A14] hover:bg-[#FFD966] transition-colors duration-300 z-20"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Dodano do koszyka");
          }}
        >
          <ShoppingBag size={18} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}
