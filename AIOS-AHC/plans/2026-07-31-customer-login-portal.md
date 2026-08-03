# Plan: Customer Login Portal (Maintenance Requests MVP)

**Created:** 2026-07-31
**Status:** Draft
**Request:** Add a login portal for existing AHC customers to view their property portfolio and submit maintenance requests. Additional portal features will come later — this plan covers the foundation only.

---

## Overview

### What This Plan Accomplishes

Adds a password-protected customer portal to the website (`/portal/*`). Existing AHC customers can log in with an email and password, see the properties they've had built, and submit a maintenance request against one of those properties. New customers can also self-register, though their account starts with no properties attached until AHC links them.

### Why This Matters

This is the first "customer-facing data" feature on the site — everything built so far is public marketing content. It starts turning the website into a real service channel: customers get a self-serve way to raise maintenance issues instead of only phone/email, and it lays the groundwork for the "additional elements at a later stage" Natalie mentioned (e.g. document downloads, request status tracking, warranty info).

---

## Current State

### Relevant Existing Structure

- `outputs/website/app/` — Next.js App Router pages, one folder per route (e.g. `app/contact/page.tsx`).
- `outputs/website/app/api/enquiry/route.ts` — the only existing API route; a placeholder that just `console.log`s form submissions, no database involved.
- `outputs/website/components/Nav.tsx` — single source of truth for the header nav (`NAV_ITEMS` array), rendered for both desktop and mobile.
- `outputs/website/lib/content.ts` — real business content (contact details, etc.), a pattern for typed data files.
- `outputs/website/.env.example` — documents environment variables; real secrets go in `.env.local` (gitignored), never committed.
- `outputs/website/README.md` — documents the deployment process: push to GitHub, import into Vercel, root directory `outputs/website`.
- `package.json` — no database client, no auth library, no session handling of any kind currently installed.

### Gaps or Problems Being Addressed

- There is **no database and no authentication** anywhere in this codebase today. This plan introduces both for the first time.
- There is no concept of a "customer" or "property" as data — everything on the site is static marketing content.
- Passwords must never be hand-rolled (hashing, session tokens, reset flows are easy to get subtly wrong and are a real security risk). This plan deliberately uses a managed auth provider instead of custom code.

---

## Proposed Changes

### Summary of Changes

- Add **Supabase** (hosted Postgres database + built-in authentication) as the backend for accounts, properties, and maintenance requests. Chosen because it works cleanly with Vercel (the confirmed deployment target), has a generous free tier, and means password hashing/session security is handled by a vetted provider rather than custom code.
- Add three database tables: `profiles`, `properties`, `maintenance_requests`, each with Row Level Security so a customer can only ever see their own data.
- Add new `/portal` routes: login, signup, dashboard (property list), property detail, and a maintenance request form + request history.
- Add `middleware.ts` to block access to any `/portal/*` page unless logged in.
- Add a "Client Login" link to the site header nav.
- Add three new environment variables (Supabase URL + two keys) and update `.env.example`.
- Add two new dependencies: `@supabase/ssr` and `@supabase/supabase-js`.

### New Files to Create

| File Path | Purpose |
| --- | --- |
| `outputs/website/lib/supabase/client.ts` | Supabase client for use in browser/client components |
| `outputs/website/lib/supabase/server.ts` | Supabase client for use in server components & route handlers (reads/writes the auth cookie) |
| `outputs/website/middleware.ts` | Redirects unauthenticated visitors away from `/portal/*` (except login/signup) |
| `outputs/website/app/portal/login/page.tsx` | Login page (email + password) |
| `outputs/website/app/portal/signup/page.tsx` | Self-registration page (email + password → creates a `profiles` row) |
| `outputs/website/app/portal/page.tsx` | Portal dashboard — lists the logged-in customer's properties |
| `outputs/website/app/portal/properties/[id]/page.tsx` | Single property detail + that property's maintenance request history |
| `outputs/website/app/portal/maintenance/new/page.tsx` | Submit a new maintenance request (choose property, category, description) |
| `outputs/website/app/portal/maintenance/page.tsx` | List of all the customer's maintenance requests across all properties |
| `outputs/website/app/portal/actions.ts` | Server actions: `login`, `signup`, `logout`, `submitMaintenanceRequest` |
| `outputs/website/components/portal/PortalNav.tsx` | Small header used inside `/portal/*` pages (customer name, logout button) |
| `supabase/schema.sql` | The SQL that creates the three tables and their Row Level Security policies — run once, manually, inside the Supabase project |

### Files to Modify

| File Path | Changes |
| --- | --- |
| `outputs/website/components/Nav.tsx` | Add a `{ href: "/portal/login", label: "Client Login" }` entry to `NAV_ITEMS` |
| `outputs/website/.env.example` | Document `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| `outputs/website/README.md` | Add a "Customer portal" section explaining the Supabase dependency and the manual setup step below |
| `outputs/website/package.json` | Add `@supabase/ssr` and `@supabase/supabase-js` dependencies |

### Files to Delete (if any)

None.

---

## Design Decisions

### Key Decisions Made

1. **Supabase over a hand-rolled auth system**: Password hashing, session cookies, and email verification are security-critical and easy to get wrong. Supabase Auth is a vetted, widely-used provider that handles all of this, and its Postgres database can hold the properties/maintenance data in the same place. This follows the workspace's "Borrow Before You Build" principle.
2. **Supabase over Vercel Postgres**: Functionally similar, but Supabase bundles authentication for free, so we get login + database from one provider instead of wiring a separate auth library on top of a bare database.
3. **Row Level Security (RLS) from day one**: Every table is locked down so a customer's queries can only ever return their own rows, enforced by the database itself — not just by the page code. This means even a future bug in a page component can't leak another customer's data.
4. **Admin provisioning via Supabase's built-in Table Editor, not a custom admin UI**: Natalie asked for "the basis for now" with more to come later. Building a full internal admin panel is significant extra scope. Supabase gives a free, spreadsheet-like table editor out of the box — Natalie can add a customer's properties there directly (a few clicks, no code) until a proper in-site admin tool is worth building. This is called out explicitly as a manual step below.
5. **Self-registration allowed, but new accounts start empty**: Per the "Both" answer — anyone can create a login, but a brand-new account has zero properties until Natalie attaches them via the Table Editor. The portal dashboard will show a friendly "No properties linked yet — contact us" message rather than an empty/broken-looking page.

### Alternatives Considered

- **NextAuth.js / Auth.js with a separate database**: More moving parts to wire together (auth library + database client + adapter), more code for me to write and Natalie to maintain, no material benefit over Supabase for this use case.
- **A local SQLite file**: Ruled out — the confirmed hosting target is Vercel, whose serverless functions don't have persistent local disk, so a SQLite file would silently reset/lose data between deploys.
- **Custom-built admin UI in this phase**: Deferred. Natalie described this as "the basis for now" with "additional elements at a later stage" — a full admin panel (with its own auth/permissions) is exactly that kind of later-stage addition, better scoped as its own plan once the customer-facing basics are proven.

### Open Questions

1. **Natalie needs to create the Supabase project herself.** I can write all the code, but I can't sign up for a third-party service on her behalf. Step 1 below is a short manual task for her (free, ~5 minutes) before I can wire up real credentials and test the live flow.
2. **Real customer/property data isn't something I can fabricate.** Once the schema exists, Natalie (or someone at AHC) needs to enter actual customers' properties via the Table Editor — this plan builds the machinery, not the data.
3. **Email deliverability for signup/password-reset emails**: Supabase's free tier sends these from a shared address with rate limits, fine for early testing but worth revisiting (a custom sending domain) before a real launch with many customers.

---

## Step-by-Step Tasks

### Step 0: Natalie creates the Supabase project (manual, not code)

**Actions:**

- Go to https://supabase.com, sign up (free), create a new project (any name, e.g. "ahc-website").
- In the project's Settings → API page, copy the **Project URL**, the **anon public key**, and the **service_role key**.
- Send those three values back so they can be added to `.env.local` (never committed to git).

**Files affected:** none (external setup step).

---

### Step 1: Install dependencies

**Actions:**

- `npm install @supabase/ssr @supabase/supabase-js` inside `outputs/website`.

**Files affected:**

- `outputs/website/package.json`
- `outputs/website/package-lock.json`

---

### Step 2: Add environment variables

**Actions:**

- Add to `outputs/website/.env.example`:
  ```
  # Customer portal — Supabase project credentials (see plans/2026-07-31-customer-login-portal.md)
  # NEXT_PUBLIC_SUPABASE_URL=
  # NEXT_PUBLIC_SUPABASE_ANON_KEY=
  # SUPABASE_SERVICE_ROLE_KEY=
  ```
- Once Natalie provides real values, create `outputs/website/.env.local` (gitignored) with the actual URL/keys so local dev and eventually the Vercel project's Environment Variables settings can use them.

**Files affected:**

- `outputs/website/.env.example`
- `outputs/website/.env.local` (not committed)

---

### Step 3: Create the database schema

**Actions:**

- Write `supabase/schema.sql` defining:
  - `profiles` (`id uuid references auth.users primary key`, `full_name text`, `phone text`, `created_at timestamptz default now()`)
  - `properties` (`id uuid primary key default gen_random_uuid()`, `owner_id uuid references profiles(id)`, `address text`, `suburb text`, `state text`, `postcode text`, `design_name text`, `completion_date date`, `image_url text`, `created_at timestamptz default now()`)
  - `maintenance_requests` (`id uuid primary key default gen_random_uuid()`, `property_id uuid references properties(id)`, `owner_id uuid references profiles(id)`, `category text`, `description text`, `status text default 'new'`, `created_at timestamptz default now()`)
  - A trigger that auto-creates a `profiles` row whenever a new `auth.users` row is created (so every signed-up user automatically gets a profile).
  - RLS policies on all three tables: `select`/`insert` restricted to rows where `owner_id = auth.uid()` (properties/requests) or `id = auth.uid()` (profiles).
- Natalie (or I, walking her through it) pastes this file's contents into the Supabase project's SQL Editor and runs it once.

**Files affected:**

- `supabase/schema.sql`

---

### Step 4: Add Supabase client helpers

**Actions:**

- `outputs/website/lib/supabase/client.ts`: exports a `createClient()` using `@supabase/ssr`'s `createBrowserClient`, reading `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `outputs/website/lib/supabase/server.ts`: exports an async `createClient()` using `@supabase/ssr`'s `createServerClient`, wired to Next's `cookies()` so server components/actions can read the logged-in user's session.

**Files affected:**

- `outputs/website/lib/supabase/client.ts`
- `outputs/website/lib/supabase/server.ts`

---

### Step 5: Add route protection

**Actions:**

- `outputs/website/middleware.ts`: for any request under `/portal`, check the Supabase session (via the server client). If there's no session and the path isn't `/portal/login` or `/portal/signup`, redirect to `/portal/login`. If there **is** a session and the path is `/portal/login` or `/portal/signup`, redirect to `/portal` (dashboard).

**Files affected:**

- `outputs/website/middleware.ts`

---

### Step 6: Build login / signup / logout

**Actions:**

- `outputs/website/app/portal/actions.ts`: server actions `login(formData)`, `signup(formData)`, `logout()` using the Supabase server client (`signInWithPassword`, `signUp`, `signOut`).
- `outputs/website/app/portal/login/page.tsx`: simple form (email, password), styled consistently with the rest of the site (reuse existing input/button classes from `EnquiryForm.tsx`), calls the `login` action, shows validation/error messages.
- `outputs/website/app/portal/signup/page.tsx`: same pattern for `signup`, plus a name field (stored in `profiles.full_name`).

**Files affected:**

- `outputs/website/app/portal/actions.ts`
- `outputs/website/app/portal/login/page.tsx`
- `outputs/website/app/portal/signup/page.tsx`

---

### Step 7: Build the portal dashboard and property detail pages

**Actions:**

- `outputs/website/components/portal/PortalNav.tsx`: small bar shown on every `/portal/*` page — customer's name/email, a logout button, links to Dashboard and Maintenance Requests.
- `outputs/website/app/portal/page.tsx`: server component, queries `properties` for the logged-in user, renders a card per property (address, design name, completion date, thumbnail). If zero properties, shows "No properties linked to your account yet — contact AHC and we'll get this sorted" with the real phone/email from `lib/content.ts`.
- `outputs/website/app/portal/properties/[id]/page.tsx`: property details plus that property's `maintenance_requests`, newest first, with status shown.

**Files affected:**

- `outputs/website/components/portal/PortalNav.tsx`
- `outputs/website/app/portal/page.tsx`
- `outputs/website/app/portal/properties/[id]/page.tsx`

---

### Step 8: Build maintenance request submission + history

**Actions:**

- Add `submitMaintenanceRequest(formData)` to `outputs/website/app/portal/actions.ts` — inserts a row into `maintenance_requests` scoped to the logged-in user.
- `outputs/website/app/portal/maintenance/new/page.tsx`: form with a property dropdown (only that customer's properties), category dropdown (e.g. Plumbing, Electrical, Structural, Appliances, Other), and a description textarea.
- `outputs/website/app/portal/maintenance/page.tsx`: table/list of all the customer's requests across every property, with status.

**Files affected:**

- `outputs/website/app/portal/actions.ts`
- `outputs/website/app/portal/maintenance/new/page.tsx`
- `outputs/website/app/portal/maintenance/page.tsx`

---

### Step 9: Add the nav link and update docs

**Actions:**

- Add `{ href: "/portal/login", label: "Client Login" }` to `NAV_ITEMS` in `components/Nav.tsx`.
- Add a "Customer portal" section to `README.md` explaining the Supabase dependency, where the schema file lives, and how to add a customer's properties via the Table Editor.

**Files affected:**

- `outputs/website/components/Nav.tsx`
- `outputs/website/README.md`

---

### Step 10: Build, verify, and manual test

**Actions:**

- Run `npm run build` — must pass clean (same standard as every other change in this project).
- Restart the dev server, clear `.next/dev/cache/images` per the established ritual.
- Manually test: sign up a test account → confirm it can log in → confirm dashboard shows the "no properties" empty state → in the Supabase Table Editor, manually attach a test property to that account → reload and confirm it now appears → submit a maintenance request → confirm it appears in the request history → log out → confirm `/portal` redirects to `/portal/login` when logged out.
- Screenshot each screen via Playwright for visual confirmation, following the pattern used throughout this project.

**Files affected:** none (validation step).

---

## Connections & Dependencies

### Files That Reference This Area

- `components/Nav.tsx` gains one new link; no other existing page currently links anywhere related to a portal.
- `lib/content.ts` (`CONTACT`) is reused for the "no properties yet, contact us" empty state — no changes needed there, just imported.

### Updates Needed for Consistency

- `README.md` "Known placeholders" section should eventually note that portal email templates (signup confirmation, password reset) are on Supabase's default free-tier sender and should be customised/branded before a wide customer rollout.

### Impact on Existing Workflows

- None of the existing public marketing pages change. This is purely additive under `/portal/*`.
- Introduces the project's first environment-variable *requirement* (previously all env vars were optional placeholders) — local dev for anyone else on this project will need their own `.env.local` with Supabase credentials to run the portal pages (public pages still work without it).

---

## Validation Checklist

- [ ] `npm run build` passes with no TypeScript/lint errors
- [ ] Visiting `/portal` while logged out redirects to `/portal/login`
- [ ] A new account can be created via `/portal/signup`
- [ ] A newly created account sees the "no properties yet" empty state, not an error
- [ ] A property manually added in Supabase's Table Editor appears on that customer's dashboard after refresh
- [ ] A maintenance request can be submitted against a property and shows up in that customer's request history
- [ ] Logging out clears the session and blocks `/portal/*` again
- [ ] No customer can see another customer's properties or requests (test with two separate test accounts)
- [ ] "Client Login" link appears correctly in both desktop and mobile nav

---

## Success Criteria

The implementation is complete when:

1. An existing AHC customer, once Natalie has added their properties via the Table Editor, can log in and see their real property portfolio.
2. That customer can submit a maintenance request tied to a specific property and see it in their own history.
3. No unauthenticated visitor, and no other customer, can see anyone else's property or request data.
4. The site still builds and deploys the same way as before (`npm run build` clean, same Vercel deployment process).

---

## Notes

- This plan deliberately stops at "customer submits a request, Natalie can see it via Supabase's Table Editor." A proper in-site admin view (AHC staff seeing/updating request status without leaving the website) is a natural next plan once this foundation is live and tested.
- Also natural next steps, not built here: password reset flow polish/branding, document downloads per property (warranty PDFs, plans), photo upload on maintenance requests, email notifications to AHC staff when a new request comes in.
- Supabase's free tier is generous (500MB database, 50,000 monthly active users) and plenty for this use case at AHC's current scale — no cost implication to flag yet.
