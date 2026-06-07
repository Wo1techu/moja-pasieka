"use client";

/* ============================================================
   MELLIS — stan koszyka (Context + localStorage)
   Odpowiednik logiki z prototypu (app.jsx), ale jako kontekst
   współdzielony przez wszystkie trasy Next.js.
   ============================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, SIZES } from "./data";
import type { CartItem, Product, Size, SizeId } from "./types";

const STORAGE_KEY = "mellis_cart";

/** Pozycja koszyka wzbogacona o pełne dane produktu i wielkości (do wyświetlania). */
export interface CartLine extends CartItem {
  product: Product;
  size: Size;
  lineTotalGrosze: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  cartCount: number;
  subtotalGrosze: number;
  addToCart: (productId: string, sizeId: SizeId, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // wczytaj koszyk z localStorage po stronie klienta
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // zapisuj zmiany (dopiero po hydracji, by nie nadpisać pustym stanem)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addToCart = useCallback((productId: string, sizeId: SizeId, qty: number) => {
    const key = `${productId}-${sizeId}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { key, productId, sizeId, qty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        const size = SIZES.find((s) => s.id === item.sizeId);
        if (!product || !size) return null;
        return {
          ...item,
          product,
          size,
          lineTotalGrosze: size.priceGrosze * item.qty,
        };
      })
      .filter((l): l is CartLine => l !== null);
  }, [items]);

  const cartCount = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const subtotalGrosze = useMemo(
    () => lines.reduce((a, b) => a + b.lineTotalGrosze, 0),
    [lines],
  );

  const value: CartContextValue = {
    items,
    lines,
    cartCount,
    subtotalGrosze,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    cartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart musi być użyte wewnątrz <CartProvider>");
  return ctx;
}
