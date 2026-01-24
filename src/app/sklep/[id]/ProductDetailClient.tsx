"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus, ShoppingBag, Star } from "lucide-react";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  category: string;
  group: string;
  featured?: boolean;
  longDesc?: string;
  application?: string;
  ingredients?: string;
  properties?: string[];
  details?: string;
  sizes?: string[];
  variants?: Array<{ size: string; stock: number; price: number }>;
}

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard",
  );
  const [quantity, setQuantity] = useState<number>(1);

  const getCurrentStock = () => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants.find((v) => v.size === selectedSize);
      return variant ? variant.stock : 0;
    }
    return 999;
  };

  const getCurrentPrice = () => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants.find((v) => v.size === selectedSize);
      if (variant && variant.price) {
        const priceNum =
          typeof variant.price === "string"
            ? parseFloat(variant.price)
            : variant.price;
        return `${priceNum.toFixed(2)} zł`;
      }
    }
    return product.price;
  };

  const currentStock = getCurrentStock();
  const currentPrice = getCurrentPrice();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [product.id]);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    showToast(`Dodano do koszyka: ${product.name} (${quantity} szt.)`);
  };

  // --- KOMPONENT NAGŁÓWKA MOBILNEGO (Wyśrodkowany) ---
  const MobileHeader = () => (
    <div className="block lg:hidden mb-8 text-center">
      <div className="flex flex-col items-center gap-3 mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#1F2A14]/5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3A4A22]">
          {product.category}
        </span>
        <div className="flex text-[#FFD966]">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-serif text-[#1F2A14] leading-tight mb-3">
        {product.name}
      </h1>

      <p className="text-[#1F2A14]/70 text-sm leading-relaxed mb-4 font-light px-4">
        {product.desc || "Naturalny produkt najwyższej jakości."}
      </p>

      {/* CENA - WYŚRODKOWANA */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <p className="text-3xl font-light text-[#1F2A14]">{currentPrice}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      <HeroNav variant="dark" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-12">
        <div className="mb-8 lg:mb-12">
          <Link
            href="/sklep"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B705C] hover:text-[#1F2A14] transition-colors"
          >
            <ArrowLeft size={14} /> Powrót do sklepu
          </Link>
        </div>

        {/* Wyświetlamy nagłówek mobilny PRZED układem kolumn */}
        <MobileHeader />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-24 mb-24 items-start">
          {/* === LEWA KOLUMNA (Zdjęcie + Opis Desktop) === */}
          <div className="lg:w-1/2 w-full flex flex-col gap-8">
            <div className="aspect-square lg:h-[80vh] lg:aspect-auto w-full bg-[#EBE9DE] rounded-[2rem] overflow-hidden border border-[#1F2A14]/5 shadow-sm relative">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply p-12 lg:p-20"
                  priority
                />
              </motion.div>
            </div>

            {/* DŁUGI OPIS - DESKTOP ONLY */}
            {product.longDesc && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block bg-white p-8 rounded-[2rem] border border-[#1F2A14]/5 shadow-sm"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B705C] mb-4">
                  Opis produktu
                </h3>
                <p className="text-[#1F2A14]/80 text-base leading-relaxed font-light">
                  {product.longDesc}
                </p>
              </motion.div>
            )}
          </div>

          {/* === PRAWA KOLUMNA === */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-transparent lg:bg-white p-0 lg:p-14 lg:rounded-[2.5rem] lg:shadow-[0_40px_100px_-30px_rgba(31,42,20,0.08)] lg:border border-[#1F2A14]/5">
              {/* NAGŁÓWEK DESKTOPOWY (Ukryty na mobile, bo mamy MobileHeader) */}
              <div className="hidden lg:block">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F6F5EE] border border-[#1F2A14]/5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3A4A22]">
                    {product.category}
                  </span>
                  <div className="flex text-[#FFD966]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <h1 className="text-5xl lg:text-6xl font-serif text-[#1F2A14] leading-[1.1] mb-6">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-8">
                  <p className="text-3xl font-light text-[#1F2A14]">
                    {currentPrice}
                  </p>
                </div>

                <p className="text-[#1F2A14]/70 text-lg leading-relaxed mb-8 font-light border-l-2 border-[#1F2A14]/10 pl-6">
                  {product.desc || "Naturalny produkt najwyższej jakości."}
                </p>
              </div>

              {/* Wybór Wariantu */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#6B705C] mb-4 lg:text-left text-center">
                    Wybierz wariant
                  </span>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => {
                          setSelectedSize(variant.size);
                          setQuantity(1);
                        }}
                        disabled={variant.stock === 0}
                        className={`
                             relative px-6 py-3 md:px-8 md:py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                             ${
                               selectedSize === variant.size
                                 ? "bg-[#1F2A14] text-[#F6F5EE] border-[#1F2A14] shadow-lg transform scale-105"
                                 : variant.stock === 0
                                   ? "bg-gray-200 text-gray-400 border-transparent cursor-not-allowed opacity-50"
                                   : "bg-white lg:bg-[#F6F5EE] text-[#1F2A14] border-transparent hover:border-[#1F2A14]/30"
                             }
                            `}
                      >
                        <span className="block">{variant.size}</span>
                        {variant.stock === 0 && (
                          <span className="block text-[10px] mt-1 opacity-70">
                            Brak
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Akcje (Ilość + Przycisk) */}
              <div className="mb-12 pb-12 border-b border-[#1F2A14]/5">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Licznik sztuk */}
                  <div className="flex items-center bg-white lg:bg-[#F6F5EE] rounded-2xl border border-transparent hover:border-[#1F2A14]/10 transition-colors h-14 sm:h-auto w-full sm:w-auto justify-between sm:justify-start px-4 sm:px-0">
                    <button
                      onClick={() => handleQuantityChange("dec")}
                      className="w-12 h-full flex items-center justify-center text-[#1F2A14]/50 hover:text-[#1F2A14] transition-colors disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-[#1F2A14]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("inc")}
                      className="w-12 h-full flex items-center justify-center text-[#1F2A14]/50 hover:text-[#1F2A14] transition-colors disabled:opacity-30"
                      disabled={quantity >= currentStock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Główny przycisk */}
                  <button
                    className="flex-grow bg-[#1F2A14] text-[#F6F5EE] h-14 sm:h-auto rounded-2xl flex items-center justify-center gap-4 hover:bg-[#3A4A22] transition-all duration-300 group shadow-xl shadow-[#1F2A14]/10 hover:shadow-2xl hover:-translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    onClick={handleAddToCart}
                    disabled={currentStock === 0}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.25em]">
                      {currentStock === 0
                        ? "Brak w magazynie"
                        : "Dodaj do koszyka"}
                    </span>
                    <div className="bg-[#F6F5EE]/10 p-2 rounded-full group-hover:bg-[#FFD966] group-hover:text-[#1F2A14] transition-colors">
                      <ShoppingBag size={18} />
                    </div>
                  </button>
                </div>

                <p className="text-center text-[10px] uppercase tracking-widest text-[#6B705C] mt-4 opacity-60">
                  {currentStock > 0 && currentStock <= 5 ? (
                    <span className="text-amber-600 font-bold">
                      Tylko {currentStock} szt. w magazynie!
                    </span>
                  ) : (
                    "Darmowa dostawa od 200 zł"
                  )}
                </p>
              </div>

              {/* Akordeony */}
              <div className="flex flex-col gap-1">
                {product.longDesc && (
                  <div className="block lg:hidden">
                    <AccordionItem
                      title="Opis produktu"
                      content={product.longDesc}
                      defaultOpen={false}
                    />
                  </div>
                )}
                <AccordionItem
                  title="Zastosowanie"
                  content={product.application || "Brak danych."}
                  defaultOpen={true}
                />
                {product.properties && product.properties.length > 0 && (
                  <AccordionItem
                    title="Właściwości"
                    content={
                      <ul className="list-disc list-inside space-y-2">
                        {product.properties.map((prop, index) => (
                          <li key={index}>{prop}</li>
                        ))}
                      </ul>
                    }
                  />
                )}
                <AccordionItem
                  title="Skład"
                  content={product.ingredients || "100% naturalny."}
                />
                <AccordionItem
                  title="Szczegóły"
                  content={product.details || "Wysyłka 24h."}
                />
                <AccordionItem
                  title="Dostawa i Zwroty"
                  content="Wysyłamy w 24h. 30 dni na zwrot."
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Podobne produkty - NAGŁÓWEK WYŚRODKOWANY */}
        {relatedProducts.length > 0 && (
          <motion.section className="border-t border-[#1F2A14]/10 pt-24 pb-12">
            <div className="flex flex-col items-center justify-center mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-[#1F2A14]">
                Może Ci się spodobać
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
              {relatedProducts.map((relatedProd) => (
                <ProductCard key={relatedProd.id} product={relatedProd} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
      <Footer />
    </main>
  );
}

function AccordionItem({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: string | React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#1F2A14]/5 last:border-0 bg-white lg:bg-transparent rounded-xl lg:rounded-none mb-2 lg:mb-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center group text-left hover:bg-[#F6F5EE]/50 px-4 lg:px-2 transition-colors cursor-pointer"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F2A14] group-hover:text-[#3A4A22]">
          {title}
        </span>
        <span className="text-[#1F2A14]/30 group-hover:text-[#3A4A22]">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-2 pb-6 text-[#6B705C] text-sm leading-relaxed max-w-lg">
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
