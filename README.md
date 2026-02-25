# iPeer — Anonymous Peer Feedback

A minimal full-stack web app for giving and viewing anonymous peer feedback. Built with Next.js (App Router), Tailwind CSS, and Supabase.

## People

- Clementie Freya  
- Ibrasya Pohan  
- Keanan Wongso  
- Edbert Sunarpo  

## Setup

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd ipeer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**  
   Copy the example env file and add your Supabase credentials:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key  

   Get these from **Supabase Dashboard → Project Settings → API**.

4. **Create the database table**  
   In the Supabase Dashboard, open **SQL Editor** and run the contents of `supabase/schema.sql` to create the `feedback` table and RLS policies.

5. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push your code to GitHub and import the project in [Vercel](https://vercel.com).
2. In the Vercel project **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy. The app will use the same Supabase database.

## Tech stack

- **Next.js 14** (App Router), **React 18**  
- **Tailwind CSS**  
- **Supabase** (PostgreSQL + JS client)  

## License

MIT
# nusa-feedback
