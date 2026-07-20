// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
export default function HomePage() {

  useEffect(() => {
    document.title = "TANDEF – Trust. Cleanliness. Quality.";
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
        :root{
            --purple-900:#3B0A73;
            --purple-700:#5B21B6;
            --purple-600:#6D28D9;
            --purple-500:#7C3AED;
            --purple-100:#EDE9FE;
            --purple-50:#F5F3FF;
            --ink:#1F1339;
            --muted:#6B6478;
          }
          body{font-family:'Inter',sans-serif;color:var(--ink);}
          h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
          .btn-primary{
            background:var(--purple-700);
            transition:.2s ease;
          }
          .btn-primary:hover{background:var(--purple-900);}
          .btn-outline{
            border:1.5px solid var(--purple-700);
            color:var(--purple-700);
            transition:.2s ease;
          }
          .btn-outline:hover{background:var(--purple-50);}
          .step-icon{
            width:56px;height:56px;border-radius:9999px;
            background:var(--purple-50);
            display:flex;align-items:center;justify-content:center;
          }
          .arrow{color:#C4B5FD;}
          .card{
            border:1px solid #ECE8F5;
            border-radius:16px;
            transition:.25s ease;
            display:block;
          }
          .card:hover{
            box-shadow:0 12px 30px -12px rgba(91,33,182,.25);
            transform:translateY(-3px);
          }
          .circle-arrow{
            width:40px;height:40px;border-radius:9999px;
            background:var(--purple-700);
            display:flex;align-items:center;justify-content:center;
            color:white;
          }
      `}</style>
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="TANDEF – Trust. Cleanliness. Quality." className="h-10 w-auto" />
        </div>
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
    <button id="about-menu-btn" className="flex items-center gap-1.5 hover:opacity-70">
      Über uns
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
    </button>
    <div id="about-menu" className="hidden absolute left-0 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
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
  <LanguageSwitcher />
</nav>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{color: 'var(--purple-900)'}}>
            Mehr Zeit für<br />das Wesentliche.
          </h1>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6" style={{color: 'var(--purple-600)'}}>
            Wir kümmern uns<br />um die Sauberkeit.
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
            Zuverlässige Reinigung in Köln – für ein Zuhause und ein Umfeld, in dem Sie sich wohlfühlen.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="/address" className="btn-primary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Reinigung buchen
            </a>
            <a href="#leistungen" className="btn-outline px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4l14 8-14 8V4z" /></svg>
              Preise ansehen
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div className="flex gap-2">
              <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>
              <div>
                <p className="font-semibold" style={{color: 'var(--purple-900)'}}>Geprüfte Profis</p>
                <p style={{color: 'var(--muted)'}}>Hintergrundgeprüft &amp; versichert</p>
              </div>
            </div>
            <div className="flex gap-2">
              <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
              <div>
                <p className="font-semibold" style={{color: 'var(--purple-900)'}}>Zufriedenheitsgarantie</p>
                <p style={{color: 'var(--muted)'}}>Wir machen es richtig.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
              <div>
                <p className="font-semibold" style={{color: 'var(--purple-900)'}}>Einfache Zahlung</p>
                <p style={{color: 'var(--muted)'}}>Online buchen in wenigen Minuten</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden">
          <img src="/images/hero.png" alt="Sauberes, gemütliches Wohnzimmer" className="w-full h-full object-cover rounded-3xl" style={{minHeight: '420px'}} />
        </div>
      </section>

      {/* So einfach geht's */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-14" style={{color: 'var(--purple-900)'}}>So <span style={{color: 'var(--purple-600)'}}>einfach</span> geht's</h2>
        <div className="grid md:grid-cols-7 gap-4 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="step-icon mb-1 relative">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{background: 'var(--purple-700)'}}>1</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </div>
            <p className="font-semibold mt-3" style={{color: 'var(--purple-900)'}}>Termin wählen</p>
            <p className="text-sm mt-1" style={{color: 'var(--muted)'}}>Wählen Sie Datum und Uhrzeit, die Ihnen passen.</p>
          </div>
          <div className="hidden md:flex justify-center pt-6 arrow">→</div>
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="step-icon relative">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{background: 'var(--purple-700)'}}>2</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 12h8M8 16h5" /></svg>
            </div>
            <p className="font-semibold mt-3" style={{color: 'var(--purple-900)'}}>Details angeben</p>
            <p className="text-sm mt-1" style={{color: 'var(--muted)'}}>Teilen Sie uns mit, was gereinigt werden soll.</p>
          </div>
          <div className="hidden md:flex justify-center pt-6 arrow">→</div>
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="step-icon relative">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{background: 'var(--purple-700)'}}>3</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z" /></svg>
            </div>
            <p className="font-semibold mt-3" style={{color: 'var(--purple-900)'}}>Wir reinigen</p>
            <p className="text-sm mt-1" style={{color: 'var(--muted)'}}>Unser Team kommt pünktlich und erledigt alles gründlich.</p>
          </div>
          <div className="hidden md:flex justify-center pt-6 arrow">→</div>
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="step-icon relative">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold text-white" style={{background: 'var(--purple-700)'}}>4</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            </div>
            <p className="font-semibold mt-3" style={{color: 'var(--purple-900)'}}>Bequem bezahlen</p>
            <p className="text-sm mt-1" style={{color: 'var(--muted)'}}>Zahlen Sie sicher online – erst wenn Sie zufrieden sind.</p>
          </div>
        </div>
      </section>

      {/* Unsere Leistungen */}
      <section id="leistungen" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--purple-900)'}}>Unsere <span style={{color: 'var(--purple-600)'}}>Leistungen</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          <a href="/wohnungsreinigung" className="card overflow-hidden flex flex-col">
            <div className="p-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" /></svg>
              <p className="font-semibold mt-4 mb-1" style={{color: 'var(--purple-900)'}}>Wohnungsreinigung</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Gründliche Reinigung Ihrer Wohnung – für ein frisches Zuhause.</p>
            </div>
            <div className="relative mt-auto">
              <img src="/images/service_1.png" className="w-full h-36 object-cover" />
              <div className="circle-arrow absolute -top-5 left-5">→</div>
            </div>
          </a>

          <a href="/bueroreinigung" className="card overflow-hidden flex flex-col">
            <div className="p-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h1M12 7h1M16 7h1M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1" /></svg>
              <p className="font-semibold mt-4 mb-1" style={{color: 'var(--purple-900)'}}>Büroreinigung</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Saubere Arbeitsplätze für mehr Wohlbefinden und Produktivität.</p>
            </div>
            <div className="relative mt-auto">
              <img src="/images/service_2.png" className="w-full h-36 object-cover" />
              <div className="circle-arrow absolute -top-5 left-5">→</div>
            </div>
          </a>

          <a href="/umzugsreinigung" className="card overflow-hidden flex flex-col">
            <div className="p-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>
              <p className="font-semibold mt-4 mb-1" style={{color: 'var(--purple-900)'}}>Umzugsreinigung</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Professionelle Reinigung bei Ein- oder Auszug – besichtigungsbereit.</p>
            </div>
            <div className="relative mt-auto">
              <img src="/images/service_3.png" className="w-full h-36 object-cover" />
              <div className="circle-arrow absolute -top-5 left-5">→</div>
            </div>
          </a>

          <a href="/grundreinigung" className="card overflow-hidden flex flex-col">
            <div className="p-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z" /></svg>
              <p className="font-semibold mt-4 mb-1" style={{color: 'var(--purple-900)'}}>Grundreinigung</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Tiefenreinigung für jeden Raum – gründlich bis ins Detail.</p>
            </div>
            <div className="relative mt-auto">
              <img src="/images/service_4.png" className="w-full h-36 object-cover" />
              <div className="circle-arrow absolute -top-5 left-5">→</div>
            </div>
          </a>

        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 my-14">
        <div className="rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6" style={{background: 'var(--purple-50)'}}>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
            <p className="text-2xl font-bold" style={{color: 'var(--purple-900)'}}>1.200+</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Zufriedene Kunden</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            <p className="text-2xl font-bold" style={{color: 'var(--purple-900)'}}>2.500+</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Abgeschlossene Reinigungen</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
            <p className="text-2xl font-bold" style={{color: 'var(--purple-900)'}}>4,9 / 5</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Bewertungen auf Google</p>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            <p className="text-2xl font-bold" style={{color: 'var(--purple-900)'}}>98%</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>Weiterempfehlung</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-2xl grid md:grid-cols-2 items-center overflow-hidden" style={{background: 'var(--purple-50)'}}>
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-3" style={{color: 'var(--purple-900)'}}>Bereit für ein <span style={{color: 'var(--purple-600)'}}>sauberes Zuhause</span>?</h3>
            <p className="mb-6" style={{color: 'var(--muted)'}}>Buchen Sie jetzt Ihre Reinigung in Köln in nur wenigen Klicks.</p>
            <a href="/address" className="btn-primary text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Jetzt buchen
            </a>
          </div>
          <img src="/images/cta.png" className="w-full h-full object-cover" style={{minHeight: '260px'}} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Zuverlässige Reinigung in Köln – für Zuhause und Unternehmen.</p>
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
              <li><a href="/grundreinigung" className="hover:opacity-70">Grundreinigung</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Unternehmen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li>Über uns</li><li>Unser Team</li><li>Karriere</li><li>Kontakt</li>
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
                0221 123 456 78
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                hallo@cleankoeln.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Köln und Umgebung
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs pb-8" style={{color: 'var(--muted)'}}>© 2024 CleanKöln. Alle Rechte vorbehalten.</div>
      </footer>
    </>
  );
}