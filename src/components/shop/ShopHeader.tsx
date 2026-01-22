"use client";

import { motion } from "framer-motion";

export default function ShopHeader() {
  return (
    <div className="relative mb-20 pt-10 border-b border-[#1F2A14]/10 pb-12">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="block text-xs font-bold tracking-[0.3em] uppercase text-[#6B705C] mb-4"
      >
        Pełna Oferta / 2024
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1F2A14] leading-[0.9] tracking-tight"
      >
        Naturalny <br />
        <span className="italic opacity-80 pl-8 md:pl-20 text-[#3A4A22]">
          Asortyment
        </span>
      </motion.h1>

      {/* Ozdobny opis po prawej (Desktop) */}
      <div className="hidden lg:block absolute bottom-12 right-0 max-w-xs text-right">
        <p className="text-[#6B705C] text-sm leading-relaxed">
          Wybierz to, co najlepsze dla Twojego zdrowia. Produkty tłoczone na
          świeżo, bez kompromisów.
        </p>
      </div>
    </div>
  );
}
