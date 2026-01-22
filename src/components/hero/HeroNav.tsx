"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext"; // <--- IMPORT

interface HeroNavProps {
  variant?: "light" | "dark";
}

export default function HeroNav({ variant = "light" }: HeroNavProps) {
  const { cartCount } = useCart(); // <--- POBIERAMY LICZNIK

  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const triggerPoint = heroHeight - 80;
      setIsScrolled(window.scrollY > triggerPoint);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

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

  const hasDarkBackground = isScrolled || !isHomePage;

  const textColor = hasDarkBackground
    ? "text-[#F4FFD9]"
    : variant === "dark"
      ? "text-[#1F2A14]"
      : "text-[#F4FFD9]";

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

        {/* PRAWA STRONA - KOSZYK */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 text-xs tracking-widest">
          <span className="hidden sm:block opacity-80 font-mono">{time}</span>

          <Link
            href="/koszyk"
            className="relative text-lg hover:opacity-100 transition-opacity"
          >
            🛒
            {/* BADGE Z LICZNIKIEM */}
            <span
              className={`
                absolute -top-2 -right-3
                text-[10px] rounded-full px-1.5 font-bold min-w-[18px] text-center
                ${cartBadge}
                transition-colors duration-300
              `}
            >
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
