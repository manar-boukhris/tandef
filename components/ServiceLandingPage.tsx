'use client';


import { useState, useEffect, type ReactNode } from 'react';
import { ServiceHeroArt } from './ServiceHeroArt';
import type { ServiceLanding } from '@/lib/serviceLandingData';

const WHY_ITEMS = [
    { icon: '/images/people.png', title: 'Sichere Zukunft', desc: 'TANDEF wächst stetig. Werden Sie Teil eines Unternehmens mit einer klaren Vision und langfristiger Perspektive.' },
    { icon: '/images/chart.png', title: 'Persönliche Entwicklung', desc: 'Wir bieten Ihnen Schulungen und Weiterbildungen, damit Sie sich fachlich und persönlich weiterentwickeln können.' },
    { icon: '/images/heart.png', title: 'Wertschätzung', desc: 'Ihre Arbeit zählt. Wir erkennen Ihre Leistung an und schaffen ein Umfeld, in dem Sie sich wohlfühlen und gehört werden.' },
    { icon: '/images/wallet.png', title: 'Faire Vergütung', desc: 'Wir bieten eine faire Bezahlung und zusätzliche Benefits, die Ihre Arbeit und Ihr Engagement würdigen.' },
    { icon: '/images/clock.png', title: 'Starkes Team', desc: 'Ein respektvolles Miteinander und Teamgeist machen uns stark. Gemeinsam erreichen wir mehr.' },
  ];

// Icônes "Was ist enthalten" — images PNG (fond transparent) au lieu de SVG
const INCLUDE_IMG_ICONS: Record<string, string> = {
  kitchen: '/images/kitchen.png',
  bath: '/images/bath.png',
  bed: '/images/living.png',
  floor: '/images/floor.png',
  more: '/images/door.png',
  buroo:'/images/platz.png',
  window:'/images/fenester.png',
};

const ICONS: Record<string, ReactNode> = {
  desk: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="3" y="4" width="18" height="10" rx="1" /><path d="M7 14v6M17 14v6" /></svg>,
  trash: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>,
  coffee: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 9h13v6a4 4 0 01-4 4H8a4 4 0 01-4-4V9z" /><path d="M17 10h2a2 2 0 010 4h-2" /></svg>,
  window: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M12 4v16M4 12h16" /></svg>,
  extra: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M12 5v14M5 12h14" /></svg>,
  shield: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>,
  star: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>,
  calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  click: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M9 9l6 6M13 4v2M20 11h2M4 11h2M9 4l1 2M14 20l-1-2" /></svg>,
  depth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
  check: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M5 12l5 5 9-9" /></svg>,
  lock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>,
  headset: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M3 12a9 9 0 0118 0v5a2 2 0 01-2 2h-2v-7h4M3 17v-5h4v7H5a2 2 0 01-2-2z" /></svg>,
};

function renderIncludeIcon(key: string) {
  if (INCLUDE_IMG_ICONS[key]) {
    return <img src={INCLUDE_IMG_ICONS[key]} alt={key} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
  }
  return ICONS[key];
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function StarRow({ count }: { count: number }) {
  return (
    <span style={{ color: '#F5A623' }}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export function ServiceLandingPage({ data }: { data: ServiceLanding }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/site/reviews?limit=3')
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .hero-card{background:#fff;border-radius:20px;box-shadow:0 20px 50px -25px rgba(76,29,149,.3);overflow:hidden;}
        .badge{background:var(--purple-100);color:var(--purple-700);font-size:.8rem;font-weight:700;padding:.4rem 1rem;border-radius:9999px;display:inline-flex;align-items:center;gap:.3rem;}
        .trust-badge{display:flex;align-items:center;gap:.4rem;font-size:.85rem;color:var(--muted);font-weight:600;}
        .btn-primary{background:var(--purple-700);transition:.2s ease;}
        .btn-primary:hover{background:var(--purple-600);}
        .btn-outline{border:1.5px solid var(--purple-700);color:var(--purple-700);transition:.2s ease;}
        .btn-outline:hover{background:var(--purple-50);}
        .price-tag{background:#fff;border-radius:16px;box-shadow:0 20px 45px -20px rgba(76,29,149,.35);}
        .include-card{background:#F9F7FE;border-radius:16px;}
        .include-icon{width:52px;height:52px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;padding:11px;}
        .plan-card{background:#fff;border:1.5px solid #ECE8F5;border-radius:18px;position:relative;}
        .plan-card.popular{border-color:var(--purple-600);box-shadow:0 20px 45px -20px rgba(76,29,149,.35);}
        .plan-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--purple-700);color:#fff;font-size:.75rem;font-weight:700;padding:.3rem 1rem;border-radius:9999px;white-space:nowrap;}
        .plan-btn{border:1.5px solid var(--purple-700);color:var(--purple-700);transition:.2s ease;}
        .plan-btn.filled{background:var(--purple-700);color:#fff;}
        .why-card{background:#F9F7FE;border-radius:16px;}
        .why-icon{width:46px;height:46px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;}
        .review-card{background:#F9F7FE;border-radius:14px;}
        .avatar{width:38px;height:38px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-500),var(--purple-700));flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem;}
        .faq-item{border-bottom:1px solid #ECE8F5;}
        .faq-question{cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:1rem 0;font-weight:600;}
        .faq-chevron{transition:transform .2s ease;}
        .faq-chevron.open{transform:rotate(180deg);}
        .cta-banner{background:linear-gradient(135deg,var(--purple-100),#FCE7F3);border-radius:24px;}

        /* Section "Warum TANDEF" — classes manquantes qui causaient les icônes géantes */
        .why-panel{background:var(--purple-50);border-radius:20px;padding:48px 40px;}
        .why-icon-circle{width:70px;height:70px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:16px;}
        .why-icon-circle img{width:100%;height:100%;object-fit:contain;}
        .why-item{display:flex;align-items:flex-start;gap:18px;padding:0 28px;margin-bottom:1.5rem;}
        .why-divider-v{border-left:1px solid #E2D9F5;}
        .why-divider-h{border-top:1px solid #E2D9F5;}
        .why-dash{height:1px;width:36px;background:#B9A5EC;display:inline-block;vertical-align:middle;}
      `}</style>

      <header className="bg-white border-b" style={{ borderColor: '#EDE9F5' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
            <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Pro werden
            </a>
            <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>

            <div className="relative">
              <button id="about-menu-btn" className="flex items-center gap-1.5 hover:opacity-70">
                Über uns
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div id="about-menu" className="hidden absolute left-1/2 -translate-x-1/2 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
                <a href="/ueber-uns" className="block px-5 py-2.5 text-sm hover:opacity-70" style={{color: 'var(--ink)'}}>Über uns</a>
                <a href="/unser-team" className="block px-5 py-2.5 text-sm hover:opacity-70" style={{color: 'var(--ink)'}}>Unser Team</a>
                <a href="/karriere" className="block px-5 py-2.5 text-sm hover:opacity-70" style={{color: 'var(--ink)'}}>Karriere</a>
                <a href="/kontakt" className="block px-5 py-2.5 text-sm hover:opacity-70" style={{color: 'var(--ink)'}}>Kontakt</a>
              </div>
            </div>

            <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
          <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            Reinigung buchen
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-4 text-sm" style={{ color: 'var(--muted)' }}>
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> Unsere Leistungen <span className="mx-1">›</span> {data.title}
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge mb-4">{data.badge}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-1" style={{ color: 'var(--ink)' }}>{data.title}</h1>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ color: 'var(--purple-700)' }}>{data.titleAccent}</h1>
          <p className="text-lg mb-6 max-w-md" style={{ color: 'var(--muted)' }}>{data.subtitle}</p>

          <div className="flex flex-wrap gap-5 mb-8">
            {data.trustBadges.map(t => (
              <span key={t} className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <a href="/address" className="btn-primary text-white font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Jetzt buchen
            </a>
            <a href="#preise" className="btn-outline font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              Preise ansehen
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map(i => <div key={i} className="avatar" style={{ border: '2px solid #fff' }} />)}
            </div>
            <StarRow count={5} />
            <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{data.reviewCount}</span>
          </div>
        </div>

        <div className="relative">
          <div className="hero-card" style={{ height: '380px' }}>
            <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
          </div>
          <div className="price-tag absolute bottom-6 right-6 px-6 py-4 text-center">
            <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Ab</p>
            <p className="text-2xl font-extrabold" style={{ color: 'var(--purple-700)' }}>{data.priceFrom}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{data.priceUnit}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10" style={{ color: 'var(--ink)' }}>
          Was ist in der {data.title} enthalten?
        </h2>
        <div className={`grid sm:grid-cols-2 ${data.includes.length > 5 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'} gap-5`}>
          {data.includes.map(inc => (
            <div key={inc.title} className="include-card p-6 text-center">
              <div className="include-icon mx-auto mb-4">{renderIncludeIcon(inc.icon)}</div>
              <p className="font-bold mb-2" style={{ color: 'var(--ink)' }}>{inc.title}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{inc.desc}</p>
            </div>
          ))}
        </div>
        <p className="flex items-center justify-center gap-2 text-sm mt-8" style={{ color: 'var(--muted)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          Hinweis: {data.hint}
        </p>
      </section>

      <section id="preise" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-baseline gap-3 justify-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--ink)' }}>Unsere Preise</h2>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>Transparente Preise. Keine versteckten Kosten.</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.plans.map(plan => (
            <div key={plan.name} className={`plan-card p-7 ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <span className="plan-badge">Am beliebtesten</span>}
              <p className="font-bold text-lg mb-1" style={{ color: 'var(--ink)' }}>{plan.name}</p>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{plan.desc}</p>
              <p className="mb-5">
                <span className="text-3xl font-extrabold" style={{ color: 'var(--ink)' }}>{plan.price}</span>
                <span className="text-sm ml-1" style={{ color: 'var(--muted)' }}>{plan.unit}</span>
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink)' }}>
                    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/address" className={`plan-btn w-full text-center font-semibold py-3 rounded-xl inline-block ${plan.popular ? 'filled' : ''}`}>
                Auswählen
              </a>
            </div>
          ))}
        </div>
        <p className="flex items-center justify-center gap-2 text-sm mt-8" style={{ color: 'var(--muted)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
          Versichert & sicher – Für Ihre Sicherheit sind alle unsere Reinigungskräfte versichert.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="why-panel">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">Warum <span style={{color: 'var(--purple-700)'}}>TANDEF</span>?</h2>
          <p className="text-center text-sm mb-10 flex items-center justify-center gap-3" style={{color: 'var(--muted)'}}>
            <span className="why-dash"></span>
            Ihre Vorteile bei TANDEF auf einen Blick.
            <span className="why-dash"></span>
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ITEMS.slice(0, 3).map((item, i) => (
              <div key={item.title} className={`why-item pb-8 ${i > 0 ? 'why-divider-v' : ''}`}>
                <div className="why-icon-circle"><img src={item.icon} alt={item.title} /></div>
                <div>
                  <p className="font-bold mb-1.5">{item.title}</p>
                  <p className="text-sm" style={{color: 'var(--muted)'}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 why-divider-h pt-8">
            {WHY_ITEMS.slice(3, 5).map((item, i) => (
              <div key={item.title} className={`why-item ${i > 0 ? 'why-divider-v' : ''}`}>
                <div className="why-icon-circle"><img src={item.icon} alt={item.title} /></div>
                <div>
                  <p className="font-bold mb-1.5">{item.title}</p>
                  <p className="text-sm" style={{color: 'var(--muted)'}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--ink)' }}>Das sagen unsere Kunden</h2>
          <div className="space-y-3">
            {reviews.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Noch keine Bewertungen vorhanden.</p>
            )}
            {reviews.map((r) => (
              <div key={r.id} className="review-card p-5 flex gap-4">
                <div className="avatar">{initials(r.customerName || 'K')}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{r.customerName || 'Kunde'}</p>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>
                      {new Date(r.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  <StarRow count={r.rating} />
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{r.comment || 'Sehr zufrieden mit dem Service.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--ink)' }}>Häufige Fragen</h2>
          <div>
            {data.faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ color: 'var(--ink)' }}>{faq.q}</span>
                  <svg className={`faq-chevron ${openFaq === i ? 'open' : ''} shrink-0`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                {openFaq === i && (
                  <p className="text-sm pb-4" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="cta-banner p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: 'var(--ink)' }}>
              {data.ctaTitle} <span style={{ color: 'var(--purple-700)' }}>{data.ctaAccent}</span>
            </h2>
            <p className="mb-6" style={{ color: 'var(--muted)' }}>{data.ctaSubtitle}</p>
            <a href="/address" className="btn-primary text-white font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              {data.ctaButton}
            </a>
          </div>
          <div className="w-56 h-40 shrink-0 rounded-2xl overflow-hidden">
            <img src="/images/cleaning-supplies.png" alt="Reinigungsmittel" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
            {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Zuverlässige Reinigung in Deutschland – für Zuhause und Unternehmen.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.17H7.5v3.1h2.7V21h3.3z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="https://wa.me/4915214440144" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.9 3.8 13.5 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Leistungen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/wohnungsreinigung" className="hover:opacity-70">Wohnungsreinigung</a></li>
              <li><a href="/bueroreinigung" className="hover:opacity-70">Büroreinigung</a></li>
              <li><a href="/umzugsreinigung" className="hover:opacity-70">Umzugsreinigung</a></li>
            
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Unternehmen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li> <a href="/ueber-uns" className="hover:opacity-70">Über uns</a></li>
              <li><a href="/unser-team" className="hover:opacity-70">Unser Team</a></li>
              <li><a href="/karriere" className="hover:opacity-70">Karriere</a></li>
              <li><a href="/kontakt" className="hover:opacity-70">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Rechtliches</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
            <li><a href="/agb" className="hover:opacity-70">AGB</a></li>
<li><a href="/datenschutz" className="hover:opacity-70">Datenschutz</a></li>
<li><a href="/impressum" className="hover:opacity-70">Impressum</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Kontakt</p>
            <ul className="space-y-3" style={{color: 'var(--muted)'}}>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                +4915214440144
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                info@tandef.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Deutschland
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs pb-8" style={{color: 'var(--muted)'}}>© 2026 Tandef. Alle Rechte vorbehalten.</div>
      </footer>
    </>
  );
}