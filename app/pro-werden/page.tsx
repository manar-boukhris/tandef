// @ts-nocheck
'use client';

import { useEffect } from 'react';

export default function ProWerdenPage() {

  useEffect(() => {
    document.title = "TANDEF – Reinigungsprofis in deiner Nähe finden";
    const slider = document.getElementById('avail-slider');
    const availValue = document.getElementById('avail-value');
    const avgIncome = document.getElementById('avg-income');
    const maxIncome = document.getElementById('max-income');
    const RATE = 20;

    function updateSlider(){
      const hoursPerWeek = parseInt(slider.value, 10);
      availValue.textContent = hoursPerWeek;
      avgIncome.textContent = RATE;
      const monthly = Math.round((hoursPerWeek * RATE * 4.33) / 10) * 10;
      maxIncome.textContent = monthly.toLocaleString('de-DE');
      const pct = ((hoursPerWeek - 5) / (40 - 5)) * 100;
      slider.style.background = `linear-gradient(90deg, var(--purple-600) ${pct}%, #E7E1F5 ${pct}%)`;
    }
    slider.addEventListener('input', updateSlider);
    updateSlider();

    const aboutBtn = document.getElementById('about-menu-btn');
    const aboutMenu = document.getElementById('about-menu');
    if (aboutBtn && aboutMenu) {
      aboutBtn.addEventListener('click', (e) => { e.stopPropagation(); aboutMenu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!aboutMenu.contains(e.target)) aboutMenu.classList.add('hidden'); });
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
          h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
          .btn-primary{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-primary:hover{filter:brightness(1.05);}
          .btn-outline-white{border:1.5px solid #fff;color:#fff;transition:.2s ease;}
          .btn-outline-white:hover{background:rgba(255,255,255,.12);}
          .hero-card{
            background:linear-gradient(135deg,#F3EEFC,#EDE9FE 60%,#F6F4FC);
            border-radius:28px;
          }
          .rating-pill{
            background:#fff;border-radius:9999px;box-shadow:0 12px 30px -12px rgba(76,29,149,.35);
          }
          .stars{color:#F5A623;}
          .panel-white{background:#fff;border-radius:18px;box-shadow:0 15px 40px -20px rgba(76,29,149,.25);}
          .range-slider{
            -webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:9999px;
            background:linear-gradient(90deg,var(--purple-600) 62%,#E7E1F5 62%);outline:none;
          }
          .range-slider::-webkit-slider-thumb{
            -webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:9999px;
            background:var(--purple-600);border:3px solid #fff;box-shadow:0 4px 10px rgba(76,29,149,.4);cursor:pointer;
          }
          .range-slider::-moz-range-thumb{
            width:20px;height:20px;border-radius:9999px;background:var(--purple-600);border:3px solid #fff;
            box-shadow:0 4px 10px rgba(76,29,149,.4);cursor:pointer;
          }
          .trust-badge{
            background:#fff;border-radius:18px;box-shadow:0 8px 24px -12px rgba(76,29,149,.18);
            height:100%;
          }
          .icon-circle-sm{width:38px;height:38px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .step-card{
            background:#fff;border-radius:20px;box-shadow:0 10px 30px -18px rgba(76,29,149,.2);transition:.2s ease;
          }
          .step-card:hover{box-shadow:0 15px 35px -18px rgba(76,29,149,.3);transform:translateY(-3px);}
          .step-num{
            width:30px;height:30px;border-radius:9999px;background:var(--purple-700);color:#fff;
            display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0;
          }
          .icon-tile-lg{
            width:110px;height:110px;border-radius:9999px;background:var(--purple-50);
            display:flex;align-items:center;justify-content:center;position:relative;
          }
          .check-badge{
            position:absolute;bottom:2px;right:2px;width:30px;height:30px;border-radius:9999px;
            background:var(--purple-600);display:flex;align-items:center;justify-content:center;border:3px solid #fff;
          }
          .faq-item{border:1px solid #ECE8F5;border-radius:14px;}
          .faq-item summary{list-style:none;cursor:pointer;}
          .faq-item summary::-webkit-details-marker{display:none;}
          .faq-item[open] summary .faq-chevron{transform:rotate(180deg);}
          .why-icon{width:64px;height:64px;border-radius:9999px;background:var(--purple-50);display:flex;align-items:center;justify-content:center;}
          .cta-banner{
            background:linear-gradient(120deg,var(--purple-900),var(--purple-600));border-radius:28px;
          }
          .dropdown-menu a{display:block;padding:.6rem 1.25rem;font-size:.9rem;}
          .dropdown-menu a:hover{background:var(--purple-50);}
      `}</style>
      {/* Header */}
      <header className="bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
            <a href="/" className="flex flex-col items-center gap-1 hover:opacity-70">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Für Kunden
            </a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="about-menu-btn" className="flex flex-col items-center gap-1 hover:opacity-70">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
                <span className="flex items-center gap-1">
                  Über uns
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="about-menu" className="dropdown-menu hidden absolute left-0 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
                <a href="/ueber-uns" style={{color: 'var(--ink)'}}>Über uns</a>
                <a href="/unser-team" style={{color: 'var(--ink)'}}>Unser Team</a>
                <a href="/karriere" style={{color: 'var(--ink)'}}>Karriere</a>
                <a href="/kontakt" style={{color: 'var(--ink)'}}>Kontakt</a>
              </div>
            </div>
            <a href="/login" className="flex flex-col items-center gap-1 hover:opacity-70">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
          <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            Reinigung buchen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="hero-card grid md:grid-cols-2 gap-10 items-center p-8 md:p-12">

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
              Reinigungsprofis<br />in <span style={{color: 'var(--purple-600)'}}>deiner Nähe</span> finden
            </h1>
            <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
              Zuverlässige Reinigungskräfte schnell und flexibel – genau dann, wenn du sie brauchst.
            </p>

            <div className="panel-white p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Deine Verfügbarkeit</p>
                <p className="font-bold text-sm" style={{color: 'var(--purple-700)'}}><span id="avail-value">25</span> Std. pro Woche</p>
              </div>
              <input type="range" min="5" max="40" defaultValue="25" step="1" className="range-slider mb-6" id="avail-slider" />

              <div className="rounded-xl p-4 flex items-center justify-between" style={{background: 'var(--purple-50)'}}>
                <div>
                  <p className="text-xs font-bold tracking-wide mb-2 flex items-center gap-1" style={{color: 'var(--muted)'}}>
                    DEIN ERWARTETES EINKOMMEN
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                  </p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Im Durchschnitt</p>
                  <p className="text-2xl font-extrabold" style={{color: 'var(--purple-700)'}}><span id="avg-income">20</span> €/Std.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{color: 'var(--muted)'}}>bis zu</p>
                  <p className="text-2xl font-extrabold" style={{color: 'var(--purple-700)'}}><span id="max-income">2150</span> €/M.</p>
                </div>
              </div>
            </div>

            <a href="/register?role=cleaner" className="btn-primary w-full text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 mb-8">
              Jetzt kostenlos registrieren
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <div className="trust-badge p-5 flex items-center gap-3">
                <span className="icon-circle-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg></span>
                <div>
                  <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Sicher &amp; geprüft</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Alle Helfer sind verifiziert</p>
                </div>
              </div>
              <div className="trust-badge p-5 flex items-center gap-3">
                <span className="icon-circle-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg></span>
                <div>
                  <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Schnell &amp; flexibel</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Buche in wenigen Minuten</p>
                </div>
              </div>
              <div className="trust-badge p-5 flex items-center gap-3">
                <span className="icon-circle-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg></span>
                <div>
                  <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Zufriedenheit garantiert</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>4,9/5 Sterne Bewertung</p>
                </div>
              </div>
              <div className="trust-badge p-5 flex items-center gap-3">
                <span className="icon-circle-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /></svg></span>
                <div>
                  <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Kostenlos &amp; unverbindlich</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Keine Gebühren</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rating-pill px-4 py-2 flex items-center gap-2 absolute top-4 right-4 z-10 text-sm">
              <span className="font-semibold" style={{color: 'var(--ink)'}}>Bewertung 4,9</span>
              <span className="stars">★★★★★</span>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img src="/images/pro-hero.png" alt="TANDEF Reinigungsprofi bei der Arbeit" className="w-full h-full object-cover rounded-3xl" style={{minHeight: '420px'}} />
            </div>
          </div>

        </div>
      </section>

      {/* So einfach geht's */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2" style={{color: 'var(--purple-900)'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--purple-500)"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
          So <span style={{color: 'var(--purple-600)'}}>einfach</span> geht's
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--purple-500)"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
        </h2>
        <p className="mb-12" style={{color: 'var(--muted)'}}>In wenigen Schritten registrieren und Aufträge erhalten</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 text-left mb-12">

          <div className="step-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="step-num">1</span>
              <p className="font-bold" style={{color: 'var(--ink)'}}>Registriere dich</p>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Die Registrierung ist kostenlos und dauert nur 2 Minuten.</p>
            <div className="icon-tile-lg mx-auto">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.6"><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M9.5 7h5M9.5 10.5h5M9.5 14h3" /></svg>
              <span className="check-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg></span>
            </div>
          </div>

          <div className="step-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="step-num">2</span>
              <p className="font-bold" style={{color: 'var(--ink)'}}>Dokumente hochladen</p>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Lade deinen Ausweis und ggf. weitere Dokumente hoch.</p>
            <div className="icon-tile-lg mx-auto">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.6"><path d="M4 8a2 2 0 012-2h1.5l1-1.5h7l1 1.5H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" /><circle cx="12" cy="12.5" r="3.2" /></svg>
              <span className="check-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg></span>
            </div>
          </div>

          <div className="step-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="step-num">3</span>
              <p className="font-bold" style={{color: 'var(--ink)'}}>Profil vervollständigen</p>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Lege deine Arbeitszeiten, Dienste und deinen Umkreis fest.</p>
            <img src="/images/step3-phone.png" alt="Profil vervollständigen" className="w-full h-auto" />
          </div>

          <div className="step-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="step-num">4</span>
              <p className="font-bold" style={{color: 'var(--ink)'}}>Aufträge erhalten</p>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Erhalte passende Reinigungsaufträge in deiner Nähe und entscheide frei, welche du annimmst.</p>
            <img src="/images/step4-phone.png" alt="Aufträge erhalten" className="w-full h-auto" />
          </div>

          <div className="step-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="step-num">5</span>
              <p className="font-bold" style={{color: 'var(--ink)'}}>Verdienst erhalten</p>
            </div>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Die Auszahlung erfolgt regelmäßig jede Woche oder jeden Monat – transparent und pünktlich.</p>
            <img src="/images/step5-phone.png" alt="Verdienst erhalten" className="w-full h-auto" />
          </div>

        </div>

        <a href="/register?role=cleaner" className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-10 py-4 rounded-full mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
          Jetzt als Reinigungskraft registrieren
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <p className="flex items-center justify-center gap-4 text-sm" style={{color: 'var(--muted)'}}>
          <span className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg> Kostenlos</span>
          •
          <span className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg> Sicher</span>
          •
          <span className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg> Unverbindlich</span>
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10" style={{color: 'var(--purple-700)'}}>Häufige Fragen</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Was ist TANDEF?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>TANDEF ist die Plattform, die Reinigungsprofis mit Kunden in ihrer Nähe verbindet – einfach, transparent und ohne versteckte Kosten.</p>
          </details>

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Wie kann ich TANDEF kontaktieren, wenn ich Fragen habe?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>Unser Support-Team ist per Chat, E-Mail und Telefon erreichbar – wir helfen dir gerne bei allen Fragen weiter.</p>
          </details>

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Wie bekomme ich neue Aufträge?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>Sobald dein Profil vollständig ist, erhältst du passende Aufträge in deiner Nähe direkt in der App und kannst frei entscheiden, welche du annimmst.</p>
          </details>

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Welche Dienstleistungen kann ich anbieten?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>Wohnungsreinigung, Büroreinigung, Grundreinigung, Umzugsreinigung und weitere – du wählst selbst, was zu dir passt.</p>
          </details>

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Wie werde ich bezahlt?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>Deine Auszahlungen erfolgen regelmäßig, wöchentlich oder monatlich, direkt auf dein Bankkonto – transparent nachvollziehbar in deinem Profil.</p>
          </details>

          <details className="faq-item p-5">
            <summary className="flex items-center justify-between font-semibold" style={{color: 'var(--ink)'}}>
              Wie hoch ist die TANDEF-Provision?
              <svg className="faq-chevron transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-sm mt-3" style={{color: 'var(--muted)'}}>Die Provision ist fair und wird dir vor jedem Auftrag klar angezeigt – keine versteckten Abzüge.</p>
          </details>

        </div>

        <div className="flex justify-center mb-6">
          <a href="#" className="rounded-full border px-6 py-3 font-medium text-sm flex items-center gap-2" style={{borderColor: 'var(--purple-600)', color: 'var(--purple-700)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 015.8 1c0 2-3 2.5-3 4.5M12 17h.01" /></svg>
            Alle Fragen ansehen
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/register?role=cleaner" className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-10 py-4 rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
            Jetzt als Reinigungskraft registrieren
          </a>
        </div>
      </section>

      {/* Warum TANDEF */}
      <section className="py-16" style={{background: 'var(--purple-50)'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12" style={{color: 'var(--ink)'}}>Warum <span style={{color: 'var(--purple-600)'}}>TANDEF</span> die beste Wahl für Profis ist</h2>
          <div className="grid md:grid-cols-3 gap-10 mb-10">

            <div>
              <div className="why-icon mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" /><path d="M5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4" /></svg>
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--purple-700)'}}>Wer sind wir?</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>2016 gegründet, ist TANDEF die führende Plattform für Reinigungsprofis. Mehr als 10.000 unabhängige Profis vertrauen auf uns.</p>
            </div>

            <div>
              <div className="why-icon mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M15 4V2M15 10v-2M11 6H9M21 6h-2M17.5 3.5l-1.4 1.4M17.5 8.5l-1.4-1.4M12.5 8.5l1.4-1.4M12.5 3.5l1.4 1.4" /><path d="M3 21l9-9M14 12l7-7" /></svg>
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--purple-700)'}}>Unsere Mission</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Wir digitalisieren die Reinigungsbranche und schaffen bessere Arbeitsbedingungen. So kannst du dich auf das konzentrieren, was wirklich zählt: deine Arbeit.</p>
            </div>

            <div>
              <div className="why-icon mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
              </div>
              <p className="font-bold mb-2" style={{color: 'var(--purple-700)'}}>Unser Engagement</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Wir sind für dich da – als Vermittler, Unterstützer und Partner. Dein Erfolg ist unser Antrieb.</p>
            </div>

          </div>
          <a href="/register?role=cleaner" className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-10 py-4 rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
            Jetzt als Reinigungskraft registrieren
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="cta-banner text-center py-16 px-6 relative overflow-hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity=".5" className="absolute top-8 left-10"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity=".4" className="absolute bottom-10 right-16"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
          <h2 className="text-3xl font-bold text-white mb-3">Bereit, durchzustarten?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{color: '#E4D9FA'}}>Werde Teil von TANDEF und erhalte regelmäßig Aufträge in deiner Nähe.</p>
          <a href="/register?role=cleaner" className="btn-outline-white inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
            Jetzt registrieren
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-5 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Du hast das Talent, wir haben die Kunden.</p>
            <div className="flex gap-3 mt-5" style={{color: 'var(--purple-700)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-9h3l.5-4H13V6.5c0-1.2.3-2 2-2h2V1h-3c-3 0-4.5 1.7-4.5 4.5V9H8v4h2.5v9H13z" /></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a1 1 0 00-1-1h-1.7c-2.3 0-4.5 1.2-5.6 3.4-.5.9-.7 1.9-.7 3.1v2H7.2a1 1 0 00-1 1v2.9a1 1 0 001 1H10v7a1 1 0 001 1h3a1 1 0 001-1v-7h2a1 1 0 001-.9l.3-2.9a1 1 0 00-1-1.1h-2.3V8.6c0-.8.4-1.5 1.4-1.5H18a1 1 0 001-1V3z" /></svg>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Über uns</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/ueber-uns" className="hover:opacity-70">Über TANDEF</a></li>
              <li><a href="#" className="hover:opacity-70">So funktioniert's</a></li>
              <li><a href="/" className="hover:opacity-70">Für Kunden</a></li>
              <li><a href="/magazin" className="hover:opacity-70">TANDEF Magazin</a></li>
              <li><a href="/kontakt" className="hover:opacity-70">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Support</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="#" className="hover:opacity-70">Häufige Fragen</a></li>
              <li><a href="#" className="hover:opacity-70">Sicherheit</a></li>
              <li><a href="#" className="hover:opacity-70">Richtlinien</a></li>
              <li><a href="#" className="hover:opacity-70">AGB</a></li>
              <li><a href="#" className="hover:opacity-70">Datenschutz</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Für Profis</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/register?role=cleaner" className="hover:opacity-70">Profis werden</a></li>
              <li><a href="/login" className="hover:opacity-70">Profi Login</a></li>
              <li><a href="#" className="hover:opacity-70">Tipps &amp; Tricks</a></li>
              <li><a href="#" className="hover:opacity-70">Partner werden</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs pb-8" style={{color: 'var(--muted)'}}>
          <span>© 2024 TANDEF. Alle Rechte vorbehalten.</span>
          <span>Made with ❤️ in Germany</span>
        </div>
      </footer>
    </>
  );
}