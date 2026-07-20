// @ts-nocheck
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const AVATAR_COLORS = ['#EC7C9D', '#4C9F70', '#4E7FD1', '#B08A45', '#8B5CF6'];
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
function stars(rating) {
  return '★★★★★'.slice(0, Math.round(rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(rating));
}

function BookingCleanerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reassignBookingId = searchParams.get('reassign');

  const [cleaners, setCleaners] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Wähle deine Reinigungskraft";

    fetch('/api/booking/cleaners')
      .then(res => res.json())
      .then(data => setCleaners(Array.isArray(data) ? data : []));

    if (!reassignBookingId) {
      const draft = getDraft();
      if (draft.cleanerId) setSelectedId(draft.cleanerId);
    }

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  async function handleNext() {
    if (reassignBookingId) {
      setLoading(true);
      await fetch('/api/customer/bookings/reassign', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: Number(reassignBookingId), cleanerId: selectedId }),
      });
      setLoading(false);
      router.push('/sessions');
      return;
    }

    updateDraft({ cleanerId: selectedId || undefined });
    router.push('/checkout');
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
        .cleaner-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;}
        .cleaner-card:hover{border-color:#C9B8EC;}
        .cleaner-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .cleaner-card.selected .check-dot{background:var(--purple-600);border-color:var(--purple-600);}
        .check-dot{width:20px;height:20px;border-radius:9999px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;}
        .avatar{width:52px;height:52px;border-radius:9999px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:'Poppins',sans-serif;}
        .badge{background:var(--purple-100);color:var(--purple-700);font-size:.7rem;font-weight:700;padding:.25rem .6rem;border-radius:9999px;display:inline-flex;align-items:center;gap:4px;}
        .stars{color:#F5A623;letter-spacing:1px;}
        .tag{background:#F4F2F9;color:var(--muted);font-size:.72rem;padding:.25rem .6rem;border-radius:9999px;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:89%;}
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
        <a href={reassignBookingId ? '/sessions' : '/booking-pets'} className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <a href={reassignBookingId ? '/sessions' : '/booking-pets'} className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{color: 'var(--ink)'}}>
              {reassignBookingId ? 'Wähle eine andere Reinigungskraft' : 'Wähle deine Reinigungskraft'}
            </h1>
            <p className="mb-8" style={{color: 'var(--muted)'}}>Diese Pros sind in deiner Nähe verfügbar.</p>

            <div className="space-y-4">
              <div onClick={() => setSelectedId(null)} className={`cleaner-card p-6 flex items-center gap-5 ${selectedId === null ? 'selected' : ''}`}>
                <div className="avatar" style={{background: 'linear-gradient(135deg,var(--purple-700),var(--purple-500))'}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold" style={{color: 'var(--ink)'}}>Beste Verfügbarkeit</p>
                    <span className="badge">Empfohlen</span>
                  </div>
                  <p className="text-sm" style={{color: 'var(--muted)'}}>Wir wählen automatisch die bestbewertete verfügbare Reinigungskraft für dich aus.</p>
                </div>
                <span className="check-dot shrink-0">{selectedId === null && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}</span>
              </div>

              {cleaners.length === 0 && (
                <p className="text-center py-6" style={{color: 'var(--muted)'}}>Keine weiteren Reinigungskräfte verfügbar – kein Problem, "Beste Verfügbarkeit" reicht völlig.</p>
              )}

              {cleaners.map((c, i) => (
                <div key={c.id} onClick={() => setSelectedId(c.id)} className={`cleaner-card p-6 flex items-center gap-5 ${selectedId === c.id ? 'selected' : ''}`}>
                  <div className="avatar" style={{background: c.photoUrl ? 'transparent' : AVATAR_COLORS[i % AVATAR_COLORS.length], overflow: 'hidden'}}>
                    {c.photoUrl ? (
                      <img src={c.photoUrl} alt={c.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                      initials(c.name)
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>{c.name}</p>
                    <p className="text-sm flex items-center gap-1 mb-2">
                      <span className="stars">{stars(c.rating)}</span>
                      <span style={{color: 'var(--muted)'}}>{c.rating.toFixed(1)} ({c.reviewCount} Bewertungen)</span>
                    </p>
                  </div>
                  <span className="check-dot shrink-0">{selectedId === c.id && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sidebar-card p-7 sticky top-6">
              <h3 className="font-bold text-lg mb-4" style={{color: 'var(--ink)'}}>
                {reassignBookingId ? 'Neue Reinigungskraft' : 'Mein Warenkorb'}
              </h3>
              <p className="text-sm" style={{color: 'var(--muted)'}}>
                {reassignBookingId
                  ? 'Deine bestehende Buchung bleibt gleich — nur die Reinigungskraft wird ausgetauscht.'
                  : 'Deine Auswahl wird im nächsten Schritt zusammengefasst.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={handleNext} disabled={loading} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
            {loading ? 'Wird gespeichert...' : 'Weiter'}
            {!loading && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
          </button>
        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}

export default function BookingCleanerPage() {
  return (
    <Suspense fallback={null}>
      <BookingCleanerInner />
    </Suspense>
  );
}