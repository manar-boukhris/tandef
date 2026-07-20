// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

export default function DashboardPage() {
  const logout = useLogout('customer');
  const [data, setData] = useState<any>(null);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    document.title = "TANDEF – Mein Kundenbereich";
  
    fetch('/api/customer/dashboard')
      .then(res => res.json())
      .then(setData);
  
    fetch('/api/customer/account')
      .then(res => res.json())
      .then(data => setUserName(data.name || ''));
  
    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  
    const aboutBtn = document.getElementById('about-menu-btn');
    const aboutMenu = document.getElementById('about-menu');
    if (aboutBtn && aboutMenu) {
      aboutBtn.addEventListener('click', (e) => { e.stopPropagation(); aboutMenu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!aboutMenu.contains(e.target)) aboutMenu.classList.add('hidden'); });
    }
  }, []);
  const firstName = data?.name?.split(' ')[0] || '';

  const nextSessionText = data?.nextBooking
    ? data.nextBooking.serviceType
    : 'Haushaltshilfe';

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
        
        .tile{
          background:#fff;border-radius:20px;
          box-shadow:0 20px 50px -30px rgba(76,29,149,.2);
          transition:.2s ease;
        }
        .tile:hover{
          transform:translateY(-3px);
          box-shadow:0 25px 55px -25px rgba(76,29,149,.35);
        }
        .icon-circle{
          width:52px;height:52px;border-radius:9999px;background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
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
        .arrow-btn{
          width:38px;height:38px;border-radius:9999px;background:#fff;display:flex;align-items:center;justify-content:center;
          color:var(--purple-700);
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

  {/* ⭐ jdid: Über uns dropdown */}
  <div className="relative">
  <button id="about-menu-btn" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
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

  <div className="relative">
    <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
      <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
      </span>
      <span className="flex items-center gap-1">
        {userName ? userName.split(' ')[0] : 'Konto'}
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
      <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
    </div>
  </div>
</nav>
        </div>
      </header>

      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          <div className="lg:col-span-1">
            <h1 className="text-5xl font-extrabold mb-4 flex items-center gap-2" style={{color: 'var(--purple-700)'}}>
              {data ? `Hallo ${firstName}!` : 'Hallöchen!'}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#C9B8EC"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
            </h1>
            <p className="mb-7" style={{color: 'var(--muted)'}}>Schön, dass du wieder da bist.</p>
            <a href="/address" className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2">
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
  Neue Reinigung buchen
</a>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">

            <a href="/sessions" className="tile p-5 flex items-center gap-4">
              <span className="icon-circle" style={{background: 'var(--purple-100)'}}>
                <svg width="30" height="30" viewBox="0 0 40 40">
                  <ellipse cx="20" cy="34" rx="9" ry="2.5" fill="#DCCFF3" />
                  <path d="M11 32V20a9 9 0 0118 0v12a2 2 0 01-2 2H13a2 2 0 01-2-2z" fill="#8B6EC7" />
                  <circle cx="16" cy="20" r="2.4" fill="#fff" />
                  <circle cx="24" cy="20" r="2.4" fill="#fff" />
                  <circle cx="16" cy="20.8" r="1.1" fill="#3B0A73" />
                  <circle cx="24" cy="20.8" r="1.1" fill="#3B0A73" />
                  <path d="M17 25.5q3 2 6 0" stroke="#3B0A73" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  <path d="M20 11 L20 6" stroke="#8B6EC7" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 3l1 2.4-2.4.8 2.4.8-1 2.4-1-2.4-2.4-.8 2.4-.8z" fill="#F5C453" />
                  <path d="M11 24 L5 20" stroke="#8B6EC7" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="4" cy="19" r="2.6" fill="#8B6EC7" />
                  <rect x="7" y="32" width="5" height="5" rx="2" fill="#6D28D9" />
                  <rect x="16" y="33" width="5" height="4" rx="2" fill="#6D28D9" />
                  <rect x="24" y="33" width="5" height="4" rx="2" fill="#6D28D9" />
                </svg>
              </span>
              <p className="font-bold flex-1" style={{color: 'var(--ink)'}}>Meine Sessions</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>

            <a href="/invoices" className="tile p-5 flex items-center gap-4">
              <span className="icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              </span>
              <p className="font-bold flex-1" style={{color: 'var(--ink)'}}>Historie und Rechnungen</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>

            <a href="/account" className="tile p-5 flex items-center gap-4">
              <span className="icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              </span>
              <p className="font-bold flex-1" style={{color: 'var(--ink)'}}>Mein Profil</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>

            <a href="/preferences" className="tile p-5 flex items-center gap-4">
              <span className="icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
              </span>
              <p className="font-bold flex-1" style={{color: 'var(--ink)'}}>Meine Kommunikationspräferenzen</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>

            <a href="/payment-methods" className="tile p-5 flex items-center gap-4">
              <span className="icon-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
              </span>
              <p className="font-bold flex-1" style={{color: 'var(--ink)'}}>Zahlungsmethoden</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </a>

          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-5" style={{color: 'var(--ink)'}}>
          {data?.nextBooking ? 'Deine nächste Session' : 'Noch keine Session geplant'}
        </h2>
        <a href="/sessions" className="tile p-2 block max-w-md overflow-hidden">
          <div className="rounded-2xl p-6 relative overflow-hidden" style={{background: 'linear-gradient(135deg,#B8A0EA,#8B6EC7)', minHeight: '190px'}}>
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" className="absolute -right-2 -bottom-2"><path d="M8 3a4 4 0 00-4 4v3a4 4 0 004 4h1l7 6v-6a4 4 0 004-4V7a4 4 0 00-4-4H8z" /></svg>
            <p className="text-white font-extrabold text-xl mb-1">{nextSessionText}</p>
            <p className="text-sm mb-10" style={{color: '#EDE4FA'}}>
              {data?.nextBooking
                ? new Date(data.nextBooking.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })
                : 'Buche jetzt deine erste Reinigung'}
            </p>
            <span className="arrow-btn absolute left-6 bottom-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </a>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}