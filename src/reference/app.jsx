// ══════ Kashi Shakti — App Shell ═══════
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

function App() {
  // Persistent state (refresh-safe)
  const [direction, setDirection] = React.useState(() => localStorage.getItem('ks_dir') || 'ghat');
  const [page, setPage]     = React.useState(() => localStorage.getItem('ks_page') || 'home');
  const [pageState, setPgState] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ks_pstate')) || {}; }
    catch { return {}; }
  });
  const [city, setCity] = React.useState(() => {
    const id = localStorage.getItem('ks_city') || 'delhi';
    return window.KS_DATA.cities.find(c => c.id === id) || window.KS_DATA.cities[0];
  });
  const [user, setUser] = React.useState(() => localStorage.getItem('ks_user') === '1');
  const [authOpen, setAuthOpen] = React.useState(false);
  const [tweaksOn, setTweaksOn] = React.useState(false);

  // Persist
  React.useEffect(() => { localStorage.setItem('ks_dir', direction); window.applyDirection(direction); }, [direction]);
  React.useEffect(() => { localStorage.setItem('ks_page', page); window.scrollTo(0, 0); }, [page]);
  React.useEffect(() => { localStorage.setItem('ks_pstate', JSON.stringify(pageState)); }, [pageState]);
  React.useEffect(() => { localStorage.setItem('ks_city', city.id); }, [city]);
  React.useEffect(() => { localStorage.setItem('ks_user', user ? '1' : '0'); }, [user]);

  const setPage2 = (p) => setPage(p);
  const setPageState = (s) => setPgState(prev => ({ ...prev, ...s }));

  // Tweaks-mode (host-controlled)
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Route
  const today = window.KS_DATA.today;
  const routes = {
    'home':              <window.HomePage        setPage={setPage2} setPageState={setPageState}/>,
    'calendar':          <window.CalendarPage    setPage={setPage2} setPageState={setPageState} today={today} city={city}/>,
    'panchang-detail':   <window.PanchangDetail  setPage={setPage2}/>,
    'festivals':         <window.FestivalsPage   setPage={setPage2} setPageState={setPageState}/>,
    'festival-detail':   <window.FestivalDetail  setPage={setPage2} setPageState={setPageState} pageState={pageState}/>,
    'pujas':             <window.PujasPage       setPage={setPage2} setPageState={setPageState}/>,
    'puja-detail':       <window.PujaDetail      setPage={setPage2} setPageState={setPageState} pageState={pageState}/>,
    'checkout':          <window.CheckoutPage    setPage={setPage2} pageState={pageState}/>,
    'confirmation':      <window.ConfirmationPage setPage={setPage2} pageState={pageState}/>,
    'temples':           <window.TemplesPage     setPage={setPage2}/>,
    'admin':             <window.AdminPage       setPage={setPage2}/>,
    'profile':           <window.ProfilePage     setPage={setPage2} setPageState={setPageState}/>,
  };
  const view = routes[page] || routes.home;

  return (
    <>
      <window.TopNav
        page={page} setPage={setPage2}
        user={user}
        city={city} setCity={setCity} cities={window.KS_DATA.cities}
        onLogin={() => setAuthOpen(true)}
      />
      <div key={page + '_' + direction}>{view}</div>
      <window.Footer setPage={setPage2}/>
      {authOpen && <window.AuthModal onClose={() => setAuthOpen(false)} onLogin={() => setUser(true)}/>}
      {tweaksOn && <TweaksPanel direction={direction} setDirection={setDirection} onReset={() => { localStorage.clear(); location.reload(); }}/>}
    </>
  );
}

// Tweak panel — Direction switcher + goto Admin
function TweaksPanel({ direction, setDirection, onReset }) {
  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "direction": "ghat"
  }/*EDITMODE-END*/;

  const setDir = (d) => {
    setDirection(d);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { direction: d } }, '*');
  };

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 90,
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 18, width: 280,
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>🎛 Tweaks</div>
      <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Direction</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {[
          { id: 'ghat',  n: 'Ghat',        d: 'Warm editorial, cream base',  sw: ['#F6EFE3','#B23A1A','#7A1F1A'] },
          { id: 'aarti', n: 'Deep Aarti',  d: 'Candlelit, ember on ink',     sw: ['#14100C','#E88A3E','#E0B441'] },
        ].map(d => (
          <button key={d.id} onClick={() => setDir(d.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 10, borderRadius: 10, cursor: 'pointer',
              border: `1.5px solid ${direction === d.id ? 'var(--accent)' : 'var(--border)'}`,
              background: direction === d.id ? 'var(--accent-soft)' : 'var(--surface)',
              fontFamily: 'inherit', textAlign: 'left', width: '100%'
            }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {d.sw.map(c => <div key={c} style={{ width: 14, height: 22, background: c, borderRadius: 2 }}/>)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{d.n}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{d.d}</div>
            </div>
            {direction === d.id && <span style={{ fontSize: 14, color: 'var(--accent)' }}>✓</span>}
          </button>
        ))}
      </div>
      <button className="btn btn-ghost btn-sm" style={{ width: '100%' }} onClick={onReset}>↺ Reset all state</button>
    </div>
  );
}

// Footer
function Footer({ setPage }) {
  return (
    <footer style={{
      background: 'var(--bg-alt)',
      borderTop: '1px solid var(--border)',
      padding: '40px 0 28px',
      marginTop: 40
    }}>
      <div className="container" style={{ padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <window.Logo />
            <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 12, lineHeight: 1.7, maxWidth: 280 }}>
              Authentic Vedic rituals performed by verified pandits at India's most revered temples.
              सर्वे भवन्तु सुखिनः.
            </div>
          </div>
          {[
            { t: 'Services', l: ['Book Puja','Chadhava','Vrat Tracking','Panchang'] },
            { t: 'Temples',  l: ['Kashi Vishwanath','Ram Mandir','Siddhivinayak','All temples'] },
            { t: 'Company',  l: ['About','Careers','Press','Contact'] },
            { t: 'Support',  l: ['Help center','Refund policy','Terms','Operator login'], action: (i) => i === 3 && setPage('admin') },
          ].map((c, i) => (
            <div key={i}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{c.t}</div>
              {c.l.map((x, j) => (
                <div key={j} onClick={() => c.action && c.action(j)}
                  style={{ fontSize: 12, color: 'var(--ink-mid)', padding: '5px 0', cursor: c.action ? 'pointer' : 'default' }}>
                  {x}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, marginTop: 32, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--ink-muted)' }}>
          <span>© 2026 Kashi Shakti · Made with devotion in Varanasi</span>
          <span>🪔 1,24,000+ sankalps offered</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { App, Footer });

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
