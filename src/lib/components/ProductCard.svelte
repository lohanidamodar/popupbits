<script lang="ts">
	import { type Product, type ProductLink, statusLabels } from '$lib/data/products.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Globe, CodeXml, Download, ExternalLink } from '@lucide/svelte';
	import GooglePlay from './icons/GooglePlay.svelte';
	import AppStore from './icons/AppStore.svelte';
	import NepalFlag from './icons/NepalFlag.svelte';
	import ProductIcon from './ProductIcon.svelte';

	let { product }: { product: Product } = $props();

	const linkLabel = (link: ProductLink) => {
		if (link.kind === 'play') return 'Play Store';
		if (link.kind === 'appstore') return 'App Store';
		if (link.kind === 'web') return 'Web';
		if (link.kind === 'github') return 'GitHub';
		if (link.kind === 'release') return 'Download';
		return link.label;
	};

	const linkIcon = (kind: ProductLink['kind']) => {
		if (kind === 'play') return GooglePlay;
		if (kind === 'appstore') return AppStore;
		if (kind === 'web') return Globe;
		if (kind === 'github') return CodeXml;
		if (kind === 'release') return Download;
		return ExternalLink;
	};

	// Coming-soon products link to a store page that isn't live yet, so we show a
	// pill instead of dead buttons. Live/beta products show the actual store links.
	const showLinks = $derived(product.status !== 'coming-soon' && product.links.length > 0);
</script>

<div class={`${product.themeClass}`}>
	<Card.Root class="h-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
		<a href={`/products/${product.slug}`} class="block" aria-label={`Open ${product.name}`}>
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
		</a>
		<Card.Footer class="mt-auto flex flex-wrap items-center gap-2">
			{#if showLinks}
				{#each product.links as link (link.href)}
					{@const Icon = linkIcon(link.kind)}
					<Button
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="sm"
					>
						<Icon class="size-4" />
						{linkLabel(link)}
					</Button>
				{/each}
			{:else if product.status === 'coming-soon'}
				<Badge variant="outline">{statusLabels[product.status]}</Badge>
			{/if}
			{#if product.availableIn}
				<span
					class="ml-auto inline-flex items-center"
					title={`Available in ${product.availableIn} only`}
					aria-label={`Available in ${product.availableIn} only`}
				>
					<NepalFlag class="h-5 w-auto" />
				</span>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
