export default function Footer() {
  return (
    <footer className="bg-[#1F2A14] text-[#D6DCC2]">
      {/* GÓRNA LINIA */}
      <div className="h-px bg-[#FFD966]/20" />

      <div className="max-w-7xl mx-auto px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-serif text-[#F4FFD9] mb-6">ECOMATI</h3>

            <p className="text-sm leading-relaxed max-w-xs">
              Czysta energia natury. Oleje, nasiona i produkty roślinne
              wybierane z myślą o jakości, prostocie i codziennym zdrowiu.
            </p>
          </div>

          {/* NAWIGACJA */}
          <div>
            <span className="block text-xs uppercase tracking-[0.35em] text-[#FFD966] mb-6">
              Nawigacja
            </span>

            <ul className="space-y-4 text-sm">
              <li>
                <a href="/" className="hover:text-[#F4FFD9] transition">
                  Strona główna
                </a>
              </li>
              <li>
                <a href="/sklep" className="hover:text-[#F4FFD9] transition">
                  Sklep
                </a>
              </li>
              <li>
                <a href="#o-nas" className="hover:text-[#F4FFD9] transition">
                  O nas
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-[#F4FFD9] transition">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* INFO */}
          <div>
            <span className="block text-xs uppercase tracking-[0.35em] text-[#FFD966] mb-6">
              Kontakt
            </span>

            <div className="space-y-4 text-sm">
              <p>kontakt@ecomati.pl</p>
              <p>Polska</p>
            </div>
          </div>
        </div>

        {/* DOLNA CZĘŚĆ */}
        <div className="mt-20 pt-10 border-t border-[#FFD966]/20 flex flex-col md:flex-row items-center justify-between text-xs gap-6">
          <span>
            © {new Date().getFullYear()} ECOMATI. Wszelkie prawa zastrzeżone.
          </span>

          <div className="flex gap-8">
            <a href="#" className="hover:text-[#F4FFD9] transition">
              Regulamin
            </a>
            <a href="#" className="hover:text-[#F4FFD9] transition">
              Polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
