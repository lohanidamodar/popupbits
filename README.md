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

## Product pages

Each `/products/<slug>` page is built from two files: the catalogue entry in
`src/lib/data/products.ts` (name, links, platforms, status) and the page content in
`src/lib/data/product-pages.ts` (pitch, highlights, facts, FAQ and captioned
screenshots). The screenshots are the store listings' own images, kept under
`static/products/<slug>/` as `play-NN.webp` and `appstore-NN.webp`. After changing an
app's store screenshots, refresh the copies and then update that set's alt-text list:

```bash
dart run tool/fetch_store_screenshots.dart            # every product
dart run tool/fetch_store_screenshots.dart photoready # one or more slugs
```

## Design system

The design tokens live in `src/lib/design-system/colors_and_type.css`, vendored from
the upstream repo. See `src/lib/design-system/README.md` for refresh instructions.
The root layout wraps everything in `<div class="arch-utility theme-popupbits">`;
per-product detail pages swap in the product's own `.theme-*` class.
