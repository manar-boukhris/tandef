import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: "TANDEF – Trust. Cleanliness. Quality.",
  description: "TANDEF – Zuverlässige Reinigung, gebucht in wenigen Minuten.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          /* Empêche le widget Google Translate de casser la mise en page mobile
             (il injecte une iframe + un décalage inline sur <body>) */
          .goog-te-banner-frame, .goog-te-gadget-icon { display: none !important; }
          #google_translate_element { display: none; }

          html { overflow-x: hidden; }
          body {
            position: static !important;
            top: 0 !important;
            overflow-x: hidden;
            min-height: 100vh;
          }
          body > .skiptranslate { display: none !important; }
          iframe.goog-te-banner-frame { display: none !important; visibility: hidden !important; }
        `}</style>
      </head>
      <body className="bg-white">
        <div id="google_translate_element"></div>
        {children}
        <ChatWidget />
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
      </body>
    </html>
  );
}