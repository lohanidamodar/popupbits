<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
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
</script>

<svelte:head>
	<title>Products — Popup Bits</title>
	<meta name="description" content="Apps and products built by Popup Bits." />
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
