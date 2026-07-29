// @ts-nocheck
import LegalLayout from '@/components/LegalLayout';

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>TANDEF</strong><br />
        Professionelle Reinigungs- und haushaltsnahe Dienstleistungen<br />
        Musterstraße 1<br />
        50667 Köln<br />
        Deutschland
      </p>

      <h2>Vertreten durch</h2>
      <p>
        Max Mustermann<br />
        Geschäftsführer
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0) 221 12345678<br />
        E-Mail: <a href="mailto:info@tandef.de">info@tandef.de</a><br />
        Website: <a href="https://www.tandef.de">www.tandef.de</a>
      </p>

      <h2>Handelsregister</h2>
      <p>
        Handelsregister: Amtsgericht Köln<br />
        Registernummer: HRB XXXXX
      </p>
      <p style={{fontSize: '.85rem', fontStyle: 'italic'}}>
        (Falls die Gesellschaft noch nicht im Handelsregister eingetragen ist, ist dieser Abschnitt bis zur Eintragung zu entfernen.)
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
        DEXXXXXXXXX
      </p>
      <p style={{fontSize: '.85rem', fontStyle: 'italic'}}>
        (Nur angeben, sofern bereits erteilt.)
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        Verantwortlich für journalistisch-redaktionelle Inhalte (soweit vorhanden):<br />
        Max Mustermann<br />
        Musterstraße 1<br />
        50667 Köln<br />
        Deutschland
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        TANDEF ist grundsätzlich nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Verpflichtung besteht.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Dennoch übernimmt TANDEF keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen.
      </p>
      <p>
        Als Diensteanbieter ist TANDEF nach den gesetzlichen Vorschriften für eigene Inhalte auf dieser Website verantwortlich. Eine Verpflichtung zur allgemeinen Überwachung übermittelter oder gespeicherter fremder Informationen besteht jedoch nur im Rahmen der gesetzlichen Bestimmungen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte TANDEF keinen Einfluss hat.
      </p>
      <p>
        Für die Inhalte der verlinkten Seiten ist ausschließlich der jeweilige Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Werden Rechtsverletzungen bekannt, werden derartige Links unverzüglich entfernt.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Sämtliche Inhalte dieser Website, insbesondere Texte, Bilder, Grafiken, Logos, Designs, Software sowie sonstige veröffentlichte Werke, sind urheberrechtlich oder durch sonstige Schutzrechte geschützt.
      </p>
      <p>
        Jede Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Nutzung außerhalb der gesetzlichen Grenzen bedarf der vorherigen schriftlichen Zustimmung von TANDEF oder des jeweiligen Rechteinhabers.
      </p>
      <p>
        Downloads und Kopien dieser Website sind ausschließlich für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>

      <h2>Bildnachweise</h2>
      <p>
        Sofern nicht ausdrücklich anders angegeben, stammen sämtliche auf dieser Website verwendeten Bilder, Grafiken und Illustrationen von TANDEF oder werden aufgrund entsprechender Nutzungsrechte verwendet.
      </p>

      <h2>Kontakt</h2>
      <p>
        Bei Fragen zu diesem Impressum oder zu unserem Unternehmen erreichen Sie uns unter:<br />
        Telefon: +49 (0) 221 12345678<br />
        E-Mail: <a href="mailto:info@tandef.de">info@tandef.de</a>
      </p>
    </LegalLayout>
  );
}