<script lang="ts">
	import { visibleProducts } from '$lib/data/products.js';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import ProductIcon from './ProductIcon.svelte';

	let { slug }: { slug: string } = $props();

	// Previous and next follow the catalogue order and wrap around, so every
	// product page has both.
	const index = $derived(visibleProducts.findIndex((p) => p.slug === slug));
	const count = visibleProducts.length;
	const prev = $derived(visibleProducts[(index - 1 + count) % count]);
	const next = $derived(visibleProducts[(index + 1) % count]);
	const hrefOf = (p: (typeof visibleProducts)[number]) => p.pageHref ?? `/products/${p.slug}`;
</script>

{#if index >= 0 && count > 1}
	<nav aria-label="Other products" class="border-t border-border">
		<div class="max-w-6xl mx-auto px-6 py-8 grid gap-4 sm:grid-cols-2">
			<a
				href={hrefOf(prev)}
				rel="prev"
				class="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:bg-accent"
			>
				<ChevronLeft class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
				<ProductIcon product={prev} size="sm" />
				<span class="min-w-0">
					<span class="block text-xs uppercase tracking-widest text-muted-foreground">
						Previous
					</span>
					<span class="block font-display font-semibold truncate">{prev.name}</span>
					<span class="block text-sm text-muted-foreground truncate">{prev.tagline}</span>
				</span>
			</a>
			<a
				href={hrefOf(next)}
				rel="next"
				class="group flex items-center gap-4 rounded-2xl border border-border p-4 sm:text-right sm:flex-row-reverse transition-colors hover:bg-accent"
			>
				<ChevronRight class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
				<ProductIcon product={next} size="sm" />
				<span class="min-w-0 flex-1">
					<span class="block text-xs uppercase tracking-widest text-muted-foreground">Next</span>
					<span class="block font-display font-semibold truncate">{next.name}</span>
					<span class="block text-sm text-muted-foreground truncate">{next.tagline}</span>
				</span>
			</a>
		</div>
	</nav>
{/if}
