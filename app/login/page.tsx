// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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
            --purple-900:#3B0A73;
            --purple-700:#5B21B6;
            --purple-600:#6D28D9;
            --purple-500:#7C3AED;
            --purple-100:#EDE9FE;
            --purple-50:#F5F3FF;
            --ink:#1F1339;
            --muted:#6B6478;
          }
          body{font-family:'Inter',sans-serif;color:var(--ink);}
          h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
          .page-bg{
            background-color:#F6F4FC;
            background-image:url('/images/sessions-bg.png');
            background-size:cover;
            background-position:top center;
            background-repeat:no-repeat;
          }
          .login-card{
            background:#fff;
            border-radius:24px;
            box-shadow:0 30px 60px -25px rgba(76,29,149,.25);
          }
          .field{
            background:#fff;
            border:1px solid #E7E2F2;
            border-radius:12px;
            transition:.15s ease;
          }
          .field:focus-within{
            border-color:var(--purple-600);
          }
          .field input{
            background:transparent;
            outline:none;
            width:100%;
          }
          .field input::placeholder{color:#B7B0C6;}
          .btn-gradient{
            background:linear-gradient(90deg,var(--purple-700),var(--purple-600));
            transition:.2s ease;
          }
          .btn-gradient:hover{filter:brightness(1.05);}
          .icon-badge{
            width:88px;height:88px;border-radius:9999px;
            background:var(--purple-50);
            display:flex;align-items:center;justify-content:center;
          }
          footer a:hover{opacity:.75;}
      `}</style>
      <div className="page-bg">

        {/* Header */}
        <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
            <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6.5 19a6 6 0 0111 0" /></svg>
                Login
              </a>
            </nav>
          </div>
        </header>

        {/* Login card */}
        <section className="relative flex justify-center px-6 py-16 md:py-24">
          <div className="login-card w-full max-w-md p-8 md:p-10 text-center">

            <div className="icon-badge mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.6">
                <path d="M12 21c0-5 3-8 3-12 0 4 3 5 3 8a3 3 0 01-6 4z" />
                <path d="M12 21c0-5-3-8-3-12 0 4-3 5-3 8a3 3 0 006 4z" />
                <path d="M12 21V9" />
                <path d="M12 9c0-4 2-6 2-8 0 2 2 3 2 6a4 4 0 01-4 4z" />
                <path d="M12 9c0-4-2-6-2-8 0 2-2 3-2 6a4 4 0 004 4z" />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Willkommen zurück!</h1>
            <p className="mb-8" style={{color: 'var(--muted)'}}>Melde dich an und verwalte dein Konto oder entdecke exklusive Vorteile.</p>

            {error && (
              <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 text-left">
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Passwort"
                    className="flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="shrink-0" onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.88 3.94M14.12 14.12a3 3 0 11-4.24-4.24" /><path d="M1 1l22 22" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right mt-3 mb-6">
                <a href="/forgot-password" className="text-sm font-semibold underline" style={{color: 'var(--purple-700)'}}>Passwort vergessen?</a>
              </div>

              <button type="submit" disabled={loading} className="btn-gradient block w-full text-white font-semibold py-3.5 rounded-xl mb-6 text-center">
                {loading ? 'Anmelden...' : 'Einloggen'}
              </button>
            </form>

            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
              Noch kein Konto?
              <a href="/register" className="font-semibold underline" style={{color: 'var(--purple-700)'}}>Ein Konto erstellen</a>
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 h-px" style={{background: '#EDE9F5'}}></span>
              <span className="text-sm" style={{color: 'var(--muted)'}}>Oder</span>
              <span className="flex-1 h-px" style={{background: '#EDE9F5'}}></span>
            </div>

            <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border font-semibold" style={{borderColor: '#E7E2F2', color: 'var(--ink)'}}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z" />
                <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.61H1.27A12 12 0 000 12c0 1.94.46 3.77 1.27 5.39z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 001.27 6.61L4.9 9.72C5.85 6.87 8.5 4.75 12 4.75z" />
              </svg>
              Weiter mit Google
            </button>

          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-white" style={{background: 'var(--purple-900)'}}>
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-1">
            <p className="mb-5" style={{color: '#D8CCEE'}}>Reinigungsdienste für ein sauberes Zuhause.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,.12)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.4a4.9 4.9 0 011.8 1.15 4.9 4.9 0 011.15 1.8c.16.4.35 1.2.4 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.4 2.4a4.9 4.9 0 01-1.15 1.8 4.9 4.9 0 01-1.8 1.15c-.4.16-1.2.35-2.4.4-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.4a4.9 4.9 0 01-1.8-1.15 4.9 4.9 0 01-1.15-1.8c-.16-.4-.35-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .4-2.4a4.9 4.9 0 011.15-1.8A4.9 4.9 0 015.6 2.75c.4-.16 1.2-.35 2.4-.4C9.3 2.2 9.7 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.77.07-1 .05-1.6.2-1.95.35a3.1 3.1 0 00-1.15.75 3.1 3.1 0 00-.75 1.15c-.14.35-.3.94-.35 1.95C3 9.28 3 9.65 3 12s0 3.52.07 4.77c.05 1 .2 1.6.35 1.95.15.4.35.75.75 1.15.4.4.74.6 1.15.75.35.14.94.3 1.95.35 1.25.06 1.62.07 4.77.07s3.52 0 4.77-.07c1-.05 1.6-.2 1.95-.35a3.1 3.1 0 001.15-.75c.4-.4.6-.74.75-1.15.14-.35.3-.94.35-1.95.06-1.25.07-1.62.07-4.77s0-3.52-.07-4.77c-.05-1-.2-1.6-.35-1.95a3.1 3.1 0 00-.75-1.15 3.1 3.1 0 00-1.15-.75c-.35-.14-.94-.3-1.95-.35C15.52 4 15.15 4 12 4zm0 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.8a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4zm5.7-2a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,.12)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.17H7.5v3.1h2.7V21h3.3z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,.12)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16.6 2h-3.1v13.4a2.7 2.7 0 11-2.1-2.63V9.5a5.9 5.9 0 103.1 5.18V8.3a7.4 7.4 0 004.1 1.25V6.4a4.3 4.3 0 01-2-4.4z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: 'rgba(255,255,255,.12)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9C7.3 19 12 19 12 19s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.6c0-1.8-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.85-5.4 2.85z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-4">Unser Unternehmen</p>
            <ul className="space-y-3 text-sm" style={{color: '#D8CCEE'}}>
              <li><a href="#">So funktioniert TANDEF</a></li>
              <li><a href="#">TANDEF Bewertungen</a></li>
              <li><a href="#">TANDEF Magazin</a></li>
              <li><a href="#">Karriere</a></li>
              <li><a href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-4">Für Kunden</p>
            <ul className="space-y-3 text-sm" style={{color: '#D8CCEE'}}>
              <li><a href="#">Haushaltshilfe</a></li>
              <li><a href="#">Reinigungskraft</a></li>
              <li><a href="#">Putzfrau</a></li>
              <li><a href="#">Geschenkgutschein</a></li>
              <li><a href="#">Hilfe &amp; Support</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-4">Für Reinigungskräfte</p>
            <ul className="space-y-3 text-sm" style={{color: '#D8CCEE'}}>
              <li><a href="#">TANDEF-Pro werden</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-4">Hilfe &amp; Kontakt</p>
            <ul className="space-y-3 text-sm" style={{color: '#D8CCEE'}}>
              <li><a href="#">FAQ / Casecenter</a></li>
              <li><a href="#">Kontaktiere uns</a></li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D8CCEE" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                info@tandef.de
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D8CCEE" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                030 555 748 20
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between border-t text-sm" style={{borderColor: 'rgba(255,255,255,.15)', color: '#C3B4E0'}}>
          <p>© 2024 TANDEF. Alle Rechte vorbehalten.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">Made with <span style={{color: '#A78BFA'}}>💜</span> in Germany</p>
        </div>
      </footer>
    </>
  );
}