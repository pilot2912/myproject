// ══════ Kashi Shakti — Blog List + Article Detail ═══════

function BlogPage({ setPage, setPageState }) {
  const posts = window.KS_BLOG;
  const [cat, setCat] = React.useState('all');
  const cats = ['all', 'Festivals', 'Panchang', 'Rituals', 'Vrat', 'Temples'];
  const filtered = cat === 'all' ? posts : posts.filter(p => p.cat === cat);
  const [featured, ...rest] = filtered;

  const open = (id) => { setPageState({ articleId: id }); setPage('article'); };

  return (
    <div className="page-enter container" style={{ paddingBottom: 60 }}>
      <PageHeader
        eyebrow="Knowledge · learn, before you observe"
        title="Essays on ritual, tithi and tradition"
        sub="Written by the pandits and scholars who perform these rituals every day. No filler, no slop — working knowledge, plainly said."
      />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={'chip ' + (cat === c ? 'chip-accent' : '')}
            style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
            {c === 'all' ? 'All essays' : c}
          </button>
        ))}
      </div>

      {featured && (
        <div className="card card-hover"
          style={{ overflow: 'hidden', cursor: 'pointer', marginBottom: 28, display: 'grid', gridTemplateColumns: '1.1fr 1.3fr' }}
          onClick={() => open(featured.id)}>
          <div style={{
            background: `linear-gradient(135deg, ${featured.grad[0]} 0%, ${featured.grad[1]} 100%)`,
            minHeight: 320, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff'
          }}>
            <div style={{
              position: 'absolute', top: 18, left: 18,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)',
              padding: '4px 10px', borderRadius: 4
            }}>◆ Featured · {featured.cat}</div>
            <div style={{ fontSize: 160, opacity: 0.85, lineHeight: 1 }}>{featured.glyph}</div>
          </div>
          <div style={{ padding: '34px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{featured.date} · {featured.read} read</div>
            <h2 className="display" style={{ fontSize: 36, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 14, color: 'var(--ink)' }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.6, marginBottom: 20, maxWidth: 520 }}>
              {featured.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600, fontFamily: 'Fraunces, serif'
              }}>{featured.author.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{featured.author}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>Verified contributor</div>
              </div>
              <button className="btn btn-primary">Read essay →</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {rest.map(p => (
          <div key={p.id} className="card card-hover"
            style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            onClick={() => open(p.id)}>
            <div style={{
              height: 160,
              background: `linear-gradient(135deg, ${p.grad[0]} 0%, ${p.grad[1]} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 12, left: 12,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                padding: '3px 8px', borderRadius: 3
              }}>{p.cat}</div>
              <div style={{ fontSize: 68, opacity: 0.92 }}>{p.glyph}</div>
            </div>
            <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>{p.date} · {p.read}</div>
              <h3 className="serif" style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 8, color: 'var(--ink)' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.55, marginBottom: 14, flex: 1 }}>
                {p.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--ink-muted)' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--accent-soft)', color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600
                }}>{p.author.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                <span>{p.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 40,
        padding: '36px 40px',
        background: 'var(--accent-soft)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 6 }}>📬 Weekly digest</div>
          <h3 className="display" style={{ fontSize: 26, letterSpacing: '-0.02em', marginBottom: 4 }}>
            One essay. Every Ekadashi.
          </h3>
          <div style={{ fontSize: 13, color: 'var(--ink-mid)' }}>
            Timed to the tithi, delivered to your inbox — no marketing, no filler.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="your@email.com"
            style={{
              padding: '12px 16px', width: 280,
              border: '1px solid var(--border)', borderRadius: 8,
              background: 'var(--surface)', color: 'var(--ink)',
              fontSize: 13, fontFamily: 'inherit'
            }}/>
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

// ══════ Article Detail ═══════
function ArticlePage({ pageState, setPage, setPageState }) {
  const post = window.KS_BLOG.find(p => p.id === pageState.articleId) || window.KS_BLOG[0];
  const others = window.KS_BLOG.filter(p => p.id !== post.id && p.cat === post.cat).slice(0, 3);
  const moreFrom = others.length ? others : window.KS_BLOG.filter(p => p.id !== post.id).slice(0, 3);

  // Build table of contents from h-blocks
  const toc = post.body.filter(b => b.h).map(b => b.h);

  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [post.id]);

  return (
    <div className="page-enter">
      {/* Reading progress bar */}
      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, height: 2,
        background: 'var(--border-soft)', zIndex: 30
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'var(--accent)',
          transition: 'width 0.1s ease-out'
        }}/>
      </div>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${post.grad[0]} 0%, ${post.grad[1]} 100%)`,
        color: '#fff', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)',
          fontSize: 420, opacity: 0.08, lineHeight: 1, userSelect: 'none'
        }}>{post.glyph}</div>
        <div className="container" style={{ padding: '48px 28px 60px', maxWidth: 1100, position: 'relative' }}>
          <button onClick={() => setPage('blog')} className="btn-link"
            style={{ color: '#fff', opacity: 0.85, marginBottom: 20 }}>← All essays</button>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 16 }}>
            {post.cat} · {post.date} · {post.read} read
          </div>
          <h1 className="display" style={{
            fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.03em',
            maxWidth: 820, marginBottom: 22
          }}>{post.title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.9, maxWidth: 680, marginBottom: 26 }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 600, fontFamily: 'Fraunces, serif', flexShrink: 0
            }}>{post.author.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{post.author}</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>Verified contributor · Kashi Shakti</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '44px 28px 60px', display: 'grid', gridTemplateColumns: '200px 1fr 240px', gap: 44, maxWidth: 1200 }}>
        {/* Left: TOC */}
        <div>
          <div style={{ position: 'sticky', top: 88 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>On this page</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {toc.map((h, i) => (
                <a key={i} href={`#h-${i}`}
                  style={{
                    fontSize: 12, color: 'var(--ink-mid)', textDecoration: 'none',
                    padding: '6px 0 6px 10px',
                    borderLeft: '2px solid var(--border)',
                    cursor: 'pointer', lineHeight: 1.4
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderLeftColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderLeftColor = 'var(--border)'}>
                  {h}
                </a>
              ))}
            </div>
            <div style={{
              marginTop: 24, padding: 14,
              background: 'var(--bg-alt)', borderRadius: 10,
              fontSize: 11, color: 'var(--ink-muted)', lineHeight: 1.5
            }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>⎘ Share</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>🔗</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>✉</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>𝕏</button>
              </div>
            </div>
          </div>
        </div>

        {/* Center: body */}
        <article style={{ maxWidth: 640 }}>
          {post.body.map((b, i) => {
            if (b.h) {
              const hIndex = post.body.slice(0, i + 1).filter(x => x.h).length - 1;
              return (
                <h2 key={i} id={`h-${hIndex}`} className="display"
                  style={{ fontSize: 26, letterSpacing: '-0.02em', marginTop: i === 0 ? 0 : 36, marginBottom: 14, color: 'var(--ink)', scrollMarginTop: 88 }}>
                  {b.h}
                </h2>
              );
            }
            if (b.p) {
              return (
                <p key={i} className="serif" style={{
                  fontSize: 17, lineHeight: 1.7, color: 'var(--ink-mid)',
                  marginBottom: 18, textWrap: 'pretty', fontWeight: 400
                }}>{b.p}</p>
              );
            }
            if (b.list) {
              return (
                <ol key={i} style={{ margin: '8px 0 24px', paddingLeft: 0, listStyle: 'none' }}>
                  {b.list.map(([t, d], j) => (
                    <li key={j} style={{
                      display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14,
                      padding: '12px 0', borderBottom: j < b.list.length - 1 ? '1px dashed var(--border)' : 'none',
                      alignItems: 'baseline'
                    }}>
                      <span className="display" style={{ fontSize: 18, color: 'var(--accent)' }}>
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="serif" style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{t}</div>
                        <div style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}>{d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              );
            }
            return null;
          })}

          {/* End of article divider */}
          <div style={{
            textAlign: 'center', margin: '40px 0 20px',
            color: 'var(--ink-faint)', fontFamily: 'Noto Serif Devanagari, serif',
            fontSize: 20, letterSpacing: '0.6em'
          }}>॥ ॐ ॥</div>

          {/* Author card */}
          <div className="card" style={{ padding: 24, marginTop: 20, display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: `linear-gradient(135deg, ${post.grad[0]}, ${post.grad[1]})`, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontFamily: 'Fraunces, serif', fontWeight: 600
            }}>{post.author.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
            <div style={{ flex: 1 }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Written by</div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>{post.author}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
                Performs rituals at affiliated temples · 12 essays published
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">Follow</button>
          </div>
        </article>

        {/* Right: reading meta */}
        <aside>
          <div style={{ position: 'sticky', top: 88 }}>
            <div className="card" style={{ padding: 18, marginBottom: 16 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>📖 Reading</div>
              <div style={{ fontSize: 12, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span>Length</span><span className="mono">{post.read}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span>Words</span><span className="mono">~{post.body.filter(b=>b.p).length * 90}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span>Sections</span><span className="mono">{toc.length}</span>
                </div>
              </div>
              <div style={{ borderTop: '1px dashed var(--border)', marginTop: 10, paddingTop: 10 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Progress</div>
                <div style={{ height: 4, background: 'var(--border-soft)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)' }}/>
                </div>
              </div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 10 }}>Related</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {moreFrom.slice(0, 2).map(r => (
                <div key={r.id}
                  onClick={() => { setPageState({ articleId: r.id }); window.scrollTo(0, 0); }}
                  style={{
                    padding: 12, border: '1px solid var(--border)', borderRadius: 8,
                    cursor: 'pointer', background: 'var(--surface)'
                  }}>
                  <div className="eyebrow" style={{ marginBottom: 4, fontSize: 9 }}>{r.cat} · {r.read}</div>
                  <div className="serif" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{r.title}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom: more essays */}
      <div style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', padding: '44px 0' }}>
        <div className="container" style={{ padding: '0 28px', maxWidth: 1200 }}>
          <SectionHeader title="Continue reading" action={<button className="btn btn-ghost btn-sm" onClick={() => setPage('blog')}>All essays →</button>}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {moreFrom.map(p => (
              <div key={p.id} className="card card-hover"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => { setPageState({ articleId: p.id }); window.scrollTo(0, 0); }}>
                <div style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${p.grad[0]} 0%, ${p.grad[1]} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 48
                }}>{p.glyph}</div>
                <div style={{ padding: 16 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>{p.cat} · {p.read}</div>
                  <div className="serif" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{p.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BlogPage, ArticlePage });
