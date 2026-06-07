# MELLIS — pakiet dla programisty

Sklep internetowy rodzinnej pasieki MELLIS. Ten pakiet zawiera klikalny prototyp UI
(wzorzec wyglądu i przepływów) oraz pełną specyfikację techniczną wdrożenia.

---

## Zawartość pakietu

```
MELLIS.html                  ← klikalny prototyp sklepu (otwórz w przeglądarce)
Specyfikacja techniczna.html ← dokument wdrożeniowy (stack, API, dane, płatności)
tweaks-panel.jsx             ← panel przełączania wariantów (część prototypu)
assets/
  styles.css                 ← tokeny designu: kolory, typografia, komponenty
  data.js                    ← DANE PRODUKTÓW i treści (źródło prawdy dla katalogu)
  components.jsx             ← komponenty wspólne (nagłówek, stopka, karty, słoik)
  pages-home.jsx            ← strona główna (3 warianty hero)
  pages-store.jsx          ← sklep, produkt, koszyk
  pages-checkout.jsx       ← proces zamówienia (3 kroki)
  pages-content.jsx        ← O nas, galeria, dziennik/blog
  app.jsx                   ← router + stan koszyka + panel Tweaks
```

---

## Jak uruchomić prototyp

Otwórz `MELLIS.html` w przeglądarce (wymaga internetu — biblioteki React ładowane z CDN).
Nie trzeba niczego instalować. To statyczny prototyp, **nie** docelowa aplikacja.

### Warianty strony głównej
Prototyp zawiera **3 kierunki graficzne** strony głównej. Przełącza się je w panelu
**Tweaks** (przycisk w narzędziach podglądu): „Edytorialny", „Pełnoekranowe zdjęcie",
„Miód miesiąca". Tam też zmienisz kolor akcentu i styl narożników.
**Do wdrożenia należy wybrać jeden wariant.**

---

## Dla programisty — od czego zacząć

1. Przeczytaj **`Specyfikacja techniczna.html`** — to główny dokument (stack, architektura,
   model danych ze schematem Prisma, lista endpointów API, przepływ płatności, dostawa,
   wymogi prawne, etapy wdrożenia).
2. **`assets/data.js`** zawiera gotowe dane katalogu (6 odmian miodu, 3 warianty wielkości,
   ceny, opisy, opinie, FAQ, metody dostawy) — można je zaimportować do bazy.
3. **`assets/styles.css`** to system designu (zmienne CSS: paleta miodowa, typografia
   Cormorant Garamond + Jost, komponenty). Przenosi się 1:1 do docelowego frontendu.
4. Komponenty React (`*.jsx`) odwzorowują docelowe ekrany — patrz sekcja
   „Mapa ekranów" w specyfikacji.

---

## Kluczowe ustalenia projektowe

- **Ceny** (kwoty w groszach w bazie): mały 250 g = 30 zł, średni 500 g = 45 zł, duży 900 g = 60 zł.
- **Płatności**: architektura gotowa pod Stripe **lub** Przelewy24 (BLIK, karta, przelew).
  Wybór operatora — do decyzji właściciela.
- **Dostawa**: Paczkomat InPost, kurier, bezpłatny odbiór osobisty z pasieki.
- **Język**: polski.
- **Darmowa dostawa** od progu 150 zł (konfigurowalne).

---

## Do dostarczenia przez właściciela przed wdrożeniem produkcyjnym

- Zdjęcia (pasieka, słoiki, etykiety, zespół) — w prototypie są oznaczone placeholdery.
- Finalne opisy produktów i ewentualne korekty cen.
- Dane firmy + konto u operatora płatności (weryfikacja KYC).
- Treść regulaminu i polityki prywatności (we współpracy z prawnikiem).

---

MELLIS · Pasieka rodzinna · dokumentacja v1.0 · czerwiec 2026
