"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  FileText,
} from "lucide-react"; // Dodałem ArrowLeft
import Link from "next/link";
import Image from "next/image";
import HeroNav from "@/components/hero/HeroNav";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, cartCount, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Checkout, 2: Sukces

  // Opcje dostawy
  const [deliveryMethod, setDeliveryMethod] = useState<"dpd" | "inpost">(
    "inpost",
  );
  const deliveryCost =
    totalPrice > 200 ? 0 : deliveryMethod === "dpd" ? 15 : 12;
  const finalPrice = totalPrice + deliveryCost;

  // Faktura
  const [wantInvoice, setWantInvoice] = useState(false);

  // Formularz
  const [formData, setFormData] = useState({
    email: "",
    imie: "",
    nazwisko: "",
    telefon: "",
    ulica: "",
    kod: "",
    miasto: "",
    nip: "",
    firma: "",
    metodaPlatnosci: "blik",
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Zamówienie:", { cart, formData, deliveryMethod, finalPrice });
    clearCart();
    setStep(2);
  };

  // --- EKRAN SUKCESU ---
  if (step === 2) {
    return (
      <main className="min-h-screen bg-[#F6F5EE] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-[#1F2A14]/5 max-w-lg w-full">
          <div className="w-20 h-20 bg-[#1F2A14] rounded-full flex items-center justify-center mx-auto mb-8 text-[#FFD966]">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif text-[#1F2A14] mb-4">
            Dziękujemy!
          </h1>
          <p className="text-[#6B705C] mb-8">
            Twoje zamówienie zostało przyjęte. <br />
            Szczegóły wysłaliśmy na email.
          </p>
          <Link
            href="/"
            className="block w-full py-4 bg-[#1F2A14] text-[#F6F5EE] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#3A4A22] transition-colors cursor-pointer"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </main>
    );
  }

  // --- CHECKOUT ---
  return (
    <main className="min-h-screen bg-[#F6F5EE] text-[#1F2A14]">
      <HeroNav variant="dark" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-32 pb-20">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">
          Koszyk i Dostawa
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#1F2A14]/5">
            <p className="text-xl mb-6">Twój koszyk jest pusty.</p>
            <Link
              href="/sklep"
              className="text-sm font-bold uppercase tracking-widest border-b border-[#1F2A14] pb-1 hover:text-[#3A4A22] hover:border-[#3A4A22] transition-colors cursor-pointer"
            >
              Wróć do zakupów
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* --- LEWA KOLUMNA (FORMULARZE) --- */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. DANE ODBIORCY */}
              <Section title="1. Dane odbiorcy">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Input
                    placeholder="Email"
                    type="email"
                    className="md:col-span-2"
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
                </div>

                <div className="mt-4 pt-4 border-t border-[#1F2A14]/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Ulica i numer"
                      className="md:col-span-3"
                      value={formData.ulica}
                      onChange={(e: any) =>
                        setFormData({ ...formData, ulica: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Kod pocztowy"
                      value={formData.kod}
                      onChange={(e: any) =>
                        setFormData({ ...formData, kod: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Miejscowość"
                      className="md:col-span-2"
                      value={formData.miasto}
                      onChange={(e: any) =>
                        setFormData({ ...formData, miasto: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* CHECKBOX FAKTURA */}
                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[#1F2A14] cursor-pointer"
                      checked={wantInvoice}
                      onChange={(e) => setWantInvoice(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-[#1F2A14] group-hover:text-[#3A4A22]">
                      Chcę otrzymać fakturę VAT
                    </span>
                    <FileText size={16} className="text-[#6B705C]" />
                  </label>

                  {wantInvoice && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                      <Input
                        placeholder="NIP"
                        value={formData.nip}
                        onChange={(e: any) =>
                          setFormData({ ...formData, nip: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Nazwa firmy"
                        value={formData.firma}
                        onChange={(e: any) =>
                          setFormData({ ...formData, firma: e.target.value })
                        }
                      />
                    </div>
                  )}
                </div>
              </Section>

              {/* 2. SPOSÓB DOSTAWY */}
              <Section title="2. Sposób dostawy">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DeliveryOption
                    icon={<Package size={24} />}
                    title="Paczkomat InPost"
                    price="12,00 zł"
                    time="1-2 dni"
                    selected={deliveryMethod === "inpost"}
                    onClick={() => setDeliveryMethod("inpost")}
                  />
                  <DeliveryOption
                    icon={<Truck size={24} />}
                    title="Kurier DPD"
                    price="15,00 zł"
                    time="1 dzień"
                    selected={deliveryMethod === "dpd"}
                    onClick={() => setDeliveryMethod("dpd")}
                  />
                </div>
              </Section>

              {/* 3. PŁATNOŚĆ */}
              <Section title="3. Metoda płatności">
                <div className="flex flex-wrap gap-4">
                  <PaymentOption
                    label="BLIK"
                    active={formData.metodaPlatnosci === "blik"}
                    onClick={() =>
                      setFormData({ ...formData, metodaPlatnosci: "blik" })
                    }
                  />
                  <PaymentOption
                    label="Szybki Przelew"
                    active={formData.metodaPlatnosci === "przelew"}
                    onClick={() =>
                      setFormData({ ...formData, metodaPlatnosci: "przelew" })
                    }
                  />
                  <PaymentOption
                    label="Karta Płatnicza"
                    active={formData.metodaPlatnosci === "karta"}
                    onClick={() =>
                      setFormData({ ...formData, metodaPlatnosci: "karta" })
                    }
                  />
                </div>
              </Section>
            </div>

            {/* --- PRAWA KOLUMNA (PODSUMOWANIE - STICKY) --- */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-[#1F2A14]/5 border border-[#1F2A14]/5">
                <h3 className="text-xl font-serif mb-6 border-b border-[#1F2A14]/10 pb-4">
                  Twój Koszyk ({cartCount})
                </h3>

                {/* LISTA PRODUKTÓW */}
                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 mb-6 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 items-start">
                      <div className="w-16 h-20 bg-[#F6F5EE] rounded-md relative flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-[#1F2A14] line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-wider text-[#6B705C] mb-1">
                          {item.selectedSize}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-[#1F2A14]/60">
                            {item.quantity} szt.
                          </span>
                          <span className="text-sm font-bold">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[#1F2A14]/20 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* KOSZTY */}
                <div className="space-y-3 py-4 border-t border-[#1F2A14]/10 text-sm">
                  <div className="flex justify-between text-[#1F2A14]/70">
                    <span>Wartość produktów</span>
                    <span>{totalPrice.toFixed(2).replace(".", ",")} zł</span>
                  </div>
                  <div className="flex justify-between text-[#1F2A14]/70">
                    <span>
                      Dostawa (
                      {deliveryMethod === "inpost" ? "Paczkomat" : "Kurier"})
                    </span>
                    <span
                      className={
                        deliveryCost === 0 ? "text-[#3A4A22] font-bold" : ""
                      }
                    >
                      {deliveryCost === 0 ? "GRATIS" : `${deliveryCost},00 zł`}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between items-center py-6 border-t border-[#1F2A14]/10 mb-6">
                  <span className="text-lg font-serif">Do zapłaty</span>
                  <span className="text-2xl font-bold text-[#1F2A14]">
                    {finalPrice.toFixed(2).replace(".", ",")} zł
                  </span>
                </div>

                {/* GŁÓWNY PRZYCISK */}
                <button className="w-full bg-[#1F2A14] text-[#F6F5EE] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#3A4A22] transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
                  Zamawiam i płacę
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* NOWY PRZYCISK: WRÓĆ DO SKLEPU */}
                <Link
                  href="/sklep"
                  className="mt-4 w-full py-4 border border-[#1F2A14]/10 text-[#1F2A14] rounded-xl font-bold uppercase tracking-widest hover:bg-[#F6F5EE] hover:border-[#1F2A14] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Wróć do sklepu
                </Link>

                <p className="text-center text-[10px] text-[#1F2A14]/40 mt-4">
                  Klikając przycisk zamówienia, akceptujesz regulamin sklepu.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}

// --- KOMPONENTY UI ---

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#1F2A14]/5">
      <h2 className="text-lg font-bold text-[#1F2A14] mb-6 uppercase tracking-wider flex items-center gap-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ className, ...props }: any) {
  return (
    <input
      className={`w-full bg-[#F6F5EE] border border-transparent rounded-lg px-4 py-3 text-sm text-[#1F2A14] placeholder:text-[#1F2A14]/30 focus:outline-none focus:bg-white focus:border-[#1F2A14]/20 transition-all cursor-text ${className}`}
      required
      {...props}
    />
  );
}

function DeliveryOption({ icon, title, price, time, selected, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4 relative overflow-hidden
            ${selected ? "border-[#1F2A14] bg-[#F6F5EE]/50" : "border-[#F6F5EE] hover:border-[#1F2A14]/30 bg-white"}`}
    >
      <div
        className={`p-3 rounded-full ${selected ? "bg-[#1F2A14] text-[#F6F5EE]" : "bg-[#F6F5EE] text-[#1F2A14]"}`}
      >
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="font-bold text-sm text-[#1F2A14]">{title}</h4>
        <p className="text-xs text-[#6B705C]">{time}</p>
      </div>
      <div className="text-sm font-bold text-[#1F2A14]">{price}</div>

      {selected && (
        <div className="absolute top-2 right-2 text-[#3A4A22]">
          <CheckCircle size={16} />
        </div>
      )}
    </div>
  );
}

function PaymentOption({ label, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-lg border-2 text-xs font-bold uppercase tracking-wider transition-all
            ${active ? "border-[#1F2A14] bg-[#1F2A14] text-[#F6F5EE]" : "border-[#F6F5EE] text-[#1F2A14] hover:border-[#1F2A14]/30"}`}
    >
      {label}
    </div>
  );
}
