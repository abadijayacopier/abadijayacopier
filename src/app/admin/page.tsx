'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceItem, STORE_PROFILE } from '@/data/abadiJayaData';
import { supabase, fetchServicesFromDB } from '@/lib/supabaseClient';

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';

const CATEGORIES: ServiceItem['category'][] = [
  'Mesin & Service',
  'Copy & Print',
  'Penjilidan',
  'Percetakan & Foto',
  'Desain & Undangan',
];

export default function AdminSupabaseDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ServiceItem>>({});

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ServiceItem['category']>('Copy & Print');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('Lembar');
  const [newNote, setNewNote] = useState('');

  const showToast = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await fetchServicesFromDB();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN pengelola salah.');
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return alert('Konfigurasi Supabase di .env.local belum diisi.');
    if (!newName.trim()) return;

    setSaving(true);
    const payload = {
      name: newName.trim().toUpperCase(),
      category: newCategory,
      price: newPrice.trim() === '' ? null : Number(newPrice),
      unit: newUnit.trim() || 'Item',
      note: newNote.trim() || '-',
    };

    const { data, error } = await supabase.from('services').insert([payload]).select().single();
    setSaving(false);

    if (error) {
      alert('Gagal menambah layanan: ' + error.message);
      return;
    }

    if (data) {
      setServices((prev) => [...prev, data as ServiceItem]);
      setNewName('');
      setNewPrice('');
      setNewUnit('Lembar');
      setNewNote('');
      showToast('Layanan baru berhasil disimpan ke database!');
    }
  };

  const handleSaveEdit = async (id: string) => {
    if (!supabase) return alert('Konfigurasi Supabase di .env.local belum diisi.');

    setSaving(true);
    const payload = {
      name: (editForm.name || '').trim().toUpperCase(),
      category: editForm.category,
      price:
        editForm.price === null || editForm.price === undefined || String(editForm.price) === ''
          ? null
          : Number(editForm.price),
      unit: (editForm.unit || '').trim(),
      note: (editForm.note || '').trim(),
    };

    const { error } = await supabase.from('services').update(payload).eq('id', id);
    setSaving(false);

    if (error) {
      alert('Gagal memperbarui harga: ' + error.message);
      return;
    }

    setServices((prev) =>
      prev.map((item) => (item.id === id ? ({ ...item, ...payload } as ServiceItem) : item))
    );
    setEditingId(null);
    showToast('Perubahan tarif berhasil diperbarui secara live!');
  };

  const handleDelete = async (id: string, name: string) => {
    if (!supabase) return;
    if (!confirm(`Yakin ingin menghapus layanan "${name}" secara permanen?`)) return;

    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus layanan: ' + error.message);
      return;
    }

    setServices((prev) => prev.filter((item) => item.id !== id));
    showToast(`Layanan "${name}" telah dihapus.`);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-8 text-white shadow-2xl"
        >
          <div className="mb-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-extrabold">
              AJ
            </span>
            <h1 className="mt-3 text-xl font-bold">Admin Database Toko</h1>
            <p className="mt-1 text-xs text-slate-400">{STORE_PROFILE.name}</p>
          </div>

          <label className="block text-xs font-semibold text-slate-300">Masukkan PIN Admin</label>
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="••••"
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center text-lg tracking-widest text-white focus:border-blue-500 focus:outline-none"
          />
          {pinError && <p className="mt-2 text-xs text-rose-400">{pinError}</p>}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Masuk Dashboard
          </button>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white">
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {statusMsg && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {statusMsg}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-900">
                Admin Pengelola Harga (Cloud Live) — {STORE_PROFILE.name}
              </h1>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  supabase ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {supabase ? 'Supabase Terhubung' : 'Env Belum Diatur'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Setiap perubahan harga langsung tayang di website untuk semua pelanggan
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Muat Ulang Data
            </button>
            <Link
              href="/"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Lihat Website ↗
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">+ Tambah Layanan / Produk Baru</h2>
          <form onSubmit={handleAddService} className="mt-4 grid gap-4 sm:grid-cols-12">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-600">Nama Layanan</label>
              <input
                type="text"
                required
                placeholder="Misal: TONER CANON IR"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600">Kategori</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ServiceItem['category'])}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600">Harga (Rp)</label>
              <input
                type="number"
                placeholder="Kosong = Tanya Admin"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600">Satuan</label>
              <input
                type="text"
                placeholder="Lembar / Kg / Unit"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-600">Catatan / Ketentuan</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Keterangan bahan/syarat..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? '...' : 'Simpan'}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Daftar Layanan Database ({services.length} Item)
            </h2>
            <input
              type="text"
              placeholder="Cari layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-blue-600 focus:outline-none sm:w-72"
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">Memuat data dari Supabase...</div>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500">
                    <th className="px-4 py-3">Nama Layanan</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Harga (Rp)</th>
                    <th className="px-4 py-3">Satuan</th>
                    <th className="px-4 py-3">Catatan</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredServices.map((item) => {
                    const isEditing = editingId === item.id;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full rounded border border-blue-400 px-2 py-1 text-xs"
                            />
                          ) : (
                            item.name
                          )}
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-600">
                          {isEditing ? (
                            <select
                              value={editForm.category || item.category}
                              onChange={(e) =>
                                setEditForm({ ...editForm, category: e.target.value as ServiceItem['category'] })
                              }
                              className="rounded border border-blue-400 px-2 py-1 text-xs"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="rounded bg-slate-100 px-2 py-0.5 font-medium">{item.category}</span>
                          )}
                        </td>

                        <td className="px-4 py-3 font-bold text-blue-700">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editForm.price ?? ''}
                              placeholder="Kosong = Custom"
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  price: e.target.value === '' ? null : Number(e.target.value),
                                })
                              }
                              className="w-28 rounded border border-blue-400 px-2 py-1 text-xs"
                            />
                          ) : item.price !== null ? (
                            `Rp ${item.price.toLocaleString('id-ID')}`
                          ) : (
                            <span className="text-xs font-medium text-amber-600">Tanya Admin</span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-xs text-slate-600">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.unit || ''}
                              onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                              className="w-24 rounded border border-blue-400 px-2 py-1 text-xs"
                            />
                          ) : (
                            item.unit
                          )}
                        </td>

                        <td className="max-w-xs px-4 py-3 text-xs text-slate-500">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.note || ''}
                              onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
                              className="w-full rounded border border-blue-400 px-2 py-1 text-xs"
                            />
                          ) : (
                            item.note
                          )}
                        </td>

                        <td className="px-4 py-3 text-right text-xs">
                          {isEditing ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                disabled={saving}
                                className="rounded bg-emerald-600 px-2.5 py-1 font-semibold text-white hover:bg-emerald-700"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="rounded bg-slate-200 px-2.5 py-1 font-semibold text-slate-700"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingId(item.id);
                                  setEditForm({ ...item });
                                }}
                                className="rounded bg-blue-50 px-2.5 py-1 font-semibold text-blue-700 hover:bg-blue-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.name)}
                                className="rounded bg-rose-50 px-2.5 py-1 font-semibold text-rose-700 hover:bg-rose-100"
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
