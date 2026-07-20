'use client';

import { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('de');

  useEffect(() => {
    const cookie = getCookie('googtrans'); // format: /de/en
    if (cookie) {
      const parts = cookie.split('/');
      const lang = parts[parts.length - 1];
      if (lang) setCurrent(lang);
    }
  }, []);

  function changeLanguage(lang: string) {
    if (lang === 'de') {
      document.cookie = 'googtrans=/de/de; path=/;';
    } else {
      document.cookie = `googtrans=/de/${lang}; path=/;`;
    }
    setOpen(false);
    window.location.reload();
  }

  const currentLang = LANGUAGES.find(l => l.code === current) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70"
        style={{ color: 'var(--purple-700)' }}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 mt-3 w-40 py-2 z-40 bg-white rounded-xl"
            style={{ boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)' }}
          >
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:opacity-70"
                style={{ color: '#1F1339', background: l.code === current ? '#F5F3FF' : 'transparent' }}
              >
                <span className="text-base leading-none">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}