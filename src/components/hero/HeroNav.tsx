"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface HeroNavProps {
  variant?: "light" | "dark";
}

export default function HeroNav({ variant = "light" }: HeroNavProps) {
  const { cartCount } = useCart();

  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-500 ease-in-out
          ${containerClasses}
          ${textColor}
        `}
      >
        <div className="relative w-full h-full min-h-[30px]">
          {/* LOGO - PRZESUNIĘTE MAKSYMALNIE W LEWO */}
          <Link
            href="/"
            className="absolute -left-4 md:left-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/Img/logo.png"
              alt="Ecomati Logo"
              width={420}
              height={120}
              priority
              className="w-auto h-[80px] md:h-[100px] object-contain mix-blend-screen"
            />
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

            <Link
              href="/#contact"
              className={`transition-colors ${hoverColor}`}
            >
              KONTAKT
            </Link>
          </div>

          {/* PRAWA STRONA - HAMBURGER + KOSZYK */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-6 text-xs tracking-widest z-[110]">
            <span
              className="hidden sm:block opacity-80 font-mono"
              suppressHydrationWarning
            >
              {time}
            </span>

            {/* HAMBURGER MENU */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${hoverColor} transition-colors relative z-[110]`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <Link
              href="/koszyk"
              className="relative text-lg md:text-2xl hover:opacity-100 transition-opacity"
            >
              🛒
              <span
                className={`
                  absolute -top-2 -right-3
                  text-[10px] md:text-xs rounded-full px-1.5 md:px-2 font-bold min-w-[18px] md:min-w-[22px] text-center
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

      {/* MOBILE MENU PORTAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed inset-0 bg-[#1F2A14] z-[9999] overflow-y-auto"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#F4FFD9]/20">
                      <span className="text-[#F4FFD9] text-sm tracking-[0.35em] font-semibold">
                        MENU
                      </span>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-[#F4FFD9] hover:text-[#FFD966] transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-8">
                      <div className="space-y-3">
                        <Link
                          href="/"
                          className={`block py-5 px-6 text-base font-light tracking-[0.2em] uppercase rounded-xl transition-all ${
                            pathname === "/"
                              ? "bg-[#FFD966] text-[#1F2A14] font-semibold"
                              : "text-[#F4FFD9] hover:bg-[#F4FFD9]/10 hover:text-[#FFD966] hover:pl-8"
                          }`}
                        >
                          Home
                        </Link>

                        <Link
                          href="/sklep"
                          className={`block py-5 px-6 text-base font-light tracking-[0.2em] uppercase rounded-xl transition-all ${
                            pathname.startsWith("/sklep")
                              ? "bg-[#FFD966] text-[#1F2A14] font-semibold"
                              : "text-[#F4FFD9] hover:bg-[#F4FFD9]/10 hover:text-[#FFD966] hover:pl-8"
                          }`}
                        >
                          Sklep
                        </Link>

                        <Link
                          href="/#about"
                          className="block py-5 px-6 text-base font-light tracking-[0.2em] uppercase text-[#F4FFD9] hover:bg-[#F4FFD9]/10 hover:text-[#FFD966] hover:pl-8 rounded-xl transition-all"
                        >
                          Poznaj Nas
                        </Link>

                        <Link
                          href="/#contact"
                          className="block py-5 px-6 text-base font-light tracking-[0.2em] uppercase text-[#F4FFD9] hover:bg-[#F4FFD9]/10 hover:text-[#FFD966] hover:pl-8 rounded-xl transition-all"
                        >
                          Kontakt
                        </Link>
                      </div>
                    </nav>

                    {/* Footer w menu mobilnym */}
                    <div className="p-8 border-t border-[#F4FFD9]/20">
                      <div className="text-center">
                        <div className="mb-4 flex justify-center">
                          <Image
                            src="/Img/logo.png"
                            alt="Ecomati"
                            width={225}
                            height={68}
                            className="w-auto h-[70px] opacity-80 mix-blend-screen"
                          />
                        </div>
                        <p className="text-[#F4FFD9]/50 text-xs font-light italic">
                          Naturalna selekcja
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
