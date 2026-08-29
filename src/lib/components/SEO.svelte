<script lang="ts">
	import { company } from '$lib';

	type Article = {
		publishedTime: string;
		author: string;
		tags?: string[];
	};

	type Props = {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: string;
		/** When set, emits article meta tags and BlogPosting schema instead of Organization. */
		article?: Article;
	};

	let { title, description, image, url, type = 'website', article }: Props = $props();

	const fullTitle = title ? `${title} — ${company.name}` : company.seo.defaultTitle;
	const fullDescription = description ?? company.seo.defaultDescription;
	const fullUrl = url ? `${company.url}${url}` : company.url;
	const fullImage = image?.startsWith('http')
		? image
		: `${company.url}${image ?? company.seo.ogImage}`;

	const orgSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: company.name,
		url: company.url,
		logo: `${company.url}/favicon.svg`,
		description: company.seo.defaultDescription,
		contactPoint: {
			'@type': 'ContactPoint',
			email: company.contact.email,
			contactType: 'customer service'
		},
		sameAs: [
			company.social.github,
			company.social.youtube,
			company.social.linkedin,
			company.social.twitter
		]
	};

	const articleSchema = article && {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: fullDescription,
		image: fullImage,
		datePublished: article.publishedTime,
		dateModified: article.publishedTime,
		author: { '@type': 'Person', name: article.author },
		publisher: {
			'@type': 'Organization',
			name: company.name,
			logo: { '@type': 'ImageObject', url: `${company.url}/favicon.svg` }
		},
		mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
		keywords: article.tags?.join(', ')
	};

	const schema = articleSchema ?? orgSchema;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={fullDescription} />
	<meta property="og:type" content={article ? 'article' : type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={fullDescription} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:site_name" content={company.name} />
	{#if article}
		<meta property="article:published_time" content={article.publishedTime} />
		<meta property="article:author" content={article.author} />
		{#each article.tags ?? [] as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={fullDescription} />
	<meta name="twitter:image" content={fullImage} />
	<meta name="twitter:site" content={company.seo.twitterHandle} />
	<link rel="canonical" href={fullUrl} />
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
