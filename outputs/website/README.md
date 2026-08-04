# Affordable House Corp — Website

Custom-built marketing site for Affordable House Corp (Next.js, TypeScript, Tailwind CSS). See the full build plan at `../../plans/2026-07-13-affordable-house-corp-website.md`.

## Running locally

```bash
npm run dev
```

Open http://localhost:3000. On this machine, if `node`/`npm` aren't on your PATH yet, add Node.js to PATH for the session first:

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

(This is only needed until you restart your terminal after installing Node.js — after that it resolves automatically.)

## What's built

- Pages: Home, About, Services (+ dedicated Rooming Accommodation page), Process, Build Calculator, Colour Selection, Contact
- SEO: per-page metadata, auto-generated `sitemap.xml` and `robots.txt` (see `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts`)
- Enquiry form (`components/EnquiryForm.tsx`) submitting to a placeholder API route (`app/api/enquiry/route.ts`)
- Real content ported over from Natalie's earlier Replit mockup (`C:\Users\billi\Downloads\affordable-house-corp-website`): six service lines, track-record stats, six customer testimonials, real contact details, and six external + six internal colour selection packages with real generated photography (`lib/content.ts`, `lib/colours.ts`, `public/images/`)

## Known placeholders — swap before going live

1. **Build Calculator pricing** (`lib/calculator-logic.ts`) — the $/m² rates are illustrative, not real. Replace `PROPERTY_TYPE_RATES` with actual figures.
2. **Logo and brand colours** (`app/globals.css`, `components/Nav.tsx`, `components/Footer.tsx`) — currently a text logo and a neutral slate/amber theme. Swap in the final logo and brand colours once the Canva project finishes.
3. **Enquiry form submission** (`app/api/enquiry/route.ts`) — currently just logs to the server console. Wire up to a real email service (e.g. Resend), form backend (e.g. Formspree), or CRM webhook before launch.
4. **Domain** (`lib/seo.ts` → `SITE_URL`) — currently a placeholder domain. Update once a real domain is connected.
5. **Supplier brand logos** (`lib/content.ts` → `SUPPLIERS`) — the logo image files in the Replit mockup were broken (failed downloads saved as HTML 404 pages, not real images), so the "Built with Premium Brands" section currently shows text tiles instead of real logos. Get proper logo files from each supplier (Laminex, Wattyl, Corinthian Doors, Colorbond, Beaumont Tiles, Clipsal, James Hardie, Austral Bricks, Dowell) and swap in.

## Deploying

1. Push this repo to GitHub (the workspace root is already git-initialized — see the root `.gitignore`).
2. Go to https://vercel.com, sign in with GitHub, and import the repository.
3. Set the Vercel project's **root directory** to `outputs/website`.
4. Deploy — Vercel auto-detects Next.js and handles the build.
5. Once you have a domain (see Open Question 4 in the plan), connect it under the Vercel project's Domains settings.
