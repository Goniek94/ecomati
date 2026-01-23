# 🌱 Instrukcja Seedowania Produktów

## Dodawanie produktów do bazy danych

### Szybki start

Aby dodać produkty z kategoriami do bazy danych, uruchom:

```bash
node seed-products-with-categories.js
```

### Co robi skrypt?

Skrypt `seed-products-with-categories.js` dodaje do bazy danych produkty z następujących kategorii:

#### 🥥 Oleje Tłoczone (4 produkty)

- Olej Kokosowy
- Olej z Czarnuszki
- Olej z Pestek Dyni
- Olej z Rokitnika

#### 🌾 Ziarna i Nasiona (3 produkty)

- Pestki Dyni
- Słonecznik
- Chia i Inne

### Funkcje skryptu

✅ **Sprawdza duplikaty** - Nie doda produktu, który już istnieje (sprawdza po slug)
✅ **Pokazuje postęp** - Wyświetla informacje o każdym dodanym produkcie
✅ **Podsumowanie** - Na końcu pokazuje statystyki i produkty według kategorii
✅ **Bezpieczny** - Nie nadpisuje istniejących produktów

### Przykładowe wyjście

```
🌱 Starting seed process...

✅ Connected to database

📊 Current products in database: 5

🌾 Seeding products...

✅ Created: Olej Kokosowy (Oleje Tłoczone)
✅ Created: Olej z Czarnuszki (Oleje Tłoczone)
...

==================================================
✨ Seed completed successfully!
📊 Products added: 7
📊 Total products in database: 12
==================================================

📋 Products by category:

   Oleje Tłoczone: 4 products
   Ziarna i Nasiona: 3 products
```

## Dodawanie własnych produktów

### Edytuj plik skryptu

Otwórz `seed-products-with-categories.js` i dodaj nowy produkt do tablicy `productsData`:

```javascript
{
  name: "Nazwa Produktu",
  slug: "nazwa-produktu",
  shortDescription: "Krótki opis produktu",
  longDescription: "Szczegółowy opis produktu...",
  price: 29.99,
  originalPrice: 34.99, // opcjonalne
  category: "Nazwa Kategorii",
  productGroup: "Grupa Produktów",
  mainImage: "/Img/zdjecie.png",
  tags: ["bio", "ekologiczne"],
  properties: ["Właściwość 1", "Właściwość 2"],
  ingredients: "Składniki produktu",
  usageInstructions: "Sposób użycia",
  storageInstructions: "Sposób przechowywania",
  allergens: [], // lub ["alergen1", "alergen2"]
  certifications: ["BIO", "Vegan"],
  originCountry: "Polska",
  producer: "Nazwa Producenta",
  stockQuantity: 50,
  isAvailable: true,
  isFeatured: false, // czy wyróżniony na stronie głównej
}
```

### Uruchom ponownie skrypt

```bash
node seed-products-with-categories.js
```

## Panel Admina

Po dodaniu produktów możesz zarządzać nimi przez panel admina:

1. Przejdź do `http://localhost:3001/dashboard/products`
2. Zaloguj się (jeśli wymagane)
3. Możesz:
   - ✏️ Edytować produkty
   - ➕ Dodawać nowe produkty
   - 🗑️ Usuwać produkty
   - 📸 Dodawać zdjęcia
   - 📊 Zarządzać stanem magazynowym

## Sklep Frontend

Produkty automatycznie pojawią się w sklepie:

- Strona sklepu: `http://localhost:3000/sklep`
- Dynamiczne kategorie w filtrach
- Wyszukiwarka produktów
- Strony szczegółów produktów

## Struktura bazy danych

Produkty są przechowywane w tabeli `products` z następującymi polami:

- **Podstawowe**: name, slug, shortDescription, longDescription
- **Ceny**: price, originalPrice, currency
- **Zdjęcia**: mainImage, galleryImages
- **Kategoryzacja**: category, productGroup, tags
- **Szczegóły**: ingredients, properties, certifications
- **Magazyn**: stockQuantity, isAvailable
- **SEO**: metaTitle, metaDescription, metaKeywords
- **Daty**: createdAt, updatedAt, deletedAt

## Rozwiązywanie problemów

### Błąd połączenia z bazą danych

Sprawdź plik `.env` i upewnij się, że masz poprawne dane:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### Produkt już istnieje

Skrypt automatycznie pomija produkty, które już istnieją. Jeśli chcesz zaktualizować produkt, usuń go najpierw przez panel admina lub zmień slug.

### Błąd BigInt serialization

Ten błąd został naprawiony w API. Jeśli nadal występuje, upewnij się, że masz najnowszą wersję plików API.
