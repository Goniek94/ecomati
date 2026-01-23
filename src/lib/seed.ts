import { supabase } from "./supabase";
import { products } from "../components/shop/Products";

async function seedProducts() {
  console.log("Rozpoczynam dodawanie produktów...");

  // Mapujemy dane z Twojego pliku na strukturę bazy
  const productsToInsert = products.map((p) => ({
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    featured: p.featured || false,
    desc_short: p.desc, // mapowanie desc -> desc_short
    sizes: p.sizes || [],
  }));

  const { data, error } = await supabase
    .from("products")
    .insert(productsToInsert);

  if (error) {
    console.error("Błąd podczas dodawania:", error);
  } else {
    console.log("Sukces! Produkty zostały dodane.");
  }
}

seedProducts();
