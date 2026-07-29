// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

export default function LegalLayout({ title, updated, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = `TANDEF – ${title}`;
    const menuBtn = document.getElementById('about-menu-btn');
    const menu = document.getElementById('about-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, [title]);

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .btn-primary{background:var(--purple-700);transition:.2s ease;}
        .btn-primary:hover{background:var(--purple-900);}
        .dropdown-menu a{display:block;padding:.6rem 1.25rem;font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .legal-panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);}
        .legal-content h2{
          font-size:1.25rem;font-weight:700;color:var(--purple-700);
          margin-top:2.25rem;margin-bottom:.75rem;padding-top:1.5rem;border-top:1px solid #EDE9F5;
        }
        .legal-content h2:first-child{margin-top:0;padding-top:0;border-top:none;}
        .legal-content h3{font-size:1.05rem;font-weight:700;color:var(--ink);margin-top:1.5rem;margin-bottom:.5rem;}
        .legal-content p{color:var(--muted);line-height:1.7;margin-bottom:.9rem;}
        .legal-content ul{color:var(--muted);line-height:1.7;margin:.5rem 0 1rem 0;padding-left:1.25rem;list-style:disc;}
        .legal-content li{margin-bottom:.35rem;}
        .legal-content strong{color:var(--ink);}
        .legal-content a{color:var(--purple-700);text-decoration:underline;}
        .legal-sidebar a{display:block;padding:.5rem .75rem;border-radius:8px;font-size:.85rem;color:var(--muted);}
        .legal-sidebar a:hover{background:var(--purple-50);color:var(--purple-700);}
      `}</style>

      {/* Header */}
      <header className="bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
            <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Für Helfer
            </a>
            <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="about-menu-btn" className="flex items-center gap-1.5 hover:opacity-70">
                Über uns
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div id="about-menu" className="dropdown-menu hidden absolute left-0 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
                <a href="/ueber-uns" style={{color: 'var(--ink)'}}>Über uns</a>
                <a href="/unser-team" style={{color: 'var(--ink)'}}>Unser Team</a>
                <a href="/karriere" style={{color: 'var(--ink)'}}>Karriere</a>
                <a href="/kontakt" style={{color: 'var(--ink)'}}>Kontakt</a>
              </div>
            </div>
            <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/address" className="hidden md:inline-flex btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full items-center gap-2">
              Reinigung buchen
            </a>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Menü öffnen"
              style={{color: 'var(--purple-700)'}}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-1 text-sm font-medium" style={{borderColor: '#EDE9F5', color: 'var(--ink)'}}>
            <a href="/pro-werden" className="py-3">Für Helfer</a>
            <a href="/magazin" className="py-3">Magazin</a>
            <a href="/ueber-uns" className="py-3">Über uns</a>
            <a href="/karriere" className="py-3">Karriere</a>
            <a href="/kontakt" className="py-3">Kontakt</a>
            <a href="/login" className="py-3">Login</a>
            <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2">Reinigung buchen</a>
          </nav>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm" style={{color: 'var(--muted)'}}>
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> {title}
      </div>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{color: 'var(--purple-900)'}}>{title}</h1>
        {updated && <p className="text-sm mb-8" style={{color: 'var(--muted)'}}>{updated}</p>}

        <div className="legal-panel p-6 md:p-10 legal-content">
          {children}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Zuverlässige Reinigung in Deutschland – für Zuhause und Unternehmen.</p>
            <div className="flex gap-3 mt-5" style={{color: 'var(--purple-700)'}}>
              <span>f</span><span>◎</span><span>w</span><span>✉</span>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Leistungen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/wohnungsreinigung" className="hover:opacity-70">Wohnungsreinigung</a></li>
              <li><a href="/bueroreinigung" className="hover:opacity-70">Büroreinigung</a></li>
              <li><a href="/umzugsreinigung" className="hover:opacity-70">Umzugsreinigung</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Unternehmen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/ueber-uns" className="hover:opacity-70">Über uns</a></li>
              <li><a href="/unser-team" className="hover:opacity-70">Unser Team</a></li>
              <li><a href="/karriere" className="hover:opacity-70">Karriere</a></li>
              <li><a href="/kontakt" className="hover:opacity-70">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Rechtliches</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/agb" className="hover:opacity-70">AGB</a></li>
              <li><a href="/datenschutz" className="hover:opacity-70">Datenschutz</a></li>
              <li><a href="/impressum" className="hover:opacity-70">Impressum</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Kontakt</p>
            <ul className="space-y-3" style={{color: 'var(--muted)'}}>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                +49 (0) 221 12345678
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                info@tandef.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Deutschland
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs pb-8" style={{color: 'var(--muted)'}}>© 2026 Tandef. Alle Rechte vorbehalten.</div>
      </footer>
    </>
  );
}