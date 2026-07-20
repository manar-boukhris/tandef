// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    document.title = "TANDEF – Buchung bestätigt";

    fetch('/api/customer/bookings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBooking(data[0]); // el dernier booking (orderBy desc)
        }
      });

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

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
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .btn-outline{border:1.5px solid var(--purple-600);color:var(--purple-700);transition:.15s ease;}
        .btn-outline:hover{background:var(--purple-50);}
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

      <section className="relative flex justify-center px-6 py-16 md:py-20">
        <div className="panel w-full max-w-xl p-10 text-center">
          <div className="w-44 h-44 mx-auto mb-8 relative flex items-center justify-center rounded-full" style={{background: 'var(--purple-50)'}}>
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="55" r="44" fill="#5B21B6" />
              <path d="M36 56l13 13 26-28" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Buchung bestätigt!</h1>
          <p className="mb-8" style={{color: 'var(--muted)'}}>Deine Reinigung ist geplant. Wir haben dir eine Bestätigung per E-Mail geschickt.</p>

          {booking && (
            <div className="rounded-2xl p-6 mb-8 text-left space-y-4 text-sm" style={{background: 'var(--purple-50)'}}>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /></svg>
                <div>
                  <p className="font-semibold" style={{color: 'var(--ink)'}}>
                    {new Date(booking.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} · {new Date(booking.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
                  </p>
                  <p style={{color: 'var(--muted)'}}>{booking.hours} Stunden · {booking.serviceType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /></svg>
                <p style={{color: 'var(--muted)'}}>{booking.address}</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /></svg>
                <p style={{color: 'var(--muted)'}}>Gesamt: <span className="font-semibold" style={{color: 'var(--purple-700)'}}>{booking.price} €</span> – Zahlung nach der Reinigung</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/sessions" className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-full">Meine Sessions ansehen</a>
            <a href="/" className="btn-outline font-semibold px-8 py-3.5 rounded-full">Zur Startseite</a>
          </div>
        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}