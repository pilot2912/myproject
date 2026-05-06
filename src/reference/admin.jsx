// ══════ Kashi Shakti — Admin Dashboard ═══════
import * as React from 'react'

function AdminPage({ setPage }) {
  const orders = window.KS_DATA.orders;
  const [tab, setTab] = React.useState('today');

  const kpis = [
    { l: 'Today\'s bookings',  v: '247',     delta: '+18%', pos: true, sub: 'vs yesterday' },
    { l: 'Revenue (24h)',      v: '₹3.82L',  delta: '+12%', pos: true, sub: '247 orders · avg ₹1,545' },
    { l: 'Live streams now',   v: '12',      delta: 'LIVE', pos: true, sub: '4 temples streaming' },
    { l: 'Prasad in transit',  v: '1,284',   delta: '-4%',  pos: false, sub: '89% on-time' },
  ];

  // 24-hour sparkline data (hourly bookings)
  const hourly = [4, 2, 1, 0, 0, 2, 8, 14, 22, 28, 24, 18, 16, 12, 14, 18, 22, 28, 24, 20, 14, 10, 6, 8];
  const maxH = Math.max(...hourly);

  return (
    <div className="page-enter" style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ padding: '28px 28px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>⚙ Operator console</div>
            <h1 className="display" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Good morning, Anand</h1>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>22 Apr 2026 · 4 temples live · 12 pandits on-duty</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost btn-sm">📥 Export CSV</button>
            <button className="btn btn-ghost btn-sm">🎛 Filters</button>
            <button className="btn btn-primary btn-sm">+ New booking</button>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
          {kpis.map((k, i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>{k.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <div className="display" style={{ fontSize: 30, lineHeight: 1 }}>{k.v}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  padding: '2px 7px', borderRadius: 4,
                  background: k.delta === 'LIVE' ? 'var(--accent)' : k.pos ? 'var(--success)' : 'var(--danger)',
                  color: k.delta === 'LIVE' ? '#fff' : k.pos ? 'var(--green)' : 'var(--red)',
                }}>{k.delta}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart + live activity row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 22 }}>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 4 }}>📊 Bookings · last 24 hours</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 600 }}>247 orders</div>
              </div>
              <div className="seg">
                <button className="on">24h</button>
                <button>7d</button>
                <button>30d</button>
              </div>
            </div>
            <div style={{ height: 180, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
              {hourly.map((h, i) => (
                <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%',
                    height: `${(h / maxH) * 100}%`,
                    background: i === new Date().getHours() % 24 ? 'var(--accent)' : 'var(--accent-soft)',
                    borderRadius: '3px 3px 0 0',
                    transition: 'all 0.3s'
                  }}/>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-muted)', marginTop: 6 }}>
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="eyebrow">🔴 Live now</div>
              <span style={{ fontSize: 11, color: 'var(--red)' }}>● 12 streams</span>
            </div>
            {[
              { t: 'Kashi Vishwanath',  p: 'Rudrabhishek',       v: 3240 },
              { t: 'Siddhivinayak',     p: 'Ganesh Abhishek',    v: 1840 },
              { t: 'Ram Mandir',        p: 'Ram Navami Puja',    v: 5120 },
              { t: 'Vaishno Devi',      p: 'Navchandi Yagna',    v: 920 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px dashed var(--border)' : 'none', alignItems: 'center' }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--red)',
                  animation: 'pulse 2s infinite'
                }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{s.p}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--ink-mid)' }}>👁 {s.v.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 600 }}>Orders</div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{orders.length} shown · {orders.filter(o=>o.status==='confirmed').length} require action</div>
            </div>
            <div className="seg">
              {['today','week','pending','completed'].map(t => (
                <button key={t} className={tab===t?'on':''} onClick={() => setTab(t)}>
                  {t[0].toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-alt)' }}>
                {['Order','Puja','Temple','Status','Amount','Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: h === 'Amount' ? 'right' : 'left',
                    padding: '12px 22px',
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--ink-muted)',
                    borderBottom: '1px solid var(--border)'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-soft)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 22px' }} className="mono">#{o.id}</td>
                  <td style={{ padding: '14px 22px', fontWeight: 500 }}>{o.puja}</td>
                  <td style={{ padding: '14px 22px', color: 'var(--ink-muted)' }}>{o.temple}</td>
                  <td style={{ padding: '14px 22px' }}><StatusBadge status={o.status}/></td>
                  <td style={{ padding: '14px 22px', textAlign: 'right' }} className="mono">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 22px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm">View</button>
                      <button className="btn btn-ghost btn-sm">···</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Second row — Pandits + Revenue breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 22 }}>
          <div className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>👤 Pandits · on-duty today</div>
            {[
              { n: 'Ram Prakash Shastri',   t: 'Kashi Vishwanath',  r: 4.9, c: 18, s: 'active' },
              { n: 'Mahesh Trivedi',         t: 'Ram Mandir',        r: 4.8, c: 12, s: 'active' },
              { n: 'Vishwanath Bhatt',       t: 'Siddhivinayak',     r: 4.9, c: 22, s: 'break' },
              { n: 'Lakshman Sharma',        t: 'Mahakaleshwar',     r: 4.7, c: 9,  s: 'active' },
              { n: 'Govinda Acharya',        t: 'Vaishno Devi',      r: 4.8, c: 14, s: 'active' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px dashed var(--border)' : 'none' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `hsl(${i * 60}, 35%, 50%)`,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, fontFamily: 'Fraunces, serif'
                }}>{p.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{p.t} · ★ {p.r}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{p.c} today</div>
                <span className="chip" style={{
                  background: p.s === 'active' ? 'var(--success)' : 'var(--warning)',
                  color: p.s === 'active' ? 'var(--green)' : 'var(--gold)'
                }}>● {p.s}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>💰 Revenue by puja · last 7 days</div>
            {[
              { n: 'Rudrabhishek',         v: 128400, pct: 0.96 },
              { n: 'Ram Navami Maha Puja', v: 94200,  pct: 0.70 },
              { n: 'Navchandi Yagna',      v: 76500,  pct: 0.57 },
              { n: 'Ganesh Abhishek',      v: 58800,  pct: 0.44 },
              { n: 'Lakshmi Puja',         v: 42100,  pct: 0.31 },
              { n: 'Mahamrityunjay Jaap',  v: 28400,  pct: 0.21 },
            ].map((r, i) => (
              <div key={i} style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                  <span style={{ fontWeight: 500 }}>{r.n}</span>
                  <span className="mono" style={{ color: 'var(--ink-mid)' }}>₹{(r.v / 1000).toFixed(1)}K</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-soft)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${r.pct * 100}%`,
                    background: `linear-gradient(90deg, var(--accent) 0%, var(--gold-bright) 100%)`,
                    borderRadius: 3
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════ Temples Page ═══════
function TemplesPage({ setPage }) {
  const temples = [
    { n: 'Kashi Vishwanath',   l: 'Varanasi, UP',    d: 'Jyotirlinga · Shiva',  g: ['#1A237E','#283593'], pujas: 12 },
    { n: 'Ram Mandir',         l: 'Ayodhya, UP',     d: 'Birthplace of Rama',    g: ['#5A0F0F','#8B2810'], pujas: 8 },
    { n: 'Siddhivinayak',      l: 'Mumbai, MH',      d: 'Ganesha temple',        g: ['#311B92','#4527A0'], pujas: 10 },
    { n: 'Mahakaleshwar',      l: 'Ujjain, MP',      d: 'Jyotirlinga · Shiva',   g: ['#263238','#37474F'], pujas: 11 },
    { n: 'Vaishno Devi',       l: 'Katra, J&K',      d: 'Shakti Peetha',         g: ['#7B1C1C','#A02828'], pujas: 9 },
    { n: 'Padmanabhaswamy',    l: 'Trivandrum, KL',  d: 'Vishnu · 108 divya',    g: ['#1B5E20','#2E7D32'], pujas: 7 },
    { n: 'Jagannath Puri',     l: 'Puri, OD',        d: 'Char Dham',             g: ['#BF360C','#D84315'], pujas: 10 },
    { n: 'Tirupati Balaji',    l: 'Tirumala, AP',    d: 'Venkateshwara',         g: ['#4A148C','#6A1B9A'], pujas: 14 },
    { n: 'Kamakhya',           l: 'Guwahati, AS',    d: 'Shakti Peetha',         g: ['#880E4F','#AD1457'], pujas: 6 },
  ];
  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <PageHeader
        eyebrow="Temples · 200+ verified"
        title="Temples from every corner of Bharat"
        sub="From the Himalayas to Rameshwaram — verified pandits, live streams, sacred rituals. Book at any temple, from anywhere."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {temples.map((t, i) => (
          <div key={i} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => setPage('pujas')}>
            <div style={{
              height: 160,
              background: `linear-gradient(135deg, ${t.g[0]} 0%, ${t.g[1]} 100%)`,
              position: 'relative',
              display: 'flex', alignItems: 'flex-end', padding: 16,
              color: '#fff'
            }}>
              <div style={{
                position: 'absolute', top: 14, right: 14,
                background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600
              }}>{t.pujas} pujas</div>
              <div className="serif" style={{ fontSize: 26, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}>{t.n}</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 4 }}>📍 {t.l}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-mid)' }}>{t.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════ Profile Page ═══════
function ProfilePage({ setPage, setPageState }) {
  const myPujas = [
    { id: '7721', puja: 'Rudrabhishek',       temple: 'Kashi Vishwanath',  date: '25 Apr 2026', status: 'confirmed' },
    { id: '7715', puja: 'Satyanarayan Katha', temple: 'Remote',            date: '15 Apr 2026', status: 'completed' },
    { id: '7702', puja: 'Ganesh Abhishek',    temple: 'Siddhivinayak',     date: '4 Apr 2026',  status: 'completed' },
  ];
  const vratStreaks = [
    { n: 'Ekadashi Vrat', s: 8, max: 12 },
    { n: 'Pradosh Vrat',  s: 4, max: 6 },
    { n: 'Shivaratri',    s: 12, max: 12 },
  ];

  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '40px 0 28px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontFamily: 'Fraunces, serif', fontWeight: 500
        }}>R</div>
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Kashyap Gotra · Member since Oct 2024</div>
          <h1 className="display" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Rahul Sharma</h1>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>+91 98180 52340 · rahul@example.com</div>
        </div>
        <button className="btn btn-ghost btn-sm">⚙ Settings</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { l: 'Total pujas',   v: '14',    s: '₹24,810 donated' },
          { l: 'Vrats observed', v: '28',    s: '8-Ekadashi streak 🔥' },
          { l: 'Prasad received', v: '12',   s: 'from 8 temples' },
          { l: 'Upcoming',      v: '2',     s: 'next in 3 days' },
        ].map((k, i) => (
          <div key={i} className="card" style={{ padding: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>{k.l}</div>
            <div className="display" style={{ fontSize: 26 }}>{k.v}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 4 }}>{k.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <div>
          <SectionHeader title="My pujas" action={<button className="btn btn-ghost btn-sm">View all →</button>}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {myPujas.map(p => (
              <div key={p.id} className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: 'var(--accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20
                }}>🪔</div>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 600 }}>{p.puja}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>#{p.id} · {p.temple} · {p.date}</div>
                </div>
                <StatusBadge status={p.status}/>
                <button className="btn btn-ghost btn-sm">View</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="Vrat streaks"/>
          <div className="card" style={{ padding: 20 }}>
            {vratStreaks.map((v, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px dashed var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 500 }}>{v.n}</span>
                  <span className="mono" style={{ color: 'var(--accent)' }}>{v.s}/{v.max} 🔥</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-soft)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(v.s/v.max)*100}%`,
                    background: 'var(--accent)', borderRadius: 3
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════ Auth modal ═══════
function AuthModal({ onClose, onLogin }) {
  const [phase, setPhase] = React.useState('phone');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState(['','','','']);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(30,20,16,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
      backdropFilter: 'blur(4px)'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface)', borderRadius: 18,
        padding: 32, width: 400, maxWidth: '90vw',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 60, height: 60, margin: '0 auto 14px', borderRadius: '50%',
            background: 'var(--accent-soft)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontFamily: 'Noto Serif Devanagari, serif'
          }}>ॐ</div>
          <h2 className="display" style={{ fontSize: 24, marginBottom: 6 }}>
            {phase === 'phone' ? 'Welcome to Kashi Shakti' : 'Enter OTP'}
          </h2>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            {phase === 'phone' ? 'Sign in with your phone number' : `Sent to +91 ${phone}`}
          </div>
        </div>
        {phase === 'phone' ? (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <div style={{
                padding: '12px 14px', border: '1px solid var(--border)',
                borderRadius: 10, background: 'var(--bg-alt)',
                fontSize: 14, fontFamily: 'Fraunces, serif', fontWeight: 600
              }}>🇮🇳 +91</div>
              <input value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="98180 52340" inputMode="numeric" maxLength={10}
                style={{
                  flex: 1, padding: '12px 14px', border: '1px solid var(--border)',
                  borderRadius: 10, background: 'var(--surface)', color: 'var(--ink)',
                  fontSize: 14, fontFamily: 'inherit'
                }}/>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}
              onClick={() => phone.length === 10 && setPhase('otp')}>Send OTP →</button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 18 }}>
              {otp.map((c, i) => (
                <input key={i} value={c} maxLength={1}
                  onChange={e => {
                    const n = [...otp]; n[i] = e.target.value; setOtp(n);
                    if (e.target.value && i < 3) {
                      e.target.parentElement.children[i + 1].focus();
                    }
                  }}
                  style={{
                    width: 52, height: 58, textAlign: 'center',
                    fontSize: 22, fontFamily: 'Fraunces, serif', fontWeight: 600,
                    border: '1.5px solid var(--border)', borderRadius: 10,
                    background: 'var(--surface)', color: 'var(--ink)'
                  }}/>
              ))}
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}
              onClick={() => { onLogin(); onClose(); }}>Verify & continue →</button>
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'var(--ink-muted)' }}>
              Didn't receive? <a style={{ color: 'var(--accent)' }}>Resend in 23s</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AdminPage, TemplesPage, ProfilePage, AuthModal });
