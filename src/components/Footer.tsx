'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { STORE_PROFILE } from '@/data/abadiJayaData';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText(STORE_PROFILE.defaultWebsite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                AJ
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                {STORE_PROFILE.name}
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              {STORE_PROFILE.tagline}. Melayani kebutuhan perkantoran, sekolah, instansi, dan masyarakat umum di
              wilayah Magetan, Madiun, Ponorogo, Ngawi, serta Jawa Timur.
            </p>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Alamat Website Resmi (Default)
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <a
                  href={STORE_PROFILE.defaultWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-xs font-medium text-blue-400 hover:underline"
                >
                  {STORE_PROFILE.defaultWebsite}
                </a>
                <button
                  onClick={handleCopyWebsite}
                  className="shrink-0 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-blue-600"
                >
                  {copied ? 'Tersalin ✓' : 'Salin Link'}
                </button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold text-white">Fasilitas &amp; Layanan Toko</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded bg-slate-900 px-2.5 py-1 text-slate-300 ring-1 ring-slate-800">
                  ✓ Layanan di Tempat (Onsite)
                </span>
                <span className="rounded bg-slate-900 px-2.5 py-1 text-slate-300 ring-1 ring-slate-800">
                  ✓ Booking Online / Appointment
                </span>
                <span className="rounded bg-slate-900 px-2.5 py-1 text-slate-300 ring-1 ring-slate-800">
                  ✓ Kursi &amp; Toilet Akses Kursi Roda
                </span>
                <span className="rounded bg-slate-900 px-2.5 py-1 text-slate-300 ring-1 ring-slate-800">
                  ✓ Toilet Umum (Unisex)
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kontak &amp; Jam Operasional
            </h3>

            <ul className="mt-4 space-y-3.5 text-xs">
              <li>
                <span className="block font-semibold text-slate-400">Alamat Lengkap:</span>
                <span className="mt-0.5 block leading-relaxed text-slate-200">{STORE_PROFILE.address}</span>
              </li>

              <li>
                <span className="block font-semibold text-slate-400">Telepon / WhatsApp Resmi:</span>
                <a
                  href={`https://wa.me/${STORE_PROFILE.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 inline-block text-sm font-bold text-emerald-400 hover:underline"
                >
                  {STORE_PROFILE.phoneDisplay}
                </a>
              </li>

              <li>
                <span className="block font-semibold text-slate-400">Jadwal Buka:</span>
                <div className="mt-1 space-y-1 text-slate-200">
                  <p>• Sabtu – Kamis: 07.00 – 21.00 WIB</p>
                  <p>• Jumat: 07.30 – 11.30 &amp; 13.30 – 21.00 WIB</p>
                </div>
              </li>

              <li>
                <span className="block font-semibold text-slate-400">Cakupan Area Layanan:</span>
                <p className="mt-0.5 text-slate-200">
                  Magetan, Ponorogo, Madiun (Kota &amp; Kabupaten), Ngawi, dan Jawa Timur.
                </p>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Lokasi Google Maps</h3>
            <p className="mt-1 text-xs text-slate-400">
              Jalan Gatot Kaca, Selungguh, Kediren, Kec. Lembeyan, Kab. Magetan.
            </p>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <iframe
                title="Peta Lokasi FOTOCOPY ABADI JAYA"
                src="https://maps.google.com/maps?q=Jalan%20Gatot%20Kaca,%20Selungguh,%20Kediren,%20Lembeyan,%20Kabupaten%20Magetan,%20Jawa%20Timur%2063372&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-52 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.google.com/?q=Jalan+Gatot+Kaca,+Selungguh,+Kediren,+Lembeyan,+Kabupaten+Magetan,+Jawa+Timur+63372"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:border-blue-500 hover:bg-slate-800"
            >
              Buka Rute di Aplikasi Google Maps ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FOTOCOPY ABADI JAYA (Abadi Jaya Copier). Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Lembeyan, Magetan — Jawa Timur 63372</span>
            <Link href="/admin" className="text-slate-600 hover:text-slate-300">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
