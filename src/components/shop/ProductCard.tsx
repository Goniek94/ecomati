type Props = {
  category: string;
  setCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
};

export default function ShopFilters({
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  const categories = [
    { id: "all", label: "Wszystkie" },
    { id: "oleje", label: "Oleje" },
    { id: "nasiona", label: "Nasiona" },
    { id: "orzechy", label: "Orzechy" },
    { id: "zestawy", label: "Zestawy" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-10 mb-20">
      {/* KATEGORIE */}
      <div className="flex gap-10">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`
              text-sm uppercase tracking-widest transition
              ${
                category === c.id
                  ? "text-[#3A4A22] border-b border-[#3A4A22]"
                  : "text-[#6B705C]"
              }
            `}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          bg-transparent
          border-b
          border-[#3A4A22]/30
          text-sm
          uppercase
          tracking-widest
          focus:outline-none
        "
      >
        <option value="default">Domyślne</option>
        <option value="price-asc">Cena ↑</option>
        <option value="price-desc">Cena ↓</option>
      </select>
    </div>
  );
}
