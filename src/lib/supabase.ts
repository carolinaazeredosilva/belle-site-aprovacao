import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export function getSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
  }
  return createClient(url, anonKey);
}
