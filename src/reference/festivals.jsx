// ══════ Kashi Shakti — Festivals & Vrats ═══════
import * as React from 'react'

function FestivalsPage({ setPage, setPageState }) {
  const [filter, setFilter] = React.useState('all');
  const fests = window.KS_DATA.festivals;
  const vrats = window.KS_DATA.vrats;
  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <PageHeader
        eyebrow="Vrats & Festivals · 2026"
        title="Observe the calendar"
        sub="Nine-day Navratris, lunar fasts, seasonal festivals — tracked, explained, and ready to book."
      />
      <div className="seg" style={{ marginBottom: 20, width: 'fit-content' }}>
        {[['all','All'],['fest','Festivals'],['vrat','Vrats'],['ekad','Ekadashi']].map(([k,l]) => (
          <button key={k} className={filter===k?'on':''} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {(filter === 'all' || filter === 'fest') && fests.map(f => (
          <div key={f.id} className="card card-hover"
            style={{ padding: 20, display: 'flex', gap: 18, cursor: 'pointer', alignItems: 'center' }}
            onClick={() => { setPageState({ festId: f.id }); setPage('festival-detail'); }}>
            <div style={{
              minWidth: 72, textAlign: 'center',
              padding: '12px 10px',
              background: 'var(--accent-soft)', borderRadius: 10,
            }}>
              <div className="display" style={{ fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>{f.d}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>{f.m} 2026</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>{f.tithi} · {f.deity}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="chip chip-accent">{f.tag}</span>
                <span className="chip">Festival</span>
              </div>
            </div>
          </div>
        ))}
        {(filter === 'all' || filter === 'vrat' || filter === 'ekad') && vrats.map(v => (
          <div key={v.name} className="card card-hover" style={{ padding: 20, display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ minWidth: 72, textAlign: 'center', padding: '12px 10px', background: 'var(--success)', borderRadius: 10 }}>
              <div className="display" style={{ fontSize: 32, color: 'var(--green)', lineHeight: 1 }}>{v.d}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>{v.m} 2026</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>{v.tithi} · {v.deity}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="chip chip-good">Vrat</span>
                {v.streak > 0 && <span className="chip">🔥 {v.streak}-streak</span>}
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">🔔 Remind</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FestivalDetail({ pageState, setPage, setPageState }) {
  const fest = window.KS_DATA.festivals.find(f => f.id === pageState.festId) || window.KS_DATA.festivals[0];
  const navratriDays = [
    { n: 1, nm: 'Shailputri',     cl: '#F5C842', pr: 'Ghee prasad',     tm: 'Ghatasthapana 6:02–10:14 AM' },
    { n: 2, nm: 'Brahmacharini',  cl: '#6A8F3E', pr: 'Sugar prasad',    tm: '' },
    { n: 3, nm: 'Chandraghanta',  cl: '#8A8A8A', pr: 'Milk sweets',     tm: '' },
    { n: 4, nm: 'Kushmanda',      cl: '#D97742', pr: 'Malpua',          tm: '' },
    { n: 5, nm: 'Skandamata',     cl: '#5BA890', pr: 'Banana',          tm: '' },
    { n: 6, nm: 'Katyayani',      cl: '#D4415C', pr: 'Honey',           tm: '' },
    { n: 7, nm: 'Kaalratri',      cl: '#3B3B3B', pr: 'Jaggery',         tm: '' },
    { n: 8, nm: 'Mahagauri',      cl: '#C2B280', pr: 'Coconut',         tm: 'Ashtami Puja' },
    { n: 9, nm: 'Siddhidatri',    cl: '#7A3E9C', pr: 'Sesame',          tm: 'Havan 6:20–8:10 AM' },
  ];
  const relatedPujas = window.KS_DATA.pujas.slice(0, 2);

  return (
    <div className="page-enter">
      <div style={{ background: 'var(--hero-grad)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '40px 28px' }}>
          <button className="btn-link" onClick={() => setPage('festivals')} style={{ marginBottom: 16 }}>← Back to festivals</button>
          <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--maroon)' }}>Festival Guide · 9 Sacred Days</div>
          <h1 className="display" style={{ fontSize: 56, lineHeight: 1, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.03em' }}>
            {fest.name === 'Ram Navami' ? 'Ram Navami' : 'Chaitra Navratri'}
            <span style={{ color: 'var(--maroon)', fontStyle: 'italic' }}> 2026</span>
          </h1>
          <div style={{ fontSize: 15, color: 'var(--ink-mid)', maxWidth: 640, marginBottom: 18 }}>
            3–12 April 2026 · Nine days honouring the nine divine forms of Goddess Durga, who together embody Shakti — the divine feminine power.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            <span className="chip">9 Days</span>
            <span className="chip">Goddess Durga</span>
            <span className="chip">Fasting Observed</span>
            <span className="chip chip-accent">National Festival</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('pujas')}>🪔 Book Navratri Puja</button>
            <button className="btn btn-ghost btn-lg">💐 Navratri Chadhava</button>
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: '40px 28px 60px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
        <div>
          <SectionHeader title="Navadurga — nine days, nine forms" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {navratriDays.map(d => (
              <div key={d.n} style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: 16, background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 10,
                borderLeft: `4px solid ${d.cl}`
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: d.cl, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 600, fontFamily: 'Fraunces, serif'
                }}>{d.n}</div>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)' }}>Day {d.n} — {d.nm}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{d.pr}{d.tm && ' · '}{d.tm}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 32, padding: 24, background: 'var(--bg-alt)' }}>
            <h3 className="display" style={{ fontSize: 22, marginBottom: 12 }}>Fasting guide</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 13, color: 'var(--ink-mid)', lineHeight: 2 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--green)' }}>Permitted</div>
                <div>✓ Fruits, dry fruits, milk & dairy</div>
                <div>✓ Sabudana, kuttu atta, singhara</div>
                <div>✓ Rock salt (sendha namak)</div>
                <div>✓ Ginger, potato, ghee</div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--red)' }}>Avoided</div>
                <div>✗ Grains, regular salt</div>
                <div>✗ Onion, garlic</div>
                <div>✗ Non-vegetarian food</div>
                <div>✗ Alcohol, smoking</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader title="Book for Navratri" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {relatedPujas.map(p => <PujaCard key={p.id} puja={p} compact onClick={() => { setPageState({ pujaId: p.id }); setPage('puja-detail'); }}/>)}
          </div>
          <div className="card" style={{ marginTop: 20, padding: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>⏰ Key timings · Delhi</div>
            <div style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 2 }}>
              <div>Ghatasthapana · 3 Apr, 6:02–10:14 AM</div>
              <div>Ashtami Puja · 10 Apr</div>
              <div>Navami Havan · 11 Apr, 6:20–8:10 AM</div>
              <div>Vijayadashami · 12 Apr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FestivalsPage, FestivalDetail });
