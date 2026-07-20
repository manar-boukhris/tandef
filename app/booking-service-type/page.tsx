// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const SERVICES = [
  { name: 'Regelmäßige Reinigung', price: '24,90', oldPrice: '26,90', emoji: '🧹', featured: true, desc: 'Wiederkehrende Reinigung mit deinem persönlichen Pro – wöchentlich oder alle zwei Wochen.' },
  { name: 'Einmalige Reinigung', price: '26,90', oldPrice: '', emoji: '✨', desc: 'Eine einzelne Reinigung ohne Verpflichtung – ideal zum Ausprobieren.' },
  { name: 'Grundreinigung', price: '29,90', oldPrice: '', emoji: '🧽', desc: 'Tiefenreinigung bis ins Detail – auch Fenster, Backofen und schwer erreichbare Stellen.' },
  { name: 'Reinigung der Ferienwohnung', price: '26,90', oldPrice: '', emoji: '🏠', desc: 'Schnelle Reinigung zwischen zwei Gästen – perfekt für Airbnb & Ferienwohnungen.' },
];

export default function BookingServiceTypePage() {
  const router = useRouter();
  const [selected, setSelected] = useState(SERVICES[0].name);
  const [address, setAddress] = useState('');
  const [showDetails, setShowDetails] = useState(true);
  const [showLoc, setShowLoc] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    document.title = "TANDEF – Wähle deine Reinigungs-Session aus";

    const draft = getDraft();
    if (draft.serviceType) setSelected(draft.serviceType);
    if (draft.address) setAddress(draft.address);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  const selectedService = SERVICES.find(s => s.name === selected) || SERVICES[0];

  function handleSelect(name) {
    setSelected(name);
  }

  function handleNext() {
    updateDraft({ serviceType: selectedService.name });
    router.push('/booking-frequency');
  }

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{
          font-family:'Inter',sans-serif;
          color:var(--ink);
          background-color:#F6F4FC;
          background-image:url('/images/sessions-bg.png');
          background-size:cover;
          background-position:top center;
          background-repeat:no-repeat;
          background-attachment:fixed;
          min-height:100vh;
        }
        h1,h2,h3{font-family:'Poppins',sans-serif;}

        .sidebar-card{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .service-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;overflow:hidden;}
        .service-card:hover{border-color:#C9B8EC;}
        .service-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .service-emoji{width:100px;height:100px;border-radius:14px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;font-size:2.8rem;flex-shrink:0;}
        .service-emoji-sm{width:60px;height:60px;border-radius:12px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;font-size:1.8rem;flex-shrink:0;}
        .badge{background:var(--purple-100);color:var(--purple-700);font-size:.7rem;font-weight:700;padding:.25rem .6rem;border-radius:9999px;}
        .info-banner{background:var(--purple-50);border-radius:14px;padding:16px;display:flex;gap:12px;align-items:flex-start;}
        .cart-row{width:100%;display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #EFEAF6;text-align:left;background:none;cursor:pointer;}
        .cart-icon-circle{width:38px;height:38px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .chevron{transition:transform .2s ease;flex-shrink:0;color:#9C96A8;}
        .chevron.open{transform:rotate(180deg);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:11%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .service-tooltip{
          background:var(--purple-900);
          color:#fff;
          font-size:.78rem;
          padding:.6rem .9rem;
          border-radius:10px;
          margin-top:.5rem;
          position:relative;
          animation:fadeIn .15s ease;
        }
        .service-tooltip::before{
          content:'';
          position:absolute;
          top:-5px;left:24px;
          width:10px;height:10px;
          background:var(--purple-900);
          transform:rotate(45deg);
        }
        @keyframes fadeIn{
          from{opacity:0;transform:translateY(-4px);}
          to{opacity:1;transform:translateY(0);}
        }
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Pro werden
            </a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </span>
                <span className="flex items-center gap-1">Konto
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions">Meine Sessions</a>
                <a href="/invoices">Historie und Rechnungen</a>
                <a href="/account">Mein Profil</a>
                <a href="/preferences">Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods">Zahlungsmethoden</a>
                <a href="#" className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/address" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-6 pb-24">

        <div className="flex items-center justify-between mb-8">
          <a href="/address" className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-2" style={{color: 'var(--ink)'}}>
              Wähle deine Reinigungs-Session aus
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--purple-500)"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
            </h1>

            <div className="space-y-4">
              {SERVICES.map(service => {
                const isSelected = selected === service.name;
                return (
                  <div
                    key={service.name}
                    onClick={() => handleSelect(service.name)}
                    onMouseEnter={() => setHoveredService(service.name)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`service-card ${isSelected ? 'selected' : ''} ${isSelected ? 'p-6' : 'p-5'}`}
                  >
                    {isSelected ? (
                      <>
                        <div className="flex items-start gap-5 mb-4">
                          <div className="service-emoji">{service.emoji}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <p className="font-bold text-lg" style={{color: 'var(--ink)'}}>{service.name}</p>
                              {service.featured && <span className="badge shrink-0">Beliebt</span>}
                            </div>
                            <p className="font-bold" style={{color: 'var(--purple-700)'}}>
                              {service.price} €/Std.{' '}
                              {service.oldPrice && <span className="font-normal line-through" style={{color: 'var(--muted)'}}>{service.oldPrice} €/Std.</span>}
                            </p>
                          </div>
                        </div>
                        {service.featured && (
                          <ul className="space-y-2 text-sm" style={{color: 'var(--ink)'}}>
                            <li className="flex items-start gap-2">
                              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                              <span>Keine Verpflichtungen und jederzeit <span className="font-semibold" style={{color: 'var(--purple-700)'}}>kostenlos kündbar</span> oder pausierbar</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                              <span>Jedes Mal der gleiche, nach der ersten Session von dir bestätigte Pro</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                              <span>Fensterputzen inklusive</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                              <span>Bügeln optional</span>
                            </li>
                          </ul>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-5">
                          <div className="service-emoji-sm">{service.emoji}</div>
                          <div className="flex-1">
                            <p className="font-bold" style={{color: 'var(--ink)'}}>{service.name}</p>
                            <p className="text-sm" style={{color: 'var(--muted)'}}>{service.price} €/Std.</p>
                          </div>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2" className="shrink-0"><path d="M9 18l6-6-6-6" /></svg>
                        </div>
                        {hoveredService === service.name && (
                          <div className="service-tooltip">{service.desc}</div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sidebar-card p-7 sticky top-6">
              <h3 className="font-bold text-lg mb-2" style={{color: 'var(--ink)'}}>Mein Warenkorb</h3>

              <button onClick={() => setShowLoc(v => !v)} className="cart-row">
                <span className="cart-icon-circle">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <span className="flex-1 text-left text-sm" style={{color: 'var(--muted)'}}>{address || 'Adresse nicht angegeben'}</span>
                <svg className={`chevron ${showLoc ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>

              <button onClick={() => setShowDetails(v => !v)} className="cart-row">
                <span className="cart-icon-circle">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" /></svg>
                </span>
                <span className="flex-1 text-left font-semibold" style={{color: 'var(--ink)'}}>Reinigung</span>
                <svg className={`chevron ${showDetails ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {showDetails && (
                <div className="pl-14 pb-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span style={{color: 'var(--muted)'}}>{selectedService.name}</span>
                    <span style={{color: 'var(--ink)'}}>{selectedService.price} €/Std.</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t mt-2" style={{borderColor: '#EFEAF6'}}>
                <span className="font-bold" style={{color: 'var(--ink)'}}>Gesamt</span>
                <div className="text-right">
                  <p className="font-extrabold text-lg" style={{color: 'var(--purple-700)'}}>{selectedService.price} €/Std.</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Servicegebühren inklusive</p>
                </div>
              </div>

              <div className="info-banner mt-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                <p className="text-sm" style={{color: 'var(--ink)'}}>20% auf deine Reinigungsdienste (ohne Wecasa-Gebühr) dank <a href="#" className="underline font-semibold" style={{color: 'var(--purple-700)'}}>Steuererstattung!</a> 🤩</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-center mt-10">
          <button onClick={handleNext} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
            Weiter
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>

      </section>

      <a href="tel:+4900000000" className="fixed left-7 bottom-7 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" /></svg>
      </a>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}