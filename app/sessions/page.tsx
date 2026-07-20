// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/lib/useLogout';

function formatDate(d) {
  return new Date(d).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export default function SessionsPage() {
  const logout = useLogout('customer');
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [historyTab, setHistoryTab] = useState('completed');
  const [reviewingId, setReviewingId] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Meine Sessions";
    loadBookings();

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function loadBookings() {
    fetch('/api/customer/bookings')
      .then(res => res.json())
      .then(data => setBookings(Array.isArray(data) ? data : []));
  }

  async function submitReview(bookingId) {
    setSubmitting(true);
    const res = await fetch('/api/customer/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, rating: ratingValue, comment }),
    });
    setSubmitting(false);
    if (res.ok) {
      setReviewingId(null);
      setComment('');
      setRatingValue(5);
      loadBookings();
    }
  }

  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const completed = bookings.filter(b => b.status === 'completed');
  const cancelled = bookings.filter(b => b.status === 'cancelled');
  const nextUpcoming = upcoming[0] || null;
  const historyList = historyTab === 'completed' ? completed : cancelled;

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;
          --purple-700:#5B21B6;
          --purple-600:#6D28D9;
          --purple-500:#7C3AED;
          --purple-100:#EDE9FE;
          --purple-50:#F5F3FF;
          --ink:#1F1339;
          --muted:#6B6478;
        }
                          body{
  font-family:'Inter',sans-serif;
  color:var(--ink);
  background-color:#F6F4FC;
  background-image:url('/images/account-bg.png');
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  background-attachment:fixed;
  min-height:100vh;
}
        h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/sessions-bg.png');
          background-size:cover;
          background-position:top center;
          background-repeat:no-repeat;
          background-attachment:fixed;
        }
        .section-icon{
          width:40px;height:40px;border-radius:12px;
          background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;
        }
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .mini-card{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);}
        .icon-circle{width:52px;height:52px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-900),var(--purple-600));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.08);}
        .tab-active{color:var(--purple-700);border-bottom:2px solid var(--purple-700);}
        .tab-inactive{color:#B0A9C2;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .booking-row{background:#fff;border-radius:16px;border:1px solid #ECE8F5;}
        .status-pill{font-size:.7rem;font-weight:700;padding:.25rem .7rem;border-radius:9999px;}
        .status-completed{background:#E7F7EE;color:#15803D;}
        .status-cancelled{background:#FBE7E7;color:#C0392B;}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              Pro werden
            </a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              Magazin
            </a>
            <div id="user-menu-wrapper" className="relative">
              <button id="user-menu-btn" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                Konto
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions" className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Sessions</a>
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

      <section className="relative max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm mb-8" style={{color: 'var(--muted)'}}>
          Mein Kundenbereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Sessions</span>
        </p>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-8">

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </div>
            <h2 className="text-xl font-bold" style={{color: 'var(--ink)'}}>Bevorstehende Reinigungen</h2>
          </div>

          {upcoming.length === 0 ? (
            <div className="panel p-10 text-center mb-6">
              <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-full" style={{background: 'var(--purple-50)'}}>
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                  <rect x="15" y="24" width="80" height="72" rx="10" fill="#fff" stroke="#5B21B6" strokeWidth="3" />
                  <rect x="15" y="24" width="80" height="20" rx="10" fill="#5B21B6" />
                  <g fill="#EDE9FE"><rect x="27" y="54" width="12" height="12" rx="2" /><rect x="49" y="54" width="12" height="12" rx="2" /><rect x="71" y="54" width="12" height="12" rx="2" /><rect x="27" y="74" width="12" height="12" rx="2" /><rect x="49" y="74" width="12" height="12" rx="2" /></g>
                  <circle cx="78" cy="82" r="19" fill="#5B21B6" />
                  <path d="M70 82l6 6 12-12" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: 'var(--ink)'}}>Noch keine geplanten Reinigungen</h3>
              <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Sobald du eine Reinigung buchst, erscheint sie hier.</p>
              <a href="/address" className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2">
                <span>✦</span> Reinigung buchen
              </a>
            </div>
          ) : (
            <div className="panel p-6 mb-6 space-y-3">
              {upcoming.map(b => (
                <div key={b.id} className="booking-row p-5">
                  <div className="flex items-center gap-4">
                    <div className="icon-circle">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold" style={{color: 'var(--ink)'}}>
                        {b.serviceType}{b.cleaner?.user?.name ? ` – ${b.cleaner.user.name}` : ''}
                      </p>
                      <p className="text-sm" style={{color: 'var(--muted)'}}>{formatDate(b.date)} · {b.address}</p>

                      {b.offerStatus === 'pending' && (
                        <p className="text-xs font-semibold mt-1" style={{color: '#B7791F'}}>⏳ Warte auf Bestätigung der Reinigungskraft</p>
                      )}
                    </div>
                    <p className="font-extrabold" style={{color: 'var(--purple-700)'}}>{b.price} €</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mini-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 12h8M8 16h5" /></svg>
              </div>
              <div>
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Gesamte Buchungen</p>
                <p className="text-2xl font-extrabold" style={{color: 'var(--purple-700)'}}>{bookings.length}</p>
                <p className="text-xs" style={{color: 'var(--muted)'}}>Seit Kontoerstellung</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1010 4.6L3 8" /><path d="M12 8v5l3 2" /></svg>
            </div>
            <h2 className="text-xl font-bold" style={{color: 'var(--ink)'}}>Reinigungsverlauf</h2>
          </div>

          <div className="panel p-8 mb-6">
            <div className="flex gap-8 mb-8 border-b" style={{borderColor: '#EFEAF6'}}>
              <button
                onClick={() => setHistoryTab('completed')}
                className={`pb-3 font-semibold text-sm ${historyTab === 'completed' ? 'tab-active' : 'tab-inactive'}`}
              >
                Abgeschlossen
              </button>
              <button
                onClick={() => setHistoryTab('cancelled')}
                className={`pb-3 font-semibold text-sm ${historyTab === 'cancelled' ? 'tab-active' : 'tab-inactive'}`}
              >
                Storniert
              </button>
            </div>

            {historyList.length === 0 ? (
              <div className="text-center py-6">
                <div className="relative w-40 h-40 mx-auto mb-6 flex items-end justify-center">
                  <svg width="90" height="60" viewBox="0 0 90 60" className="absolute bottom-2">
                    <path d="M15 20h60l-8 32H23z" fill="#C9B7ED" />
                    <rect x="10" y="12" width="70" height="12" rx="4" fill="#B7A2E6" />
                    <path d="M38 24c0-6 4-10 8-10s6 4 6 10" fill="none" stroke="#8B6FD1" strokeWidth="2.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{color: 'var(--ink)'}}>
                  {historyTab === 'completed' ? 'Keine abgeschlossenen Reinigungen' : 'Keine stornierten Reinigungen'}
                </h3>
                <p className="text-sm" style={{color: 'var(--muted)'}}>Deine {historyTab === 'completed' ? 'abgeschlossenen' : 'stornierten'} Sessions erscheinen hier.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historyList.map(b => (
                  <div key={b.id} className="booking-row p-5">
                    <div className="flex items-center gap-4">
                      <div className="icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold" style={{color: 'var(--ink)'}}>{b.serviceType}</p>
                          <span className={`status-pill ${historyTab === 'completed' ? 'status-completed' : 'status-cancelled'}`}>
                            {historyTab === 'completed' ? 'Abgeschlossen' : 'Storniert'}
                          </span>
                        </div>
                        <p className="text-sm" style={{color: 'var(--muted)'}}>{formatDate(b.date)}</p>
                      </div>
                      <p className="font-extrabold" style={{color: historyTab === 'cancelled' ? 'var(--muted)' : 'var(--purple-700)'}}>
                        {historyTab === 'cancelled' ? '—' : `${b.price} €`}
                      </p>
                    </div>

                    {historyTab === 'completed' && (
                      <div className="mt-4">
                        {b.review ? (
                          <p className="text-sm" style={{color: 'var(--purple-700)'}}>
                            {'⭐'.repeat(b.review.rating)}{'☆'.repeat(5 - b.review.rating)} — Bereits bewertet
                          </p>
                        ) : reviewingId === b.id ? (
                          <div className="rounded-xl p-4" style={{background: 'var(--purple-50)'}}>
                            <p className="text-sm font-semibold mb-2" style={{color: 'var(--ink)'}}>
                              Wie war {b.cleaner?.user?.name || 'die Reinigungskraft'}?
                            </p>
                            <div className="flex gap-1 mb-3">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => setRatingValue(star)} className="text-2xl leading-none">
                                  {star <= ratingValue ? '⭐' : '☆'}
                                </button>
                              ))}
                            </div>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Dein Kommentar (optional)"
                              className="w-full rounded-lg border px-3 py-2 text-sm mb-3"
                              style={{borderColor: '#ECE8F5'}}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => submitReview(b.id)}
                                disabled={submitting}
                                className="btn-gradient text-white font-semibold text-sm px-5 py-2 rounded-full"
                              >
                                {submitting ? 'Wird gesendet...' : 'Bewertung senden'}
                              </button>
                              <button
                                onClick={() => setReviewingId(null)}
                                className="text-sm font-semibold px-5 py-2 rounded-full border"
                                style={{borderColor: '#ECE8F5', color: 'var(--muted)'}}
                              >
                                Abbrechen
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setReviewingId(b.id); setRatingValue(5); setComment(''); }}
                            className="text-sm font-semibold px-5 py-2 rounded-full"
                            style={{background: 'var(--purple-100)', color: 'var(--purple-700)'}}
                          >
                            ⭐ Reinigungskraft bewerten
                          </button>
                        )}
                      </div>
                    )}

                    {b.offerStatus === 'declined' && (
                      <button
                        onClick={() => router.push('/booking-cleaner?reassign=' + b.id)}
                        className="btn-gradient inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-full mt-3"
                      >
                        Andere Reinigungskraft wählen
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mini-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              </div>
              <div>
                <p className="font-semibold" style={{color: 'var(--ink)'}}>Nächste Reinigung</p>
                <p className="text-lg font-bold" style={{color: 'var(--purple-700)'}}>
                  {nextUpcoming ? formatDate(nextUpcoming.date) : 'Keine geplant'}
                </p>
                <p className="text-xs" style={{color: 'var(--muted)'}}>
                  {nextUpcoming ? nextUpcoming.serviceType : 'Buche eine Reinigung, um loszulegen'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}