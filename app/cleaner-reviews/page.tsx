// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

const AVATAR_COLORS = ['#EC7C9D', '#4E7FD1', '#4C9F70', '#B08A45', '#8B5CF6', '#F59E0B'];

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function stars(rating) {
  return '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
}

export default function CleanerReviewsPage() {
  const logout = useLogout('cleaner');
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "TANDEF – Meine Bewertungen";

    fetch('/api/cleaner/reviews')
      .then(res => res.json())
      .then(setData);

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
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .avatar{width:44px;height:44px;border-radius:9999px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:'Poppins',sans-serif;}
        .stars{color:#F5A623;letter-spacing:1px;}
        .review-card{background:#fff;border-radius:18px;border:1px solid #ECE8F5;}
        .rating-bar-track{background:#F0ECF8;border-radius:9999px;height:8px;flex:1;}
        .rating-bar-fill{background:var(--purple-600);border-radius:9999px;height:8px;}
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
                <a href="/cleaner-bookings">Meine Buchungen</a>
                <a href="/cleaner-reviews" className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Bewertungen</a>
                <a href="/cleaner-profile">Mein Profil</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-4">
        <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
          Cleaner-Bereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Bewertungen</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-2" style={{color: 'var(--purple-700)'}}>Meine Bewertungen</h1>
        <p style={{color: 'var(--muted)'}}>Das sagen deine Kunden über deine Arbeit.</p>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 pb-8">
        <div className="panel p-8 grid sm:grid-cols-3 gap-8 items-center">
          <div className="text-center sm:border-r" style={{borderColor: '#ECE8F5'}}>
            <p className="text-5xl font-extrabold" style={{color: 'var(--purple-700)'}}>
              {data ? data.avg.toFixed(1) : '—'}
            </p>
            <p className="stars text-lg mb-1">{stars(Math.round(data?.avg || 0))}</p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>{data?.total ?? 0} Bewertungen</p>
          </div>
          <div className="sm:col-span-2 space-y-2">
            {(data?.distribution || []).map((d) => (
              <div key={d.star} className="flex items-center gap-3 text-sm">
                <span style={{color: 'var(--muted)'}} className="w-10">{d.star} ★</span>
                <div className="rating-bar-track"><div className="rating-bar-fill" style={{width: `${d.pct}%`}}></div></div>
                <span style={{color: 'var(--muted)'}} className="w-8 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 pb-24 space-y-4">
        {data?.reviews?.length === 0 && (
          <p className="text-center" style={{color: 'var(--muted)'}}>Noch keine Bewertungen erhalten.</p>
        )}
        {(data?.reviews || []).map((r, i) => {
          const customerName = r.booking?.user?.name || 'Kunde';
          return (
            <div key={r.id} className="review-card p-6 flex gap-4">
              <div className="avatar" style={{background: AVATAR_COLORS[i % AVATAR_COLORS.length]}}>
                {initials(customerName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold" style={{color: 'var(--ink)'}}>{customerName}</p>
                  <p className="stars">{stars(r.rating)}</p>
                </div>
                <p className="text-xs mb-2" style={{color: 'var(--muted)'}}>
                  {new Date(r.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-sm" style={{color: 'var(--ink)'}}>{r.comment || '—'}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}