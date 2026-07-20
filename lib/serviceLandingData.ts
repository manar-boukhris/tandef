export type ServiceLanding = {
    slug: string;
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    trustBadges: string[];
    priceFrom: string;
    priceUnit: string;
    reviewCount: string;
    includes: { icon: string; title: string; desc: string }[];
    hint: string;
    plans: { name: string; desc: string; price: string; unit: string; features: string[]; popular?: boolean }[];
    whyUs: { icon: string; title: string; desc: string }[];
    reviews: { name: string; stars: number; time: string; text: string }[];
    faqs: { q: string; a: string }[];
    ctaTitle: string;
    ctaAccent: string;
    ctaSubtitle: string;
    ctaButton: string;
    heroImage: string;
  };
  
  export const SERVICES: Record<string, ServiceLanding> = {
    wohnungsreinigung: {
      slug: 'wohnungsreinigung',
      badge: '★ Beliebt',
      title: 'Wohnungsreinigung',
      titleAccent: 'in Köln',
      subtitle: 'Genießen Sie ein sauberes Zuhause ohne Stress. Unsere geprüften Reinigungskräfte kümmern sich zuverlässig um Ihre Wohnung.',
      trustBadges: ['Geprüfte Profis', 'Zufriedenheitsgarantie', 'Versichert'],
      priceFrom: '32,90 €',
      priceUnit: 'pro Stunde',
      reviewCount: '4,9/5 (über 2.500 Bewertungen)',
      includes: [
        { icon: 'kitchen', title: 'Küche', desc: 'Arbeitsflächen, Spüle, Kochfeld, Mikrowelle außen, Schränke außen reinigen' },
        { icon: 'bath', title: 'Badezimmer', desc: 'Waschbecken, Dusche/Badewanne, Toilette, Spiegel, Fliesen und Oberflächen' },
        { icon: 'bed', title: 'Wohn- & Schlafzimmer', desc: 'Staub wischen, Oberflächen reinigen, Betten machen, Möbel abstauben' },
        { icon: 'floor', title: 'Böden', desc: 'Staubsaugen und Wischen aller Böden' },
        { icon: 'more', title: 'Weitere Bereiche', desc: 'Müll entsorgen, Türen und Lichtschalter reinigen' },
      ],
      hint: 'Fensterreinigung, Backofenreinigung und Kühlschrankreinigung sind als Extras buchbar.',
      plans: [
        { name: 'Starter', desc: 'Für kleinere Wohnungen', price: '29,90 €', unit: '/ Std.', features: ['Grundlegende Reinigung', 'Bis zu 2 Zimmer', 'Regelmäßige Reinigung'] },
        { name: 'Standard', desc: 'Für die meisten Haushalte', price: '32,90 €', unit: '/ Std.', features: ['Gründliche Reinigung', 'Bis zu 4 Zimmer', 'Küche & Bad inklusive', 'Flexible Termine'], popular: true },
        { name: 'Premium', desc: 'Für höchste Ansprüche', price: '39,90 €', unit: '/ Std.', features: ['Tiefenreinigung', 'Alle Zimmer', 'Extras inklusive', 'Priorisierte Termine'] },
      ],
      whyUs: [
        { icon: 'shield', title: 'Geprüfte Profis', desc: 'Alle Reinigungskräfte werden hintergrundgeprüft und regelmäßig geschult.' },
        { icon: 'star', title: 'Zufriedenheitsgarantie', desc: 'Sie sind nicht zufrieden? Wir kommen kostenlos zurück und reinigen erneut.' },
        { icon: 'calendar', title: 'Flexible Termine', desc: 'Buchen Sie, wann es Ihnen passt – auch kurzfristig und am Wochenende.' },
        { icon: 'click', title: 'Einfache Buchung', desc: 'Online buchen in weniger als 2 Minuten – schnell und unkompliziert.' },
      ],
      reviews: [
        { name: 'Laura M.', stars: 4, time: 'vor 2 Tagen', text: 'Super zufrieden! Sehr gründliche Reinigung und freundliches Team. Meine Wohnung glänzt!' },
        { name: 'Thomas K.', stars: 5, time: 'vor 1 Woche', text: 'Pünktlich, zuverlässig und professionell. Kann ich nur weiterempfehlen.' },
        { name: 'Jana S.', stars: 4, time: 'vor 2 Wochen', text: 'Die Buchung war super einfach und war ausgezeichnet. Gerne wieder!' },
      ],
      faqs: [
        { q: 'Wie lange dauert eine Wohnungsreinigung?', a: 'Je nach Wohnungsgröße dauert eine Standardreinigung zwischen 2 und 4 Stunden.' },
        { q: 'Muss ich bei der Reinigung zu Hause sein?', a: 'Nein, viele unserer Kunden übergeben einen Schlüssel oder nutzen einen Code für den Zugang.' },
        { q: 'Kann ich einen regelmäßigen Termin buchen?', a: 'Ja, Sie können wöchentliche, zweiwöchentliche oder einmalige Termine wählen.' },
        { q: 'Was passiert, wenn ich unzufrieden bin?', a: 'Wir bieten eine Zufriedenheitsgarantie – melden Sie sich innerhalb von 24 Stunden und wir reinigen kostenlos nach.' },
        { q: 'Welche Reinigungsmittel werden verwendet?', a: 'Unsere Reinigungskräfte bringen professionelle, umweltfreundliche Reinigungsmittel mit.' },
      ],
      ctaTitle: 'Bereit für ein',
      ctaAccent: 'sauberes Zuhause?',
      ctaSubtitle: 'Buchen Sie jetzt Ihre Wohnungsreinigung in Köln in nur wenigen Klicks.',
      ctaButton: 'Jetzt Reinigung buchen',
      heroImage: '/images/hero.png',
    },
  
    bueroreinigung: {
      slug: 'bueroreinigung',
      badge: '★ Für ein produktives Arbeitsumfeld',
      title: 'Büroreinigung',
      titleAccent: 'in Köln',
      subtitle: 'Saubere Arbeitsplätze für motivierte Mitarbeiter und einen professionellen Eindruck bei Kunden. Zuverlässig, flexibel und gründlich.',
      trustBadges: ['Geprüfte Profis', 'Zufriedenheitsgarantie', 'Versichert'],
      priceFrom: '34,90 €',
      priceUnit: 'pro Stunde',
      reviewCount: '4,9/5 (über 1.800 Bewertungen)',
      includes: [
        { icon: 'desk', title: 'Arbeitsplätze', desc: 'Reinigung von Schreibtischen, Tischen und Arbeitsbereichen' },
        { icon: 'trash', title: 'Böden & Flächen', desc: 'Saugen, wischen und Pflege aller Bodenbeläge' },
        { icon: 'bath', title: 'Sanitärbereiche', desc: 'Hygienische Reinigung von WCs, Waschbecken und Fliesen' },
        { icon: 'coffee', title: 'Küchenbereiche', desc: 'Reinigung von Küchen, Spülen, Mikrowellen und Oberflächen' },
        { icon: 'more', title: 'Weitere Bereiche', desc: 'Glasflächen, Türen, Lichtschalter und häufig berührte Stellen' },
      ],
      hint: 'Leistungen können je nach Bedarf individuell angepasst werden.',
      plans: [
        { name: 'Basic', desc: 'Für kleine Büros & Start-ups', price: '34,90 €', unit: '/ Std.', features: ['Reinigung von Arbeitsbereichen', 'Böden saugen & wischen', 'Sanitärreinigung'] },
        { name: 'Standard', desc: 'Für mittelgroße Büros', price: '39,90 €', unit: '/ Std.', features: ['Alle Leistungen aus Basic', 'Küchenreinigung', 'Papierkörbe leeren', 'Oberflächen desinfizieren'], popular: true },
        { name: 'Premium', desc: 'Für große Büros & Unternehmen', price: '44,90 €', unit: '/ Std.', features: ['Alle Leistungen aus Standard', 'Glas- & Türreinigung', 'Desinfektion hochfrequenter Flächen', 'Individuelle Reinigungspläne'] },
      ],
      whyUs: [
        { icon: 'shield', title: 'Geschulte & geprüfte Profis', desc: 'Unsere Reinigungskräfte sind hintergrundgeprüft und geschult.' },
        { icon: 'calendar', title: 'Flexible Reinigungspläne', desc: 'Täglich, wöchentlich oder nach Ihrem individuellen Plan.' },
        { icon: 'star', title: 'Zufriedenheitsgarantie', desc: 'Nicht zufrieden? Wir reinigen kostenlos nach.' },
        { icon: 'click', title: 'Einfache Buchung', desc: 'Online buchen in wenigen Minuten – schnell & unkompliziert.' },
      ],
      reviews: [
        { name: 'Claudia M.', stars: 4, time: 'vor 1 Woche', text: 'Unser Büro war noch nie so sauber! TANDEF ist zuverlässig und das Team sehr freundlich.' },
        { name: 'Michael T.', stars: 5, time: 'vor 2 Wochen', text: 'Top Service und sehr gründlich. Besonders die flexiblen Termine sind für uns perfekt.' },
        { name: 'Sabrina L.', stars: 4, time: 'vor 3 Wochen', text: 'Klare Empfehlung für jede Firma, die Wert auf Sauberkeit und Hygiene legt.' },
      ],
      faqs: [
        { q: 'Wie oft ist eine Büroreinigung sinnvoll?', a: 'Das hängt von der Größe und Nutzung ab – täglich, wöchentlich oder individuell nach Bedarf.' },
        { q: 'Können wir einen individuellen Reinigungsplan erstellen?', a: 'Ja, wir passen die Leistungen gerne an Ihre spezifischen Anforderungen an.' },
        { q: 'Bringen Sie die eigenen Reinigungsmittel mit?', a: 'Ja, unsere Teams bringen professionelle Reinigungsmittel mit.' },
        { q: 'Was passiert, wenn wir mit der Reinigung nicht zufrieden sind?', a: 'Wir bieten eine Zufriedenheitsgarantie und reinigen bei Bedarf kostenlos nach.' },
        { q: 'Sind Ihre Reinigungskräfte versichert?', a: 'Ja, alle unsere Reinigungskräfte sind vollständig versichert.' },
      ],
      ctaTitle: 'Für ein',
      ctaAccent: 'sauberes & produktives Büro',
      ctaSubtitle: 'Buchen Sie jetzt Ihre Büroreinigung in Köln in nur wenigen Klicks.',
      ctaButton: 'Jetzt Büroreinigung buchen',
      heroImage: '/images/office.jpg',
    },
  
    grundreinigung: {
      slug: 'grundreinigung',
      badge: '★ Für ein hygienisch sauberes Zuhause',
      title: 'Grundreinigung',
      titleAccent: 'in Köln',
      subtitle: 'Tiefenreinigung bis ins Detail. Wir entfernen hartnäckigen Schmutz und sorgen für ein rundum hygienisches und frisches Zuhause.',
      trustBadges: ['Geprüfte Profis', 'Zufriedenheitsgarantie', 'Versichert'],
      priceFrom: '39,90 €',
      priceUnit: 'pro Stunde',
      reviewCount: '4,9/5 (über 2.000 Bewertungen)',
      includes: [
        { icon: 'kitchen', title: 'Küche', desc: 'Backofen, Kühlschrank, Schränke innen & außen, Dunstabzug, Fliesen und Oberflächen' },
        { icon: 'bath', title: 'Badezimmer', desc: 'Kalkentfernung, Dusche, Badewanne, Fliesen, Armaturen und Spiegel' },
        { icon: 'window', title: 'Fenster & Rahmen', desc: 'Fenster, Fensterrahmen, Fensterbänke und Rollläden (innen) reinigen' },
        { icon: 'floor', title: 'Böden', desc: 'Gründliches Saugen und Wischen aller Böden, Ecken und schwer zugänglicher Stellen' },
        { icon: 'more', title: 'Weitere Bereiche', desc: 'Türen, Lichtschalter, Fußleisten, Heizkörper und schwer erreichbare Stellen' },
        { icon: 'extra', title: 'Extras', desc: 'Schränke innen, Jalousien, Balkon, Terrasse oder Garage auf Wunsch zubuchbar' },
      ],
      hint: 'Die Grundreinigung eignet sich ideal für die erste Reinigung oder nach längerer Zeit.',
      plans: [
        { name: 'Basic', desc: 'Für kleinere Wohnungen', price: '39,90 €', unit: '/ Std.', features: ['Gründliche Reinigung aller Räume', 'Küche & Bad Grundreinigung', 'Böden saugen & wischen'] },
        { name: 'Standard', desc: 'Für die meisten Haushalte', price: '44,90 €', unit: '/ Std.', features: ['Alles aus Basic', 'Fenster- & Rahmenreinigung', 'Entkalkung im Bad', 'Schränke außen reinigen'], popular: true },
        { name: 'Premium', desc: 'Für höchste Ansprüche', price: '54,90 €', unit: '/ Std.', features: ['Alles aus Standard', 'Backofen & Kühlschrank innen', 'Schränke & Schubladen innen', 'Extras nach Wahl'] },
      ],
      whyUs: [
        { icon: 'shield', title: 'Geprüfte Profis', desc: 'Alle Reinigungskräfte werden hintergrundgeprüft und geschult.' },
        { icon: 'depth', title: 'Tiefenreinigung', desc: 'Wir reinigen gründlich bis ins Detail – auch schwer erreichbare Stellen.' },
        { icon: 'calendar', title: 'Flexible Termine', desc: 'Buchen Sie, wann es Ihnen passt – auch kurzfristig und am Wochenende.' },
        { icon: 'star', title: 'Zufriedenheitsgarantie', desc: 'Nicht zufrieden? Wir reinigen kostenlos nach.' },
        { icon: 'click', title: 'Einfache Buchung', desc: 'Online buchen in wenigen Minuten – schnell & unkompliziert.' },
      ],
      reviews: [
        { name: 'Laura M.', stars: 5, time: 'vor 2 Tagen', text: 'Die Grundreinigung war fantastisch! Alles glänzt wie neu. Sehr professionelles Team.' },
        { name: 'Thomas K.', stars: 4, time: 'vor 1 Woche', text: 'Besonders begeistert hat mich die Reinigung von Backofen und Bad. Kann ich nur empfehlen!' },
        { name: 'Sabrina L.', stars: 5, time: 'vor 2 Wochen', text: 'Sehr gründlich, freundlich und zuverlässig. Jederzeit wieder!' },
      ],
      faqs: [
        { q: 'Was ist der Unterschied zwischen Grundreinigung und normaler Reinigung?', a: 'Die Grundreinigung ist eine Tiefenreinigung, die auch schwer erreichbare Stellen wie Fenster, Backofen und Schränke innen umfasst.' },
        { q: 'Wie lange dauert eine Grundreinigung?', a: 'Je nach Wohnungsgröße zwischen 3 und 6 Stunden.' },
        { q: 'Muss ich bei der Reinigung zu Hause sein?', a: 'Nein, ein Schlüsselzugang oder Code reicht in der Regel aus.' },
        { q: 'Kann ich Extras zur Grundreinigung hinzufügen?', a: 'Ja, z. B. Fenster außen, Balkon oder Garage können zugebucht werden.' },
        { q: 'Welche Reinigungsmittel werden verwendet?', a: 'Professionelle, umweltfreundliche Reinigungsmittel, die von unseren Teams mitgebracht werden.' },
      ],
      ctaTitle: 'Für ein',
      ctaAccent: 'rundum sauberes Zuhause',
      ctaSubtitle: 'Buchen Sie jetzt Ihre Grundreinigung in Köln in nur wenigen Klicks.',
      ctaButton: 'Jetzt Grundreinigung buchen',
      heroImage: '/images/kitchen-purple.jpg',
    },
  
    umzugsreinigung: {
      slug: 'umzugsreinigung',
      badge: '★ Für stressfreie Umzüge',
      title: 'Umzugsreinigung',
      titleAccent: 'in Köln',
      subtitle: 'Abnahme garantiert. Wir reinigen Ihre Wohnung professionell und gründlich – für eine reibungslose Übergabe an den Vermieter.',
      trustBadges: ['Abnahmegarantie', 'Zufriedenheitsgarantie', 'Versichert'],
      priceFrom: '199 €',
      priceUnit: 'Festpreis',
      reviewCount: '4,9/5 (über 1.500 Bewertungen)',
      includes: [
        { icon: 'bed', title: 'Alle Räume', desc: 'Gründliche Reinigung aller Wohn- und Schlafräume' },
        { icon: 'kitchen', title: 'Küche', desc: 'Reinigung von Schränken, Schubladen, Arbeitsflächen, Spüle und Geräten (außen)' },
        { icon: 'bath', title: 'Badezimmer', desc: 'Entkalkung & Reinigung von Sanitäranlagen, Fliesen, Spiegeln und Armaturen' },
        { icon: 'window', title: 'Fenster & Rahmen', desc: 'Reinigung der Fenster inkl. Rahmen, Fensterbänke und Griffe' },
        { icon: 'floor', title: 'Böden', desc: 'Staubsaugen, Wischen und Entfernen von Flecken aller Bodenbeläge' },
        { icon: 'extra', title: 'Extras', desc: 'Backofen, Kühlschrank, Balkon, Terrasse oder Garage auf Wunsch zubuchbar' },
      ],
      hint: 'Die Endreinigung erfolgt nach den gängigen Anforderungen der Vermieter und Hausverwaltungen.',
      plans: [
        { name: '1-Zimmer Wohnung', desc: 'bis 50 m²', price: '199 €', unit: 'Festpreis', features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'] },
        { name: '2–3 Zimmer Wohnung', desc: '51 – 80 m²', price: '249 €', unit: 'Festpreis', features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'], popular: true },
        { name: '4+ Zimmer Wohnung', desc: 'ab 81 m²', price: '299 €', unit: 'Festpreis', features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'] },
      ],
      whyUs: [
        { icon: 'check', title: 'Abnahmegarantie', desc: 'Wir garantieren die Abnahme Ihrer Wohnung durch den Vermieter.' },
        { icon: 'shield', title: 'Geprüfte Profis', desc: 'Erfahrene und geschulte Reinigungskräfte für beste Ergebnisse.' },
        { icon: 'calendar', title: 'Pünktlich & zuverlässig', desc: 'Wir halten unsere Termine ein, damit Ihr Umzug reibungslos verläuft.' },
        { icon: 'lock', title: 'Versichert', desc: 'Ihre Zufriedenheit und Sicherheit stehen bei uns an erster Stelle.' },
        { icon: 'headset', title: 'Schneller Kundenservice', desc: 'Wir sind jederzeit für Sie da – vor, während und nach der Reinigung.' },
      ],
      reviews: [
        { name: 'Laura M.', stars: 4, time: 'vor 1 Woche', text: 'Die Reinigung war perfekt! Die Wohnung wurde ohne Probleme vom Vermieter abgenommen. Vielen Dank an das TANDEF Team!' },
        { name: 'Thomas K.', stars: 4, time: 'vor 2 Wochen', text: 'Sehr gründlich, pünktlich und freundlich. Kann ich wirklich weiterempfehlen.' },
        { name: 'Sabrina L.', stars: 4, time: 'vor 3 Wochen', text: 'Super Service! Alles blitzsauber und die Kommunikation war top. Immer wieder gerne.' },
      ],
      faqs: [
        { q: 'Was ist im Festpreis enthalten?', a: 'Der Festpreis umfasst die komplette Endreinigung inklusive Küche, Bad und Fenster.' },
        { q: 'Was passiert, wenn die Wohnung nicht abgenommen wird?', a: 'Wir bieten eine Abnahmegarantie – bei Problemen reinigen wir kostenlos nach.' },
        { q: 'Wie lange dauert eine Umzugsreinigung?', a: 'Je nach Wohnungsgröße zwischen 4 und 8 Stunden.' },
        { q: 'Kann ich Extras dazubuchen?', a: 'Ja, z. B. Backofen, Kühlschrank, Balkon oder Garage.' },
        { q: 'Wie kurzfristig kann ich buchen?', a: 'In der Regel sind Termine innerhalb von 2–3 Tagen verfügbar.' },
      ],
      ctaTitle: 'Bereit für eine',
      ctaAccent: 'stressfreie Wohnungsübergabe?',
      ctaSubtitle: 'Buchen Sie jetzt Ihre Umzugsreinigung in Köln in nur wenigen Klicks.',
      ctaButton: 'Jetzt Umzugsreinigung buchen',
      heroImage: '/images/moving.jpg',
    },
  };