# Plan: Custom Website for Affordable House Corp

**Created:** 2026-07-13
**Status:** Draft
**Request:** Build a custom-coded website for Affordable House Corp — replacing the outdated current site with a professional, SEO-strong site including an online build calculator and colour selection tool.

---

## Overview

### What This Plan Accomplishes

Scaffolds and builds a new, professional, SEO-optimized website for Affordable House Corp from scratch — replacing the current outdated site (which has incorrect product/service information). The site will include core marketing pages, an interactive build-cost calculator, and a colour selection tool for prospective clients, and will be deployable to a live URL.

### Why This Matters

Per `context/strategy.md`, the website rebuild is the company's sole active strategic priority right now. Per `context/business-info.md`, the current site undersells a 30-year, $100m, market-leading builder — the new site needs to project that credibility and outrank competitors in search. Per `context/current-data.md`, success is measured by traffic, SEO keyword rankings, and leads/enquiries generated once the site is live — so the build needs analytics/enquiry capture hooks from day one, not bolted on later.

---

## Current State

### Relevant Existing Structure

- No existing website code anywhere in this workspace — this is a greenfield build.
- `outputs/` exists but is empty; it's the workspace's designated location for deliverables/work products (per `CLAUDE.md`), so the site codebase belongs there.
- `context/business-info.md`, `context/personal-info.md`, `context/strategy.md`, `context/current-data.md` hold the source material for page copy, priorities, and success metrics.
- This workspace is **not a git repository** yet (confirmed via environment check). Modern hosting platforms (Vercel, Netlify) deploy from a git repo, so version control needs to be initialized before deployment.
- No Node.js/npm tooling has been verified on this machine yet — Python was confirmed installed during the ProductivityOS install, but a Next.js/Astro-style project requires Node.js separately.

### Gaps or Problems Being Addressed

- Current site has incorrect product/service information (per `context/current-data.md`) — this plan replaces it outright rather than patching it.
- No SEO infrastructure exists — the new site needs metadata, sitemap, robots.txt, and semantic structure built in from the start.
- No enquiry/lead capture mechanism exists — needed to hit the "leads/enquiries generated" metric flagged in `context/current-data.md`.
- Brand assets (new logo) are still in progress via a separate Canva project (see `gtd/projects.md` — "Canva Integration for Brochures & Logo"). The site will need to accommodate a placeholder logo until that's finished.

---

## Proposed Changes

### Summary of Changes

- Scaffold a new Next.js (TypeScript + Tailwind CSS) project inside `outputs/website/`.
- Build core marketing pages using content derived from `context/business-info.md`.
- Build an interactive **Build Calculator** page/component (rough cost estimator based on property type and parameters).
- Build an interactive **Colour Selection** page/component (browse and select exterior/interior colour options).
- Wire in SEO fundamentals: per-page metadata, sitemap.xml, robots.txt, semantic HTML, Open Graph tags.
- Add an enquiry/contact form (captures leads — the metric `context/current-data.md` flags as a priority to track).
- Initialize git for the workspace (or at least for `outputs/website/`) so the site can be deployed via Vercel/Netlify.
- Document local dev + deployment steps so Natalie can run and preview the site herself.
- Update `CLAUDE.md` to reflect the new `outputs/website/` project.

### New Files to Create

| File Path | Purpose |
| --- | --- |
| `outputs/website/package.json` | Next.js project manifest and scripts |
| `outputs/website/next.config.ts` | Next.js configuration (SEO-friendly settings, image domains) |
| `outputs/website/tsconfig.json` | TypeScript configuration |
| `outputs/website/tailwind.config.ts` | Tailwind theme config (brand colours placeholder, typography) |
| `outputs/website/app/layout.tsx` | Root layout — global metadata defaults, nav, footer |
| `outputs/website/app/page.tsx` | Home page |
| `outputs/website/app/about/page.tsx` | About / company history page (30 years, market leader positioning) |
| `outputs/website/app/services/page.tsx` | Services overview (rooming accommodation, dual occupancy, subdivisions, pre-fab) |
| `outputs/website/app/services/rooming-accommodation/page.tsx` | Dedicated page for the flagship service |
| `outputs/website/app/process/page.tsx` | Turnkey process page (feasibility → land acquisition → construction → sale) |
| `outputs/website/app/calculator/page.tsx` | Build Calculator page |
| `outputs/website/app/colour-selection/page.tsx` | Colour Selection tool page |
| `outputs/website/app/contact/page.tsx` | Contact / enquiry page |
| `outputs/website/app/sitemap.ts` | Auto-generated sitemap.xml |
| `outputs/website/app/robots.ts` | robots.txt generation |
| `outputs/website/components/BuildCalculator.tsx` | Interactive calculator component (client-side) |
| `outputs/website/components/ColourSelector.tsx` | Interactive colour picker component (client-side) |
| `outputs/website/components/EnquiryForm.tsx` | Lead capture form component |
| `outputs/website/components/Nav.tsx` | Site navigation |
| `outputs/website/components/Footer.tsx` | Site footer |
| `outputs/website/lib/calculator-logic.ts` | Build cost estimation logic (placeholder formula pending real pricing input) |
| `outputs/website/lib/colours.ts` | Colour palette data (placeholder pending real palette input) |
| `outputs/website/lib/seo.ts` | Shared metadata helpers (title templates, OG defaults) |
| `outputs/website/.env.example` | Environment variable template (e.g., form submission endpoint, analytics ID) |
| `outputs/website/README.md` | How to run locally, how to deploy, how to edit content |
| `outputs/website/.gitignore` | Standard Next.js gitignore (node_modules, .next, .env) |
| `.gitignore` (workspace root) | Add if not present — ensure `.env`, `node_modules/`, `.next/` are excluded workspace-wide |

### Files to Modify

| File Path | Changes |
| --- | --- |
| `CLAUDE.md` | Add `outputs/website/` to the workspace structure table; note the site's tech stack and how to run it |
| `gtd/projects.md` | Add a new project under "Main Business": "Affordable House Corp Website Build" with this plan as reference, and note dependency on the Canva logo project |
| `context/current-data.md` | Once live, this is where traffic/SEO/leads metrics will eventually be tracked (no change now — noted for follow-up, not part of this implementation) |

### Files to Delete (if any)

None — this is a net-new build.

---

## Design Decisions

### Key Decisions Made

1. **Framework: Next.js (TypeScript + Tailwind CSS)** — Chosen over a plain static site because it needs genuine interactivity (calculator, colour picker) alongside strong SEO. Next.js's App Router has first-class metadata/sitemap/robots APIs purpose-built for SEO, static generation keeps pages fast, and it's the most widely supported framework for future help (agencies, freelancers, other AI tools all know it well) if Natalie ever needs outside help.
2. **Location: `outputs/website/`** — Follows this workspace's existing convention that `outputs/` holds deliverables and work products, keeping the site alongside (not mixed into) the AIOS context/command scaffolding.
3. **Hosting: Vercel** — Free tier is generous, deploys directly from a git repo with zero server config, is built by the makers of Next.js (best compatibility), and supports custom domains. Requires git + a GitHub account (see Open Questions).
4. **Calculator and colour data live in separate `lib/` files, not hardcoded in components** — so Natalie (or Claude in a future session) can update pricing logic or the colour palette without touching component code.
5. **Placeholder logo/colours until the Canva project finishes** — The site will ship with a text-based placeholder logo and a neutral default colour scheme so the build isn't blocked on the separate logo project. Swapping in final brand assets later is a small, isolated task.
6. **Enquiry form built in from the start** — Directly serves the "leads/enquiries generated" metric called out in `context/current-data.md` as something Natalie wants visibility into once live.

### Alternatives Considered

- **Astro** — Excellent for SEO/content-heavy sites with minimal JS, but Next.js was chosen for its more mainstream ecosystem and because the interactive calculator/colour-picker components benefit from Next.js's more mature client-component patterns.
- **Plain HTML/CSS/JS (no framework)** — Simplest to hand-edit, but becomes unwieldy across ~8 pages with shared navigation/footer and would make the calculator/colour-picker logic harder to keep DRY. Rejected in favor of a framework that still produces fully static, fast, SEO-friendly output.
- **WordPress / Wix** — Explicitly declined by Natalie earlier in favor of a fully custom-coded site for maximum control over the calculator and colour picker.
- **Netlify instead of Vercel** — Both are comparable; Vercel was chosen for tightest Next.js integration, but this is a low-stakes choice that could be swapped later with minimal rework.

### Open Questions

These need Natalie's input before (or during) implementation — the plan proceeds with reasonable placeholders where noted, but these will need real answers to finish the site:

1. **Build Calculator formula/inputs** — What should the calculator actually estimate (e.g., cost per m² by property type, land size, number of units)? What inputs should the user provide, and what should the output look like (a rough range, a lead-in-disguise "get a quote" prompt, etc.)? This plan implements a clearly-labeled placeholder estimator until real figures are supplied.
2. **Colour Selection tool scope** — What colours/materials are actually offered (exterior render, roof colour, trim, etc.)? Is this purely visual browsing, or does a selection need to attach to an enquiry/quote request? Placeholder palette used until supplied.
3. **Final logo and brand colours** — Dependent on the in-progress Canva logo project (`gtd/projects.md`). Site ships with a placeholder until that's done.
4. **Domain name** — Is there an existing domain to point at the new site, or does one need to be purchased?
5. **Photos/project gallery** — Does the business have existing photography of completed builds to use, or does this need sourcing?
6. **Git hosting** — Does Natalie have (or want) a GitHub account for deploying via Vercel? This is required for the deployment step.
7. **Copy tone/detail level** — This plan drafts placeholder page copy from `context/business-info.md`; Natalie should review and refine tone/detail before the site goes live.

---

## Step-by-Step Tasks

### Step 1: Verify Node.js is installed

Check for Node.js (required for Next.js, separate from the Python installed for ProductivityOS).

**Actions:**
- Run `node --version` and `npm --version`
- If missing, guide Natalie through installing Node.js LTS from nodejs.org (same pattern as the earlier Python install)

**Files affected:** none

---

### Step 2: Scaffold the Next.js project

Create the project in `outputs/website/` using `create-next-app` with TypeScript, Tailwind CSS, App Router, and ESLint enabled.

**Actions:**
- Run the Next.js scaffolding tool targeting `outputs/website/`
- Verify the default scaffold runs locally (`npm run dev`) before customizing

**Files affected:**
- `outputs/website/package.json`
- `outputs/website/next.config.ts`
- `outputs/website/tsconfig.json`
- `outputs/website/tailwind.config.ts`
- `outputs/website/.gitignore`

---

### Step 3: Build the shared layout, nav, and footer

Establish the site-wide shell all pages sit inside.

**Actions:**
- Create `components/Nav.tsx` with links to Home, About, Services, Process, Calculator, Colour Selection, Contact
- Create `components/Footer.tsx` with company name, placeholder contact details, and copyright
- Wire both into `app/layout.tsx`, including global metadata defaults (site title template, description, Open Graph defaults) via `lib/seo.ts`

**Files affected:**
- `outputs/website/app/layout.tsx`
- `outputs/website/components/Nav.tsx`
- `outputs/website/components/Footer.tsx`
- `outputs/website/lib/seo.ts`

---

### Step 4: Build core content pages

Draft each page's copy from `context/business-info.md`, marked clearly as placeholder pending Natalie's review (per Open Question 7).

**Actions:**
- `app/page.tsx` (Home): hero positioning as 30-year market leader in rooming accommodation, summary of the four service lines, calls-to-action to Calculator and Contact
- `app/about/page.tsx`: company history, scale ($100m turnover, 50 staff), turnkey pipeline (feasibility → land acquisition → construction → sale)
- `app/services/page.tsx`: overview of all four offerings (rooming accommodation, dual occupancy, subdivisions, pre-fab) with links to detail pages
- `app/services/rooming-accommodation/page.tsx`: flagship service detail page (market-leading specialty)
- `app/process/page.tsx`: step-by-step turnkey process explanation
- `app/contact/page.tsx`: houses the `EnquiryForm` component
- Add per-page `metadata` exports (title, description) to every page for SEO

**Files affected:**
- `outputs/website/app/page.tsx`
- `outputs/website/app/about/page.tsx`
- `outputs/website/app/services/page.tsx`
- `outputs/website/app/services/rooming-accommodation/page.tsx`
- `outputs/website/app/process/page.tsx`
- `outputs/website/app/contact/page.tsx`

---

### Step 5: Build the enquiry form

**Actions:**
- Create `components/EnquiryForm.tsx` — name, email, phone, message, property-type-of-interest fields
- Wire submission to a placeholder handler (e.g., a Next.js API route or a documented third-party form endpoint — flag as needing a real service, such as Formspree or a serverless function, before going live) with a clear `.env.example` entry for the endpoint/key
- Ensure the form is accessible (labeled fields, keyboard-navigable) and mobile-friendly

**Files affected:**
- `outputs/website/components/EnquiryForm.tsx`
- `outputs/website/.env.example`

---

### Step 6: Build the Build Calculator

**Actions:**
- Create `lib/calculator-logic.ts` with a clearly-commented placeholder estimation function (e.g., a rough $/m² multiplier by property type) that's trivial to swap for real figures later
- Create `components/BuildCalculator.tsx` — form inputs (property type, size/land parameters), live output of an estimated range, and a prominent note that the figure is indicative and a link to the enquiry form for a real quote
- Wire into `app/calculator/page.tsx` with SEO metadata

**Files affected:**
- `outputs/website/lib/calculator-logic.ts`
- `outputs/website/components/BuildCalculator.tsx`
- `outputs/website/app/calculator/page.tsx`

---

### Step 7: Build the Colour Selection tool

**Actions:**
- Create `lib/colours.ts` with a placeholder palette (a handful of exterior/roof/trim colour swatches with names and hex values), structured so real palette data can be dropped in later
- Create `components/ColourSelector.tsx` — browsable swatch grid, selection state, and a visual preview area (even if just a colour block or simple house silhouette placeholder)
- Wire into `app/colour-selection/page.tsx` with SEO metadata

**Files affected:**
- `outputs/website/lib/colours.ts`
- `outputs/website/components/ColourSelector.tsx`
- `outputs/website/app/colour-selection/page.tsx`

---

### Step 8: Wire in SEO infrastructure

**Actions:**
- Create `app/sitemap.ts` generating a sitemap from the site's route list
- Create `app/robots.ts` allowing full crawl and pointing to the sitemap
- Verify every page has unique `title`/`description` metadata (no duplicates)
- Add Open Graph and Twitter card defaults in `lib/seo.ts`
- Add semantic HTML landmarks (`<main>`, `<nav>`, `<footer>`, heading hierarchy) across all pages

**Files affected:**
- `outputs/website/app/sitemap.ts`
- `outputs/website/app/robots.ts`
- `outputs/website/lib/seo.ts`
- All page files (metadata review pass)

---

### Step 9: Local testing

**Actions:**
- Run `npm run dev` and manually click through every page
- Test the Build Calculator with several inputs, confirm output updates correctly
- Test the Colour Selector selection state and preview
- Submit the Enquiry Form and confirm the (placeholder) submission path works or fails gracefully
- Run `npm run build` to confirm the production build compiles without errors
- Check mobile responsiveness at common breakpoints

**Files affected:** none (validation only)

---

### Step 10: Initialize git and prepare for deployment

**Actions:**
- Run `git init` at the workspace root (or within `outputs/website/`, decide based on whether the whole AIOS workspace should be version-controlled — recommend workspace-root git init since `.env` and credentials patterns already assume gitignore handling)
- Create/update `.gitignore` to exclude `node_modules/`, `.next/`, `.env`, and other build artifacts
- Make an initial commit
- **Pause here and confirm with Natalie** before pushing anywhere — she needs a GitHub account (Open Question 6) and should decide the repo visibility (private recommended, since this is a client business site)

**Files affected:**
- `.gitignore` (workspace root)
- `outputs/website/.gitignore`

---

### Step 11: Deploy to Vercel

**Actions:**
- Guide Natalie through creating a free Vercel account (linked to GitHub)
- Connect the GitHub repo to a new Vercel project, with root directory set to `outputs/website/`
- Verify the deployed preview URL works end-to-end
- Document the custom domain connection process (pending Open Question 4) in `outputs/website/README.md`

**Files affected:**
- `outputs/website/README.md`

---

### Step 12: Update workspace documentation

**Actions:**
- Update `CLAUDE.md` workspace structure table to include `outputs/website/`
- Add a short note under Context Summary or a new section describing the site's tech stack and how to run/deploy it
- Add a project entry to `gtd/projects.md` under Main Business: "Affordable House Corp Website Build," linking to this plan, with next action reflecting whatever step remains (e.g., "review placeholder copy" or "confirm calculator formula")
- Run `python scripts/refresh_dashboard.py` to reflect the new project on the dashboard

**Files affected:**
- `CLAUDE.md`
- `gtd/projects.md`
- `gtd/dashboard.md` (via script)

---

## Connections & Dependencies

### Files That Reference This Area

- `context/strategy.md` and `context/current-data.md` define the success criteria (live site, SEO performance, lead generation) this build must satisfy.
- `gtd/projects.md` already tracks the parallel "Canva Integration for Brochures & Logo" project — the website's final branding depends on that project's output.

### Updates Needed for Consistency

- `CLAUDE.md` workspace structure (Step 12)
- `gtd/projects.md` (Step 12)
- Once live, `context/current-data.md` should be revisited to start recording real traffic/SEO/leads numbers (flagged for a future task, not part of this plan — natural next step would be installing DataOS's Google Analytics collector at that point).

### Impact on Existing Workflows

- Introduces Node.js as a new toolchain dependency in a workspace that previously only needed Python (for ProductivityOS's dashboard script). No conflict, but worth Natalie knowing both are now part of the setup.
- This is the first "real" software project inside `outputs/` — establishes a pattern (framework + component-based build) that future modules (or a rebuild of other tools) could follow.

---

## Validation Checklist

- [ ] `npm run dev` starts the site locally without errors
- [ ] All 8 pages (Home, About, Services, Rooming Accommodation, Process, Calculator, Colour Selection, Contact) render correctly
- [ ] Build Calculator accepts input and produces a clearly-labeled placeholder estimate
- [ ] Colour Selector allows browsing and selecting swatches with a visible preview
- [ ] Enquiry Form validates required fields and submits (or fails gracefully with a clear message)
- [ ] `npm run build` completes with zero errors
- [ ] Every page has unique title/description metadata
- [ ] `sitemap.xml` and `robots.txt` are generated and accessible
- [ ] Site is responsive on mobile, tablet, and desktop widths
- [ ] `CLAUDE.md` and `gtd/projects.md` updated to reflect the new project
- [ ] Natalie has reviewed and approved placeholder copy, calculator logic, and colour palette (or explicitly deferred approval to a later pass)

---

## Success Criteria

The implementation is complete when:

1. A fully navigable, SEO-structured Next.js website exists in `outputs/website/`, running locally without errors.
2. The Build Calculator and Colour Selection tool are functional (even with placeholder data/logic pending real business input).
3. The enquiry form captures lead information in a working (even if placeholder-service) submission path.
4. The site is committed to git and ready for a Vercel deployment (deployment itself may complete in this pass or be handed off pending Natalie's GitHub account setup).
5. `CLAUDE.md` and `gtd/projects.md` accurately reflect the new website project.

---

## Notes

- The Build Calculator and Colour Selection tool are the two components most dependent on real business input (pricing logic, actual colour/material options). Implementing them with clearly-labeled placeholder logic now, and swapping in real data later, keeps the build unblocked while being explicit that a follow-up pass is needed — this should be flagged strongly to Natalie rather than left implicit.
- Once the Canva logo work finishes, swapping the placeholder logo/brand colours into the Tailwind theme and `Nav`/`Footer` components is a small, isolated follow-up task — worth its own quick session rather than folding into this plan.
- When DataOS is eventually installed (deferred earlier — see prior session), the Google Analytics collector will plug directly into the traffic/SEO metrics this site is designed to generate. Worth revisiting DataOS once this site has been live for a few weeks.
- Consider a blog/insights section for content-driven SEO in a future iteration — not included in this plan's scope to keep the initial build focused and shippable.
