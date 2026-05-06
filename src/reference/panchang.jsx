// ══════ Kashi Shakti — Panchang Detail Page ═══════
import * as React from 'react'

function PanchangDetail({ setPage }) {
  const t = window.KS_DATA.today;
  const cg = window.KS_DATA.choghadiya;
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  // Sun arc progress (morning 5:53 AM to 6:42 PM -> 12h 49m)
  const pct = React.useMemo(() => {
    const m = time.getHours() * 60 + time.getMinutes();
    const start = 5 * 60 + 53;
    const end   = 18 * 60 + 42;
    return Math.max(0, Math.min(1, (m - start) / (end - start)));
  }, [time]);

  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <PageHeader
        eyebrow={`${t.samvat} · ${t.masa} ${t.paksha}`}
        title={`${t.vara} · ${t.tithi}`}
        sub={`${t.greg} · Full Panchang with muhurats, choghadiya, and inauspicious periods.`}
        right={
          <div className="seg">
            <button>◀ Yesterday</button>
            <button className="on">Today</button>
            <button>Tomorrow ▶</button>
          </div>
        }
      />

      <PanchangBar today={t} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, marginTop: 24 }}>
        {/* Sun & Moon card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: 24,
            background: 'linear-gradient(180deg, var(--bg-alt) 0%, var(--surface) 100%)',
            borderBottom: '1px solid var(--border)'
          }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>☀ Sun Path · New Delhi</div>
            {/* Arc */}
            <div style={{ position: 'relative', height: 140, marginBottom: 10 }}>
              <svg width="100%" height="140" viewBox="0 0 500 140" preserveAspectRatio="none">
                <path d="M 20,130 Q 250,-40 480,130" fill="none"
                  stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 5"/>
                {[0.1, 0.25, 0.5, 0.75, 0.9].map((p, i) => {
                  const x = 20 + (480 - 20) * p;
                  const y = 130 - 170 * p * (1 - p) * 4;
                  return <circle key={i} cx={x} cy={y} r="2" fill="var(--ink-faint)"/>;
                })}
                {/* current sun */}
                <circle
                  cx={20 + 460 * pct}
                  cy={130 - 170 * pct * (1 - pct) * 4}
                  r="10"
                  fill="var(--gold-bright)"
                  stroke="var(--surface)"
                  strokeWidth="3"
                />
              </svg>
              <div style={{ position: 'absolute', left: 0, bottom: 0, fontSize: 11, color: 'var(--ink-muted)' }}>
                ↑ {t.sunrise}
              </div>
              <div style={{ position: 'absolute', right: 0, bottom: 0, fontSize: 11, color: 'var(--ink-muted)' }}>
                ↓ {t.sunset}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
              {[
                { l: 'Sunrise',   v: t.sunrise },
                { l: 'Sunset',    v: t.sunset },
                { l: 'Moonrise',  v: t.moonrise },
                { l: 'Moonset',   v: t.moonset },
              ].map(x => (
                <div key={x.l}>
                  <div className="eyebrow" style={{ fontSize: 9, marginBottom: 4 }}>{x.l}</div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 600 }}>{x.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>⏱ Choghadiya — auspicious windows</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cg.map((c, i) => {
                const color = c.rating === 3 ? 'var(--green)' : c.rating === 2 ? 'var(--gold)' : c.rating === 1 ? 'var(--ink-muted)' : 'var(--red)';
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '10px 14px',
                    background: 'var(--bg-alt)',
                    borderRadius: 8,
                    borderLeft: `3px solid ${color}`
                  }}>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--ink-mid)', minWidth: 150 }}>{c.range}</div>
                    <div className="serif" style={{ fontSize: 15, fontWeight: 600, minWidth: 80 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', flex: 1 }}>{c.desc}</div>
                    <div style={{ fontSize: 11, color }}>
                      {'★'.repeat(c.rating) + '☆'.repeat(3 - c.rating)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Muhurat + Inauspicious */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--green)' }}>🕉 Auspicious Muhurats</div>
            {[
              { l: 'Brahma Muhurat', v: t.brahmaMuhurat, d: 'Pre-dawn meditation' },
              { l: 'Abhijit Muhurat', v: t.abhijit, d: 'Victory hour' },
              { l: 'Vijay Muhurat', v: '2:38 – 3:30 PM', d: 'Success in ventures' },
              { l: 'Godhuli Muhurat', v: '6:38 – 7:02 PM', d: 'Twilight devotion' },
            ].map((x, i) => (
              <div key={i} style={{
                padding: '12px 0',
                borderBottom: i < 3 ? '1px dashed var(--border)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <div className="serif" style={{ fontSize: 15, fontWeight: 600 }}>{x.l}</div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--ink-mid)' }}>{x.v}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{x.d}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--red)' }}>⚠ Inauspicious Periods</div>
            {[
              { l: 'Rahu Kaal',    v: t.rahuKaal },
              { l: 'Yamagandam',   v: t.yamagandam },
              { l: 'Gulika Kaal',  v: t.gulika },
              { l: 'Dur Muhurat',  v: '11:53 – 12:44' },
            ].map((x, i) => (
              <div key={i} style={{
                padding: '10px 0',
                display: 'flex', justifyContent: 'space-between',
                borderBottom: i < 3 ? '1px dashed var(--border)' : 'none'
              }}>
                <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>{x.l}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--red)' }}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PanchangDetail });
