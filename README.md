# VYBE pre-launch website

Minimal public site: landing page, newsletter signup, privacy policy.

No app routes, no admin, no ingestion — safe to deploy publicly on Vercel.

## Local dev

```bash
cd website
npm install
cp .env.example .env.local
# fill in Supabase URL + service role key
npm run dev
```

Open http://localhost:3001

## Deploy to Vercel

### Option A — separate GitHub repo (recommended)

1. Create a new repo (can be **public**)
2. Copy only the contents of this `website/` folder into it
3. [vercel.com/new](https://vercel.com/new) → import repo
4. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy

### Option B — monorepo

1. Push the full Evently project to a **private** GitHub repo
2. Import on Vercel
3. Set **Root Directory** to `website`
4. Add the same env vars

## Supabase

Run `supabase/migrations/002_waitlist.sql` in the Supabase SQL editor (from the main project) if you have not already.

Newsletter signups go to the `waitlist` table.

## What is NOT included

- `/list`, `/map`, chat, admin, events API
- Mobile app code
- Ingestion scripts

The full app stays on your machine until you deploy it separately at launch.
