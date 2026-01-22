import Hero from "@/components/hero/Hero";
import NaturalSelection from "@/components/sections/NaturalSelection"; // <--- Tu jest nasz wstęp
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      {/* 1. HERO (Wideo na pełen ekran) */}
      <Hero />

      {/* 2. NARRACJA ("Naturalna Selekcja" + Cytaty) */}
      <NaturalSelection />

      {/* 3. PRODUKTY (Grid 3x4 wybranych produktów) */}
      <FeaturedProducts />

      {/* 4. HISTORIA (Paralaksa, o nas) */}
      <AboutSection />

      {/* 5. KONTAKT */}
      <ContactSection />

      {/* 6. STOPKA */}
      <Footer />
    </main>
  );
}
