"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus, ShoppingBag, Star } from "lucide-react";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/components/shop/Products";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  // NOWY STAN: Ilość sztuk
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      const found = products.find((p) => p.id === Number(id));
      if (found) {
        setProduct(found);
        if (found.sizes && found.sizes.length > 0) {
          setSelectedSize(found.sizes[0]);
        }
        const related = products
          .filter((p) => p.category === found.category && p.id !== found.id)
          .slice(0, 4);
        setRelatedProducts(related);
        setQuantity(1); // Reset ilości przy zmianie produktu
      }
    }
  }, [id]);

  // Obsługa zmiany ilości
  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const sizeToAdd = selectedSize || "Standard";

    // Przekazujemy ilość (quantity) do funkcji
    addToCart(product, sizeToAdd, quantity);

    showToast(`Dodano do koszyka: ${product.name} (${quantity} szt.)`);
  };

  if (!product) return <div className="min-h-screen bg-[#F6F5EE]" />;

  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      <HeroNav variant="dark" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-12">
        <div className="mb-12">
          <Link
            href="/sklep"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B705C] hover:text-[#1F2A14] transition-colors"
          >
            <ArrowLeft size={14} /> Powrót do sklepu
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 mb-24 items-start">
          {/* LEWA STRONA */}
          <div className="lg:w-1/2 relative w-full">
            <div className="lg:sticky lg:top-32 h-[50vh] lg:h-[80vh] w-full bg-[#EBE9DE] rounded-[2rem] overflow-hidden border border-[#1F2A14]/5 shadow-sm">
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
          </div>

          {/* PRAWA STRONA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] shadow-[0_40px_100px_-30px_rgba(31,42,20,0.08)] border border-[#1F2A14]/5">
              <div className="flex justify-between items-start mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-[#F6F5EE] text-[10px] font-bold uppercase tracking-[0.2em] text-[#3A4A22]">
                  {product.category}
                </span>
                <div className="flex text-[#FFD966]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1F2A14] leading-[1] mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <p className="text-3xl font-light text-[#1F2A14]">
                  {product.price}
                </p>
              </div>

              <p className="text-[#1F2A14]/70 text-base md:text-lg leading-relaxed mb-10 font-light border-l-2 border-[#1F2A14]/10 pl-6">
                {product.longDesc || "Naturalny produkt najwyższej jakości."}
              </p>

              {/* Wybór Wariantu */}
              {product.sizes && (
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#6B705C] mb-4">
                    Wybierz wariant
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`
                             relative px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                             ${
                               selectedSize === size
                                 ? "bg-[#1F2A14] text-[#F6F5EE] border-[#1F2A14] shadow-lg transform scale-105"
                                 : "bg-[#F6F5EE] text-[#1F2A14] border-transparent hover:border-[#1F2A14]/30 hover:bg-white"
                             }
                           `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* NOWA SEKCJA: WYBÓR ILOŚCI I PRZYCISK */}
              <div className="mb-12 pb-12 border-b border-[#1F2A14]/5">
                <div className="flex gap-4">
                  {/* Licznik sztuk */}
                  <div className="flex items-center bg-[#F6F5EE] rounded-2xl border border-transparent hover:border-[#1F2A14]/10 transition-colors">
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
                      className="w-12 h-full flex items-center justify-center text-[#1F2A14]/50 hover:text-[#1F2A14] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Główny przycisk */}
                  <button
                    className="flex-grow bg-[#1F2A14] text-[#F6F5EE] py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-[#3A4A22] transition-all duration-300 group shadow-xl shadow-[#1F2A14]/10 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.25em]">
                      {selectedSize ? `Dodaj do koszyka` : "Wybierz wariant"}
                    </span>
                    <div className="bg-[#F6F5EE]/10 p-2 rounded-full group-hover:bg-[#FFD966] group-hover:text-[#1F2A14] transition-colors">
                      <ShoppingBag size={18} />
                    </div>
                  </button>
                </div>

                <p className="text-center text-[10px] uppercase tracking-widest text-[#6B705C] mt-4 opacity-60">
                  Darmowa dostawa od 200 zł
                </p>
              </div>

              {/* Akordeony */}
              <div className="flex flex-col gap-1">
                <AccordionItem
                  title="Zastosowanie"
                  content={product.application || "Brak danych."}
                  defaultOpen
                />
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

        {/* Podobne produkty */}
        {relatedProducts.length > 0 && (
          <motion.section className="border-t border-[#1F2A14]/10 pt-24 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
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
  content: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#1F2A14]/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center group text-left hover:bg-[#F6F5EE]/50 px-2 rounded-lg transition-colors cursor-pointer"
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
            className="overflow-hidden px-2"
          >
            <p className="pb-6 text-[#6B705C] text-sm leading-relaxed max-w-lg">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
