// @ts-nocheck
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

type Suggestion = { label: string; street: string; city: string; zip: string };

export default function AddressPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentAddresses, setRecentAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = "TANDEF – Wo findet deine Reinigung statt?";

    const draft = getDraft();
    if (draft.address) setQuery(draft.address);

    try {
      const stored = JSON.parse(localStorage.getItem('recentAddresses') || '[]');
      setRecentAddresses(Array.isArray(stored) ? stored : []);
    } catch {
      setRecentAddresses([]);
    }

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    setShowSuggestions(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/address-autocomplete?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
      setLoading(false);
    }, 400); // debounce 400ms bash matabach request b kol harfa
  }

  function selectAddress(fullAddress: string) {
    setQuery(fullAddress);
    setShowSuggestions(false);
    setSuggestions([]);

    // Zid l "Kürzlich verwendete Adressen"
    const updated = [fullAddress, ...recentAddresses.filter(a => a !== fullAddress)].slice(0, 5);
    setRecentAddresses(updated);
    localStorage.setItem('recentAddresses', JSON.stringify(updated));
  }

  function handleNext() {
    if (!query.trim()) return;
    updateDraft({ address: query });
    router.push('/booking-service-type');
  }

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
  background-image:url('/images/sessions-bg.png');
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  background-attachment:fixed;
  min-height:100vh;
}
        h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
        
        .field-card{background:#fff;border-radius:16px;box-shadow:0 15px 40px -25px rgba(76,29,149,.25);}
        .field-card input{background:transparent;outline:none;width:100%;}
        .field-card input::placeholder{color:#B7B0C6;}
        .icon-circle{width:40px;height:40px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
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
        .suggestions-box{
          background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);
          margin-top:-24px;margin-bottom:24px;overflow:hidden;text-align:left;
        }
        .suggestion-item{padding:12px 20px;font-size:.9rem;color:var(--ink);cursor:pointer;border-bottom:1px solid #F2EEFA;}
        .suggestion-item:last-child{border-bottom:none;}
        .suggestion-item:hover{background:var(--purple-50);}
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
            <div id="user-menu-wrapper" className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </span>
                <span className="flex items-center gap-1">Konto
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
                <a href="#" className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="relative max-w-4xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a href="/sessions" className="flex items-center gap-2 font-semibold" style={{color: 'var(--purple-700)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Zurück
        </a>
      
      </div>

      <section className="relative max-w-3xl mx-auto px-6 pt-10 pb-24 text-center">

        <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{color: 'var(--purple-700)'}}>Wo findet deine Reinigung statt?</h1>

        <div className="flex items-start gap-3 text-left mb-8">
          <span className="text-2xl leading-none">🏠</span>
          <p style={{color: 'var(--muted)'}}>
            Bitte gib deine Adresse in folgender Reihenfolge an, damit wir eine Reinigungskraft in deiner Nähe finden: Straße und Hausnummer, Postleitzahl, Stadt.
          </p>
        </div>

        <div className="relative">
          <div className="field-card flex items-center gap-3 px-5 py-4 mb-1 text-left">
            <div className="icon-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <input
              type="text"
              placeholder="Deine vollständige Adresse"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
            />
            {loading && (
              <svg className="animate-spin shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /></svg>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-box">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => selectAddress(s.label)}
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8" />

        {recentAddresses.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-4 text-left">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              </div>
              <p className="font-semibold" style={{color: 'var(--ink)'}}>Kürzlich verwendete Adressen</p>
            </div>

            {recentAddresses.map((addr, i) => (
              <button
                key={i}
                onClick={() => selectAddress(addr)}
                className="field-card w-full flex items-center gap-3 px-5 py-4 mb-4 text-left hover:shadow-md transition"
              >
                <div className="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <span className="flex-1 text-sm" style={{color: 'var(--muted)'}}>{addr}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            ))}
          </>
        )}

        <button
          onClick={handleNext}
          disabled={!query.trim()}
          className="btn-gradient w-full text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          Preise ansehen
        </button>

        <p className="flex items-center justify-center gap-2 text-sm" style={{color: 'var(--muted)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
          Deine Daten sind sicher und werden vertraulich behandelt.
        </p>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}