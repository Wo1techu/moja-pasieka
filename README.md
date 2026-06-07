# MELLIS — sklep internetowy pasieki

Sklep z miodem rodzinnej pasieki MELLIS. Aplikacja **Next.js (App Router) + TypeScript**,
zbudowana na bazie prototypu i specyfikacji z katalogu [`docs/prototyp/`](docs/prototyp).

Na ten moment sklep działa **w pełni lokalnie, bez bazy danych i bez kluczy do płatności**
(tryb demo). Architektura jest przygotowana pod podłączenie Stripe / Przelewy24 oraz bazy
PostgreSQL — patrz sekcja [Plan rozwoju](#plan-rozwoju).

---

## Szybki start

Wymagania: **Node.js 18.18+** (zalecane 20+).

```bash
npm install
npm run dev
```

Otwórz **http://localhost:3000**.

Produkcyjnie:

```bash
npm run build
npm start
```

---

## Co działa

- **Strona główna**, **sklep** z filtrami, **karta produktu** (wybór wielkości słoika, ilość)
- **Koszyk** (wysuwany panel, zapis w `localStorage`)
- **Checkout** 3-krokowy (dostawa → dane → płatność) + ekran potwierdzenia
- **Treści**: O nas (z FAQ), Galeria, Dziennik (lista + wpisy)
- **6 odmian miodu × 3 wielkości**, ceny w groszach, **suma liczona po stronie serwera**
- SEO: metadane, dane strukturalne (JSON-LD), `sitemap.xml`, `robots.txt`

> Płatność w checkoutcie działa w **trybie demo** — nie pobiera realnych pieniędzy.
> Zamówienie kończy się ekranem potwierdzenia z numerem `MEL-XXXX`.

---

## Struktura projektu

```
app/                      # trasy (Next.js App Router)
  page.tsx                #   /            strona główna
  sklep/                  #   /sklep, /sklep/[slug]
  o-nas/  galeria/        #   strony treściowe
  dziennik/               #   /dziennik, /dziennik/[slug]
  zamowienie/             #   /zamowienie  (checkout)
  api/
    checkout/route.ts     #   POST — tworzy zamówienie (przelicza kwoty serwerowo)
    newsletter/route.ts   #   POST — zapis do newslettera (stub)
  layout.tsx  globals.css # układ globalny + system designu (1:1 z prototypu)
components/               # komponenty UI (Header, Jar, ProductCard, CartDrawer, ...)
lib/
  data.ts                 # ŹRÓDŁO PRAWDY: produkty, ceny, dostawa, treści
  cart.tsx                # koszyk (React Context + localStorage)
  orders.ts               # serwerowe liczenie zamówienia
  payments.ts             # warstwa płatności (interfejs + tryb demo + szkielet Stripe)
  money.ts  types.ts      # formatowanie kwot, typy
docs/prototyp/            # oryginalny prototyp HTML + specyfikacja techniczna
```

## Jak zmienić produkty i ceny

Wszystko jest w **[`lib/data.ts`](lib/data.ts)**. Ceny trzymamy w **groszach**
(np. `3000` = 30 zł), zgodnie ze specyfikacją — to też ułatwia integrację ze Stripe.

```ts
export const SIZES = [
  { id: "s", label: "Mały",   weight: "250 g", weightGrams: 250, priceGrosze: 3000 },
  { id: "m", label: "Średni", weight: "500 g", weightGrams: 500, priceGrosze: 4500 },
  { id: "l", label: "Duży",   weight: "900 g", weightGrams: 900, priceGrosze: 6000 },
];
```

Próg darmowej dostawy: `FREE_SHIPPING_THRESHOLD_GROSZE` (domyślnie 150 zł).

---

## Plan rozwoju

### 1. Płatności (Stripe) — architektura już gotowa

Cała logika płatności przechodzi przez interfejs `PaymentProvider`
([`lib/payments.ts`](lib/payments.ts)). Aby włączyć Stripe:

1. `npm install stripe`
2. Skopiuj `.env.example` → `.env.local` i ustaw `STRIPE_SECRET_KEY`
3. Odkomentuj klasę `StripePaymentProvider` w `lib/payments.ts`
   i `return new StripePaymentProvider()` w `getPaymentProvider()`
4. Dodaj webhook `app/api/webhooks/payment/route.ts` (ustawia status `paid`)

Checkout automatycznie przełączy się z trybu demo na przekierowanie do Stripe —
**bez zmian w UI**. Dla rynku PL Stripe obsługuje kartę, BLIK i Przelewy24 (P24).

### 2. Baza danych (PostgreSQL + Prisma)

Dziś dane są w pliku `lib/data.ts`. Docelowo trafią do bazy — schemat (Prisma)
opisuje [specyfikacja techniczna](docs/prototyp/Specyfikacja%20techniczna.html), sekcja „Model danych".

### 3. Pozostałe

- Zdjęcia (pasieka, słoiki) — w miejscu pasiastych placeholderów → katalog `public/`
- Panel administracyjny, dostawa InPost (Geowidget + etykiety), e-maile transakcyjne
- Regulamin, polityka prywatności, zgody RODO, baner cookies (do ustalenia z prawnikiem)

Pełny plan: [specyfikacja techniczna](docs/prototyp/Specyfikacja%20techniczna.html), sekcja „Etapy wdrożenia".

---

## Wysłanie do Git

Repozytorium jest gotowe (`.gitignore` pomija `node_modules`, `.next`, `.env*`).

```bash
git init
git add .
git commit -m "MELLIS — sklep internetowy (MVP, Next.js)"
# następnie utwórz repo na GitHub/GitLab i:
git remote add origin <adres-repo>
git push -u origin main
```

Hosting docelowy: **Vercel** (natywny dla Next.js — automatyczny build z Git, SSL, CDN).

---

MELLIS · Pasieka rodzinna · aplikacja MVP
