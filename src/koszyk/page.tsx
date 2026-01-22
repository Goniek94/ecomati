"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, cartCount, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Koszyk+Dane, 2: Sukces

  // Koszt dostawy (darmowa powyżej 200zł)
  const deliveryCost = totalPrice > 200 ? 0 : 15;
  const finalPrice = totalPrice + deliveryCost;

  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    telefon: "",
    ulica: "",
    kod: "",
    miasto: "",
    metodaPlatnosci: "blik",
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Zamówienie:", { cart, formData, finalPrice });
    clearCart();
    setStep(2); // Przejdź do ekranu sukcesu
  };

  // --- EKRAN SUKCESU ---
  if (step === 2) {
    return (
      <main className="min-h-screen bg-[#F6F5EE] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-[#1F2A14]/5 max-w-lg"
        >
          <div className="w-20 h-20 bg-[#1F2A14] rounded-full flex items-center justify-center mx-auto mb-8 text-[#FFD966]">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif text-[#1F2A14] mb-4">
            Dziękujemy!
          </h1>
          <p className="text-[#6B705C] mb-8">
            Twoje zamówienie zostało przyjęte do realizacji. <br />
            Szczegóły wysłaliśmy na email.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#1F2A14] text-[#F6F5EE] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#3A4A22] transition-colors"
          >
            Wróć na stronę główną
          </Link>
        </motion.div>
      </main>
    );
  }

  // --- EKRAN KOSZYKA I FORMULARZA ---
  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      <HeroNav variant="dark" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">
          Twój Koszyk{" "}
          <span className="text-[#6B705C] text-2xl align-top">
            ({cartCount})
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border border-[#1F2A14]/10 rounded-3xl bg-white">
            <p className="text-xl mb-6">Twój koszyk jest pusty.</p>
            <Link
              href="/sklep"
              className="inline-block border-b border-[#1F2A14] pb-1 uppercase text-xs font-bold tracking-widest hover:text-[#3A4A22] transition-colors"
            >
              Wróć do sklepu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            {/* LEWA STRONA: PRODUKTY */}
            <div className="lg:w-7/12">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#1F2A14]/5">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-6 py-6 border-b border-[#F6F5EE] last:border-0"
                    >
                      <div className="w-20 h-24 bg-[#F6F5EE] rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="font-serif text-lg text-[#1F2A14]">
                          {item.name}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-[#6B705C] mt-1">
                          Wariant: {item.selectedSize}
                        </p>
                        <p className="text-xs mt-1 text-[#1F2A14]/50">
                          Ilość: {item.quantity}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between items-end text-right">
                        <span className="font-bold text-lg">{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-[#1F2A14]/30 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* PRAWA STRONA: FORMULARZ */}
            <div className="lg:w-5/12">
              <div className="bg-[#1F2A14] text-[#F6F5EE] p-8 md:p-10 rounded-[2rem] sticky top-32">
                {/* PODSUMOWANIE */}
                <h3 className="text-2xl font-serif mb-6">Podsumowanie</h3>
                <div className="flex justify-between mb-4 text-sm opacity-80">
                  <span>Wartość produktów</span>
                  <span>{totalPrice.toFixed(2).replace(".", ",")} zł</span>
                </div>
                <div className="flex justify-between mb-8 text-sm opacity-80">
                  <span>Dostawa</span>
                  <span>
                    {deliveryCost === 0 ? "Gratis" : `${deliveryCost},00 zł`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-serif border-t border-[#F6F5EE]/20 pt-6 mb-10">
                  <span>Do zapłaty</span>
                  <span>{finalPrice.toFixed(2).replace(".", ",")} zł</span>
                </div>

                {/* FORMULARZ DOSTAWY */}
                <form onSubmit={handleOrder} className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD966] mb-2">
                    Dane do wysyłki
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Imię"
                      value={formData.imie}
                      onChange={(e: any) =>
                        setFormData({ ...formData, imie: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Nazwisko"
                      value={formData.nazwisko}
                      onChange={(e: any) =>
                        setFormData({ ...formData, nazwisko: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e: any) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Telefon"
                    type="tel"
                    value={formData.telefon}
                    onChange={(e: any) =>
                      setFormData({ ...formData, telefon: e.target.value })
                    }
                  />

                  {/* ADRES DOSTAWY */}
                  <div className="mt-2">
                    <Input
                      placeholder="Ulica i numer domu"
                      value={formData.ulica}
                      onChange={(e: any) =>
                        setFormData({ ...formData, ulica: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <Input
                      placeholder="Kod (00-000)"
                      value={formData.kod}
                      onChange={(e: any) =>
                        setFormData({ ...formData, kod: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Miejscowość"
                      value={formData.miasto}
                      onChange={(e: any) =>
                        setFormData({ ...formData, miasto: e.target.value })
                      }
                    />
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD966] mt-6 mb-2">
                    Płatność
                  </h4>
                  <div className="flex gap-4 mb-6">
                    <PaymentMethod
                      active={formData.metodaPlatnosci === "blik"}
                      onClick={() =>
                        setFormData({ ...formData, metodaPlatnosci: "blik" })
                      }
                      label="BLIK"
                    />
                    <PaymentMethod
                      active={formData.metodaPlatnosci === "przelew"}
                      onClick={() =>
                        setFormData({ ...formData, metodaPlatnosci: "przelew" })
                      }
                      label="Przelew"
                    />
                  </div>

                  <button className="w-full bg-[#F6F5EE] text-[#1F2A14] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#FFD966] transition-colors flex items-center justify-center gap-3 mt-4">
                    Zamawiam i płacę
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

// Komponenty pomocnicze
function Input({ ...props }: any) {
  return (
    <input
      className="w-full bg-[#F6F5EE]/10 border border-[#F6F5EE]/10 rounded-lg px-4 py-3 text-sm text-[#F6F5EE] placeholder:text-[#F6F5EE]/30 focus:outline-none focus:border-[#FFD966] transition-colors"
      required
      {...props}
    />
  );
}

function PaymentMethod({ active, onClick, label }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 p-4 rounded-lg border cursor-pointer text-center text-xs font-bold uppercase tracking-widest transition-all
            ${active ? "bg-[#FFD966] text-[#1F2A14] border-[#FFD966]" : "bg-transparent text-[#F6F5EE]/50 border-[#F6F5EE]/10 hover:border-[#F6F5EE]/30"}`}
    >
      {label}
    </div>
  );
}
