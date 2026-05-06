import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchHomeData } from '../store/homeSlice';
import type { RootState, AppDispatch } from '../store/store';
import Loading from '../components/Loading';

interface SectionHeaderProps {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  color?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  sub, 
  action, 
  align = 'left', 
  color = 'var(--ink)' 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: align === 'center' ? 'column' : 'row', 
      alignItems: align === 'center' ? 'center' : 'flex-start', 
      justifyContent: align === 'center' ? 'center' : 'space-between', 
      marginBottom: 'clamp(20px, 5vw, 32px)', 
      textAlign: align as any,
      gap: 'clamp(16px, 3vw, 24px)',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 className="display" style={{ fontSize: 'clamp(24px, 6vw, 36px)', color: color, lineHeight: 1.1 }}>{title}</h2>
        {sub && <div style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--ink-muted)', marginTop: 'clamp(8px, 2vw, 12px)', maxWidth: 600, margin: align === 'center' ? '8px auto 0' : '8px 0 0' }}>{sub}</div>}
      </div>
      {action && <div style={{ marginTop: align === 'center' ? 'clamp(16px, 3vw, 24px)' : 0, flexShrink: 0 }}>{action}</div>}
    </div>
  );
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.home);
  const hasFetched = useRef(false);

  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const d = 3, h = 14, m = 22, s = 59 - new Date(now).getSeconds();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchHomeData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load landing page data: ${error}`);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-enter" style={{ paddingBottom: 0 }}>
      
      {/* 1. Impactful Full-Screen Hero Section */}
      <div style={{ 
          position: 'relative', 
          minHeight: 'clamp(60vh, 95vh, 100vh)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, rgba(30, 20, 16, 0.4), rgba(30, 20, 16, 0.85)), url("https://images.unsplash.com/photo-1596423735880-5fec800a5528?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80") center/cover no-repeat', 
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll',
          color: '#fff', 
          padding: 'clamp(80px, 15vw, 140px) clamp(16px, 5vw, 40px) clamp(100px, 15vw, 180px)', 
          textAlign: 'center',
          marginTop: '72px'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div className="eyebrow" style={{ color: 'var(--gold-bright)', marginBottom: 'clamp(12px, 2vw, 16px)', letterSpacing: '0.2em', fontSize: 'clamp(10px, 2vw, 12px)' }}>Your Gateway to Sanatan Dharma</div>
            <h1 className="display" style={{ fontSize: 'clamp(28px, 8vw, 72px)', lineHeight: 1.05, marginBottom: 'clamp(16px, 3vw, 24px)', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
                One Platform For All Your Spiritual Needs
            </h1>
            <p style={{ fontSize: 'clamp(14px, 3vw, 20px)', opacity: 0.95, marginBottom: 'clamp(24px, 5vw, 40px)', textShadow: '0 2px 10px rgba(0,0,0,0.6)', fontWeight: 400, lineHeight: 1.6 }}>
                Discover authentic Vrat Kathas, track precise Panchang timings, learn proper Puja Vidhis, and explore the divine temples of Kashi.
            </p>
            <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 20px)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)', fontSize: 'clamp(13px, 2vw, 16px)', borderRadius: 12 }}>Explore Platform →</button>
                <button className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)', fontSize: 'clamp(13px, 2vw, 16px)', borderRadius: 12, backdropFilter: 'blur(4px)' }}>Read Vrat Kathas</button>
            </div>
        </div>
      </div>

      {/* Floating Trackers (Nearest Sacred Day + Countdown) overlapping the hero */}
      <div className="container" style={{ marginTop: 'clamp(-60px, -10vw, -100px)', position: 'relative', zIndex: 10, marginBottom: 'clamp(40px, 8vw, 60px)' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(16px, 3vw, 24px)' }}>
            {/* Next Sacred Fast */}
            <div className="card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)', boxShadow: 'var(--shadow-lg)', background: 'var(--surface)' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap' }}>
                      <span className="chip chip-accent">Next Sacred Fast</span>
                      <span style={{ fontSize: 'clamp(11px, 2vw, 13px)', color: 'var(--ink-mid)', fontWeight: 600 }}>26 April 2026</span>
                  </div>
                  <h2 className="display" style={{ fontSize: 'clamp(22px, 5vw, 32px)', color: 'var(--ink)' }}>Varuthini Ekadashi</h2>
                  <div style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: 'var(--ink-muted)', marginTop: 8 }}>Observe the fast, read the Katha & track Parana timings.</div>
               </div>
               <button className="btn btn-primary" style={{ width: '100%' }}>View Timings →</button>
            </div>
            
            {/* Festival Countdown */}
            <div className="card" style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)', boxShadow: 'var(--shadow-lg)', background: 'var(--bg-alt)' }}>
               <div>
                  <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--maroon)', width: '100%' }}>Major Festival Upcoming</div>
                  <h2 className="serif" style={{ fontSize: 'clamp(20px, 4vw, 24px)', color: 'var(--ink)', fontWeight: 600 }}>Ram Navami</h2>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: 'clamp(8px, 2vw, 12px)', textAlign: 'center' }}>
                  {[[d,'Days'],[h,'Hours'],[m,'Mins'],[s,'Secs']].map(([val, lbl], i) => (
                    <div key={i} style={{ background: 'var(--surface)', padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2vw, 16px)', borderRadius: 12, border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
                      <div className="display" style={{ fontSize: 'clamp(18px, 4vw, 28px)', color: 'var(--maroon)', lineHeight: 1 }}>{String(val).padStart(2,'0')}</div>
                      <div style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6, fontWeight: 700 }}>{lbl}</div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* 2. Authenticity Section */}
      <div className="section-bg-pattern" style={{ padding: 'clamp(30px, 8vw, 40px) 0 clamp(50px, 8vw, 80px)', borderBottom: '1px solid var(--border-soft)' }}>
         <div className="container" style={{ position: 'relative', zIndex: 1 }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(30px, 5vw, 48px)', textAlign: 'center' }}>
                 <div>
                     <img src="https://img.icons8.com/ios/100/b23a1a/om.png" style={{ width: 'clamp(48px, 8vw, 64px)', height: 'clamp(48px, 8vw, 64px)', marginBottom: 'clamp(12px, 3vw, 20px)' }} alt="Om Icon"/>
                     <h3 className="serif" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'clamp(8px, 2vw, 12px)' }}>Authentic Shastric Knowledge</h3>
                     <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>100% accurate Panchang, Vrat Kathas, and Puja Vidhis rooted in ancient Vedic texts.</p>
                 </div>
                 <div>
                     <img src="https://img.icons8.com/ios/100/b23a1a/hindu-temple.png" style={{ width: 'clamp(48px, 8vw, 64px)', height: 'clamp(48px, 8vw, 64px)', marginBottom: 'clamp(12px, 3vw, 20px)' }} alt="Temple Icon"/>
                     <h3 className="serif" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'clamp(8px, 2vw, 12px)' }}>Detailed Temple Guides</h3>
                     <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>Deep historical and spiritual insights into Kashi's sacred ghats, shrines, and corridors.</p>
                 </div>
                 <div>
                     <img src="https://img.icons8.com/ios/100/b23a1a/praying-man.png" style={{ width: 'clamp(48px, 8vw, 64px)', height: 'clamp(48px, 8vw, 64px)', marginBottom: 'clamp(12px, 3vw, 20px)' }} alt="Ritual Icon"/>
                     <h3 className="serif" style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'clamp(8px, 2vw, 12px)' }}>Comprehensive Rituals</h3>
                     <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>Your definitive platform for learning daily Aarti, Chadhava, and spiritual worship processes.</p>
                 </div>
             </div>
         </div>
      </div>

      {/* 3. Tithi Trackers (Ekadashi, Purnima, Amavasya, Pradosh) */}
      <div className="container" style={{ padding: 'clamp(50px, 8vw, 80px) clamp(16px, 5vw, 40px) 0', position: 'relative', zIndex: 1 }}>
         <SectionHeader title="Sacred Lunar Days" sub="Track all upcoming observances based on your city's Panchang." />
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(12px, 3vw, 20px)', paddingTop: 10 }}>
            {[
              { type: 'Vrat', name: 'Pradosh Vrat', date: '03 May 2026', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80' },
              { type: 'Ekadashi', name: 'Varuthini', date: '26 Apr 2026', highlight: true, img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80' },
              { type: 'Purnima', name: 'Chaitra Purnima', date: '15 Apr 2026', img: 'https://images.unsplash.com/photo-1514222026211-13c5ec8233ed?w=400&q=80' },
              { type: 'Amavasya', name: 'Chaitra Amavasya', date: '27 Apr 2026', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=400&q=80' },
              { type: 'Pradosh', name: 'Shukla Pradosh', date: '03 May 2026', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80' },
            ].map((t, idx) => (
              <div key={idx} className="card card-hover" style={{ borderTop: t.highlight ? '4px solid var(--accent)' : '1px solid var(--border)' }}>
                 <div className="bg-image-cover" style={{ height: 'clamp(70px, 15vw, 100px)', backgroundImage: `url(${t.img})` }}></div>
                 <div style={{ padding: 'clamp(12px, 2vw, 16px) clamp(12px, 2vw, 20px)' }}>
                     <div className="eyebrow" style={{ marginBottom: 6, color: t.highlight ? 'var(--accent)' : 'var(--ink-muted)', fontSize: 'clamp(8px, 1.5vw, 10px)' }}>Nearest {t.type}</div>
                     <div className="serif" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: 600, color: 'var(--ink)' }}>{t.name}</div>
                     <div style={{ fontSize: 'clamp(11px, 2vw, 13px)', color: 'var(--ink-mid)', marginTop: 6, fontWeight: 500 }}>{t.date}</div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* 4. Explore Temples (Immersive & Modern Layout) */}
      <div style={{ background: 'var(--ink)', color: 'var(--surface)', marginTop: 'clamp(60px, 10vw, 100px)', padding: 'clamp(50px, 8vw, 100px) 0' }}>
        <div className="container">
           <SectionHeader align="center" title="Explore Divine Temples" sub="Journey through the sacred corridors of India." color="var(--surface)" action={<button className="btn btn-ghost" style={{borderColor: 'rgba(255,255,255,0.3)', color: '#fff'}}>View All Temples →</button>} />
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(16px, 3vw, 24px)', marginTop: 'clamp(30px, 5vw, 48px)' }}>
              {[
                { name: 'Kashi Vishwanath Corridor', loc: 'Kashi Darshan', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80', featured: true },
                { name: 'Sankat Mochan', loc: 'Varanasi', img: 'https://images.unsplash.com/photo-1514222026211-13c5ec8233ed?auto=format&fit=crop&w=600&q=80' },
                { name: 'Mahakaleshwar', loc: 'Ujjain', img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80' },
                { name: 'Ram Mandir', loc: 'Ayodhya', img: 'https://images.unsplash.com/photo-1600078686884-6014d5e21fb2?auto=format&fit=crop&w=600&q=80' },
                { name: 'Dashashwamedh', loc: 'Varanasi Ghat', img: 'https://images.unsplash.com/photo-1596423735880-5fec800a5528?auto=format&fit=crop&w=600&q=80' }
              ].map((tmpl, idx) => (
                <div key={idx} className="card card-hover" style={{ position: 'relative', background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url("${tmpl.img}") center/cover`, border: 'none', cursor: 'pointer', minHeight: 'clamp(200px, 30vw, 280px)', gridColumn: tmpl.featured ? 'span 1' : 'span 1' }}>
                   <div style={{ position: 'absolute', bottom: 'clamp(12px, 3vw, 20px)', left: 'clamp(12px, 3vw, 20px)' }}>
                      {tmpl.featured && <span className="chip" style={{ background: 'var(--accent)', color: '#fff', border: 'none', marginBottom: 8, display: 'inline-block', fontSize: 'clamp(10px, 2vw, 12px)' }}>Featured</span>}
                      <div className="serif" style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 600, color: '#fff', marginBottom: 4 }}>{tmpl.name}</div>
                      <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--gold-bright)', fontWeight: 500 }}>📍 {tmpl.loc}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* 5. Custom UI: Hindu Festivals (Month-wise Timeline) */}
      <div className="container" style={{ padding: 'clamp(50px, 8vw, 80px) clamp(16px, 5vw, 40px) 0', position: 'relative', zIndex: 1 }}>
         <SectionHeader title="Hindu Festivals Calendar" sub="Month-wise breakdown of prominent Sanatan festivals." />
         <div style={{ display: 'flex', overflowX: 'auto', gap: 'clamp(12px, 3vw, 20px)', paddingBottom: 24, paddingTop: 5, scrollbarWidth: 'none' }}>
            {[
              { m: 'Chaitra', count: '5', active: true }, { m: 'Vaishakha', count: '3' }, 
              { m: 'Jyeshtha', count: '2' }, { m: 'Ashadha', count: '4' }, 
              { m: 'Shravana', count: '6' }, { m: 'Bhadrapada', count: '7' },
              { m: 'Ashvina', count: '4' }, { m: 'Kartika', count: '8' }
            ].map((month, idx) => (
               <div key={idx} style={{ 
                   minWidth: 'clamp(120px, 20vw, 140px)', textAlign: 'center', padding: 'clamp(16px, 3vw, 24px) clamp(12px, 2vw, 16px)', 
                   borderRadius: 100, border: month.active ? '2px solid var(--accent)' : '1px solid var(--border)',
                   background: month.active ? 'var(--accent-soft)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.2s' 
               }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                   <h3 className="serif" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: month.active ? 'var(--accent)' : 'var(--ink)' }}>{month.m}</h3>
                   <p style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', color: 'var(--ink-muted)', marginTop: 4 }}>{month.count} Festivals</p>
               </div>
            ))}
         </div>
      </div>

      {/* 6. Custom UI: Vrat Katha (Book/List Layout) & Puja Vidhi (Step Cards) */}
      <div className="container" style={{ padding: 'clamp(50px, 8vw, 80px) clamp(16px, 5vw, 40px) 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(30px, 5vw, 48px)' }}>
         
         {/* Vrat Katha List */}
         <div>
            <SectionHeader title="Vrat Kathas" sub="Read the authentic stories behind the fasts." action={<button className="btn-link">View Library →</button>}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)' }}>
               {[
                 { title: 'Shri Satyanarayan Katha', desc: 'Complete katha for full moon fasting.', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=150&q=80' },
                 { title: 'Varuthini Ekadashi Katha', desc: 'The legendary tale of King Mandhata.', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=150&q=80' },
                 { title: 'Somvati Amavasya Katha', desc: 'Significance of ancestral offerings.', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=150&q=80' }
               ].map((katha, idx) => (
                 <div key={idx} className="card card-hover katha-card" style={{ display: 'flex', width: '100%', padding: '12px 14px', alignItems: 'center', cursor: 'pointer', gap: '12px', textAlign: 'left' }}>
                    <div className="bg-image-cover" style={{ width: 72, height: 72, minWidth: 72, borderRadius: 12, backgroundImage: `url(${katha.img})` }}></div>
                    <div style={{ flex: 1 }}>
                       <h4 className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{katha.title}</h4>
                       <p style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.5 }}>{katha.desc}</p>
                    </div>
                    <button className="btn btn-ghost btn-sm" style={{ borderRadius: 100, whiteSpace: 'nowrap', padding: '8px 12px' }}>Read 📖</button>
                 </div>
               ))}
            </div>
         </div>

         {/* Puja Vidhi Step Cards */}
         <div>
            <SectionHeader title="Puja Vidhi" sub="Step-by-step guides for home worship." action={<button className="btn-link">All Vidhis →</button>}/>
            <div className="puja-grid" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
               {[
                 { title: 'Rudrabhishek', steps: '12 Steps', icon: '🔱' },
                 { title: 'Ganesh Sthapana', steps: '8 Steps', icon: '🐘' },
                 { title: 'Diwali Lakshmi Puja', steps: '15 Steps', icon: '🪔' },
                 { title: 'Tulsi Vivah', steps: '10 Steps', icon: '🌿' }
               ].map((vidhi, idx) => (
                 <div key={idx} className="card card-hover puja-card" style={{ padding: 'clamp(20px, 2.5vw, 28px)', cursor: 'pointer', borderTop: '4px solid var(--maroon)', textAlign: 'center', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 'clamp(58px, 5vw, 55px)', marginBottom: 'clamp(32px, 2vw, 20px)' }}>{vidhi.icon}</div>
                      <h4 className="serif" style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 600, marginBottom: 0 }}>{vidhi.title}</h4>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;
