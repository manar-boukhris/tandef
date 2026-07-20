'use client';


import { useState, useEffect, type ReactNode } from 'react';
import { ServiceHeroArt } from './ServiceHeroArt';
import type { ServiceLanding } from '@/lib/serviceLandingData';

const ICONS: Record<string, ReactNode> = {
  kitchen: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3v6M16 3v6M4 13h16" /></svg>,
  bath: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z" /><path d="M6 12V6a2 2 0 012-2" /></svg>,
  bed: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6" /><path d="M3 18h18M5 10V6a2 2 0 012-2h4a2 2 0 012 2v4" /></svg>,
  floor: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 4l16 16M4 20L20 4" /></svg>,
  more: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>,
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
        .include-icon{width:52px;height:52px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;}
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
      `}</style>

      <header className="bg-white border-b" style={{ borderColor: '#EDE9F5' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--ink)' }}>
            <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Für Helfer
            </a>
            <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
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
              <div className="include-icon mx-auto mb-4">{ICONS[inc.icon]}</div>
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10" style={{ color: 'var(--ink)' }}>Warum TANDEF?</h2>
        <div className={`grid sm:grid-cols-2 ${data.whyUs.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-5`}>
          {data.whyUs.map(w => (
            <div key={w.title} className="why-card p-6">
              <div className="why-icon mb-4">{ICONS[w.icon]}</div>
              <p className="font-bold mb-1" style={{ color: 'var(--ink)' }}>{w.title}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{w.desc}</p>
            </div>
          ))}
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
    </>
  );
}