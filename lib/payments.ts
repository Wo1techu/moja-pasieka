/* ============================================================
   MELLIS — warstwa płatności (Stripe-ready)
   Architektura jest niezależna od operatora — UI i logika zamówień
   rozmawiają wyłącznie z interfejsem `PaymentProvider`. Aby włączyć
   prawdziwe płatności, wystarczy dostarczyć jedną implementację
   (Stripe lub Przelewy24) — bez zmian w pozostałym kodzie.

   Na ten moment, gdy brak kluczy API, używamy `DemoPaymentProvider`,
   dzięki czemu sklep w pełni działa lokalnie bez żadnej konfiguracji.
   ============================================================ */

import type { CartItem } from "./types";

/** Zamówienie przeliczone po stronie serwera (kwoty w groszach). */
export interface OrderDraft {
  number: string; // MEL-XXXX
  items: CartItem[];
  lineItems: Array<{
    productName: string;
    variantLabel: string;
    unitPriceGrosze: number;
    quantity: number;
  }>;
  subtotalGrosze: number;
  shippingGrosze: number;
  totalGrosze: number;
  deliveryMethod: string;
  email: string;
}

export interface CheckoutResult {
  /** "demo" = brak realnej płatności; "redirect" = przekierowanie do operatora. */
  mode: "demo" | "redirect";
  orderNumber: string;
  /** URL do Stripe Checkout / Przelewy24 (gdy mode === "redirect"). */
  redirectUrl?: string;
}

export interface PaymentProvider {
  readonly name: string;
  createCheckout(order: OrderDraft): Promise<CheckoutResult>;
}

/* ------------------------------------------------------------
   Implementacja DEMO — domyślna, bez płatności.
   Zamówienie od razu traktujemy jako „złożone".
   ------------------------------------------------------------ */
class DemoPaymentProvider implements PaymentProvider {
  readonly name = "demo";
  async createCheckout(order: OrderDraft): Promise<CheckoutResult> {
    return { mode: "demo", orderNumber: order.number };
  }
}

/* ------------------------------------------------------------
   Implementacja STRIPE — szkielet do uzupełnienia w przyszłości.
   Kroki wdrożenia:
     1. `npm install stripe`
     2. ustaw STRIPE_SECRET_KEY w .env.local
     3. odkomentuj poniższy kod i obsłuż webhook w
        app/api/webhooks/payment/route.ts (ustawia paymentStatus=paid)

   Fragment zgodny ze Specyfikacją techniczną (sekcja „Płatności"):
   ------------------------------------------------------------ */
// import Stripe from "stripe";
//
// class StripePaymentProvider implements PaymentProvider {
//   readonly name = "stripe";
//   private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//
//   async createCheckout(order: OrderDraft): Promise<CheckoutResult> {
//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
//     const session = await this.stripe.checkout.sessions.create({
//       mode: "payment",
//       currency: "pln",
//       payment_method_types: ["card", "blik", "p24"],
//       line_items: order.lineItems.map((li) => ({
//         quantity: li.quantity,
//         price_data: {
//           currency: "pln",
//           unit_amount: li.unitPriceGrosze, // Stripe używa groszy — zero konwersji
//           product_data: { name: `${li.productName} · ${li.variantLabel}` },
//         },
//       })),
//       // koszt dostawy jako osobna pozycja / shipping_options
//       success_url: `${siteUrl}/zamowienie?status=ok&numer=${order.number}`,
//       cancel_url: `${siteUrl}/zamowienie?status=anulowano`,
//       metadata: { orderNumber: order.number },
//       customer_email: order.email || undefined,
//     });
//     return { mode: "redirect", orderNumber: order.number, redirectUrl: session.url ?? undefined };
//   }
// }

/**
 * Zwraca aktywnego dostawcę płatności na podstawie konfiguracji.
 * Gdy ustawiono STRIPE_SECRET_KEY → Stripe (po odkomentowaniu wyżej),
 * w przeciwnym razie → tryb demo.
 */
export function getPaymentProvider(): PaymentProvider {
  // if (process.env.STRIPE_SECRET_KEY) return new StripePaymentProvider();
  return new DemoPaymentProvider();
}
