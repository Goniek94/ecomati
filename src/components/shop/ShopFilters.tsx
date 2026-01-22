type Props = {
  category: string;
  setCategory: (value: string) => void;
};

export default function ShopFilters({ category, setCategory }: Props) {
  const categories = [
    { id: "all", label: "Wszystkie" },
    { id: "oleje", label: "Oleje" },
    { id: "nasiona", label: "Nasiona" },
    { id: "orzechy", label: "Orzechy" },
    { id: "zestawy", label: "Zestawy" },
  ];

  return (
    <div className="flex gap-8 mb-16 text-sm uppercase tracking-widest">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => setCategory(c.id)}
          className={`pb-2 border-b transition ${
            category === c.id
              ? "border-[#1F2A14] text-[#1F2A14]"
              : "border-transparent text-[#6B705C] hover:text-[#1F2A14]"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
