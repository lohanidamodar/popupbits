# SEO and agent-readiness audit

Audit of www.popupbits.com, taken from the local build on 11 November 2026, and
the changes made from it. "Before" is commit `eb80bec`; "after" is the commit
that adds this file.

## Stack and rendering

- **SvelteKit 2 + Svelte 5**, Tailwind 4, `mdsvex` for blog posts in Markdown,
  deployed with `@sveltejs/adapter-vercel` (Node 22).
- **Before:** server-side rendered on Vercel. Product pages, the product
  listing and the text endpoints were prerendered; home, about, contact, blog
  and every policy page were rendered per request. Every page is full HTML
  without JavaScript, so crawlers and agents could already read all of it.
- **After:** the root layout sets `prerender = true`, so all 47 pages are built
  to static HTML. The only runtime code left on the server is `hooks.server.ts`
  (the `/projects/* → /products/*` 308 redirect). A future page that needs the
  server opts out with `export const prerender = false`.
- The client JavaScript hydrates for interactivity (theme toggle, product
  filters, the home page's daily rotation) but no content depends on it.

## Page types

| Page type            | Routes                                                                | Data source                       |
| -------------------- | --------------------------------------------------------------------- | --------------------------------- |
| Home                 | `/`                                                                   | `company.ts`, `products.ts`       |
| Product listing      | `/products`                                                           | `products.ts`                     |
| Product page         | `/products/<slug>` (20)                                               | `products.ts`, `product-pages.ts` |
| Kickstand sales page | `/kickstand`                                                          | `kickstand.ts`                    |
| Blog index, posts    | `/blog`, `/blog/<slug>` (2)                                           | `src/lib/posts/*.md`              |
| About, contact       | `/about`, `/contact`                                                  | inline                            |
| Privacy policies     | `/contact/<app>-privacy-policy` (15)                                  | inline Svelte                     |
| Account deletion     | `/contact/<app>-delete-account` (2)                                   | inline Svelte                     |
| Error / 404          | `+error.svelte`                                                       | `noindex`                         |
| Text for agents      | `/llms.txt`, `/llms-full.txt`, `/products/<slug>.md`, `/kickstand.md` | product data                      |

### Per page type, before

| Check                | Home                      | Listing                | Product                                      | Kickstand        | Blog                         | About/contact | Policies                    |
| -------------------- | ------------------------- | ---------------------- | -------------------------------------------- | ---------------- | ---------------------------- | ------------- | --------------------------- |
| Title                | ✓                         | ✓                      | 16 of 20 over 60 chars                       | ✓                | ✓                            | ✓             | no site name, not via SEO   |
| Description          | ✓                         | ✓                      | 15 over 160 chars (up to 425)                | ✓                | ✓                            | ✓             | 40–80 chars, generic        |
| Canonical            | ✓                         | ✓                      | ✓                                            | ✓                | ✓                            | ✓             | **missing**                 |
| Open Graph / Twitter | ✓                         | ✓                      | ✓                                            | ✓                | ✓                            | ✓             | **missing**                 |
| One `h1`             | ✓                         | ✓                      | ✓                                            | ✓                | ✓                            | ✓             | Flutter UI Challenges had 3 |
| Image alt            | decorative icons `alt=""` | same                   | screenshots described                        | ✓                | covers `alt=""` (decorative) | —             | —                           |
| JSON-LD              | Organization, WebSite     | Organization, ItemList | SoftwareApplication, BreadcrumbList, FAQPage | Product, FAQPage | Organization or BlogPosting  | Organization  | **none**                    |
| Internal links       | nav, footer, cards        | cards                  | pager, policy links                          | nav              | post ↔ product               | nav           | nav, footer                 |
| `lang` on Devanagari | —                         | missing                | missing (9 pages)                            | —                | —                            | —             | missing (4 pages)           |

Other findings:

- `SoftwareApplication` was used for every app, with `applicationCategory:
"MobileApplication"` (a type name, not a category) and no store links.
- `BreadcrumbList` started at Products, not Home.
- The listing card's `<a aria-label="Open X">` hid the card text from the
  accessible name, and the Nepal flag `span` used `aria-label` without a role.

### Site-wide files, before

| File                        | State                                                                     |
| --------------------------- | ------------------------------------------------------------------------- |
| `sitemap.xml`               | Every page, found from the route files; **no `lastmod`**                  |
| `robots.txt`                | `Allow: /` for all, sitemap linked; AI crawlers not named                 |
| `llms.txt`, `llms-full.txt` | Present, every product listed with its Markdown twin                      |
| Machine-readable catalogue  | **none**                                                                  |
| RSS                         | **none**                                                                  |
| 404                         | Custom `+error.svelte`, `noindex`, links home and to products             |
| Redirects                   | `/projects/*` → `/products/*` (308); `/products/kickstand` → `/kickstand` |
| Search                      | none, so no `SearchAction`                                                |
| WebMCP                      | none                                                                      |

### Performance and accessibility, before

- **Images:** product icons were PNGs up to 1254 × 1254 and 1.9 MB, shown at
  48–128 CSS px. The listing page loaded 6.0 MB of images; the home page 2.7 MB.
  Screenshots were already WebP with width and height set. Blog covers were
  180 KB PNGs.
- **Fonts:** Google Fonts loaded by a CSS `@import` inside the design-system
  stylesheet, so the font CSS was found only after the site CSS downloaded, and
  blocked rendering (Lighthouse: up to 1.5 s of render-blocking).
  `display=swap` was already set.
- **JavaScript:** 103–131 KB transferred per page; no long tasks (TBT 0 ms).
- **Accessibility:** `<html lang="en">` is set and every page has a title and
  viewport meta. Colour contrast fails on the brand orange buttons (white on `#ff5a3c`, 3.09:1) and
  the dark-theme eyebrow labels (`#55584f` on `#121310`, 2.57:1).

## Lighthouse

Lighthouse 12, desktop Chrome, headless, mobile emulation (the default), one
run per page against `vite preview` of each build on the same machine. Single
runs vary by a few points; treat small differences as noise.

| Page                               | Performance | Accessibility | Best practices | SEO       |
| ---------------------------------- | ----------- | ------------- | -------------- | --------- |
| `/`                                | 95 → **98** | 91 → **96**   | 100 → 100      | 100 → 100 |
| `/products`                        | 76 → **98** | 93 → **97**   | 100 → 100      | 100 → 100 |
| `/products/sanskrit`               | 80 → **88** | 96 → 96       | 100 → 100      | 100 → 100 |
| `/blog/mero-nepali-…`              | 91 → **97** | 100 → 100     | 100 → 100      | 100 → 100 |
| `/contact/sanskrit-privacy-policy` | 97 → **98** | 100 → 100     | 100 → 100      | 100 → 100 |
| `/kickstand`                       | 84 → **96** | 96 → 96       | 100 → 100      | 100 → 100 |

| Page                  | Bytes before | Bytes after | LCP before | LCP after |
| --------------------- | ------------ | ----------- | ---------- | --------- |
| `/`                   | 2,868 KB     | 637 KB      | 2.4 s      | 2.0 s     |
| `/products`           | 6,229 KB     | 1,379 KB    | 4.7 s      | 2.0 s     |
| `/products/sanskrit`  | 1,495 KB     | 523 KB      | 4.0 s      | 3.6 s     |
| `/blog/mero-nepali-…` | 420 KB       | 253 KB      | 3.2 s      | 2.1 s     |
| `/kickstand`          | 376 KB       | 377 KB      | 3.4 s      | 2.4 s     |

JavaScript is unchanged (103–132 KB). Lighthouse's SEO score was already 100;
it checks only basics. The local structured-data check below covers the rest.

## What changed

### SEO

- **One SEO component for every page** (`src/lib/components/SEO.svelte`, helpers
  in `src/lib/seo.ts`). Titles get the site name when it fits in 60 characters,
  drop it when it does not, and are cut at a word otherwise. Descriptions are
  cut at a word to 160. Canonical, Open Graph (with `og:image:alt`,
  `og:locale`) and Twitter tags everywhere. A `noindex` prop is available.
- **Product pages** now use it: titles and descriptions come from the product
  data and fit search results; the share image is the first store screenshot,
  or the icon.
- **Policy and account-deletion pages** (17) use it, with canonical URLs and
  Open Graph tags, and descriptions that say what the page covers.
- **JSON-LD:**
  - `Organization` with `@id`, legal name, founder, founding date, address and
    contact point; referenced by `@id` from the other schemas.
  - `WebSite` on the home page. No `SearchAction`: the site has no search.
  - `MobileApplication` for apps on Android or iOS, `SoftwareApplication`
    otherwise, with a real `applicationCategory`, `operatingSystem`,
    `inLanguage`, `installUrl` (not for coming-soon apps), `sameAs` store and
    release links, screenshots, licence, and `countriesSupported` for
    Nepal-only apps. **No `offers` or `aggregateRating`:** the site has no price
    or rating data, and invented values break Google's guidelines. Google shows
    app rich results only with one of them, so this needs real data (below).
  - `BlogPosting` on posts, now with `dateModified` support and `inLanguage`.
  - `BreadcrumbList` from Home on every page below it.
  - `FAQPage`, `ItemList` and Kickstand's `Product` are unchanged.
- **Category and languages** per app live in `src/lib/data/app-meta.ts`, kept
  out of `products.ts` so the listing redesign is not disturbed.
- **Sitemap** has `lastmod` for every URL, from the last git commit touching
  the page's source files (the post file for posts, the product data for
  product pages). Where git history is unavailable, posts fall back to their
  date and other URLs are listed without `lastmod` rather than with a guessed
  date. Vercel clones shallowly, so older pages may go without it there.
- **Semantic HTML:** Devanagari runs carry `lang="ne"`, or `lang="sa"` on the
  Sanskrit app's pages, through `LangText.svelte` on product pages and listing
  cards and inline spans on the policy pages; they render in Mukta, the design
  system's Devanagari font. The Flutter UI Challenges policy now has one `h1`.
  Blog covers have width and height set.
- **Performance:** icons over 384 px resized to 384 (7.6 MB → 1.2 MB in total,
  same files, same paths); blog covers converted to WebP (180 KB → 6–18 KB);
  Google Fonts moved to preconnected, non-blocking `<link>`s in `app.html`;
  every page prerendered.

### Agent readiness

- **`/apps.json`:** every app's name, slug, tagline, description, page and
  Markdown URLs, icon, platforms, status, category, languages, availability,
  licence, store links (Google Play, App Store, web, releases, source), other
  links, privacy policy and account-deletion URLs. CORS-open, prerendered.
- **`llms.txt`** links `apps.json` and lists every privacy policy;
  **`llms-full.txt`** already carried each app's description, platforms, store
  links and policy links.
- **`robots.txt`** allows everything, names the main AI crawlers and agents
  explicitly (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and
  others), and points to the sitemap, `llms.txt`, `llms-full.txt` and
  `apps.json`. `app.html` links `llms.txt`, `apps.json` and the RSS feed as
  alternates.
- **`/rss.xml`:** an RSS 2.0 feed of the blog.
- **WebMCP** (`src/lib/webmcp.ts`): four read-only tools, `list_apps`,
  `get_app_details`, `get_privacy_policy` and `get_contact`, over the same
  catalogue as `apps.json`. Status, checked November 2026: a W3C Web Machine
  Learning Community Group draft, in a Chrome origin trial and behind
  `chrome://flags/#enable-webmcp-testing`; the entry point has moved from
  `navigator.modelContext` to `document.modelContext`, so both are
  feature-detected. The layout imports the module only when one exists, so
  other browsers download nothing. `get_contact` returns details and sends
  nothing. It has not been exercised in a WebMCP-enabled browser.

## Verification

- `bun run check`: 0 errors, 1 warning that predates this change
  (`products/+page.svelte`, `state_referenced_locally`).
- `bun run build`: passes; 47 HTML pages prerendered.
- `vitest --project server`: 17 tests pass, 11 of them new in
  `src/lib/seo.test.ts`.
- Prettier: every file changed here passes, except the policy pages and one
  blog post, which failed `prettier --check` before this change and were left
  unformatted so their diffs show only the changes.
- Structured-data check: a local script parsed every prerendered page's JSON-LD,
  checked schema.org's required properties per type, breadcrumb order and
  canonical match, title and description length and uniqueness, Open Graph and
  Twitter tags, one `h1`, `html lang`, and untagged Devanagari. Before: 42
  problems across 24 prerendered pages. After: none across 47.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `apps.json`,
  `rss.xml` and the `.md` twins return 200 from the preview server;
  `/projects/sanskrit` still redirects 308.
- Not run: Google's Rich Results Test and the schema.org validator are online
  services and were not used; run them on the deployed preview.

## Needs real data

- **Ratings and prices** for `aggregateRating` and `offers`. Most apps are
  probably free, but the site does not say so; confirm per app before adding
  `offers: { price: 0 }`.
- **Languages and categories** in `app-meta.ts` are inferred from each
  description; check them against the store listings.
- **Store links:** Kickstand has only checkout links; Bhadama, Typer Kids,
  Tilepad, SSHetu and Karmashala have no privacy policy URL. Bhadama and the
  other Play-only apps may also have App Store listings the site does not know.
- **Share images:** pages without screenshots share the app icon or the site
  default `og-image.png` (1200 × 630). Per-app 1200 × 630 images would look
  better in link previews.
- **Contrast:** the brand orange with white text (3.09:1) and the dark-theme
  eyebrow colour (2.57:1) fail WCAG AA. Fixing them is a design-system decision,
  so it was left alone.
- `static/images/hero_bg.jpg` (440 KB) is not referenced anywhere.
