'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function GoogleTranslateGate() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Ne charge/n'active Google Translate que sur les pages publiques du site,
  // pas sur l'admin (évite les conflits DOM "removeChild" avec React).
  if (isAdmin) return null;

  return (
    <>
      <div id="google_translate_element"></div>
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
      >{`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement(
            { pageLanguage: 'de', includedLanguages: 'de,en,fr,ar', autoDisplay: false },
            'google_translate_element'
          );
          const resetBodyPosition = () => {
            document.body.style.position = 'static';
            document.body.style.top = '0px';
          };
          const observer = new MutationObserver(resetBodyPosition);
          observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
        }
      `}</Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}