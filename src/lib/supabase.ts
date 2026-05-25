import { createClient } from "@supabase/supabase-js";

const fallbackUrl = "https://agfiriulerfoffsrails.supabase.co";
const fallbackAnonKey = "sb_publishable_plQV_nEQJMqBMYbIH5iqwg_H4dtulHU";

const url = (import.meta.env.VITE_SUPABASE_URL as string) || fallbackUrl;
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || fallbackAnonKey;

export function getSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
  }
  return createClient(url, anonKey);
}
