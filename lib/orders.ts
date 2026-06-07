/* ============================================================
   MELLIS — budowanie zamówienia po stronie serwera
   KLUCZOWA ZASADA (Specyfikacja, sekcja „Architektura"):
   nigdy nie ufamy cenie z przeglądarki. Backend przelicza sumę
   na podstawie wariantów z autorytatywnego źródła (lib/data).
   ============================================================ */

import {
  DELIVERY,
  FREE_SHIPPING_THRESHOLD_GROSZE,
  PRODUCTS,
  SIZES,
} from "./data";
import type { CartItem } from "./types";
import type { OrderDraft } from "./payments";

export interface BuildOrderInput {
  items: Array<{ productId: string; sizeId: string; qty: number }>;
  deliveryMethodId: string;
  email?: string;
}

export interface BuildOrderError {
  ok: false;
  error: string;
}

export interface BuildOrderOk {
  ok: true;
  order: OrderDraft;
}

function generateOrderNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `MEL-${n}`;
}

export function buildOrderDraft(
  input: BuildOrderInput,
): BuildOrderOk | BuildOrderError {
  if (!input.items || input.items.length === 0) {
    return { ok: false, error: "Koszyk jest pusty." };
  }

  const delivery = DELIVERY.find((d) => d.id === input.deliveryMethodId);
  if (!delivery) {
    return { ok: false, error: "Nieznana metoda dostawy." };
  }

  const lineItems: OrderDraft["lineItems"] = [];
  let subtotalGrosze = 0;

  for (const raw of input.items) {
    const product = PRODUCTS.find((p) => p.id === raw.productId);
    const size = SIZES.find((s) => s.id === raw.sizeId);
    const qty = Math.max(1, Math.floor(Number(raw.qty) || 0));

    if (!product || !size) {
      return { ok: false, error: `Nieznany produkt: ${raw.productId} / ${raw.sizeId}` };
    }

    const lineTotal = size.priceGrosze * qty;
    subtotalGrosze += lineTotal;
    lineItems.push({
      productName: product.name,
      variantLabel: `${size.label} · ${size.weight}`,
      unitPriceGrosze: size.priceGrosze,
      quantity: qty,
    });
  }

  // darmowa dostawa od progu (nie dotyczy odbioru osobistego — i tak 0 zł)
  const qualifiesFreeShipping =
    subtotalGrosze >= FREE_SHIPPING_THRESHOLD_GROSZE && delivery.id !== "odbior";
  const shippingGrosze = qualifiesFreeShipping ? 0 : delivery.priceGrosze;

  const order: OrderDraft = {
    number: generateOrderNumber(),
    items: input.items.map((i) => ({
      key: `${i.productId}-${i.sizeId}`,
      productId: i.productId,
      sizeId: i.sizeId as CartItem["sizeId"],
      qty: Math.max(1, Math.floor(Number(i.qty) || 0)),
    })),
    lineItems,
    subtotalGrosze,
    shippingGrosze,
    totalGrosze: subtotalGrosze + shippingGrosze,
    deliveryMethod: delivery.name,
    email: input.email ?? "",
  };

  return { ok: true, order };
}
