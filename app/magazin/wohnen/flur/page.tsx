// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Flur & Eingangsbereich richtig reinigen";
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
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        :root{
            --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
            --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
          }
          body{font-family:'Inter',sans-serif;color:var(--ink);}
          h1,h2,h3{font-family:'Poppins',sans-serif;}
          .btn-primary{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-primary:hover{filter:brightness(1.05);}
          .btn-outline{border:1.5px solid var(--purple-700);color:var(--purple-700);transition:.2s ease;}
          .btn-outline:hover{background:var(--purple-50);}
          .why-tile{display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center;}
          .social-icon{
            width:36px;height:36px;border-radius:9999px;
            background:var(--purple-100);
            display:flex;align-items:center;justify-content:center;
            color:var(--purple-700);transition:.15s ease;
          }
          .social-icon:hover{background:var(--purple-700);color:#fff;}
          .tag{font-size:.68rem;font-weight:700;padding:.3rem .7rem;border-radius:9999px;display:inline-block;}

          /* Breadcrumb */
          .breadcrumb{font-size:.8rem;color:var(--muted);}
          .breadcrumb a{color:var(--muted);}
          .breadcrumb a:hover{color:var(--purple-700);}

          /* Eyebrow */
          .eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.04em;color:var(--purple-700);}
          .eyebrow-rule{width:34px;height:3px;border-radius:9999px;background:var(--purple-700);display:block;margin-top:.5rem;}

          /* Handwritten accent */
          .handwrite{font-family:'Caveat',cursive;color:var(--purple-600);font-size:1.5rem;line-height:1.15;display:inline-block;transform:rotate(-2deg);}

          /* Article hero */
          .article-hero{background:linear-gradient(135deg,#F3EEFC,#EDE4FA 55%,#F6F1FB);border-radius:28px;overflow:hidden;}
          .article-hero-img{display:block;}

          /* Step cards */
          .step-card{background:#fff;border:1px solid #ECE8F5;border-radius:18px;transition:.2s ease;overflow:hidden;}
          .step-card:hover{box-shadow:0 15px 35px -20px rgba(76,29,149,.3);transform:translateY(-3px);}
          .step-num{width:32px;height:32px;border-radius:9999px;background:var(--purple-100);color:var(--purple-700);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;}

          /* Tip banner */
          .tip-banner{background:var(--purple-50);border-radius:24px;}
          .tip-icon-circle{width:52px;height:52px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}

          /* Category cards on hub page */
          .category-card{background:#fff;border:1px solid #ECE8F5;border-radius:20px;overflow:hidden;transition:.2s ease;}
          .category-card:hover{box-shadow:0 15px 35px -20px rgba(76,29,149,.3);transform:translateY(-3px);}
          .category-card-img{height:220px;overflow:hidden;}
          .category-icon-badge{width:44px;height:44px;border-radius:9999px;background:var(--purple-100);color:var(--purple-700);display:flex;align-items:center;justify-content:center;margin-top:-38px;margin-left:1.25rem;position:relative;box-shadow:0 8px 20px -10px rgba(76,29,149,.4);border:3px solid #fff;}
          .category-arrow{width:38px;height:38px;border-radius:9999px;background:var(--purple-100);color:var(--purple-700);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.15s ease;}
          .category-card:hover .category-arrow{background:var(--purple-700);color:#fff;}

          /* Simple content card (Weitere Räume tiles) */
          .content-card{background:#fff;border:1px solid #ECE8F5;border-radius:18px;transition:.2s ease;}
          .content-card:hover{box-shadow:0 15px 35px -20px rgba(76,29,149,.3);transform:translateY(-3px);}
      `}</style>
      {/* Header */}
      <header className="border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
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
            <div className="flex items-center gap-3">
              <a href="/login" className="hidden md:flex btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                Reinigung buchen
              </a>
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
            <nav className="md:hidden flex flex-col gap-1 text-sm font-medium mt-4 pt-4 border-t" style={{borderColor: '#EDE9F5', color: 'var(--ink)'}}>
              <a href="/pro-werden" className="flex items-center gap-2.5 py-3" onClick={() => setMobileMenuOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                Pro werden
              </a>
              <a href="/magazin" className="flex items-center gap-2.5 py-3" onClick={() => setMobileMenuOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
                Magazin
              </a>
              <a href="/ueber-uns" className="flex items-center gap-2.5 py-3" onClick={() => setMobileMenuOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                Über uns
              </a>
              <a href="/unser-team" className="flex items-center gap-2.5 py-3 pl-8 text-sm" style={{color: 'var(--muted)'}} onClick={() => setMobileMenuOpen(false)}>
                Unser Team
              </a>
              <a href="/karriere" className="flex items-center gap-2.5 py-3 pl-8 text-sm" style={{color: 'var(--muted)'}} onClick={() => setMobileMenuOpen(false)}>
                Karriere
              </a>
              <a href="/kontakt" className="flex items-center gap-2.5 py-3 pl-8 text-sm" style={{color: 'var(--muted)'}} onClick={() => setMobileMenuOpen(false)}>
                Kontakt
              </a>
              <a href="/login" className="flex items-center gap-2.5 py-3" onClick={() => setMobileMenuOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                Login
              </a>
              <a href="/login" className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2 inline-flex items-center justify-center gap-2">
                Reinigung buchen
              </a>
            </nav>
          )}
        </div>
      </header>
      {/* Breadcrumb */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <nav className="breadcrumb flex items-center gap-2 flex-wrap">
          <a href="/" className="hover:underline">Startseite</a>
          <span>&gt;</span>
          <a href="/magazin" className="hover:underline">Magazin</a>
          <span>&gt;</span>
          <a href="/magazin/wohnen" className="hover:underline">Wohnen</a>
          <span>&gt;</span>
          <span>Flur &amp; Eingangsbereich</span>
        </nav>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="article-hero flex flex-col lg:flex-row lg:min-h-[440px]">
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="eyebrow">TANDEF MAGAZIN</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4 mb-5" style={{color: 'var(--ink)'}}>
              Flur &amp; Eingangsbereich richtig reinigen
            </h1>
            <p className="text-base mb-6 max-w-md" style={{color: 'var(--muted)'}}>
              Ein gepflegter Eingangsbereich hinterlässt einen positiven Eindruck und sorgt für ein angenehmes Wohngefühl. Mit wenigen Schritten bleibt dein Flur sauber, ordentlich und einladend.
            </p>
            <div className="handwrite">Kleine Tipps.<br />Große Wirkung.</div>
          </div>
          <div className="lg:w-1/2 h-56 sm:h-64 lg:h-auto overflow-hidden">
            <img src="/images/magazin-wohnen-flur.jpg" alt="Flur & Eingangsbereich" className="w-full h-full object-cover block article-hero-img" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8" style={{color: 'var(--ink)'}}>Die wichtigsten Schritte</h2>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          <div className="step-card grid grid-cols-2 items-stretch">
            <div className="p-6 flex flex-col justify-center">
              <span className="step-num mb-3">01</span>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Aufräumen</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Entferne Schuhe, Taschen und andere Gegenstände und lege alles an seinen Platz. So entsteht eine freie und übersichtliche Fläche.</p>
            </div>
            <div className="flex items-center justify-center" style={{background: 'var(--purple-50)', minHeight: '160px'}}>
              <img src="/images/coul.jpg" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="step-card grid grid-cols-2 items-stretch">
            <div className="p-6 flex flex-col justify-center">
              <span className="step-num mb-3">02</span>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Oberflächen reinigen</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Wische Türen, Türklinken, Lichtschalter, Kommoden und Spiegel mit einem geeigneten, leicht feuchten Tuch.</p>
            </div>
            <div className="flex items-center justify-center" style={{background: '#EAF2FE', minHeight: '160px'}}>
              <img src="/images/beb.jpg" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="step-card grid grid-cols-2 items-stretch">
            <div className="p-6 flex flex-col justify-center">
              <span className="step-num mb-3">03</span>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Staub entfernen</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Entferne Staub von Regalen, Bilderrahmen und Dekoration. Vergiss auch Sockelleisten und Heizkörper nicht.</p>
            </div>
            <div className="flex items-center justify-center" style={{background: '#FDF6E3', minHeight: '160px'}}>
            <img src="/images/tab.jpg" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="step-card grid grid-cols-2 items-stretch">
            <div className="p-6 flex flex-col justify-center">
              <span className="step-num mb-3">04</span>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Boden reinigen</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Zum Schluss saugst du den Boden gründlich. Bei Bedarf kannst du auch feucht wischen – je nach Bodenbelag mit einem geeigneten Reiniger.</p>
            </div>
            <div className="flex items-center justify-center" style={{background: '#E7F7EE', minHeight: '160px'}}>
              <img src="/images/aspp.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="tip-banner relative overflow-hidden flex items-center justify-between gap-6 p-7 md:p-8">
          <div className="flex items-start gap-4 relative z-10">
            <span className="tip-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a6 6 0 00-3.6 10.8c.5.4.8 1 .8 1.7V15h5.6v-.5c0-.7.3-1.3.8-1.7A6 6 0 0012 2z" /></svg>
            </span>
            <div>
              <span className="tag" style={{background: 'var(--purple-100)', color: 'var(--purple-700)'}}>TANDEF-Tipp</span>
              <p className="font-bold text-lg mt-2 max-w-md leading-snug" style={{color: 'var(--ink)'}}>Ein ordentlicher Eingangsbereich erleichtert den Alltag und sorgt für mehr Wohlfühlatmosphäre.</p>
            </div>
          </div>
         
          <img src="/images/plante.png" alt="" className="pointer-events-none select-none absolute -bottom-8 -right-6 w-32 md:w-40 opacity-90" />
        </div>
      </section>

         {/* Footer */}
         <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Zuverlässige Reinigung in Deutschland – für Zuhause und Unternehmen.</p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.facebook.com/share/1K3tz8VHXv/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.17H7.5v3.1h2.7V21h3.3z"/></svg>
              </a>
              <a href="https://www.instagram.com/tandef.de?igsi=MTg5N284cmNvYmtudQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="https://wa.me/4917689185772" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
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
                +49 17689185772
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