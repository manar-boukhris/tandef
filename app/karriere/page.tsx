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
  { title: 'Kundenservice Mitarbeiter (m/w/d)', tags: 'Köln · Vollzeit · Hybrid', desc: 'Sie sind die erste Anlaufstelle für unsere Kunden und sorgen für eine hervorragende Betreuung und Zufriedenheit.', icon: 'headset' },
  { title: 'Vertriebsmitarbeiter (m/w/d)', tags: 'Köln · Vollzeit · Vor Ort', desc: 'Sie gewinnen neue Kunden und bauen langfristige Partnerschaften auf.', icon: 'building' },
  { title: 'Teamleiter Reinigung (m/w/d)', tags: 'Köln · Vollzeit · Vor Ort', desc: 'Sie führen Reinigungsteams, planen Einsätze und stellen höchste Qualitätsstandards sicher.', icon: 'team' },
  { title: 'Reinigungskraft (m/w/d)', tags: 'Köln · Teilzeit / Minijob · Vor Ort', desc: 'Sie sorgen für Sauberkeit und Wohlbefinden in Wohnungen und Büros unserer Kunden.', icon: 'spray' },
];

const JOB_ICONS = {
  headset: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M3 12a9 9 0 0118 0v5a2 2 0 01-2 2h-2v-7h4M3 17v-5h4v7H5a2 2 0 01-2-2z" /></svg>,
  building: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h1M12 7h1M16 7h1M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1" /></svg>,
  team: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M2 21c0-4 3-6 7-6M22 21c0-4-3-6-7-6" /></svg>,
  spray: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 22V10a3 3 0 013-3h2M9 7V4a1 1 0 011-1h2a1 1 0 011 1v3M14 7h3l2 2" /><path d="M20 4l1 1M18 6l1 1M16 4l1 1" /></svg>,
};

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
        .why-icon{width:48px;height:48px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;margin:0 auto;}
        .why-card{border:1px solid #ECE8F5;border-radius:16px;text-align:center;}
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">Warum bei <span style={{color: 'var(--purple-700)'}}>TANDEF</span> arbeiten?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {[
            ['💰', 'Faire Vergütung', 'Attraktive Bezahlung und zusätzliche Benefits.'],
            ['📅', 'Flexible Arbeitszeiten', 'Vereinbarkeit von Beruf und Privatleben ist uns wichtig.'],
            ['🎓', 'Weiterbildung', 'Regelmäßige Schulungen und Entwicklungschancen für alle.'],
            ['❤️', 'Gesundheit', 'Wir unterstützen Ihre Gesundheit und Ihr Wohlbefinden.'],
            ['🤝', 'Wertschätzung', 'Ihre Meinung zählt – wir hören zu und handeln danach.'],
            ['🎉', 'Team-Events', 'Gemeinsam feiern, lachen und Erfolge teilen.'],
          ].map(([emoji, t, d]) => (
            <div key={t} className="why-card p-6">
              <div className="why-icon mx-auto mb-3 text-xl">{emoji}</div>
              <p className="font-bold text-sm mb-1">{t}</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>{d}</p>
            </div>
          ))}
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
        <div className="text-center mt-6">
          <a href="#" className="btn-outline font-semibold px-6 py-3 rounded-lg inline-block">Alle Stellen anzeigen</a>
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
              <a href="#" className="btn-outline font-semibold px-6 py-3 rounded-lg">Initiativbewerbung senden</a>
            </div>
          </div>
          <img src="/images/cleaning-supplies.png" className="w-56 h-40 object-contain shrink-0" />
        </div>
      </section>

      <footer className="border-t" style={{borderColor: '#ECE8F5'}}>
        <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-4 gap-6 text-sm text-center sm:text-left">
          <div><p className="font-semibold mb-2">Fragen zur Bewerbung?</p><p style={{color: 'var(--muted)'}}>Wir sind für Sie da.<br />0221 123 456 78</p></div>
          <div><p className="font-semibold mb-2">E-Mail</p><p style={{color: 'var(--muted)'}}>Senden Sie uns eine E-Mail.<br />karriere@tandef-koeln.de</p></div>
          <div><p className="font-semibold mb-2">Standort</p><p style={{color: 'var(--muted)'}}>Besuchen Sie uns.<br />Köln, Deutschland</p></div>
          <div><p className="font-semibold mb-2">Folgen Sie uns</p><p style={{color: 'var(--muted)'}}>Bleiben Sie auf dem Laufenden.</p></div>
        </div>
      </footer>
    </>
  );
}