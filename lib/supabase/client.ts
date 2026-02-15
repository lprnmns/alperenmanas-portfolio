import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

function getRequiredEnvValue(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('Supabase browser client can only be used in client components.');
  }

  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = getRequiredEnvValue('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getRequiredEnvValue('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}

export function getOwnerUid(): string | null {
  const ownerUid = process.env.NEXT_PUBLIC_OWNER_UID?.trim();
  if (!ownerUid) {
    return null;
  }
  return ownerUid;
}
