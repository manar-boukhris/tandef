'use client';

import { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function LanguageSwitcher() {
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
    if (lang === current) return;
    if (lang === 'de') {
      document.cookie = 'googtrans=/de/de; path=/;';
    } else {
      document.cookie = `googtrans=/de/${lang}; path=/;`;
    }
    setCurrent(lang);
    window.location.reload();
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 p-1 rounded-full"
      style={{ background: '#EDE9F5' }}
    >
      {LANGUAGES.map(l => {
        const isActive = l.code === current;
        return (
          <button
            key={l.code}
            onClick={() => changeLanguage(l.code)}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: isActive ? 'var(--purple-700)' : 'transparent',
              color: isActive ? '#fff' : '#6B6478',
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}