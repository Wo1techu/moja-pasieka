/* ============================================================
   MELLIS — About, Gallery, Journal
   ============================================================ */
const { GALLERY: GAL, JOURNAL: JRN, FAQ: FAQ_, COMPANY: C2 } = window.MELLIS_DATA;

/* ============ ABOUT ============ */
function About({ go }) {
  useReveal();
  return (
    <div>
      <section style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div className="wrap" style={{ padding: '88px 32px 80px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }} className="story-grid">
          <div>
            <div className="eyebrow reveal in" style={{ color: 'var(--honey-glow)' }}>Pasieka rodzinna · od {C2.estd}</div>
            <h1 className="serif-xl reveal in" style={{ color: 'var(--cream)', fontSize: 'clamp(40px,5.5vw,82px)', marginTop: 16 }}>Pszczoły uczą cierpliwości</h1>
            <p className="reveal in" style={{ fontSize: 18.5, color: 'rgba(250,245,234,.74)', marginTop: 22, maxWidth: 480, lineHeight: 1.7 }}>
              Od ponad piętnastu lat prowadzimy pasiekę wśród łąk i lasów Bolimowskiego Parku Krajobrazowego. Bez pośpiechu, bez sztuczek — tak, jak robili to nasi dziadkowie.
            </p>
          </div>
          <Placeholder label="zdjęcie · pszczelarz w welonie przy ulu" dark className="reveal in" style={{ aspectRatio: '4/5', borderRadius: 'var(--radius-lg)' }} />
        </div>
      </section>

      {/* numbers */}
      <section className="section-sm" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'center' }}>
          {[[`${C2.hives}`, 'rodzin pszczelich'], [`${new Date().getFullYear()-(+C2.estd)}+`, 'lat doświadczenia'], ['6', 'odmian miodu'], ['0', 'sztucznych dodatków']].map(([n, l], i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i*60}ms` }}>
              <div className="serif-lg" style={{ color: 'var(--honey-deep)' }}>{n}</div>
              <div style={{ fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* values / process */}
      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 56px' }}>
            <div className="eyebrow reveal">Jak pracujemy</div>
            <h2 className="serif-lg reveal" style={{ marginTop: 12 }}>Od kwiatu do słoika</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 40 }} className="prod-grid">
            {[
              ['01', 'Łąki bez chemii', 'Ule stoją z dala od upraw przemysłowych — wśród dziko kwitnących łąk parku krajobrazowego.'],
              ['02', 'Wirowanie na zimno', 'Miód odbieramy dojrzały i wirujemy bez podgrzewania, by zachować enzymy i pyłki.'],
              ['03', 'Pakowanie ręczne', 'Każdy słoik napełniamy, etykietujemy i sprawdzamy własnoręcznie. Znamy historię każdej partii.'],
            ].map(([n, t, d], i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i*70}ms` }}>
                <div className="serif-lg" style={{ color: 'var(--line)', fontSize: 56 }}>{n}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, marginTop: 8 }}>{t}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, marginTop: 10, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quote */}
      <section className="section" style={{ background: 'var(--cream-deep)' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <span className="hex reveal" style={{ width: 22, height: 25, margin: '0 auto 24px' }} />
          <p className="serif-lg reveal" style={{ fontWeight: 400, fontStyle: 'italic', lineHeight: 1.35 }}>
            „Nie sprzedajemy miodu, który sami nie postawilibyśmy na własnym stole."
          </p>
          <div className="reveal" style={{ marginTop: 22, fontSize: 14, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Rodzina · Pasieka MELLIS</div>
        </div>
      </section>

      {/* FAQ + contact */}
      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="story-grid">
          <div className="reveal">
            <div className="eyebrow">Pytania</div>
            <h2 className="serif-md" style={{ marginTop: 12, marginBottom: 22 }}>Najczęściej pytacie</h2>
            <FAQList />
          </div>
          <div className="reveal" style={{ background: 'var(--ink)', color: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--honey-glow)' }}>Odbiór i kontakt</div>
            <h3 className="serif-md" style={{ color: 'var(--cream)', marginTop: 12 }}>Zapraszamy do pasieki</h3>
            <p style={{ color: 'rgba(250,245,234,.7)', marginTop: 14, lineHeight: 1.7 }}>
              Po wcześniejszym umówieniu można odebrać miód osobiście i zobaczyć, jak pracujemy. Zadzwoń lub napisz.
            </p>
            <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ContactRow icon="phone" label={C2.phone} href={`tel:${C2.phone}`} />
              <ContactRow icon="mail" label={C2.email} href={`mailto:${C2.email}`} />
              <ContactRow icon="pin" label={C2.region} />
            </div>
            <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => go('shop')}>Zamów miód online</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon, label, href }) {
  const paths = {
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>,
    mail: <g><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></g>,
    pin: <g><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></g>,
  };
  const inner = (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--cream)' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--honey-glow)" strokeWidth="1.6">{paths[icon]}</svg>
      <span style={{ fontSize: 15.5 }}>{label}</span>
    </span>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

function FAQList() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {FAQ_.map((f, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', padding: '18px 0', gap: 16 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>{f.q}</span>
            <span style={{ fontSize: 22, color: 'var(--honey)', transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : 'none', flex: 'none' }}>+</span>
          </button>
          <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.65, paddingBottom: 18 }}>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ GALLERY ============ */
function Gallery({ go }) {
  useReveal();
  return (
    <div>
      <section style={{ background: 'var(--cream-deep)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ padding: '64px 32px 56px', textAlign: 'center' }}>
          <div className="eyebrow reveal in">Galeria</div>
          <h1 className="serif-xl reveal in" style={{ fontSize: 'clamp(40px,5.5vw,76px)', marginTop: 14 }}>Z życia pasieki</h1>
          <p className="reveal in" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: 520, margin: '18px auto 0' }}>
            Łąki, ule i ludzie, którzy stoją za każdym słoikiem. Tu wkrótce pojawią się prawdziwe zdjęcia.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '230px', gap: 18 }} className="gallery-grid">
            {GAL.map((g, i) => (
              <Placeholder key={i} label={g.label} className="reveal" style={{ gridRow: g.tall ? 'span 2' : 'span 1', borderRadius: 'var(--radius-lg)', transitionDelay: `${i*50}ms` }} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn btn-primary" onClick={() => go('shop')}>Spróbuj naszego miodu</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============ JOURNAL ============ */
function Journal({ go }) {
  useReveal();
  const [active, setActive] = useState(null);
  if (active) {
    const a = JRN.find(x => x.id === active);
    return (
      <article className="wrap-narrow" style={{ padding: '48px 32px 96px' }}>
        <button onClick={() => setActive(null)} style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 24 }}>← Wszystkie wpisy</button>
        <div className="eyebrow">{a.kicker} · {a.date} · {a.read} czytania</div>
        <h1 className="serif-lg" style={{ marginTop: 14 }}>{a.title}</h1>
        <Placeholder label={`zdjęcie · ${a.kicker.toLowerCase()}`} style={{ aspectRatio: '16/8', borderRadius: 'var(--radius-lg)', margin: '32px 0' }} />
        <div style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: 18 }}>{a.excerpt}</p>
          <p style={{ marginBottom: 18 }}>To miejsce na pełną treść wpisu. Programista podłączy tu system zarządzania treścią (CMS), dzięki któremu samodzielnie dodacie kolejne artykuły, zdjęcia i przepisy — bez znajomości kodu.</p>
          <p style={{ marginBottom: 18 }}>Każdy wpis może mieć tytuł, kategorię, zdjęcie główne, czas czytania i dowolnie sformatowaną treść. Sekcja ta świetnie buduje zaufanie i pozycjonowanie sklepu w wyszukiwarce.</p>
          <div style={{ padding: 24, background: 'var(--amber-wash)', borderRadius: 'var(--radius-lg)', marginTop: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Spodobał Ci się wpis?</div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 16 }}>Zajrzyj do sklepu i wypróbuj miód, o którym piszemy.</p>
            <button className="btn btn-primary btn-sm" onClick={() => go('shop')}>Do sklepu</button>
          </div>
        </div>
      </article>
    );
  }
  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ padding: '64px 32px 56px', textAlign: 'center' }}>
          <div className="eyebrow reveal in">Dziennik pasieki</div>
          <h1 className="serif-xl reveal in" style={{ fontSize: 'clamp(40px,5.5vw,76px)', marginTop: 14 }}>Wiedza i przepisy</h1>
          <p className="reveal in" style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: 520, margin: '18px auto 0' }}>
            O miodzie, pszczołach i sezonie — prosto od pszczelarza.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="jrn-grid">
            {JRN.map((a, i) => (
              <button key={a.id} onClick={() => { setActive(a.id); window.scrollTo(0,0); }} className="reveal" style={{ textAlign: 'left', transitionDelay: `${i*60}ms` }}>
                <Placeholder label={`zdjęcie · ${a.kicker.toLowerCase()}`} style={{ aspectRatio: '3/2', borderRadius: 'var(--radius-lg)', marginBottom: 16 }} />
                <div className="eyebrow muted" style={{ fontSize: 10.5 }}>{a.kicker} · {a.date}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 25, marginTop: 10, lineHeight: 1.2 }}>{a.title}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginTop: 8 }}>{a.excerpt}</p>
                <span style={{ display: 'inline-block', marginTop: 14, fontSize: 13, fontWeight: 500, color: 'var(--honey-deep)', letterSpacing: '.04em' }}>Czytaj dalej →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { About, Gallery, Journal });
