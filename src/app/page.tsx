import Hero from "@/components/hero/Hero";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
