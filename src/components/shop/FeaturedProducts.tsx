import { useState } from "react";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  featured?: boolean;
};

// Komponent pojedynczej karty produktu
function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative overflow-hidden cursor-pointer group
        ${product.featured ? "col-span-2 row-span-2" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* KONTENER ZDJĘCIA */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#E8EDC9]">
        {/* ZDJĘCIE */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* DARK OVERLAY NA HOVER */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* INFORMACJE NA HOVER */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-3">
            <h3 className="text-2xl font-serif tracking-wide">
              {product.name}
            </h3>
            <p className="text-sm text-white/80 tracking-wider uppercase">
              {product.desc}
            </p>
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-semibold">{product.price}</span>
              <button className="px-6 py-2 bg-white text-black text-sm uppercase tracking-widest hover:bg-[#FFD966] transition">
                Dodaj
              </button>
            </div>
          </div>
        </motion.div>

        {/* BADGE (opcjonalnie dla featured) */}
        {product.featured && (
          <div className="absolute top-6 right-6 px-4 py-2 bg-[#FFD966] text-black text-xs uppercase tracking-widest">
            Bestseller
          </div>
        )}
      </div>

      {/* PODSTAWOWE INFO (widoczne zawsze) */}
      <motion.div
        className="pt-6 px-2"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-serif text-[#3A4A22] mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B705C]">{product.desc}</span>
          <span className="text-base font-semibold text-[#3A4A22]">
            {product.price}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// GŁÓWNY KOMPONENT SEKCJI
export default function FeaturedProductsLG() {
  const products: Product[] = [
    {
      id: 1,
      name: "Olej lniany BIO",
      desc: "250 ml · tłoczony na zimno",
      price: "29,90 zł",
      image: "/img/Olejbio.png",
      featured: true,
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
      featured: true,
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
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-[#F6F5EE]">
      <div className="max-w-[1800px] mx-auto px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="block text-xs tracking-[0.35em] uppercase text-[#6B705C] mb-4">
            Wybrane produkty
          </span>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-serif text-[#3A4A22] tracking-wide">
            Naturalna selekcja
          </h2>
        </motion.div>

        {/* ASYMETRYCZNY GRID - inspirowany Lady Gaga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <a
            href="/sklep"
            className="
              inline-block
              px-12
              py-5
              border-2
              border-[#3A4A22]
              text-[#3A4A22]
              uppercase
              tracking-[0.3em]
              text-sm
              hover:bg-[#3A4A22]
              hover:text-[#F4FFD9]
              transition-all
              duration-500
            "
          >
            Zobacz wszystkie produkty
          </a>
        </motion.div>
      </div>
    </section>
  );
}
