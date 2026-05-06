// ══════ Kashi Shakti — Calendar & Panchang ═══════
import * as React from 'react'

function CalendarPage({ today, city, setPage, setPageState }) {
  const [selected, setSelected] = React.useState(22);
  const [tab, setTab] = React.useState('month');
  const days = window.KS_DATA.april2026;

  return (
    <div className="page-enter">
      <div className="container">
        <PageHeader
          eyebrow="Calendar & Panchang"
          title="April 2026"
          sub={<span>Chaitra – Vaishakha · Vikram Samvat 2083 · Times for <b>{city.name}</b></span>}
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm">‹ March</button>
              <button className="btn btn-ghost btn-sm">May ›</button>
              <button className="btn btn-dark btn-sm">Today</button>
            </div>
          }
        />
      </div>
      <div className="subnav">
        {[['month','Monthly Grid'],['panchang','Daily Panchang'],['choghadiya','Choghadiya'],['nakshatra','Nakshatra']].map(([k,l]) => (
          <button key={k} className={'subnav-item ' + (tab===k?'active':'')} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'month' && <MonthGrid days={days} selected={selected} setSelected={setSelected} setPage={setPage} setPageState={setPageState} today={today}/>}
      {tab === 'panchang' && <DailyPanchang today={today} city={city}/>}
      {tab === 'choghadiya' && <ChoghadiyaView today={today}/>}
      {tab === 'nakshatra' && <NakshatraView/>}
    </div>
  );
}

function MonthGrid({ days, selected, setSelected, setPage, setPageState, today }) {
  // April 1, 2026 = Wednesday (w=3). We prepend 3 empty cells.
  const selectedDay = days.find(d => d.d === selected);
  const [cal, setCal] = React.useState('gregorian');

  return (
    <div className="container" style={{ padding: '24px 28px 60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div>
          {/* Cal filter bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="seg">
              {['gregorian','panchang','tamil','bengali'].map(c => (
                <button key={c} className={cal===c?'on':''} onClick={() => setCal(c)}>{c[0].toUpperCase()+c.slice(1)}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--ink-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 3, background: 'var(--accent)' }}/>Festival</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 3, background: 'var(--green)' }}/>Vrat</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 3, background: 'var(--blue)' }}/>Ekadashi</span>
            </div>
          </div>
          {/* Grid */}
          <div className="card" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w, i) => (
                <div key={w} style={{
                  padding: '10px 8px', textAlign: 'center',
                  fontSize: 11, fontWeight: 600,
                  color: i===0 ? 'var(--red)' : 'var(--ink-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>{w}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--border-soft)' }}>
              {/* 3 empty for April 1 being Wed */}
              {Array.from({ length: 3 }).map((_, i) => <div key={'e'+i} style={{ background: 'var(--bg-alt)', minHeight: 88 }}/>)}
              {days.map(d => {
                const isSel = d.d === selected;
                const isToday = d.today;
                const eventColor = d.event?.t === 'fest' ? 'var(--accent)' : d.event?.t === 'ekad' ? 'var(--blue)' : d.event?.t === 'vrat' ? 'var(--green)' : null;
                return (
                  <button key={d.d} onClick={() => setSelected(d.d)} style={{
                    background: isSel ? 'var(--ink)' : 'var(--surface)',
                    color: isSel ? 'var(--bg)' : 'var(--ink)',
                    padding: '8px 10px', minHeight: 88, textAlign: 'left',
                    border: 'none', cursor: 'pointer',
                    borderTop: eventColor ? `3px solid ${eventColor}` : '3px solid transparent',
                    fontFamily: 'inherit',
                    position: 'relative',
                    transition: 'background 0.12s'
                  }}
                    onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = 'var(--bg-alt)'; }}
                    onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = 'var(--surface)'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="display" style={{
                        fontSize: 20,
                        color: isSel ? 'var(--bg)' : isToday ? 'var(--accent)' : 'var(--ink)',
                        lineHeight: 1
                      }}>{d.d}</span>
                      {isToday && <span style={{ fontSize: 8, color: isSel ? 'var(--bg)' : 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em' }}>TODAY</span>}
                    </div>
                    <div style={{
                      fontSize: 10, color: isSel ? 'rgba(255,255,255,0.7)' : 'var(--ink-muted)',
                      marginTop: 4
                    }}>{d.tithi}</div>
                    {d.event && (
                      <div style={{
                        fontSize: 10, fontWeight: 500,
                        color: isSel ? 'var(--bg)' : eventColor,
                        marginTop: 4, lineHeight: 1.3
                      }}>{d.event.n}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Day detail drawer */}
        <DayDrawer day={selectedDay} today={today} setPage={setPage}/>
      </div>
    </div>
  );
}

function DayDrawer({ day, today, setPage }) {
  if (!day) return null;
  return (
    <div className="card" style={{ position: 'sticky', top: 80 }}>
      <div style={{ padding: 20, background: 'var(--dark-grad)', color: 'var(--goldBright, #E0B441)' }}>
        <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Selected date</div>
        <div className="display" style={{ fontSize: 28, color: 'var(--gold-bright)', lineHeight: 1.05 }}>
          April {day.d}, 2026
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{day.paksha} {day.tithi}</div>
      </div>
      <div style={{ padding: 18 }}>
        {[
          ['🌅','Sunrise', today.sunrise],
          ['🌇','Sunset', today.sunset],
          ['⭐','Abhijit', today.abhijit, 'good'],
          ['🌟','Brahma', today.brahmaMuhurat, 'good'],
          ['⚠','Rahu Kaal', today.rahuKaal, 'bad'],
          ['⚠','Yamagandam', today.yamagandam, 'bad'],
        ].map(([ic, l, t, q], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 0',
            borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none'
          }}>
            <span style={{ fontSize: 14, width: 20 }}>{ic}</span>
            <span style={{ flex: 1, fontSize: 13, color: 'var(--ink)' }}>{l}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: q === 'bad' ? 'var(--red)' : q === 'good' ? 'var(--green)' : 'var(--ink)' }}>{t}</span>
          </div>
        ))}
        {day.event && (
          <div style={{
            marginTop: 14, padding: 14,
            background: 'var(--accent-soft)', borderRadius: 10
          }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Today's observance</div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: 'var(--accent)' }}>{day.event.n}</div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 10, width: '100%' }} onClick={() => setPage('pujas')}>
              Book related puja
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DailyPanchang({ today, city }) {
  return (
    <div className="container" style={{ padding: '24px 28px 60px' }}>
      {/* Day header */}
      <div style={{
        background: 'var(--dark-grad)', color: 'var(--bg-alt)',
        padding: 28, borderRadius: 14, marginBottom: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Daily Panchang · {city.name}</div>
          <div className="display" style={{ fontSize: 38, color: 'var(--gold-bright)', marginTop: 6, lineHeight: 1 }}>{today.greg}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>{today.masa} {today.paksha} {today.tithi} · <span className="devanagari">✨ Siddha</span> Yoga</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,0.85)' }}>
          <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>‹ 21 Apr</button>
          <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>23 Apr ›</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* Five limbs */}
        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>पञ्च अंग</div>
          <h3 className="display" style={{ fontSize: 20, marginBottom: 16 }}>Five Limbs</h3>
          {[
            ['Tithi', today.tithi, 'till ' + today.tithiEnds],
            ['Vara', today.vara, 'Wednesday · ' + today.varaHi],
            ['Nakshatra', today.nakshatra, 'till ' + today.nakshatraEnds],
            ['Yoga', today.yoga, 'till ' + today.yogaEnds],
            ['Karana', today.karana, today.karanaChange],
          ].map(([l, v, sub], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              padding: '12px 0',
              borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none'
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 2, fontSize: 9 }}>{l}</div>
                <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)' }}>{v}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)', textAlign: 'right', paddingTop: 14 }}>{sub}</div>
            </div>
          ))}
        </div>
        {/* Timings */}
        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Timings</div>
          <h3 className="display" style={{ fontSize: 20, marginBottom: 16 }}>Sun · Moon · Key</h3>
          {[
            ['🌅','Sunrise', today.sunrise],
            ['🌇','Sunset', today.sunset],
            ['🌙','Moonrise', today.moonrise],
            ['🌛','Moonset', today.moonset],
            ['⭐','Abhijit', today.abhijit, 'good'],
            ['🌟','Brahma Muhurat', today.brahmaMuhurat, 'good'],
            ['⚠','Rahu Kaal', today.rahuKaal, 'bad'],
            ['⚠','Yamagandam', today.yamagandam, 'bad'],
            ['⚠','Gulika', today.gulika, 'bad'],
          ].map(([ic, l, v, q], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0',
              borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none'
            }}>
              <span style={{ width: 18 }}>{ic}</span>
              <span style={{ flex: 1, fontSize: 13 }}>{l}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: q==='bad'?'var(--red)':q==='good'?'var(--green)':'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>
        {/* Choghadiya */}
        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Choghadiya</div>
          <h3 className="display" style={{ fontSize: 20, marginBottom: 16 }}>Day windows</h3>
          <ChoghadiyaList />
        </div>
      </div>
    </div>
  );
}

function ChoghadiyaList() {
  const list = window.KS_DATA.choghadiya;
  const kind = {
    amrit: 'good', shubh: 'good', labh: 'good', char: 'neutral',
    kaal: 'bad', rog: 'warn', udveg: 'warn',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {list.map((c, i) => {
        const q = kind[c.k];
        const bg = q === 'good' ? 'var(--success)' : q === 'bad' ? 'var(--danger)' : q === 'warn' ? 'var(--warning)' : 'var(--border-soft)';
        const color = q === 'good' ? 'var(--green)' : q === 'bad' ? 'var(--red)' : q === 'warn' ? 'var(--gold)' : 'var(--ink-mid)';
        return (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 12,
            padding: '10px 12px', background: bg, borderRadius: 8, alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color }}>{c.name}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{c.desc}</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-mid)', fontVariantNumeric: 'tabular-nums' }}>{c.range}</div>
          </div>
        );
      })}
    </div>
  );
}

function ChoghadiyaView({ today }) {
  return (
    <div className="container" style={{ padding: '24px 28px 60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div className="eyebrow">Day</div>
          <h3 className="display" style={{ fontSize: 22, marginBottom: 16 }}>Sunrise → Sunset</h3>
          <ChoghadiyaList />
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div className="eyebrow">Understand choghadiya</div>
          <h3 className="display" style={{ fontSize: 22, marginBottom: 12 }}>Reading the day's windows</h3>
          <div style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.7 }}>
            Choghadiya divides each day and night into eight roughly 90-minute windows, each governed by a planet. Amrit, Shubh, and Labh are auspicious. Kaal, Rog, and Udveg are to be avoided for new work. Char is suited for movement — travel, errands.
          </div>
          <div className="hr" style={{ margin: '16px 0' }}/>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Quick guide</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
            <div><b style={{ color: 'var(--green)' }}>Amrit</b> — all good works</div>
            <div><b style={{ color: 'var(--green)' }}>Shubh</b> — auspicious</div>
            <div><b style={{ color: 'var(--green)' }}>Labh</b> — wealth, business</div>
            <div><b style={{ color: 'var(--ink-mid)' }}>Char</b> — movement, travel</div>
            <div><b style={{ color: 'var(--red)' }}>Kaal</b> — avoid new</div>
            <div><b style={{ color: 'var(--gold)' }}>Rog</b> — medical only</div>
            <div><b style={{ color: 'var(--gold)' }}>Udveg</b> — anxiety, avoid</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NakshatraView() {
  const nak = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','P. Phalguni','U. Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','P. Ashadha','U. Ashadha','Shravana','Dhanishta','Shatabhisha','P. Bhadrapada','U. Bhadrapada','Revati'];
  return (
    <div className="container" style={{ padding: '24px 28px 60px' }}>
      <SectionHeader title="27 Nakshatras" sub="The lunar mansions — each spanning 13°20' of the ecliptic." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {nak.map((n, i) => (
          <div key={n} className="card card-hover" style={{ padding: 14, cursor: 'pointer' }}>
            <div className="eyebrow" style={{ fontSize: 9 }}>Nakshatra {i+1}</div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{n}</div>
            {n === 'Punarvasu' && <span className="chip chip-accent" style={{ marginTop: 8 }}>Today's</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { CalendarPage });
