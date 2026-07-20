import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "TANDEF – Trust. Cleanliness. Quality.",
  description: "TANDEF – Zuverlässige Reinigung, gebucht in wenigen Minuten.",
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
          .goog-te-banner-frame, .goog-te-gadget-icon { display: none !important; }
          body { top: 0 !important; }
          #google_translate_element { display: none; }
        `}</style>
      </head>
      <body className="bg-white">
        <div id="google_translate_element"></div>
        {children}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
        >{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'de', includedLanguages: 'de,en,fr,ar', autoDisplay: false },
              'google_translate_element'
            );
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