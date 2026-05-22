<script lang="ts">
	import { company } from '$lib';

	type Props = {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: string;
	};

	let { title, description, image, url, type = 'website' }: Props = $props();

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
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={fullDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={fullDescription} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:site_name" content={company.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={fullDescription} />
	<meta name="twitter:image" content={fullImage} />
	<meta name="twitter:site" content={company.seo.twitterHandle} />
	<link rel="canonical" href={fullUrl} />
	{@html `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`}
</svelte:head>
