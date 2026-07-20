// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const EXTRAS = [
  { id: 'ironing', name: 'Bügeln', desc: 'Wir bügeln deine Kleidung sorgfältig und professionell.', price: 2, icon: 'iron' },
  { id: 'product', name: 'Reinigungsmittel', desc: 'Hochwertige Reinigungsmittel für extra Sauberkeit und Hygiene.', price: 3, icon: 'spray' },
];

function ExtraIcon({ type }) {
  if (type === 'iron') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8">
        <path d="M4 15c0-4 3-8 9-8h4a3 3 0 013 3v1c0 2.5-2 4-4.5 4H8c-2.2 0-4 1.8-4 4z" />
        <path d="M6 19h11" />
        <circle cx="15" cy="10.5" r="1" fill="#5B21B6" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8">
      <path d="M9 2h4a1 1 0 011 1v2H8V3a1 1 0 011-1z" />
      <path d="M7 5h8l1 3H6l1-3z" />
      <path d="M6 8h10l-1 12a2 2 0 01-2 2H9a2 2 0 01-2-2L6 8z" />
      <path d="M9 12h4M9 16h4" />
    </svg>
  );
}

export default function BookingExtrasPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(['ironing']);
  const [hours, setHours] = useState(2);

  useEffect(() => {
    document.title = "TANDEF – Brauchst du sonst noch etwas?";
    const draft = getDraft();
    if (draft.extras) setSelected(draft.extras);
    if (draft.hours) setHours(draft.hours);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const base = 24.90 * hours;
  const extrasCost = selected.reduce((sum, id) => sum + (EXTRAS.find(e => e.id === id)?.price || 0) * hours, 0);
  const total = (base + extrasCost).toFixed(2).replace('.', ',');

  function handleNext() {
    updateDraft({ extras: selected });
    router.push('/booking-datetime');
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

        .sidebar-card{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .extra-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;}
        .extra-card:hover{border-color:#C9B8EC;}
        .extra-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .extra-card.selected .checkbox-box{background:var(--purple-600);border-color:var(--purple-600);}
        .checkbox-box{width:24px;height:24px;border-radius:8px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;flex-shrink:0;}
        .icon-tile{width:52px;height:52px;border-radius:14px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .info-banner{background:var(--purple-50);border-radius:14px;padding:16px;display:flex;gap:12px;align-items:flex-start;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:44%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" style={{color: 'var(--purple-700)'}}>Pro werden</a>
            <a href="/magazin" style={{color: 'var(--purple-700)'}}>Magazin</a>
            <div className="relative">
              <button id="user-menu-btn" style={{color: 'var(--purple-700)'}}>Konto</button>
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
        <a href="/booking-hours" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <a href="/booking-hours" className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{color: 'var(--ink)'}}>Brauchst du sonst noch etwas?</h1>
            <p className="mb-8" style={{color: 'var(--muted)'}}>Füge Extras hinzu und erleichtere dir die Reinigung.</p>

            <div className="space-y-4">
              {EXTRAS.map(extra => {
                const isSelected = selected.includes(extra.id);
                return (
                  <div key={extra.id} onClick={() => toggle(extra.id)} className={`extra-card p-5 flex items-center gap-5 ${isSelected ? 'selected' : ''}`}>
                    <div className="icon-tile">
                      <ExtraIcon type={extra.icon} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>{extra.name}</p>
                      <p className="text-sm" style={{color: 'var(--muted)'}}>{extra.desc}</p>
                    </div>
                    <p className="font-semibold text-sm shrink-0" style={{color: 'var(--purple-700)'}}>+{extra.price.toFixed(2).replace('.', ',')} €/Std.</p>
                    <span className="checkbox-box shrink-0">
                      {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="info-banner mt-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              <div>
                <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Gut zu wissen</p>
                <p className="text-sm" style={{color: 'var(--muted)'}}>Du kannst Extras auch nach der Buchung jederzeit hinzufügen.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sidebar-card p-7 sticky top-6">
              <h3 className="font-bold text-lg mb-4" style={{color: 'var(--ink)'}}>Mein Warenkorb</h3>
              <div className="flex justify-between items-center pt-4 border-t" style={{borderColor: '#EFEAF6'}}>
                <span className="font-bold" style={{color: 'var(--ink)'}}>Gesamt</span>
                <div className="text-right">
                  <p className="font-extrabold text-lg" style={{color: 'var(--purple-700)'}}>{total} €/Session</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Servicegebühren inklusive</p>
                </div>
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

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}