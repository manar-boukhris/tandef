import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

const PURPLE_700 = '#5B21B6';
const PURPLE_50 = '#F5F3FF';
const INK = '#1F1339';
const MUTED = '#6B6478';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: INK,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: PURPLE_700,
    paddingBottom: 16,
  },
  logo: { width: 110, height: 'auto' },
  invoiceTitle: { fontSize: 20, fontWeight: 700, color: PURPLE_700, textAlign: 'right' },
  invoiceMeta: { fontSize: 9, color: MUTED, textAlign: 'right', marginTop: 4 },
  section: { marginBottom: 22 },
  sectionTitle: {
    fontSize: 10, fontWeight: 700, color: PURPLE_700,
    marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: MUTED },
  value: { color: INK, fontWeight: 700 },
  card: {
    backgroundColor: PURPLE_50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 22,
  },
  table: { marginTop: 6 },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ECE8F5',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EEFA',
  },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },
  th: { fontSize: 9, fontWeight: 700, color: MUTED, textTransform: 'uppercase' },
  totalsBox: { alignItems: 'flex-end', marginTop: 16 },
  totalRow: { flexDirection: 'row', width: 220, justifyContent: 'space-between', marginBottom: 6 },
  grandTotalRow: {
    flexDirection: 'row', width: 220, justifyContent: 'space-between',
    borderTopWidth: 2, borderTopColor: PURPLE_700, paddingTop: 8, marginTop: 4,
  },
  grandTotalLabel: { fontSize: 12, fontWeight: 700, color: INK },
  grandTotalValue: { fontSize: 14, fontWeight: 700, color: PURPLE_700 },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7F7EE',
    color: '#15803D',
    fontSize: 9,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 6,
  },
  statusBadgePending: { backgroundColor: '#FEF3C7', color: '#B7791F' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#ECE8F5',
    paddingTop: 12,
    fontSize: 8,
    color: MUTED,
    textAlign: 'center',
  },
});

type InvoicePDFProps = {
  invoiceNumber: string;
  issuedAt: string;
  status: 'paid' | 'pending';
  amount: number;
  customerName: string;
  customerEmail: string;
  booking: {
    serviceType: string;
    date: string;
    hours: number;
    address: string;
    frequency?: string;
  };
  cleanerName?: string;
  logoUrl: string;
};

export function InvoicePDF({
  invoiceNumber, issuedAt, status, amount,
  customerName, customerEmail, booking, cleanerName, logoUrl,
}: InvoicePDFProps) {
  const hourlyRate = (amount / booking.hours).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.headerRow}>
          <Image style={styles.logo} src={logoUrl} />
          <View>
            <Text style={styles.invoiceTitle}>RECHNUNG</Text>
            <Text style={styles.invoiceMeta}>Nr. {invoiceNumber}</Text>
            <Text style={styles.invoiceMeta}>
              {new Date(issuedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rechnungsempfänger</Text>
            <Text style={styles.value}>{customerName}</Text>
            <Text style={styles.label}>{customerEmail}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zahlungsstatus</Text>
            <Text style={status !== 'paid' ? [styles.statusBadge, styles.statusBadgePending] : styles.statusBadge}>
              {status === 'paid' ? 'Bezahlt' : 'Ausstehend'}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details der Reinigung</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Leistung</Text>
            <Text style={styles.value}>{booking.serviceType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Datum</Text>
            <Text style={styles.value}>
              {new Date(booking.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresse</Text>
            <Text style={styles.value}>{booking.address}</Text>
          </View>
          {cleanerName && (
            <View style={styles.row}>
              <Text style={styles.label}>Reinigungskraft</Text>
              <Text style={styles.value}>{cleanerName}</Text>
            </View>
          )}
          {booking.frequency && (
            <View style={styles.row}>
              <Text style={styles.label}>Häufigkeit</Text>
              <Text style={styles.value}>{booking.frequency}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kostenaufstellung</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.th, styles.colDesc]}>Beschreibung</Text>
              <Text style={[styles.th, styles.colQty]}>Stunden</Text>
              <Text style={[styles.th, styles.colPrice]}>Betrag</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.colDesc}>{booking.serviceType} ({hourlyRate} €/Std.)</Text>
              <Text style={styles.colQty}>{booking.hours}</Text>
              <Text style={styles.colPrice}>{amount.toFixed(2)} €</Text>
            </View>
          </View>

          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.label}>Zwischensumme</Text>
              <Text style={styles.value}>{amount.toFixed(2)} €</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.label}>MwSt. (inkl.)</Text>
              <Text style={styles.value}>0,00 €</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Gesamtbetrag</Text>
              <Text style={styles.grandTotalValue}>{amount.toFixed(2)} €</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          TANDEF GmbH · info@tandef.de · 030 555 748 20{'\n'}
          Diese Rechnung wurde automatisch generiert und ist ohne Unterschrift gültig.
        </Text>

      </Page>
    </Document>
  );
}