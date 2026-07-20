// @ts-nocheck
'use client';

import { useEffect } from 'react';

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function HeroImg({ src, height, position = 'center 30%' }) {
  return (
    <div style={{ height, borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>
  );
}

const LEADERSHIP = [
  { name: 'Ahmet Y.', role: 'Gründer & Geschäftsführer', desc: 'Visionär und Gründer von TANDEF. Verantwortlich für Strategie, Wachstum und Unternehmensentwicklung.', color: '#5B21B6' },
  { name: 'Elif K.', role: 'Kundenservice Leitung', desc: 'Sorgt dafür, dass unsere Kunden die beste Erfahrung machen und steht ihrem Team immer zur Seite.', color: '#EC7C9D' },
  { name: 'Mert T.', role: 'Operations Manager', desc: 'Verantwortlich für operative Abläufe, Qualitätskontrolle und die Optimierung unserer Reinigungsprozesse.', color: '#4E7FD1' },
  { name: 'Sarah L.', role: 'Marketing Managerin', desc: 'Leitet unsere Marketingstrategie und sorgt dafür, dass TANDEF weiterhin wächst und bekannt wird.', color: '#8FB37F' },
];

export default function UnserTeamPage() {
  useEffect(() => {
    document.title = "TANDEF – Unser Team";

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
        .lead-card{border:1px solid #ECE8F5;border-radius:16px;text-align:center;}
        .lead-avatar{width:96px;height:96px;border-radius:9999px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:1.6rem;margin:0 auto;}
        .linkedin-btn{width:32px;height:32px;border-radius:9999px;border:1.5px solid #ECE8F5;display:inline-flex;align-items:center;justify-content:center;color:var(--purple-700);font-size:.7rem;font-weight:800;}
        .why-card{border:1px solid #ECE8F5;border-radius:16px;text-align:center;}
        .why-icon{width:46px;height:46px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;margin:0 auto;}
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
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> <a href="/ueber-uns" className="hover:opacity-70">Über uns</a> <span className="mx-1">›</span> Unser Team
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>UNSER TEAM</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
            Die Menschen hinter <span style={{color: 'var(--purple-700)'}}>TANDEF</span>
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
            Hinter jedem sauberen Zuhause und Büro steht ein Team, das mit Leidenschaft, Erfahrung und Herz arbeitet.
            Lernen Sie die Menschen kennen, die TANDEF jeden Tag besser machen.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div><p className="font-bold text-sm mb-1">Leidenschaftlich</p><p className="text-xs" style={{color: 'var(--muted)'}}>Wir lieben, was wir tun.</p></div>
            <div><p className="font-bold text-sm mb-1">Zuverlässig</p><p className="text-xs" style={{color: 'var(--muted)'}}>Vertrauen ist unser Fundament.</p></div>
            <div><p className="font-bold text-sm mb-1">Gemeinsam</p><p className="text-xs" style={{color: 'var(--muted)'}}>Ein starkes Team für beste Ergebnisse.</p></div>
          </div>
        </div>
        <HeroImg src="/images/team-couch.jpg" height="420px" />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">Unsere <span style={{color: 'var(--purple-700)'}}>Führung</span></h2>
        <p className="text-center mb-10" style={{color: 'var(--muted)'}}>Die Führungskräfte, die TANDEF mit Vision und Strategie leiten.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map(p => (
            <div key={p.name} className="lead-card p-6">
              <div className="lead-avatar mb-4" style={{background: p.color}}>{initials(p.name)}</div>
              <p className="font-bold">{p.name}</p>
              <p className="text-xs font-semibold mb-3" style={{color: 'var(--purple-700)'}}>{p.role}</p>
              <p className="text-sm mb-4" style={{color: 'var(--muted)'}}>{p.desc}</p>
              <span className="linkedin-btn">in</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-extrabold mb-4">Unser <span style={{color: 'var(--purple-700)'}}>Reinigungsteam</span></h2>
          <p className="mb-5" style={{color: 'var(--muted)'}}>Unsere Reinigungskräfte sind das Herzstück von TANDEF. Alle werden sorgfältig ausgewählt, geprüft und regelmäßig geschult, um höchste Qualitätsstandards zu gewährleisten.</p>
          <ul className="space-y-2 mb-6">
            {['Hintergrundgeprüft & verifiziert', 'Professionell geschult', 'Erfahren & zuverlässig', 'Mit Sorgfalt und Respekt'].map(t => (
              <li key={t} className="flex items-center gap-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                {t}
              </li>
            ))}
          </ul>
          <a href="/pro-werden" className="btn-outline font-semibold px-5 py-2.5 rounded-lg inline-block text-sm">Mehr über unsere Helfer</a>
        </div>
        <HeroImg src="/images/cleaning-team.jpg" height="320px" position="center" />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-center mb-10">Warum wir zusammen <span style={{color: 'var(--purple-700)'}}>großartig</span> sind</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            ['💬', 'Offene Kommunikation', 'Wir hören einander zu und teilen Ideen, um gemeinsam die besten Lösungen zu finden.'],
            ['🤝', 'Vertrauen', 'Wir vertrauen einander und übernehmen Verantwortung für unsere Arbeit.'],
            ['❤️', 'Respekt', 'Wir behandeln Kunden, Partner und Kollegen immer mit Respekt.'],
            ['📈', 'Kontinuierliche Verbesserung', 'Wir lernen jeden Tag dazu und streben danach, besser zu werden.'],
            ['😊', 'Spaß bei der Arbeit', 'Ein positives Arbeitsumfeld motiviert uns, unser Bestes zu geben.'],
          ].map(([emoji, t, d]) => (
            <div key={t} className="why-card p-6">
              <div className="why-icon mb-3 text-xl">{emoji}</div>
              <p className="font-bold text-sm mb-1">{t}</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="cta-banner flex flex-col md:flex-row items-center justify-between gap-8 p-10">
          <div>
            <h2 className="text-2xl font-extrabold mb-2">Werden Sie Teil der <span style={{color: 'var(--purple-700)'}}>TANDEF</span> Familie</h2>
            <p className="mb-5" style={{color: 'var(--muted)'}}>Gemeinsam machen wir Köln jeden Tag ein Stück sauberer.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/address" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg">Jetzt Reinigung buchen</a>
              <a href="/karriere" className="btn-outline font-semibold px-6 py-3 rounded-lg">Karriere bei TANDEF</a>
            </div>
          </div>
          <img src="/images/cleaning-supplies.png" className="w-56 h-40 object-contain shrink-0" />
        </div>
      </section>
    </>
  );
}