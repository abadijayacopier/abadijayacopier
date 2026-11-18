import { createClient } from '@supabase/supabase-js';
import { SERVICES_DATA, ServiceItem } from '@/data/abadiJayaData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function fetchServicesFromDB(): Promise<ServiceItem[]> {
  if (!supabase) return SERVICES_DATA;

  const { data, error } = await supabase
    .from('services')
    .select('id, name, category, price, unit, note')
    .order('created_at', { ascending: true });

  if (error || !data || data.length === 0) {
    return SERVICES_DATA;
  }

  return data as ServiceItem[];
}
