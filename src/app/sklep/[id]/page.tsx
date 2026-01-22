"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // <--- useRouter
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import { products, Product } from "@/components/shop/Products";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext"; // <--- useCart

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter(); // <--- Router do przekierowania
  const { addToCart } = useCart(); // <--- Funkcja z kontekstu

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

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
      }
    }
  }, [id]);

  // --- FUNKCJA DODAWANIA DO KOSZYKA ---
  const handleAddToCart = () => {
    if (!product) return;
    const sizeToAdd = selectedSize || "Standard"; // Zabezpieczenie

    addToCart(product, sizeToAdd); // Dodaj do stanu
    router.push("/koszyk"); // Przejdź do koszyka
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

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-32 mb-24">
          {/* LEWA STRONA */}
          <div className="lg:w-1/2 relative">
            <div className="lg:sticky lg:top-32 h-[50vh] lg:h-[75vh] w-full bg-[#EBE9DE] rounded-lg overflow-hidden border border-[#1F2A14]/5">
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
          <div className="lg:w-1/2 max-w-xl py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#3A4A22] mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1F2A14] leading-[1] mb-6">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-[#1F2A14] mb-8">
                {product.price}
              </p>
              <p className="text-[#1F2A14]/70 text-lg leading-relaxed mb-10 font-light">
                {product.longDesc || "Naturalny produkt najwyższej jakości."}
              </p>

              {/* Wybór rozmiaru */}
              {product.sizes && (
                <div className="mb-10">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#6B705C] mb-4">
                    Wybierz wariant
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`
                             relative px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-all duration-300
                             ${
                               selectedSize === size
                                 ? "bg-[#1F2A14] text-[#F6F5EE] border-[#1F2A14]"
                                 : "bg-transparent text-[#1F2A14] border-[#1F2A14]/20 hover:border-[#1F2A14]"
                             }
                           `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Przycisk Koszyka */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12 border-b border-[#1F2A14]/10 pb-12"
            >
              <button
                className="w-full bg-[#1F2A14] text-[#F6F5EE] py-5 rounded-md flex items-center justify-center gap-3 hover:bg-[#3A4A22] transition-colors group shadow-lg shadow-[#1F2A14]/20"
                onClick={handleAddToCart} // <--- Podpięta funkcja
              >
                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {selectedSize
                    ? `Dodaj (${selectedSize})`
                    : "Dodaj do koszyka"}
                </span>
                <ShoppingBag
                  size={18}
                  className="text-[#FFD966] group-hover:scale-110 transition-transform"
                />
              </button>
            </motion.div>

            {/* Akordeony */}
            <div className="flex flex-col">
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
        </div>

        {/* Podobne produkty */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-[#1F2A14]/10 pt-24 pb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#6B705C] mb-4">
                  Rekomendacje
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#1F2A14]">
                  Może Ci się spodobać
                </h2>
              </div>
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
    <div className="border-b border-[#1F2A14]/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center group text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F2A14] group-hover:text-[#3A4A22] transition-colors">
          {title}
        </span>
        <span className="text-[#1F2A14]/40 group-hover:text-[#3A4A22] transition-colors ml-4">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-[#6B705C] text-sm leading-relaxed max-w-lg">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
