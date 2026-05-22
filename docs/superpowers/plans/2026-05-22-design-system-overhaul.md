# Popup Bits Design System Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the popupbits.com SvelteKit site as a products-led studio site using the popup-bits-design-system, shadcn-svelte primitives, Tailwind v4, Svelte 5 runes, and bun — removing every piece of legacy code.

**Architecture:** Single-file vendored design-system CSS provides base tokens + archetype + product theme layers. Tailwind v4 `@theme` re-exports those tokens to Tailwind/shadcn-svelte variables (with light + dark). Routes are `/`, `/products`, `/products/[slug]`, `/about`, `/contact`. Phase 0 sets up the foundation sequentially; Phase 1 splits into four parallel streams (Products, Home, About+Contact, Chrome); Phase 2 integrates and tests.

**Tech Stack:** SvelteKit 2 (latest), Svelte 5 runes only, Tailwind v4, shadcn-svelte, bits-ui, mode-watcher, @lucide/svelte, svelte-sonner, vitest browser project (Playwright/Chromium), bun.

**Spec:** `docs/superpowers/specs/2026-05-22-design-system-overhaul-design.md`

---

## Conventions used in this plan

- **All commands use `bun`.** Replace any `npm`/`pnpm` calls in legacy code. If a command fails because a binary doesn't exist, prefix with `bunx`.
- **Svelte 5 runes are mandatory.** No `export let`, no `$:`, no `on:` directives on Svelte components (DOM elements still use `onclick=`). Children are `let { children } = $props(); ... {@render children?.()}`.
- **Commit after every numbered Task.** Use the suggested commit message verbatim (drop the Co-Author line if your tooling adds one automatically — keep it otherwise).
- **`bun run check` and `bun run dev` should pass after every Task** unless the Task explicitly says otherwise.
- **Paths are relative to repo root** `/home/dlohani/projects/popupbits` unless absolute.

---

## Phase 0 — Foundation (sequential, single agent)

### Task 1: Switch tooling to bun, clean legacy lockfiles

**Files:**
- Modify: `package.json`
- Delete: `pnpm-lock.yaml` (already deleted, ensure removal is staged)
- Keep: `bun.lock`

- [ ] **Step 1: Verify bun is installed**

```bash
bun --version
```

Expected: prints a version (1.x+). If missing, install per https://bun.sh/docs/installation. Do not proceed otherwise.

- [ ] **Step 2: Update package.json scripts to use bun (no string change needed for `vite`/`svelte-kit` calls — they already work, but remove the npm script reference in the legacy "test" script)**

Edit `package.json` "scripts" block to:

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "preview": "vite preview",
  "prepare": "svelte-kit sync || echo ''",
  "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
  "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
  "format": "prettier --write .",
  "lint": "prettier --check .",
  "test:unit": "vitest",
  "test": "bun run test:unit -- --run"
}
```

The only change is `"test": "npm run test:unit -- --run"` → `"test": "bun run test:unit -- --run"`.

- [ ] **Step 3: Remove the `pnpm` config block from package.json** (it has no meaning with bun)

Delete this block from `package.json`:

```json
"pnpm": {
  "onlyBuiltDependencies": [
    "esbuild"
  ]
}
```

- [ ] **Step 4: Drop sass-related dev deps (no longer needed; tokens are pure CSS)**

```bash
bun remove sass svelte-preprocess
```

If those aren't installed, the command is a no-op. Then verify they no longer appear in `package.json`.

- [ ] **Step 5: Update `svelte.config.js` to drop the sass preprocessor**

Overwrite `svelte.config.js` with:

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};

export default config;
```

- [ ] **Step 6: Re-install with bun and verify dev server boots**

```bash
rm -rf node_modules
bun install
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/
kill %1 2>/dev/null
```

Expected: `200`. If not, check terminal output for errors.

- [ ] **Step 7: Stage and commit**

```bash
git add package.json svelte.config.js bun.lock
git rm pnpm-lock.yaml
git commit -m "chore: switch tooling to bun, drop sass/svelte-preprocess

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Bring Svelte / SvelteKit / Vite / Tailwind to latest

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update core deps to latest**

```bash
bun add -d svelte@latest @sveltejs/kit@latest @sveltejs/adapter-auto@latest @sveltejs/vite-plugin-svelte@latest vite@latest svelte-check@latest typescript@latest tailwindcss@latest @tailwindcss/vite@latest @tailwindcss/forms@latest @tailwindcss/typography@latest prettier@latest prettier-plugin-svelte@latest prettier-plugin-tailwindcss@latest vitest@latest @vitest/browser@latest vitest-browser-svelte@latest playwright@latest
```

- [ ] **Step 2: Sync SvelteKit and run check**

```bash
bun run prepare
bun run check
```

Expected: 0 errors. Warnings about legacy `export let` / `$:` / `on:` directives are EXPECTED at this point — Phase 1/2 fixes them. Note them; ignore for now.

- [ ] **Step 3: Boot dev server smoke**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/
kill %1 2>/dev/null
```

Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: bump Svelte/SvelteKit/Vite/Tailwind to latest

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Install shadcn-svelte ecosystem + runtime libs

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime libraries**

```bash
bun add bits-ui mode-watcher @lucide/svelte clsx tailwind-merge tailwind-variants svelte-sonner
```

- [ ] **Step 2: Confirm versions**

```bash
bun pm ls | grep -E "bits-ui|mode-watcher|@lucide/svelte|tailwind-variants|svelte-sonner"
```

Expected: each is listed with a recent version.

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add bits-ui, mode-watcher, lucide, tailwind-variants, sonner

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Vendor the popup-bits-design-system CSS

**Files:**
- Create: `src/lib/design-system/colors_and_type.css`
- Create: `src/lib/design-system/README.md`

- [ ] **Step 1: Make the directory**

```bash
mkdir -p src/lib/design-system
```

- [ ] **Step 2: Pull the upstream CSS into the repo**

```bash
SHA=$(curl -fsSL https://api.github.com/repos/lohanidamodar/popup-bits-design-system/commits/main | grep '"sha"' | head -1 | awk -F'"' '{print $4}')
echo "Upstream SHA: $SHA"
curl -fsSL "https://raw.githubusercontent.com/lohanidamodar/popup-bits-design-system/${SHA}/colors_and_type.css" \
  -o src/lib/design-system/colors_and_type.css.tmp
{
  echo "/*"
  echo " * Vendored from https://github.com/lohanidamodar/popup-bits-design-system"
  echo " * Upstream SHA: ${SHA}"
  echo " * Fetched: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo " * To update: re-run the script in plan Task 4 Step 2."
  echo " */"
  cat src/lib/design-system/colors_and_type.css.tmp
} > src/lib/design-system/colors_and_type.css
rm src/lib/design-system/colors_and_type.css.tmp
head -10 src/lib/design-system/colors_and_type.css
wc -l src/lib/design-system/colors_and_type.css
```

Expected: header comment present, line count > 100.

- [ ] **Step 3: Add a short README explaining the vendoring**

Create `src/lib/design-system/README.md`:

```markdown
# Vendored design system

`colors_and_type.css` is copied verbatim from
[lohanidamodar/popup-bits-design-system](https://github.com/lohanidamodar/popup-bits-design-system).

The header comment in the CSS records the upstream commit SHA. To pull a
fresh copy, re-run the curl block in
`docs/superpowers/plans/2026-05-22-design-system-overhaul.md` Task 4
Step 2.

Do not edit this file by hand except to add product theme classes that
the upstream does not yet define (e.g. `.theme-bhadama`). Any local
overrides should live in `src/app.css` instead.
```

- [ ] **Step 4: Add a stub `.theme-bhadama` if it's missing upstream**

```bash
if ! grep -q '\.theme-bhadama' src/lib/design-system/colors_and_type.css; then
  cat >> src/lib/design-system/colors_and_type.css <<'EOF'

/* ---- Local stub: bhadama product theme (not yet in upstream DS) ---- */
.theme-bhadama {
  --t-accent: #6366f1;
  --t-accent-strong: #4f46e5;
  --t-accent-soft: #eef2ff;
  --t-on-accent: #ffffff;
}
.theme-bhadama-bold {
  --t-accent: #4f46e5;
  --t-accent-strong: #4338ca;
  --t-accent-soft: #e0e7ff;
  --t-on-accent: #ffffff;
}
EOF
  echo "Added theme-bhadama stub."
else
  echo "theme-bhadama already present upstream."
fi
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/design-system/
git commit -m "feat(ds): vendor popup-bits-design-system tokens

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Rewrite `src/app.css` from scratch (Tailwind v4 + DS tokens)

**Files:**
- Modify: `src/app.css` (full rewrite)

- [ ] **Step 1: Replace `src/app.css` entirely with the following content**

Write `src/app.css`:

```css
@import 'tailwindcss';
@import '@tailwindcss/forms';
@import '@tailwindcss/typography';
@import './lib/design-system/colors_and_type.css';

/* ---------- Tailwind theme: maps DS tokens to Tailwind/shadcn-svelte variables ---------- */
@theme {
	/* Fonts */
	--font-sans: var(--font-body, 'Nunito', ui-sans-serif, system-ui, sans-serif);
	--font-display: var(--font-display, 'Baloo 2', ui-sans-serif, system-ui, sans-serif);
	--font-mono: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);

	/* Radii */
	--radius: var(--rad-md, 12px);
	--radius-sm: var(--rad-sm, 8px);
	--radius-md: var(--rad-md, 12px);
	--radius-lg: var(--rad-lg, 16px);
	--radius-xl: var(--rad-xl, 20px);

	/* Shadows */
	--shadow-xs: var(--sh-xs);
	--shadow-sm: var(--sh-sm);
	--shadow-md: var(--sh-md);
	--shadow-lg: var(--sh-lg);
	--shadow-xl: var(--sh-xl);
}

/* ---------- shadcn-svelte semantic colors, light mode (mapped from DS neutrals + theme accent) ---------- */
@layer base {
	:root {
		--background: var(--n-0, #fafaf7);
		--foreground: var(--n-900, #14171f);
		--card: #ffffff;
		--card-foreground: var(--n-900, #14171f);
		--popover: #ffffff;
		--popover-foreground: var(--n-900, #14171f);
		--primary: var(--t-accent, #ff5a3c);
		--primary-foreground: var(--t-on-accent, #ffffff);
		--secondary: var(--n-100, #f1f3f5);
		--secondary-foreground: var(--n-900, #14171f);
		--muted: var(--n-100, #f1f3f5);
		--muted-foreground: var(--n-600, #5b6675);
		--accent: var(--t-accent-soft, #ffe9e2);
		--accent-foreground: var(--t-accent-strong, #d4351c);
		--destructive: var(--s-danger, #d92d20);
		--destructive-foreground: #ffffff;
		--border: var(--n-200, #e6e8ec);
		--input: var(--n-200, #e6e8ec);
		--ring: var(--t-accent, #ff5a3c);
	}

	[data-theme='dark'] {
		--background: var(--n-900, #0c0f14);
		--foreground: var(--n-50, #f7f8fa);
		--card: var(--n-800, #161a22);
		--card-foreground: var(--n-50, #f7f8fa);
		--popover: var(--n-800, #161a22);
		--popover-foreground: var(--n-50, #f7f8fa);
		--primary: var(--t-accent, #ff7a5e);
		--primary-foreground: var(--t-on-accent, #ffffff);
		--secondary: var(--n-700, #232936);
		--secondary-foreground: var(--n-50, #f7f8fa);
		--muted: var(--n-700, #232936);
		--muted-foreground: var(--n-300, #c2c8d0);
		--accent: var(--n-700, #232936);
		--accent-foreground: var(--t-accent-soft, #ffe9e2);
		--destructive: var(--s-danger, #f97066);
		--destructive-foreground: #1a0d0c;
		--border: var(--n-700, #232936);
		--input: var(--n-700, #232936);
		--ring: var(--t-accent, #ff7a5e);
	}

	* {
		border-color: hsl(var(--border) / 1);
	}

	html {
		scroll-behavior: smooth;
	}

	body {
		background-color: var(--background);
		color: var(--foreground);
		font-family: var(--font-sans);
		-webkit-font-smoothing: antialiased;
	}
}
```

- [ ] **Step 2: Run check and dev server**

```bash
bun run check
bun run dev &
sleep 4
curl -s http://localhost:5173/ | head -50
kill %1 2>/dev/null
```

Expected: check passes (ignore legacy `export let` warnings — those go away in Phase 1). Dev returns HTML.

- [ ] **Step 3: Commit**

```bash
git add src/app.css
git commit -m "feat(ds): rewrite app.css with Tailwind v4 @theme + DS tokens

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Initialise shadcn-svelte components

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/lib/components/ui/**` (multiple)

- [ ] **Step 1: Init shadcn-svelte**

```bash
bunx shadcn-svelte@latest init
```

When prompted:

| Prompt | Answer |
|---|---|
| TypeScript | yes |
| Style | default |
| Base color | neutral |
| Where is your global CSS? | `src/app.css` |
| Components alias | `$lib/components` |
| Utils alias | `$lib/utils` |
| UI components alias | `$lib/components/ui` |
| Hooks alias | `$lib/hooks` |
| Lib alias | `$lib` |

If the CLI errors on existing `src/app.css` because it doesn't recognise the `@theme` block, accept its proposed file write but immediately re-apply the Task 5 file content afterwards (`git checkout src/app.css` and then re-write it).

- [ ] **Step 2: Add the component primitives we need**

```bash
bunx shadcn-svelte@latest add button card sheet navigation-menu badge separator input textarea label sonner dialog tabs dropdown-menu
```

If any component name is unrecognised in the latest shadcn-svelte, fall back to the closest current equivalent (the CLI lists available components on prompt).

- [ ] **Step 3: Verify check still passes**

```bash
bun run check
```

Expected: 0 errors. Warnings about legacy `export let` from old `MainHeader`/`Hero`/etc. are still expected.

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/utils.ts src/lib/components/ui src/app.css
git commit -m "feat(ui): scaffold shadcn-svelte primitives

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Replace root layout with arch+theme wrapper, mode-watcher, and new chrome slots

**Files:**
- Modify: `src/routes/+layout.svelte`
- Create: `src/lib/components/SiteNav.svelte` (placeholder — Task replaced by Stream D in Phase 1)
- Create: `src/lib/components/SiteFooter.svelte` (placeholder — Task replaced by Stream D)

- [ ] **Step 1: Create placeholder SiteNav so the layout compiles**

Write `src/lib/components/SiteNav.svelte`:

```svelte
<script lang="ts">
</script>

<nav class="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a href="/" class="font-display text-xl font-extrabold tracking-tight">Popup Bits</a>
		<div class="text-sm text-muted-foreground">Stream D will replace this.</div>
	</div>
</nav>
```

- [ ] **Step 2: Create placeholder SiteFooter**

Write `src/lib/components/SiteFooter.svelte`:

```svelte
<script lang="ts">
</script>

<footer class="border-t border-border mt-24">
	<div class="max-w-6xl mx-auto px-6 py-10 text-sm text-muted-foreground">
		Popup Bits Pvt. Ltd. — Kathmandu, Nepal. (Stream D will replace this.)
	</div>
</footer>
```

- [ ] **Step 3: Rewrite root layout**

Overwrite `src/routes/+layout.svelte` with:

```svelte
<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors closeButton />

<div class="arch-utility theme-popupbits min-h-dvh flex flex-col">
	<SiteNav />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<SiteFooter />
</div>
```

> **Note:** the `Toaster` import path follows shadcn-svelte's `sonner` component conventions. If the generated component lives at a slightly different path, adjust the import to match what `Task 6 Step 2` produced.

- [ ] **Step 4: Verify the app boots with the new shell**

```bash
bun run dev &
sleep 4
curl -s http://localhost:5173/ | grep -E "Stream D|arch-utility" || echo "shell not found"
kill %1 2>/dev/null
```

Expected: the page either renders the legacy home (`+page.svelte` is unchanged) inside the new shell — that's fine — or shows compile errors **only** from legacy components (which Phase 1 streams will fix). If compile fails on the new layout itself, fix before continuing.

- [ ] **Step 5: Commit**

```bash
git add src/routes/+layout.svelte src/lib/components/SiteNav.svelte src/lib/components/SiteFooter.svelte
git commit -m "feat(layout): wrap app in arch-utility theme-popupbits + ModeWatcher + Toaster

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Wire `/projects` → `/products` redirects

**Files:**
- Create: `src/hooks.server.ts`

- [ ] **Step 1: Create the redirect hook**

Write `src/hooks.server.ts`:

```ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	if (path === '/projects' || path === '/projects/') {
		throw redirect(308, '/products');
	}
	if (path.startsWith('/projects/')) {
		throw redirect(308, '/products/' + path.slice('/projects/'.length));
	}

	return resolve(event);
};
```

- [ ] **Step 2: Verify redirect at runtime**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://localhost:5173/projects
kill %1 2>/dev/null
```

Expected: `308 -> /products` (the curl format string prints status + redirect target).

- [ ] **Step 3: Commit**

```bash
git add src/hooks.server.ts
git commit -m "feat(routing): 308 redirect /projects(/...) to /products(/...)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 1 — Parallel streams

After Phase 0, four streams are independent. Dispatch one subagent per stream. Each stream has its own scoped task list below.

**File-ownership map (no overlap):**

| Stream | Files owned (exclusive) |
|---|---|
| A. Products | `src/lib/data/products.ts`, `src/lib/data/company.ts`, `src/routes/products/**`, `src/lib/components/ProductCard.svelte`, `src/lib/components/ProductDetail.svelte`, `static/products/**` |
| B. Home page | `src/routes/+page.svelte`, `src/lib/components/{Hero,StatsBand,ConsultingSection}.svelte` |
| C. About + Contact | `src/routes/about/+page.svelte`, `src/routes/contact/+page.svelte`, `src/routes/contact/flutter-ui-challenges-privacy-policy/+page.svelte`, `src/lib/components/PageHeader.svelte` |
| D. Chrome | `src/lib/components/{SiteNav,SiteFooter,ThemeToggle,SEO}.svelte`, `src/lib/index.ts`, `src/app.html` (if needed) |

`src/lib/data/company.ts` is shared read-only between A, B, C, D — Stream A writes it; others import it. Stream A MUST land first (it produces the data file). To unblock the others without serial waiting, **A's first task (Task 9) writes only `company.ts` and `products.ts`** before any UI work — once those exist (commit 1 of Stream A), Streams B/C/D can start in parallel with A's remaining tasks.

---

## Stream A — Products

### Task 9: Define data files (company.ts, products.ts)

**Files:**
- Create: `src/lib/data/company.ts`
- Create: `src/lib/data/products.ts`
- Modify: `src/lib/index.ts`
- Delete: `src/lib/data/{company,content,pricing,projects,services,technologies,index}.js`

- [ ] **Step 1: Write `src/lib/data/company.ts`**

```ts
export type SocialLinks = {
	github: string;
	youtube: string;
	linkedin: string;
	twitter: string;
	email: string;
};

export type CompanyStat = {
	value: string;
	label: string;
	description: string;
};

export const company = {
	name: 'Popup Bits',
	legalName: 'Popup Bits Pvt. Ltd.',
	tagline: 'A Kathmandu studio building apps for the way Nepal uses tech',
	description:
		'We design and build our own products — calendars, learning apps, games — and take on selected client work in Flutter, web, and platform engineering.',
	founder: 'Damodar Lohani',
	established: 2016,
	url: 'https://popupbits.com',
	contact: {
		email: 'popupbits@gmail.com',
		phone: '+977-9823341413',
		address: {
			street: 'Gaurighat',
			city: 'Kathmandu',
			zone: '8',
			country: 'Nepal'
		},
		timezone: 'Asia/Kathmandu (GMT+5:45)'
	},
	social: {
		github: 'https://github.com/lohanidamodar',
		youtube: 'https://www.youtube.com/c/reactbits',
		linkedin: 'https://linkedin.com/in/lohanidamodar',
		twitter: 'https://twitter.com/lohanidamodar',
		email: 'mailto:popupbits@gmail.com'
	} satisfies SocialLinks,
	stats: [
		{ value: '8+', label: 'Years shipping', description: 'building products since 2016' },
		{ value: '6', label: 'Products live', description: 'across Android and Web' },
		{ value: '50+', label: 'Projects shipped', description: 'studio + consulting work' },
		{ value: '2', label: 'Languages', description: 'English and Nepali (Devanagari)' }
	] satisfies CompanyStat[],
	consulting: {
		blurb:
			'We take on a small number of consulting engagements each year — usually Flutter app builds, design systems, or backend platform work.',
		capabilities: [
			'Flutter apps end-to-end',
			'Svelte / web platforms',
			'Firebase & Appwrite backends',
			'Design systems & UI engineering'
		]
	},
	seo: {
		defaultTitle: 'Popup Bits — a Kathmandu studio',
		defaultDescription:
			'Popup Bits is a Kathmandu-based software studio building apps like Mero Patro, Mero Nepali, SpellCraft, and Bhadama — and taking on selected client work.',
		ogImage: '/images/og-image.jpg',
		twitterHandle: '@lohanidamodar'
	}
} as const;

export type Company = typeof company;
```

- [ ] **Step 2: Write `src/lib/data/products.ts`**

```ts
export type ProductPlatform = 'web' | 'android' | 'ios';
export type ProductStatus = 'live' | 'beta' | 'pipeline';
export type ProductLinkKind = 'play' | 'web' | 'github' | 'other';

export type ProductLink = {
	label: string;
	href: string;
	kind: ProductLinkKind;
};

export type Product = {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	themeClass: string;
	platforms: ProductPlatform[];
	links: ProductLink[];
	icon: string;
	screenshots: string[];
	tech: string[];
	status: ProductStatus;
	featured: boolean;
	year: number;
};

export const products: Product[] = [
	{
		slug: 'mero-patro',
		name: 'Mero Patro',
		tagline: 'The Nepali calendar, the way Nepalis use it.',
		description:
			'Mero Patro is a Nepali calendar (Bikram Sambat) with tithis, festivals, panchanga, and date conversion — built for everyday use in Nepal and the diaspora.',
		themeClass: 'theme-meropatro',
		platforms: ['web'],
		links: [{ label: 'Open Mero Patro', href: 'https://meropatro.com', kind: 'web' }],
		icon: '/products/mero-patro/icon.svg',
		screenshots: [],
		tech: ['Svelte', 'TypeScript', 'PWA'],
		status: 'live',
		featured: true,
		year: 2020
	},
	{
		slug: 'mero-nepali',
		name: 'Mero Nepali',
		tagline: 'Learn Nepali, designed for kids and absolute beginners.',
		description:
			'Mero Nepali teaches the Devanagari alphabet, numbers, and core vocabulary through bright, friendly lessons — for children and anyone starting fresh.',
		themeClass: 'theme-meronepali',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.meronepali',
				kind: 'play'
			}
		],
		icon: '/products/mero-nepali/icon.svg',
		screenshots: [],
		tech: ['Flutter', 'Firebase'],
		status: 'live',
		featured: true,
		year: 2022
	},
	{
		slug: 'spellcraft',
		name: 'SpellCraft',
		tagline: 'A word-building game with a Nepali twist.',
		description:
			'SpellCraft turns spelling and word puzzles into a daily game — with bilingual support for English and Nepali wordlists.',
		themeClass: 'theme-spellcraft',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.spellcraft',
				kind: 'play'
			}
		],
		icon: '/products/spellcraft/icon.svg',
		screenshots: [],
		tech: ['Flutter'],
		status: 'live',
		featured: true,
		year: 2023
	},
	{
		slug: 'bhadama',
		name: 'Bhadama',
		tagline: 'Rent, list, borrow — the local-first marketplace.',
		description:
			'Bhadama is a local rental and listing marketplace — tools, gear, and short-term items, neighbour to neighbour.',
		themeClass: 'theme-bhadama',
		platforms: ['android', 'web'],
		links: [{ label: 'Visit Bhadama', href: 'https://bhadama.app', kind: 'web' }],
		icon: '/products/bhadama/icon.svg',
		screenshots: [],
		tech: ['Flutter', 'Appwrite'],
		status: 'beta',
		featured: true,
		year: 2024
	},
	{
		slug: 'ui-challenges-flutter',
		name: 'UI Challenges — Flutter',
		tagline: '100+ open-source Flutter UI screens.',
		description:
			'A long-running open-source reference app with 100+ production-quality UI screens implemented in Flutter — used by thousands of developers learning the framework.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.lohanidamodar.fluc',
				kind: 'play'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/flutter_ui_challenges',
				kind: 'github'
			}
		],
		icon: '/products/ui-challenges-flutter/icon.svg',
		screenshots: [],
		tech: ['Flutter', 'Open source'],
		status: 'live',
		featured: true,
		year: 2018
	},
	{
		slug: 'mero-tayari',
		name: 'Mero Tayari',
		tagline: 'Practice for Nepali government exams.',
		description:
			'Reading materials, model questions, timed practice exams, and quizzes for Loksewa and other Nepali government exams.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.merotayari',
				kind: 'play'
			}
		],
		icon: '/products/mero-tayari/icon.svg',
		screenshots: [],
		tech: ['Flutter', 'Firebase'],
		status: 'live',
		featured: false,
		year: 2023
	}
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
```

- [ ] **Step 3: Replace `src/lib/index.ts`**

```ts
export { company } from './data/company.js';
export type { Company, CompanyStat, SocialLinks } from './data/company.js';

export {
	products,
	featuredProducts,
	getProductBySlug
} from './data/products.js';
export type {
	Product,
	ProductLink,
	ProductLinkKind,
	ProductPlatform,
	ProductStatus
} from './data/products.js';
```

- [ ] **Step 4: Delete the legacy `.js` data files**

```bash
rm src/lib/data/company.js src/lib/data/content.js src/lib/data/index.js src/lib/data/pricing.js src/lib/data/projects.js src/lib/data/services.js src/lib/data/technologies.js
```

- [ ] **Step 5: Add favicon-quality placeholder product icons (so `<img src>` doesn't 404)**

```bash
mkdir -p static/products/{mero-patro,mero-nepali,spellcraft,bhadama,ui-challenges-flutter,mero-tayari}
cp static/favicon.svg static/products/mero-patro/icon.svg
cp static/favicon.svg static/products/mero-nepali/icon.svg
cp static/favicon.svg static/products/spellcraft/icon.svg
cp static/favicon.svg static/products/bhadama/icon.svg
cp static/favicon.svg static/products/ui-challenges-flutter/icon.svg
cp static/favicon.svg static/products/mero-tayari/icon.svg
```

(Real icons can be added later — the goal here is no broken images.)

- [ ] **Step 6: Commit**

```bash
git add src/lib/data src/lib/index.ts static/products
git rm src/lib/data/*.js 2>/dev/null || true
git commit -m "feat(data): replace legacy content with typed products + company

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

> **Stream B / C / D may now begin in parallel.** The remaining Stream A tasks continue.

---

### Task 10: Build ProductCard component

**Files:**
- Create: `src/lib/components/ProductCard.svelte`

- [ ] **Step 1: Write `ProductCard.svelte`**

```svelte
<script lang="ts">
	import type { Product } from '$lib/data/products.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	let { product }: { product: Product } = $props();

	const platformLabels: Record<Product['platforms'][number], string> = {
		web: 'Web',
		android: 'Android',
		ios: 'iOS'
	};
</script>

<a
	href={`/products/${product.slug}`}
	class={`group block ${product.themeClass}`}
	aria-label={`Open ${product.name}`}
>
	<Card.Root class="h-full transition-shadow group-hover:shadow-lg overflow-hidden">
		<Card.Header class="flex flex-row items-center gap-4">
			<img
				src={product.icon}
				alt=""
				width="48"
				height="48"
				class="h-12 w-12 rounded-xl"
				loading="lazy"
			/>
			<div class="flex-1">
				<Card.Title class="text-lg">{product.name}</Card.Title>
				<Card.Description class="text-xs">{product.tagline}</Card.Description>
			</div>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
		</Card.Content>
		<Card.Footer class="flex items-center gap-2">
			{#each product.platforms as p (p)}
				<Badge variant="secondary">{platformLabels[p]}</Badge>
			{/each}
			{#if product.status !== 'live'}
				<Badge variant="outline">{product.status}</Badge>
			{/if}
		</Card.Footer>
	</Card.Root>
</a>
```

- [ ] **Step 2: Verify it compiles**

```bash
bun run check 2>&1 | tail -20
```

Expected: no error mentioning `ProductCard.svelte`. (Other legacy warnings may still exist.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/ProductCard.svelte
git commit -m "feat(products): add ProductCard component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Build /products list page

**Files:**
- Create: `src/routes/products/+page.svelte`
- Create: `src/routes/products/+page.ts`

- [ ] **Step 1: Write `src/routes/products/+page.ts`**

```ts
import type { PageLoad } from './$types';
import { products } from '$lib/data/products.js';

export const prerender = true;

export const load: PageLoad = () => {
	return { products };
};
```

- [ ] **Step 2: Write `src/routes/products/+page.svelte`**

```svelte
<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let { data } = $props();

	let filter = $state<'all' | 'web' | 'android' | 'ios'>('all');

	const filtered = $derived(
		filter === 'all'
			? data.products
			: data.products.filter((p) => p.platforms.includes(filter))
	);

	const filters: { label: string; value: typeof filter }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Web', value: 'web' },
		{ label: 'Android', value: 'android' },
		{ label: 'iOS', value: 'ios' }
	];
</script>

<svelte:head>
	<title>Products — Popup Bits</title>
	<meta name="description" content="Apps and products built by Popup Bits." />
</svelte:head>

<PageHeader
	title="Products"
	subtitle="Apps and games we design, build, and ship from Kathmandu."
/>

<section class="max-w-6xl mx-auto px-6 pb-24">
	<div class="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter by platform">
		{#each filters as f (f.value)}
			<button
				type="button"
				role="tab"
				aria-selected={filter === f.value}
				onclick={() => (filter = f.value)}
				class={`rounded-full border px-4 py-1.5 text-sm transition ${
					filter === f.value
						? 'bg-primary text-primary-foreground border-primary'
						: 'border-border text-muted-foreground hover:text-foreground'
				}`}
			>
				{f.label}
			</button>
		{/each}
	</div>

	<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="text-muted-foreground py-12 text-center">No products match that filter.</p>
	{/if}
</section>
```

> `PageHeader` is owned by Stream C. If Stream C hasn't landed it yet, write a minimal stub at `src/lib/components/PageHeader.svelte` so Stream A is unblocked:
>
> ```svelte
> <script lang="ts">
> 	let { title, subtitle = '' }: { title: string; subtitle?: string } = $props();
> </script>
> <header class="max-w-6xl mx-auto px-6 pt-24 pb-12">
> 	<h1 class="font-display text-5xl font-extrabold tracking-tight">{title}</h1>
> 	{#if subtitle}
> 		<p class="text-lg text-muted-foreground mt-4 max-w-2xl">{subtitle}</p>
> 	{/if}
> </header>
> ```
>
> Stream C will replace it with the canonical version. The Stream C and Stream A diffs on this file are merge-resolvable.

- [ ] **Step 3: Verify the page renders**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/products
kill %1 2>/dev/null
```

Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add src/routes/products src/lib/components/PageHeader.svelte 2>/dev/null
git commit -m "feat(products): /products list page with platform filter

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Build /products/[slug] detail page

**Files:**
- Create: `src/routes/products/[slug]/+page.ts`
- Create: `src/routes/products/[slug]/+page.svelte`
- Create: `src/lib/components/ProductDetail.svelte`
- Delete: `src/routes/projects/` (entire directory)

- [ ] **Step 1: Write `src/routes/products/[slug]/+page.ts`**

```ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { products, getProductBySlug } from '$lib/data/products.js';

export const prerender = true;

export const entries = () => products.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	return { product };
};
```

- [ ] **Step 2: Write `src/lib/components/ProductDetail.svelte`**

```svelte
<script lang="ts">
	import type { Product } from '$lib/data/products.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { ExternalLink, Github, PlayCircle, Globe } from '@lucide/svelte';

	let { product }: { product: Product } = $props();

	const iconFor = (kind: Product['links'][number]['kind']) => {
		if (kind === 'play') return PlayCircle;
		if (kind === 'github') return Github;
		if (kind === 'web') return Globe;
		return ExternalLink;
	};
</script>

<div class={`${product.themeClass}`}>
	<header class="bg-accent text-accent-foreground">
		<div class="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
			<img src={product.icon} alt="" class="h-24 w-24 rounded-3xl shadow-md" />
			<div>
				<div class="flex flex-wrap items-center gap-2 mb-3">
					{#each product.platforms as p (p)}
						<Badge variant="secondary" class="capitalize">{p}</Badge>
					{/each}
					{#if product.status !== 'live'}
						<Badge variant="outline" class="capitalize">{product.status}</Badge>
					{/if}
				</div>
				<h1 class="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
					{product.name}
				</h1>
				<p class="mt-3 max-w-2xl text-lg opacity-80">{product.tagline}</p>
				<div class="mt-6 flex flex-wrap gap-3">
					{#each product.links as link (link.href)}
						{@const Icon = iconFor(link.kind)}
						<Button href={link.href} target="_blank" rel="noopener noreferrer">
							<Icon class="size-4" />
							{link.label}
						</Button>
					{/each}
				</div>
			</div>
		</div>
	</header>

	<section class="max-w-3xl mx-auto px-6 py-16">
		<h2 class="font-display text-2xl font-bold mb-4">About</h2>
		<p class="text-lg leading-relaxed text-foreground/90">{product.description}</p>

		<h2 class="font-display text-2xl font-bold mt-12 mb-4">Built with</h2>
		<div class="flex flex-wrap gap-2">
			{#each product.tech as t (t)}
				<Badge variant="outline">{t}</Badge>
			{/each}
		</div>
	</section>

	{#if product.screenshots.length > 0}
		<section class="max-w-6xl mx-auto px-6 pb-24">
			<h2 class="font-display text-2xl font-bold mb-6">Screenshots</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each product.screenshots as shot, i (shot)}
					<img
						src={shot}
						alt={`${product.name} screenshot ${i + 1}`}
						class="w-full rounded-xl border border-border"
						loading="lazy"
					/>
				{/each}
			</div>
		</section>
	{/if}
</div>
```

> The `Button` `href`/`target`/`rel` pass-through assumes shadcn-svelte's button forwards arbitrary attributes (it does via `bits-ui`). If a specific generated version doesn't, wrap the icon+label in an `<a>` styled like a button instead.

- [ ] **Step 3: Write `src/routes/products/[slug]/+page.svelte`**

```svelte
<script lang="ts">
	import ProductDetail from '$lib/components/ProductDetail.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.product.name} — Popup Bits</title>
	<meta name="description" content={data.product.tagline} />
</svelte:head>

<ProductDetail product={data.product} />
```

- [ ] **Step 4: Remove the legacy `/projects` routes (they are now handled by the redirect hook)**

```bash
rm -rf src/routes/projects
```

- [ ] **Step 5: Verify each detail page resolves**

```bash
bun run dev &
sleep 4
for slug in mero-patro mero-nepali spellcraft bhadama ui-challenges-flutter mero-tayari; do
  printf "%s -> %s\n" "$slug" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:5173/products/$slug)"
done
printf "redirect: %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:5173/projects/mero-patro)"
kill %1 2>/dev/null
```

Expected: each `200`, and `/projects/mero-patro` returns `308`.

- [ ] **Step 6: Commit**

```bash
git add src/routes/products src/lib/components/ProductDetail.svelte
git rm -r src/routes/projects 2>/dev/null || true
git commit -m "feat(products): /products/[slug] detail + remove legacy /projects routes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Stream B — Home page

### Task 13: Hero component

**Files:**
- Create: `src/lib/components/Hero.svelte`
- Delete: `src/lib/components/Hero.svelte` (legacy — overwritten in the same step)

- [ ] **Step 1: Overwrite `src/lib/components/Hero.svelte`**

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';

	type Cta = { label: string; href: string; variant?: 'default' | 'secondary' | 'outline' };

	let {
		eyebrow,
		title,
		subtitle,
		primary,
		secondary,
		visual
	}: {
		eyebrow?: string;
		title: string;
		subtitle?: string;
		primary?: Cta;
		secondary?: Cta;
		visual?: Snippet;
	} = $props();
</script>

<section class="relative overflow-hidden">
	<div class="max-w-6xl mx-auto px-6 pt-24 pb-20 grid gap-12 md:grid-cols-2 md:items-center">
		<div>
			{#if eyebrow}
				<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-4">
					{eyebrow}
				</p>
			{/if}
			<h1 class="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
				{title}
			</h1>
			{#if subtitle}
				<p class="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">{subtitle}</p>
			{/if}
			{#if primary || secondary}
				<div class="mt-10 flex flex-wrap gap-3">
					{#if primary}
						<Button href={primary.href} size="lg" variant={primary.variant ?? 'default'}>
							{primary.label}
						</Button>
					{/if}
					{#if secondary}
						<Button href={secondary.href} size="lg" variant={secondary.variant ?? 'outline'}>
							{secondary.label}
						</Button>
					{/if}
				</div>
			{/if}
		</div>
		{#if visual}
			<div class="relative">
				{@render visual()}
			</div>
		{/if}
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/Hero.svelte
git commit -m "feat(home): rewrite Hero with runes and shadcn Button

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: StatsBand component

**Files:**
- Create: `src/lib/components/StatsBand.svelte`

- [ ] **Step 1: Write `src/lib/components/StatsBand.svelte`**

```svelte
<script lang="ts">
	import type { CompanyStat } from '$lib/data/company.js';

	let { stats }: { stats: readonly CompanyStat[] } = $props();
</script>

<section class="bg-muted/40 border-y border-border">
	<div class="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
		{#each stats as s (s.label)}
			<div>
				<div class="font-display text-4xl md:text-5xl font-extrabold text-primary">
					{s.value}
				</div>
				<div class="mt-1 font-semibold">{s.label}</div>
				<div class="text-sm text-muted-foreground">{s.description}</div>
			</div>
		{/each}
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/StatsBand.svelte
git commit -m "feat(home): add StatsBand component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: ConsultingSection component

**Files:**
- Create: `src/lib/components/ConsultingSection.svelte`

- [ ] **Step 1: Write `src/lib/components/ConsultingSection.svelte`**

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Check } from '@lucide/svelte';

	let {
		blurb,
		capabilities
	}: { blurb: string; capabilities: readonly string[] } = $props();
</script>

<section class="max-w-6xl mx-auto px-6 py-24 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
	<div>
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-4">
			Consulting
		</p>
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
			We also take on selected client work.
		</h2>
		<p class="mt-4 text-lg text-muted-foreground max-w-prose">{blurb}</p>
		<div class="mt-8">
			<Button href="/contact" size="lg">Work with us</Button>
		</div>
	</div>
	<ul class="grid gap-3">
		{#each capabilities as c (c)}
			<li class="flex items-start gap-3">
				<Check class="mt-1 size-5 text-primary shrink-0" />
				<span class="text-base">{c}</span>
			</li>
		{/each}
	</ul>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/ConsultingSection.svelte
git commit -m "feat(home): add ConsultingSection component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 16: Compose new home page

**Files:**
- Modify: `src/routes/+page.svelte` (full rewrite)
- Delete (later, in Phase 2): every legacy component still referenced

- [ ] **Step 1: Overwrite `src/routes/+page.svelte`**

```svelte
<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StatsBand from '$lib/components/StatsBand.svelte';
	import ConsultingSection from '$lib/components/ConsultingSection.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company, featuredProducts } from '$lib';
</script>

<svelte:head>
	<title>{company.seo.defaultTitle}</title>
	<meta name="description" content={company.seo.defaultDescription} />
</svelte:head>

<Hero
	eyebrow="Kathmandu studio"
	title={company.tagline}
	subtitle={company.description}
	primary={{ label: 'See our products', href: '/products' }}
	secondary={{ label: 'Work with us', href: '/contact' }}
/>

<section class="max-w-6xl mx-auto px-6 pb-24">
	<div class="flex items-end justify-between mb-10">
		<div>
			<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
				Products
			</p>
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
				Apps we build and ship.
			</h2>
		</div>
		<a href="/products" class="hidden md:inline text-sm font-semibold text-primary hover:underline">
			See all →
		</a>
	</div>
	<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		{#each featuredProducts as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<StatsBand stats={company.stats} />

<ConsultingSection
	blurb={company.consulting.blurb}
	capabilities={company.consulting.capabilities}
/>

<section class="max-w-3xl mx-auto px-6 pb-24 text-center">
	<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
		Have an idea? Let's talk.
	</h2>
	<p class="mt-4 text-muted-foreground">
		Whether you want to ship an app or rethink an existing one, we're up for a conversation.
	</p>
	<div class="mt-8">
		<Button href="/contact" size="lg">Get in touch</Button>
	</div>
</section>
```

- [ ] **Step 2: Verify renders**

```bash
bun run dev &
sleep 4
curl -s http://localhost:5173/ | grep -c "Apps we build" || echo "not found"
kill %1 2>/dev/null
```

Expected: at least one match.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat(home): rebuild home as products-led landing

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Stream C — About + Contact

### Task 17: PageHeader (canonical)

**Files:**
- Create or replace: `src/lib/components/PageHeader.svelte`

- [ ] **Step 1: Overwrite `src/lib/components/PageHeader.svelte`**

```svelte
<script lang="ts">
	let {
		eyebrow,
		title,
		subtitle
	}: { eyebrow?: string; title: string; subtitle?: string } = $props();
</script>

<header class="max-w-6xl mx-auto px-6 pt-24 pb-12">
	{#if eyebrow}
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-3">
			{eyebrow}
		</p>
	{/if}
	<h1 class="font-display text-5xl font-extrabold tracking-tight">{title}</h1>
	{#if subtitle}
		<p class="text-lg text-muted-foreground mt-4 max-w-2xl">{subtitle}</p>
	{/if}
</header>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/PageHeader.svelte
git commit -m "feat(chrome): canonical PageHeader

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 18: About page

**Files:**
- Modify (full rewrite): `src/routes/about/+page.svelte`

- [ ] **Step 1: Overwrite `src/routes/about/+page.svelte`**

```svelte
<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<svelte:head>
	<title>About — Popup Bits</title>
	<meta
		name="description"
		content="Popup Bits is a Kathmandu-based studio building apps and taking on selected client work."
	/>
</svelte:head>

<PageHeader
	eyebrow="About"
	title="A small studio, shipping useful apps."
	subtitle="Popup Bits was founded in {company.established} in Kathmandu. We design, build, and run our own products — and occasionally help other teams do the same."
/>

<section class="max-w-3xl mx-auto px-6 pb-16 space-y-6 text-lg leading-relaxed">
	<p>
		We started by scratching our own itches — a Nepali calendar, a learning app for kids, a UI
		reference for Flutter developers. Some of those grew into products people now use every day.
	</p>
	<p>
		Today we still ship our own apps and take a handful of consulting engagements each year, mostly
		Flutter app builds, design systems, and backend platform work.
	</p>
	<p>
		The studio is led by <strong>{company.founder}</strong> and based in {company.contact.address.city},
		{company.contact.address.country}.
	</p>
</section>

<section class="max-w-3xl mx-auto px-6 pb-24">
	<div class="rounded-2xl border border-border bg-card p-8">
		<h2 class="font-display text-2xl font-bold mb-2">Want to work together?</h2>
		<p class="text-muted-foreground mb-6">We reply to everything within a couple of days.</p>
		<Button href="/contact" size="lg">Get in touch</Button>
	</div>
</section>
```

- [ ] **Step 2: Verify it renders**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/about
kill %1 2>/dev/null
```

Expected: `200`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/about/+page.svelte
git commit -m "feat(about): rebuild About page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 19: Contact page (with mailto form)

**Files:**
- Modify (full rewrite): `src/routes/contact/+page.svelte`

- [ ] **Step 1: Overwrite `src/routes/contact/+page.svelte`**

```svelte
<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { company } from '$lib';
	import { Mail, MapPin, Phone } from '@lucide/svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	const mailtoHref = $derived(
		`mailto:${company.contact.email}` +
			`?subject=${encodeURIComponent('Hello from ' + (name || 'popupbits.com'))}` +
			`&body=${encodeURIComponent(message || '') + '\n\n— ' + (name || '') + ' <' + (email || '') + '>'}`
	);
</script>

<svelte:head>
	<title>Contact — Popup Bits</title>
	<meta name="description" content="Get in touch with Popup Bits." />
</svelte:head>

<PageHeader
	eyebrow="Contact"
	title="Tell us about your project."
	subtitle="Fill the form and your email client will open with a pre-filled draft, or reach us directly via the channels below."
/>

<section class="max-w-5xl mx-auto px-6 pb-24 grid gap-12 md:grid-cols-[2fr_1fr]">
	<form
		class="space-y-6"
		onsubmit={(e) => {
			e.preventDefault();
			window.location.href = mailtoHref;
		}}
	>
		<div class="space-y-2">
			<Label for="name">Your name</Label>
			<Input id="name" bind:value={name} required />
		</div>
		<div class="space-y-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" bind:value={email} required />
		</div>
		<div class="space-y-2">
			<Label for="message">What's on your mind?</Label>
			<Textarea id="message" bind:value={message} rows={6} required />
		</div>
		<Button type="submit" size="lg">Open my email client</Button>
	</form>

	<aside class="space-y-6 text-sm">
		<div class="flex gap-3 items-start">
			<Mail class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">Email</div>
				<a class="text-muted-foreground hover:underline" href="mailto:{company.contact.email}">
					{company.contact.email}
				</a>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<Phone class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">Phone</div>
				<div class="text-muted-foreground">{company.contact.phone}</div>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<MapPin class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">{company.contact.address.city}</div>
				<div class="text-muted-foreground">
					{company.contact.address.street}, Ward {company.contact.address.zone},<br />
					{company.contact.address.city}, {company.contact.address.country}
				</div>
				<div class="text-muted-foreground mt-1">{company.contact.timezone}</div>
			</div>
		</div>
	</aside>
</section>
```

> If `Input`, `Textarea`, or `Label` aren't generated by Task 6 under those exact import paths, adjust to the path that exists. The path pattern is `$lib/components/ui/<name>/index.js`.

- [ ] **Step 2: Verify it renders**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/contact
kill %1 2>/dev/null
```

Expected: `200`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/contact/+page.svelte
git commit -m "feat(contact): rebuild Contact page with mailto form

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 20: Restyle privacy policy page

**Files:**
- Modify: `src/routes/contact/flutter-ui-challenges-privacy-policy/+page.svelte`

- [ ] **Step 1: Read the current content (don't lose the legal copy)**

```bash
cat src/routes/contact/flutter-ui-challenges-privacy-policy/+page.svelte
```

- [ ] **Step 2: Rewrite the file, preserving the legal copy but using the new shell**

Replace the file with the following template, **pasting the legal copy from Step 1 inside the `<article>` block**:

```svelte
<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>Flutter UI Challenges — Privacy Policy</title>
	<meta name="description" content="Privacy policy for Flutter UI Challenges." />
</svelte:head>

<PageHeader title="Flutter UI Challenges — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<!-- PASTE the legal body content from the previous version of this file here, -->
	<!-- stripping out any old <script>/<style>/PageHeader markup and keeping only -->
	<!-- the human-readable copy and headings. -->
</article>
```

> The Play Store listing links to this URL — **do not change the path**.

- [ ] **Step 3: Verify renders**

```bash
bun run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/contact/flutter-ui-challenges-privacy-policy
kill %1 2>/dev/null
```

Expected: `200`.

- [ ] **Step 4: Commit**

```bash
git add src/routes/contact/flutter-ui-challenges-privacy-policy/+page.svelte
git commit -m "feat(legal): restyle Flutter UI Challenges privacy policy

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Stream D — Chrome (Nav, Footer, ThemeToggle, SEO)

### Task 21: ThemeToggle

**Files:**
- Create: `src/lib/components/ThemeToggle.svelte`

- [ ] **Step 1: Write `src/lib/components/ThemeToggle.svelte`**

```svelte
<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Toggle theme">
	<Sun class="size-5 dark:hidden" />
	<Moon class="size-5 hidden dark:block" />
</Button>
```

> `mode-watcher`'s API: `toggleMode()` for click-to-toggle is the current export. If the API has shifted, use `import { mode, setMode } from 'mode-watcher';` and toggle manually.

> Dark-mode utilities (`dark:hidden`) only work if Tailwind's dark variant is wired to `[data-theme="dark"]`. Confirm by inspecting whether `tailwind.config.*` exists (Tailwind v4 typically reads `@theme` only; if `dark:` doesn't kick in, add a `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *))` line near the `@theme` block in `src/app.css`).

- [ ] **Step 2: Verify it compiles**

```bash
bun run check 2>&1 | grep ThemeToggle || echo "ok"
```

Expected: `ok`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/ThemeToggle.svelte src/app.css 2>/dev/null
git commit -m "feat(chrome): add ThemeToggle (mode-watcher)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 22: SiteNav

**Files:**
- Modify (full rewrite): `src/lib/components/SiteNav.svelte`

- [ ] **Step 1: Overwrite `src/lib/components/SiteNav.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ThemeToggle from './ThemeToggle.svelte';
	import { Menu } from '@lucide/svelte';

	const links = [
		{ label: 'Products', href: '/products' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];

	let mobileOpen = $state(false);

	const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(href + '/');
</script>

<nav class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a href="/" class="font-display text-xl font-extrabold tracking-tight">Popup Bits</a>

		<div class="hidden md:flex items-center gap-1">
			{#each links as l (l.href)}
				<a
					href={l.href}
					class={`px-3 py-2 text-sm font-medium rounded-md transition ${
						isActive(l.href)
							? 'text-primary bg-accent'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{l.label}
				</a>
			{/each}
			<ThemeToggle />
			<Button href="/contact" size="sm">Hire us</Button>
		</div>

		<div class="md:hidden flex items-center gap-1">
			<ThemeToggle />
			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button variant="ghost" size="icon" aria-label="Open menu" {...props}>
							<Menu class="size-5" />
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-72">
					<Sheet.Header>
						<Sheet.Title>Menu</Sheet.Title>
					</Sheet.Header>
					<nav class="mt-6 flex flex-col gap-1">
						{#each links as l (l.href)}
							<a
								href={l.href}
								class={`px-3 py-3 rounded-md text-base font-medium ${
									isActive(l.href)
										? 'text-primary bg-accent'
										: 'text-muted-foreground hover:text-foreground'
								}`}
								onclick={() => (mobileOpen = false)}
							>
								{l.label}
							</a>
						{/each}
						<a
							href="/contact"
							onclick={() => (mobileOpen = false)}
							class="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-3 py-3 font-medium"
						>
							Hire us
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</nav>
```

> The `$app/state` import (`page` rune) is the Svelte 5 / SvelteKit 2 idiom. If your installed SvelteKit version still requires `$app/stores`, fall back to `import { page } from '$app/stores'` and use `$page.url.pathname`. Prefer `$app/state` if available.

> The Sheet `Trigger` `child` snippet pattern matches current shadcn-svelte conventions. If the installed shadcn-svelte version uses a different API, the simplest alternative is `<Sheet.Trigger><Button ...>...</Button></Sheet.Trigger>` — adjust to what the scaffolded `sheet` component exposes.

- [ ] **Step 2: Smoke test**

```bash
bun run dev &
sleep 4
curl -s http://localhost:5173/ | grep -c "Popup Bits" || echo "not found"
kill %1 2>/dev/null
```

Expected: at least one match.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/SiteNav.svelte
git commit -m "feat(chrome): SiteNav with mobile Sheet drawer

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 23: SiteFooter

**Files:**
- Modify (full rewrite): `src/lib/components/SiteFooter.svelte`

- [ ] **Step 1: Overwrite `src/lib/components/SiteFooter.svelte`**

```svelte
<script lang="ts">
	import { company, featuredProducts } from '$lib';
	import { Github, Linkedin, Twitter, Youtube, Mail } from '@lucide/svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border mt-24">
	<div class="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
		<div class="md:col-span-2">
			<div class="font-display text-xl font-extrabold tracking-tight">{company.name}</div>
			<p class="text-sm text-muted-foreground mt-3 max-w-sm">{company.description}</p>
			<address class="not-italic text-sm text-muted-foreground mt-6">
				{company.contact.address.street}, Ward {company.contact.address.zone}<br />
				{company.contact.address.city}, {company.contact.address.country}<br />
				<a class="hover:underline" href="mailto:{company.contact.email}">{company.contact.email}</a>
			</address>
		</div>
		<div>
			<div class="font-semibold text-sm mb-3">Products</div>
			<ul class="space-y-2 text-sm">
				{#each featuredProducts as p (p.slug)}
					<li>
						<a class="text-muted-foreground hover:text-foreground" href={`/products/${p.slug}`}>
							{p.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<div class="font-semibold text-sm mb-3">Studio</div>
			<ul class="space-y-2 text-sm">
				<li><a class="text-muted-foreground hover:text-foreground" href="/about">About</a></li>
				<li><a class="text-muted-foreground hover:text-foreground" href="/contact">Contact</a></li>
				<li>
					<a
						class="text-muted-foreground hover:text-foreground"
						href="/contact/flutter-ui-challenges-privacy-policy"
					>
						Privacy
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="border-t border-border">
		<div class="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
			<div class="text-xs text-muted-foreground">© {year} {company.legalName}</div>
			<div class="flex gap-1">
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.github} aria-label="GitHub">
					<Github class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.linkedin} aria-label="LinkedIn">
					<Linkedin class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.twitter} aria-label="Twitter / X">
					<Twitter class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.youtube} aria-label="YouTube">
					<Youtube class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.email} aria-label="Email">
					<Mail class="size-5" />
				</a>
			</div>
		</div>
	</div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/SiteFooter.svelte
git commit -m "feat(chrome): rebuild SiteFooter with Kathmandu block

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 24: SEO component (refactor to runes, drop legacy data deps)

**Files:**
- Modify (full rewrite): `src/lib/components/SEO.svelte`
- Modify: `src/lib/index.ts` (already exports company; just add SEO?)

- [ ] **Step 1: Overwrite `src/lib/components/SEO.svelte`**

```svelte
<script lang="ts">
	import { company } from '$lib';

	type Props = {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: string;
	};

	let { title, description, image, url, type = 'website' }: Props = $props();

	const fullTitle = title ? `${title} — ${company.name}` : company.seo.defaultTitle;
	const fullDescription = description ?? company.seo.defaultDescription;
	const fullUrl = url ? `${company.url}${url}` : company.url;
	const fullImage = image?.startsWith('http')
		? image
		: `${company.url}${image ?? company.seo.ogImage}`;

	const orgSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: company.name,
		url: company.url,
		logo: `${company.url}/favicon.svg`,
		description: company.seo.defaultDescription,
		contactPoint: {
			'@type': 'ContactPoint',
			email: company.contact.email,
			contactType: 'customer service'
		},
		sameAs: [
			company.social.github,
			company.social.youtube,
			company.social.linkedin,
			company.social.twitter
		]
	};
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={fullDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={fullDescription} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:site_name" content={company.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={fullDescription} />
	<meta name="twitter:image" content={fullImage} />
	<meta name="twitter:site" content={company.seo.twitterHandle} />
	<link rel="canonical" href={fullUrl} />
	{@html `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`}
</svelte:head>
```

- [ ] **Step 2: Add `SEO` to `$lib` exports (if not already)**

Append to `src/lib/index.ts`:

```ts
export { default as SEO } from './components/SEO.svelte';
export { default as PageHeader } from './components/PageHeader.svelte';
```

- [ ] **Step 3: Run check**

```bash
bun run check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/SEO.svelte src/lib/index.ts
git commit -m "feat(seo): refactor SEO component to runes; drop legacy data deps

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — Integration & cleanup (sequential, single agent)

### Task 25: Delete legacy components

**Files:** delete the following — they're no longer imported anywhere.

- [ ] **Step 1: Verify nothing imports the legacy components before deletion**

```bash
for f in StatCard PricingCard ServiceCard Card Button Section SectionHeader MainHeader Project; do
  echo "--- $f ---"
  grep -rn "from.*\\\$lib/components/$f" src/ || echo "  (no references)"
done
```

Expected: each prints `(no references)`. If any reference remains, fix the importer first.

- [ ] **Step 2: Delete the legacy files**

```bash
rm src/lib/components/StatCard.svelte
rm src/lib/components/PricingCard.svelte
rm src/lib/components/ServiceCard.svelte
rm src/lib/components/Card.svelte
rm src/lib/components/Button.svelte
rm src/lib/components/Section.svelte
rm src/lib/components/SectionHeader.svelte
rm src/lib/components/MainHeader.svelte
rm src/lib/components/Project.svelte
```

- [ ] **Step 3: Run check + dev smoke**

```bash
bun run check
bun run dev &
sleep 4
for r in / /products /products/mero-patro /about /contact /contact/flutter-ui-challenges-privacy-policy /projects /projects/mero-patro; do
  printf "%s -> %s\n" "$r" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:5173$r)"
done
kill %1 2>/dev/null
```

Expected: every direct URL returns `200`; `/projects*` returns `308`.

- [ ] **Step 4: Commit**

```bash
git rm src/lib/components/{StatCard,PricingCard,ServiceCard,Card,Button,Section,SectionHeader,MainHeader,Project}.svelte
git commit -m "chore: delete legacy components

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 26: Legacy-code sweep (grep for forbidden patterns)

- [ ] **Step 1: Run the sweep**

```bash
echo "--- export let ---"
grep -rn "export let" src/ || echo "  (clean)"
echo "--- legacy \$: reactivity ---"
grep -rn $'^\t*\\$:' src/ || echo "  (clean)"
echo "--- on:click directives on components ---"
grep -rEn "on:[a-z]+=" src/ || echo "  (clean)"
echo "--- legacy CSS aliases ---"
grep -rn -E "(--primary-blue|--primary-color|--light-gray|--border-color)" src/ || echo "  (clean)"
echo "--- @tailwind directives (should be @import 'tailwindcss') ---"
grep -rn "@tailwind " src/ || echo "  (clean)"
```

Expected: every section ends with `(clean)`. If any prints matches:

- `export let` → convert to `let { ... } = $props()`
- `$:` → convert to `$derived` or `$effect`
- `on:foo=` on a Svelte **component** → convert to `onfoo={...}` prop. (On a DOM element, both work; prefer `onfoo` for consistency.)
- Legacy CSS aliases → remove the usage; map to the new tokens.
- `@tailwind` → replace the three directives with `@import 'tailwindcss';`.

- [ ] **Step 2: After fixes (if any), re-run the sweep — must be clean — then commit**

```bash
git add -A
git commit -m "chore: remove remaining Svelte 4 / legacy CSS idioms

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>" 2>/dev/null || echo "nothing to commit"
```

---

### Task 27: Rewrite the smoke test

**Files:**
- Modify: `src/routes/page.svelte.test.ts`

- [ ] **Step 1: Read the current test to keep the imports / setup style**

```bash
cat src/routes/page.svelte.test.ts
```

- [ ] **Step 2: Replace with a content-aware smoke test**

```ts
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('home page', () => {
	it('shows the products-led headline and CTA', async () => {
		const { container } = render(Page);
		await expect.element(container).toHaveTextContent(/Apps we build and ship/i);
		await expect.element(container).toHaveTextContent(/See our products/i);
		await expect.element(container).toHaveTextContent(/Work with us/i);
	});
});
```

> If `vitest-browser-svelte` exports differ in the installed version, mirror whatever pattern the legacy test used (the test framework was already wired up). The goal is one assertion that the new content is present.

- [ ] **Step 3: Run the test**

```bash
bun run test
```

Expected: pass. If it fails because the page imports server-only modules or because the route-level data load is required, replace the import with a render of the composed home as a static stub — but only if absolutely needed. Prefer fixing the test setup.

- [ ] **Step 4: Commit**

```bash
git add src/routes/page.svelte.test.ts
git commit -m "test(home): smoke-test new products-led home content

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 28: Final check + build + README update

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Run the full check / lint / build**

```bash
bun run check
bun run lint
bun run build
```

Expected: all three succeed. If `bun run lint` fails on formatting only, run `bun run format` and commit.

- [ ] **Step 2: Update README**

Overwrite `README.md` with:

```markdown
# popupbits.com

The website for [Popup Bits](https://popupbits.com) — a Kathmandu studio building apps like
Mero Patro, Mero Nepali, SpellCraft, Bhadama, and UI Challenges – Flutter.

Built with SvelteKit 2 + Svelte 5 (runes), Tailwind v4, shadcn-svelte, and the
[Popup Bits Design System](https://github.com/lohanidamodar/popup-bits-design-system).

## Develop

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
bun run preview
```

## Check / test

```bash
bun run check
bun run test
```

## Design system

The design tokens live in `src/lib/design-system/colors_and_type.css`, vendored from
the upstream repo. See `src/lib/design-system/README.md` for refresh instructions.
The root layout wraps everything in `<div class="arch-utility theme-popupbits">`;
per-product detail pages swap in the product's own `.theme-*` class.
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for the new stack and DS

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Done. Acceptance check

Walk through the spec's §11 acceptance criteria one by one:

1. `bun install && bun run dev` boots with no console errors → manual check.
2. `bun run build` succeeds → ran in Task 28.
3. `bun run check` returns 0/0 → ran in Task 28.
4. `bun run test` passes → ran in Task 27.
5. Home shows nav + hero + products grid + stats + consulting + CTA + footer → Tasks 13–16, 21–23.
6. /products lists all owned products; each detail renders → Tasks 11, 12.
7. Light + dark toggle works → Task 21 (verify by clicking).
8. No legacy CSS aliases in `src/` → Task 26.
9. No `export let` in any `.svelte` file → Task 26.
10. No `on:click` on Svelte components → Task 26.

Final manual check:

```bash
bun run dev &
sleep 4
# Open in a browser at http://localhost:5173, click through:
#   / -> /products -> click any card -> back -> /about -> /contact -> toggle theme
# Verify no console errors and the dark theme applies across all sections.
kill %1 2>/dev/null
```

---

## Self-review notes (resolved inline)

- Cross-task naming verified: `Product`, `ProductCard`, `ProductDetail`, `featuredProducts`, `getProductBySlug`, `company.contact.email`, `company.stats`, `company.consulting`, `company.seo` all used consistently across Tasks 9–24.
- `PageHeader` ownership clarified: Stream A may stub it; Stream C delivers the canonical version (Task 17). Last write wins — Stream C's commit is the source of truth.
- All "placeholder" stubs (`SiteNav`/`SiteFooter` in Task 7, `PageHeader` in Task 11) are explicitly replaced later in the plan.
- Tailwind v4 dark-variant edge case flagged in Task 21 with the fix recipe (`@custom-variant dark ...`).
- Bhadama theme stub added to vendored CSS in Task 4.
- `/projects` redirects covered both directory deletion (Task 12) and runtime redirect (Task 8).
- Privacy policy URL is preserved verbatim — Task 20 keeps the path.

