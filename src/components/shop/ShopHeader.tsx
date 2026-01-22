export default function ShopHeader() {
  return (
    <header className="text-center">
      <span className="block text-xs uppercase tracking-[0.35em] text-[#6B705C] mb-6">
        Sklep
      </span>

      <h1 className="text-[clamp(3rem,6vw,5rem)] font-serif uppercase tracking-widest text-[#3A4A22] mb-10">
        Produkty
      </h1>

      <p className="text-[#6B705C] max-w-2xl mx-auto text-lg">
        Naturalne oleje, nasiona i zestawy stworzone z myślą o codziennej
        energii.
      </p>
    </header>
  );
}
