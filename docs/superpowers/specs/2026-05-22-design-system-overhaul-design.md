# Popup Bits Website — Design System Overhaul

**Date:** 2026-05-22
**Status:** Design — approved to proceed to plan (user opted out of review gates)
**Source design system:** https://github.com/lohanidamodar/popup-bits-design-system

---

## 1. Goal

Rebuild the popupbits.com site to:

1. Reframe the site from a consulting agency pitch to a **products-led studio site with a consulting hook** — Popup Bits ships its own apps (Mero Patro, Mero Nepali, SpellCraft, Bhadama, UI Challenges – Flutter) and also takes on selected consulting work.
2. Apply the **popup-bits-design-system** as the single source of design truth (tokens, typography, archetype + theme classes).
3. Upgrade to the **latest Svelte 5 + SvelteKit 2**, idiomatic Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`, `$bindable`) throughout — **no legacy `export let`, no stores where runes suffice, no `on:` directives on components**.
4. Switch from npm/pnpm to **bun** for install, dev, build, and test scripts.
5. Strip out all legacy CSS variable aliases, `!important` hero overrides, duplicated spacing utilities, the ad-hoc `--primary-blue` / `--primary-color` shims, etc.

---

## 2. Out of Scope

- Content rewriting beyond what the new IA requires (we reuse current copy where it still fits; we rewrite hero/products copy because the framing changes).
- New analytics / tracking integrations.
- Devanagari / Nepali content. Site stays English-only this pass.
- New backend or CMS — content remains in `src/lib/data/*.js`.
- Production deploy / Vercel changes beyond what `adapter-auto` resolves.

---

## 3. Stack

| Concern                   | Choice                                                                                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework                 | SvelteKit 2 (latest) on Svelte 5 (latest), runes mode only                                                                                                                 |
| Language                  | TypeScript everywhere (`.ts`, `<script lang="ts">`); data files migrate `.js` → `.ts`                                                                                      |
| Package manager / runtime | **bun** (install, run, build, test). Remove `pnpm-lock.yaml` from history references; `bun.lock` already present.                                                          |
| Styling                   | **Tailwind v4** with DS tokens wired through `@theme`                                                                                                                      |
| Component library         | **shadcn-svelte** (Bits UI primitives + Tailwind) for Button, Card, Sheet, Dialog, NavigationMenu, Tabs, Badge, Separator, Form, Input, Textarea, Toast/Sonner, ModeToggle |
| Design system             | `colors_and_type.css` from popup-bits-design-system — base tokens, archetype `arch-utility`, theme `theme-popupbits`. Light + dark via `mode-watcher` + `data-theme`.      |
| Icons                     | `@lucide/svelte` (matches shadcn-svelte)                                                                                                                                   |
| Build target              | `@sveltejs/adapter-auto` (keeps Vercel deploy working)                                                                                                                     |
| Testing                   | Vitest with browser project (Playwright provider) — keep current setup; rewrite smoke tests against new home page                                                          |

---

## 4. Information Architecture

```
/                           Products-led landing
/products                   Full grid of owned products
/products/[slug]            Per-product detail page
/about                      Studio story, team, Kathmandu location
/contact                    Contact form + Kathmandu details
/contact/flutter-ui-challenges-privacy-policy   Kept verbatim (Play Store linked)

/projects                   → 308 redirect to /products
/projects/[slug]            → 308 redirect to /products/[slug]
```

### Home page sections (top to bottom)

1. **Sticky nav** — logo, links (Products, About, Contact), theme toggle, "Hire us" CTA
2. **Hero** — bold headline ("We build apps for the way Nepal actually uses tech" or similar), one-line subtext, two CTAs (See products / Work with us). DS arch-utility + theme-popupbits accent.
3. **Featured products grid** — 4-6 owned product cards (Mero Patro, Mero Nepali, SpellCraft, Bhadama, UI Challenges – Flutter, Popup Bits). Each card: icon, name, one-liner, platform badge(s), link to detail.
4. **Values / stats band** — 3-4 stats (years, products shipped, downloads, languages supported) — DS "values band" pattern.
5. **Consulting hook** — short section: "We also take on selected client work" — list 3-4 capability areas (Flutter apps, web platforms, Firebase/Appwrite backends, design systems). CTA to /contact.
6. **CTA banner** — "Have an idea? Let's talk." → /contact.
7. **Footer** — Kathmandu address, social links (GitHub, Play Store, X/Twitter), product links, legal.

### /products page

Full grid (no triage), each card links to `/products/[slug]`. Filter chips by platform (Web / Android / iOS).

### /products/[slug] page

Reuses current `/projects/[slug]` template, redesigned. Hero with product gradient (DS accent), description, screenshots gallery, tech stack badges, "Get the app" links (Play Store, Web, etc.).

### /about page

Studio story (Kathmandu-based, founded by Damodar Lohani, what we do), values, contact CTA.

### /contact page

Short intro + form (name, email, message — submission opens mailto: link via `mailto:` action; **no new backend**), Kathmandu address, email, social.

---

## 5. Design System Integration

### Layered application

The DS uses three layers: base tokens → archetype → product theme. We apply them as follows:

- **Base tokens** — imported once in `src/app.css` via `@import "popup-bits-design-system/colors_and_type.css"` (vendored: see §7). All tokens (`--n-0..900`, `--sp-1..20`, `--rad-*`, `--sh-*`, motion vars, type presets) become globally available.
- **Tailwind `@theme`** — `app.css` declares a `@theme` block that maps DS tokens onto Tailwind variables (`--color-primary`, `--color-background`, `--color-foreground`, `--color-card`, `--color-border`, `--color-ring`, `--font-sans`, `--radius`, etc.), which shadcn-svelte reads. Light + dark variants live under `:root` and `[data-theme="dark"]`.
- **Archetype + theme classes** — root layout wraps everything in `<div class="arch-utility theme-popupbits">`. Per-product detail pages may swap `theme-popupbits` for the product's own theme class (`theme-meropatro`, `theme-meronepali`, `theme-spellcraft`, etc.) to give each detail page a matching accent.
- **Typography presets** — DS provides classes like `.t-display`, `.t-h1`, `.t-eyebrow`, `.t-lead`, `.t-body`. We use these directly in templates; `h1`/`h2` element defaults align to the same scale via base CSS.

### Dark mode

`mode-watcher` (shadcn-svelte's recommended package) is added to root layout. It toggles `data-theme` on `<html>`. The DS's `[data-theme="dark"]` overrides are extended in `app.css` to cover shadcn-svelte's semantic variables.

### Vendoring the DS CSS

The DS is a separate GitHub repo, not published to npm. We **vendor** `colors_and_type.css` into `src/lib/design-system/colors_and_type.css` with a header comment noting the upstream commit SHA. Updating means re-copying the file. (Alternative: install as a `git+https` dep — rejected for build-time simplicity and because the DS is single-file.)

---

## 6. Content Model

Owned products live in `src/lib/data/products.ts` (replaces `projects.js`):

```ts
export type Product = {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	themeClass: string; // e.g. "theme-meropatro"
	platforms: ('web' | 'android' | 'ios')[];
	links: { label: string; href: string; kind: 'play' | 'web' | 'github' | 'other' }[];
	icon: string; // /static/products/<slug>/icon.svg
	screenshots: string[]; // /static/products/<slug>/shot-*.png
	tech: string[];
	status: 'live' | 'beta' | 'pipeline';
	featured: boolean; // surfaced on /
};
```

Seed entries (initial slug list):

- `mero-patro` — Nepali calendar (Web), `theme-meropatro`
- `mero-nepali` — Learn Nepali for kids (Android), `theme-meronepali`
- `spellcraft` — Word/spell game (Android), `theme-spellcraft`
- `bhadama` — (Android/Web — confirm during impl), theme TBD; add `theme-bhadama` placeholder if not in DS
- `ui-challenges-flutter` — Flutter UI showcase app (Android), reuses popup-bits theme
- `popup-bits` — Studio itself, `theme-popupbits`

If a product's theme class isn't yet defined in the DS, we add a stub `theme-bhadama { ... }` block in `colors_and_type.css` (vendored copy) with a sensible accent triple, and note it for upstream PR back to the DS.

`services.js`, `pricing.js` are **deleted**. `technologies.js` becomes part of /about (or inline on consulting section). `company.js` (name, tagline, stats, contact) is retained as `company.ts`. `content.js` retained/trimmed as `content.ts` for misc page strings.

---

## 7. Component Inventory

### Delete (legacy)

```
src/lib/components/StatCard.svelte       (rebuilt with shadcn Card)
src/lib/components/PricingCard.svelte    (no pricing tiers anymore)
src/lib/components/ServiceCard.svelte    (services section dropped/simplified)
src/lib/components/Card.svelte           (replaced by shadcn-svelte/card)
src/lib/components/Button.svelte         (replaced by shadcn-svelte/button)
src/lib/components/Section.svelte        (replaced by simple <section> + Tailwind/DS classes)
src/lib/components/SectionHeader.svelte  (replaced by typography preset classes)
src/lib/components/Hero.svelte           (rebuilt; see below)
src/lib/components/PageHeader.svelte     (rebuilt; see below)
src/lib/components/MainHeader.svelte     (rebuilt as SiteNav)
src/lib/components/Project.svelte        (rebuilt as ProductCard)
src/lib/components/Footer.svelte         (rebuilt as SiteFooter)
src/lib/components/SEO.svelte            (kept, lightly refactored to runes)
```

### New (post-overhaul) in `src/lib/components/`

| Component                  | Purpose                                                   |
| -------------------------- | --------------------------------------------------------- |
| `SiteNav.svelte`           | Sticky top nav with mobile Sheet drawer                   |
| `SiteFooter.svelte`        | Footer with Kathmandu block, links, social                |
| `Hero.svelte`              | Reusable hero with title/subtitle/CTAs/accent variants    |
| `PageHeader.svelte`        | Inner-page header (smaller hero)                          |
| `ProductCard.svelte`       | Product tile (icon, name, tagline, platform badges, link) |
| `ProductDetail.svelte`     | Detail page composition (hero + gallery + meta)           |
| `StatsBand.svelte`         | Values/stats band on home                                 |
| `ConsultingSection.svelte` | Consulting hook on home                                   |
| `ThemeToggle.svelte`       | Light/dark toggle wrapper around mode-watcher             |
| `SEO.svelte`               | (kept, refactored)                                        |

Plus shadcn-svelte primitives under `src/lib/components/ui/` per shadcn-svelte conventions: `button`, `card`, `sheet`, `dialog`, `navigation-menu`, `tabs`, `badge`, `separator`, `input`, `textarea`, `label`, `sonner`.

---

## 8. Migration / Execution Strategy

The user has explicitly asked for **multiple subagents in parallel**. The work decomposes cleanly into independent streams once the foundation (steps 0–1) is in place. Phasing:

### Phase 0 — Foundation (sequential, single agent)

1. Wipe `node_modules`, switch scripts/lockfile entirely to bun.
2. Upgrade dependencies: Svelte to latest 5.x, SvelteKit to latest 2.x, Vite latest, Tailwind v4 latest, `@sveltejs/vite-plugin-svelte` latest.
3. Add: `shadcn-svelte` (CLI init), `bits-ui`, `tailwind-variants`, `clsx`, `tailwind-merge`, `mode-watcher`, `@lucide/svelte`, `sonner-svelte` (if not bundled).
4. Vendor `colors_and_type.css` from the DS repo into `src/lib/design-system/`.
5. Rewrite `src/app.css` from scratch:
   - `@import "tailwindcss"`
   - `@import "$lib/design-system/colors_and_type.css"`
   - `@theme` block mapping DS tokens → Tailwind/shadcn-svelte variables
   - Light/dark mode variable overrides
   - **Remove all legacy `--primary-blue`, `--primary-color`, duplicated `--space-*`, `!important` hero overrides.**
6. Rewrite `src/routes/+layout.svelte`: wrap in `<div class="arch-utility theme-popupbits">`, mount `<ModeWatcher />`, mount new `SiteNav` / `SiteFooter`.
7. Initialize shadcn-svelte with components: button, card, sheet, navigation-menu, badge, separator, input, textarea, label, sonner.
8. Configure SvelteKit `redirects` in `src/hooks.server.ts` (or per-route) for `/projects → /products`.
9. Add `prettier-plugin-tailwindcss` config bump if needed; confirm `svelte-check` clean.

After Phase 0, the app should build, render a blank but correctly themed shell, with `bun run dev` working.

### Phase 1 — Parallel feature streams (multiple subagents)

These streams have **no shared file conflicts** and can run concurrently after Phase 0 lands.

| Stream                 | Owns                                   | Files                                                                                                                                                                                                                               |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Home page**       | New home composition                   | `src/routes/+page.svelte`, `src/lib/components/{Hero,StatsBand,ConsultingSection}.svelte`, `src/lib/data/company.ts`                                                                                                                |
| **B. Products**        | Products data + list + detail          | `src/lib/data/products.ts`, `src/routes/products/+page.svelte`, `src/routes/products/[slug]/+page.svelte`, `src/routes/products/[slug]/+page.ts`, `src/lib/components/{ProductCard,ProductDetail}.svelte`, redirects from /projects |
| **C. About + Contact** | Static content pages                   | `src/routes/about/+page.svelte`, `src/routes/contact/+page.svelte`, contact mailto form; keep `flutter-ui-challenges-privacy-policy` page (restyle only)                                                                            |
| **D. Chrome**          | Site nav + footer + SEO + theme toggle | `src/lib/components/{SiteNav,SiteFooter,ThemeToggle,SEO}.svelte`                                                                                                                                                                    |

Each stream is owned by one subagent dispatched via the Agent tool. The plan (next step, written by `writing-plans`) defines a per-stream task list with explicit acceptance criteria so streams can run in parallel without coordination.

### Phase 2 — Integration (sequential, single agent)

1. Wire SiteNav links and footer products list to the products data source.
2. Visual smoke pass with `bun run dev` (Playwright via Vitest browser project) — render home, /products, one product detail, /about, /contact.
3. Update `page.svelte.test.ts` (or replace) to assert new home content.
4. `bun run check` and `bun run lint` clean.
5. Update `README.md` (bun commands; brief site description).

---

## 9. Legacy Code Removal Checklist

Tracked so the cleanup is exhaustive:

- [ ] All legacy alias CSS vars (`--primary-blue`, `--primary-color`, `--light-gray`, `--border-color`, etc.)
- [ ] Duplicate `--space-*` declarations
- [ ] `!important` hero / btn overrides (`.hero-btn-primary`, `.hero-cta-container .btn-*`, etc.)
- [ ] Deleted components listed in §7
- [ ] `src/lib/data/{pricing,services}.js`
- [ ] `src/lib/data/projects.js` (replaced by `products.ts`)
- [ ] `pnpm-lock.yaml` (already deleted on branch; ensure no references)
- [ ] `svelte-preprocess` (Svelte 5 + vitePreprocess covers TS; sass not needed if we drop scss)
- [ ] `sass` dep (drop unless still used; tokens are pure CSS)
- [ ] Any `on:click` / slot syntax on Svelte components → `onclick` props + `{@render children()}`
- [ ] Any `export let` → `let { ... } = $props()`
- [ ] Any `$:` reactivity → `$derived` / `$effect`
- [ ] `@tailwind base/components/utilities` directives → `@import "tailwindcss"`

---

## 10. Testing

- Keep `vitest` browser project (Playwright/Chromium) and node project.
- Rewrite `src/routes/page.svelte.test.ts` to assert new home renders: hero title, products grid present, consulting section heading, footer Kathmandu marker.
- Add one render-smoke test per route under `src/routes/**/+page.svelte.test.ts` (home, products, products/[slug], about, contact). Each just asserts the page renders without throwing and contains a known heading.
- No e2e suite beyond render smokes — out of scope.

---

## 11. Acceptance Criteria

1. `bun install && bun run dev` starts a working dev server with no console errors.
2. `bun run build` succeeds with `adapter-auto` resolving (Vercel-compatible).
3. `bun run check` returns 0 errors / 0 warnings.
4. `bun run test` passes (smoke tests defined in §10).
5. Home page renders products-led layout with: nav, hero, products grid, stats band, consulting section, CTA, footer.
6. /products lists all owned products incl. Bhadama. Each detail page renders.
7. Light + dark mode toggle works; tokens reflow from `:root` / `[data-theme="dark"]`.
8. No legacy CSS variable aliases remain (grep returns 0 hits for `--primary-blue`, `--primary-color`, `--light-gray` in `src/`).
9. No `export let` in any `.svelte` file (grep returns 0 in `src/`).
10. No `on:click` directives on Svelte components in `src/` (HTML element directives still allowed via Svelte 5 `onclick` attribute syntax — both work, prefer `onclick`).

---

## 12. Risks & Open Questions

- **Bhadama assets / theme not in DS** — we'll provision a stub `theme-bhadama` accent in the vendored CSS; the user (Damodar) can adjust later or PR upstream.
- **shadcn-svelte CLI + Tailwind v4** — shadcn-svelte's Tailwind v4 path is supported but evolving. If the CLI init misbehaves, fall back to copying primitive components manually from shadcn-svelte docs.
- **DS file changes upstream** — vendoring means we lag the upstream repo. A comment header notes the source SHA. Update is a manual re-copy.
- **`adapter-auto` for Vercel** — kept as-is. If the deploy target moved off Vercel, switch later.

---

## 13. Next Step

Invoke `superpowers:writing-plans` to produce the detailed implementation plan derived from this spec.
