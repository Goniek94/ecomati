"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const slides = [
  {
    quote: "Tłoczymy tylko to, co sami podajemy naszym dzieciom.",
    author: "Gwarancja Jakości",
    description:
      "Nie magazynujemy produktów. Tłoczymy na bieżąco, aby zachować pełnię życia w każdej kropli.",
  },
  {
    quote: "Natura nie spieszy się, a mimo to wszystko osiąga.",
    author: "Lao Tzu",
    description:
      "Tłoczenie na zimno w niskiej temperaturze to jedyny sposób na zachowanie biologicznego bogactwa.",
  },
  {
    quote: "Twoje pożywienie powinno być lekarstwem.",
    author: "Hipokrates",
    description:
      "Dostarczamy Ci czystą energię wprost z nasion, bez żadnych kompromisów i ulepszaczy.",
  },
];

export default function NaturalSelection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 bg-[#F6F5EE] overflow-hidden">
      {/* Subtelny separator na górze */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#1F2A14]/10" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* --- LEWY PANEL: TYPOGRAFIA --- */}
          {/* Tło karty zmienione na białe, żeby kontrastowało z tłem sekcji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              flex flex-col justify-center 
              p-10 md:p-16 rounded-[2rem]
              bg-white 
              border border-[#3A4A22]/30 
              shadow-[0_20px_40px_-20px_rgba(58,74,34,0.1)]
            "
          >
            <span className="block text-xs font-bold tracking-[0.4em] uppercase text-[#6B705C] mb-8">
              Filozofia Marki
            </span>

            <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif text-[#1F2A14] leading-[0.9] tracking-tight mb-8">
              Naturalna <br />
              <span className="italic text-[#3A4A22]">Selekcja</span>
            </h2>

            <div className="w-12 h-[2px] bg-[#3A4A22] mb-8"></div>

            <p className="text-[#1F2A14]/80 text-lg font-light leading-relaxed">
              Wybraliśmy dla Ciebie produkty, które definiują jakość Ecomati.
              Czysty skład, zero przetworzenia, maksimum natury. To nasza
              obietnica.
            </p>
          </motion.div>

          {/* --- PRAWY PANEL: SLIDER --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="
              relative flex flex-col justify-center
              p-10 md:p-16 rounded-[2rem]
              bg-white 
              border border-[#3A4A22]/30 
              shadow-[0_20px_40px_-20px_rgba(58,74,34,0.1)]
            "
          >
            {/* Ikona w tle */}
            <Quote className="absolute top-8 right-8 text-[#3A4A22]/5 w-32 h-32 -rotate-12 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <p className="text-2xl md:text-3xl font-serif italic text-[#1F2A14] mb-8 leading-snug">
                  „{slides[currentSlide].quote}”
                </p>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3A4A22]">
                    {slides[currentSlide].author}
                  </span>
                  <p className="text-[#6B705C] text-sm leading-relaxed max-w-md border-l-2 border-[#3A4A22]/20 pl-4 mt-2">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Paginacja (Kropki) */}
            <div className="flex gap-2 mt-12">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-[#3A4A22]" : "w-1.5 bg-[#3A4A22]/20"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
