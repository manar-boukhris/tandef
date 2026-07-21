// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';

const ALL_SERVICES = ['Haushaltsreinigung', 'Grundreinigung', 'Fensterputzen', 'Bügeln', 'Umzugsreinigung', 'Büroreinigung'];

export default function CleanerOnboardingPage() {
  const router = useRouter();
  const [services, setServices] = useState(['Haushaltsreinigung']);
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('Erfahrung: 1–3 Jahre');
  const [iban, setIban] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [idDoc, setIdDoc] = useState(null);
  const [addressDoc, setAddressDoc] = useState(null);
  const [criminalDoc, setCriminalDoc] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function toggleService(s) {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!idDoc || !addressDoc || !criminalDoc) {
      setError('Bitte lade alle 3 Dokumente hoch.');
      return;
    }

    setLoading(true);

    try {
      const idBlob = await upload(`cleaner-docs/id-${Date.now()}-${idDoc.name}`, idDoc, {
        access: 'public',
        handleUploadUrl: '/api/cleaner/upload-token',
      });
      const addressBlob = await upload(`cleaner-docs/address-${Date.now()}-${addressDoc.name}`, addressDoc, {
        access: 'public',
        handleUploadUrl: '/api/cleaner/upload-token',
      });
      const criminalBlob = await upload(`cleaner-docs/criminal-${Date.now()}-${criminalDoc.name}`, criminalDoc, {
        access: 'public',
        handleUploadUrl: '/api/cleaner/upload-token',
      });

      let photoUrl = null;
      if (photo) {
        const photoBlob = await upload(`cleaner-docs/profile-${Date.now()}-${photo.name}`, photo, {
          access: 'public',
          handleUploadUrl: '/api/cleaner/upload-token',
        });
        photoUrl = photoBlob.url;
      }

      const res = await fetch('/api/cleaner/upload-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUrl: idBlob.url,
          idName: idDoc.name,
          addressUrl: addressBlob.url,
          addressName: addressDoc.name,
          criminalUrl: criminalBlob.url,
          criminalName: criminalDoc.name,
          photoUrl,
          city,
          experience,
          services: JSON.stringify(services),
          iban,
          accountHolder,
        }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
        return;
      }
      router.push(data.redirect);
    } catch (err) {
      setLoading(false);
      setError('Fehler beim Hochladen. Bitte versuche es erneut.');
    }
  }

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/account-bg.png');
          background-size:cover;background-position:top center;background-repeat:no-repeat;
          background-attachment:fixed;min-height:100vh;
        }
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .field{
          background:#fff;border:1px solid #ECE9F3;border-radius:12px;
          box-shadow:0 8px 20px -14px rgba(76,29,149,.2);transition:.15s ease;
        }
        .field:focus-within{border-color:var(--purple-600);}
        .field input, .field select{background:transparent;outline:none;width:100%;}
        .field input::placeholder{color:#9C96A8;}
        .step-pill{
          width:30px;height:30px;border-radius:9999px;background:var(--purple-700);color:#fff;
          display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0;
        }
        .chip{
          border:1.5px solid #ECE8F5;border-radius:9999px;padding:.55rem 1.1rem;font-size:.85rem;font-weight:600;
          color:var(--muted);cursor:pointer;transition:.15s ease;display:inline-flex;align-items:center;gap:.4rem;
        }
        .chip.selected{border-color:var(--purple-600);background:var(--purple-50);color:var(--purple-700);}
        .dropzone{
          border:2px dashed #D9CFEF;border-radius:16px;padding:1.5rem;text-align:center;cursor:pointer;
          transition:.15s ease;background:#FBFAFE;
        }
        .dropzone:hover{border-color:var(--purple-600);background:var(--purple-50);}
        .dropzone.has-file{border-style:solid;border-color:var(--purple-600);background:var(--purple-50);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .icon-circle{
          width:40px;height:40px;border-radius:9999px;background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
      `}</style>

      <div className="page-bg">
        <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
            <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
            <p className="text-sm font-medium" style={{color: 'var(--muted)'}}>Registrierung als Reinigungskraft</p>
          </div>
        </header>

        <section className="relative max-w-3xl mx-auto px-6 pt-12 pb-24">

          <div className="flex items-center gap-3 mb-3">
            <span className="step-pill">2</span>
            <p className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>Schritt 2 von 2</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{color: 'var(--ink)'}}>Vervollständige dein Profil</h1>
          <p className="mb-10" style={{color: 'var(--muted)'}}>Damit wir dein Konto prüfen und freischalten können, brauchen wir noch ein paar Angaben und Dokumente.</p>

          {error && (
            <p className="text-sm mb-6 font-medium" style={{color: '#C0392B'}}>{error}</p>
          )}

          <form onSubmit={handleSubmit}>

            <div className="panel p-8 mb-6">
              <h2 className="font-bold text-lg mb-5" style={{color: 'var(--ink)'}}>Dein Profilbild</h2>
              <div className="flex items-center gap-6">
                <div
                  className="rounded-full overflow-hidden shrink-0"
                  style={{width: '96px', height: '96px', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profilbild" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                  )}
                </div>
                <label className="btn-gradient text-white font-semibold px-5 py-2.5 rounded-full cursor-pointer text-sm inline-block">
                  Foto auswählen
                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handlePhotoChange} />
                </label>
              </div>
              <p className="text-xs mt-3" style={{color: 'var(--muted)'}}>Dieses Bild wird Kunden bei der Auswahl einer Reinigungskraft angezeigt.</p>
            </div>

            <div className="panel p-8 mb-6">
              <h2 className="font-bold text-lg mb-5" style={{color: 'var(--ink)'}}>Über deine Arbeit</h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <input type="text" placeholder="Stadt / Einsatzgebiet" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                    <option>Erfahrung: unter 1 Jahr</option>
                    <option>Erfahrung: 1–3 Jahre</option>
                    <option>Erfahrung: 3–5 Jahre</option>
                    <option>Erfahrung: 5+ Jahre</option>
                  </select>
                </div>
              </div>

              <p className="text-sm font-semibold mb-3" style={{color: 'var(--ink)'}}>Welche Dienste bietest du an?</p>
              <div className="flex flex-wrap gap-2">
                {ALL_SERVICES.map(s => (
                  <span
                    key={s}
                    className={`chip ${services.includes(s) ? 'selected' : ''}`}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel p-8 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                </div>
                <h2 className="font-bold text-lg" style={{color: 'var(--ink)'}}>Auszahlungsdaten</h2>
              </div>
              <p className="text-sm mb-5" style={{color: 'var(--muted)'}}>Hierhin überweisen wir deine Auszahlungen – regelmäßig und transparent.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <span className="text-base leading-none">🇩🇪</span>
                  <input type="text" placeholder="IBAN (z. B. DE89 3704 0044 0532 0130 00)" value={iban} onChange={(e) => setIban(e.target.value)} />
                </div>
                <div className="field flex items-center gap-3 px-4 py-3.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                  <input type="text" placeholder="Kontoinhaber" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="panel p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>
                </div>
                <h2 className="font-bold text-lg" style={{color: 'var(--ink)'}}>Dokumente hochladen</h2>
              </div>
              <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Alle Dokumente werden vertraulich behandelt und nur für die Prüfung deines Kontos verwendet.</p>

              <div className="space-y-4">

                <div>
                  <p className="text-sm font-semibold mb-2" style={{color: 'var(--ink)'}}>Personalausweis oder Reisepass</p>
                  <label className={`dropzone block ${idDoc ? 'has-file' : ''}`}>
                    <input type="file" className="hidden" onChange={(e) => setIdDoc(e.target.files?.[0] || null)} accept=".jpg,.jpeg,.png,.pdf" />
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" className="mx-auto mb-2"><path d="M12 16V4M12 4l-4 4M12 4l4 4" /><path d="M20 16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" /></svg>
                    <p className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>
                      {idDoc ? `✓ ${idDoc.name}` : 'Datei auswählen oder hierher ziehen'}
                    </p>
                    <p className="text-xs mt-1" style={{color: 'var(--muted)'}}>JPG, PNG oder PDF, max. 10 MB</p>
                  </label>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{color: 'var(--ink)'}}>Adressnachweis (z. B. Meldebescheinigung)</p>
                  <label className={`dropzone block ${addressDoc ? 'has-file' : ''}`}>
                    <input type="file" className="hidden" onChange={(e) => setAddressDoc(e.target.files?.[0] || null)} accept=".jpg,.jpeg,.png,.pdf" />
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" className="mx-auto mb-2"><path d="M12 16V4M12 4l-4 4M12 4l4 4" /><path d="M20 16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" /></svg>
                    <p className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>
                      {addressDoc ? `✓ ${addressDoc.name}` : 'Datei auswählen oder hierher ziehen'}
                    </p>
                    <p className="text-xs mt-1" style={{color: 'var(--muted)'}}>JPG, PNG oder PDF, max. 10 MB</p>
                  </label>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{color: 'var(--ink)'}}>Führungszeugnis (polizeiliches Führungszeugnis)</p>
                  <label className={`dropzone block ${criminalDoc ? 'has-file' : ''}`}>
                    <input type="file" className="hidden" onChange={(e) => setCriminalDoc(e.target.files?.[0] || null)} accept=".jpg,.jpeg,.png,.pdf" />
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" className="mx-auto mb-2"><path d="M12 16V4M12 4l-4 4M12 4l4 4" /><path d="M20 16v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3" /></svg>
                    <p className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>
                      {criminalDoc ? `✓ ${criminalDoc.name}` : 'Datei auswählen oder hierher ziehen'}
                    </p>
                    <p className="text-xs mt-1" style={{color: 'var(--muted)'}}>JPG, PNG oder PDF, max. 10 MB</p>
                  </label>
                </div>

              </div>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-purple-700 shrink-0" required />
              <p className="text-sm" style={{color: 'var(--muted)'}}>
                Ich bestätige, dass meine Angaben korrekt sind und stimme der
                <a href="#" className="underline font-medium" style={{color: 'var(--ink)'}}>Überprüfung meiner Dokumente</a> durch TANDEF zu.
              </p>
            </label>

            <button type="submit" disabled={loading} className="btn-gradient w-full text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2">
              {loading ? 'Wird gesendet...' : 'Antrag einreichen'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>

          </form>

        </section>
      </div>
    </>
  );
}