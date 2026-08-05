// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const TEAM = [
  { name: 'Youssef.', role: 'Gründer & Geschäftsführer', color: '#5B21B6' },
 
  { name: 'Manar.', role: 'Operations Manager', color: '#4E7FD1' },
  
];

function HeroImg({ src, height, position = 'center 30%' }) {
  return (
    <div style={{ height, borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>
  );
}

export default function UeberUnsPage() {
  const [stats, setStats] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Über uns";
    fetch('/api/site/stats').then(r => r.json()).then(setStats);

    const menuBtn = document.getElementById('about-menu-btn');
    const menu = document.getElementById('about-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .btn-primary{background:var(--purple-700);transition:.2s ease;}
        .btn-primary:hover{background:var(--purple-900);}
        .btn-outline{border:1.5px solid var(--purple-700);color:var(--purple-700);transition:.2s ease;}
        .btn-outline:hover{background:var(--purple-50);}
        .trust-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--muted);font-weight:600;}
        .story-badge{background:var(--purple-700);color:#fff;border-radius:14px;padding:1rem 1.4rem;display:inline-flex;align-items:center;gap:.6rem;font-weight:700;}
        .value-card{border:1px solid #ECE8F5;border-radius:16px;text-align:center;}
        .value-icon{width:56px;height:56px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;margin:0 auto;}
        .stats-band{background:var(--purple-50);border-radius:20px;}
        .team-avatar{width:100%;aspect-ratio:1;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:2rem;font-family:'Poppins',sans-serif;}
        .team-card{border:1px solid #ECE8F5;border-radius:16px;overflow:hidden;}
        .cta-banner{background:var(--purple-50);border-radius:20px;overflow:hidden;}
        .dropdown-menu a{display:block;padding:.6rem 1.25rem;font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .social-icon{
          width:36px;height:36px;border-radius:9999px;
          background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;
          color:var(--purple-700);transition:.15s ease;
        }
        .social-icon:hover{background:var(--purple-700);color:#fff;}
      `}</style>

      <header className="bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2"><img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" /></a>
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

          <div className="flex items-center gap-3">
            <a href="/address" className="hidden md:inline-flex btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full items-center">Reinigung buchen</a>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Menü öffnen"
              style={{color: 'var(--purple-700)'}}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-1 text-sm font-medium" style={{borderColor: '#EDE9F5', color: 'var(--ink)'}}>
            <a href="/pro-werden" className="py-3">Pro werden</a>
            <a href="/magazin" className="py-3">Magazin</a>
            <a href="/ueber-uns" className="py-3">Über uns</a>
            <a href="/unser-team" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Unser Team</a>
            <a href="/karriere" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Karriere</a>
            <a href="/kontakt" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Kontakt</a>
            <a href="/login" className="py-3">Login</a>
            <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2">Reinigung buchen</a>
          </nav>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-4 text-sm" style={{color: 'var(--muted)'}}>
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> Über uns
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>ÜBER UNS</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
            TANDEF – Sauberkeit, der Sie <span style={{color: 'var(--purple-700)'}}>vertrauen</span> können.
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
          TANDEF verbindet Kunden mit professionellen Reinigungspartnern – einfach, sicher und zuverlässig. 
          Unsere Mission ist es, hochwertige Reinigungsdienstleistungen für Privat- und Geschäftskunden so einfach zugänglich zu machen wie eine Online-Bestellung. Mit geprüften Partnern, transparenten Abläufen und höchsten Qualitätsstandards sorgen wir für erstklassige Ergebnisse – jedes Mal.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href="/address" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg">Jetzt Reinigung buchen</a>
            <a href="#geschichte" className="btn-outline font-semibold px-6 py-3 rounded-lg">Mehr über uns</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>Gegründet in Köln für unsere Region</div>
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>+500 zufriedene Kunden</div>
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>Zuverlässig & versichert</div>
          </div>
        </div>
        <HeroImg src="/images/tandef.jpeg" height="420px" />
      </section>

      <section id="geschichte" className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <HeroImg src="/images/cologne-cathedral.jpg" height="340px" position="center" />
          <div className="story-badge absolute bottom-6 left-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Aus Köln.<br />Für die welt.
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>UNSERE GESCHICHTE</p>
          <h2 className="text-3xl font-extrabold mb-5" style={{color: 'var(--ink)'}}>Wie alles begann</h2>
          <p className="mb-4" style={{color: 'var(--muted)'}}>TANDEF wurde im Jahr 2026 mit einer klaren Vision gegründet: professionelle Reinigungsdienstleistungen einfacher, transparenter und vertrauenswürdiger zu machen.
 </p>
          <p className="mb-4" style={{color: 'var(--muted)'}}>Wir haben erkannt, dass es für viele Menschen schwierig ist, zuverlässige Reinigungspartner zu finden. Deshalb haben wir eine Plattform entwickelt, die Kunden mit sorgfältig geprüften und professionellen Reinigungspartnern verbindet.</p>
          <p style={{color: 'var(--muted)'}}>Unser Ziel ist es nicht nur, Reinigungsservices anzubieten, sondern einen neuen Qualitätsstandard für die gesamte Branche zu schaffen – mit Transparenz, Zuverlässigkeit und moderner Technologie.</p>
          <p className="mb-4" style={{color: 'var(--muted)'}}>
            Was in Deutschland begann, entwickelt sich Schritt für Schritt zu einer internationalen Plattform. Unsere Vision ist klar: Menschen und professionelle Reinigungspartner weltweit miteinander zu verbinden und hochwertige Dienstleistungen überall zugänglich zu machen.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <p className="text-sm font-bold mb-2" style={{color: 'var(--purple-700)'}}>UNSERE MISSION</p>
        <h2 className="text-3xl font-extrabold mb-12" style={{color: 'var(--ink)'}}>Unsere <span style={{color: 'var(--purple-700)'}}>Werte</span>, unser Versprechen</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="value-card p-7">
            <div className="value-icon mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M5 12l5 5 9-9" /></svg></div>
            <p className="font-bold mb-1">Vertrauen</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Alle unsere Reinigungskräfte sind geprüft, geschult und versichert.</p>
          </div>
          <div className="value-card p-7">
            <div className="value-icon mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg></div>
            <p className="font-bold mb-1">Qualität</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Wir legen höchsten Wert auf Gründlichkeit und exzellente Ergebnisse.</p>
          </div>
          <div className="value-card p-7">
            <div className="value-icon mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></div>
            <p className="font-bold mb-1">Flexibilität</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Buchen Sie, wann Sie wollen. Wir passen uns Ihrem Alltag an.</p>
          </div>
          <div className="value-card p-7">
            <div className="value-icon mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg></div>
            <p className="font-bold mb-1">Zufriedenheit</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Ihre Zufriedenheit steht für uns an erster Stelle – garantiert.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="stats-band grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-8">
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
            <p className="text-2xl font-bold">500</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Zufriedene Kunden</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            <p className="text-2xl font-bold">600</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Abgeschlossene Reinigungen</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
            <p className="text-2xl font-bold">{stats ? `${stats.avgRating} / 5` : '—'}</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Bewertungen unserer Kunden</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Weiterempfehlung</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-10 items-start">
        <div>
          <p className="text-sm font-bold mb-2" style={{color: 'var(--purple-700)'}}>UNSER TEAM</p>
          <h2 className="text-2xl font-extrabold mb-4" style={{color: 'var(--ink)'}}>Die Menschen hinter TANDEF</h2>
          <p className="text-sm mb-5" style={{color: 'var(--muted)'}}>Wir sind ein engagiertes Team mit einer gemeinsamen Leidenschaft: Menschen das Leben zu erleichtern und für mehr Sauberkeit zu sorgen.</p>
          <a href="/unser-team" className="btn-outline font-semibold px-5 py-2.5 rounded-lg inline-block text-sm">Unser Team kennenlernen</a>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TEAM.map(m => (
            <div key={m.name} className="team-card">
              <div className="team-avatar" style={{background: m.color}}>{initials(m.name)}</div>
              <div className="p-3 text-center">
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-xs" style={{color: 'var(--muted)'}}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="cta-banner flex flex-col md:flex-row items-center justify-between gap-8 p-10">
          <div>
            <p className="text-sm font-bold mb-2" style={{color: 'var(--purple-700)'}}>BEREIT FÜR EIN SAUBERES ZUHAUSE?</p>
            <h2 className="text-2xl font-extrabold mb-2" style={{color: 'var(--ink)'}}>Erleben Sie den <span style={{color: 'var(--purple-700)'}}>TANDEF</span> Unterschied.</h2>
            <p className="mb-5" style={{color: 'var(--muted)'}}>Buchen Sie jetzt Ihre Reinigung in Köln – schnell, einfach und zuverlässig.</p>
            <a href="/address" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg inline-block">Jetzt Reinigung buchen</a>
          </div>
          <img src="/images/cleaning-supplies.png" className="w-56 h-40 object-contain shrink-0" />
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