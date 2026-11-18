import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: 'FOTOCOPY ABADI JAYA | Mesin Fotocopy, Service, Percetakan & Copy Center Magetan',
    template: '%s | FOTOCOPY ABADI JAYA',
  },
  description:
    'Pusat penjualan mesin fotocopy, service panggilan, jasa overhaul, sparepart, toner, penjilidan, percetakan spanduk, undangan, copy center, dan ATK di Lembeyan, Magetan. Melayani Magetan, Madiun, Ponorogo, dan Ngawi.',
  keywords: [
    'Fotocopy Abadi Jaya',
    'Abadi Jaya Copier',
    'Service Mesin Fotocopy Magetan',
    'Service Mesin Fotocopy Madiun',
    'Overhaul Mesin Fotocopy',
    'Jual Mesin Fotocopy Magetan',
    'Sparepart dan Toner Fotocopy',
    'Percetakan Spanduk Lembeyan Magetan',
    'Cetak Undangan Custom Magetan',
    'Penjilidan Hardcover Skripsi Magetan',
    'Copy Center Magetan',
  ],
  authors: [{ name: 'FOTOCOPY ABADI JAYA' }],
  alternates: {
    canonical: 'https://abadijayacopier.vercel.app/',
  },
  openGraph: {
    title: 'FOTOCOPY ABADI JAYA — Solusi Mesin Fotocopy & Percetakan Terpadu',
    description:
      'Penjualan mesin fotocopy, service, overhaul, sparepart, toner, percetakan, undangan, penjilidan & ATK. Area layanan: Magetan, Madiun, Ponorogo, Ngawi.',
    url: 'https://abadijayacopier.vercel.app/',
    siteName: 'FOTOCOPY ABADI JAYA',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FOTOCOPY ABADI JAYA',
    alternateName: 'Abadi Jaya Copier',
    description:
      'Penjualan mesin fotocopy, service, sparepart, toner, penjilidan, percetakan, undangan, copy center, dan alat tulis kantor.',
    url: 'https://abadijayacopier.vercel.app/',
    telephone: '+6285655620979',
    priceRange: 'Rp 200 - Rp 2.500.000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jalan Gatot Kaca, Selungguh, Kediren, Lembeyan',
      addressLocality: 'Kabupaten Magetan',
      addressRegion: 'Jawa Timur',
      postalCode: '63372',
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Kabupaten Magetan, Jawa Timur' },
      { '@type': 'AdministrativeArea', name: 'Kota Madiun, Jawa Timur' },
      { '@type': 'AdministrativeArea', name: 'Kabupaten Madiun, Jawa Timur' },
      { '@type': 'AdministrativeArea', name: 'Kabupaten Ponorogo, Jawa Timur' },
      { '@type': 'AdministrativeArea', name: 'Kabupaten Ngawi, Jawa Timur' },
      { '@type': 'AdministrativeArea', name: 'Jawa Timur' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '07:30',
        closes: '11:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '13:30',
        closes: '21:00',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair accessible seating', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair accessible restroom', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Unisex restroom', value: true },
    ],
    sameAs: ['https://wa.me/6285655620979', 'https://abadijayacopier.vercel.app/'],
  };

  return (
    <html lang="id" className={plusJakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">{children}</body>
    </html>
  );
}
