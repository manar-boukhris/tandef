import type { Metadata, Viewport } from "next";
import "./globals.css";
import ChatWidget from '@/components/ChatWidget';
import CookieConsent from '@/components/CookieConsent';
import GoogleTranslateGate from '@/components/GoogleTranslateGate';

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
             ET cache complètement la barre "This page has been translated..." */
          .goog-te-banner-frame,
          .goog-te-banner-frame.skiptranslate,
          iframe.goog-te-banner-frame,
          iframe.skiptranslate,
          .goog-te-gadget-icon,
          .goog-tooltip,
          .goog-tooltip:hover,
          .goog-text-highlight,
          #goog-gt-tt,
          .goog-te-balloon-frame,
          .goog-te-spinner-pos {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
          }
          #google_translate_element { display: none; }
          .goog-text-highlight { background: none !important; box-shadow: none !important; }

          html { overflow-x: hidden; }
          body {
            position: static !important;
            top: 0px !important;
            overflow-x: hidden;
            min-height: 100vh;
          }
          body > .skiptranslate { display: none !important; }
        `}</style>
      </head>
      <body className="bg-white">
        {children}
        <ChatWidget />
        <CookieConsent />
        <GoogleTranslateGate />
      </body>
    </html>
  );
}