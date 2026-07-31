// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

export default function MagazinPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Magazin für Haushalt & Reinigung";
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
            --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
            --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
          }
          body{font-family:'Inter',sans-serif;color:var(--ink);}
          h1,h2,h3{font-family:'Poppins',sans-serif;}
          .btn-primary{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-primary:hover{filter:brightness(1.05);}
          .hero-card{background:linear-gradient(135deg,#F3EEFC,#EDE4FA 55%,#F6F1FB);border-radius:28px;}
          .hero-illustration-bg{background:radial-gradient(ellipse at center,#E9DFFB 0%,#F3EEFC 70%,transparent 100%);border-radius:50%;}
          .trust-strip-item{display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--muted);}
          .card{background:#fff;border:1px solid #ECE8F5;border-radius:18px;transition:.2s ease;}
          .card:hover{box-shadow:0 15px 35px -20px rgba(76,29,149,.3);transform:translateY(-3px);}
          .tag{font-size:.68rem;font-weight:700;padding:.3rem .7rem;border-radius:9999px;display:inline-block;}
          .tag-wohnung{background:var(--purple-100);color:var(--purple-700);}
          .tag-umzug{background:#DCEAFD;color:#2563EB;}
          .tag-reinigung{background:#DAF3E4;color:#15803D;}
          .tag-flecken-o{background:#FCE7CE;color:#C2620A;}
          .tag-flecken-p{background:#FBDCE6;color:#D6336C;}
          .tag-boden{background:#FCF1C7;color:#A6790A;}
          .illo-tile{border-radius:14px;height:130px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
          .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);}
          .field{background:#F7F6FA;border:1px solid #ECE9F3;border-radius:12px;transition:.15s ease;}
          .field:focus-within{border-color:var(--purple-600);background:#fff;}
          .field input{background:transparent;outline:none;width:100%;}
          .field input::placeholder{color:#9C96A8;}
          .newsletter-row-icon{width:38px;height:38px;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .nature-banner{background:linear-gradient(120deg,#F3F8EE,#FBF7EA);border-radius:24px;}
          .feature-strip{border-radius:20px;overflow:hidden;position:relative;}
          .arrow-btn{
            width:40px;height:40px;border-radius:9999px;background:#fff;display:flex;align-items:center;justify-content:center;
            color:var(--purple-700);box-shadow:0 8px 20px -8px rgba(0,0,0,.25);
          }
          .filter-pill{border-radius:12px;padding:.7rem 1rem;display:flex;align-items:center;gap:.6rem;font-weight:600;font-size:.85rem;}
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

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="hero-card grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
              Magazin für<br /><span style={{color: 'var(--purple-600)'}}>Haushalt &amp;<br />Reinigung</span>
            </h1>
            <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
              Praktische Tipps, smarte Produkte und alles, was dein Zuhause sauber und schön macht.
            </p>
            <a href="/login" className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full mb-10">
              Jetzt Reinigung buchen
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="trust-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
                Verifiziert &amp; geprüft
              </div>
              <div className="trust-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
                Für dich ausgewählt
              </div>
              <div className="trust-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
                Von Profis empfohlen
              </div>
              <div className="trust-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 3.5 18.5 2c1 6 2.5 12-2 16-2.5 2.5-7 2.5-9.5 0" /></svg>
                Nachhaltig &amp; umweltfreundlich
              </div>
            </div>
          </div>

          {/* Hero illustration: cleaning caddy photo */}
          <div className="relative flex items-center justify-center" style={{minHeight: '340px'}}>
            <img src="/images/magazin-hero-basket.png" alt="Reinigungsutensilien" className="w-full max-w-lg object-contain" />
          </div>
        </div>
      </section>

      {/* Aktuelle Tipps */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10 items-start">

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{color: 'var(--ink)'}}>Aktuelle Tipps für dein Zuhause</h2>
            <a href="#" className="text-sm font-semibold flex items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              Alle Artikel ansehen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Article 1 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-wohnung mb-4 inline-block">WOHNUNG</span>
              <div className="illo-tile mb-4" style={{background: 'var(--purple-50)'}}>
                <img src="/images/icon-wohnung.png" alt="Wohnung" className="w-full h-full object-contain p-2" />
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Wohnung besenrein übergeben: Was du wirklich schuldig bist</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                6 Min. Lesezeit
              </p>
            </a>

            {/* Article 2 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-umzug mb-4 inline-block">UMZUG &amp; REINIGUNG</span>
              <div className="illo-tile mb-4" style={{background: '#EAF2FE'}}>
                <img src="/images/icon-umzug.png" alt="Umzug" className="w-full h-full object-contain p-2" />
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Umzugsreinigung: So übergibst du deine Wohnung in perfektem Zustand</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                7 Min. Lesezeit
              </p>
            </a>

            {/* Article 3 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-reinigung mb-4 inline-block">REINIGUNG</span>
              <div className="illo-tile mb-4" style={{background: '#E7F7EE'}}>
                <img src="/images/icon-reinigung.png" alt="Reinigung" className="w-full h-full object-contain p-2" />
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Staub wischen: Tipps, Hausmittel und die richtige Technik</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                4 Min. Lesezeit
              </p>
            </a>

            {/* Article 4 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-flecken-o mb-4 inline-block">FLECKEN ENTFERNEN</span>
              <div className="illo-tile mb-4" style={{background: '#FDF1E3'}}>
                <img src="/images/icon-flecken-o.png" alt="Flecken entfernen" className="w-full h-full object-contain p-2" />
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Curryflecken entfernen: So rettest du Kleidung vor dem gelben Desaster</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                5 Min. Lesezeit
              </p>
            </a>

            {/* Article 5 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-flecken-p mb-4 inline-block">FLECKEN ENTFERNEN</span>
              <div className="illo-tile mb-4" style={{background: '#FDEBF0'}}>
                <img src="/images/icon-flecken-p.png" alt="Rostflecken entfernen" className="w-full h-full object-contain p-2" />
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Rostflecken entfernen: So wirst du Rost aus Kleidung und von Oberflächen los</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                6 Min. Lesezeit
              </p>
            </a>

            {/* Article 6 */}
            <a href="#" className="card p-5 block">
              <span className="tag tag-boden mb-4 inline-block">BODENPFLEGE</span>
              <div className="illo-tile mb-4" style={{background: '#FDF6E3'}}>
              <img src="/images/bala.png" alt="Rostflecken entfernen" className="w-full h-full object-contain p-2" />
            
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--ink)'}}>Steinböden reinigen: Die richtige Pflege für jede Steinart</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                6 Min. Lesezeit
              </p>
            </a>

          </div>
        </div>

        {/* Newsletter sidebar */}
        <div className="panel p-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="newsletter-row-icon" style={{background: 'var(--purple-100)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
            </span>
            <h3 className="font-bold text-lg" style={{color: 'var(--ink)'}}>Newsletter</h3>
          </div>
          <p className="text-sm mb-5" style={{color: 'var(--muted)'}}>Erhalte regelmäßig praktische Tipps, exklusive Angebote und Neuigkeiten.</p>
          <div className="field px-4 py-3 mb-3">
            <input type="email" placeholder="Deine E-Mail-Adresse" />
          </div>
          <button className="btn-primary w-full text-white font-semibold py-3 rounded-full mb-6">Anmelden</button>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="newsletter-row-icon" style={{background: 'var(--purple-100)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M20 12V8H6a2 2 0 010-4h14v4" /><path d="M4 6v14a2 2 0 002 2h14v-4" /></svg>
              </span>
              <div>
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Exklusive Tipps &amp; Tricks</p>
                <p style={{color: 'var(--muted)'}}>Praktische Ratgeber direkt in dein Postfach</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="newsletter-row-icon" style={{background: '#FDECEB'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E4685D" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
              </span>
              <div>
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Tolle Angebote</p>
                <p style={{color: 'var(--muted)'}}>Spare mit exklusiven Aktionen</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="newsletter-row-icon" style={{background: '#E7F7EE'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 3.5 18.5 2c1 6 2.5 12-2 16-2.5 2.5-7 2.5-9.5 0" /></svg>
              </span>
              <div>
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Nachhaltig informiert</p>
                <p style={{color: 'var(--muted)'}}>Nachhaltige Produkte &amp; Methoden</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="newsletter-row-icon" style={{background: 'var(--purple-100)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>
              </span>
              <div className="flex-1">
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Sicher &amp; geprüft</p>
                <p style={{color: 'var(--muted)'}}>Deine Daten sind bei uns sicher.</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E9E5B" strokeWidth="2" className="shrink-0"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
            </div>
          </div>
        </div>

      </section>

      {/* Natürlich reinigen banner */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-6">

        <div className="nature-banner grid sm:grid-cols-2 gap-6 items-center p-8">
          <div>
            <span className="tag" style={{background: '#E7F2DD', color: '#4C7A2E'}}>Nachhaltig leben</span>
            <h2 className="text-2xl font-bold mt-4 mb-3 leading-snug" style={{color: 'var(--ink)'}}>Natürlich reinigen – wirksam &amp; umweltfreundlich</h2>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Entdecke die Kraft natürlicher Hausmittel für ein sauberes Zuhause.</p>
            <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-semibold inline-flex items-center gap-2" style={{color: 'var(--ink)'}}>
              Mehr erfahren
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <img src="/images/magazin-natural-clean.jpeg" alt="Natürliche Reinigungsmittel" className="w-full max-w-[220px] rounded-xl object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="feature-strip p-6 flex items-center justify-between" style={{background: 'linear-gradient(120deg,#FBEFE0,#F7E3D3)'}}>
            <div className="max-w-xs">
              <span className="tag" style={{background: '#fff', color: '#B26A1D'}}>Reinigung von Haushaltsgeräten</span>
              <p className="font-bold mt-3 mb-2 leading-snug" style={{color: 'var(--ink)'}}>Backofen reinigen: So entfernst du Eingebranntes &amp; Fett von Wänden und Ofenrost</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                4 Min. Lesezeit
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <svg width="90" height="90" viewBox="0 0 100 100">
                <rect x="10" y="6" width="80" height="88" rx="6" fill="#2B2530" />
                <rect x="18" y="16" width="64" height="46" rx="4" fill="#57493F" />
                <rect x="24" y="22" width="52" height="34" rx="3" fill="#8A5A34" />
                <rect x="30" y="28" width="40" height="8" fill="#C87A3E" opacity=".7" />
                <circle cx="24" cy="72" r="4" fill="#D8D2DC" />
                <circle cx="40" cy="72" r="4" fill="#D8D2DC" />
                <circle cx="56" cy="72" r="4" fill="#D8D2DC" />
                <rect x="18" y="84" width="64" height="4" rx="2" fill="#D8D2DC" />
              </svg>
              <span className="arrow-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </span>
            </div>
          </div>

          <div className="feature-strip p-6 flex items-center justify-between" style={{background: 'linear-gradient(120deg,#E7EEF9,#EEF3FA)'}}>
            <div className="max-w-xs">
              <span className="tag" style={{background: '#fff', color: '#3E6FB0'}}>Wäsche &amp; Textilien</span>
              <p className="font-bold mt-3 mb-2 leading-snug" style={{color: 'var(--ink)'}}>Waschmaschine reinigen: Trommel, Gummi &amp; Filter sauber halten – so bleibt deine Maschine frisch</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                4 Min. Lesezeit
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <svg width="90" height="90" viewBox="0 0 100 100">
                <rect x="10" y="6" width="80" height="88" rx="8" fill="#fff" stroke="#D9DEE6" strokeWidth="3" />
                <circle cx="50" cy="56" r="30" fill="#EAF0F7" />
                <circle cx="50" cy="56" r="30" fill="none" stroke="#9FB4CC" strokeWidth="3" />
                <circle cx="50" cy="56" r="18" fill="#CFE0F0" />
                <path d="M40 50 Q50 40 60 50 Q50 62 40 50" fill="#9FB4CC" />
                <circle cx="24" cy="16" r="3" fill="#B7BDC6" />
                <circle cx="34" cy="16" r="3" fill="#B7BDC6" />
              </svg>
              <span className="arrow-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* Haushaltstipps */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-3 gap-10 items-start">

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--ink)'}}>Haushaltstipps</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <button className="filter-pill" style={{background: '#EAF2FE', color: '#2563EB'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M6 12V6a2 2 0 012-2h2v3M6 12v8h12v-8" /></svg>
              Badezimmer
            </button>
            <button className="filter-pill" style={{background: '#E7F7EE', color: '#15803D'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20l6-14 4 8 3-5 3 11" /></svg>
              Bodenreinigung
            </button>
            <button className="filter-pill" style={{background: '#FDECEB', color: '#D6336C'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 4l16 16M20 4L4 20" /></svg>
              Fenster &amp; Spiegel
            </button>
            <button className="filter-pill" style={{background: '#FCF1C7', color: '#A6790A'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10a8 4 0 0016 0M4 10a8 4 0 1116 0M4 10v4a8 4 0 0016 0v-4" /></svg>
              Küche
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <button className="filter-pill" style={{background: 'var(--purple-100)', color: 'var(--purple-700)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
              Wäsche &amp; Textilien
            </button>
            <button className="filter-pill" style={{background: '#E7F7EE', color: '#15803D'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="7" width="16" height="12" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Reinigung von Geräten
            </button>
            <button className="filter-pill" style={{background: '#E7F7EE', color: '#15803D'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 3.5 18.5 2c1 6 2.5 12-2 16-2.5 2.5-7 2.5-9.5 0" /></svg>
              Garten
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <a href="#" className="block">
              <div className="rounded-2xl overflow-hidden mb-3" style={{height: '150px'}}>
                <img src="/images/sala.jpeg" className="w-full h-full object-cover" alt="Wohnzimmer" />
              </div>
              <p className="font-bold text-sm mb-2" style={{color: 'var(--ink)'}}>Wohnung besenrein übergeben: Was du wirklich schuldig bist</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                6 Min. Lesezeit
              </p>
            </a>
            <a href="#" className="block">
              <div className="rounded-2xl overflow-hidden mb-3" style={{height: '150px'}}>
                <img src="/images/umzug.jpeg" className="w-full h-full object-cover" alt="Umzugskartons" />
              </div>
              <p className="font-bold text-sm mb-2" style={{color: 'var(--ink)'}}>Umzugsreinigung: So übergibst du deine Wohnung in perfektem Zustand</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                7 Min. Lesezeit
              </p>
            </a>
            <a href="#" className="block">
              <div className="rounded-2xl overflow-hidden mb-3" style={{height: '150px'}}>
                <img src="/images/prod.jpeg" className="w-full h-full object-cover" alt="Reinigungsmittel" />
              </div>
              <p className="font-bold text-sm mb-2" style={{color: 'var(--ink)'}}>Staub wischen: Tipps, Hausmittel und die richtige Technik</p>
              <p className="text-xs flex items-center gap-1" style={{color: 'var(--muted)'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                4 Min. Lesezeit
              </p>
            </a>
          </div>

          <div className="flex justify-center">
            <a href="#" className="btn-outline rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Alle Tipps ansehen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>
          </div>
        </div>

        {/* Right column: Online buchen + Newsletter */}
        <div className="space-y-6">
          <div className="panel p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="newsletter-row-icon" style={{background: 'var(--purple-100)'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              </span>
              <h3 className="font-bold text-lg" style={{color: 'var(--ink)'}}>Online buchen</h3>
            </div>
            <p className="text-sm mb-5" style={{color: 'var(--muted)'}}>Finde die passende Reinigungskraft in deiner Nähe – flexibel, zuverlässig und schnell buchbar.</p>
            <a href="/login" className="btn-primary w-full text-white font-semibold py-3 rounded-full inline-flex items-center justify-center gap-2">
              Reinigungskraft finden
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>
          </div>

          <div className="panel p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="newsletter-row-icon" style={{background: '#FDECEB'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E4685D" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
              </span>
              <h3 className="font-bold text-lg" style={{color: 'var(--ink)'}}>Newsletter</h3>
            </div>
            <p className="text-sm mb-5" style={{color: 'var(--muted)'}}>Melde dich für unseren Newsletter an und erhalte tolle Tipps, Angebote und Aktionen rund um Haushalt &amp; Reinigung.</p>
            <div className="field px-4 py-3 mb-3">
              <input type="email" placeholder="Deine E-Mail-Adresse" />
            </div>
            <button className="w-full text-white font-semibold py-3 rounded-full inline-flex items-center justify-center gap-2" style={{background: 'linear-gradient(90deg,#E4685D,#EF8A63)'}}>
              Anmelden
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

      </section>

      {/* Trust strip */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6" style={{background: 'var(--purple-50)'}}>
          <div className="why-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
            <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Qualitätsprodukte</p>
            <p className="text-xs" style={{color: 'var(--muted)'}}>Getestet &amp; empfohlen</p>
          </div>
          <div className="why-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="1" y="6" width="15" height="12" rx="2" /><path d="M16 10h4l3 3v5h-7" /><circle cx="6" cy="20" r="2" /><circle cx="18" cy="20" r="2" /></svg>
            <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Schnelle Lieferung</p>
            <p className="text-xs" style={{color: 'var(--muted)'}}>Zuverlässig &amp; sicher</p>
          </div>
          <div className="why-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 015 0c0 2-3 2-3 4M12 16.5h.01" /></svg>
            <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Faire Preise</p>
            <p className="text-xs" style={{color: 'var(--muted)'}}>Top Qualität zum besten Preis</p>
          </div>
          <div className="why-tile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 3.5 18.5 2c1 6 2.5 12-2 16-2.5 2.5-7 2.5-9.5 0" /></svg>
            <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Nachhaltig</p>
            <p className="text-xs" style={{color: 'var(--muted)'}}>Für dich &amp; die Umwelt</p>
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