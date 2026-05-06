// ══════ Kashi Shakti — Puja Card (shared) ═══════
import * as React from 'react'

function PujaCard({ puja, onClick, compact = false }) {
  return (
    <div className="card card-hover"
      style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onClick={onClick}>
      <div style={{
        height: compact ? 120 : 180,
        background: `linear-gradient(135deg, ${puja.grad[0]} 0%, ${puja.grad[1]} 100%)`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: 14,
        position: 'relative',
        color: '#fff'
      }}>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontSize: 14, fontWeight: 600,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(10px)',
          padding: '4px 10px', borderRadius: 6,
        }}>{puja.deity}</div>
        {puja.tag && (
          <div style={{
            position: 'absolute', top: 14, right: 14,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'var(--gold-bright)', color: '#2B1605',
            padding: '3px 8px', borderRadius: 4,
          }}>{puja.tag}</div>
        )}
        <div style={{ fontSize: compact ? 40 : 56, lineHeight: 1 }}>{puja.icon}</div>
      </div>
      <div style={{ padding: compact ? 14 : 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="serif" style={{ fontSize: compact ? 15 : 17, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{puja.name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 10 }}>📍 {puja.temple}</div>
        {!compact && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
            {puja.feats.map(f => <span key={f} className="chip" style={{ fontSize: 10 }}>✓ {f}</span>)}
          </div>
        )}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>From</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)' }}>₹{puja.price.toLocaleString('en-IN')}</div>
          </div>
          <button className="btn btn-primary btn-sm">Book →</button>
        </div>
      </div>
    </div>
  );
}

// ══════ Pujas List Page ═══════
function PujasPage({ setPage, setPageState }) {
  const [deity, setDeity] = React.useState('all');
  const [sort, setSort] = React.useState('popular');
  const pujas = window.KS_DATA.pujas;
  const deities = ['all', 'Shiva', 'Vishnu', 'Lakshmi', 'Durga', 'Ganesha', 'Rama'];
  const filtered = deity === 'all' ? pujas : pujas.filter(p => p.deity === deity);

  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <PageHeader
        eyebrow="Book a Puja · 48 rituals · 200+ temples"
        title="Puja, performed by verified pandits"
        sub="Authentic rituals at India's most revered temples. Your sankalp is taken in your name; prasad arrives in 5–7 days."
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {deities.map(d => (
            <button key={d} onClick={() => setDeity(d)} className={'chip ' + (deity === d ? 'chip-accent' : '')}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
              {d === 'all' ? 'All deities' : d}
            </button>
          ))}
        </div>
        <div className="seg">
          <button className={sort==='popular'?'on':''} onClick={() => setSort('popular')}>Popular</button>
          <button className={sort==='price'?'on':''} onClick={() => setSort('price')}>Price ↑</button>
          <button className={sort==='new'?'on':''} onClick={() => setSort('new')}>New</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
        {filtered.map(p => (
          <PujaCard key={p.id} puja={p}
            onClick={() => { setPageState({ pujaId: p.id }); setPage('puja-detail'); }}/>
        ))}
      </div>
    </div>
  );
}

// ══════ Puja Detail Page ═══════
function PujaDetail({ pageState, setPage, setPageState }) {
  const puja = window.KS_DATA.pujas.find(p => p.id === pageState.pujaId) || window.KS_DATA.pujas[0];
  const [plan, setPlan] = React.useState('family');
  const plans = [
    { id: 'solo',   label: 'Vyaktigat',   desc: '1 person · single sankalp',      price: puja.price },
    { id: 'family', label: 'Parivarik',   desc: 'Up to 4 people · family puja',   price: Math.round(puja.price * 1.85), popular: true },
    { id: 'maha',   label: 'Maha Puja',   desc: 'Up to 8 · extended rituals',     price: Math.round(puja.price * 3.2) },
  ];
  const selected = plans.find(p => p.id === plan);

  const benefits = [
    { i: '🕉', t: 'Sankalp in your name',      d: 'Pandit takes your name & gotra during the ritual' },
    { i: '📿', t: 'Blessed prasad delivered',  d: 'Packaged and shipped within 5–7 days' },
    { i: '📜', t: 'Puja certificate',          d: 'Digital + printed certificate with ritual details' },
    { i: '📹', t: 'Live stream access',        d: 'Watch the full ritual on call day' },
  ];

  return (
    <div className="page-enter">
      <div style={{
        background: `linear-gradient(135deg, ${puja.grad[0]} 0%, ${puja.grad[1]} 100%)`,
        color: '#fff', position: 'relative'
      }}>
        <div className="container" style={{ padding: '36px 28px 44px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <button onClick={() => setPage('pujas')} className="btn-link"
              style={{ color: '#fff', opacity: 0.85, marginBottom: 14 }}>← All pujas</button>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
              {puja.deity} · {puja.temple.split(',')[0]}
            </div>
            <h1 className="display" style={{ fontSize: 46, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 14 }}>
              {puja.name}
            </h1>
            <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6, maxWidth: 440, marginBottom: 20 }}>
              A sacred ritual performed at {puja.temple}. Pandits take your sankalp, perform the puja as per Vedic traditions, and send you prasad + certificate.
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <div><div style={{ opacity: 0.7, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</div><div className="serif" style={{ fontSize: 16 }}>60–90 min</div></div>
              <div><div style={{ opacity: 0.7, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next slot</div><div className="serif" style={{ fontSize: 16 }}>25 Apr, 7:30 AM</div></div>
              <div><div style={{ opacity: 0.7, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pandits</div><div className="serif" style={{ fontSize: 16 }}>4 verified</div></div>
            </div>
          </div>
          <div style={{ fontSize: 200, textAlign: 'center', opacity: 0.9, lineHeight: 1 }}>{puja.icon}</div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 28px 60px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40 }}>
        <div>
          <SectionHeader title="Choose your sankalp" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {plans.map(p => (
              <div key={p.id} onClick={() => setPlan(p.id)}
                style={{
                  padding: 18,
                  border: `2px solid ${plan === p.id ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 12,
                  background: plan === p.id ? 'var(--accent-soft)' : 'var(--surface)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16
                }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `2px solid ${plan === p.id ? 'var(--accent)' : 'var(--border)'}`,
                  background: plan === p.id ? 'var(--accent)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11
                }}>{plan === p.id && '✓'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                    <div className="serif" style={{ fontSize: 18, fontWeight: 600 }}>{p.label}</div>
                    {p.popular && <span className="chip chip-accent">Most chosen</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{p.desc}</div>
                </div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)' }}>₹{p.price.toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>

          <SectionHeader title="What you receive" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--bg-alt)', borderRadius: 10 }}>
                <div style={{ fontSize: 22 }}>{b.i}</div>
                <div>
                  <div className="serif" style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{b.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Ritual schedule" />
          <div className="card" style={{ padding: 22 }}>
            {[
              { t: '5:30 AM', l: 'Temple opens · pandit preparation' },
              { t: '6:00 AM', l: 'Sankalp taken — your name & gotra invoked' },
              { t: '6:30 AM', l: 'Main puja with mantras & offerings' },
              { t: '7:15 AM', l: 'Aarti & final blessings' },
              { t: '7:30 AM', l: 'Prasad packaging & live-stream ends' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, padding: '10px 0', borderBottom: i < 4 ? '1px dashed var(--border)' : 'none' }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', minWidth: 64 }}>{s.t}</div>
                <div style={{ fontSize: 13 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: 22, position: 'sticky', top: 80 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Order summary</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{puja.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 18 }}>{selected.label} · {puja.temple}</div>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 14, fontSize: 13 }}>
              {[
                ['Puja fee', `₹${selected.price.toLocaleString('en-IN')}`],
                ['Prasad delivery', '₹89'],
                ['Temple dakshina', '₹51'],
              ].map(([k,v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: 'var(--ink-mid)' }}>
                  <span>{k}</span><span className="mono">{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 12 }}>
                <div className="serif" style={{ fontSize: 17, fontWeight: 600 }}>Total</div>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)' }}>
                  ₹{(selected.price + 89 + 51).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 16 }}
              onClick={() => { setPageState({ pujaId: puja.id, plan: selected }); setPage('checkout'); }}>
              Continue to checkout →
            </button>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 10 }}>
              🔒 Secure · 4.8★ from 12,400 devotees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════ Checkout ═══════
function CheckoutPage({ pageState, setPage }) {
  const puja = window.KS_DATA.pujas.find(p => p.id === pageState.pujaId) || window.KS_DATA.pujas[0];
  const plan = pageState.plan || { label: 'Parivarik', price: puja.price };
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: 'Rahul Sharma', gotra: 'Kashyap', phone: '+91 98180 52340',
    email: 'rahul@example.com', wish: '', date: '25 Apr 2026', slot: '7:30 AM'
  });
  const total = plan.price + 89 + 51;

  const Step = ({ n, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: step >= n ? 'var(--accent)' : 'var(--border)',
        color: step >= n ? '#fff' : 'var(--ink-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 600, fontFamily: 'Fraunces, serif'
      }}>{step > n ? '✓' : n}</div>
      <div style={{ fontSize: 12, fontWeight: step === n ? 600 : 400, color: step >= n ? 'var(--ink)' : 'var(--ink-muted)' }}>{label}</div>
      {n < 3 && <div style={{ flex: 1, height: 1, background: step > n ? 'var(--accent)' : 'var(--border)' }}/>}
    </div>
  );

  const Field = ({ label, value, onChange, placeholder, span = 1, textarea }) => (
    <div style={{ gridColumn: `span ${span}` }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>{label}</div>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', padding: 10, border: '1px solid var(--border)',
            borderRadius: 8, background: 'var(--surface)', color: 'var(--ink)',
            fontSize: 13, fontFamily: 'inherit', resize: 'vertical', minHeight: 70
          }}/>
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{
            width: '100%', padding: 10, border: '1px solid var(--border)',
            borderRadius: 8, background: 'var(--surface)', color: 'var(--ink)',
            fontSize: 13, fontFamily: 'inherit'
          }}/>
      )}
    </div>
  );

  return (
    <div className="page-enter container" style={{ paddingBottom: 60, maxWidth: 1100 }}>
      <PageHeader eyebrow="Checkout" title="Complete your sankalp" />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 20px' }}>
        <Step n={1} label="Your details" />
        <Step n={2} label="Date & slot" />
        <Step n={3} label="Payment" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 }}>
        <div className="card" style={{ padding: 28 }}>
          {step === 1 && (
            <>
              <h2 className="display" style={{ fontSize: 24, marginBottom: 8 }}>Sankalp details</h2>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
                The pandit will take your name, gotra and sankalp during the ritual.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Full name" value={form.name} onChange={v => setForm({...form, name: v})}/>
                <Field label="Gotra" value={form.gotra} onChange={v => setForm({...form, gotra: v})}/>
                <Field label="Phone" value={form.phone} onChange={v => setForm({...form, phone: v})}/>
                <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})}/>
                <Field label="Your wish / intention (optional)" placeholder="e.g. Blessings for my daughter's marriage"
                  value={form.wish} onChange={v => setForm({...form, wish: v})} span={2} textarea/>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="display" style={{ fontSize: 24, marginBottom: 8 }}>Pick a muhurat</h2>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 20 }}>
                Slots on auspicious tithis fill quickly.
              </div>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Date</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {['23 Apr','24 Apr','25 Apr','26 Apr','27 Apr','28 Apr'].map(d => (
                  <button key={d} onClick={() => setForm({...form, date: d + ' 2026'})}
                    style={{
                      padding: '10px 16px',
                      border: `1.5px solid ${form.date.startsWith(d) ? 'var(--accent)' : 'var(--border)'}`,
                      background: form.date.startsWith(d) ? 'var(--accent-soft)' : 'var(--surface)',
                      color: 'var(--ink)',
                      borderRadius: 8, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer'
                    }}>
                    <div style={{ fontWeight: 600 }}>{d}</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{d === '25 Apr' ? 'Amavasya' : d === '26 Apr' ? 'Ekadashi' : 'auspicious'}</div>
                  </button>
                ))}
              </div>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Muhurat</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {['6:00 AM','7:30 AM','9:00 AM','11:00 AM','2:00 PM','5:30 PM'].map(t => (
                  <button key={t} onClick={() => setForm({...form, slot: t})}
                    style={{
                      padding: '14px',
                      border: `1.5px solid ${form.slot === t ? 'var(--accent)' : 'var(--border)'}`,
                      background: form.slot === t ? 'var(--accent-soft)' : 'var(--surface)',
                      color: 'var(--ink)',
                      borderRadius: 8, fontFamily: 'Fraunces, serif', fontSize: 15, cursor: 'pointer', fontWeight: 600
                    }}>{t}</button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="display" style={{ fontSize: 24, marginBottom: 20 }}>Payment</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { id: 'upi', l: 'UPI', d: 'PhonePe, GPay, Paytm, BHIM', icon: '📱' },
                  { id: 'card', l: 'Card', d: 'Visa, Mastercard, RuPay', icon: '💳' },
                  { id: 'netbank', l: 'Net Banking', d: '50+ banks supported', icon: '🏦' },
                  { id: 'wallet', l: 'Wallet', d: 'PhonePe, Paytm, Amazon Pay', icon: '👛' },
                ].map((m, i) => (
                  <div key={m.id} style={{
                    padding: 16, border: `1.5px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 10, display: 'flex', alignItems: 'center', gap: 14,
                    cursor: 'pointer', background: i === 0 ? 'var(--accent-soft)' : 'var(--surface)'
                  }}>
                    <div style={{ fontSize: 24 }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="serif" style={{ fontSize: 16, fontWeight: 600 }}>{m.l}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{m.d}</div>
                    </div>
                    {i === 0 && <span className="chip chip-accent">Selected</span>}
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-ghost" onClick={() => step > 1 ? setStep(step - 1) : setPage('puja-detail')}>
              ← {step === 1 ? 'Back' : 'Previous'}
            </button>
            {step < 3 ? (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue →</button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={() => setPage('confirmation')}>
                Pay ₹{total.toLocaleString('en-IN')} →
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="card" style={{ padding: 22, position: 'sticky', top: 80 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Your puja</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{puja.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 16 }}>{plan.label} · {puja.temple}</div>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 12, fontSize: 12, color: 'var(--ink-mid)', lineHeight: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Name</span><span>{form.name}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Gotra</span><span>{form.gotra}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Date</span><span>{form.date}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Slot</span><span>{form.slot}</span></div>
            </div>
            <div style={{ borderTop: '1px dashed var(--border)', marginTop: 12, paddingTop: 12, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>{plan.label}</span><span className="mono">₹{plan.price.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--ink-muted)' }}>
                <span>Delivery</span><span className="mono">₹89</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--ink-muted)' }}>
                <span>Dakshina</span><span className="mono">₹51</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', marginTop: 6, paddingTop: 10 }}>
                <span className="serif" style={{ fontWeight: 600 }}>Total</span>
                <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════ Confirmation ═══════
function ConfirmationPage({ pageState, setPage }) {
  const puja = window.KS_DATA.pujas.find(p => p.id === pageState.pujaId) || window.KS_DATA.pujas[0];
  const orderId = 'KS-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="page-enter container" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: 760, textAlign: 'center' }}>
      <div style={{
        width: 96, height: 96, margin: '0 auto 24px', borderRadius: '50%',
        background: 'var(--success)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 52,
      }}>🪔</div>
      <div className="eyebrow" style={{ color: 'var(--green)', marginBottom: 12 }}>✓ Booking confirmed · {orderId}</div>
      <h1 className="display" style={{ fontSize: 44, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 14 }}>
        Your sankalp has been received.
      </h1>
      <div style={{ fontSize: 15, color: 'var(--ink-mid)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
        The pandits at <b>{puja.temple}</b> will perform <b>{puja.name}</b> in your name on 25 April 2026, 7:30 AM.
      </div>
      <div className="card" style={{ padding: 28, textAlign: 'left', marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>What happens next</div>
        {[
          { t: 'Now', l: 'Confirmation email + WhatsApp · puja details & pandit contact' },
          { t: '24 Apr', l: 'Reminder · sankalp preparation instructions' },
          { t: '25 Apr, 7:30 AM', l: 'Live stream link activated · watch the ritual live' },
          { t: '25–28 Apr', l: 'Puja certificate uploaded to your profile' },
          { t: '30 Apr – 2 May', l: 'Prasad delivered to your address' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: i < 4 ? '1px dashed var(--border)' : 'none' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', minWidth: 120 }}>{s.t}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-mid)' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn btn-ghost" onClick={() => setPage('home')}>Back to home</button>
        <button className="btn btn-primary" onClick={() => setPage('profile')}>View in My Pujas →</button>
      </div>
    </div>
  );
}

Object.assign(window, { PujaCard, PujasPage, PujaDetail, CheckoutPage, ConfirmationPage });
