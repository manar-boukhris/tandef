// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const OPTIONS = [
  { name: 'Wöchentlich', desc: 'Immer dieselbe Reinigungskraft, gleicher Tag jede Woche.', price: '14,90', badge: 'Beliebt' },
  { name: 'Alle zwei Wochen', desc: 'Regelmäßige Reinigung mit flexiblem Rhythmus.', price: '16,90' },
  { name: 'Einmalig', desc: 'Eine einzelne Reinigung ohne Verpflichtung.', price: '19,90' },
];

export default function BookingFrequencyPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('Wöchentlich');

  useEffect(() => {
    document.title = "TANDEF – Wie oft sollen wir kommen?";
    const draft = getDraft();
    if (draft.frequency) setSelected(draft.frequency);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function handleNext() {
    updateDraft({ frequency: selected });
    router.push('/booking-hours');
  }

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
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
       
        .option-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;}
        .option-card:hover{border-color:#C9B8EC;}
        .option-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .option-card.selected .check-dot{background:var(--purple-600);border-color:var(--purple-600);}
        .check-dot{width:20px;height:20px;border-radius:9999px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;}
        .badge{background:var(--purple-100);color:var(--purple-700);font-size:.7rem;font-weight:700;padding:.25rem .6rem;border-radius:9999px;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:22%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>Pro werden</a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>Magazin</a>
            <div className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>Konto</button>
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

      <div className="relative max-w-3xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/booking-service-type" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-3xl mx-auto px-6 pt-10 pb-24 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{color: 'var(--purple-700)'}}>Wie oft sollen wir kommen?</h1>
        <p className="mb-10" style={{color: 'var(--muted)'}}>Wähle den Rhythmus, der zu dir passt. Du kannst jederzeit wechseln oder pausieren.</p>

        <div className="space-y-4 text-left mb-10">
          {OPTIONS.map(opt => (
            <div
              key={opt.name}
              onClick={() => setSelected(opt.name)}
              className={`option-card p-6 flex items-center gap-5 ${selected === opt.name ? 'selected' : ''}`}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{background: 'var(--purple-100)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-bold" style={{color: 'var(--ink)'}}>{opt.name}</p>
                  {opt.badge && <span className="badge">{opt.badge}</span>}
                </div>
                <p className="text-sm" style={{color: 'var(--muted)'}}>{opt.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-extrabold" style={{color: 'var(--purple-700)'}}>{opt.price} €</p>
                <p className="text-xs" style={{color: 'var(--muted)'}}>pro Stunde</p>
              </div>
              <span className="check-dot shrink-0">
                {selected === opt.name && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}
              </span>
            </div>
          ))}
        </div>

        <button onClick={handleNext} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
          Weiter
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>

        <p className="flex items-center justify-center gap-2 text-sm mt-6" style={{color: 'var(--muted)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
          Keine Vertragsbindung – jederzeit kündbar.
        </p>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}