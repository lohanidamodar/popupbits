<script lang="ts">
	import { type Product, platformLabels, statusLabels } from '$lib/data/products.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ProductIcon from './ProductIcon.svelte';

	let { product }: { product: Product } = $props();
</script>

<a
	href={`/products/${product.slug}`}
	class={`group block ${product.themeClass}`}
	aria-label={`Open ${product.name}`}
>
	<Card.Root class="h-full transition-shadow group-hover:shadow-lg overflow-hidden">
		<Card.Header class="flex flex-row items-center gap-4">
			<ProductIcon {product} size="sm" />
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
				<Badge variant="outline">{statusLabels[product.status]}</Badge>
			{/if}
		</Card.Footer>
	</Card.Root>
</a>
