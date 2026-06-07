/* ============================================================
   MELLIS — typy domenowe
   ============================================================ */

export type SizeId = "s" | "m" | "l";

export interface Size {
  id: SizeId;
  label: string; // "Mały" | "Średni" | "Duży"
  weight: string; // "250 g"
  weightGrams: number;
  priceGrosze: number; // cena w groszach (np. 3000 = 30 zł)
}

export interface Product {
  /** id pełni rolę sluga w URL: /sklep/[slug] */
  id: string;
  name: string;
  season: string;
  color: string; // hex motywu słoika
  tagline: string;
  short: string;
  notes: string[];
  pairing: string;
  bestseller: boolean;
}

export interface Review {
  name: string;
  city: string;
  text: string;
  product: string;
  rating: number;
}

export interface JournalPost {
  id: string;
  kicker: string;
  title: string;
  date: string;
  read: string;
  excerpt: string;
}

export interface GalleryItem {
  label: string;
  tall?: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Company {
  name: string;
  estd: string;
  hives: number;
  tagline: string;
  region: string;
  phone: string;
  email: string;
  addr: string;
}

export interface DeliveryMethod {
  id: "paczkomat" | "kurier" | "odbior";
  name: string;
  time: string;
  priceGrosze: number;
}

/** Pozycja koszyka przechowywana w stanie / localStorage */
export interface CartItem {
  key: string; // `${productId}-${sizeId}`
  productId: string;
  sizeId: SizeId;
  qty: number;
}
