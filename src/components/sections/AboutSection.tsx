export default function AboutSection() {
  return (
    <section
      className="
        relative
        bg-gradient-to-b
        from-[#1F2A14]
        via-[#243017]
        to-[#1F2A14]
        py-40
      "
    >
      <div className="max-w-7xl mx-auto px-8 text-center">
        {/* OGROMNE O NAS */}
        <h1
          className="
            text-[clamp(4.5rem,10vw,8.5rem)]
            font-serif
            uppercase
            tracking-[0.2em]
            text-[#F4FFD9]
            mb-20
          "
        >
          O NAS
        </h1>

        {/* CLAIM */}
        <h2
          className="
            text-[clamp(2.2rem,4vw,3.5rem)]
            font-serif
            uppercase
            tracking-widest
            text-[#FFD966]
            mb-16
          "
        >
          Czysta energia natury
        </h2>

        {/* TEKST */}
        <div className="space-y-10 text-[#D6DCC2] text-xl leading-relaxed max-w-4xl mx-auto">
          <p>
            ECOMATI powstało z potrzeby prostoty. Wierzymy, że to, co najlepsze
            dla organizmu, pochodzi bezpośrednio z natury i nie wymaga
            kompromisów ani sztucznych dodatków.
          </p>

          <p>
            Selekcjonujemy oleje, nasiona i produkty roślinne, kierując się
            jakością surowca, sposobem przetwarzania oraz transparentnością
            pochodzenia. Tłoczenie na zimno, krótki skład i świadome źródła to
            dla nas standard, nie marketing.
          </p>

          <p>
            Nie sprzedajemy trendów. Dostarczamy produkty, które mają sens — dla
            zdrowia, dla energii i dla codziennych wyborów.
          </p>
        </div>

        {/* SEPARATOR */}
        <div className="mt-24 flex justify-center">
          <div className="h-px w-40 bg-[#FFD966]/50" />
        </div>
      </div>
    </section>
  );
}
