create table if not exists public.pricing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  city text not null,
  country text not null,
  phone text not null,
  professionals_range text not null,
  lang text not null check (lang in ('pt', 'en', 'es')),
  source_path text not null,
  source_query text not null,
  user_agent text
);

alter table public.pricing_leads enable row level security;
revoke all on public.pricing_leads from anon, authenticated;

create index if not exists idx_pricing_leads_created_at on public.pricing_leads (created_at desc);
create index if not exists idx_pricing_leads_lang on public.pricing_leads (lang);
create index if not exists idx_pricing_leads_country on public.pricing_leads (country);
