-- 1. Buat tabel services
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  price bigint,
  unit text not null,
  note text not null,
  created_at timestamptz default now()
);

-- 2. Aktifkan keamanan Row Level Security (RLS)
alter table public.services enable row level security;

-- 3. Izinkan semua pengunjung membaca katalog harga
create policy "Public read access"
on public.services for select
using (true);

-- 4. Izinkan operasi insert, update, delete dari aplikasi
create policy "Allow write access"
on public.services for all
using (true)
with check (true);

-- 5. Isi 26 layanan resmi FOTOCOPY ABADI JAYA
insert into public.services (name, category, price, unit, note) values
('SERVICE MESIN FOTOCOPY', 'Mesin & Service', 150000, 'Kunjungan', 'Wilayah Madiun (Mejayan, Madiun Kota, Saradan, dst). Belum termasuk ongkos transport.'),
('JASA OVERHOUL', 'Mesin & Service', 2500000, 'Unit', 'Belum termasuk biaya pergantian sparepart jika ada yang diganti. Sudah termasuk pengecatan cover.'),
('Overhoul Mesin Fotocopy', 'Mesin & Service', 2500000, 'Unit', 'Harga di atas belum termasuk sparepart.'),
('FOTOCOPY A4 / F4 B/W', 'Copy & Print', 200, 'Per Sisi', 'Harga tersebut adalah per sisi.'),
('FOTOCOPY A3 70 GRAM', 'Copy & Print', 500, 'Lembar', 'Kertas HVS 70 gram ukuran A3.'),
('PRINT B/W CANON', 'Copy & Print', 300, 'Lembar', 'Diprint menggunakan mesin fotocopy Canon.'),
('PRINT BW EPSON', 'Copy & Print', 500, 'Lembar', 'Diprint menggunakan printer Epson.'),
('PRINT COLOR EPSON', 'Copy & Print', 1000, 'Lembar', 'Tergantung banyaknya warna.'),
('SCAN FILE', 'Copy & Print', 1000, 'Halaman', 'Format PDF, JPEG, GIF, PNG.'),
('PENJILIDAN BIASA', 'Penjilidan', 4000, 'Buku', 'Depan plastik mika, belakang cover.'),
('PENJILIDAN SOFTCOVER BIASA', 'Penjilidan', 12000, 'Buku', 'Tanpa BC Rp 12.000 | Menggunakan BC Rp 20.000.'),
('PENJILIDAN HARDCOVER', 'Penjilidan', 25000, 'Buku', 'Standar Rp 25.000 | Hardcover tinta emas Rp 35.000.'),
('CETAK YASIN', 'Penjilidan', 5500, 'Buku', 'Dijilid dengan softcover.'),
('CETAK PAS PHOTO', 'Percetakan & Foto', 1000, 'Lembar', 'Ukuran 2x4, 3x4, 4x6.'),
('CETAK FOTO 2R', 'Percetakan & Foto', 2500, 'Lembar', 'Kertas foto silky premium.'),
('CETAK FOTO 5R', 'Percetakan & Foto', 5000, 'Lembar', 'Menggunakan kertas foto premium silky.'),
('SPANDUK', 'Percetakan & Foto', 25000, 'Meter', 'Bahan 230 gram Korean.'),
('BANNER + DESAIN', 'Percetakan & Foto', 25000, 'Meter', '1. Harga sudah termasuk desain. 2. Harga per meter.'),
('XBANNER', 'Percetakan & Foto', 200000, 'Set', 'Sudah termasuk penyangga.'),
('JASA DESAIN LOGO', 'Desain & Undangan', 25000, 'Desain', 'Tergantung tingkat kesulitan dan kegunaan logo.'),
('DESAIN KARTU NAMA', 'Desain & Undangan', 50000, 'Desain', 'Syarat dan ketentuan cetak di Abadi Jaya Copier.'),
('JASA DESAIN SPANDUK', 'Desain & Undangan', 75000, 'Desain', 'Tergantung tingkat kerumitan.'),
('JASA DESAIN UNDANGAN CUSTOM', 'Desain & Undangan', 150000, 'Desain', 'Belum termasuk biaya cetak.'),
('UNDANGAN BLANKO', 'Desain & Undangan', 2000, 'Pcs', 'Harga menyesuaikan jenis dan kode undangan.'),
('UNDANGAN CUSTOM', 'Desain & Undangan', 5000, 'Pcs', 'Sudah bolak-balik dan didoff / laminasi glossy.'),
('Undangan Selametan', 'Desain & Undangan', null, 'Lembar F4/A4', 'Harga per lembar F4/A4 jadi 2 undangan (hubungi via WhatsApp).');
