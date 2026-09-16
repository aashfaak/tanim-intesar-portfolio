# Notes on the In-Between — Personal Journal & Portfolio

A personal digital magazine for an IBA student — journal entries, travel
stories, a blog, and a photo gallery — with a real admin dashboard for
adding, editing, and deleting content, backed by Firebase.

## Stack

- Next.js 15 (App Router) + React + TypeScript (strict mode)
- Tailwind CSS
- Framer Motion for subtle, reduced-motion-aware animation
- Lucide React icons
- **Firebase Authentication** — gates the `/admin` dashboard
- **Firebase Firestore** — stores every journal entry, travel story, blog
  article, and gallery photo; the public site reads live from it

## 1. Install and run

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The site will run, but the public pages
will show "nothing here yet" messages until you connect a Firebase project
and add content (steps below).

## 2. Set up Firebase

### Create the project
1. Go to https://console.firebase.google.com and create a new project (or
   reuse an existing one — a new one is cleaner for this).
2. In the project, click **Build → Authentication → Get started**, then
   enable the **Email/Password** sign-in method.
3. Still in Authentication, go to the **Users** tab and **add one user** —
   an email and password for whoever will manage the site (you, or your
   friend). This is the only account that will be able to sign in to
   `/admin`. There's no self-signup on this site by design.
4. Click **Build → Firestore Database → Create database**. Start in
   **production mode** (the security rules below handle access).

### Get your web app config
1. In Project settings (gear icon, top left) → **General** → scroll to
   **Your apps** → click the `</>` (web) icon to register a new web app.
2. Copy the `firebaseConfig` values it gives you.
3. In this project, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
4. Paste each value from `firebaseConfig` into the matching
   `NEXT_PUBLIC_FIREBASE_...` line in `.env.local`.
5. Restart `npm run dev` after saving `.env.local` (env files are only read
   on startup).

### Publish the security rules
1. In the Firebase console: **Firestore Database → Rules**.
2. Replace the contents with what's in `firestore.rules` in this project,
   then click **Publish**.
3. These rules mean: anyone can *read* content (so the public site works
   for visitors), but only a *signed-in* user can create, edit, or delete
   anything — which is exactly your one admin account.

## 3. Sign in and add content

1. Visit `http://localhost:3000/admin/login` and sign in with the email/
   password you created in Firebase Authentication.
2. You'll land on `/admin` — an overview with counts for each content type.
3. **First time only:** click "Seed starter content" (or go to
   `/admin/seed` directly) to copy the original placeholder journal
   entries, travel stories, blog posts, and gallery photos into your new,
   empty Firestore database. This just gives you something to look at and
   edit — running it twice will create duplicates, so only do it once.
4. From there, use the Journal / Travel / Blog / Gallery tabs to add, edit,
   or delete anything. Changes appear on the public site immediately.

## Project structure

```
app/
  page.tsx              homepage (reads live content from Firestore)
  about/                /about
  journal/, travel/, blog/    public archives + [slug] detail pages
  contact/              /contact
  admin/                the whole admin dashboard
    login/              sign-in page
    journal/, travel/, blog/, gallery/   list + create + edit + delete
    seed/               one-click starter content loader
components/
  admin/                admin-only UI (forms, nav, list view)
  ...                   shared public-site components
lib/
  firebase.ts           Firebase app/auth/Firestore initialization
  auth-context.tsx      React context wrapping Firebase Auth state
  collections.ts        generic Firestore CRUD helpers
  types.ts              shared content types (Journal/Travel/Blog/Gallery)
data/
  site.ts               site name, nav, social links, "Currently" list —
                         still plain config, edit this file directly
  journal.ts, travel.ts, blog.ts, gallery.ts
                         original placeholder content, used only by the
                         one-time seed script now (not read by the live site)
```

## Personal details

`data/site.ts` is still plain config (not in Firestore) — edit it directly
to set the real name, email, and social links shown in the nav, footer, and
contact page.

## What's stubbed for later

- **Newsletter & contact form**: both validate on the client only. Each has
  a `TODO(integration)` comment marking where to add a call to Resend,
  Supabase, or Formspree to actually receive submissions.
- **Image uploads**: the admin forms take image URLs (paste a link), not
  file uploads. Adding real uploads would mean wiring in Firebase Storage —
  happy to add that next if it'd help.
- **Sitemap**: `app/sitemap.ts` currently lists only the static routes
  (home, about, journal, travel, blog, contact) since post content now
  lives in Firestore rather than being available at build time. It can be
  upgraded to include individual post URLs later if needed.

## A note on how content loads

Public pages fetch from Firestore client-side (in the browser), rather than
at build time or on the server. This keeps the Firebase setup simple — no
service account keys needed — but it means individual post pages don't
have fully dynamic per-post SEO metadata (page titles are generic rather
than post-specific), and there's a brief "Loading…" moment on first paint.
For a personal journal site this is a reasonable tradeoff; it can be
upgraded later with the `firebase-admin` SDK for full server-side rendering
if search-engine visibility of individual posts becomes a priority.

## Deployment

Push this repository to GitHub and import it in Vercel. Add the same
`NEXT_PUBLIC_FIREBASE_...` environment variables from `.env.local` to your
Vercel project's **Settings → Environment Variables** — the site won't be
able to reach Firebase in production without them.
