'use client';

import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Order Cetak &amp; Percetakan Online</h3>
            <p className="text-xs text-slate-500">Kirim link file Anda (PDF, JPEG, PNG) agar siap diambil di toko.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Nama Pemesan</label>
            <input
              type="text"
              required
              placeholder="Masukkan nama Anda"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Jenis Layanan Cetak</label>
              <select
                value={orderCategory}
                onChange={(e) => setOrderCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
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
              <label className="block text-xs font-semibold text-slate-700">Jumlah Rangkap / Pcs / Meter</label>
              <input
                type="text"
                required
                placeholder="Contoh: 2 rangkap / 3x1 meter"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Opsi Penjilidan / Finishing</label>
            <select
              value={finishing}
              onChange={(e) => setFinishing(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
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
            <label className="block text-xs font-semibold text-slate-700">
              Link File Google Drive (Opsional — bisa kirim langsung di WA)
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={fileLink}
              onChange={(e) => setFileLink(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Catatan Tambahan</label>
            <textarea
              rows={2}
              placeholder="Contoh: Kertas F4 70gr, cetak bolak-balik, atau jadwal pengambilan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700"
            >
              Kirim Order ke WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
