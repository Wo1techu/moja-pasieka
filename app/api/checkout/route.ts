import { NextResponse } from "next/server";
import { buildOrderDraft } from "@/lib/orders";
import { getPaymentProvider } from "@/lib/payments";

/* ============================================================
   POST /api/checkout
   Tworzy zamówienie na podstawie koszyka. Kwoty są PRZELICZANE
   PO STRONIE SERWERA (lib/orders) — ceny z żądania są ignorowane.
   Następnie deleguje do dostawcy płatności (lib/payments):
     - tryb demo (domyślnie, bez kluczy API) → potwierdzenie od razu,
     - tryb redirect (po podłączeniu Stripe) → URL do operatora.

   Odpowiednik endpointu /api/orders ze Specyfikacji technicznej.
   ============================================================ */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Nieprawidłowe dane żądania." }, { status: 400 });
  }

  const { items, deliveryMethodId, email } = (body ?? {}) as {
    items?: Array<{ productId: string; sizeId: string; qty: number }>;
    deliveryMethodId?: string;
    email?: string;
  };

  const built = buildOrderDraft({
    items: items ?? [],
    deliveryMethodId: deliveryMethodId ?? "",
    email,
  });

  if (!built.ok) {
    return NextResponse.json({ ok: false, error: built.error }, { status: 400 });
  }

  const order = built.order;

  // TODO: tutaj zapis zamówienia do bazy (status "new") + rezerwacja stanu.
  const provider = getPaymentProvider();
  const checkout = await provider.createCheckout(order);

  return NextResponse.json({
    ok: true,
    mode: checkout.mode,
    orderNumber: checkout.orderNumber,
    redirectUrl: checkout.redirectUrl,
    provider: provider.name,
    subtotalGrosze: order.subtotalGrosze,
    shippingGrosze: order.shippingGrosze,
    totalGrosze: order.totalGrosze,
    deliveryMethod: order.deliveryMethod,
  });
}
