<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let { data } = $props();

	let filter = $state<'all' | 'web' | 'android' | 'ios'>('all');

	const filtered = $derived(
		filter === 'all'
			? data.products
			: data.products.filter((p) => p.platforms.includes(filter as 'web' | 'android' | 'ios'))
	);

	const filters: { label: string; value: 'all' | 'web' | 'android' | 'ios' }[] = [
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

<PageHeader title="Products" subtitle="Apps and games we design, build, and ship from Kathmandu." />

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
