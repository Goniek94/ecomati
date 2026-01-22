"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// DANE DO SLAJDÓW
const SLIDES = [
  {
    id: "filozofia",
    label: "Filozofia Marki",
    title: (
      <>
        Natura nie <br />
        <span className="italic text-[#6B705C]">potrzebuje</span> <br />
        poprawek.
      </>
    ),
    description: (
      <>
        <p className="mb-6">
          W Ecomati wierzymy w surową siłę prostoty. Nasze oleje nie leżą w
          magazynach miesiącami. Są tłoczone na moment przed tym, jak trafią w
          Twoje ręce.
        </p>
        <p>
          To nie jest masowa produkcja. To rzemiosło, w którym każda kropla ma
          znaczenie.
        </p>
      </>
    ),
    image: "/Img/Olejbio.png", // Butelka
    badge: { val: "100%", text: "ORGANIC" },
  },
  {
    id: "misja",
    label: "Nasza Misja",
    title: (
      <>
        Zdrowie <br />
        zamknięte w <br />
        <span className="italic text-[#FFD966]">kropli.</span>
      </>
    ),
    description: (
      <>
        <p className="mb-6">
          Naszym celem jest przywrócenie stołom prawdziwego smaku i wartości
          odżywczych, które giną w przemysłowym przetwórstwie.
        </p>
        <p>
          Chcemy, abyś wiedział dokładnie, skąd pochodzi Twoje jedzenie.
          Transparentność to nasza waluta.
        </p>
      </>
    ),
    image: "/Img/Dynia.png", // Dynia pasuje do "ziemi/zdrowia"
    badge: { val: "RAW", text: "VEGAN" },
  },
  {
    id: "partnerzy",
    label: "Zaufani Partnerzy",
    title: (
      <>
        Wspieramy <br />
        Lokalnych <br />
        <span className="italic text-[#A4C2A5]">Rolników.</span>
      </>
    ),
    description: (
      <>
        <p className="mb-6">
          Współpracujemy tylko z certyfikowanymi dostawcami, których znamy
          osobiście. Od nasiona do butelki – kontrolujemy każdy etap.
        </p>
        <p>
          Dzięki temu wspieramy lokalne rolnictwo i skracamy łańcuch dostaw do
          absolutnego minimum.
        </p>
      </>
    ),
    image: "/Img/Migdały.png", // Migdały pasują do "surowca/rolników"
    badge: { val: "FAIR", text: "TRADE" },
  },
];

export default function AboutSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatyczna zmiana slajdów co 6 sekund
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const setSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      id="about"
      className="relative w-full min-h-[110vh] bg-[#1F2A14] text-[#F6F5EE] overflow-hidden py-20 flex flex-col justify-center"
    >
      {/* --- TŁO STATYCZNE (Liście) --- */}
      <div className="absolute top-0 right-0 w-[70%] h-full opacity-10 pointer-events-none mix-blend-soft-light">
        <Image
          src="/Img/leaves-4337542_1280.jpg"
          alt="Leaves texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* --- PRZEŁĄCZNIK GÓRNY (Filozofia / Misja / Partnerzy) --- */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-[#F6F5EE]/10 pb-6">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setSlide(idx)}
              className={`text-sm tracking-[0.25em] uppercase transition-all duration-500 ${
                idx === currentIndex
                  ? "text-[#FFD966] font-bold"
                  : "text-[#F6F5EE]/40 hover:text-[#F6F5EE]/80"
              }`}
            >
              0{idx + 1}. {slide.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <div
            key={currentSlide.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* LEWA STRONA: TREŚĆ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-6 flex flex-col gap-8"
            >
              <div className="flex items-center gap-4 text-[#FFD966]">
                <span className="h-[1px] w-12 bg-[#FFD966]"></span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase">
                  {currentSlide.label}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl xl:text-8xl font-serif leading-[0.95]">
                {currentSlide.title}
              </h2>

              <div className="max-w-xl mt-4 text-lg md:text-xl font-light leading-relaxed text-[#F6F5EE]/80">
                {currentSlide.description}
              </div>

              {/* Przycisk CTA */}
              <div className="mt-8">
                <button className="group relative px-8 py-4 border border-[#F6F5EE]/30 rounded-full overflow-hidden hover:border-[#FFD966] transition-colors duration-300">
                  <span className="relative z-10 text-sm tracking-widest font-semibold group-hover:text-[#1F2A14] transition-colors duration-300">
                    WIĘCEJ O NAS
                  </span>
                  <div className="absolute inset-0 bg-[#FFD966] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </div>
            </motion.div>

            {/* PRAWA STRONA: ZDJĘCIE */}
            <div className="lg:col-span-6 relative h-[500px] md:h-[600px] flex items-center justify-center">
              {/* Dekoracyjne okręgi (Stałe) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-[#F6F5EE]/5 rounded-full border-dashed"
                />
              </div>

              {/* Główne zdjęcie (Animowane przy zmianie slajdu) */}
              <motion.div
                key={currentSlide.image} // Klucz wymusza re-render animacji
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[280px] md:w-[450px] drop-shadow-2xl"
              >
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.label}
                  width={600}
                  height={600}
                  className="object-contain"
                />
              </motion.div>

              {/* Pływający Badge */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-10 right-0 md:right-20 bg-[#F6F5EE] text-[#1F2A14] p-4 md:p-6 backdrop-blur-sm bg-opacity-95"
              >
                <h4 className="font-serif text-2xl md:text-3xl mb-1">
                  {currentSlide.badge.val}
                </h4>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                  {currentSlide.badge.text}
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>

        {/* Pasek postępu slajdów na dole */}
        <div className="flex gap-2 mt-12 md:mt-0">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 transition-all duration-500 ${idx === currentIndex ? "w-12 bg-[#FFD966]" : "w-4 bg-[#F6F5EE]/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
