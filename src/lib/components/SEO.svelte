<script lang="ts">
	import { company } from '$lib';
	import { jsonLd } from '$lib/jsonld.js';
	import {
		DESCRIPTION_MAX,
		ORG_ID,
		absoluteUrl,
		breadcrumbSchema,
		clamp,
		fullTitle,
		organizationSchema,
		type Crumb
	} from '$lib/seo.js';

	type Article = {
		publishedTime: string;
		modifiedTime?: string;
		author: string;
		tags?: string[];
	};

	type Props = {
		title?: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		/** Site-relative path of this page, used for the canonical URL. */
		url?: string;
		type?: string;
		/** When set, emits article meta tags and BlogPosting schema. */
		article?: Article;
		/** Trail below Home; emits BreadcrumbList when set. */
		breadcrumbs?: Crumb[];
		/** Keeps the page out of search results. */
		noindex?: boolean;
	};

	let {
		title,
		description,
		image,
		imageAlt,
		url,
		type = 'website',
		article,
		breadcrumbs,
		noindex = false
	}: Props = $props();

	const pageTitle = $derived(fullTitle(title));
	const pageDescription = $derived(
		clamp(description ?? company.seo.defaultDescription, DESCRIPTION_MAX)
	);
	const pageUrl = $derived(absoluteUrl(url ?? '/'));
	const pageImage = $derived(absoluteUrl(image ?? company.seo.ogImage));

	const articleSchema = $derived(
		article && {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: title,
			description: description ?? company.seo.defaultDescription,
			image: pageImage,
			datePublished: article.publishedTime,
			dateModified: article.modifiedTime ?? article.publishedTime,
			author: { '@type': 'Person', name: article.author },
			publisher: { '@id': ORG_ID, '@type': 'Organization', name: company.name },
			mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
			inLanguage: 'en',
			keywords: article.tags?.join(', ')
		}
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
	<link rel="canonical" href={pageUrl} />
	<meta property="og:type" content={article ? 'article' : type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content={pageImage} />
	<meta property="og:image:alt" content={imageAlt ?? pageTitle} />
	<meta property="og:site_name" content={company.name} />
	<meta property="og:locale" content="en_US" />
	{#if article}
		<meta property="article:published_time" content={article.publishedTime} />
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		<meta property="article:author" content={article.author} />
		{#each article.tags ?? [] as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
	<meta name="twitter:image:alt" content={imageAlt ?? pageTitle} />
	<meta name="twitter:site" content={company.seo.twitterHandle} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(articleSchema ?? organizationSchema)}
	{#if breadcrumbs}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
		{@html jsonLd(breadcrumbSchema(breadcrumbs))}
	{/if}
</svelte:head>
