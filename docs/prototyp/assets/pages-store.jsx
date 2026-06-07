/* ============================================================
   MELLIS — Shop, Product, Cart, Checkout
   ============================================================ */
const { PRODUCTS, SIZES, DELIVERY } = window.MELLIS_DATA;

/* ============ SHOP / listing ============ */
function Shop({ go }) {
  useReveal();
  const [filter, setFilter] = useState('all');
  const filters = [['all', 'Wszystkie'], ['best', 'Bestsellery'], ['light', 'Łagodne'], ['strong', 'Wyraziste']];
  const lightIds = ['rzepakowy', 'akacjowy', 'wielokwiatowy'];
  const list = PRODUCTS.filter(p =>
    filter === 'all' ? true :
    filter === 'best' ? p.bestseller :
    filter === 'light' ? lightIds.includes(p.id) : !lightIds.includes(p.id)
  );
  return (
    <div>
      <section style={{ background: 'var(--cream-deep)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ padding: '64px 32px 56px', textAlign: 'center' }}>
          <div className="eyebrow reveal in">Sklep · zbiory {new Date().getFullYear()}</div>
          <h1 className="serif-xl reveal in" style={{ fontSize: 'clamp(40px,5.5vw,76px)', marginTop: 14 }}>Nasze miody</h1>
          <p className="reveal in" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: 540, margin: '18px auto 0' }}>
            Sześć odmian z jednej pasieki. Każda dostępna w trzech wielkościach słoika — od 250 do 900 gramów.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 44, flexWrap: 'wrap' }}>
            {filters.map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)} style={{
                padding: '9px 20px', borderRadius: 100, fontSize: 13, fontWeight: 500, letterSpacing: '.04em',
                border: '1px solid', borderColor: filter === id ? 'var(--honey)' : 'var(--line)',
                background: filter === id ? 'var(--honey)' : 'transparent',
                color: filter === id ? '#fff' : 'var(--ink-soft)', transition: 'all .18s',
              }}>{label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }} className="prod-grid">
            {list.map((p, i) => <ProductCard key={p.id} product={p} go={go} delay={i*50} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============ PRODUCT detail ============ */
function Product({ id, go, addToCart }) {
  useReveal();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [size, setSize] = useState(SIZES[1]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const doAdd = () => {
    addToCart(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="wrap" style={{ paddingTop: 28 }}>
        <div style={{ fontSize: 13, color: 'var(--ink-faint)', display: 'flex', gap: 8 }}>
          <button onClick={() => go('home')}>Start</button><span>/</span>
          <button onClick={() => go('shop')}>Sklep</button><span>/</span>
          <span style={{ color: 'var(--ink-soft)' }}>{product.name}</span>
        </div>
      </div>
      <section style={{ padding: '32px 0 80px' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="pdp-grid">
          {/* visual */}
          <div style={{ position: 'sticky', top: 100, background: 'var(--cream-deep)', borderRadius: 'var(--radius-lg)', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480 }} className="pdp-visual">
            <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${product.color}33, transparent 70%)` }} />
            <div style={{ position: 'relative', transform: 'scale(1.1)' }}><Jar product={product} w={210} /></div>
          </div>
          {/* details */}
          <div>
            {product.bestseller && <div className="chip" style={{ marginBottom: 16 }}>Bestseller</div>}
            <h1 className="serif-lg" style={{ fontSize: 'clamp(36px,4vw,52px)' }}>{product.name}</h1>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--honey-deep)', marginTop: 8 }}>{product.tagline}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <Stars n={5} size={15} /><span style={{ fontSize: 13.5, color: 'var(--ink-faint)' }}>Zbiór: {product.season}</span>
            </div>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.7, marginTop: 22, maxWidth: 480 }}>{product.short}</p>

            {/* notes */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
              {product.notes.map((n, i) => <span key={i} className="chip" style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink-soft)' }}>{n}</span>)}
            </div>

            <div className="rule" style={{ margin: '32px 0' }} />

            {/* size selector */}
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 12 }}>Wielkość słoika</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {SIZES.map(s => (
                <button key={s.id} onClick={() => setSize(s)} style={{
                  border: '1px solid', borderColor: size.id === s.id ? 'var(--honey)' : 'var(--line)',
                  background: size.id === s.id ? 'var(--amber-wash)' : 'var(--paper)',
                  borderRadius: 'var(--radius)', padding: '14px 12px', textAlign: 'center', transition: 'all .16s',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--ink)' }}>{s.label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', margin: '3px 0 6px' }}>{s.weight}</div>
                  <div className="price-tag" style={{ fontSize: 16, color: 'var(--honey-deep)' }}>{fmt(s.price)}</div>
                </button>
              ))}
            </div>

            {/* qty + add */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--paper)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0 16px', fontSize: 20, color: 'var(--ink-soft)', height: '100%' }}>−</button>
                <span style={{ minWidth: 34, textAlign: 'center', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ padding: '0 16px', fontSize: 20, color: 'var(--ink-soft)', height: '100%' }}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={doAdd}>
                {added ? '✓ Dodano do koszyka' : `Do koszyka · ${fmt(size.price * qty)}`}
              </button>
            </div>

            {/* meta */}
            <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Meta icon="leaf" text="Niepasteryzowany, wirowany na zimno — pełnia enzymów i pyłków." />
              <Meta icon="truck" text="Wysyłka 1–2 dni roboczych. Darmowa dostawa od 150 zł." />
              <Meta icon="pin" text="Możliwy bezpłatny odbiór osobisty z pasieki." />
            </div>
            <div style={{ marginTop: 26, padding: 18, background: 'var(--amber-wash)', borderRadius: 'var(--radius)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ width: 36, height: 40, background: product.color, clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)', flex: 'none' }} />
              <div><div style={{ fontWeight: 500, fontSize: 14.5 }}>Najlepiej smakuje z:</div><div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{product.pairing}</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="section" style={{ background: 'var(--cream-deep)' }}>
        <div className="wrap">
          <h2 className="serif-md reveal" style={{ marginBottom: 32 }}>Może Ci również zasmakować</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }} className="prod-grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} go={go} delay={i*50} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function Meta({ icon, text }) {
  const paths = {
    leaf: <path d="M5 19c0-7 6-12 14-12 0 8-6 13-14 12zM5 19c2-3 5-5 8-6" />,
    truck: <g><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></g>,
    pin: <g><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></g>,
  };
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--honey-deep)" strokeWidth="1.5" style={{ flex: 'none', marginTop: 1 }}>{paths[icon]}</svg>
      <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{text}</span>
    </div>
  );
}

/* ============ CART drawer ============ */
function CartDrawer({ open, onClose, items, setQty, removeItem, go, subtotal }) {
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(42,32,20,.4)', zIndex: 90,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity .3s',
      }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(440px, 92vw)', background: 'var(--cream)',
        zIndex: 91, boxShadow: 'var(--shadow-lg)', transform: open ? 'none' : 'translateX(100%)',
        transition: 'transform .34s cubic-bezier(.2,.7,.3,1)', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 26px', borderBottom: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26 }}>Koszyk {items.length > 0 && <span style={{ color: 'var(--ink-faint)', fontSize: 18 }}>· {items.reduce((a,b)=>a+b.qty,0)}</span>}</h3>
          <button onClick={onClose} aria-label="Zamknij" style={{ padding: 6, color: 'var(--ink-soft)' }}><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        </div>

        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', gap: 18 }}>
            <span className="hex" style={{ width: 30, height: 34, opacity: .4 }} />
            <p style={{ color: 'var(--ink-faint)', fontSize: 16 }}>Twój koszyk jest pusty.</p>
            <button className="btn btn-primary btn-sm" onClick={() => { onClose(); go('shop'); }}>Wybierz miód</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 26px' }}>
              {items.map((it) => (
                <div key={it.key} style={{ display: 'flex', gap: 14, padding: '20px 0', borderBottom: '1px solid var(--line-soft)' }}>
                  <div style={{ width: 60, height: 78, background: 'var(--cream-deep)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Jar product={it.product} w={40} label={false} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{it.product.name.replace('Miód ','')}</div>
                      <button onClick={() => removeItem(it.key)} style={{ color: 'var(--ink-faint)', fontSize: 12 }} aria-label="Usuń">✕</button>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{it.size.label} · {it.size.weight}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
                        <button onClick={() => setQty(it.key, it.qty - 1)} style={{ padding: '4px 11px', color: 'var(--ink-soft)' }}>−</button>
                        <span style={{ minWidth: 22, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{it.qty}</span>
                        <button onClick={() => setQty(it.key, it.qty + 1)} style={{ padding: '4px 11px', color: 'var(--ink-soft)' }}>+</button>
                      </div>
                      <span className="price-tag" style={{ fontSize: 15 }}>{fmt(it.size.price * it.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, color: 'var(--ink-soft)' }}><span>Wartość produktów</span><span className="price-tag">{fmt(subtotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 13, color: 'var(--ink-faint)' }}><span>Dostawa</span><span>{subtotal >= 150 ? 'gratis' : 'liczona w kroku dostawy'}</span></div>
              <button className="btn btn-primary btn-block" onClick={() => { onClose(); go('checkout'); }}>Przejdź do kasy</button>
              <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 10 }} onClick={() => { onClose(); go('shop'); }}>Kontynuuj zakupy</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { Shop, Product, CartDrawer });
