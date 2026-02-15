# Alperen Manas Portfolio

## Available Routes
- `/` portfolio homepage
- `/projects/[slug]` project detail pages
- `/roadmap` public roadmap hiring view (timeline, progress, deep dive)
- `/admin` owner-gated roadmap admin panel (Supabase auth + RLS)

## Local Setup
1. Install dependencies:
   - `npm install`
2. Configure environment:
   - copy `.env.example` to `.env.local`
   - set Supabase URL/anon key/owner uid values
3. Run development server:
   - `npm run dev`

## Supabase Setup
- Execute `supabase/schema.sql`
- Execute `supabase/rls.sql`
- Insert owner user id into `admin_owners`

See `docs/roadmap-admin-spec.md` for details.
