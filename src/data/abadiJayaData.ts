export interface ServiceItem {
  id: string;
  name: string;
  category: 'Mesin & Service' | 'Copy & Print' | 'Penjilidan' | 'Percetakan & Foto' | 'Desain & Undangan';
  price: number | null;
  unit: string;
  note: string;
}

export const STORE_PROFILE = {
  name: 'FOTOCOPY ABADI JAYA',
  tagline: 'Penjualan Mesin Fotocopy, Service, Sparepart, Toner, Percetakan & Copy Center',
  address: 'Jalan Gatot Kaca, Selungguh, Kediren, Lembeyan, Kabupaten Magetan, Jawa Timur 63372',
  phoneDisplay: '0856-5562-0979',
  whatsappNumber: '6285655620979',
  defaultWebsite: 'https://abadijayacopier.vercel.app/',
  serviceAreas: ['Magetan', 'Madiun (Kota & Kab.)', 'Ponorogo', 'Ngawi', 'Jawa Timur'],
  hours: {
    regular: '07:00 - 21:00 WIB (Sabtu – Kamis)',
    friday: '07:30 - 11:30 & 13:30 - 21:00 WIB (Jumat)',
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  { id: 'srv-1', name: 'SERVICE MESIN FOTOCOPY', category: 'Mesin & Service', price: 150000, unit: 'Kunjungan', note: 'Wilayah Madiun (Mejayan, Madiun Kota, Saradan, dst). Belum termasuk ongkos transport.' },
  { id: 'srv-2', name: 'JASA OVERHOUL', category: 'Mesin & Service', price: 2500000, unit: 'Unit', note: 'Belum termasuk biaya pergantian sparepart jika ada yang diganti. Sudah termasuk pengecatan cover.' },
  { id: 'srv-3', name: 'Overhoul Mesin Fotocopy', category: 'Mesin & Service', price: 2500000, unit: 'Unit', note: 'Harga di atas belum termasuk sparepart.' },
  { id: 'cp-1', name: 'FOTOCOPY A4 / F4 B/W', category: 'Copy & Print', price: 250, unit: 'Per Sisi', note: 'Harga tersebut adalah per sisi.' },
  { id: 'cp-2', name: 'FOTOCOPY A3 70 GRAM', category: 'Copy & Print', price: 1000, unit: 'Lembar', note: 'Kertas HVS 70 gram ukuran A3.' },
  { id: 'cp-3', name: 'PRINT B/W CANON', category: 'Copy & Print', price: 250, unit: 'Lembar', note: 'Diprint menggunakan mesin fotocopy Canon.' },
  { id: 'cp-4', name: 'PRINT BW EPSON', category: 'Copy & Print', price: 500, unit: 'Lembar', note: 'Diprint menggunakan printer Epson.' },
  { id: 'cp-5', name: 'PRINT COLOR EPSON', category: 'Copy & Print', price: 1000, unit: 'Lembar', note: 'Tergantung banyaknya warna.' },
  { id: 'cp-6', name: 'SCAN FILE', category: 'Copy & Print', price: 1000, unit: 'Halaman', note: 'Format PDF, JPEG, GIF, PNG.' },
  { id: 'jld-1', name: 'PENJILIDAN BIASA', category: 'Penjilidan', price: 4000, unit: 'Buku', note: 'Depan plastik mika, belakang cover.' },
  { id: 'jld-2', name: 'PENJILIDAN SOFTCOVER BIASA', category: 'Penjilidan', price: 12000, unit: 'Buku', note: 'Tanpa BC Rp 12.000 | Menggunakan BC Rp 20.000.' },
  { id: 'jld-3', name: 'PENJILIDAN HARDCOVER', category: 'Penjilidan', price: 25000, unit: 'Buku', note: 'Standar Rp 25.000 | Hardcover tinta emas Rp 35.000.' },
  { id: 'jld-4', name: 'CETAK YASIN', category: 'Penjilidan', price: 5500, unit: 'Buku', note: 'Dijilid dengan softcover.' },
  { id: 'prt-1', name: 'CETAK PAS PHOTO', category: 'Percetakan & Foto', price: 1000, unit: 'Lembar', note: 'Ukuran 2x4, 3x4, 4x6.' },
  { id: 'prt-2', name: 'CETAK FOTO 2R', category: 'Percetakan & Foto', price: 2500, unit: 'Lembar', note: 'Kertas foto silky premium.' },
  { id: 'prt-3', name: 'CETAK FOTO 5R', category: 'Percetakan & Foto', price: 5000, unit: 'Lembar', note: 'Menggunakan kertas foto premium silky.' },
  { id: 'prt-4', name: 'SPANDUK', category: 'Percetakan & Foto', price: 25000, unit: 'Meter', note: 'Bahan 230 gram Korean.' },
  { id: 'prt-5', name: 'BANNER + DESAIN', category: 'Percetakan & Foto', price: 25000, unit: 'Meter', note: '1. Harga sudah termasuk desain. 2. Harga per meter.' },
  { id: 'prt-6', name: 'XBANNER', category: 'Percetakan & Foto', price: 200000, unit: 'Set', note: 'Sudah termasuk penyangga.' },
  { id: 'dsn-1', name: 'JASA DESAIN LOGO', category: 'Desain & Undangan', price: 25000, unit: 'Desain', note: 'Tergantung tingkat kesulitan dan kegunaan logo.' },
  { id: 'dsn-2', name: 'DESAIN KARTU NAMA', category: 'Desain & Undangan', price: 50000, unit: 'Desain', note: 'Syarat dan ketentuan cetak di Abadi Jaya Copier.' },
  { id: 'dsn-3', name: 'JASA DESAIN SPANDUK', category: 'Desain & Undangan', price: 75000, unit: 'Desain', note: 'Tergantung tingkat kerumitan.' },
  { id: 'dsn-4', name: 'JASA DESAIN UNDANGAN CUSTOM', category: 'Desain & Undangan', price: 150000, unit: 'Desain', note: 'Belum termasuk biaya cetak.' },
  { id: 'dsn-5', name: 'UNDANGAN BLANKO', category: 'Desain & Undangan', price: 2000, unit: 'Pcs', note: 'Harga menyesuaikan jenis dan kode undangan.' },
  { id: 'dsn-6', name: 'UNDANGAN CUSTOM', category: 'Desain & Undangan', price: 5000, unit: 'Pcs', note: 'Sudah bolak-balik dan didoff / laminasi glossy.' },
  { id: 'dsn-7', name: 'Undangan Selametan', category: 'Desain & Undangan', price: null, unit: 'Lembar F4/A4', note: 'Harga per lembar F4/A4 jadi 2 undangan (hubungi via WhatsApp).' },
];
