// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';
export default function CleanerDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const logout = useLogout('cleaner');
  useEffect(() => {
    document.title = "TANDEF – Mein Cleaner-Bereich";

    fetch('/api/cleaner/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
      
    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  const firstName = data?.name?.split(' ')[0] || '';

  const nextSessionText = data?.nextBooking
    ? `${new Date(data.nextBooking.date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long' })} um ${new Date(data.nextBooking.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} · ${data.nextBooking.serviceType} bei ${data.nextBooking.customerName} in ${data.nextBooking.address}`
    : 'Keine bevorstehende Session geplant.';

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


          h1,h2,h3{font-family:'Poppins',sans-serif;}
          
          .tile{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);transition:.2s ease;}
          .tile:hover{transform:translateY(-4px);box-shadow:0 25px 55px -25px rgba(76,29,149,.35);}
          .icon-circle{width:52px;height:52px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-gradient:hover{filter:brightness(1.05);}
          .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
          .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
          .dropdown-menu a:hover{background:var(--purple-50);}
          .chat-bubble{
            position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
            background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
          }
          .stat-pill{background:var(--purple-50);border-radius:14px;}
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
                <span className="flex items-center gap-1">{data?.name || '...'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/cleaner-dashboard" className="font-semibold" style={{color: 'var(--purple-700)'}}>Mein Cleaner-Bereich</a>
                <a href="/cleaner-availability">Meine Verfügbarkeit</a>
                <a href="/cleaner-bookings">Meine Buchungen</a>
                <a href="/cleaner-reviews">Meine Bewertungen</a>
                <a href="/cleaner-profile">Mein Profil</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Greeting */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-3" style={{color: 'var(--purple-700)'}}>
          {loading ? 'Hallo! 👋' : `Hallo ${firstName}! 👋`}
        </h1>
        <p style={{color: 'var(--muted)'}}>Willkommen in deinem Cleaner-Bereich. Was möchtest du tun?</p>
      </section>

      {/* Quick stats */}
      <section className="relative max-w-6xl mx-auto px-6 pb-10">
        <div className="tile p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{background: 'linear-gradient(120deg,#5B21B6,#7C3AED)'}}>
          <div className="text-white text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Deine nächste Session</h2>
            <p style={{color: '#DDD0F5'}}>{loading ? 'Wird geladen...' : nextSessionText}</p>
          </div>
          <a href="/cleaner-bookings" className="bg-white font-bold px-8 py-3.5 rounded-full shrink-0 inline-flex items-center gap-2" style={{color: 'var(--purple-700)'}}>
            Alle Buchungen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </a>
        </div>
      </section>

      {/* Stat row */}
      <section className="relative max-w-6xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-pill p-5 text-center">
          <p className="font-extrabold text-2xl" style={{color: 'var(--purple-700)'}}>
            {loading ? '—' : `${data.rating.toFixed(1)} ★`}
          </p>
          <p className="text-xs" style={{color: 'var(--muted)'}}>Bewertung</p>
        </div>
        <div className="stat-pill p-5 text-center">
          <p className="font-extrabold text-2xl" style={{color: 'var(--purple-700)'}}>
            {loading ? '—' : data.completedCount}
          </p>
          <p className="text-xs" style={{color: 'var(--muted)'}}>Abgeschlossene Sessions</p>
        </div>
        <div className="stat-pill p-5 text-center">
          <p className="font-extrabold text-2xl" style={{color: 'var(--purple-700)'}}>
            {loading ? '—' : `${data.guthaben.toFixed(2)} €`}
          </p>
          <p className="text-xs" style={{color: 'var(--muted)'}}>Guthaben aktuell</p>
        </div>
        <div className="stat-pill p-5 text-center">
          <p className="font-extrabold text-2xl" style={{color: 'var(--purple-700)'}}>
            {loading ? '—' : `${data.availableHoursThisWeek} Std.`}
          </p>
          <p className="text-xs" style={{color: 'var(--muted)'}}>Diese Woche verfügbar</p>
        </div>
      </section>

      {/* Tiles grid */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <a href="/cleaner-availability" className="tile p-7 block">
          <div className="icon-circle mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </div>
          <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Meine Verfügbarkeit</p>
          <p className="text-sm" style={{color: 'var(--muted)'}}>Lege fest, wann du für Aufträge verfügbar bist.</p>
        </a>

        <a href="/cleaner-bookings" className="tile p-7 block">
          <div className="icon-circle mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>
          </div>
          <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Meine Buchungen</p>
          <p className="text-sm" style={{color: 'var(--muted)'}}>Bevorstehende und vergangene Aufträge ansehen.</p>
        </a>

        <a href="/cleaner-reviews" className="tile p-7 block">
          <div className="icon-circle mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
          </div>
          <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Meine Bewertungen</p>
          <p className="text-sm" style={{color: 'var(--muted)'}}>Feedback deiner Kunden einsehen.</p>
        </a>

        <a href="/cleaner-profile" className="tile p-7 block">
          <div className="icon-circle mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Mein Profil</p>
          <p className="text-sm" style={{color: 'var(--muted)'}}>Persönliche Daten, Status und Dokumente verwalten.</p>
        </a>

        <a href="/preferences" className="tile p-7 block">
          <div className="icon-circle mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
          </div>
          <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Kommunikationspräferenzen</p>
          <p className="text-sm" style={{color: 'var(--muted)'}}>Benachrichtigungen verwalten.</p>
        </a>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}