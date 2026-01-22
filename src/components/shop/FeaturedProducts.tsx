type Product = {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Olej lniany BIO",
    desc: "250 ml · tłoczony na zimno",
    price: "29,90 zł",
    image: "/img/Olejbio.png",
  },
  {
    id: 2,
    name: "Pestki dyni BIO",
    desc: "200 g · naturalne",
    price: "19,90 zł",
    image: "/img/Dynia.png",
  },
  {
    id: 3,
    name: "Migdały naturalne",
    desc: "200 g · niesolone",
    price: "24,90 zł",
    image: "/products/migdaly.jpg",
  },
  {
    id: 4,
    name: "Zestaw Dobra Energia",
    desc: "olej + nasiona",
    price: "59,90 zł",
    image: "/products/zestaw.jpg",
  },
  {
    id: 5,
    name: "Olej z czarnuszki",
    desc: "250 ml · tłoczony",
    price: "39,90 zł",
    image: "/products/olej-lniany.jpg",
  },
  {
    id: 6,
    name: "Siemię lniane",
    desc: "300 g · świeże",
    price: "9,90 zł",
    image: "/products/pestki-dyni.jpg",
  },
  {
    id: 7,
    name: "Orzechy włoskie",
    desc: "200 g · naturalne",
    price: "21,90 zł",
    image: "/products/migdaly.jpg",
  },
  {
    id: 8,
    name: "Zestaw Start",
    desc: "olej + nasiona",
    price: "49,90 zł",
    image: "/products/zestaw.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* 🌿 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Img/leaves-4337542_1280.jpg')",
        }}
      />

      {/* 🌑 PRZYCIEMNIENIE KOLORU (jak hero) */}
      <div className="absolute inset-0 bg-[#1F2A14]/65" />

      {/* 🕶️ CIEŃ / WINIETA */}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_80px_rgba(0,0,0,0.75)]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-10">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <span className="block text-xs tracking-[0.35em] uppercase text-[#FFD966] mb-3">
            Wybrane produkty
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-[#F4FFD9]">
            Naturalna selekcja
          </h2>
        </div>

        {/* GRID 2×4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {products.map((p) => (
            <div
              key={p.id}
              className="
                bg-[#F4FFD9]
                rounded-2xl
                p-5
                shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                hover:shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                transition
                flex
                flex-col
              "
            >
              {/* IMAGE */}
              <div className="aspect-[4/5] mb-4 overflow-hidden rounded-xl bg-[#E8EDC9]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* TEXT */}
              <h3 className="text-sm font-serif text-[#3A4A22] mb-1">
                {p.name}
              </h3>

              <p className="text-xs text-[#6B705C] mb-3">{p.desc}</p>

              <div className="mt-auto">
                <span className="block text-sm text-[#3A4A22] font-semibold mb-3">
                  {p.price}
                </span>

                {/* ACTIONS */}
                <div className="flex items-center justify-between">
                  <a
                    href="/sklep"
                    className="text-xs uppercase tracking-widest text-[#3A4A22] border-b border-[#3A4A22]/40 hover:border-[#3A4A22]"
                  >
                    Szczegóły
                  </a>

                  <button
                    aria-label="Dodaj do koszyka"
                    className="text-[#3A4A22] text-lg hover:scale-110 transition"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/sklep"
            className="
              inline-block
              px-10
              py-4
              border
              border-[#FFD966]
              text-[#FFD966]
              uppercase
              tracking-widest
              text-sm
              hover:bg-[#FFD966]
              hover:text-[#1F2A14]
              transition
            "
          >
            Przejdź do sklepu
          </a>
        </div>
      </div>
    </section>
  );
}
