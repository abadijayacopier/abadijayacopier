import { createClient } from '@supabase/supabase-js';
import { SERVICES_DATA, ServiceItem } from '@/data/abadiJayaData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://geminfxqctxkmfmskinp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_h-uwc2fq6jgdEjd9XyMuyA_nqfpM64S';

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Ambil seluruh layanan dari Supabase (otomatis fallback ke data lokal jika belum dikonfigurasi)
export async function fetchServicesFromDB(): Promise<ServiceItem[]> {
  if (!supabase) return SERVICES_DATA;

  const { data, error } = await supabase
    .from('services')
    .select('id, name, category, price, unit, note')
    .order('created_at', { ascending: true });

  if (error || !data) {
    console.error('Gagal memuat data Supabase:', error?.message);
    return SERVICES_DATA;
  }

  return data as ServiceItem[];
}