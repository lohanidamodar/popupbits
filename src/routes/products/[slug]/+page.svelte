<script lang="ts">
	import ProductDetail from '$lib/components/ProductDetail.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { company } from '$lib';
	import { jsonLd } from '$lib/jsonld.js';
	import { appSchema, productTitle } from '$lib/seo.js';

	let { data } = $props();

	const product = $derived(data.product);
	const page = $derived(data.page);

	const path = $derived(`/products/${product.slug}`);
	// The first screenshot makes a better preview than the icon, when there is one.
	const hero = $derived(page?.screenshots[0]);
	const image = $derived(hero?.src ?? product.iconSrc ?? company.seo.ogImage);

	const faqSchema = $derived(
		page?.faq && page.faq.length > 0
			? {
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: page.faq.map((item) => ({
						'@type': 'Question',
						name: item.q,
						acceptedAnswer: { '@type': 'Answer', text: item.a }
					}))
				}
			: null
	);
</script>

<SEO
	title={productTitle(product)}
	description={product.description}
	{image}
	imageAlt={hero?.alt ?? `${product.name} icon`}
	url={path}
	breadcrumbs={[
		{ name: 'Products', path: '/products' },
		{ name: product.name, path }
	]}
/>

<svelte:head>
	<!-- A plain-Markdown version of this page, for AI agents and LLM tools. -->
	<link
		rel="alternate"
		type="text/markdown"
		href={`${path}.md`}
		title={`${product.name} (Markdown)`}
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(appSchema(product, page))}
	{#if faqSchema}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
		{@html jsonLd(faqSchema)}
	{/if}
</svelte:head>

<ProductDetail {product} {page} />
