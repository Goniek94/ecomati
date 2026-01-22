"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Quote } from "lucide-react";

// --- DANE SLAJDÓW ---
const slides = [
  {
    quote: "Tłoczymy tylko to, co sami podajemy naszym dzieciom.",
    author: "Gwarancja Jakości",
    description:
      "Każda butelka oleju i każda paczka ziaren przechodzi przez nasze ręce. Nie magazynujemy produktów miesiącami – tłoczymy na bieżąco, aby zachować pełnię wartości odżywczych i ten niepowtarzalny aromat.",
  },
  {
    quote: "Natura nie spieszy się, a mimo to wszystko osiąga.",
    author: "Lao Tzu",
    description:
      "Wierzymy w procesy, które wymagają czasu. Nasze oleje tłoczone są powoli, w niskiej temperaturze, co pozwala zachować ich biologiczne bogactwo i naturalny smak, którego nie da się podrobić.",
  },
  {
    quote: "Twoje pożywienie powinno być lekarstwem.",
    author: "Hipokrates",
    description:
      "Zdrowie zaczyna się na talerzu. Dlatego nasze produkty są w 100% naturalne, bez konserwantów i ulepszaczy. Dostarczamy Ci czystą energię wprost z nasion i orzechów.",
  },
];

type Product = {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  featured?: boolean;
};

// --- KOMPONENT KARTY (ZMIENIONY) ---
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        group flex flex-col h-full bg-white 
        relative overflow-hidden
        
        /* 1. KURSOR */
        cursor-pointer

        /* 2. RAMKI I KONTRAST (Zwiększona widoczność) */
        border border-[#1F2A14]/15  /* Było /5, teraz jest wyraźniejsze */
        shadow-sm                   /* Delikatny cień, żeby oderwać od tła */

        /* 3. EFEKTY NA HOVER */
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-[#1F2A14]/40   /* Ciemniejsza ramka przy najechaniu */
        hover:shadow-[0_30px_50px_-12px_rgba(31,42,20,0.15)] /* Zielony cień 3D */
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Opcjonalnie: obsługa kliknięcia w całą kartę
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
            e.stopPropagation(); // Żeby kliknięcie w koszyk nie przenosiło na stronę produktu
            console.log("Dodano do koszyka");
          }}
        >
          <ShoppingBag size={18} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

// --- GŁÓWNY KOMPONENT ---
export default function FeaturedProductsLG() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const baseProducts: Product[] = [
    {
      id: 1,
      name: "Olej lniany BIO",
      desc: "250 ml · tłoczony",
      price: "29,90 zł",
      image: "/img/Olejbio.png",
      featured: true,
    },
    {
      id: 2,
      name: "Pestki dyni",
      desc: "200 g · naturalne",
      price: "19,90 zł",
      image: "/img/Dynia.png",
    },
    {
      id: 3,
      name: "Migdały",
      desc: "200 g · niesolone",
      price: "24,90 zł",
      image: "/img/Migdały.png",
    },
    {
      id: 4,
      name: "Olej Kokosowy",
      desc: "Olej Kokosowy 500ml",
      price: "59,90 zł",
      image: "/img/Olejkokosowy.png",
      featured: true,
    },
  ];

  const products = [...baseProducts, ...baseProducts, ...baseProducts].map(
    (p, i) => ({
      ...p,
      id: i + 1,
      featured: i === 0 || i === 7 || i === 10,
    }),
  );

  return (
    <section className="relative py-24 bg-[#F6F5EE] overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start pt-12 border-t border-[#3A4A22]/20">
          {/* Lewa strona */}
          <div className="mt-4">
            <span className="block text-xs font-bold tracking-[0.3em] uppercase text-[#6B705C] mb-6">
              Katalog Produktów
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1F2A14] leading-[1] tracking-tight">
              Naturalna <br />
              <span className="italic opacity-80 font-normal">Selekcja</span>
            </h2>
          </div>

          {/* Prawa strona (Slider) */}
          <div className="relative min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex flex-col"
              >
                <div className="mb-6">
                  <Quote size={32} className="text-[#3A4A22]/40 mb-4" />
                  <p className="text-2xl md:text-3xl font-serif italic text-[#1F2A14] mb-3 leading-snug">
                    "{slides[currentSlide].quote}"
                  </p>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B705C]">
                    <span className="w-4 h-px bg-[#6B705C]"></span>
                    {slides[currentSlide].author}
                  </span>
                </div>
                <div className="pl-6 border-l-2 border-[#3A4A22] mt-4">
                  <p className="text-[#6B705C] text-sm md:text-base leading-relaxed max-w-lg">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* GRID PRODUKTÓW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-16 mt-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center items-center flex-col"
        >
          <div className="h-16 w-px bg-[#3A4A22]/30 mb-8"></div>
          <a
            href="/sklep"
            className="
              group relative overflow-hidden
              px-16 py-5
              border border-[#1F2A14]
              text-[#1F2A14]
              text-xs font-bold uppercase tracking-[0.3em]
              transition-all duration-300
              hover:text-[#F4FFD9]
            "
          >
            <span className="absolute inset-0 bg-[#1F2A14] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-4">
              Przejdź do sklepu
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
