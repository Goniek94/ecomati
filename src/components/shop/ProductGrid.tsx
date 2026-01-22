import { Product } from "./Products";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  category: string;
  sort: string;
};

export default function ProductGrid({ products, category, sort }: Props) {
  let filtered = [...products];

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      {filtered.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
