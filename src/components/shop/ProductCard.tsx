"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Product } from "./Products";
import { useCart } from "@/context/CartContext"; // <--- IMPORT
import { useToast } from "@/context/ToastContext"; // <--- IMPORT

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart(); // <--- Pobieramy funkcję
  const { showToast } = useToast(); // <--- Pobieramy toasta

  // Funkcja szybkiego dodawania
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Nie wchodzimy w szczegóły
    e.stopPropagation();

    // Jeśli produkt ma rozmiary, bierzemy pierwszy, jeśli nie - "Standard"
    const defaultSize =
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard";

    addToCart(product, defaultSize, 1);
    showToast(`Dodano do koszyka: ${product.name}`);
  };

  return (
    <motion.div
      layout
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
    >
      <Link href={`/sklep/${product.id}`} className="flex flex-col h-full">
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

          {/* Display size badge on image */}
          {product.displaySize && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#1F2A14] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-[#1F2A14]/10 z-10">
              {product.displaySize}
            </div>
          )}

          {/* Multiple variants indicator */}
          {product.variantCount && product.variantCount > 1 && (
            <div className="absolute bottom-3 left-3 bg-[#3A4A22]/90 backdrop-blur-sm text-[#F4FFD9] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10">
              +{product.variantCount - 1}{" "}
              {product.variantCount === 2 ? "rozmiar" : "rozmiary"}
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

          {/* Price */}
          <span className="text-lg font-bold text-[#1F2A14] mt-auto">
            {product.price}
          </span>
        </div>
      </Link>

      {/* BUTTONY */}
      <div className="grid grid-cols-[1fr_60px] border-t border-[#1F2A14]/15 bg-white relative z-10">
        <Link
          href={`/sklep/${product.id}`}
          className="flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1F2A14] group-hover:bg-[#1F2A14] group-hover:text-[#F4FFD9] transition-colors duration-300"
        >
          Szczegóły
        </Link>

        <button
          className="flex items-center justify-center border-l border-[#1F2A14]/15 text-[#1F2A14] hover:bg-[#FFD966] transition-colors duration-300 z-20 cursor-pointer" // cursor-pointer
          onClick={handleQuickAdd} // <--- PODPIĘTE SZYBKIE DODAWANIE
        >
          <ShoppingBag size={18} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}
