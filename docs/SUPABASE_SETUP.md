# Supabase setup guide (first time)

Follow these steps to get iPeer connected to Supabase.

---

## Step 1: Create a Supabase account

1. Go to **https://supabase.com**
2. Click **Start your project**
3. Sign up with **GitHub** (easiest) or email
4. Confirm your email if asked

---

## Step 2: Create a new project

1. After logging in, click **New project**
2. Choose your **Organization** (or create one if it’s your first time)
3. Fill in:
   - **Name:** e.g. `ipeer` (anything you like)
   - **Database password:** Create a strong password and **save it somewhere safe** (you need it to connect to the DB later)
   - **Region:** Pick one close to you (e.g. Southeast Asia if you’re there)
4. Click **Create new project**
5. Wait 1–2 minutes until the project is ready (you’ll see the dashboard)

---

## Step 3: Get your API keys and URL

1. In the left sidebar, click **Project Settings** (gear icon at the bottom)
2. Click **API** in the left menu
3. You’ll see:
   - **Project URL** — looks like `https://abcdefghijk.supabase.co`
   - **Project API keys** — two keys:
     - **anon public** — safe to use in the browser (we use this one)
     - **service_role** — secret, never use in frontend; we don’t need it for iPeer
4. Copy:
   - The **Project URL**
   - The **anon public** key (long string starting with `eyJ...`)

---

## Step 4: Create the `feedback` table

1. In the left sidebar, click **SQL Editor**
2. Click **New query**
3. Paste this entire SQL and then click **Run** (or press Cmd+Enter):

```sql
-- Creates the table for iPeer feedback
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  recipient text not null,
  what_i_like text not null,
  can_improve text not null,
  created_at timestamptz default now()
);

-- Allow anyone to read and submit feedback (anonymous app)
alter table public.feedback enable row level security;

create policy "Allow anonymous read"
  on public.feedback for select
  using (true);

create policy "Allow anonymous insert"
  on public.feedback for insert
  with check (true);
```

4. You should see **Success. No rows returned.** That’s correct.
5. (Optional) In the left sidebar, open **Table Editor** — you should see a table named `feedback` with columns: `id`, `recipient`, `what_i_like`, `can_improve`, `created_at`.

---

## Step 5: Connect iPeer to Supabase

1. In your project folder, create a file named **`.env.local`** (same folder as `package.json`).
2. Open `.env.local` and add these two lines, using **your** Project URL and anon key from Step 3:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-full-key
```

Replace:
- `https://YOUR_PROJECT_ID.supabase.co` with your **Project URL**
- `eyJ...your-full-key` with your full **anon public** key (one long line, no spaces)

3. Save the file.
4. **Important:** Restart your dev server:
   - Stop it (Ctrl+C in the terminal)
   - Run: `npm run dev -- -p 3000`
5. Open **http://localhost:3000** — the app should load and you can submit and view feedback.

---

## Checklist

- [ ] Supabase account created
- [ ] New project created and ready
- [ ] Project URL and anon key copied from **Project Settings → API**
- [ ] SQL run in **SQL Editor** to create `feedback` table and policies
- [ ] `.env.local` created with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Dev server restarted

If something fails, double-check that the values in `.env.local` have no extra spaces or quotes and that you restarted the dev server after creating or editing `.env.local`.
