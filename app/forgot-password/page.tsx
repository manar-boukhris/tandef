// @ts-nocheck
'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Ein Fehler ist aufgetreten.');
      return;
    }
    setSent(true);
  }

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/sessions-bg.png');
          background-size:cover;background-position:top center;background-repeat:no-repeat;
          min-height:100vh;
        }
        .card{background:#fff;border-radius:24px;box-shadow:0 30px 60px -25px rgba(76,29,149,.25);}
        .field{background:#fff;border:1px solid #E7E2F2;border-radius:12px;transition:.15s ease;}
        .field:focus-within{border-color:var(--purple-600);}
        .field input{background:transparent;outline:none;width:100%;}
        .field input::placeholder{color:#B7B0C6;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-600));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .btn-gradient:disabled{opacity:.6;cursor:not-allowed;}
        .icon-badge{width:72px;height:72px;border-radius:9999px;background:var(--purple-50);display:flex;align-items:center;justify-content:center;}
      `}</style>

      <div className="page-bg flex items-center justify-center px-6 py-16">
        <div className="card w-full max-w-md p-8 md:p-10 text-center">

          <div className="icon-badge mx-auto mb-6">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          </div>

          {sent ? (
            <>
              <h1 className="text-2xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>E-Mail gesendet!</h1>
              <p className="mb-8" style={{color: 'var(--muted)'}}>
                Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir dir einen Link zum Zurücksetzen deines Passworts gesendet. Bitte prüfe dein Postfach (auch den Spam-Ordner).
              </p>
              <a href="/login" className="text-sm font-semibold underline" style={{color: 'var(--purple-700)'}}>Zurück zum Login</a>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Passwort vergessen?</h1>
              <p className="mb-8" style={{color: 'var(--muted)'}}>
                Kein Problem. Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen deines Passworts.
              </p>

              {error && (
                <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field flex items-center gap-3 px-4 py-3.5 mb-6 text-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                  <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-gradient block w-full text-white font-semibold py-3.5 rounded-xl mb-6">
                  {loading ? 'Wird gesendet...' : 'Link zum Zurücksetzen senden'}
                </button>
              </form>

              <a href="/login" className="text-sm font-semibold underline" style={{color: 'var(--purple-700)'}}>Zurück zum Login</a>
            </>
          )}

        </div>
      </div>
    </>
  );
}