"use client";

import { useEffect, useState } from "react";

export default function HeroNav() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-30 px-10 py-8 text-[#F4FFD9]">
      {/* LOGO – LEWO */}
      <div className="absolute left-10 top-8 text-xs tracking-[0.35em] font-semibold">
        ECOMATI
      </div>

      {/* NAWIGACJA – ŚRODEK */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 flex gap-14 text-base tracking-widest">
        <a href="/o-nas" className="opacity-85 hover:opacity-100 transition">
          HOME
        </a>
        <a href="/sklep" className="opacity-85 hover:opacity-100 transition">
          SKLEP
        </a>
        <a href="/sklep" className="opacity-85 hover:opacity-100 transition">
          POZNAJ NAS
        </a>
        <a href="/kontakt" className="opacity-85 hover:opacity-100 transition">
          KONTAKT
        </a>
      </div>

      {/* PRAWA – CZAS + KOSZYK */}
      <div className="absolute right-10 top-8 flex items-center gap-6 text-xs tracking-widest">
        <span className="opacity-80">{time}</span>

        {/* KOSZYK */}
        <a
          href="/koszyk"
          className="relative text-lg opacity-85 hover:opacity-100 transition"
          aria-label="Koszyk"
        >
          🛒
          {/* licznik – na razie statyczny */}
          <span className="absolute -top-2 -right-3 text-[10px] bg-[#FFD966] text-black rounded-full px-1.5">
            0
          </span>
        </a>
      </div>
    </nav>
  );
}
