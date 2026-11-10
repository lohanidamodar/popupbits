<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { company } from '$lib';
	import { jsonLd } from '$lib/jsonld.js';
	import { isOpenSource, platformLabels, type ProductPlatform } from '$lib/data/products.js';
	import { CodeXml } from '@lucide/svelte';

	let { data } = $props();

	type PlatformFilter = 'all' | ProductPlatform;

	let platform = $state<PlatformFilter>('all');
	let openSourceOnly = $state(false);

	const filtered = $derived(
		data.products.filter(
			(p) =>
				(platform === 'all' || p.platforms.includes(platform)) &&
				(!openSourceOnly || isOpenSource(p))
		)
	);

	const platformFilters: { label: string; value: PlatformFilter }[] = [
		{ label: 'All', value: 'all' },
		...(['web', 'android', 'ios', 'windows', 'macos', 'linux'] as const).map((value) => ({
			label: platformLabels[value],
			value
		}))
	];

	const openSourceCount = $derived(data.products.filter(isOpenSource).length);

	const listSchema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `${company.name} products`,
		itemListElement: data.products.map((p, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: p.name,
			url: `${company.url}${p.pageHref ?? `/products/${p.slug}`}`
		}))
	};
</script>

<SEO
	title="Products"
	description="Apps and games built by Popup Bits in Kathmandu: Flutter apps for Android and iOS, desktop tools and open-source projects, many made for Nepal."
	url="/products"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(listSchema)}
</svelte:head>

<PageHeader title="Products" subtitle="Apps and games we design, build, and ship from Kathmandu." />

<section class="max-w-6xl mx-auto px-6 pb-24">
	<div class="flex flex-wrap items-center gap-2 mb-8">
		<div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter by platform">
			{#each platformFilters as f (f.value)}
				<button
					type="button"
					role="tab"
					aria-selected={platform === f.value}
					onclick={() => (platform = f.value)}
					class={`rounded-full border px-4 py-1.5 text-sm transition ${
						platform === f.value
							? 'bg-primary text-primary-foreground border-primary'
							: 'border-border text-muted-foreground hover:text-foreground'
					}`}
				>
					{f.label}
				</button>
			{/each}
		</div>
		<!-- Independent of the platform tabs: open source narrows whichever platform is picked. -->
		<button
			type="button"
			aria-pressed={openSourceOnly}
			onclick={() => (openSourceOnly = !openSourceOnly)}
			class={`sm:ml-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition ${
				openSourceOnly
					? 'bg-primary text-primary-foreground border-primary'
					: 'border-border text-muted-foreground hover:text-foreground'
			}`}
		>
			<CodeXml class="size-4" />
			Open source
			<span class="opacity-70">({openSourceCount})</span>
		</button>
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
