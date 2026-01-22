export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: "oleje" | "nasiona" | "orzechy" | "zestawy";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Olej lniany BIO",
    desc: "250 ml · tłoczony na zimno",
    price: 29.9,
    image: "/products/olej-lniany.jpg",
    category: "oleje",
  },
  {
    id: 2,
    name: "Pestki dyni BIO",
    desc: "200 g · naturalne",
    price: 19.9,
    image: "/products/pestki-dyni.jpg",
    category: "nasiona",
  },
  {
    id: 3,
    name: "Migdały naturalne",
    desc: "200 g · niesolone",
    price: 24.9,
    image: "/products/migdaly.jpg",
    category: "orzechy",
  },
  {
    id: 4,
    name: "Zestaw Dobra Energia",
    desc: "olej + nasiona",
    price: 59.9,
    image: "/products/zestaw.jpg",
    category: "zestawy",
  },
];
