<script lang="ts">
	import ProductDetail from '$lib/components/ProductDetail.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.product.name} — Popup Bits</title>
	<meta name="description" content={data.product.tagline} />
</svelte:head>

<ProductDetail product={data.product} />
