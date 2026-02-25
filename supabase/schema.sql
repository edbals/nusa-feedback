-- Run this in the Supabase SQL Editor to create the feedback table.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  recipient text not null,
  what_i_like text not null,
  can_improve text not null,
  created_at timestamptz default now()
);

-- Optional: enable RLS but allow anonymous read/write for this demo.
-- For production you might restrict inserts to authenticated users or add rate limiting.
alter table public.feedback enable row level security;

create policy "Allow anonymous read"
  on public.feedback for select
  using (true);

create policy "Allow anonymous insert"
  on public.feedback for insert
  with check (true);
