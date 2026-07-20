// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const TEAM = [
  { name: 'Ahmet Y.', role: 'Gründer & Geschäftsführer', color: '#5B21B6' },
  { name: 'Elif K.', role: 'Kundenservice Leitung', color: '#EC7C9D' },
  { name: 'Mert T.', role: 'Operations Manager', color: '#4E7FD1' },
  { name: 'Sarah L.', role: 'Marketing Managerin', color: '#8FB37F' },
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
      `}</style>

      <header className="bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2"><img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" /></a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
            <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Für Helfer
            </a>
            <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="about-menu-btn" className="flex items-center gap-1.5" style={{color: 'var(--purple-700)'}}>
                Über uns
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div id="about-menu" className="dropdown-menu hidden absolute left-0 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
                <a href="/ueber-uns" style={{color: 'var(--ink)'}}>Über uns</a>
                <a href="/unser-team" style={{color: 'var(--ink)'}}>Unser Team</a>
                <a href="/karriere" style={{color: 'var(--ink)'}}>Karriere</a>
                <a href="/kontakt" style={{color: 'var(--ink)'}}>Kontakt</a>
              </div>
            </div>
            <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
          <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full">Reinigung buchen</a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-4 text-sm" style={{color: 'var(--muted)'}}>
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> Über uns
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>ÜBER UNS</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
            TANDEF – Sauberkeit, der Sie <span style={{color: 'var(--purple-700)'}}>vertrauen</span> können.
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
            Wir sind ein Unternehmen aus Köln mit der Mission, Reinigung einfacher, zuverlässiger und transparenter zu machen.
            Mit geprüften Reinigungskräften und einem klaren Qualitätsversprechen sorgen wir für saubere Ergebnisse und zufriedene Kunden – jedes Mal.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href="/address" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg">Jetzt Reinigung buchen</a>
            <a href="#geschichte" className="btn-outline font-semibold px-6 py-3 rounded-lg">Mehr über uns</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>Gegründet in Köln für unsere Region</div>
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>+1.200 zufriedene Kunden</div>
            <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>Zuverlässig & versichert</div>
          </div>
        </div>
        <HeroImg src="/images/team-couch.jpg" height="420px" />
      </section>

      <section id="geschichte" className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <HeroImg src="/images/cologne-cathedral.jpg" height="340px" position="center" />
          <div className="story-badge absolute bottom-6 left-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Aus Köln.<br />Für Köln.
          </div>
        </div>
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>UNSERE GESCHICHTE</p>
          <h2 className="text-3xl font-extrabold mb-5" style={{color: 'var(--ink)'}}>Wie alles begann</h2>
          <p className="mb-4" style={{color: 'var(--muted)'}}>TANDEF wurde 2020 in Köln gegründet – mit einer einfachen Idee: Reinigung sollte so unkompliziert sein wie die Bestellung eines Taxis.</p>
          <p className="mb-4" style={{color: 'var(--muted)'}}>Wir haben selbst erlebt, wie schwierig es ist, eine zuverlässige Reinigungskraft zu finden. Deshalb haben wir TANDEF ins Leben gerufen: eine Plattform, die Qualität, Vertrauen und Komfort verbindet.</p>
          <p style={{color: 'var(--muted)'}}>Heute sind wir stolz darauf, hunderten Haushalten und Unternehmen in Köln ein sauberes und angenehmes Umfeld zu bieten.</p>
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
        <div className="stats-band grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-8">
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
            <p className="text-2xl font-bold">{stats ? `${stats.customers}+` : '—'}</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Zufriedene Kunden</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            <p className="text-2xl font-bold">{stats ? `${stats.cleanings}+` : '—'}</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Abgeschlossene Reinigungen</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
            <p className="text-2xl font-bold">{stats ? `${stats.avgRating} / 5` : '—'}</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Bewertungen unserer Kunden</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
            <p className="text-2xl font-bold">{stats ? `${stats.recommendPct}%` : '—'}</p>
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
    </>
  );
}