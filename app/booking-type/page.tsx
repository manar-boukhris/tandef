// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

function WohnungIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.6">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function FirmenIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.6">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <path d="M8 14h8M8 11h5"/>
    </svg>
  );
}

function UmzugIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="1.6">
      <path d="M1 3h15v13H1z"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

const TYPES = [
  { id: 'wohnung', name: 'Wohnungsreinigung', desc: 'Reinigung für deine Wohnung oder dein Haus.',    iconBg: '#EDE9FE', Icon: WohnungIcon },
  { id: 'firmen',  name: 'Firmenreinigung',   desc: 'Reinigung für Büros und Geschäftsräume.',        iconBg: '#EDE9FE', Icon: FirmenIcon  },
  { id: 'umzug',   name: 'Umzugsreinigung',   desc: 'Endreinigung für eine reibungslose Übergabe.',  iconBg: '#DCFCE7', Icon: UmzugIcon   },
];

export default function BookingTypePage() {
  const router = useRouter();
  const [selected, setSelected] = useState('wohnung');
  const [address, setAddress] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Welche Art von Reinigung brauchst du?";
    const draft = getDraft();
    if (draft.bookingType) setSelected(draft.bookingType);
    if (draft.address) setAddress(draft.address);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function handleNext() {
    updateDraft({ bookingType: selected });
    router.push('/booking-package');
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
        .type-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;}
        .type-card:hover{border-color:#C9B8EC;}
        .type-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .type-icon{width:64px;height:64px;border-radius:14px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:12px;}
        .type-icon img{width:100%;height:100%;object-fit:contain;}
        .checkbox-box{width:24px;height:24px;border-radius:8px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;flex-shrink:0;}
        .type-card.selected .checkbox-box{background:var(--purple-600);border-color:var(--purple-600);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:22%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
      `}</style>

      <div className="relative max-w-3xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/address" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-3xl mx-auto px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <a href="/address" className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center" style={{color: 'var(--ink)'}}>Welche Art von Reinigung brauchst du?</h1>
        <p className="mb-8 text-center" style={{color: 'var(--muted)'}}>Wähle die passende Kategorie für deine Buchung.</p>

        <div className="space-y-4">
          {TYPES.map(type => {
            const isSelected = selected === type.id;
            return (
              <div key={type.id} onClick={() => setSelected(type.id)} className={`type-card p-5 flex items-center gap-5 ${isSelected ? 'selected' : ''}`}>
                <div className="type-icon" style={{background: type.iconBg}}><type.Icon /></div>
                <div className="flex-1">
                  <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>{type.name}</p>
                  <p className="text-sm" style={{color: 'var(--muted)'}}>{type.desc}</p>
                </div>
                <span className="checkbox-box shrink-0">
                  {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}
                </span>
              </div>
            );
          })}
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