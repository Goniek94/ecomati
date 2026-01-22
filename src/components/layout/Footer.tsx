"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2A14] text-[#F6F5EE] pt-20 pb-10 border-t border-[#F6F5EE]/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* --- GÓRNA CZĘŚĆ (GRID) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* KOLUMNA 1: MARKA */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="text-xl font-bold tracking-[0.2em] mb-8 block"
            >
              ECOMATI
            </Link>
            <p className="text-[#F6F5EE]/60 text-sm leading-relaxed mb-8 max-w-xs">
              Naturalne oleje tłoczone na zimno. Dbamy o to, aby każda kropla
              była esencją zdrowia i smaku. Bez kompromisów.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* KOLUMNA 2: SKLEP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD966] mb-8">
              Sklep
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-[#F6F5EE]/80">
              <FooterLink href="/sklep">Wszystkie produkty</FooterLink>
              <FooterLink href="/sklep?cat=oleje">Oleje Tłoczone</FooterLink>
              <FooterLink href="/sklep?cat=ziarna">Ziarna i Pestki</FooterLink>
              <FooterLink href="/sklep?cat=zestawy">
                Zestawy Prezentowe
              </FooterLink>
              <FooterLink href="/sklep?cat=nowosci">
                Nowości & Bestsellery
              </FooterLink>
            </ul>
          </div>

          {/* KOLUMNA 3: POMOC */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD966] mb-8">
              Obsługa Klienta
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-[#F6F5EE]/80">
              <FooterLink href="/kontakt">Kontakt</FooterLink>
              <FooterLink href="/dostawa">Dostawa i Płatności</FooterLink>
              <FooterLink href="/zwroty">Zwroty i Reklamacje</FooterLink>
              <FooterLink href="/regulamin">Regulamin Sklepu</FooterLink>
              <FooterLink href="/prywatnosc">Polityka Prywatności</FooterLink>
            </ul>
          </div>

          {/* KOLUMNA 4: NEWSLETTER */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD966] mb-8">
              Newsletter
            </h4>
            <p className="text-[#F6F5EE]/60 text-sm mb-6">
              Zapisz się, aby otrzymywać informacje o nowościach i kodach
              rabatowych.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Twój email"
                className="bg-[#F6F5EE]/5 border border-[#F6F5EE]/10 rounded px-4 py-3 text-sm text-[#F6F5EE] placeholder:text-[#F6F5EE]/20 focus:outline-none focus:border-[#FFD966] transition-colors"
              />
              <button className="bg-[#F6F5EE] text-[#1F2A14] text-xs font-bold uppercase tracking-widest py-3 hover:bg-[#FFD966] transition-colors rounded">
                Zapisz się
              </button>
            </form>
          </div>
        </div>

        {/* --- DOLNA CZĘŚĆ (COPYRIGHT) --- */}
        <div className="pt-8 border-t border-[#F6F5EE]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#F6F5EE]/40">
          <p>&copy; {currentYear} Ecomati. Wszystkie prawa zastrzeżone.</p>

          <div className="flex gap-8">
            <span className="hover:text-[#F6F5EE] cursor-pointer transition-colors">
              Cookies
            </span>
            <span className="hover:text-[#F6F5EE] cursor-pointer transition-colors">
              Mapa strony
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Pomocnicze komponenty dla czystości kodu
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-[#FFD966] transition-colors flex items-center gap-2 group"
      >
        {children}
        <ArrowUpRight
          size={12}
          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FFD966]"
        />
      </Link>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full border border-[#F6F5EE]/20 flex items-center justify-center text-[#F6F5EE] hover:border-[#FFD966] hover:text-[#FFD966] transition-all"
    >
      {icon}
    </a>
  );
}
