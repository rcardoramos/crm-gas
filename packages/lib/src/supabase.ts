import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Detecta si Supabase está realmente configurado
export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseKey.length > 0 &&
  !supabaseUrl.includes('yoursupabaseurl') &&
  !supabaseKey.includes('your-anon-key');

// Usamos URLs válidas como fallback para evitar errores de WebSocket
// El cliente se crea pero NO abrirá conexiones reales si no está configurado
const safeUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const safeKey = isSupabaseConfigured ? supabaseKey : 'placeholder-key';

export const supabase = createClient<Database>(safeUrl, safeKey, {
  realtime: {
    // Deshabilita autoconexión al Realtime si no hay credenciales reales
    params: { eventsPerSecond: isSupabaseConfigured ? 10 : 0 },
  },
  ...(isSupabaseConfigured ? {} : {
    auth: { persistSession: false, autoRefreshToken: false },
  }),
});

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.info(
    '[Gas en Minutos] Supabase no configurado. Ejecutando en modo mock.\n' +
    'Crea apps/web/.env.local y apps/admin/.env.local con tus credenciales.\n' +
    'Ver: SUPABASE_SETUP.md'
  );
}
