"use client";

import { motion } from "framer-motion";
import HeroNav from "./HeroNav";
import HeroOverlay from "./HeroOverlay";
import HeroTitle from "./HeroTitle";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden rounded-[28px]">
      {/* NAWIGACJA */}
      <HeroNav />

      {/* 🎥 VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/movies/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* PRZYCIEMNIENIE + CIEŃ */}
      <div
        className="
          absolute inset-0
          bg-black/40
          shadow-[inset_0_0_260px_90px_rgba(0,0,0,0.75)]
        "
      />

      {/* AURA */}
      <HeroOverlay />

      {/* TYTUŁ */}
      <HeroTitle />

      {/* DOLNE CTA */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F4FFD9]/80 z-20 select-none">
        <span className="text-xs tracking-[0.3em] uppercase">Przewiń</span>

        {/* 🔽 PULSUJĄCA STRZAŁKA */}
        <motion.span
          className="text-xl"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}
