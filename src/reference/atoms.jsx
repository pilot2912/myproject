// ══════ Kashi Shakti — Shared Atoms ═══════
import * as React from 'react'

// App context
window.AppCtx = React.createContext(null);

// Logo
function Logo({ size = 'md' }) {
  const s = size === 'lg' ? { m: 36, f: 22 } : { m: 30, f: 19 };
  return (
    <div className="nav-logo">
      <div className="nav-logo-mark" style={{ width: s.m, height: s.m }}>ॐ</div>
      <div>
        Kashi <span style={{ fontWeight: 400 }}>Shakti</span>
        <span className="dn"> · काशी शक्ति</span>
      </div>
    </div>
  );
}

// Top nav
function TopNav({ page, setPage, user, city, setCity, cities, onLogin }) {
  const items = [
    { id: 'home',      label: 'Home' },
    { id: 'calendar',  label: 'Panchang' },
    { id: 'festivals', label: 'Festivals & Vrats' },
    { id: 'pujas',     label: 'Book Puja' },
    { id: 'temples',   label: 'Temples' },
  ];
  const [cityOpen, setCityOpen] = React.useState(false);
  return (
    <nav className="nav">
      <div onClick={() => setPage('home')}><Logo /></div>
      <div className="nav-links">
        {items.map(it => (
          <button key={it.id}
            className={'nav-link ' + (page === it.id ? 'active' : '')}
            onClick={() => setPage(it.id)}>
            {it.label}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <div style={{ position: 'relative' }}>
          <button className="city-pill" onClick={() => setCityOpen(o => !o)}>
            <span className="dot"/>
            {city.name}
            <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
          </button>
          {cityOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: 6, minWidth: 180, zIndex: 30,
              boxShadow: 'var(--shadow-lg)'
            }}>
              {cities.map(c => (
                <button key={c.id} onClick={() => { setCity(c); setCityOpen(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 10px', borderRadius: 6, background: 'transparent',
                    border: 'none', fontSize: 12, color: 'var(--ink)', cursor: 'pointer',
                    fontWeight: c.id === city.id ? 600 : 400,
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--border-soft)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {user ? (
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('profile')}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--accent)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600
            }}>R</span>
            Rahul
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onLogin}>Sign in</button>
        )}
      </div>
    </nav>
  );
}

// Panchang micro bar (reused)
function PanchangBar({ today, compact = false }) {
  const items = [
    { l: 'Tithi',     v: today.tithi,     sub: 'ends ' + today.tithiEnds },
    { l: 'Nakshatra', v: today.nakshatra, sub: 'ends ' + today.nakshatraEnds },
    { l: 'Yoga',      v: today.yoga,      sub: 'ends ' + today.yogaEnds },
    { l: 'Karana',    v: today.karana,    sub: today.karanaChange },
    { l: 'Sunrise',   v: today.sunrise,   sub: 'Sunset ' + today.sunset },
  ];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      overflow: 'hidden'
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: compact ? '10px 14px' : '14px 18px',
          borderRight: i < items.length - 1 ? '1px solid var(--border-soft)' : 'none'
        }}>
          <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>{it.l}</div>
          <div className="serif" style={{ fontSize: compact ? 15 : 17, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{it.v}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-muted)', marginTop: 2 }}>{it.sub}</div>
        </div>
      ))}
    </div>
  );
}

// Page header
function PageHeader({ eyebrow, title, sub, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, padding: '32px 0 24px' }}>
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
        <h1 className="display" style={{ fontSize: 38, lineHeight: 1.05, color: 'var(--ink)' }}>{title}</h1>
        {sub && <div style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 8, maxWidth: 640 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Section header (smaller, within a page)
function SectionHeader({ title, sub, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
      <div>
        <h2 className="display" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1.1 }}>{title}</h2>
        {sub && <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

// Status dot
function StatusBadge({ status }) {
  const map = {
    confirmed: { bg: 'var(--success)', c: 'var(--green)',  l: 'Confirmed' },
    progress:  { bg: 'var(--warning)', c: 'var(--gold)',   l: 'In Progress' },
    completed: { bg: 'var(--info)',    c: 'var(--blue)',   l: 'Completed' },
    cancelled: { bg: 'var(--danger)',  c: 'var(--red)',    l: 'Cancelled' },
  };
  const s = map[status] || map.confirmed;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px',
      background: s.bg, color: s.c,
      fontSize: 11, fontWeight: 600,
      borderRadius: 12
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.c }}/>
      {s.l}
    </span>
  );
}

// Image placeholder with a label
function ImgPh({ label = 'image', style = {} }) {
  return <div className="img-ph" style={{ minHeight: 120, ...style }}>{label}</div>;
}

// Compact rupee formatter
function rs(n) {
  return '₹' + n.toLocaleString('en-IN');
}
window.rs = rs;

// Expose
Object.assign(window, { Logo, TopNav, PanchangBar, PageHeader, SectionHeader, StatusBadge, ImgPh });
