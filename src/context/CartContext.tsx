"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/components/shop/Products";

export interface CartItem extends Product {
  cartId: string; // Unikalne ID (bo ten sam produkt może być w różnych rozmiarach)
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Ładowanie z localStorage (żeby koszyk nie znikał po odświeżeniu)
  useEffect(() => {
    const savedCart = localStorage.getItem("ecomati_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Zapisywanie do localStorage
  useEffect(() => {
    localStorage.setItem("ecomati_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      // Sprawdzamy czy ten produkt w tym rozmiarze już jest
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          cartId: `${product.id}-${size}`,
          selectedSize: size,
          quantity: 1,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  // Parsowanie ceny (np. "29,90 zł" -> 29.90)
  const totalPrice = cart.reduce((sum, item) => {
    const priceNumber = parseFloat(item.price.replace(",", ".").replace(/[^0-9.]/g, ""));
    return sum + priceNumber * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}