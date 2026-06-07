/* ============================================================
   MELLIS — App shell: router, cart state, tweaks
   ============================================================ */
const { useState: uS, useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeVariant": "editorial",
  "accent": ["#C8881E", "#A8631A"],
  "corners": "soft",
  "freeShipNote": true
}/*EDITMODE-END*/;

const ACCENTS = [
  ["#C8881E", "#A8631A"], // honey (default)
  ["#B5732A", "#8F520F"], // deep amber
  ["#A88A2E", "#7E6418"], // antique gold
  ["#6E7355", "#525736"], // sage olive
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = uS('home');
  const [param, setParam] = uS(null);
  const [cartOpen, setCartOpen] = uS(false);
  const [items, setItems] = uS(() => {
    try { return JSON.parse(localStorage.getItem('mellis_cart') || '[]'); } catch { return []; }
  });

  uE(() => { localStorage.setItem('mellis_cart', JSON.stringify(items)); }, [items]);

  // apply tweaks to :root
  uE(() => {
    const r = document.documentElement;
    const [a1, a2] = t.accent || ACCENTS[0];
    r.style.setProperty('--honey', a1);
    r.style.setProperty('--honey-deep', a2);
    r.style.setProperty('--c-accent', a1);
    r.style.setProperty('--radius', t.corners === 'sharp' ? '0px' : '4px');
    r.style.setProperty('--radius-lg', t.corners === 'sharp' ? '0px' : '10px');
  }, [t.accent, t.corners]);

  const go = (r, p = null) => { setRoute(r); setParam(p); if (r !== 'product') window.scrollTo(0, 0); };

  const addToCart = (product, size, qty) => {
    const key = `${product.id}-${size.id}`;
    setItems(prev => {
      const ex = prev.find(i => i.key === key);
      if (ex) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { key, product, size, qty }];
    });
  };
  const setQty = (key, qty) => setItems(prev => qty <= 0 ? prev.filter(i => i.key !== key) : prev.map(i => i.key === key ? { ...i, qty } : i));
  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key));
  const clearCart = () => setItems([]);

  const cartCount = items.reduce((a, b) => a + b.qty, 0);
  const subtotal = items.reduce((a, b) => a + b.size.price * b.qty, 0);

  let page;
  if (route === 'home') page = <Home go={go} variant={t.homeVariant} />;
  else if (route === 'shop') page = <Shop go={go} />;
  else if (route === 'product') page = <Product id={param} go={go} addToCart={(p,s,q) => { addToCart(p,s,q); }} />;
  else if (route === 'about') page = <About go={go} />;
  else if (route === 'gallery') page = <Gallery go={go} />;
  else if (route === 'journal') page = <Journal go={go} />;
  else if (route === 'checkout') page = <Checkout items={items} subtotal={subtotal} go={go} clearCart={clearCart} />;
  else page = <Home go={go} variant={t.homeVariant} />;

  const hideChrome = route === 'checkout';
  const overDark = route === 'home' && (t.homeVariant === 'fullbleed' || t.homeVariant === 'featured');

  return (
    <div>
      <Header route={route} go={go} cartCount={cartCount} onCart={() => setCartOpen(true)} overDark={overDark} />
      <main>{page}</main>
      {!hideChrome && <Newsletter />}
      <Footer go={go} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} setQty={setQty} removeItem={removeItem} go={go} subtotal={subtotal} />

      <TweaksPanel>
        <TweakSection label="Strona główna" />
        <TweakSelect label="Wariant hero" value={t.homeVariant}
          options={[['editorial','Edytorialny (split)'],['fullbleed','Pełnoekranowe zdjęcie'],['featured','Miód miesiąca']]}
          onChange={(v) => { setTweak('homeVariant', v); go('home'); }} />
        <TweakSection label="Marka" />
        <TweakColor label="Kolor akcentu" value={t.accent} options={ACCENTS} onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Narożniki" value={t.corners} options={[['soft','Miękkie'],['sharp','Ostre']]} onChange={(v) => setTweak('corners', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
