// @ts-nocheck
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get('role') === 'cleaner' ? 'cleaner' : null;

  const [role, setRole] = useState(roleFromUrl || 'customer');
  const [gender, setGender] = useState('herr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, gender, role, phone, address }),
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
            background:linear-gradient(135deg,#E9E4FB 0%,#EFE3F6 45%,#FBE7F0 100%);
          }
          .badge-rating{
            background:rgba(255,255,255,.75);
            backdrop-filter:blur(4px);
          }
          .feature-card{
            background:rgba(255,255,255,.85);
            border-radius:16px;
          }
          .feature-icon{
            width:48px;height:48px;border-radius:9999px;
            background:var(--purple-100);
            display:flex;align-items:center;justify-content:center;
          }
          .form-card{
            background:#fff;
            border-radius:24px;
            box-shadow:0 30px 60px -20px rgba(76,29,149,.25);
          }
          .field{
            background:#F7F6FA;
            border:1px solid #ECE9F3;
            border-radius:12px;
            transition:.15s ease;
          }
          .field:focus-within{
            border-color:var(--purple-600);
            background:#fff;
          }
          .field input, .field select{
            background:transparent;
            outline:none;
            width:100%;
          }
          .field input::placeholder{color:#9C96A8;}
          .btn-primary{
            background:linear-gradient(90deg,var(--purple-700),var(--purple-600));
            transition:.2s ease;
          }
          .btn-primary:hover{filter:brightness(1.05);}
          .progress-track{
            background:#E7E4EF;
            border-radius:9999px;
            height:6px;
          }
          .progress-fill{
            background:var(--purple-600);
            border-radius:9999px;
            height:6px;
            width:32%;
          }
          .radio-dot{
            width:18px;height:18px;border-radius:9999px;
            border:1.5px solid #C9C3D6;
            position:relative;
            transition:.15s ease;
          }
          .gender-option.selected .radio-dot{
            border-color:var(--purple-600);
          }
          .gender-option.selected .radio-dot::after{
            content:'';
            position:absolute;
            top:3px;left:3px;
            width:10px;height:10px;
            border-radius:9999px;
            background:var(--purple-600);
          }
          .date-input{
            color:var(--ink);
            font-family:'Inter',sans-serif;
            color-scheme:light;
          }
          .date-input::-webkit-calendar-picker-indicator{
            cursor:pointer;
            opacity:0.55;
          }
          .date-input:not([value]):before,
          .date-input[value=""]:before{
            color:#9C96A8;
          }
          .role-toggle{
            display:flex;gap:8px;background:#F0EDF9;padding:5px;border-radius:9999px;margin-bottom:24px;
          }
          .role-btn{
            flex:1;text-align:center;padding:.7rem 1rem;border-radius:9999px;font-weight:600;font-size:.9rem;
            cursor:pointer;transition:.2s ease;color:var(--muted);
          }
          .role-btn.active{
            background:linear-gradient(90deg,var(--purple-700),var(--purple-600));color:#fff;
          }
      `}</style>
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="flex items-center gap-8 text-sm font-medium" style={{color: 'var(--ink)'}}>
            <a href="#" className="flex flex-col items-center gap-1 hover:opacity-70">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1339" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Für Kunden
            </a>
            <a href="/login" className="flex flex-col items-center gap-1 hover:opacity-70">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1339" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-14 items-start">

        {/* Left column */}
        <div>
          <div className="badge-rating inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{color: 'var(--muted)'}}>
            Bewertung 4,9
            <span style={{color: 'var(--purple-700)'}}>★★★★★</span>
          </div>

          <h1 className="text-4xl md:text-[2.75rem] font-extrabold leading-tight mb-1" style={{color: 'var(--ink)'}}>
            Reinigungskunden in
          </h1>
          <h1 className="text-4xl md:text-[2.75rem] font-extrabold leading-tight mb-6" style={{color: 'var(--purple-600)'}}>
            deiner Nähe finden
          </h1>

          <p className="text-lg mb-10 max-w-md" style={{color: 'var(--muted)'}}>
            Zuverlässige Reinigungskräfte schnell und flexibel – genau dann, wenn du sie brauchst.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
            <div className="feature-card p-6">
              <div className="feature-icon mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Sicher &amp; geprüft</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Alle Helfer sind verifiziert und geprüft.</p>
            </div>
            <div className="feature-card p-6">
              <div className="feature-icon mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              </div>
              <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Schnell &amp; flexibel</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Buche in wenigen Minuten.</p>
            </div>
            <div className="feature-card p-6">
              <div className="feature-icon mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 3l2.6 5.6 6.2.9-4.5 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.2 9.5l6.2-.9L12 3z" /></svg>
              </div>
              <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Zufriedenheit garantiert</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>4,9/5 Sterne Bewertung durch Kunden.</p>
            </div>
            <div className="feature-card p-6">
              <div className="feature-icon mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M12 8v5M12 16v.01" /></svg>
              </div>
              <p className="font-bold mb-1" style={{color: 'var(--ink)'}}>Kostenlos &amp; unverbindlich</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Keine Gebühren, keine Verpflichtung.</p>
            </div>
          </div>
        </div>

        {/* Right column: form card */}
        <div className="form-card p-8 lg:p-10 lg:-mt-6">
          <div className="flex items-center gap-4 mb-8">
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="progress-track flex-1">
              <div className="progress-fill"></div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6" style={{color: 'var(--ink)'}}>Lernen wir uns kennen!</h2>

          <div className="role-toggle">
            <div
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              Ich suche Reinigung
            </div>
            <div
              className={`role-btn ${role === 'cleaner' ? 'active' : ''}`}
              onClick={() => setRole('cleaner')}
            >
              Ich möchte putzen
            </div>
          </div>

          {error && (
            <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-8 mb-6">
              <label
                className={`flex items-center gap-2 cursor-pointer gender-option ${gender === 'frau' ? 'selected' : ''}`}
                onClick={() => setGender('frau')}
              >
                <span className="radio-dot"></span>
                <span style={{color: 'var(--ink)'}}>Frau</span>
              </label>
              <label
                className={`flex items-center gap-2 cursor-pointer gender-option ${gender === 'herr' ? 'selected' : ''}`}
                onClick={() => setGender('herr')}
              >
                <span className="radio-dot"></span>
                <span style={{color: 'var(--ink)'}}>Herr</span>
              </label>
            </div>

            <div className="space-y-4">
              <div className="field flex items-center gap-3 px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                <input type="text" placeholder="Vorname" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                <input type="text" placeholder="Nachname" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
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
              <div className="field flex items-center gap-3 px-4 py-3">
                <span className="text-base leading-none">🇩🇪</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                <span className="w-px h-4 bg-gray-300"></span>
                <input type="tel" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="field flex items-center gap-3 px-4 py-3 cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                <input type="date" placeholder="Geburtsdatum" className="date-input" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-white font-semibold py-4 rounded-xl mt-8 inline-flex items-center justify-center">
              {loading ? 'Wird erstellt...' : 'Weiter'}
            </button>
          </form>
        </div>

      </section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}