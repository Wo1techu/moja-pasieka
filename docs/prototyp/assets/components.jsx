/* ============================================================
   MELLIS — shared components
   Loaded as Babel script; exports to window at the end.
   ============================================================ */
const { useState, useEffect, useRef } = React;
const fmt = (n) => `${n.toFixed(0)} zł`;

/* ---------- Logo / wordmark ---------- */
function Logo({ size = 26, mark = true, light = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.42 }}>
      {mark && (
        <span style={{ position: 'relative', width: size * 0.92, height: size * 0.92, flex: 'none' }}>
          <span style={{
            position: 'absolute', inset: 0,
            background: light ? 'var(--honey-glow)' : 'var(--honey)',
            clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
          }} />
          <span style={{
            position: 'absolute', inset: '24%',
            background: light ? 'var(--ink)' : 'var(--cream)',
            clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
          }} />
        </span>
      )}
      <span style={{
        fontFamily: 'var(--serif)', fontWeight: 600, fontSize: size,
        letterSpacing: '.14em', lineHeight: 1,
        color: light ? 'var(--cream)' : 'var(--ink)',
        textTransform: 'uppercase', paddingLeft: '.05em',
      }}>Mellis</span>
    </span>
  );
}

/* ---------- Star rating ---------- */
function Stars({ n = 5, size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--honey)' }} aria-label={`${n} z 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.8 6.1 20.8l1.3-6.6L2.5 9.6l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/* ---------- Striped placeholder (photos to be supplied) ---------- */
function Placeholder({ label, className = '', dark = false, style = {} }) {
  return (
    <div className={`ph ${dark ? 'ph-dark' : ''} ${className}`} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ---------- CSS honey jar (premium product visual) ---------- */
function Jar({ product, w = 132, label = true }) {
  const c = product.color;
  const h = w * 1.5;
  return (
    <div style={{ width: w, height: h, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 14px 22px rgba(42,32,20,.18))' }}>
      {/* lid */}
      <div style={{
        width: w * 0.62, height: h * 0.11, background: 'linear-gradient(180deg,#3a2c1a,#2a2014)',
        borderRadius: `${w*0.05}px ${w*0.05}px 3px 3px`, position: 'relative', zIndex: 3,
      }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: h*0.028, background: '#241a0f', borderRadius: 2 }} />
      </div>
      {/* neck */}
      <div style={{ width: w * 0.7, height: h * 0.05, background: 'linear-gradient(90deg,rgba(255,255,255,.25),rgba(255,255,255,.04))', backgroundColor: c, marginTop: 2, borderRadius: '3px 3px 0 0', zIndex: 1 }} />
      {/* body */}
      <div style={{
        width: w, height: h * 0.78, borderRadius: `${w*0.16}px ${w*0.16}px ${w*0.1}px ${w*0.1}px`,
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${c} 0%, ${shade(c,-14)} 100%)`,
      }}>
        {/* glass highlight */}
        <div style={{ position: 'absolute', top: '6%', left: '12%', width: '18%', height: '80%', borderRadius: '40%', background: 'linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0))' }} />
        <div style={{ position: 'absolute', top: '6%', right: '9%', width: '8%', height: '60%', borderRadius: '40%', background: 'linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0))' }} />
        {/* label */}
        {label && (
          <div style={{
            position: 'absolute', left: '11%', right: '11%', top: '30%', bottom: '12%',
            background: 'var(--paper)', borderRadius: 3, boxShadow: '0 2px 6px rgba(0,0,0,.12)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: w*0.03,
            border: '1px solid rgba(168,99,26,.2)', padding: 6, textAlign: 'center',
          }}>
            <span style={{ width: w*0.11, height: w*0.12, background: c, clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)' }} />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: w*0.115, letterSpacing: '.14em', color: 'var(--ink)', lineHeight: 1 }}>MELLIS</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: w*0.07, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', lineHeight: 1.2 }}>{product.name.replace('Miód ', '')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* shade a hex color by percent (-darker / +lighter) */
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = pct / 100;
  r = Math.round(r + (f < 0 ? r : 255 - r) * f);
  g = Math.round(g + (f < 0 ? g : 255 - g) * f);
  b = Math.round(b + (f < 0 ? b : 255 - b) * f);
  return `rgb(${r},${g},${b})`;
}

/* ---------- Scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- Header ---------- */
function Header({ route, go, cartCount, onCart, overDark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn(); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn);
  }, []);
  const light = overDark && !scrolled;
  const nav = [
    ['shop', 'Sklep'], ['about', 'O nas'], ['gallery', 'Galeria'], ['journal', 'Dziennik'],
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(250,245,234,.86)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all .3s ease',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
        <button onClick={() => go('home')} aria-label="MELLIS — strona główna"><Logo size={24} light={light} /></button>
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-desktop">
          {nav.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{
              fontSize: 13.5, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase',
              padding: '9px 16px', color: route === id ? 'var(--honey-deep)' : (light ? 'rgba(250,245,234,.82)' : 'var(--ink-soft)'),
              borderBottom: route === id ? '1.5px solid var(--honey)' : '1.5px solid transparent',
              transition: 'color .18s',
            }}>{label}</button>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onCart} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 8px', color: light ? 'var(--cream)' : 'var(--ink)' }} aria-label="Koszyk">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/><path d="M8.5 7V6a3.5 3.5 0 0 1 7 0v1"/></svg>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: -2, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 10, background: 'var(--honey)', color: '#fff', fontSize: 10.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </button>
          <button className="nav-burger" onClick={() => setOpen(!open)} style={{ display: 'none', padding: 8, color: light ? 'var(--cream)' : 'var(--ink)' }} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--line)', background: 'var(--cream)' }}>
          {nav.map(([id, label]) => (
            <button key={id} onClick={() => { go(id); setOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '15px 20px', fontSize: 15, fontWeight: 500, borderBottom: '1px solid var(--line-soft)' }}>{label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Newsletter strip ---------- */
function Newsletter() {
  const [v, setV] = useState(''); const [done, setDone] = useState(false);
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
      <div className="wrap section-sm news-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--honey-glow)' }}>List z pasieki</div>
          <h2 className="serif-md" style={{ color: 'var(--cream)', marginTop: 14, maxWidth: 460 }}>Pierwsi dowiecie się o nowych zbiorach</h2>
          <p style={{ color: 'rgba(250,245,234,.62)', marginTop: 12, maxWidth: 420 }}>Kilka listów w roku — o sezonie, limitowanych miodach wrzosowych i przepisach. Bez spamu.</p>
        </div>
        {done ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--honey-glow)' }}>
            <div className="hex" style={{ width: 18, height: 20 }} />
            <span style={{ fontSize: 16 }}>Dziękujemy! Sprawdź skrzynkę.</span>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (v.includes('@')) setDone(true); }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input value={v} onChange={(e) => setV(e.target.value)} type="email" required placeholder="Twój e-mail" style={{ flex: '1 1 200px', minWidth: 0, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(250,245,234,.22)', color: 'var(--cream)', borderRadius: 'var(--radius)', padding: '14px 16px', fontFamily: 'var(--sans)', fontSize: 15 }} />
            <button className="btn btn-primary" type="submit">Zapisz się</button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer({ go }) {
  const C = window.MELLIS_DATA.COMPANY;
  return (
    <footer style={{ background: 'var(--cream-deep)', borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ padding: '64px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40 }} className="foot-grid">
          <div>
            <Logo size={26} />
            <p style={{ color: 'var(--ink-soft)', marginTop: 18, maxWidth: 280, fontSize: 14.5 }}>
              Rodzinna pasieka 50 uli w okolicy Bolimowskiego Parku Krajobrazowego. Miód prosto z plastra od {C.estd} roku.
            </p>
            <div className="chip" style={{ marginTop: 18 }}><span className="hex" style={{ width: 10, height: 11 }} /> 100% naturalny · niepasteryzowany</div>
          </div>
          <FootCol title="Sklep" links={[['shop','Wszystkie miody'],['shop','Bestsellery'],['shop','Zestawy prezentowe'],['about','Odbiór osobisty']]} go={go} />
          <FootCol title="Pasieka" links={[['about','O nas'],['gallery','Galeria'],['journal','Dziennik'],['about','Kontakt']]} go={go} />
          <div>
            <h4 style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>Kontakt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14.5, color: 'var(--ink-soft)' }}>
              <a href={`tel:${C.phone}`}>{C.phone}</a>
              <a href={`mailto:${C.email}`}>{C.email}</a>
              <span>{C.region}</span>
            </div>
          </div>
        </div>
        <div className="rule" style={{ margin: '40px 0 22px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--ink-faint)' }}>
          <span>© {new Date().getFullYear()} MELLIS · Pasieka rodzinna</span>
          <span style={{ display: 'flex', gap: 20 }}><a href="#">Regulamin</a><a href="#">Polityka prywatności</a><a href="#">Dostawa i zwroty</a></span>
        </div>
      </div>
    </footer>
  );
}
function FootCol({ title, links, go }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14.5, color: 'var(--ink-soft)' }}>
        {links.map(([id, label], i) => <button key={i} onClick={() => go(id)} style={{ textAlign: 'left' }}>{label}</button>)}
      </div>
    </div>
  );
}

Object.assign(window, { Logo, Stars, Placeholder, Jar, shade, useReveal, Header, Newsletter, Footer, fmt });
