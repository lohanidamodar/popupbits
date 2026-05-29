<script lang="ts">
	import { type Product, platformLabels, statusLabels } from '$lib/data/products.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { ExternalLink, CodeXml, Globe } from '@lucide/svelte';
	import GooglePlay from './icons/GooglePlay.svelte';
	import AppStore from './icons/AppStore.svelte';
	import NepalFlag from './icons/NepalFlag.svelte';
	import ProductIcon from './ProductIcon.svelte';

	let { product }: { product: Product } = $props();

	const iconFor = (kind: Product['links'][number]['kind']) => {
		if (kind === 'play') return GooglePlay;
		if (kind === 'appstore') return AppStore;
		if (kind === 'github') return CodeXml;
		if (kind === 'web') return Globe;
		return ExternalLink;
	};
</script>

<div class={`${product.themeClass}`}>
	<header class="bg-accent text-accent-foreground">
		<div class="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
			<ProductIcon {product} size="lg" />
			<div>
				<div class="flex flex-wrap items-center gap-2 mb-3">
					{#each product.platforms as p (p)}
						<Badge variant="secondary">{platformLabels[p]}</Badge>
					{/each}
					{#if product.status !== 'live'}
						<Badge variant="outline">{statusLabels[product.status]}</Badge>
					{/if}
				</div>
				<h1 class="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
					{product.name}
				</h1>
				<p class="mt-3 max-w-2xl text-lg opacity-80">{product.tagline}</p>
				{#if product.availableIn}
					<p class="mt-3 inline-flex items-center gap-2 text-sm font-medium opacity-90">
						<NepalFlag class="h-5 w-auto" />
						Available in {product.availableIn} only
					</p>
				{/if}
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

		{#if product.privacyHref || product.accountDeletionHref}
			<p class="mt-12 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
				{#if product.privacyHref}
					<a class="underline-offset-4 hover:underline" href={product.privacyHref}>
						Privacy policy
					</a>
				{/if}
				{#if product.accountDeletionHref}
					<a class="underline-offset-4 hover:underline" href={product.accountDeletionHref}>
						Delete your account
					</a>
				{/if}
			</p>
		{/if}
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
