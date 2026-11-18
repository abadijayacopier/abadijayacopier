'use client';

import React, { useState } from 'react';
import { STORE_PROFILE } from '@/data/abadiJayaData';

export default function ServiceBookingSection() {
  const [serviceType, setServiceType] = useState<'Service Berkala / Troubleshooting' | 'Overhaul Mesin Fotocopy'>(
    'Service Berkala / Troubleshooting'
  );
  const [machineBrand, setMachineBrand] = useState('');
  const [area, setArea] = useState('Magetan');
  const [preferredDate, setPreferredDate] = useState('');
  const [issueDetail, setIssueDetail] = useState('');

  const handleBookTechnician = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Halo *${STORE_PROFILE.name}*, saya ingin *Booking Jadwal Teknisi Mesin Fotocopy*:`,
      '',
      `• *Jenis Layanan:* ${serviceType}`,
      `• *Tipe/Merk Mesin:* ${machineBrand || '-'}`,
      `• *Area Lokasi:* ${area}`,
      `• *Rencana Tanggal:* ${preferredDate || 'Secepatnya'}`,
      `• *Keluhan / Catatan:* ${issueDetail || '-'}`,
      '',
      `Referensi Web: ${STORE_PROFILE.defaultWebsite}`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_PROFILE.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="service-mesin" className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Divisi Teknisi &amp; Mesin Fotocopy
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Layanan Service Panggilan &amp; Overhaul Mesin Fotocopy
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Ditangani langsung oleh teknisi berpengalaman untuk perkantoran, sekolah, instansi, maupun usaha copy
              center di seluruh wilayah Magetan, Madiun (Mejayan, Madiun Kota, Saradan), Ponorogo, dan Ngawi.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">SERVICE MESIN FOTOCOPY</h3>
                    <p className="mt-1 text-xs text-slate-600">
                      Perbaikan kerusakan, setting hasil cetak, perawatan berkala, dan penggantian sparepart/toner.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-blue-700">Rp 150.000</p>
                    <p className="text-[11px] text-slate-500">Tarif Dasar</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-slate-200 pt-2.5 text-[11px] text-slate-500">
                  *Catatan: Berlaku untuk wilayah Madiun (Mejayan, Madiun Kota, Saradan, dst). Belum termasuk ongkos
                  transport.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">JASA OVERHAUL MESIN FOTOCOPY</h3>
                    <p className="mt-1 text-xs text-slate-600">
                      Pembongkaran menyeluruh, pembersihan total, rekondisi unit, dan peremajaan fisik mesin.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-blue-700">Rp 2.500.000</p>
                    <p className="text-[11px] text-slate-500">Per Unit</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1 border-t border-blue-100 pt-2.5 text-[11px] text-slate-600">
                  <li>✓ Sudah termasuk pengecatan ulang cover mesin agar tampak seperti baru.</li>
                  <li>* Belum termasuk biaya pergantian sparepart apabila ada komponen yang harus diganti.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={handleBookTechnician}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
            >
              <h3 className="text-lg font-bold text-slate-900">Form Penjadwalan Kunjungan Teknisi</h3>
              <p className="mt-1 text-xs text-slate-500">
                Layanan teknisi memerlukan janji temu (appointment) agar jadwal kunjungan teratur.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Pilih Jenis Layanan</label>
                  <select
                    value={serviceType}
                    onChange={(e) =>
                      setServiceType(
                        e.target.value as 'Service Berkala / Troubleshooting' | 'Overhaul Mesin Fotocopy'
                      )
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Service Berkala / Troubleshooting">Service Mesin Fotocopy (Mulai Rp 150.000)</option>
                    <option value="Overhaul Mesin Fotocopy">Jasa Overhaul + Cat Cover (Rp 2.500.000)</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Merk &amp; Tipe Mesin</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Canon iR 4570 / iR Advance"
                      value={machineBrand}
                      onChange={(e) => setMachineBrand(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Wilayah / Kota</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Magetan (Lembeyan & Sekitarnya)">Magetan</option>
                      <option value="Madiun Kota">Madiun Kota</option>
                      <option value="Kabupaten Madiun (Mejayan, Saradan, dll)">Kabupaten Madiun</option>
                      <option value="Ponorogo">Ponorogo</option>
                      <option value="Ngawi">Ngawi</option>
                      <option value="Luar Karesidenan (Jawa Timur)">Area Jawa Timur Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Rencana Tanggal Kunjungan</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Keluhan Mesin / Kebutuhan Sparepart &amp; Toner
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan kode error, hasil cetak bergaris, paper jam, atau kebutuhan toner/sparepart..."
                    value={issueDetail}
                    onChange={(e) => setIssueDetail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-700 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
                >
                  Ajukan Jadwal Teknisi via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
