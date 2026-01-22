export default function HeroOverlay() {
  return (
    <>
      {/* ogólna aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3A4A22]/25 via-[#4F6630]/35 to-[#1F2A14]/55" />

      {/* mocniejsze przyciemnienie DOŁU */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
    </>
  );
}
