// ══════ Kashi Shakti — Home Page ═══════
import * as React from 'react'

function HomePage({ setPage, setPageState }) {
  const today = window.KS_DATA.today;
  const festivals = window.KS_DATA.festivals.slice(0, 4);
  const vrats = window.KS_DATA.vrats.slice(0, 3);
  const featured = window.KS_DATA.pujas.slice(0, 3);

  // Countdown to Ram Navami (April 9 — 3 days from "today" April 6 treated as countdown demo)
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  // fake countdown: 3d 14h 22m
  const d = 3, h = 14, m = 22, s = 59 - new Date(now).getSeconds();

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{
        background: 'var(--hero-grad)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'Noto Serif Devanagari, serif',
          fontSize: 360, color: 'var(--ink)', opacity: 0.04, lineHeight: 1, userSelect: 'none'
        }}>ॐ</div>
        <div className="container" style={{ padding: '48px 28px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--maroon)', marginBottom: 12 }}>🪔 Upcoming · Chaitra Shukla Navami</div>
            <h1 className="display" style={{ fontSize: 64, lineHeight: 0.98, color: 'var(--ink)', marginBottom: 14, letterSpacing: '-0.03em' }}>
              Ram Navami<br/>
              <span style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>celebrated</span> with you.
            </h1>
            <div style={{ fontSize: 15, color: 'var(--ink-mid)', maxWidth: 520, marginBottom: 24 }}>
              Celebrate the divine birth of Lord Rama. Book sankalp at Ram Mandir, Ayodhya — live stream, prasad to your door, digital certificate.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary btn-lg" onClick={() => { setPageState({ pujaId: 'ram-navami-puja' }); setPage('puja-detail'); }}>
                Book Ram Navami Sankalp →
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => { setPageState({ festId: 'ram-navami' }); setPage('festival-detail'); }}>
                Learn More
              </button>
            </div>
          </div>
          {/* Countdown */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Festival countdown</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[[d,'days'],[h,'hours'],[m,'mins'],[s,'secs']].map(([val, lbl], i) => (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '16px 8px', textAlign: 'center'
                }}>
                  <div className="display" style={{ fontSize: 40, color: 'var(--maroon)', lineHeight: 1 }}>{String(val).padStart(2,'0')}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Ayodhya · Live stream included</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-mid)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 2s infinite' }}/>
                1,847 devotees have booked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panchang strip */}
      <div className="container" style={{ padding: '32px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div className="eyebrow">आज का पञ्चांग · Today</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>
              {today.greg} <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>· {today.masa} {today.paksha}</span>
            </div>
          </div>
          <button className="btn-link" onClick={() => setPage('calendar')}>Full panchang →</button>
        </div>
        <PanchangBar today={today} />
        {/* Muhurat chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <span className="chip chip-good">⭐ Abhijit {today.abhijit}</span>
          <span className="chip chip-good">Amrit Choghadiya 5:53–7:29 AM</span>
          <span className="chip chip-bad">⚠ Rahu Kaal {today.rahuKaal}</span>
          <span className="chip chip-bad">⚠ Yamagandam {today.yamagandam}</span>
          <span className="chip">🌙 Moonrise {today.moonrise}</span>
        </div>
      </div>

      {/* Featured pujas */}
      <div className="container" style={{ padding: '48px 28px 0' }}>
        <SectionHeader title="Featured pujas this week" sub="Sanctified by partner temples, performed by verified pandits." action={<button className="btn-link" onClick={() => setPage('pujas')}>Browse all →</button>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {featured.map(p => <PujaCardHome key={p.id} puja={p} onClick={() => { setPageState({ pujaId: p.id }); setPage('puja-detail'); }}/>)}
        </div>
      </div>

      {/* 2 col: festivals + vrats */}
      <div className="container" style={{ padding: '48px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <SectionHeader title="Upcoming festivals" action={<button className="btn-link" onClick={() => setPage('festivals')}>View all →</button>} />
          <div className="card">
            {festivals.map((f, i) => (
              <div key={f.id}
                onClick={() => { setPageState({ festId: f.id }); setPage('festival-detail'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px',
                  borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ textAlign: 'center', minWidth: 48 }}>
                  <div className="display" style={{ fontSize: 28, color: 'var(--accent)', lineHeight: 1 }}>{f.d}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.m}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{f.tithi}</div>
                </div>
                <span className="chip">{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="Vrats to observe" action={<button className="btn-link" onClick={() => setPage('festivals')}>All vrats →</button>} />
          <div className="card">
            {vrats.map((v, i) => (
              <div key={v.name} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 18px',
                borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none',
              }}>
                <div style={{ textAlign: 'center', minWidth: 48 }}>
                  <div className="display" style={{ fontSize: 28, color: 'var(--accent)', lineHeight: 1 }}>{v.d}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{v.m}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{v.tithi} · {v.deity}</div>
                </div>
                <button className="btn btn-ghost btn-sm">🔔 Remind</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PujaCardHome({ puja, onClick, compact }) {
  return (
    <div className="card card-hover" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{
        height: compact ? 120 : 160,
        background: `linear-gradient(135deg, ${puja.grad[0]}, ${puja.grad[1]})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ fontSize: 64, opacity: 0.9 }}>{puja.icon}</div>
        {puja.tag && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: 10, fontWeight: 600,
            padding: '4px 10px', borderRadius: 12, letterSpacing: '0.08em', textTransform: 'uppercase'
          }}>{puja.tag}</div>
        )}
      </div>
      <div style={{ padding: 18 }}>
        <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, letterSpacing: '-0.01em' }}>{puja.name}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 12 }}>🏛 {puja.temple}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {puja.feats.map(f => <span key={f} className="chip" style={{ fontSize: 10, padding: '3px 8px' }}>{f}</span>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="display" style={{ fontSize: 24, color: 'var(--ink)', lineHeight: 1 }}>{rs(puja.price)}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-muted)' }}>onwards · sankalp</div>
          </div>
          <button className="btn btn-primary btn-sm">Book →</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage });
