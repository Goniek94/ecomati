export interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  category: string;
  featured?: boolean;
  longDesc?: string;
  application?: string;
  ingredients?: string;
  details?: string;
  // --- NOWE POLE ---
  sizes?: string[];
}

const baseProducts: Product[] = [
  {
    id: 1,
    name: "Olej lniany BIO",
    desc: "250 ml · tłoczony",
    price: "29,90 zł",
    image: "/Img/Olejbio.png",
    category: "oleje",
    featured: true,
    longDesc:
      "Nasz olej lniany to esencja zdrowia zamknięta w ciemnym szkle. Tłoczony metodą 'na zimno'.",
    application: "Spożywać na zimno. Doskonały do sałatek.",
    ingredients: "100% olej z nasion lnu brązowego.",
    details: "Butelka: Ciemne szkło UV • Kraj: Polska",
    // Dodajemy warianty
    sizes: ["250 ml", "500 ml", "1000 ml"],
  },
  {
    id: 2,
    name: "Pestki dyni",
    desc: "200 g · naturalne",
    price: "19,90 zł",
    image: "/Img/Dynia.png",
    category: "ziarna",
    sizes: ["200 g", "500 g", "1 kg"],
  },
  {
    id: 3,
    name: "Migdały",
    desc: "200 g · niesolone",
    price: "24,90 zł",
    image: "/Img/Migdały.png",
    category: "orzechy",
    sizes: ["200 g", "500 g", "1 kg"],
  },
  {
    id: 4,
    name: "Olej Kokosowy",
    desc: "500 ml · nierafinowany",
    price: "39,90 zł",
    image: "/Img/Olejkokosowy.png",
    category: "oleje",
    featured: true,
    sizes: ["300 ml", "500 ml", "900 ml"],
  },
];

export const products: Product[] = [
  ...baseProducts,
  ...baseProducts,
  ...baseProducts,
].map((product, index) => ({
  ...product,
  id: index + 1,
}));
