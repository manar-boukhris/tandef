// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

export default function BookingRecipientPage() {
  const router = useRouter();
  const [choice, setChoice] = useState<'me' | 'other'>('me');
  const [otherName, setOtherName] = useState('');
  const [otherPhone, setOtherPhone] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Für wen ist diese Session?";
    const draft = getDraft();
    if (draft.recipientName) { setChoice('other'); setOtherName(draft.recipientName); setOtherPhone(draft.recipientPhone || ''); }

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function handleNext() {
    if (choice === 'other') {
      updateDraft({ recipientName: otherName, recipientPhone: otherPhone });
    } else {
      updateDraft({ recipientName: '', recipientPhone: '' });
    }
    router.push('/booking-pets');
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
        .page-bg{background-color:#F6F4FC;background-image:url('/images/sessions-bg.png');background-size:cover;background-position:top center;background-repeat:no-repeat;background-attachment:fixed;min-height:100vh;}
        .radio-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;}
        .radio-card:hover{border-color:#C9B8EC;}
        .radio-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .radio-card.selected .radio-dot{border-color:var(--purple-600);}
        .radio-card.selected .radio-dot::after{transform:scale(1);}
        .radio-dot{width:24px;height:24px;border-radius:9999px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;flex-shrink:0;position:relative;}
        .radio-dot::after{content:'';width:12px;height:12px;border-radius:9999px;background:var(--purple-600);transform:scale(0);transition:.15s ease;}
        .icon-tile{width:52px;height:52px;border-radius:14px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .field{background:#F7F6FA;border:1px solid #ECE9F3;border-radius:12px;transition:.15s ease;}
        .field:focus-within{border-color:var(--purple-600);background:#fff;}
        .field input{background:transparent;outline:none;width:100%;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:67%;}
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
        <a href="/booking-datetime" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <a href="/booking-datetime" className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{color: 'var(--ink)'}}>Für wen ist diese Session?</h1>

          <div className="space-y-4 mb-6">
            <div onClick={() => setChoice('me')} className={`radio-card p-6 flex items-center gap-5 ${choice === 'me' ? 'selected' : ''}`}>
              <div className="icon-tile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Für mich</p>
                <p className="text-sm" style={{color: 'var(--muted)'}}>Dein Konto wird als Kontakt verwendet.</p>
              </div>
              <span className="radio-dot shrink-0"></span>
            </div>

            <div onClick={() => setChoice('other')} className={`radio-card p-6 flex items-center gap-5 ${choice === 'other' ? 'selected' : ''}`}>
              <div className="icon-tile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{color: 'var(--ink)'}}>Für jemand anderen</p>
              </div>
              <span className="radio-dot shrink-0"></span>
            </div>
          </div>

          {choice === 'other' && (
            <div className="space-y-4 mb-6">
              <div className="field flex items-center gap-3 px-4 py-3">
                <input type="text" placeholder="Name der Person" value={otherName} onChange={(e) => setOtherName(e.target.value)} />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3">
                <input type="tel" placeholder="Telefonnummer" value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} />
              </div>
            </div>
          )}

          <div className="flex justify-center mt-10">
            <button onClick={handleNext} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
              Weiter
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}