<script lang="ts">
	import ProductDetail from '$lib/components/ProductDetail.svelte';
	import { company } from '$lib';
	import { platformLabels } from '$lib/data/products.js';
	import { jsonLd } from '$lib/jsonld.js';

	let { data } = $props();

	const product = $derived(data.product);
	const page = $derived(data.page);

	const title = $derived(`${product.name}: ${product.tagline.replace(/\.$/, '')}`);
	const url = $derived(`${company.url}/products/${product.slug}`);
	// The first screenshot makes a better preview than the icon, when there is one.
	const image = $derived(
		`${company.url}${page?.screenshots[0]?.src ?? product.iconSrc ?? company.seo.ogImage}`
	);

	const appSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: product.name,
		description: product.description,
		image,
		url,
		operatingSystem: product.platforms.map((p) => platformLabels[p]).join(', '),
		applicationCategory: 'MobileApplication',
		author: { '@type': 'Organization', name: company.name, url: company.url },
		...(product.license ? { license: `https://spdx.org/licenses/${product.license}.html` } : {})
	});

	const breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Products', item: `${company.url}/products` },
			{ '@type': 'ListItem', position: 2, name: product.name, item: url }
		]
	});

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

<svelte:head>
	<title>{title} — {company.name}</title>
	<meta name="description" content={product.description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={product.description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={company.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={product.description} />
	<meta name="twitter:image" content={image} />
	<!-- A plain-Markdown version of this page, for AI agents and LLM tools. -->
	<link
		rel="alternate"
		type="text/markdown"
		href={`/products/${product.slug}.md`}
		title={`${product.name} (Markdown)`}
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(appSchema)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(breadcrumbSchema)}
	{#if faqSchema}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
		{@html jsonLd(faqSchema)}
	{/if}
</svelte:head>

<ProductDetail {product} {page} />
