alter table public.pricing_leads
add column if not exists state text;

update public.pricing_leads
set state = coalesce(state, '')
where state is null;

alter table public.pricing_leads
alter column state set not null;

create index if not exists idx_pricing_leads_state on public.pricing_leads (state);
