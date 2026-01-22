"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeroNavProps {
  variant?: "light" | "dark";
}

export default function HeroNav({ variant = "light" }: HeroNavProps) {
  const [time, setTime] = useState("");
  const pathname = usePathname();

  const isDark = variant === "dark";

  // KOLORY
  const textColor = isDark ? "text-[#1F2A14]" : "text-[#F4FFD9]";
  const hoverColor = isDark ? "hover:text-[#3A4A22]" : "hover:text-[#FFD966]";
  const activeColor = isDark ? "text-[#3A4A22]" : "text-[#FFD966]";

  const cartBadge = isDark
    ? "bg-[#1F2A14] text-[#F4FFD9]"
    : "bg-[#FFD966] text-black";

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
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        px-10 py-8
        ${textColor}
        transition-colors duration-300
      `}
    >
      {/* LOGO */}
      <Link
        href="/"
        className={`
          absolute left-10 top-8
          text-xs tracking-[0.35em] font-semibold
          ${hoverColor}
        `}
      >
        ECOMATI
      </Link>

      {/* MENU */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 flex gap-14 text-sm tracking-widest">
        <Link
          href="/"
          className={`
            transition
            ${pathname === "/" ? activeColor : ""}
            ${hoverColor}
          `}
        >
          HOME
        </Link>

        <Link
          href="/sklep"
          className={`
            transition font-semibold
            ${pathname.startsWith("/sklep") ? activeColor : ""}
            ${hoverColor}
          `}
        >
          SKLEP
        </Link>

        <Link href="/#about" className={`transition ${hoverColor}`}>
          POZNAJ NAS
        </Link>

        <Link href="/#contact" className={`transition ${hoverColor}`}>
          KONTAKT
        </Link>
      </div>

      {/* PRAWA STRONA */}
      <div className="absolute right-10 top-8 flex items-center gap-6 text-xs tracking-widest">
        <span className="opacity-80 font-mono">{time}</span>

        <Link
          href="/koszyk"
          className="relative text-lg hover:opacity-100 transition"
        >
          🛒
          <span
            className={`
              absolute -top-2 -right-3
              text-[10px] rounded-full px-1.5 font-bold
              ${cartBadge}
            `}
          >
            0
          </span>
        </Link>
      </div>
    </nav>
  );
}
