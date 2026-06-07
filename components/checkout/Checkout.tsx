"use client";

/* Wielokrokowy proces zamówienia. Port z prototypu (pages-checkout.jsx).
   Finalizacja liczy kwoty przez czyste funkcje z lib/ (buildOrderDraft) i
   dostawcę płatności (lib/payments) — szew pod Stripe/Przelewy24. */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Jar } from "@/components/Jar";
import { useCart } from "@/lib/cart";
import { formatPLN } from "@/lib/money";
import { DELIVERY, FREE_SHIPPING_THRESHOLD_GROSZE } from "@/lib/data";
import { buildOrderDraft } from "@/lib/orders";
import { getPaymentProvider } from "@/lib/payments";
import type { DeliveryMethod } from "@/lib/types";

type PayId = "blik" | "card" | "transfer";

interface OrderResult {
  orderNumber: string;
  totalGrosze: number;
  deliveryMethod: string;
  pay: PayId;
  email: string;
}

function Row({ l, v, muted }: { l: string; v: string; muted?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14.5,
        marginBottom: 8,
        color: muted ? "var(--ink-soft)" : "var(--ink)",
      }}
    >
      <span>{l}</span>
      <span className="price-tag">{v}</span>
    </div>
  );
}

export function Checkout() {
  const router = useRouter();
  const { lines, subtotalGrosze, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [deliv, setDeliv] = useState<DeliveryMethod>(DELIVERY[0]);
  const [pay, setPay] = useState<PayId>("blik");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    point: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // wartości do wyświetlenia (serwer i tak przelicza autorytatywnie)
  const freeShip = subtotalGrosze >= FREE_SHIPPING_THRESHOLD_GROSZE && deliv.id !== "odbior";
  const finalShip = freeShip ? 0 : deliv.priceGrosze;
  const finalTotal = subtotalGrosze + finalShip;

  const canNext =
    step === 1
      ? true
      : step === 2
        ? Boolean(form.name && form.email.includes("@") && form.phone)
        : true;

  async function submitOrder() {
    setSubmitting(true);
    setError(null);
    try {
      // Wersja statyczna (GitHub Pages): brak serwera, więc kwoty liczymy
      // bezpośrednio przez czyste funkcje z lib/ (te same, których używałby
      // endpoint /api/checkout). Szew pod Stripe pozostaje: getPaymentProvider()
      // można podmienić na wariant „redirect" po wdrożeniu na serwer.
      const built = buildOrderDraft({
        items: lines.map((l) => ({ productId: l.productId, sizeId: l.sizeId, qty: l.qty })),
        deliveryMethodId: deliv.id,
        email: form.email,
      });
      if (!built.ok) {
        setError(built.error ?? "Nie udało się złożyć zamówienia. Spróbuj ponownie.");
        return;
      }

      const provider = getPaymentProvider();
      const checkout = await provider.createCheckout(built.order);

      // Tryb redirect (przyszła integracja Stripe na serwerze) — przekieruj.
      if (checkout.mode === "redirect" && checkout.redirectUrl) {
        window.location.href = checkout.redirectUrl;
        return;
      }

      // Tryb demo — potwierdzenie od razu.
      setResult({
        orderNumber: checkout.orderNumber,
        totalGrosze: built.order.totalGrosze,
        deliveryMethod: built.order.deliveryMethod,
        pay,
        email: form.email,
      });
      clearCart();
      setStep(4);
      window.scrollTo(0, 0);
    } catch {
      setError("Nie udało się złożyć zamówienia. Spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---- pusty koszyk (przed potwierdzeniem) ---- */
  if (lines.length === 0 && step < 4) {
    return (
      <div className="wrap" style={{ padding: "120px 32px", textAlign: "center" }}>
        <span className="hex" style={{ width: 30, height: 34, opacity: 0.4 }} />
        <h2 className="serif-md" style={{ marginTop: 18 }}>
          Koszyk jest pusty
        </h2>
        <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>Dodaj miód, aby przejść do kasy.</p>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => router.push("/sklep")}>
          Do sklepu
        </button>
      </div>
    );
  }

  /* ---- potwierdzenie ---- */
  if (step === 4 && result) {
    return (
      <div className="wrap-narrow" style={{ padding: "90px 32px 120px", textAlign: "center" }}>
        <div style={{ width: 72, height: 80, margin: "0 auto", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--honey)",
              clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
            }}
          />
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            style={{ position: "absolute", top: 24, left: 20 }}
          >
            <path d="M5 12l5 5L20 6" />
          </svg>
        </div>
        <div className="eyebrow" style={{ marginTop: 24 }}>
          Zamówienie #{result.orderNumber}
        </div>
        <h1 className="serif-lg" style={{ marginTop: 12 }}>
          Dziękujemy za zamówienie!
        </h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 460, margin: "16px auto 0", lineHeight: 1.65 }}>
          Potwierdzenie wysłaliśmy na <strong>{result.email || "Twój e-mail"}</strong>. Spakujemy miód z największą starannością i nadamy w 1–2 dni robocze.
        </p>
        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            padding: 24,
            maxWidth: 420,
            margin: "32px auto 0",
            textAlign: "left",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, marginBottom: 8 }}>
            <span style={{ color: "var(--ink-soft)" }}>Dostawa</span>
            <span>{result.deliveryMethod}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, marginBottom: 8 }}>
            <span style={{ color: "var(--ink-soft)" }}>Płatność</span>
            <span>{result.pay === "blik" ? "BLIK" : result.pay === "card" ? "Karta" : "Przelew"}</span>
          </div>
          <div className="rule" style={{ margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, fontSize: 17 }}>
            <span>Razem</span>
            <span className="price-tag">{formatPLN(result.totalGrosze)}</span>
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", marginTop: 16, maxWidth: 420, margin: "16px auto 0" }}>
          Tryb demonstracyjny — bez realnej płatności. Po podłączeniu Stripe/Przelewy24 ten krok przekieruje do operatora płatności.
        </p>
        <button
          className="btn btn-dark"
          style={{ marginTop: 30 }}
          onClick={() => router.push("/")}
        >
          Wróć na stronę główną
        </button>
      </div>
    );
  }

  return (
    <div>
      <section style={{ background: "var(--cream-deep)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "44px 32px 38px" }}>
          <button onClick={() => router.push("/sklep")} style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 14 }}>
            ← Wróć do sklepu
          </button>
          <h1 className="serif-lg" style={{ fontSize: "clamp(34px,4vw,52px)" }}>
            Zamówienie
          </h1>
          <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap", rowGap: 12 }}>
            {["Dostawa", "Dane", "Płatność"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    background: step > i + 1 ? "var(--honey)" : step === i + 1 ? "var(--ink)" : "transparent",
                    color: step >= i + 1 ? "#fff" : "var(--ink-faint)",
                    border: step >= i + 1 ? "none" : "1px solid var(--line)",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: step >= i + 1 ? "var(--ink)" : "var(--ink-faint)" }}>
                  {s}
                </span>
                {i < 2 && <span style={{ width: 26, height: 1, background: "var(--line)", marginLeft: 4 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0 96px" }}>
        <div
          className="wrap checkout-grid"
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "start" }}
        >
          <div>
            {/* KROK 1 — dostawa */}
            {step === 1 && (
              <div>
                <h2 className="serif-md" style={{ marginBottom: 20 }}>
                  Sposób dostawy
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {DELIVERY.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDeliv(d)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: 20,
                        textAlign: "left",
                        border: "1px solid",
                        borderColor: deliv.id === d.id ? "var(--honey)" : "var(--line)",
                        background: deliv.id === d.id ? "var(--amber-wash)" : "var(--paper)",
                        borderRadius: "var(--radius-lg)",
                        transition: "all .16s",
                      }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor: deliv.id === d.id ? "var(--honey)" : "var(--line)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: "none",
                        }}
                      >
                        {deliv.id === d.id && (
                          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--honey)" }} />
                        )}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 16 }}>{d.name}</div>
                        <div style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>{d.time}</div>
                      </div>
                      <span
                        className="price-tag"
                        style={{ fontSize: 15, color: d.priceGrosze === 0 ? "var(--sage)" : "var(--ink)" }}
                      >
                        {d.priceGrosze === 0 ? "gratis" : formatPLN(d.priceGrosze)}
                      </span>
                    </button>
                  ))}
                </div>
                {freeShip && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      background: "var(--amber-wash)",
                      borderRadius: "var(--radius)",
                      fontSize: 14,
                      color: "var(--honey-deep)",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <span className="hex" style={{ width: 12, height: 13 }} /> Masz darmową dostawę — wartość koszyka przekracza 150 zł!
                  </div>
                )}
              </div>
            )}

            {/* KROK 2 — dane */}
            {step === 2 && (
              <div>
                <h2 className="serif-md" style={{ marginBottom: 20 }}>
                  Dane do wysyłki
                </h2>
                <div className="checkout-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label>Imię i nazwisko</label>
                    <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jan Kowalski" />
                  </div>
                  <div className="field">
                    <label>E-mail</label>
                    <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jan@email.pl" />
                  </div>
                  <div className="field">
                    <label>Telefon</label>
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="600 000 000" />
                  </div>
                  {deliv.id === "paczkomat" ? (
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                      <label>Kod paczkomatu InPost</label>
                      <input value={form.point} onChange={(e) => set("point", e.target.value)} placeholder="np. WAW123M" />
                    </div>
                  ) : deliv.id === "kurier" ? (
                    <>
                      <div className="field" style={{ gridColumn: "1 / -1" }}>
                        <label>Ulica i numer</label>
                        <input value={form.street} onChange={(e) => set("street", e.target.value)} placeholder="ul. Pasieczna 12" />
                      </div>
                      <div className="field">
                        <label>Kod pocztowy</label>
                        <input value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="96-100" />
                      </div>
                      <div className="field">
                        <label>Miejscowość</label>
                        <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Skierniewice" />
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        padding: 18,
                        background: "var(--amber-wash)",
                        borderRadius: "var(--radius)",
                        fontSize: 14.5,
                        color: "var(--ink-soft)",
                      }}
                    >
                      Po złożeniu zamówienia skontaktujemy się, aby umówić termin odbioru z pasieki w okolicy Bolimowskiego Parku Krajobrazowego.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* KROK 3 — płatność */}
            {step === 3 && (
              <div>
                <h2 className="serif-md" style={{ marginBottom: 8 }}>
                  Płatność
                </h2>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-faint)",
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  Bezpieczne płatności · integracja gotowa pod Stripe / Przelewy24
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {([
                    ["blik", "BLIK", "Szybka płatność kodem"],
                    ["card", "Karta płatnicza", "Visa, Mastercard"],
                    ["transfer", "Szybki przelew", "Przelewy24 / wszystkie banki"],
                  ] as Array<[PayId, string, string]>).map(([id, t, d]) => (
                    <button
                      key={id}
                      onClick={() => setPay(id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: 18,
                        textAlign: "left",
                        border: "1px solid",
                        borderColor: pay === id ? "var(--honey)" : "var(--line)",
                        background: pay === id ? "var(--amber-wash)" : "var(--paper)",
                        borderRadius: "var(--radius-lg)",
                      }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor: pay === id ? "var(--honey)" : "var(--line)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: "none",
                        }}
                      >
                        {pay === id && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--honey)" }} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 16 }}>{t}</div>
                        <div style={{ fontSize: 13.5, color: "var(--ink-faint)" }}>{d}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {pay === "card" && (
                  <div
                    className="checkout-fields"
                    style={{
                      marginTop: 16,
                      padding: 20,
                      border: "1px dashed var(--line)",
                      borderRadius: "var(--radius-lg)",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <div className="field" style={{ gridColumn: "1 / -1" }}>
                      <label>Numer karty</label>
                      <input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="field">
                      <label>Ważność</label>
                      <input placeholder="MM / RR" />
                    </div>
                    <div className="field">
                      <label>CVC</label>
                      <input placeholder="123" />
                    </div>
                    <p style={{ gridColumn: "1 / -1", fontSize: 12, color: "var(--ink-faint)", margin: 0 }}>
                      Pole demonstracyjne — w wersji produkcyjnej obsłuży je Stripe Elements.
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: 20,
                  padding: 14,
                  background: "#fbeae6",
                  border: "1px solid #e2b3a6",
                  borderRadius: "var(--radius)",
                  color: "#a24b2e",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
              <button className="btn btn-ghost" onClick={() => (step === 1 ? router.push("/sklep") : setStep(step - 1))}>
                ← Wstecz
              </button>
              <button
                className="btn btn-primary"
                disabled={!canNext || submitting}
                onClick={() => (step === 3 ? submitOrder() : setStep(step + 1))}
              >
                {step === 3 ? (submitting ? "Przetwarzanie…" : `Zapłać ${formatPLN(finalTotal)}`) : "Dalej →"}
              </button>
            </div>
          </div>

          {/* podsumowanie */}
          <aside
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-lg)",
              padding: 26,
              position: "sticky",
              top: 100,
            }}
          >
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 18 }}>
              Podsumowanie
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
              {lines.map((it) => (
                <div key={it.key} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 56,
                      background: "var(--cream-deep)",
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      position: "relative",
                    }}
                  >
                    <Jar product={it.product} w={30} label={false} />
                    <span
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        background: "var(--ink)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {it.qty}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{it.product.name.replace("Miód ", "")}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>{it.size.weight}</div>
                  </div>
                  <span className="price-tag" style={{ fontSize: 14 }}>
                    {formatPLN(it.lineTotalGrosze)}
                  </span>
                </div>
              ))}
            </div>
            <div className="rule" style={{ margin: "4px 0 16px" }} />
            <Row l="Produkty" v={formatPLN(subtotalGrosze)} />
            <Row l="Dostawa" v={finalShip === 0 ? "gratis" : formatPLN(finalShip)} muted />
            <div className="rule" style={{ margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 600, fontSize: 17 }}>Razem</span>
              <span className="price-tag" style={{ fontSize: 24, color: "var(--honey-deep)" }}>
                {formatPLN(finalTotal)}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 14, textAlign: "center" }}>
              Cena zawiera VAT. Bezpieczna transakcja.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
