/* ============================================================
   MELLIS — content & product data
   Wrapped in an IIFE so top-level names don't collide with the
   babel page scripts that destructure window.MELLIS_DATA.
   Prices: mały 250g = 30 zł, średni 500g = 45 zł, duży 900g = 60 zł
   ============================================================ */
(function () {
const SIZES = [
  { id: 's', label: 'Mały', weight: '250 g', price: 30 },
  { id: 'm', label: 'Średni', weight: '500 g', price: 45 },
  { id: 'l', label: 'Duży', weight: '900 g', price: 60 },
];

const PRODUCTS = [
  {
    id: 'rzepakowy',
    name: 'Miód rzepakowy',
    season: 'Maj',
    color: '#EBC85B',
    tagline: 'Kremowy, łagodny, maślany',
    short: 'Jasny i delikatny — pierwszy zbiór sezonu. Szybko krystalizuje w gładką, kremową masę.',
    notes: ['Delikatna słodycz', 'Maślana konsystencja', 'Krystalizacja kremowa'],
    pairing: 'Do pieczywa, naleśników i ciepłego mleka.',
    bestseller: true,
  },
  {
    id: 'akacjowy',
    name: 'Miód akacjowy',
    season: 'Czerwiec',
    color: '#F0DC9A',
    tagline: 'Klarowny, łagodny, długo płynny',
    short: 'Niemal przezroczysty, o subtelnej, kwiatowej słodyczy. Pozostaje płynny przez wiele miesięcy.',
    notes: ['Bardzo łagodny', 'Długo płynny', 'Waniliowy posmak'],
    pairing: 'Do herbaty, deserów i dla dzieci.',
    bestseller: true,
  },
  {
    id: 'lipowy',
    name: 'Miód lipowy',
    season: 'Lipiec',
    color: '#E2B544',
    tagline: 'Aromatyczny, ziołowy, rozgrzewający',
    short: 'Intensywny aromat kwitnącej lipy z miętowym chłodem. Ceniony w okresie przeziębień.',
    notes: ['Aromat lipy', 'Nuta miętowa', 'Rozgrzewający'],
    pairing: 'Do naparów ziołowych i z imbirem.',
    bestseller: false,
  },
  {
    id: 'wielokwiatowy',
    name: 'Miód wielokwiatowy',
    season: 'Maj–Sierpień',
    color: '#D89E2E',
    tagline: 'Pełny, łąkowy, zmienny',
    short: 'Esencja całego sezonu z łąk przy Bolimowskim Parku Krajobrazowym. Bogaty bukiet kwiatów.',
    notes: ['Bukiet łąkowy', 'Pełny smak', 'Naturalnie zmienny'],
    pairing: 'Uniwersalny — do wszystkiego.',
    bestseller: true,
  },
  {
    id: 'gryczany',
    name: 'Miód gryczany',
    season: 'Sierpień',
    color: '#7A4A1E',
    tagline: 'Ciemny, mocny, słodowy',
    short: 'Najciemniejszy z naszych miodów. Wyrazisty, korzenny smak i wyjątkowo gęsta konsystencja.',
    notes: ['Intensywny', 'Korzenno-słodowy', 'Najwięcej żelaza'],
    pairing: 'Do pieczywa razowego i serów dojrzewających.',
    bestseller: false,
  },
  {
    id: 'wrzosowy',
    name: 'Miód wrzosowy',
    season: 'Wrzesień',
    color: '#C56A2E',
    tagline: 'Galaretowaty, gorzkawy, rzadki',
    short: 'Najrzadszy zbiór roku o galaretowatej strukturze i charakterystycznej, lekko gorzkiej nucie.',
    notes: ['Galaretowata struktura', 'Lekko gorzkawy', 'Limitowany zbiór'],
    pairing: 'Dla koneserów — solo, na łyżeczce.',
    bestseller: false,
  },
];

const REVIEWS = [
  { name: 'Anna K.', city: 'Warszawa', text: 'Miód rzepakowy jak z dzieciństwa — kremowy, naturalny, bez żadnych dodatków. Zamawiam regularnie.', product: 'Miód rzepakowy', rating: 5 },
  { name: 'Marek W.', city: 'Łowicz', text: 'Gryczany powalający. Czuć, że to prawdziwa, rodzinna robota, a nie miód ze sklepowej półki.', product: 'Miód gryczany', rating: 5 },
  { name: 'Joanna P.', city: 'Skierniewice', text: 'Odbierałam osobiście z pasieki — przemiła rozmowa i można było zobaczyć ule. Polecam całym sercem.', product: 'Odbiór osobisty', rating: 5 },
  { name: 'Tomasz L.', city: 'Łódź', text: 'Akacjowy dla córki — jedyny miód, który je. Długo zostaje płynny, idealny do herbaty.', product: 'Miód akacjowy', rating: 5 },
];

const JOURNAL = [
  { id: 'krystalizacja', kicker: 'Wiedza', title: 'Dlaczego miód krystalizuje — i czemu to dobrze', date: '12 maja 2026', read: '4 min', excerpt: 'Krystalizacja to naturalny dowód jakości, nie wada. Wyjaśniamy, jak bezpiecznie przywrócić miód do postaci płynnej.' },
  { id: 'sezon', kicker: 'Pasieka', title: 'Kalendarz zbiorów: od rzepaku do wrzosu', date: '28 kwietnia 2026', read: '6 min', excerpt: 'Każdy miód ma swój moment. Przeprowadzamy przez cały sezon pasieczny — miesiąc po miesiącu.' },
  { id: 'przepisy', kicker: 'Kuchnia', title: 'Trzy sposoby na miód, których nie znałeś', date: '3 kwietnia 2026', read: '5 min', excerpt: 'Marynata, dressing i domowy syrop na gardło. Proste przepisy z naszych słoików.' },
];

const GALLERY = [
  { label: 'pasieka · 50 uli wśród łąk', tall: true },
  { label: 'ramka z plastrem miodu' },
  { label: 'wirowanie miodu' },
  { label: 'rodzinny zbiór' },
  { label: 'słoiki na drewnie', tall: true },
  { label: 'kwitnąca lipa' },
];

const FAQ = [
  { q: 'Jak długo trwa wysyłka?', a: 'Zamówienia realizujemy w 1–2 dni robocze. Paczka dociera kurierem lub do Paczkomatu InPost zwykle następnego dnia.' },
  { q: 'Czy mogę odebrać miód osobiście?', a: 'Tak. Zapraszamy do pasieki w okolicy Bolimowskiego Parku Krajobrazowego po wcześniejszym umówieniu. Odbiór osobisty jest bezpłatny.' },
  { q: 'Czy miód jest pasteryzowany?', a: 'Nie. Nigdy nie podgrzewamy miodu powyżej temperatury ula. Zachowuje pełnię enzymów, pyłków i aromatu.' },
  { q: 'Co zrobić, gdy miód się skrystalizował?', a: 'To naturalne. Wystarczy podgrzać słoik w kąpieli wodnej do maks. 40°C, by wrócił do postaci płynnej.' },
];

const COMPANY = {
  name: 'MELLIS',
  estd: '2008',
  hives: 50,
  tagline: 'Pasieka rodzinna',
  region: 'Bolimowski Park Krajobrazowy',
  phone: '+48 600 000 000',
  email: 'pasieka@mellis.pl',
  addr: 'Pasieka MELLIS, okolice Bolimowskiego Parku Krajobrazowego',
};

const DELIVERY = [
  { id: 'paczkomat', name: 'Paczkomat InPost', time: '1–2 dni robocze', price: 12 },
  { id: 'kurier', name: 'Kurier (DPD / InPost)', time: '1–2 dni robocze', price: 16 },
  { id: 'odbior', name: 'Odbiór osobisty z pasieki', time: 'po umówieniu', price: 0 },
];

window.MELLIS_DATA = { SIZES, PRODUCTS, REVIEWS, JOURNAL, GALLERY, FAQ, COMPANY, DELIVERY };
})();
