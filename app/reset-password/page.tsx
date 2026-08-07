// @ts-nocheck
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Ungültiger oder fehlender Link. Bitte fordere einen neuen Link an.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Ein Fehler ist aufgetreten.');
      return;
    }
    setSuccess(true);
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
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /><circle cx="12" cy="16" r="1.5" /></svg>
          </div>

          {success ? (
            <>
              <h1 className="text-2xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Passwort geändert!</h1>
              <p className="mb-8" style={{color: 'var(--muted)'}}>Dein Passwort wurde erfolgreich zurückgesetzt. Du kannst dich jetzt mit deinem neuen Passwort anmelden.</p>
              <button onClick={() => router.push('/login')} className="btn-gradient inline-flex text-white font-semibold px-8 py-3.5 rounded-xl">
                Zum Login
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold mb-3" style={{color: 'var(--purple-900)'}}>Neues Passwort festlegen</h1>
              <p className="mb-8" style={{color: 'var(--muted)'}}>Wähle ein sicheres neues Passwort für dein Konto.</p>

              {error && (
                <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 text-left mb-6">
                  <div className="field flex items-center gap-3 px-4 py-3.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Neues Passwort"
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
                  <div className="field flex items-center gap-3 px-4 py-3.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Passwort bestätigen"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-gradient block w-full text-white font-semibold py-3.5 rounded-xl">
                  {loading ? 'Wird gespeichert...' : 'Passwort speichern'}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}