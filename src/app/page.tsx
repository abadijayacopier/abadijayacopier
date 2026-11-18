'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { STORE_PROFILE, SERVICES_DATA, ServiceItem } from '@/data/abadiJayaData';
import { fetchServicesFromDB } from '@/lib/supabaseClient';
import ServiceBookingSection from '@/components/ServiceBookingSection';
import OnlinePrintOrderModal from '@/components/OnlinePrintOrderModal';
import Footer from '@/components/Footer';
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';

const CATEGORIES = [
  'Semua',
  'Mesin & Service',
  'Copy & Print',
  'Penjilidan',
  'Percetakan & Foto',
  'Desain & Undangan',
] as const;

export default function AbadiJayaPage() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchServicesFromDB().then((data) => setServices(data));
  }, []);

  useEffect(() => {
    const checkStoreHours = () => {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      const day = now.getDay();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();

      if (day === 5) {
        const morning = totalMinutes >= 7 * 60 + 30 && totalMinutes <= 11 * 60 + 30;
        const afternoon = totalMinutes >= 13 * 60 + 30 && totalMinutes <= 21 * 60;
        setIsOpenNow(morning || afternoon);
      } else {
        setIsOpenNow(totalMinutes >= 7 * 60 && totalMinutes <= 21 * 60);
      }
    };
    checkStoreHours();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartSummary = useMemo(() => {
    let total = 0;
    const items: { service: ServiceItem; qty: number }[] = [];
    Object.entries(cart).forEach(([id, qty]) => {
      const srv = services.find((s) => s.id === id);
      if (srv) {
        items.push({ service: srv, qty });
        if (srv.price) total += srv.price * qty;
      }
    });
    return { total, items };
  }, [cart, services]);

  const handleCheckoutWhatsApp = () => {
    const lines = cartSummary.items.map(
      ({ service, qty }, idx) =>
        `${idx + 1}. ${service.name} (${qty} ${service.unit}) - ${
          service.price ? `Rp ${(service.price * qty).toLocaleString('id-ID')}` : 'Tanya Harga'
        }`
    );
    const message = [
      `Halo *${STORE_PROFILE.name}*, saya ingin memesan / menanyakan estimasi layanan berikut:`,
      '',
      ...lines,
      '',
      `*Estimasi Total:* Rp ${cartSummary.total.toLocaleString('id-ID')}`,
      `Referensi Web: ${STORE_PROFILE.defaultWebsite}`,
    ].join('\n');

    window.open(`https://wa.me/${STORE_PROFILE.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 font-bold text-white shadow-sm">
              AJ
            </span>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                {STORE_PROFILE.name}
              </h1>
              <p className="text-xs text-slate-500">Lembeyan, Magetan • Karesidenan Madiun</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold md:inline-flex ${
                isOpenNow
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                  : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {isOpenNow ? 'Buka Sekarang' : 'Tutup / Istirahat'}
            </span>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 sm:text-sm"
            >
              Cetak Online
            </button>
            <a
              href={`https://wa.me/${STORE_PROFILE.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 sm:px-4 sm:text-sm"
            >
              Chat WA
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-md bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300 ring-1 ring-blue-400/30">
                Pusat Mesin Fotocopy &amp; Percetakan Terpadu
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Solusi Dokumen, Percetakan &amp; Teknisi Fotocopy Profesional
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Melayani penjualan mesin fotocopy, service berkala, overhaul, penyediaan sparepart &amp; toner,
                hingga percetakan spanduk, undangan, penjilidan, dan ATK lengkap.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500"
                >
                  Kirim File Cetak Online
                </button>
                <a
                  href="#service-mesin"
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  Jadwalkan Teknisi Mesin
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {STORE_PROFILE.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700"
                  >
                    Area: {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/70 p-6 shadow-xl lg:col-span-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Informasi Operasional &amp; Lokasi
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Alamat Toko</dt>
                  <dd className="font-medium text-white">{STORE_PROFILE.address}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Jam Operasional</dt>
                  <dd className="font-medium text-white">{STORE_PROFILE.hours.regular}</dd>
                  <dd className="text-xs text-slate-300">{STORE_PROFILE.hours.friday}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Kontak Resmi &amp; Website</dt>
                  <dd className="font-medium text-emerald-400">{STORE_PROFILE.phoneDisplay} (WhatsApp)</dd>
                  <dd className="truncate text-xs text-blue-300">{STORE_PROFILE.defaultWebsite}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Katalog Layanan &amp; Tarif Resmi</h2>
              <input
                type="text"
                placeholder="Cari layanan (misal: Overhaul, Yasin, A4)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm shadow-sm focus:border-blue-600 focus:outline-none sm:w-72"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {filteredServices.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300"
                  >
                    <div>
                      <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.note}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div>
                        <p className="text-base font-extrabold text-blue-700">
                          {item.price ? `Rp ${item.price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                        </p>
                        <p className="text-[11px] text-slate-400">per {item.unit}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {qty > 0 ? (
                          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                            <button
                              onClick={() => updateCart(item.id, -1)}
                              className="px-2.5 py-1 text-sm font-bold text-slate-700 hover:bg-slate-200"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold">{qty}</span>
                            <button
                              onClick={() => updateCart(item.id, 1)}
                              className="px-2.5 py-1 text-sm font-bold text-slate-700 hover:bg-slate-200"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                          >
                            + Pilih
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Estimasi Pesanan &amp; Booking</h3>
              <p className="mt-1 text-xs text-slate-500">
                Pilih layanan di samping untuk menghitung perkiraan biaya dan kirim rincian ke WhatsApp.
              </p>

              {cartSummary.items.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  Belum ada layanan yang dipilih.
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <ul className="max-h-64 space-y-2.5 overflow-y-auto pr-1 text-xs">
                    {cartSummary.items.map(({ service, qty }) => (
                      <li
                        key={service.id}
                        className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">{service.name}</p>
                          <p className="text-slate-500">
                            {qty} x {service.price ? `Rp ${service.price.toLocaleString('id-ID')}` : 'Custom'}
                          </p>
                        </div>
                        <button
                          onClick={() => updateCart(service.id, -qty)}
                          className="text-rose-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>Perkiraan Total</span>
                      <span className="text-blue-700">Rp {cartSummary.total.toLocaleString('id-ID')}</span>
                    </div>
                    <button
                      onClick={handleCheckoutWhatsApp}
                      className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      Kirim Pesanan ke WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <ServiceBookingSection />
      <Footer />
      <OnlinePrintOrderModal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} />
    </div>
  );
}
