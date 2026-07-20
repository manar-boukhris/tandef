// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export default function CleanerAvailabilityPage() {
  const logout = useLogout('cleaner');
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [availableDays, setAvailableDays] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Meine Verfügbarkeit";

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  useEffect(() => {
    fetch(`/api/cleaner/availability?year=${year}&month=${month}`)
      .then(res => res.json())
      .then(data => setAvailableDays(data.availableDays || []));
  }, [year, month]);

  function toggleDay(day: number) {
    setSaved(false);
    setAvailableDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/cleaner/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year, month, days: availableDays }),
    });
    setSaving(false);
    setSaved(true);
  }

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(y => y - 1); } else { setMonth(m => m - 1); }
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(y => y + 1); } else { setMonth(m => m + 1); }
  }

  // Bina calendrier
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7; // 0 = Montag
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) =>
    day === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear();

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
        
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .cal-day{
          aspect-ratio:1;border-radius:12px;border:1.5px solid #ECE8F5;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:2px;cursor:pointer;transition:.15s ease;position:relative;
        }
        .cal-day:hover{border-color:#C9B8EC;}
        .cal-day.available{background:var(--purple-50);border-color:#C9B8EC;}
        .cal-day.available .num{color:var(--purple-700);}
        .cal-day.available::after{content:'';width:5px;height:5px;border-radius:9999px;background:var(--purple-600);position:absolute;bottom:6px;}
        .cal-day.today{border-color:var(--purple-600);border-width:2px;}
        .cal-day .num{font-size:.85rem;font-weight:600;color:var(--ink);}
        .legend-dot{width:10px;height:10px;border-radius:9999px;display:inline-block;}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{background: 'var(--purple-100)', color: 'var(--purple-700)'}}>Reinigungskraft</span>
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
                <a href="/cleaner-dashboard">Mein Cleaner-Bereich</a>
                <a href="/cleaner-availability" className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Verfügbarkeit</a>
                <a href="/cleaner-bookings">Meine Buchungen</a>
                <a href="/cleaner-reviews">Meine Bewertungen</a>
                <a href="/cleaner-profile">Mein Profil</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-5xl mx-auto px-6 pt-10 pb-4">
        <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
          Cleaner-Bereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Verfügbarkeit</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-2" style={{color: 'var(--purple-700)'}}>Meine Verfügbarkeit</h1>
        <p style={{color: 'var(--muted)'}}>Lege fest, an welchen Tagen im Monat du Aufträge annehmen möchtest.</p>
      </section>

      <section className="relative max-w-5xl mx-auto px-6 pb-10 grid lg:grid-cols-3 gap-6 items-start">

        <div className="panel p-8 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50" style={{border: '1.5px solid #ECE8F5'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <h2 className="font-bold text-lg" style={{color: 'var(--ink)'}}>{MONTH_NAMES[month - 1]} {year}</h2>
            <button onClick={nextMonth} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50" style={{border: '1.5px solid #ECE8F5'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold" style={{color: 'var(--muted)'}}>
            <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const available = availableDays.includes(day);
              return (
                <div
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`cal-day ${available ? 'available' : ''} ${isToday(day) ? 'today' : ''}`}
                >
                  <span className="num">{day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 text-sm" style={{color: 'var(--muted)'}}>
            <span className="flex items-center gap-2"><span className="legend-dot" style={{background: 'var(--purple-600)'}}></span>Verfügbar</span>
            <span className="flex items-center gap-2"><span className="legend-dot" style={{background: '#ECE8F5'}}></span>Nicht verfügbar</span>
            <span className="ml-auto">Tippe auf einen Tag, um ihn umzuschalten</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-7">
            <h3 className="font-bold text-lg mb-2" style={{color: 'var(--ink)'}}>Diesen Monat</h3>
            <p className="text-3xl font-extrabold mb-1" style={{color: 'var(--purple-700)'}}>
              {availableDays.length} <span className="text-base font-medium" style={{color: 'var(--muted)'}}>Tage verfügbar</span>
            </p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>von {daysInMonth} Tagen im {MONTH_NAMES[month - 1]}</p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-gradient w-full text-white font-semibold py-3.5 rounded-full inline-flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
            {saving ? 'Wird gespeichert...' : saved ? 'Gespeichert ✓' : 'Änderungen speichern'}
          </button>
        </div>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}