// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminStyles from '../AdminStyles';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Zugangsdaten ungültig.');
      return;
    }
    router.push(data.redirect);
  }

  return (
    <>
      <AdminStyles />
      <style jsx global>{`
        body{background:radial-gradient(ellipse 700px 420px at 85% -10%, rgba(108,76,224,.14), transparent 60%), var(--paper);}
          .login-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
          .login-card{background:#fff;border:1px solid var(--line);border-radius:20px;padding:40px;width:100%;max-width:420px;box-shadow:0 30px 60px -30px rgba(44,27,107,.25);}
          .brand-row{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;color:var(--violet-700);font-family:'Space Grotesk',sans-serif;margin-bottom:6px;}
          .brand-row svg{width:30px;height:30px;}
          .field{margin-bottom:16px;}
          .field label{display:block;font-size:12.5px;font-weight:700;color:var(--ink);margin-bottom:6px;}
          .field input{
            width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--line);
            font-family:inherit;font-size:14px;outline:none;transition:.15s ease;
          }
          .field input:focus{border-color:var(--violet-500);}
          .login-btn{
            width:100%;padding:13px;border-radius:10px;background:var(--violet-700);color:#fff;
            font-weight:700;font-size:14px;border:none;cursor:pointer;margin-top:6px;
            box-shadow:0 10px 24px -8px rgba(75,47,176,.5);transition:transform .15s ease;
          }
          .login-btn:hover{transform:translateY(-2px);}
          .notice{background:var(--lavender-50);border:1px solid var(--line);border-radius:10px;padding:12px 14px;font-size:12.5px;color:var(--ink-soft);margin-bottom:20px;}
      `}</style>
      <div className="login-shell">
        <div className="login-card">
          <div className="brand-row">
            <svg viewBox="0 0 100 100"><path fill="#A895F0" d="M50 5 C60 25 60 45 50 55 C40 45 40 25 50 5Z" /><path fill="#6C4CE0" d="M50 55 C35 50 20 38 15 22 C35 20 48 32 50 55Z" /><path fill="#A895F0" d="M50 55 C65 50 80 38 85 22 C65 20 52 32 50 55Z" /></svg>
            TANDEF
          </div>
          <p className="display" style={{fontSize: '22px', fontWeight: '700', color: 'var(--violet-900)', marginBottom: '6px'}}>Admin-Bereich</p>
          <p style={{fontSize: '13.5px', color: 'var(--ink-soft)', marginBottom: '24px'}}>Melde dich an, um das Verwaltungspanel zu öffnen.</p>

          <div className="notice">🔒 Dieser Bereich ist ausschließlich für autorisiertes TANDEF-Personal bestimmt.</div>

          {error && (
            <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>E-Mail-Adresse</label>
              <input
                type="email"
                placeholder="name@tandef.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Passwort</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Anmelden...' : 'Anmelden'}
            </button>
          </form>

          <p style={{textAlign: 'center', fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '18px'}}>
            <a href="#" style={{color: 'var(--violet-700)', fontWeight: '700'}}>Passwort vergessen?</a>
          </p>
          <p style={{textAlign: 'center', fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '24px'}}>
            <a href="/" style={{color: 'var(--ink-soft)'}}>← Zurück zur Website</a>
          </p>
        </div>
      </div>
    </>
  );
}