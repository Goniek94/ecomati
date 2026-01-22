"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#F6F5EE] py-20 md:py-32 overflow-hidden"
    >
      {/* Dekoracyjna linia oddzielająca od ciemnej sekcji About */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1F2A14]/10"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* --- LEWA KOLUMNA: DANE I TEKST (Uporządkowane) --- */}
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="block text-xs font-bold tracking-[0.3em] uppercase text-[#6B705C] mb-6">
                Kontakt
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#1F2A14] leading-[1.1] mb-8">
                Jesteśmy tu <br />
                <span className="italic text-[#3A4A22]">dla Ciebie.</span>
              </h2>
              <p className="text-[#1F2A14]/70 text-lg leading-relaxed max-w-md mb-12">
                Masz pytania o nasze oleje? Chcesz nawiązać współpracę? Napisz
                lub zadzwoń. Odpowiadamy sprawnie i konkretnie.
              </p>
            </motion.div>

            {/* Kafelki Kontaktowe */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:kontakt@ecomati.pl"
                className="group bg-white p-6 rounded-xl border border-[#1F2A14]/5 hover:border-[#3A4A22]/30 hover:shadow-lg transition-all duration-300 flex items-center gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#F6F5EE] flex items-center justify-center text-[#3A4A22] group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B705C] mb-1">
                    Napisz do nas
                  </span>
                  <span className="text-xl md:text-2xl font-serif text-[#1F2A14]">
                    kontakt@ecomati.pl
                  </span>
                </div>
              </a>

              {/* Telefon */}
              <a
                href="tel:+48500600700"
                className="group bg-white p-6 rounded-xl border border-[#1F2A14]/5 hover:border-[#3A4A22]/30 hover:shadow-lg transition-all duration-300 flex items-center gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#F6F5EE] flex items-center justify-center text-[#3A4A22] group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6B705C] mb-1">
                    Zadzwoń
                  </span>
                  <span className="text-xl md:text-2xl font-serif text-[#1F2A14]">
                    +48 500 600 700
                  </span>
                </div>
              </a>
            </div>

            {/* Social Media (Dyskretne na dole) */}
            <div className="mt-12 flex gap-4">
              <a
                href="#"
                className="text-[#1F2A14]/40 hover:text-[#3A4A22] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#1F2A14]/40 hover:text-[#3A4A22] transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* --- PRAWA KOLUMNA: FORMULARZ (W białej karcie) --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-[#1F2A14]/5"
          >
            <h3 className="text-2xl font-serif text-[#1F2A14] mb-8">
              Formularz kontaktowy
            </h3>

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B705C] ml-1">
                    Imię
                  </label>
                  <input
                    type="text"
                    placeholder="Jan"
                    className="w-full bg-[#F6F5EE] rounded-lg px-4 py-4 text-[#1F2A14] outline-none border border-transparent focus:border-[#3A4A22]/30 focus:bg-white transition-all placeholder:text-[#1F2A14]/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B705C] ml-1">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    placeholder="Kowalski"
                    className="w-full bg-[#F6F5EE] rounded-lg px-4 py-4 text-[#1F2A14] outline-none border border-transparent focus:border-[#3A4A22]/30 focus:bg-white transition-all placeholder:text-[#1F2A14]/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B705C] ml-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jan@przyklad.pl"
                  className="w-full bg-[#F6F5EE] rounded-lg px-4 py-4 text-[#1F2A14] outline-none border border-transparent focus:border-[#3A4A22]/30 focus:bg-white transition-all placeholder:text-[#1F2A14]/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6B705C] ml-1">
                  Wiadomość
                </label>
                <textarea
                  rows={4}
                  placeholder="W czym możemy pomóc?"
                  className="w-full bg-[#F6F5EE] rounded-lg px-4 py-4 text-[#1F2A14] outline-none border border-transparent focus:border-[#3A4A22]/30 focus:bg-white transition-all placeholder:text-[#1F2A14]/20 resize-none"
                />
              </div>

              <button className="group mt-4 w-full bg-[#1F2A14] text-[#F6F5EE] py-4 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#3A4A22] transition-colors flex items-center justify-center gap-3">
                Wyślij wiadomość
                <Send
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
