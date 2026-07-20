// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

const STATUS_META = {
  upcoming: { label: 'Bevorstehend', pillClass: 'status-upcoming', iconBg: 'var(--purple-100)' },
  completed: { label: 'Abgeschlossen', pillClass: 'status-completed', iconBg: '#E7F7EE' },
  cancelled: { label: 'Storniert', pillClass: 'status-cancelled', iconBg: '#FBE7E7' },
};

function formatMeta(b) {
  const start = new Date(b.date);
  const end = new Date(start.getTime() + b.hours * 60 * 60 * 1000);
  const dateStr = start.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' });
  const startTime = start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const endTime = end.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} · ${startTime} – ${endTime} · ${b.address}`;
}

function StatusIcon({ status }) {
  if (status === 'completed') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>;
  }
  if (status === 'cancelled') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>;
  }
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}

export default function CleanerBookingsPage() {
  const logout = useLogout('cleaner');
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState('offers');
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    document.title = "TANDEF – Meine Buchungen";
    loadBookings();

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function loadBookings() {
    fetch('/api/cleaner/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }

  async function decide(bookingId, decision) {
    setBusyId(bookingId);
    await fetch('/api/cleaner/offers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, decision }),
    });
    await loadBookings();
    setBusyId(null);
  }

  async function markCompleted(bookingId) {
    setBusyId(bookingId);
    await fetch('/api/cleaner/bookings/complete', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId }),
    });
    await loadBookings();
    setBusyId(null);
  }

  const counts = {
    offers: bookings.filter(b => b.offerStatus === 'pending').length,
    upcoming: bookings.filter(b => b.status === 'upcoming' && b.offerStatus !== 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const filtered =
    tab === 'offers' ? bookings.filter(b => b.offerStatus === 'pending')
    : tab === 'upcoming' ? bookings.filter(b => b.status === 'upcoming' && b.offerStatus !== 'pending')
    : tab === 'completed' ? bookings.filter(b => b.status === 'completed')
    : bookings.filter(b => b.status === 'cancelled');

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
          
          .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
          .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
          .dropdown-menu a:hover{background:var(--purple-50);}
          .chat-bubble{
            position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
            background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
          }
          .tab{padding:.6rem 1.2rem;border-radius:9999px;font-size:.85rem;font-weight:700;color:var(--muted);cursor:pointer;position:relative;}
          .tab.active{background:var(--purple-700);color:#fff;}
          .icon-circle{width:48px;height:48px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .status-pill{font-size:.72rem;font-weight:700;padding:.3rem .8rem;border-radius:9999px;}
          .status-upcoming{background:var(--purple-100);color:var(--purple-700);}
          .status-completed{background:#E7F7EE;color:#15803D;}
          .status-cancelled{background:#FBE7E7;color:#C0392B;}
          .booking-row{background:#fff;border-radius:18px;border:1px solid #ECE8F5;}
          .btn-accept{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-accept:hover{filter:brightness(1.05);}
          .btn-decline{border:1.5px solid #ECE0E0;color:#C0392B;transition:.15s ease;}
          .btn-decline:hover{background:#FBE7E7;}
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
                <a href="/cleaner-availability">Meine Verfügbarkeit</a>
                <a href="/cleaner-bookings" className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Buchungen</a>
                <a href="/cleaner-reviews">Meine Bewertungen</a>
                <a href="/cleaner-profile">Mein Profil</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-4">
        <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
          Cleaner-Bereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Buchungen</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-2" style={{color: 'var(--purple-700)'}}>Meine Buchungen</h1>
        <p style={{color: 'var(--muted)'}}>Anfragen, bevorstehende und vergangene Aufträge im Überblick.</p>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 pb-24">

        <div className="flex gap-2 mb-6 flex-wrap">
          <span className={`tab ${tab === 'offers' ? 'active' : ''}`} onClick={() => setTab('offers')}>
            Anfragen ({counts.offers})
          </span>
          <span className={`tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>
            Bevorstehend ({counts.upcoming})
          </span>
          <span className={`tab ${tab === 'completed' ? 'active' : ''}`} onClick={() => setTab('completed')}>
            Abgeschlossen ({counts.completed})
          </span>
          <span className={`tab ${tab === 'cancelled' ? 'active' : ''}`} onClick={() => setTab('cancelled')}>
            Storniert ({counts.cancelled})
          </span>
        </div>

        <div className="space-y-4">
          {loading && <p style={{color: 'var(--muted)'}}>Wird geladen...</p>}
          {!loading && filtered.length === 0 && (
            <p style={{color: 'var(--muted)'}}>
              {tab === 'offers' ? 'Aktuell keine neuen Anfragen.' : 'Keine Buchungen in dieser Kategorie.'}
            </p>
          )}

          {filtered.map(b => {
            const isOffer = tab === 'offers';
            const meta = STATUS_META[b.status] || STATUS_META.upcoming;
            return (
              <div key={b.id} className="booking-row p-6">
                <div className="flex items-center gap-5">
                  <div className="icon-circle" style={{background: isOffer ? 'var(--purple-100)' : meta.iconBg}}>
                    {isOffer
                      ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      : <StatusIcon status={b.status} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold" style={{color: 'var(--ink)'}}>
                        {b.serviceType}{b.user?.name ? ` – ${b.user.name}` : ''}
                      </p>
                      {!isOffer && <span className={`status-pill ${meta.pillClass}`}>{meta.label}</span>}
                    </div>
                    <p className="text-sm" style={{color: 'var(--muted)'}}>{formatMeta(b)}</p>
                  </div>
                  <p className="font-extrabold" style={{color: b.status === 'cancelled' ? 'var(--muted)' : 'var(--purple-700)'}}>
                    {b.status === 'cancelled' ? '—' : `${b.price} €`}
                  </p>
                </div>

                {isOffer && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => decide(b.id, 'accepted')}
                      disabled={busyId === b.id}
                      className="btn-accept flex-1 text-white font-semibold py-3 rounded-xl"
                    >
                      {busyId === b.id ? '...' : 'Annehmen'}
                    </button>
                    <button
                      onClick={() => decide(b.id, 'declined')}
                      disabled={busyId === b.id}
                      className="btn-decline flex-1 font-semibold py-3 rounded-xl"
                    >
                      {busyId === b.id ? '...' : 'Ablehnen'}
                    </button>
                  </div>
                )}

                {tab === 'upcoming' && b.status === 'upcoming' && (
                  <div className="mt-4">
                    <button
                      onClick={() => markCompleted(b.id)}
                      disabled={busyId === b.id}
                      className="btn-accept inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl"
                    >
                      {busyId === b.id ? '...' : '✓ Als abgeschlossen markieren'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}