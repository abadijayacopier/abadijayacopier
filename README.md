# FOTOCOPY ABADI JAYA (Abadi Jaya Copier)

Website Profil Bisnis, Katalog Layanan & Tarif Resmi, Kalkulator Estimasi Order WhatsApp, Booking Teknisi Mesin Fotocopy, serta Admin Dashboard berbasis **Next.js (App Router) + Tailwind CSS + Supabase**.

## Informasi Bisnis
- **Nama Usaha:** FOTOCOPY ABADI JAYA
- **Website Default:** https://sites.google.com/view/abadijayacopier
- **Alamat:** Jalan Gatot Kaca, Selungguh, Kediren, Lembeyan, Kabupaten Magetan, Jawa Timur 63372
- **WhatsApp:** 0856-5562-0979 (`https://wa.me/6285655620979`)
- **Area Layanan:** Magetan, Madiun (Kota & Kab.), Ponorogo, Ngawi, Jawa Timur

## Cara Menjalankan di Lokal
1. Install dependensi:
   ```bash
   npm install
   ```
2. Salin `.env.example` menjadi `.env.local` dan isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `NEXT_PUBLIC_ADMIN_PIN`.
3. Jalankan SQL di `supabase/schema.sql` pada menu **SQL Editor** di dashboard Supabase.
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` untuk halaman utama dan `http://localhost:3000/admin` untuk halaman pengelola tarif.
