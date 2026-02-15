create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'roadmap_status_enum') then
    create type public.roadmap_status_enum as enum ('planned', 'in_progress', 'blocked', 'done');
  end if;

  if not exists (select 1 from pg_type where typname = 'artifact_type_enum') then
    create type public.artifact_type_enum as enum ('pr', 'demo', 'blog', 'repo', 'doc', 'other');
  end if;
end $$;

create table if not exists public.admin_owners (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.roadmap_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  summary text,
  phase text not null,
  status public.roadmap_status_enum not null default 'planned',
  planned_hours numeric(6,2) not null default 0,
  actual_hours numeric(6,2) not null default 0,
  start_date date not null,
  end_date date,
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  roadmap_item_id uuid not null references public.roadmap_items(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  title text not null,
  notes text,
  status public.roadmap_status_enum,
  planned_hours numeric(6,2) not null default 0,
  actual_hours numeric(6,2) not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artifacts (
  id uuid primary key default gen_random_uuid(),
  roadmap_item_id uuid references public.roadmap_items(id) on delete cascade,
  daily_log_id uuid references public.daily_logs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.artifact_type_enum not null default 'other',
  title text not null,
  url text not null check (url ~* '^https?://'),
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint artifacts_parent_check check (
    roadmap_item_id is not null
    or daily_log_id is not null
  )
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.roadmap_item_tags (
  roadmap_item_id uuid not null references public.roadmap_items(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (roadmap_item_id, tag_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_roadmap_items_updated_at on public.roadmap_items;
create trigger trg_roadmap_items_updated_at
before update on public.roadmap_items
for each row
execute function public.set_updated_at();

drop trigger if exists trg_daily_logs_updated_at on public.daily_logs;
create trigger trg_daily_logs_updated_at
before update on public.daily_logs
for each row
execute function public.set_updated_at();

create index if not exists idx_roadmap_items_public_phase_status
  on public.roadmap_items (is_public, phase, status, sort_order, start_date);

create index if not exists idx_roadmap_items_user
  on public.roadmap_items (user_id);

create index if not exists idx_daily_logs_item_date
  on public.daily_logs (roadmap_item_id, log_date desc, is_public);

create index if not exists idx_daily_logs_user
  on public.daily_logs (user_id);

create index if not exists idx_artifacts_item_sort
  on public.artifacts (roadmap_item_id, sort_order, is_public);

create index if not exists idx_artifacts_log
  on public.artifacts (daily_log_id);

create index if not exists idx_tags_user_name
  on public.tags (user_id, name);
