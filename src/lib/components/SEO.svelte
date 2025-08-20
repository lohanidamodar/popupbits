<script lang="ts">
	import { seo, site } from '$lib/data/index.js';

	interface SEOData {
		title?: string;
		description?: string;
		keywords?: string | string[];
		image?: string;
		url?: string;
		type?: string;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			tags?: string[];
		};
	}

	interface SEOProps {
		data?: SEOData;
		title?: string;
		description?: string;
		keywords?: string | string[];
		image?: string;
		url?: string;
		type?: string;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			tags?: string[];
		};
	}

	let { data, title, description, keywords, image, url, type, article }: SEOProps = $props();

	// Use data object if provided, otherwise use individual props
	const seoData = data || {
		title,
		description,
		keywords,
		image,
		url,
		type,
		article
	};

	// Generate full title
	const fullTitle = seoData?.title
		? `${seoData.title} - ${site?.name || 'PopupBits'}`
		: seo?.defaultTitle || 'PopupBits';
	const fullDescription =
		seoData?.description || seo?.defaultDescription || 'Professional tech consulting services';
	const fullUrl = seoData?.url ? `${site?.url || ''}${seoData.url}` : site?.url || '';
	const fullImage = seoData?.image?.startsWith('http')
		? seoData.image
		: `${site?.url || ''}${seoData?.image || '/favicon.svg'}`;

	// Process keywords - handle both string and array formats
	const processedKeywords = $derived(
		(() => {
			try {
				if (seoData?.keywords) {
					if (typeof seoData.keywords === 'string') {
						return seoData.keywords;
					} else if (Array.isArray(seoData.keywords)) {
						return seoData.keywords.join(', ');
					}
				} else if (seo?.keywords && Array.isArray(seo.keywords)) {
					return seo.keywords.join(', ');
				}
				return '';
			} catch (e) {
				return '';
			}
		})()
	);

	// Generate schema.org structured data
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: site?.name || 'PopupBits',
		url: site?.url || '',
		logo: `${site?.url || ''}/favicon.svg`,
		description: seo?.defaultDescription || 'Professional tech consulting services',
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'popupbits@gmail.com',
			contactType: 'customer service'
		},
		sameAs: [
			'https://github.com/lohanidamodar',
			'https://www.youtube.com/c/reactbits',
			'https://linkedin.com/in/lohanidamodar'
		]
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: site?.name || 'PopupBits',
		url: site?.url || '',
		description: seo?.defaultDescription || 'Professional tech consulting services',
		potentialAction: {
			'@type': 'SearchAction',
			target: `${site?.url || ''}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={fullDescription} />
	{#if processedKeywords}
		<meta name="keywords" content={processedKeywords} />
	{/if}
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="author" content={site?.name || 'PopupBits'} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seoData?.type || 'website'} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={fullDescription} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:site_name" content={site?.name || 'PopupBits'} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={fullUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={fullDescription} />
	<meta name="twitter:image" content={fullImage} />
	{#if seo?.twitterHandle}
		<meta name="twitter:site" content={seo.twitterHandle} />
		<meta name="twitter:creator" content={seo.twitterHandle} />
	{/if}

	<!-- Article specific meta tags -->
	{#if seoData?.article}
		<meta property="article:published_time" content={seoData.article.publishedTime} />
		{#if seoData.article.modifiedTime}
			<meta property="article:modified_time" content={seoData.article.modifiedTime} />
		{/if}
		{#if seoData.article.author}
			<meta property="article:author" content={seoData.article.author} />
		{/if}
		{#if seoData.article.tags && Array.isArray(seoData.article.tags)}
			{#each seoData.article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />

	<!-- Schema.org structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
</svelte:head>
