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
