"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Leaf, ShieldCheck, Award, Users } from "lucide-react";

// --- DANE SLAJDÓW ---
const slides = [
  {
    id: 0,
    tabLabel: "01. O NAS",
    title: "Czysta energia",
    subtitle: "Zrodzona z natury",
    // Treść jest komponentem, żeby zachować czystość
    content: (
      <div className="space-y-8">
        <p className="text-lg md:text-xl leading-relaxed text-[#D6DCC2] max-w-2xl">
          ECOMATI to powrót do korzeni. W świecie pełnym sztucznych ulepszaczy,
          my wybieramy drogę bez skrótów. Wierzymy, że natura nie potrzebuje
          poprawek, dlatego nasze produkty są surowe, nieprzetworzone i pełne
          pierwotnej wartości.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div className="bg-[#F4FFD9]/5 p-6 border border-[#F4FFD9]/10">
            <span className="block text-3xl font-serif text-[#FFD966] mb-1">
              100%
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#F4FFD9]/60">
              Natura
            </span>
          </div>
          <div className="bg-[#F4FFD9]/5 p-6 border border-[#F4FFD9]/10">
            <span className="block text-3xl font-serif text-[#FFD966] mb-1">
              2024
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#F4FFD9]/60">
              Założona
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    tabLabel: "02. CO ROBIMY",
    title: "Bez kompromisów",
    subtitle: "Proces produkcji",
    content: (
      <div className="space-y-8">
        <p className="text-lg text-[#D6DCC2] max-w-2xl">
          Nasz proces jest prosty, ale rygorystyczny. Selekcjonujemy ziarna z
          certyfikowanych upraw, tłoczymy je w niskiej temperaturze i
          natychmiast butelkujemy, by zamknąć w środku świeżość.
        </p>
        <ul className="space-y-5">
          {[
            { icon: Leaf, text: "Organiczne, certyfikowane uprawy" },
            { icon: ShieldCheck, text: "Tłoczenie na zimno (poniżej 40°C)" },
            { icon: Award, text: "Brak konserwantów i filtracji chemicznej" },
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-4 text-[#F4FFD9] group"
            >
              <div className="w-10 h-10 rounded-full bg-[#FFD966]/10 flex items-center justify-center text-[#FFD966] group-hover:bg-[#FFD966] group-hover:text-[#1F2A14] transition-colors duration-300">
                <item.icon size={18} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    tabLabel: "03. PARTNERZY",
    title: "Zaufali nam",
    subtitle: "Jakość potwierdzona",
    content: (
      <div className="w-full h-full flex flex-col justify-between">
        <p className="text-lg text-[#D6DCC2] mb-8 max-w-2xl">
          Współpracujemy tylko z tymi, którzy podzielają nasze wartości. Oto
          nasi certyfikowani dostawcy oraz partnerzy technologiczni, dzięki
          którym jakość ECOMATI jest niezmienna.
        </p>

        {/* GRID LOGOTYPÓW - Wygląda zawsze tak samo równo */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "GREEN FIELD",
            "BIO PRESS",
            "PURE SEEDS",
            "ORGANIC ALLIANCE",
            "ECO CERT",
            "NATURE VIBE",
          ].map((partner, i) => (
            <div
              key={i}
              className="
                h-20 
                border border-[#F4FFD9]/10 
                bg-[#F4FFD9]/5 
                flex items-center justify-center 
                hover:bg-[#F4FFD9]/10 hover:border-[#F4FFD9]/20 
                transition-all duration-300 cursor-default group
              "
            >
              <span className="font-serif italic text-[#F4FFD9]/30 group-hover:text-[#FFD966] transition-colors font-bold text-sm md:text-base">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function AboutSlider() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play: Zmiana co 5 sekund
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative bg-[#1F2A14] text-[#F4FFD9] py-32 overflow-hidden border-t border-[#F4FFD9]/5">
      {/* TŁO DEKORACYJNE */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#253218] to-transparent pointer-events-none opacity-40" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* --- KOLUMNA 1: NAWIGACJA (LEWA) --- */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
            {slides.map((slide, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`
                    relative group w-full text-left p-6 transition-all duration-500 border border-transparent
                    ${isActive ? "bg-[#F4FFD9]/5 border-[#F4FFD9]/10" : "hover:bg-[#F4FFD9]/5 opacity-60 hover:opacity-100"}
                  `}
                >
                  {/* TEKST PRZYCISKU */}
                  <div className="flex justify-between items-center relative z-10">
                    <span
                      className={`text-sm font-bold tracking-[0.25em] uppercase transition-colors ${isActive ? "text-[#FFD966]" : "text-[#F4FFD9]"}`}
                    >
                      {slide.tabLabel}
                    </span>
                    {isActive && (
                      <ArrowUpRight size={16} className="text-[#FFD966]" />
                    )}
                  </div>

                  {/* PASEK CZASU (Timer) - Tylko dla aktywnego */}
                  {isActive && !isPaused && (
                    <motion.div
                      layoutId="timer"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#FFD966] w-full z-20"
                    />
                  )}
                  {/* Tło paska czasu (szare) */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-[2px] bg-[#F4FFD9]/10 w-full z-10" />
                  )}
                </button>
              );
            })}
          </div>

          {/* --- KOLUMNA 2: TREŚĆ (PRAWA) - FIXED HEIGHT CONTAINER --- */}
          <div
            className="lg:col-span-8 relative h-[600px] border border-[#F4FFD9]/5 bg-[#1F2A14]/50 backdrop-blur-sm overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center"
              >
                {/* HEADER TREŚCI */}
                <div className="mb-10">
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg md:text-2xl font-serif italic text-[#FFD966] opacity-90 mb-2"
                  >
                    {slides[activeTab].subtitle}
                  </motion.h4>

                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[clamp(2.5rem,4vw,4rem)] font-serif text-[#F4FFD9] leading-none uppercase tracking-tight"
                  >
                    {slides[activeTab].title}
                  </motion.h3>
                </div>

                {/* GŁÓWNA TREŚĆ (Dynamiczna) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-[#F4FFD9]/10 pt-8 flex-grow"
                >
                  {slides[activeTab].content}
                </motion.div>

                {/* LINK NA DOLE (Zawsze w tym samym miejscu) */}
                <div className="mt-auto pt-8 flex justify-end">
                  <a
                    href="/o-nas"
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F4FFD9] hover:text-[#FFD966] transition-colors"
                  >
                    Dowiedz się więcej
                    <div className="w-8 h-px bg-[#F4FFD9]/30 group-hover:bg-[#FFD966] transition-colors" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
