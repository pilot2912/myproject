import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EkadashiDetails.css';

interface EkadashiData {
  name: string;
  devanagariName: string;
  date: string;
  month: string;
  year: string;
  paksha: string;
  deity: string;
  vikramaSamvata: string;
  tithiBegins: string;
  tithiBeginsDate: string;
  tithiEnds: string;
  tithiEndsDate: string;
  paranaBegins: string;
  paranaBeginsDate: string;
  paranaEnds: string;
  paranaEndsDate: string;
  significance: string;
  vratVidhi: string[];
  vratKatha: string;
  mantras: string;
}

const EkadashiDetails: React.FC = () => {
  const { ekadashiName } = useParams<{ ekadashiName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('eka-significance');

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveTab(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 72; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // 20px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Sample data - In a real application, this would come from an API or database
  const ekadashiDataMap: { [key: string]: EkadashiData } = {
    'Varuthini_Ekadashi': {
      name: 'Varuthini Ekadashi',
      devanagariName: 'वरुथिनी एकादशी',
      date: 'Sunday, 12 May 2026',
      month: 'Vaishakha',
      year: '2026',
      paksha: 'Krishna (Waning)',
      deity: 'Vishnu (Vamana)',
      vikramaSamvata: '2083',
      tithiBegins: '04:38 AM',
      tithiBeginsDate: '12 May 2026',
      tithiEnds: '06:51 AM',
      tithiEndsDate: '13 May 2026',
      paranaBegins: '05:32 AM',
      paranaBeginsDate: '13 May 2026',
      paranaEnds: '08:18 AM',
      paranaEndsDate: '13 May 2026',
      significance: 'The eleventh tithi of the Krishna Paksha in Vaishakha — observed for protection, forgiveness of past karma, and the grace of Lord Vishnu\'s Vamana avatar.',
      vratVidhi: [
        'Pre-dawn: Bathe, wear clean clothes, light a diya at the puja sthal.',
        'Sankalpa: Take the fasting vow before an image of Vamana or Vishnu.',
        'Day: Avoid grains, beans, salt, onion, garlic.',
        'Parana: Break the fast next morning during the Parana window.'
      ],
      vratKatha: 'King Mandhata, a great ruler of the Solar dynasty, was once meditating in the forest when a wild bear attacked his foot. Lord Vishnu appeared and rescued him — and instructed him to observe the Varuthini Ekadashi fast to wash away the karma. The king did so, and was restored to his kingdom in full glory.',
      mantras: 'ॐ नमो भगवते वासुदेवाय ॥'
    }
  };

  const ekadashiData = ekadashiDataMap[ekadashiName || 'Varuthini_Ekadashi'];

  if (!ekadashiData) {
    return (
      <div className="page-error" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 6vw, 36px)', color: 'var(--ink)', marginBottom: 16 }}>Ekadashi not found</h2>
        <p style={{ color: 'var(--ink-muted)', marginBottom: 32 }}>The ekadashi you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go back to home</button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 0 }}>
      {/* Hero Section */}
      <div className="eka-hero" style={{ paddingTop: '122px' }}>
        <div className="eka-hero-inner">
          <div>
            <div className="eka-eyebrow">{ekadashiData.month} · {ekadashiData.paksha} · {ekadashiData.year}</div>
            <h1 className="eka-title">
              {ekadashiData.name.split(' ')[0]}<br/>{ekadashiData.name.split(' ')[1]}
            </h1>
            <div className="eka-title-deva">{ekadashiData.devanagariName}</div>
            <p className="eka-subtitle">
              {ekadashiData.significance}
            </p>
            <div className="eka-meta-row">
              <div className="eka-meta">
                <div className="eka-meta-label">Vikrama Samvata</div>
                <div className="eka-meta-value">{ekadashiData.vikramaSamvata}</div>
              </div>
              <div className="eka-meta">
                <div className="eka-meta-label">Paksha</div>
                <div className="eka-meta-value">{ekadashiData.paksha}</div>
              </div>
              <div className="eka-meta">
                <div className="eka-meta-label">Hindu Month</div>
                <div className="eka-meta-value">{ekadashiData.month}</div>
              </div>
              <div className="eka-meta">
                <div className="eka-meta-label">Deity</div>
                <div className="eka-meta-value">{ekadashiData.deity}</div>
              </div>
            </div>
          </div>

          {/* Feature Card */}
          <div className="eka-feature-card">
            <div className="eka-feature-img" style={{
              background: 'linear-gradient(135deg, #B23A1A 0%, #7A1F1A 100%)'
            }}></div>
            <div className="eka-feature-body">
              <div className="eka-feature-eyebrow">Observance Date</div>
              <div className="eka-feature-title">{ekadashiData.date}</div>
              <div className="eka-dates-grid">
                <div className="eka-date-cell">
                  <div className="eka-date-label">Tithi Begins</div>
                  <div className="eka-date-value">{ekadashiData.tithiBegins}</div>
                  <div className="eka-date-sub">{ekadashiData.tithiBeginsDate}</div>
                </div>
                <div className="eka-date-cell">
                  <div className="eka-date-label">Tithi Ends</div>
                  <div className="eka-date-value">{ekadashiData.tithiEnds}</div>
                  <div className="eka-date-sub">{ekadashiData.tithiEndsDate}</div>
                </div>
                <div className="eka-date-cell">
                  <div className="eka-date-label">Parana Begins</div>
                  <div className="eka-date-value">{ekadashiData.paranaBegins}</div>
                  <div className="eka-date-sub">{ekadashiData.paranaBeginsDate}</div>
                </div>
                <div className="eka-date-cell">
                  <div className="eka-date-label">Parana Ends</div>
                  <div className="eka-date-value">{ekadashiData.paranaEnds}</div>
                  <div className="eka-date-sub">{ekadashiData.paranaEndsDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="eka-body">
        <div className="eka-content">
          <h2 id="eka-significance">Significance & Religious Context</h2>
          <p className="lead">
            Varuthini means 'protected' or 'shielded' — those who fast on this day are said to be guarded
            from misfortune in this life and granted merit equivalent to ten thousand years of penance.
          </p>
          <p>
            Mentioned in the Bhavishya Purana and recounted by Lord Krishna to Yudhishthira, {ekadashiData.name}
            falls in the {ekadashiData.paksha} of {ekadashiData.month}. It is dedicated to the
            {ekadashiData.deity} avatar of Vishnu.
          </p>

          <h2 id="eka-rules">Vrat Vidhi — How to Observe</h2>
          <p>Begin the Vrat from sunrise on Ekadashi and conclude after Dwadashi morning.</p>
          <ul>
            {ekadashiData.vratVidhi.map((item, idx) => (
              <li key={idx}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</li>
            ))}
          </ul>

          <h2 id="eka-katha">The Story — {ekadashiData.name} Vrat Katha</h2>
          <p>{ekadashiData.vratKatha}</p>
          <div className="eka-callout">
            <div className="eka-callout-title">Important Notes</div>
            <p>Parana must be performed within the prescribed window. Breaking fast before sunrise on Dwadashi or after the Parana end-time is considered to nullify the merit of the Vrat.</p>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="eka-side">
          <div className="eka-side-card">
            <h3>On This Page</h3>
            <ul className="eka-side-toc">
              <li><a href="#eka-significance" className={activeTab === 'eka-significance' ? 'active' : ''} onClick={(e) => handleTocClick(e, 'eka-significance')}>Significance</a></li>
              <li><a href="#eka-rules" className={activeTab === 'eka-rules' ? 'active' : ''} onClick={(e) => handleTocClick(e, 'eka-rules')}>Vrat Vidhi</a></li>
              <li><a href="#eka-katha" className={activeTab === 'eka-katha' ? 'active' : ''} onClick={(e) => handleTocClick(e, 'eka-katha')}>The Vrat Katha</a></li>
            </ul>
          </div>

          <div className="eka-side-card">
            <h3>Share This Page</h3>
            <div className="eka-share">
              <button className="eka-share-btn wa">WhatsApp</button>
              <button className="eka-share-btn">𝕏</button>
              <button className="eka-share-btn">f</button>
              <button className="eka-share-btn">📋</button>
            </div>
          </div>
        </aside>
      </div>

      {/* FAQ Section */}
      <div className="eka-faq-section">
        <div className="eka-faq-wrap">
          <div className="eka-faq-head">
            <h2>Frequently Asked Questions</h2>
            <p>Common queries about observing {ekadashiData.name} correctly.</p>
          </div>
          <div className="eka-faq-list">
            <FAQItem
              question="Can pregnant women observe this fast?"
              answer="No — scriptural injunctions explicitly exempt the unwell, pregnant women, the elderly, and growing children. Sincerity of intention is what matters most."
            />
            <FAQItem
              question="What food can I eat during the Vrat?"
              answer="Permitted: fruits, milk, makhana, sabudana, singhara flour preparations, rock salt. Avoided: grains (rice, wheat), lentils, regular salt, onion, garlic."
              defaultOpen={false}
            />
            <FAQItem
              question="When should I break my fast?"
              answer="You must break your fast (Parana) during the prescribed time window. Breaking it before sunrise on Dwadashi or after the Parana end-time nullifies the fast's merit."
              defaultOpen={false}
            />
          </div>
        </div>
      </div>

      {/* Recommended Articles Section */}
      <section className="eka-related-section">
        <div className="eka-related-inner">
          <div className="eka-related-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Further Reading</div>
              <h2>Recommended for you</h2>
            </div>
            <a href="#" className="btn-link">View all articles →</a>
          </div>

          <div className="eka-card-grid">
            <ArticleCard
              tag="Vedic Wisdom"
              title="Why we keep Ekadashi: A science of the digestive cycle"
              excerpt="Exploring the Ayurvedic and chronobiological reasoning behind the eleventh tithi and its impact on the body."
              readTime="12 min read"
              author="By Pandit Arjun Sharma"
              bgColor="#F0D9CC"
            />
            <ArticleCard
              tag="Vrat Katha"
              title="The Legend of King Mandhata and the Bear"
              excerpt="A deep dive into the Varuthini Vrat Katha and the spiritual symbolism of protection in the Solar dynasty."
              readTime="8 min read"
              author="By Dr. Vidya Prakash"
              bgColor="#E6EFD8"
            />
            <ArticleCard
              tag="Varanasi"
              title="Top Varanasi Temples for Ekadashi Darshan"
              excerpt="A pilgrim's guide to the most significant temples in Kashi to visit specifically on the eleventh lunar day."
              readTime="10 min read"
              author="By Kashi Shakti Team"
              bgColor="#FCEBD5"
            />
          </div>
        </div>
      </section>

      {/* Next Ekadashi CTA Section */}
      <div className="eka-next">
        <div className="eka-next-inner">
          <div>
            <div className="eka-next-eyebrow">Up Next · Shukla Paksha · Vaishakha</div>
            <h2 className="eka-next-title">Mohini Ekadashi</h2>
            <div className="eka-next-deva">मोहिनी एकादशी</div>
            <div className="eka-next-meta">
              <span><strong>27 May 2026</strong> · Wednesday</span>
              <span>Tithi begins <strong>02:14 AM</strong></span>
              <span>Parana <strong>28 May · 05:33–08:24 AM</strong></span>
            </div>
          </div>
          <button className="btn btn-primary" style={{ background: 'var(--gold-bright)', borderColor: 'var(--gold-bright)', color: 'var(--ink)', padding: '16px 28px', fontSize: 15 }} onClick={() => navigate('/ekadashi/Mohini_Ekadashi')}>View Mohini Ekadashi →</button>
        </div>
      </div>

      {/* Page Divider */}
      <div className="page-divider">
        <span className="page-divider-mark">॥ ॐ ॥</span>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

interface ArticleCardProps {
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  bgColor: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ tag, title, excerpt, readTime, author, bgColor }) => {
  return (
    <a href="#" className="article-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="article-card-img" style={{ backgroundColor: bgColor }}></div>
      <div className="article-card-body">
        <div className="article-card-tag">{tag}</div>
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-excerpt">{excerpt}</p>
        <div className="article-card-meta">
          <span>{readTime}</span>
          <span className="dot"></span>
          <span>{author}</span>
        </div>
      </div>
    </a>
  );
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`eka-faq-item ${!isOpen ? 'closed' : ''}`}>
      <div className="eka-faq-q" onClick={() => setIsOpen(!isOpen)}>
        {question} <span className="icon"></span>
      </div>
      <div className="eka-faq-a">{answer}</div>
    </div>
  );
};

export default EkadashiDetails;
