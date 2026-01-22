"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeroNavProps {
  variant?: "light" | "dark";
}

export default function HeroNav({ variant = "light" }: HeroNavProps) {
  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Sprawdzamy, czy jesteśmy na stronie głównej
  const isHomePage = pathname === "/";

  useEffect(() => {
    // JEŚLI NIE JESTEŚMY NA HOME -> Zawsze tryb "scrolled" (ciemne tło)
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    // JEŚLI JESTEŚMY NA HOME -> Liczymy precyzyjnie moment zmiany
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      // Zmieniamy tło, gdy nawigacja jest blisko końca sekcji Hero (np. 80px przed końcem)
      // Dzięki temu zmiana następuje zanim białe tło wjedzie pod białe napisy.
      const triggerPoint = heroHeight - 80;

      setIsScrolled(window.scrollY > triggerPoint);
    };

    // Inicjalizacja
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Zegar
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

  // --- LOGIKA STYLÓW ---

  // Czy nawigacja ma mieć ciemne tło?
  // Tak, jeśli przescrollowaliśmy LUB jeśli nie jesteśmy na stronie głównej.
  const hasDarkBackground = isScrolled || !isHomePage;

  // Kolor tekstu:
  // 1. Jeśli mamy ciemne tło nawigacji -> Tekst musi być JASNY (#F4FFD9).
  // 2. Jeśli tło jest przezroczyste (tylko na górze Home) -> Tekst zależy od wariantu (zwykle jasny na video).

  // W Twoim przypadku:
  // Na Sklepie hasDarkBackground = true -> więc tekst będzie JASNY.
  // Na Home (góra) hasDarkBackground = false -> tekst zależy od variant (domyślnie light).
  // Na Home (dół) hasDarkBackground = true -> tekst będzie JASNY.

  const textColor = hasDarkBackground
    ? "text-[#F4FFD9]" // Jasny tekst na ciemnym pasku
    : variant === "dark"
      ? "text-[#1F2A14]"
      : "text-[#F4FFD9]"; // Tekst na przezroczystym tle

  const hoverColor = hasDarkBackground
    ? "hover:text-[#FFD966]"
    : variant === "dark"
      ? "hover:text-[#3A4A22]"
      : "hover:text-[#FFD966]";

  const activeColor = hasDarkBackground
    ? "text-[#FFD966]"
    : variant === "dark"
      ? "text-[#3A4A22]"
      : "text-[#FFD966]";

  const cartBadge = hasDarkBackground
    ? "bg-[#FFD966] text-black"
    : variant === "dark"
      ? "bg-[#1F2A14] text-[#F4FFD9]"
      : "bg-[#FFD966] text-black";

  // Klasy kontenera:
  // Jeśli ma tło: py-6 (mniejszy), ciemny, blur, cień.
  // Jeśli bez tła: py-8 (większy), przezroczysty.
  const containerClasses = hasDarkBackground
    ? "py-6 bg-[#1F2A14]/95 backdrop-blur-md shadow-lg"
    : "py-8 bg-transparent";

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${containerClasses}
        ${textColor}
      `}
    >
      <div className="relative w-full h-full min-h-[30px]">
        {/* LOGO */}
        <Link
          href="/"
          className={`
            absolute left-6 md:left-10 top-1/2 -translate-y-1/2
            text-xs tracking-[0.35em] font-semibold
            ${hoverColor} transition-colors
          `}
        >
          ECOMATI
        </Link>

        {/* MENU ŚRODKOWE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-10 lg:gap-14 text-sm tracking-widest">
          <Link
            href="/"
            className={`transition-colors ${pathname === "/" ? activeColor : ""} ${hoverColor}`}
          >
            HOME
          </Link>

          <Link
            href="/sklep"
            className={`transition-colors font-semibold ${pathname.startsWith("/sklep") ? activeColor : ""} ${hoverColor}`}
          >
            SKLEP
          </Link>

          <Link href="/#about" className={`transition-colors ${hoverColor}`}>
            POZNAJ NAS
          </Link>

          <Link href="/#contact" className={`transition-colors ${hoverColor}`}>
            KONTAKT
          </Link>
        </div>

        {/* PRAWA STRONA */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 text-xs tracking-widest">
          <span className="hidden sm:block opacity-80 font-mono">{time}</span>

          <Link
            href="/koszyk"
            className="relative text-lg hover:opacity-100 transition-opacity"
          >
            🛒
            <span
              className={`
                absolute -top-2 -right-3
                text-[10px] rounded-full px-1.5 font-bold
                ${cartBadge}
                transition-colors duration-300
              `}
            >
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
