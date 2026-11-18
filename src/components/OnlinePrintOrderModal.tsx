'use client';

import React, { useState, useEffect } from 'react';
import { STORE_PROFILE } from '@/data/abadiJayaData';

export default function OnlinePrintOrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [customerName, setCustomerName] = useState('');
  const [orderCategory, setOrderCategory] = useState('Print B/W Canon (Rp 300/lbr)');
  const [fileLink, setFileLink] = useState('');
  const [finishing, setFinishing] = useState('Tanpa Jilid');
  const [copies, setCopies] = useState('1');
  const [notes, setNotes] = useState('');

  // Kunci scroll halaman belakang saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Halo *${STORE_PROFILE.name}*, saya ingin *Order Cetak Online*:`,
      '',
      `• *Nama Pemesan:* ${customerName}`,
      `• *Jenis Cetakan:* ${orderCategory}`,
      `• *Jumlah Rangkap / Pcs:* ${copies}`,
      `• *Finishing / Jilid:* ${finishing}`,
      `• *Link File (Google Drive / Cloud):* ${fileLink || 'Akan dikirim langsung di chat WA ini'}`,
      `• *Catatan Ukuran / Kertas:* ${notes || '-'}`,
      '',
      `Referensi Web: ${STORE_PROFILE.defaultWebsite}`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_PROFILE.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      {/* Container Modal: Bottom-sheet di HP, Centered Card di Desktop */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl"
      >
        {/* Header Sticky */}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div>
            <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Cetak Cepat Tanpa Antre
            </span>
            <h3 className="mt-1 text-base font-extrabold text-slate-900 sm:text-lg">
              Order Cetak &amp; Percetakan Online
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
              Kirim link file Anda (PDF, JPEG, PNG) agar siap diambil di toko.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Form Body dengan Scroll Internal */}
        <form onSubmit={handleSubmitOrder} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Nama Pemesan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Jenis Layanan Cetak</label>
                <select
                  value={orderCategory}
                  onChange={(e) => setOrderCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                >
                  <option>Print B/W Canon (Rp 300/lbr)</option>
                  <option>Print B/W Epson (Rp 500/lbr)</option>
                  <option>Print Color Epson (Rp 1.000/lbr)</option>
                  <option>Fotocopy A4/F4 atau A3</option>
                  <option>Pas Foto (2x4, 3x4, 4x6) / Foto 2R &amp; 5R</option>
                  <option>Spanduk / Banner / X-Banner</option>
                  <option>Undangan Custom / Blanko / Selametan</option>
                  <option>Cetak Buku Yasin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Jumlah Rangkap / Pcs / Meter <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 2 rangkap / 3x1 m"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Opsi Penjilidan / Finishing</label>
              <select
                value={finishing}
                onChange={(e) => setFinishing(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              >
                <option>Tanpa Jilid</option>
                <option>Penjilidan Biasa - Mika &amp; Cover (Rp 4.000)</option>
                <option>Penjilidan Softcover Biasa (Rp 12.000)</option>
                <option>Penjilidan Softcover dengan BC (Rp 20.000)</option>
                <option>Penjilidan Hardcover Standar (Rp 25.000)</option>
                <option>Penjilidan Hardcover Tinta Emas (Rp 35.000)</option>
                <option>Laminasi Doff / Glossy (Undangan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Link File Google Drive <span className="font-normal text-slate-400">(Opsional — bisa kirim di WA)</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={fileLink}
                onChange={(e) => setFileLink(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Catatan Tambahan</label>
              <textarea
                rows={2}
                placeholder="Contoh: Kertas F4 70gr, cetak bolak-balik, atau jam pengambilan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1.5 w-full resize-none rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
          </div>

          {/* Footer Action Sticky */}
          <div className="flex shrink-0 items-center gap-2.5 border-t border-slate-100 bg-slate-50/80 px-5 py-3.5 sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-2/3 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
            >
              Kirim Order ke WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}