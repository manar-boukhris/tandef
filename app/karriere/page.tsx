// @ts-nocheck
'use client';

import { useEffect } from 'react';

function HeroImg({ src, height, position = 'center 30%' }) {
  return (
    <div style={{ height, borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>
  );
}

const JOBS = [
  { title: 'Kundenservice Mitarbeiter (m/w/d)', tags: 'Köln · Vollzeit/Teilzeit / Minijob · Hybrid', desc: 'Sie sind die erste Anlaufstelle für unsere Kunden und sorgen für eine hervorragende Betreuung und Zufriedenheit.', icon: 'headset' },
  { title: 'Vertriebsmitarbeiter (m/w/d)', tags: 'Köln · Vollzeit/Teilzeit / Minijob · Vor Ort', desc: 'Sie gewinnen neue Kunden und bauen langfristige Partnerschaften auf.', icon: 'building' },
  { title: 'Teamleiter Reinigung (m/w/d)', tags: 'Köln · Vollzeit/Teilzeit / Minijob · Vor Ort', desc: 'Sie führen Reinigungsteams, planen Einsätze und stellen höchste Qualitätsstandards sicher.', icon: 'team' },
 
];

const JOB_ICONS = {
  headset: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M3 12a9 9 0 0118 0v5a2 2 0 01-2 2h-2v-7h4M3 17v-5h4v7H5a2 2 0 01-2-2z" /></svg>,
  building: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h1M12 7h1M16 7h1M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1" /></svg>,
  team: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M2 21c0-4 3-6 7-6M22 21c0-4-3-6-7-6" /></svg>,
  spray: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 22V10a3 3 0 013-3h2M9 7V4a1 1 0 011-1h2a1 1 0 011 1v3M14 7h3l2 2" /><path d="M20 4l1 1M18 6l1 1M16 4l1 1" /></svg>,
};

const WHY_ITEMS = [
  { icon: '/images/people.png', title: 'Sichere Zukunft', desc: 'TANDEF wächst stetig. Werden Sie Teil eines Unternehmens mit einer klaren Vision und langfristiger Perspektive.' },
  { icon: '/images/chart.png', title: 'Persönliche Entwicklung', desc: 'Wir bieten Ihnen Schulungen und Weiterbildungen, damit Sie sich fachlich und persönlich weiterentwickeln können.' },
  { icon: '/images/heart.png', title: 'Wertschätzung', desc: 'Ihre Arbeit zählt. Wir erkennen Ihre Leistung an und schaffen ein Umfeld, in dem Sie sich wohlfühlen und gehört werden.' },
  { icon: '/images/wallet.png', title: 'Faire Vergütung', desc: 'Wir bieten eine faire Bezahlung und zusätzliche Benefits, die Ihre Arbeit und Ihr Engagement würdigen.' },
  { icon: '/images/clock.png', title: 'Starkes Team', desc: 'Ein respektvolles Miteinander und Teamgeist machen uns stark. Gemeinsam erreichen wir mehr.' },
];

export default function KarrierePage() {
  useEffect(() => {
    document.title = "TANDEF – Karriere";

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
        .trust-item{text-align:left;}
        .why-panel{background:var(--purple-50);border-radius:20px;padding:48px 40px;}
        .why-icon-circle{width:70px;height:70px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:16px;}
        .why-icon-circle img{width:100%;height:100%;object-fit:contain;}
        .why-item{display:flex;align-items:flex-start;gap:18px;padding:0 28px;}
        .why-divider-v{border-left:1px solid #E2D9F5;}
        .why-divider-h{border-top:1px solid #E2D9F5;}
        .why-dash{height:1px;width:36px;background:var(--purple-400,#B9A5EC);display:inline-block;vertical-align:middle;}
        .job-card{border:1px solid #ECE8F5;border-radius:16px;}
        .job-icon{width:48px;height:48px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .step-circle{width:56px;height:56px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:800;font-family:'Poppins',sans-serif;}
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
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> <a href="/ueber-uns" className="hover:opacity-70">Über uns</a> <span className="mx-1">›</span> Karriere
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>KARRIERE BEI TANDEF</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
            Gemeinsam Großes bewegen.<br /><span style={{color: 'var(--purple-700)'}}>Ihre Karriere beginnt hier.</span>
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
            Bei TANDEF dreht sich alles um Vertrauen, Qualität und Menschen. Werden Sie Teil eines engagierten Teams und gestalten Sie mit uns die Zukunft der Reinigungsbranche in Köln und darüber hinaus.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="trust-item"><p className="font-bold text-sm mb-1">Tolles Team</p><p className="text-xs" style={{color: 'var(--muted)'}}>Bei uns zählen Respekt, Zusammenhalt und Teamgeist.</p></div>
            <div className="trust-item"><p className="font-bold text-sm mb-1">Weiterentwicklung</p><p className="text-xs" style={{color: 'var(--muted)'}}>Wir fördern Ihre Stärken und unterstützen Ihre Entwicklung.</p></div>
            <div className="trust-item"><p className="font-bold text-sm mb-1">Sinnvolle Arbeit</p><p className="text-xs" style={{color: 'var(--muted)'}}>Ihre Arbeit macht den Unterschied – jeden Tag aufs Neue.</p></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#stellen" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg">Offene Stellen ansehen</a>
            <a href="#warum" className="btn-outline font-semibold px-6 py-3 rounded-lg">Warum TANDEF?</a>
          </div>
        </div>
        <HeroImg src="/images/team-couch.jpg" height="420px" />
      </section>

      <section id="warum" className="max-w-6xl mx-auto px-6 pb-16">
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

      <section id="stellen" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Offene Stellen</h2>
          <a href="#" className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>Keine passende Stelle gefunden? Initiativbewerbung senden →</a>
        </div>
        <div className="job-card divide-y" style={{borderColor: '#ECE8F5'}}>
          {JOBS.map(job => (
            <div key={job.title} className="p-6 flex items-center gap-5 flex-wrap sm:flex-nowrap">
              <div className="job-icon">{JOB_ICONS[job.icon]}</div>
              <div className="flex-1 min-w-[200px]">
                <p className="font-bold mb-1">{job.title}</p>
                <p className="text-xs mb-2" style={{color: 'var(--muted)'}}>{job.tags}</p>
                <p className="text-sm" style={{color: 'var(--muted)'}}>{job.desc}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href="#" className="btn-outline font-semibold text-sm px-4 py-2 rounded-lg">Mehr erfahren</a>
                <a href="#" className="btn-primary text-white font-semibold text-sm px-4 py-2 rounded-lg">Jetzt bewerben</a>
              </div>
            </div>
          ))}
        </div>
        
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-2xl font-extrabold mb-14">So einfach bewerben Sie sich</h2>
        <div className="grid sm:grid-cols-4 gap-4 relative">
          <div className="hidden sm:block absolute top-7 left-0 right-0 mx-auto" style={{
            height: '2px',
            width: '75%',
            left: '12.5%',
            backgroundImage: 'repeating-linear-gradient(90deg, #D9CDF3 0, #D9CDF3 8px, transparent 8px, transparent 16px)',
          }} />
          {[
            ['📄', 'Stelle auswählen', 'Finden Sie die passende Position für Ihre Stärken.'],
            ['✈️', 'Bewerbung senden', 'Senden Sie uns Ihre Unterlagen schnell und unkompliziert.'],
            ['👥', 'Kennenlernen', 'Wir lernen uns in einem Gespräch besser kennen.'],
            ['🤝', 'Willkommen im Team!', 'Starten Sie Ihre Karriere bei TANDEF.'],
          ].map(([emoji, t, d]) => (
            <div key={t} className="flex flex-col items-center relative">
              <div className="step-circle mb-3 text-2xl" style={{position: 'relative', zIndex: 1, background: '#fff', border: '2px solid var(--purple-100)'}}>{emoji}</div>
              <p className="font-bold text-sm mb-1">{t}</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="cta-banner flex flex-col md:flex-row items-center justify-between gap-8 p-10">
          <div>
            <h2 className="text-2xl font-extrabold mb-2">Bereit, etwas zu <span style={{color: 'var(--purple-700)'}}>bewegen</span>?</h2>
            <p className="mb-5" style={{color: 'var(--muted)'}}>Werden Sie Teil der TANDEF Familie und gestalten Sie mit uns eine saubere Zukunft.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#stellen" className="btn-primary text-white font-semibold px-6 py-3 rounded-lg">Offene Stellen ansehen</a>
            
            </div>
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
            <div className="flex gap-3 mt-5" style={{color: 'var(--purple-700)'}}>
              <span>f</span><span>◎</span><span>w</span><span>✉</span>
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
              <li>AGB</li><li>Datenschutz</li><li>Impressum</li>
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