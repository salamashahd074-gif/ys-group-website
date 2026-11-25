-- Before running: create the owner user in Supabase Auth, then replace
-- OWNER_AUTH_USER_UUID below with that user's Auth ID.
-- Never put a service_role key in the website or this file.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  company_name text,
  product text not null,
  quantity integer not null default 1 check (quantity between 1 and 10000),
  request_type text not null check (request_type in ('business_quote', 'contact', 'order')),
  message text,
  payment_method text,
  consent boolean not null default false check (consent),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'in_progress', 'completed', 'cancelled'))
);

create index if not exists orders_created_at_id_idx
  on public.orders (created_at desc, id desc);

alter table public.orders enable row level security;

revoke all on table public.orders from public, anon, authenticated;
grant insert (customer_name, phone, company_name, product, quantity, request_type, message, payment_method, consent)
  on table public.orders to anon;
grant select on table public.orders to authenticated;
grant update (status) on table public.orders to authenticated;

drop policy if exists "Public can submit consented requests" on public.orders;
create policy "Public can submit consented requests"
  on public.orders for insert to anon
  with check (
    consent is true
    and status = 'new'
    and length(trim(customer_name)) between 1 and 160
    and length(trim(phone)) between 6 and 40
    and length(trim(product)) between 1 and 200
    and (company_name is null or length(company_name) <= 200)
    and (message is null or length(message) <= 4000)
    and (payment_method is null or length(payment_method) <= 120)
  );

drop policy if exists "Owner can read requests" on public.orders;
create policy "Owner can read requests"
  on public.orders for select to authenticated
  using (auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid);

drop policy if exists "Owner can update request status" on public.orders;
create policy "Owner can update request status"
  on public.orders for update to authenticated
  using (auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid)
  with check (auth.uid() = 'OWNER_AUTH_USER_UUID'::uuid);
