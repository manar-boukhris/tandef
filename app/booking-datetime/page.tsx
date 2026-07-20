// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const TIMES = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
const DAY_LABELS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

function nextDays(n: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function BookingDatetimePage() {
  const router = useRouter();
  const days = nextDays(7);
  const [selectedDate, setSelectedDate] = useState(days[2].toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [hours, setHours] = useState(3);

  useEffect(() => {
    document.title = "TANDEF – Wann sollen wir kommen?";
    const draft = getDraft();
    if (draft.date) setSelectedDate(draft.date);
    if (draft.time) setSelectedTime(draft.time);
    if (draft.hours) setHours(draft.hours);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  const chosenDate = new Date(selectedDate);
  const summary = `${chosenDate.toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })} · ${selectedTime} Uhr · ${hours} Stunden`;

  function handleNext() {
    updateDraft({ date: selectedDate, time: selectedTime });
    router.push('/booking-recipient');
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
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .day-chip{border:2px solid #ECE8F5;border-radius:14px;transition:.15s ease;cursor:pointer;background:#fff;padding:.9rem .5rem;text-align:center;}
        .day-chip:hover{border-color:#C9B8EC;}
        .day-chip.selected{border-color:var(--purple-600);background:var(--purple-50);}
        .time-chip{border:2px solid #ECE8F5;border-radius:9999px;transition:.15s ease;cursor:pointer;background:#fff;padding:.6rem 1.4rem;font-weight:600;font-size:.9rem;}
        .time-chip:hover{border-color:#C9B8EC;}
        .time-chip.selected{border-color:var(--purple-600);background:var(--purple-600);color:#fff;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:56%;}
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

      <div className="relative max-w-3xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/booking-extras" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-3xl mx-auto px-6 pt-10 pb-24 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{color: 'var(--purple-700)'}}>Wann sollen wir kommen?</h1>
        <p className="mb-10" style={{color: 'var(--muted)'}}>Wähle deinen Wunschtag und die passende Uhrzeit.</p>

        <div className="panel p-8 mb-8 text-left">
          <p className="font-semibold mb-5" style={{color: 'var(--ink)'}}>Wähle einen Tag</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-10">
            {days.map(d => {
              const iso = d.toISOString().slice(0, 10);
              return (
                <button key={iso} onClick={() => setSelectedDate(iso)} className={`day-chip ${selectedDate === iso ? 'selected' : ''}`}>
                  <span className="block text-xs" style={{color: 'var(--muted)'}}>{DAY_LABELS[d.getDay()]}</span>
                  <span className="block font-bold text-lg">{d.getDate()}</span>
                </button>
              );
            })}
          </div>

          <p className="font-semibold mb-5" style={{color: 'var(--ink)'}}>Wähle eine Uhrzeit</p>
          <div className="flex flex-wrap gap-3">
            {TIMES.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)} className={`time-chip ${selectedTime === t ? 'selected' : ''}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="panel p-6 mb-8 flex items-center gap-4 text-left">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{background: 'var(--purple-100)'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /></svg>
          </div>
          <p style={{color: 'var(--muted)'}}>Deine Reinigung: <span className="font-semibold" style={{color: 'var(--ink)'}}>{summary}</span></p>
        </div>

        <button onClick={handleNext} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
          Weiter
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}