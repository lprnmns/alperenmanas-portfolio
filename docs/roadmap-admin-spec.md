# Roadmap + Admin Setup Notes

## Overview
- `/roadmap` is a public, animated hiring view with filters, timeline/gantt, artifacts, and weekly deep dive cards.
- `/admin` is a client-authenticated panel for daily updates.
- Security is enforced by Supabase RLS policies, not by route hiding.

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_OWNER_UID`
- `NEXT_PUBLIC_SITE_URL`

Use `.env.example` as the baseline and set real values only in local/host environment variables.

## Supabase SQL Setup
1. Run `supabase/schema.sql`.
2. Run `supabase/rls.sql`.
3. Insert the owner account uid into `admin_owners`:

```sql
insert into public.admin_owners (user_id)
values ('<OWNER_AUTH_UID>')
on conflict (user_id) do nothing;
```

## RLS Model
- Public reads:
  - `roadmap_items`, `daily_logs`, `artifacts` where `is_public = true`.
- Owner writes:
  - create/update/delete only for owner accounts recorded in `admin_owners`.
  - policies also require row-level `user_id = auth.uid()`.

## Static Export Compatibility
- Project uses `next.config.js` with `output: 'export'`.
- Auth and CRUD are client-only flows using Supabase JS.
- No API routes, no middleware guards, no server session checks.

## Data Model
- `roadmap_items`
- `daily_logs`
- `artifacts`
- `tags` (optional)
- `roadmap_item_tags` (optional join)

Core fields included:
- status enum
- planned/actual hours
- public/private visibility
- sort order
- date ranges
- artifact links
