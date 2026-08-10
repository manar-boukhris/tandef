// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Login";
    const menuBtn = document.getElementById('about-menu-btn');
    const menu = document.getElementById('about-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, expectedRole: 'customer' }),
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
        h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/sessions-bg.png');
          background-size:cover;background-position:top center;background-repeat:no-repeat;
        }
        .login-card{background:#fff;border-radius:24px;box-shadow:0 30px 60px -25px rgba(76,29,149,.25);}
        .field{background:#fff;border:1px solid #E7E2F2;border-radius:12px;transition:.15s ease;}
        .field:focus-within{border-color:var(--purple-600);}
        .field input{background:transparent;outline:none;width:100%;}
        .field input::placeholder{color:#B7B0C6;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-600));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .icon-badge{width:88px;height:88px;border-radius:9999px;background:var(--purple-50);display:flex;align-items:center;justify-content:center;padding:20px;}
        .icon-badge img{width:100%;height:100%;object-fit:contain;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .social-icon{width:36px;height:36px;border-radius:9999px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;transition:.15s ease;}
        .social-icon:hover{background:rgba(255,255,255,.25);}
        .footer-dark{background:linear-gradient(to bottom,var(--purple-700),var(--purple-900));}
        footer a:hover{opacity:.75;}
      `}</style>

      <div className="page-bg">
        <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
            <a href="/" className="flex items-center">
              <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
              <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                Pro werden
              </a>
              <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
                Magazin
              </a>
              <div className="relative">
                <button id="about-menu-btn" className="flex items-center gap-1.5" style={{color: 'var(--purple-700)'}}>
                  Über uns
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div id="about-menu" className="dropdown-menu hidden absolute left-0 mt-3 w-56 py-2 z-30">
                  <a href="/ueber-uns">Über uns</a>
                  <a href="/unser-team">Unser Team</a>
                  <a href="/karriere">Karriere</a>
                  <a href="/kontakt">Kontakt</a>
                </div>
              </div>
              <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                Login
              </a>
            </nav>
            <button className="md:hidden flex items-center justify-center w-10 h-10" onClick={() => setMobileMenuOpen(v => !v)} style={{color: 'var(--purple-700)'}}>
              {mobileMenuOpen
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              }
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-1 text-sm font-medium" style={{borderColor: '#EDE9F5', color: 'var(--ink)'}}>
              <a href="/pro-werden" className="py-3">Pro werden</a>
              <a href="/magazin" className="py-3">Magazin</a>
              <a href="/ueber-uns" className="py-3">Über uns</a>
              <a href="/login" className="py-3">Login</a>
            </nav>
          )}
        </header>

        <section className="relative flex justify-center px-6 py-16 md:py-24">
          <div className="login-card w-full max-w-md p-8 md:p-10 text-center">

            <div className="icon-badge mx-auto mb-6">
              <img src="/images/logo-leaf.png" alt="TANDEF" />
            </div>

            <h1 className="text-3xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Willkommen zurück!</h1>
            <p className="mb-8" style={{color: 'var(--muted)'}}>Melde dich an und verwalte dein Konto.</p>

            {error && <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 text-left">
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                  <input type="email" placeholder="E-Mail-Adresse" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Passwort" className="flex-1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="shrink-0" onClick={() => setShowPassword(v => !v)}>
                    {showPassword
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.6 21.6 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 7 11 7a21.6 21.6 0 01-2.88 3.94M14.12 14.12a3 3 0 11-4.24-4.24" /><path d="M1 1l22 22" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                    }
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

            <p className="text-sm mb-3" style={{color: 'var(--muted)'}}>
              Noch kein Konto?{' '}
              <a href="/register" className="font-semibold underline" style={{color: 'var(--purple-700)'}}>Ein Konto erstellen</a>
            </p>
            <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
              Bist du Reinigungskraft?{' '}
              <a href="/cleaner-login" className="font-semibold underline" style={{color: 'var(--purple-700)'}}>Reinigungskraft Login</a>
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
    </>
  );
}