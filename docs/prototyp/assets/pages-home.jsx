/* ============================================================
   MELLIS — Home page (3 hero variants) + shared home sections
   ============================================================ */
const { PRODUCTS: P_ALL, REVIEWS: R_ALL, JOURNAL: J_ALL, COMPANY: CO } = window.MELLIS_DATA;

/* ============ HERO VARIANT A — Editorial split ============ */
function HeroEditorial({ go }) {
  const feat = P_ALL.filter(p => p.bestseller).slice(0, 3);
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 40, alignItems: 'center', minHeight: 'calc(100vh - 76px)', padding: '40px 32px 60px' }}>
        <div className="hero-copy">
          <div className="chip reveal in" style={{ marginBottom: 26 }}><span className="hex" style={{ width: 10, height: 11 }} /> Pasieka rodzinna · od {CO.estd}</div>
          <h1 className="serif-xl reveal in" style={{ maxWidth: 640 }}>
            Miód prosto<br/>z plastra,<br/><em style={{ fontStyle: 'italic', color: 'var(--honey-deep)' }}>nie z półki.</em>
          </h1>
          <p className="reveal in" style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: 440, marginTop: 26, lineHeight: 1.65 }}>
            Pięćdziesiąt uli wśród łąk Bolimowskiego Parku Krajobrazowego. Niepasteryzowany, wirowany na zimno, z tym samym smakiem od pokoleń.
          </p>
          <div className="reveal in" style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => go('shop')}>Do sklepu</button>
            <button className="btn btn-ghost" onClick={() => go('about')}>Poznaj pasiekę</button>
          </div>
          <div className="reveal in" style={{ display: 'flex', gap: 30, marginTop: 46 }}>
            <Stat n="50" l="uli w pasiece" />
            <Stat n={`${new Date().getFullYear() - (+CO.estd)}+`} l="lat tradycji" />
            <Stat n="6" l="odmian miodu" />
          </div>
        </div>
        <div style={{ position: 'relative', height: '100%', minHeight: 460, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '78%', height: '82%', background: 'var(--amber-wash)', borderRadius: 200, filter: 'blur(2px)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 18, paddingBottom: 10 }}>
            <Jar product={feat[0]} w={120} />
            <Jar product={feat[1]} w={158} />
            <Jar product={feat[2]} w={120} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ HERO VARIANT B — Full-bleed image ============ */
function HeroFullbleed({ go }) {
  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 76px)', display: 'flex', marginTop: -76, paddingTop: 76 }}>
      <Placeholder label="zdjęcie tła · pasieka o złotej godzinie, łąki, ule" dark style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,15,8,.42) 0%, rgba(20,15,8,.62) 100%)' }} />
      <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2, padding: '80px 32px' }}>
        <div className="chip reveal in" style={{ background: 'rgba(250,245,234,.14)', color: 'var(--honey-glow)', marginBottom: 26 }}><span className="hex" style={{ width: 10, height: 11, background: 'var(--honey-glow)' }} /> Pasieka rodzinna · od {CO.estd}</div>
        <h1 className="serif-xl reveal in" style={{ color: 'var(--cream)', maxWidth: 820, marginBottom: 24 }}>Smak złotych łąk Bolimowa</h1>
        <p className="reveal in" style={{ fontSize: 19, color: 'rgba(250,245,234,.86)', maxWidth: 500 }}>
          Niepasteryzowany miód z 50 rodzinnych uli. Wirowany na zimno, prosto z plastra do słoika.
        </p>
        <div className="reveal in" style={{ display: 'flex', gap: 14, marginTop: 36 }}>
          <button className="btn btn-primary" onClick={() => go('shop')}>Do sklepu</button>
          <button className="btn" onClick={() => go('about')} style={{ background: 'rgba(250,245,234,.12)', color: 'var(--cream)', border: '1px solid rgba(250,245,234,.3)' }}>Nasza historia</button>
        </div>
      </div>
    </section>
  );
}

/* ============ HERO VARIANT C — Featured colour block ============ */
function HeroFeatured({ go }) {
  const hero = P_ALL.find(p => p.id === 'wielokwiatowy');
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--cream)', minHeight: 'calc(100vh - 76px)', display: 'flex', alignItems: 'center', marginTop: -76, paddingTop: 76 }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', padding: '60px 32px' }}>
        <div>
          <div className="eyebrow reveal in" style={{ color: 'var(--honey-glow)' }}>Miód miesiąca · zbiór z łąk</div>
          <h1 className="serif-xl reveal in" style={{ color: 'var(--cream)', marginTop: 18 }}>Wielokwiatowy</h1>
          <p className="reveal in" style={{ fontSize: 18, color: 'rgba(250,245,234,.72)', maxWidth: 440, marginTop: 22, lineHeight: 1.65 }}>
            {hero.short} Esencja całego sezonu zamknięta w jednym słoiku.
          </p>
          <div className="reveal in" style={{ marginTop: 30 }}>
            <span className="serif-lg" style={{ color: 'var(--honey-glow)', whiteSpace: 'nowrap' }}>od 30 zł</span>
            <div style={{ color: 'rgba(250,245,234,.55)', fontSize: 14, marginTop: 4 }}>trzy wielkości słoika do wyboru</div>
          </div>
          <div className="reveal in" style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => go('product', hero.id)}>Zobacz produkt</button>
            <button className="btn" onClick={() => go('shop')} style={{ background: 'transparent', color: 'var(--cream)', border: '1px solid rgba(250,245,234,.3)' }}>Wszystkie miody</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,178,60,.22), transparent 68%)' }} />
          <div style={{ position: 'relative', transform: 'scale(1.15)' }}><Jar product={hero} w={200} /></div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="serif-md" style={{ color: 'var(--honey-deep)', lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 12.5, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 6 }}>{l}</div>
    </div>
  );
}

/* ============ Shared: values strip ============ */
function ValuesStrip() {
  const items = [
    ['Niepasteryzowany', 'Nigdy nie podgrzewamy powyżej temperatury ula.'],
    ['Wirowany na zimno', 'Pełnia enzymów, pyłków i aromatu w każdym słoiku.'],
    ['Prosto od pszczelarza', 'Bez pośredników. Pakujemy własnoręcznie.'],
    ['Odbiór z pasieki', 'Zapraszamy po miód osobiście — i na rozmowę.'],
  ];
  return (
    <section className="section-sm" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28 }}>
        {items.map(([t, d], i) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i*70}ms` }}>
            <span className="hex" style={{ width: 14, height: 16 }} />
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 14 }}>{t}</h4>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginTop: 8 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ Shared: bestsellers ============ */
function Bestsellers({ go }) {
  const feat = P_ALL.filter(p => p.bestseller);
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="eyebrow reveal">Najczęściej wybierane</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>Bestsellery z pasieki</h2>
          </div>
          <button className="btn btn-ghost btn-sm reveal" onClick={() => go('shop')}>Zobacz wszystkie →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="prod-grid">
          {P_ALL.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} go={go} delay={i*60} />)}
        </div>
      </div>
    </section>
  );
}

/* ============ Product card ============ */
function ProductCard({ product, go, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => go('product', product.id)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="reveal" style={{
      background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
      padding: '28px 22px 22px', textAlign: 'left', transition: 'all .25s ease', transitionDelay: `${delay}ms`,
      transform: hov ? 'translateY(-4px)' : 'none', boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        {product.bestseller && <span className="chip" style={{ position: 'absolute', top: 0, left: 0, fontSize: 10, padding: '4px 9px' }}>Bestseller</span>}
        <div style={{ transition: 'transform .3s ease', transform: hov ? 'translateY(-4px) rotate(-2deg)' : 'none' }}><Jar product={product} w={104} /></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <h4 style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{product.name.replace('Miód ', '')}</h4>
        <span style={{ width: 12, height: 13, background: product.color, clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)', flex: 'none' }} />
      </div>
      <p style={{ color: 'var(--ink-faint)', fontSize: 13.5, marginTop: 5 }}>{product.tagline}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
        <span className="price-tag" style={{ fontSize: 15 }}>od 30 zł</span>
        <span style={{ fontSize: 12.5, color: hov ? 'var(--honey-deep)' : 'var(--ink-faint)', fontWeight: 500, letterSpacing: '.04em', transition: 'color .2s' }}>Wybierz →</span>
      </div>
    </button>
  );
}

/* ============ Shared: story teaser ============ */
function StoryTeaser({ go }) {
  return (
    <section className="section" style={{ background: 'var(--cream-deep)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }} className="story-grid">
        <Placeholder label="zdjęcie · pszczelarz przy ulu, rodzina" className="reveal" style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' }} />
        <div className="reveal">
          <div className="eyebrow">Nasza historia</div>
          <h2 className="serif-lg" style={{ marginTop: 14, maxWidth: 460 }}>Rodzinna pasieka, która nie idzie na skróty</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16.5, marginTop: 20, lineHeight: 1.7, maxWidth: 460 }}>
            Zaczęło się od kilku uli i pasji. Dziś prowadzimy 50 rodzin pszczelich wśród łąk i lasów Bolimowskiego Parku Krajobrazowego — w tym samym miejscu, tymi samymi metodami, z tym samym szacunkiem do pszczół.
          </p>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16.5, marginTop: 16, lineHeight: 1.7, maxWidth: 460 }}>
            Każdy słoik wirujemy, odstajemy i zamykamy własnymi rękami. Bez pasteryzacji, bez pośredników, bez kompromisów.
          </p>
          <button className="btn btn-dark" style={{ marginTop: 30 }} onClick={() => go('about')}>Poznaj pasiekę</button>
        </div>
      </div>
    </section>
  );
}

/* ============ Shared: reviews ============ */
function ReviewsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="eyebrow reveal">Opinie</div>
          <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>Co mówią nasi klienci</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }} className="rev-grid">
          {R_ALL.map((r, i) => (
            <div key={i} className="reveal" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 26, transitionDelay: `${i*60}ms`, display: 'flex', flexDirection: 'column' }}>
              <Stars n={r.rating} />
              <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.45, marginTop: 16, color: 'var(--ink)', flex: 1 }}>„{r.text}"</p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontWeight: 500, fontSize: 14.5 }}>{r.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-faint)' }}>{r.city} · {r.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Shared: journal teaser ============ */
function JournalTeaser({ go }) {
  return (
    <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="eyebrow reveal">Dziennik pasieki</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>Wiedza prosto z ula</h2>
          </div>
          <button className="btn btn-ghost btn-sm reveal" onClick={() => go('journal')}>Wszystkie wpisy →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="jrn-grid">
          {J_ALL.map((a, i) => (
            <button key={a.id} onClick={() => go('journal')} className="reveal" style={{ textAlign: 'left', transitionDelay: `${i*60}ms` }}>
              <Placeholder label={`zdjęcie · ${a.kicker.toLowerCase()}`} style={{ aspectRatio: '3/2', borderRadius: 'var(--radius-lg)', marginBottom: 16 }} />
              <div className="eyebrow muted" style={{ fontSize: 10.5 }}>{a.kicker} · {a.read}</div>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: 23, marginTop: 10, lineHeight: 1.2 }}>{a.title}</h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginTop: 8 }}>{a.excerpt}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ HOME assembly ============ */
function Home({ go, variant }) {
  useReveal();
  const Hero = variant === 'fullbleed' ? HeroFullbleed : variant === 'featured' ? HeroFeatured : HeroEditorial;
  return (
    <div>
      <Hero go={go} />
      <ValuesStrip />
      <Bestsellers go={go} />
      <StoryTeaser go={go} />
      <ReviewsSection />
      <JournalTeaser go={go} />
    </div>
  );
}

Object.assign(window, { Home, ProductCard });
