"use client";

export default function ContactSection() {
  return (
    <section className="relative bg-[#F6F5EE] py-48">
      <div className="max-w-7xl mx-auto px-10">
        {/* PANEL TŁA */}
        <div
          className="
            relative
            rounded-[48px]
            bg-white
            px-20
            py-24
            shadow-[0_40px_120px_rgba(0,0,0,0.12)]
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            {/* LEWA STRONA – TEKST */}
            <div>
              <span className="block text-xs tracking-[0.35em] uppercase text-[#6B705C] mb-6">
                Kontakt
              </span>

              <h2 className="text-[clamp(2.8rem,4.5vw,4.5rem)] font-serif text-[#3A4A22] mb-12 leading-tight">
                Porozmawiajmy <br /> o dobrej energii
              </h2>

              <p className="text-[#6B705C] text-lg leading-relaxed max-w-md mb-20">
                Jeśli masz pytania o produkty, współpracę lub po prostu chcesz
                się z nami skontaktować — zostaw wiadomość. Odpowiadamy
                spokojnie, konkretnie i bez automatycznych formułek.
              </p>

              {/* INFO */}
              <div className="space-y-8 text-sm text-[#3A4A22]">
                <p>
                  <span className="uppercase tracking-widest text-xs text-[#6B705C]">
                    Email
                  </span>
                  <br />
                  kontakt@ecomati.pl
                </p>

                <p>
                  <span className="uppercase tracking-widest text-xs text-[#6B705C]">
                    Lokalizacja
                  </span>
                  <br />
                  Polska
                </p>
              </div>
            </div>

            {/* PRAWA STRONA – FORM */}
            <form
              className="
                bg-[#F6F5EE]
                rounded-[32px]
                p-16
                shadow-[inset_0_0_0_1px_rgba(58,74,34,0.15)]
              "
            >
              <div className="space-y-12">
                {/* IMIĘ */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#6B705C] mb-3">
                    Imię
                  </label>
                  <input
                    type="text"
                    placeholder="Twoje imię"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-[#3A4A22]/30
                      py-3
                      text-[#3A4A22]
                      placeholder-[#6B705C]/50
                      focus:outline-none
                      focus:border-[#3A4A22]
                      transition
                    "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#6B705C] mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="twoj@email.com"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-[#3A4A22]/30
                      py-3
                      text-[#3A4A22]
                      placeholder-[#6B705C]/50
                      focus:outline-none
                      focus:border-[#3A4A22]
                      transition
                    "
                  />
                </div>

                {/* WIADOMOŚĆ */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#6B705C] mb-3">
                    Wiadomość
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Napisz, w czym możemy pomóc…"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-[#3A4A22]/30
                      py-3
                      text-[#3A4A22]
                      placeholder-[#6B705C]/50
                      resize-none
                      focus:outline-none
                      focus:border-[#3A4A22]
                      transition
                    "
                  />
                </div>

                {/* BUTTON */}
                <div className="pt-10">
                  <button
                    type="submit"
                    className="
                      inline-block
                      px-14
                      py-5
                      bg-[#3A4A22]
                      text-[#F4FFD9]
                      uppercase
                      tracking-widest
                      text-sm
                      hover:bg-[#2F3A1B]
                      transition
                    "
                  >
                    Wyślij
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
