export interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  category: string; // Precyzyjna kategoria (np. "olej-lniany")
  group: string; // Grupa główna (np. "oleje", "maki", "dodatki")
  featured?: boolean;
  longDesc?: string;
  application?: string;
  ingredients?: string;
  details?: string;
  sizes?: string[];
}

const baseProducts: Product[] = [
  // --- GRUPA: OLEJE ---
  {
    id: 1,
    name: "Olej Lniany BIO",
    desc: "250 ml · tłoczony na zimno",
    price: "29,90 zł",
    image: "/Img/Olejbio.png",
    category: "olej-lniany",
    group: "oleje",
    featured: true,
    longDesc:
      "Nasz olej lniany to esencja zdrowia zamknięta w ciemnym szkle. Tłoczony metodą 'na zimno' w temperaturze nieprzekraczającej 38°C. Bogaty w kwasy Omega-3.",
    application:
      "Spożywać na zimno. Doskonały do sałatek, kasz, twarogu (pasta Budwigowa).",
    ingredients: "100% olej z nasion lnu brązowego.",
    details: "Pojemność: 250ml • Butelka: Ciemne szkło UV",
    sizes: ["250 ml", "500 ml", "1000 ml"],
  },
  {
    id: 2,
    name: "Olej z Czarnuszki",
    desc: "100 ml · złoto faraonów",
    price: "45,00 zł",
    image: "/Img/Olejbio.png", // Placeholder
    category: "olej-czarnuszka",
    group: "oleje",
    featured: true,
    longDesc:
      "Intensywny w smaku olej z czarnuszki egipskiej. Znany ze swoich właściwości wspierających odporność i układ trawienny.",
    application: "1 łyżeczka dziennie na czczo lub jako dodatek do potraw.",
    sizes: ["100 ml", "250 ml", "500 ml"],
  },
  {
    id: 3,
    name: "Olej Kokosowy",
    desc: "500 ml · nierafinowany",
    price: "39,90 zł",
    image: "/Img/Olejkokosowy.png",
    category: "olej-kokosowy",
    group: "oleje",
    longDesc:
      "Nierafinowany olej kokosowy o subtelnym zapachu świeżego kokosa. Idealny do kuchni i pielęgnacji.",
    sizes: ["300 ml", "500 ml", "900 ml"],
  },
  {
    id: 4,
    name: "Oliwa z Oliwek Extra Virgin",
    desc: "500 ml · Hiszpania",
    price: "59,00 zł",
    image: "/Img/Olejbio.png",
    category: "oliwa",
    group: "oleje",
    longDesc:
      "Najwyższej klasy oliwa z pierwszego tłoczenia. Niska kwasowość, głęboki smak.",
    sizes: ["500 ml", "1000 ml"],
  },
  {
    id: 5,
    name: "Olej z Ostropestu",
    desc: "250 ml · wsparcie wątroby",
    price: "35,00 zł",
    image: "/Img/Olejbio.png",
    category: "olej-inne",
    group: "oleje",
    longDesc:
      "Olej tłoczony z nasion ostropestu plamistego. Naturalne źródło sylimaryny.",
    sizes: ["250 ml", "500 ml"],
  },

  // --- GRUPA: ZIARNA ---
  {
    id: 10,
    name: "Pestki Dyni",
    desc: "200 g · polska uprawa",
    price: "19,90 zł",
    image: "/Img/Dynia.png",
    category: "ziarna-dynia",
    group: "ziarna",
    sizes: ["200 g", "500 g", "1 kg"],
  },
  {
    id: 11,
    name: "Nasiona Chia",
    desc: "250 g · superfood",
    price: "15,90 zł",
    image: "/Img/Dynia.png",
    category: "ziarna-inne",
    group: "ziarna",
    sizes: ["250 g", "500 g"],
  },
  {
    id: 12,
    name: "Słonecznik Łuskany",
    desc: "500 g · chrupiący",
    price: "12,00 zł",
    image: "/Img/Dynia.png",
    category: "ziarna-slonecznik",
    group: "ziarna",
    sizes: ["500 g", "1 kg"],
  },

  // --- GRUPA: ORZECHY ---
  {
    id: 20,
    name: "Migdały",
    desc: "200 g · niesolone",
    price: "24,90 zł",
    image: "/Img/Migdały.png",
    category: "orzechy-migdaly",
    group: "orzechy",
    sizes: ["200 g", "500 g", "1 kg"],
  },
  {
    id: 21,
    name: "Orzechy Włoskie",
    desc: "200 g · połówki",
    price: "29,90 zł",
    image: "/Img/Migdały.png",
    category: "orzechy-wloskie",
    group: "orzechy",
    sizes: ["200 g", "500 g"],
  },
  {
    id: 22,
    name: "Nerkowce",
    desc: "200 g · maślane",
    price: "32,00 zł",
    image: "/Img/Migdały.png",
    category: "orzechy-nerkowce",
    group: "orzechy",
    sizes: ["200 g", "500 g"],
  },

  // --- GRUPA: KIEŁKI (NOWOŚĆ) ---
  {
    id: 40,
    name: "Nasiona na Kiełki: Rzodkiewka",
    desc: "50 g · ostry smak",
    price: "4,90 zł",
    image: "/Img/Dynia.png", // Placeholder
    category: "nasiona-kielki",
    group: "kielki",
    longDesc:
      "Ekologiczne nasiona rzodkiewki do kiełkowania. Kiełki rzodkiewki są bogate w witaminę C i mają wyrazisty, pikantny smak. Idealne do kanapek.",
    application:
      "Moczyć nasiona 4-6h, płukać 2 razy dziennie. Gotowe w 4-5 dni.",
  },
  {
    id: 41,
    name: "Nasiona na Kiełki: Brokuł",
    desc: "50 g · sulforafan",
    price: "6,90 zł",
    image: "/Img/Dynia.png",
    category: "nasiona-kielki",
    group: "kielki",
    longDesc:
      "Kiełki brokuła to najbogatsze naturalne źródło sulforafanu - silnego przeciwutleniacza. Łagodne w smaku.",
    application:
      "Moczyć nasiona 4-6h, płukać 2 razy dziennie. Gotowe w 4-6 dni.",
  },
  {
    id: 42,
    name: "Nasiona na Kiełki: Lucerna",
    desc: "50 g · delikatne",
    price: "5,50 zł",
    image: "/Img/Dynia.png",
    category: "nasiona-kielki",
    group: "kielki",
    longDesc:
      "Kiełki lucerny (Alfalfa) są niezwykle delikatne i chrupiące. Zawierają fitestrogeny i witaminy z grupy B.",
  },
  {
    id: 45,
    name: "Kiełkownica Słoikowa",
    desc: "Zestaw Startowy",
    price: "39,00 zł",
    image: "/Img/Dynia.png", // Placeholder
    category: "akcesoria",
    group: "kielki",
    longDesc:
      "Wygodny słoik ze specjalną nakrętką z sitkiem, który ułatwia codzienne płukanie kiełków. Najprostszy sposób na domową uprawę.",
  },

  // --- GRUPA: ZDROWE DODATKI (NOWOŚĆ) ---
  {
    id: 50,
    name: "Syrop z Agawy BIO",
    desc: "400 ml · wegański miód",
    price: "24,90 zł",
    image: "/Img/Olejbio.png", // Placeholder
    category: "slodziki",
    group: "dodatki",
    longDesc:
      "Ekologiczny syrop z agawy to doskonała alternatywa dla cukru i miodu. Ma niski indeks glikemiczny i łatwo rozpuszcza się w zimnych napojach.",
    sizes: ["250 ml", "400 ml", "1 L"],
  },
  {
    id: 51,
    name: "Sos Sojowy Kikkoman",
    desc: "150 ml · naturalnie warzony",
    price: "14,90 zł",
    image: "/Img/Olejbio.png", // Placeholder
    category: "sosy",
    group: "dodatki",
    longDesc:
      "Legendarny, naturalnie warzony sos sojowy. Składa się tylko z 4 składników: soi, pszenicy, wody i soli. Bez konserwantów.",
    sizes: ["150 ml", "500 ml", "1 L"],
  },
  {
    id: 52,
    name: "Erytrytol",
    desc: "500 g · 0 kcal",
    price: "19,90 zł",
    image: "/Img/Dynia.png", // Placeholder
    category: "slodziki",
    group: "dodatki",
    longDesc:
      "Naturalna substancja słodząca bez kalorii. Nie podnosi poziomu cukru we krwi. Idealny dla diabetyków i osób na diecie ketogenicznej.",
    sizes: ["500 g", "1 kg"],
  },
  {
    id: 53,
    name: "Sól Himalajska Różowa",
    desc: "500 g · drobna",
    price: "5,90 zł",
    image: "/Img/Dynia.png",
    category: "przyprawy",
    group: "dodatki",
    longDesc:
      "Nieoczyszczona sól krystaliczna bogata w minerały. Wydobywana tradycyjnymi metodami u podnóża Himalajów.",
    sizes: ["500 g", "1 kg"],
  },

  // --- GRUPA: MĄKI KETO/BIO (NOWOŚĆ) ---
  {
    id: 60,
    name: "Mąka Kokosowa BIO",
    desc: "500 g · bezglutenowa",
    price: "12,90 zł",
    image: "/Img/Olejkokosowy.png",
    category: "maki-kokosowa",
    group: "maki",
    longDesc:
      "Mąka powstająca z miąższu kokosa. Bogata w błonnik i białko, o niskiej zawartości węglowodanów. Idealna do wypieków keto i low-carb.",
    application:
      "Chłonie dużo wilgoci - używaj mniej niż zwykłej mąki w przepisach.",
    sizes: ["500 g", "1 kg"],
  },
  {
    id: 61,
    name: "Mąka Migdałowa",
    desc: "500 g · z blanszowanych migdałów",
    price: "34,90 zł",
    image: "/Img/Migdały.png",
    category: "maki-migdalowa",
    group: "maki",
    longDesc:
      "Delikatna mąka ze zmielonych migdałów bez skórki. Baza do makaroników oraz ciast niskowęglowodanowych.",
    sizes: ["500 g", "1 kg"],
  },

  // --- ZESTAWY ---
  {
    id: 90,
    name: "Zestaw Odporność",
    desc: "Czarnuszka + Olej Lniany",
    price: "69,00 zł",
    image: "/Img/Olejbio.png",
    category: "zestawy",
    group: "zestawy",
    featured: true,
  },
];

export const products: Product[] = [...baseProducts].map((product, index) => ({
  ...product,
  id: index + 1,
}));
