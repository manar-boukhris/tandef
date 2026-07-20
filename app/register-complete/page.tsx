// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterCompletePage() {
  const router = useRouter();
  const [gender, setGender] = useState('herr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Konto vervollständigen";
  
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          const parts = data.name.split(' ');
          setFirstName(parts[0] || '');
          setLastName(parts.slice(1).join(' ') || '');
        }
        if (data.phone) setPhone(data.phone);
        if (data.address) setAddress(data.address);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/complete-profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, gender, phone, address }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Ein Fehler ist aufgetreten.');
      return;
    }
    router.push(data.redirect);
  }

  return (
    <>
      <style jsx global>{`
        :root{
            --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
            --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
          }
          body{font-family:'Inter',sans-serif;color:var(--ink);}
          h1,h2,h3{font-family:'Poppins',sans-serif;}
          .page-bg{
            background-color:#F6F4FC;
            background-image:url('/images/account-bg.png');
            background-size:cover;background-position:top center;background-repeat:no-repeat;
            background-attachment:fixed;min-height:100vh;
          }
          .field{
            background:#fff;border:1px solid #ECE9F3;border-radius:12px;
            box-shadow:0 8px 20px -14px rgba(76,29,149,.2);
            transition:.15s ease;
          }
          .field:focus-within{border-color:var(--purple-600);}
          .field input, .field select{background:transparent;outline:none;width:100%;}
          .field input::placeholder{color:#9C96A8;}
          .gender-toggle{
            background:#fff;border-radius:9999px;padding:5px;display:inline-flex;gap:4px;
            box-shadow:0 8px 20px -14px rgba(76,29,149,.2);
          }
          .gender-btn{
            border-radius:9999px;padding:.8rem 2rem;font-weight:600;transition:.2s ease;color:var(--purple-700);
            display:flex;align-items:center;gap:.5rem;cursor:pointer;
          }
          .gender-btn.active{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));color:#fff;}
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
          .social-icon{
            width:40px;height:40px;border-radius:9999px;border:1.5px solid #DCD3EE;
            display:flex;align-items:center;justify-content:center;color:var(--purple-700);transition:.15s ease;
          }
          .social-icon:hover{background:var(--purple-50);}
      `}</style>
      {/* Header */}
      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg flex items-center">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Pro werden
            </a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <a href="/login" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="relative max-w-xl mx-auto px-6 pt-16 pb-20">

        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-8" style={{color: 'var(--ink)'}}>
          Bitte überprüfen und vervollständigen Sie Ihre Angaben
        </h1>

        {error && (
          <p className="text-sm mb-4 font-medium text-center" style={{color: '#C0392B'}}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-8">
            <div className="gender-toggle">
              <span
                className={`gender-btn ${gender === 'frau' ? 'active' : ''}`}
                onClick={() => setGender('frau')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                Frau
              </span>
              <span
                className={`gender-btn ${gender === 'herr' ? 'active' : ''}`}
                onClick={() => setGender('herr')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                Herr
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="field flex items-center gap-3 px-4 py-3.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              <input type="text" placeholder="Vorname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>

            <div className="field flex items-center gap-3 px-4 py-3.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              <input type="text" placeholder="Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <div>
              <div className="field flex items-center gap-3 px-4 py-3.5">
                <button type="button" className="flex items-center gap-1 shrink-0">
                  <span className="text-base leading-none">🇩🇪</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <span className="w-px h-5 bg-gray-200"></span>
                <input type="tel" placeholder="Telefonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <p className="text-xs mt-2 px-1" style={{color: 'var(--purple-600)'}}>bereits mit einem Wecasa-Konto verknüpft muss ausgefüllt sein</p>
            </div>

            <div>
              <div className="field flex items-center gap-3 px-4 py-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <p className="text-xs mt-2 px-1" style={{color: 'var(--purple-600)'}}>muss ausgefüllt sein</p>
            </div>
          </div>

          <p className="text-sm mt-6" style={{color: 'var(--muted)'}}>
            Durch die Erstellung eines Kontos stimmen Sie den
            <a href="#" className="underline font-medium" style={{color: 'var(--ink)'}}>Allgemeine Nutzungsbedingungen von Wecasa</a>,
            und unserer <a href="#" className="underline font-medium" style={{color: 'var(--ink)'}}>Datenschutzrichtlinie</a> zu.
          </p>

          <button type="submit" disabled={loading} className="btn-gradient w-full text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2 mt-6">
            {loading ? 'Wird erstellt...' : 'Mein Konto erstellen'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{color: 'var(--ink)'}}>
          Schon registriert? <a href="/login" className="underline font-semibold" style={{color: 'var(--purple-700)'}}>Melden Sie sich hier an</a>
        </p>

      </section>

      {/* Footer */}
      <footer className="relative bg-white border-t" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-5 gap-8 text-sm">
          <div className="md:col-span-1">
            <p className="font-medium mb-5 max-w-[180px]" style={{color: 'var(--ink)'}}>Reinigungsdienste für ein sauberes Zuhause.</p>
            <div className="flex gap-3">
              <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg></a>
              <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-9h3l.5-4H13V6.5c0-1.2.3-2 2-2h2V1h-3c-3 0-4.5 1.7-4.5 4.5V9H8v4h2.5v9H13z" /></svg></a>
              <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a1 1 0 00-1-1h-1.7c-2.3 0-4.5 1.2-5.6 3.4-.5.9-.7 1.9-.7 3.1v2H7.2a1 1 0 00-1 1v2.9a1 1 0 001 1H10v7a1 1 0 001 1h3a1 1 0 001-1v-7h2a1 1 0 001-.9l.3-2.9a1 1 0 00-1-1.1h-2.3V8.6c0-.8.4-1.5 1.4-1.5H18a1 1 0 001-1V3z" /></svg></a>
              <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="4" /><path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" /></svg></a>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-700)'}}>Unser Unternehmen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/ueber-uns" className="hover:opacity-70">So funktioniert TANDEF</a></li>
              <li><a href="#" className="hover:opacity-70">TANDEF Bewertungen</a></li>
              <li><a href="/magazin" className="hover:opacity-70">TANDEF Magazin</a></li>
              <li><a href="/karriere" className="hover:opacity-70">Karriere</a></li>
              <li><a href="/kontakt" className="hover:opacity-70">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-700)'}}>Für Kunden</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/" className="hover:opacity-70">Haushaltshilfe</a></li>
              <li><a href="#" className="hover:opacity-70">Reinigungskraft</a></li>
              <li><a href="#" className="hover:opacity-70">Putzfrau</a></li>
              <li><a href="#" className="hover:opacity-70">Geschenkgutschein</a></li>
              <li><a href="#" className="hover:opacity-70">Hilfe &amp; Support</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-700)'}}>Für Reinigungskräfte</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/pro-werden" className="hover:opacity-70">TANDEF-Pro werden</a></li>
              <li><a href="#" className="hover:opacity-70">Vorteile</a></li>
              <li><a href="#" className="hover:opacity-70">Bewerbungsprozess</a></li>
              <li><a href="#" className="hover:opacity-70">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-700)'}}>Hilfebereich</p>
            <ul className="space-y-3" style={{color: 'var(--muted)'}}>
              <li><a href="#" className="hover:opacity-70">FAQ / Casacenter</a></li>
              <li><a href="#" className="hover:opacity-70">Kontaktiere uns</a></li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                <a href="mailto:info@tandef.de" className="hover:opacity-70">info@tandef.de</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                030 555 748 20
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs pb-8" style={{color: 'var(--muted)'}}>
          <span>© 2024 TANDEF. Alle Rechte vorbehalten.</span>
          <span>Made with ❤️ in Germany</span>
        </div>
      </footer>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}