import { Product } from "./ProductCard";

export const products: Product[] = [
  {
    id: 1,
    name: "Olej lniany BIO",
    desc: "250 ml · tłoczony",
    price: "29,90 zł",
    image: "/Img/Olejbio.png",
    category: "oleje",
    featured: true,
  },
  {
    id: 2,
    name: "Pestki dyni",
    desc: "200 g · naturalne",
    price: "19,90 zł",
    image: "/Img/Dynia.png",
    category: "ziarna",
  },
  {
    id: 3,
    name: "Migdały",
    desc: "200 g · niesolone",
    price: "24,90 zł",
    image: "/Img/Migdały.png",
    category: "orzechy",
  },
  {
    id: 4,
    name: "Olej Kokosowy",
    desc: "500 ml · nierafinowany",
    price: "39,90 zł",
    image: "/Img/Olejkokosowy.png",
    category: "oleje",
    featured: true,
  },
  {
    id: 5,
    name: "Zestaw Energia",
    desc: "olej + nasiona",
    price: "59,90 zł",
    image: "/Img/Olejbio.png", // Placeholder
    category: "zestawy",
    featured: true,
  },
  {
    id: 6,
    name: "Siemię Lniane",
    desc: "500 g · złociste",
    price: "12,90 zł",
    image: "/Img/Migdały.png", // Placeholder
    category: "ziarna",
  },
];
