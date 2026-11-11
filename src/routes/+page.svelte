<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StatsBand from '$lib/components/StatsBand.svelte';
	import ConsultingSection from '$lib/components/ConsultingSection.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import SEO from '$lib/components/SEO.svelte';
	import { company, featuredProducts, visibleProducts } from '$lib';
	import { jsonLd } from '$lib/jsonld.js';
	import { websiteSchema } from '$lib/seo.js';
	import { dayNumber, rotateByDay } from '$lib/rotation.js';

	// Most products are flagged featured, so cap the home page and send the rest
	// to /products. The shown set rotates one place a day through every released
	// product, so each gets its turn at the top; coming-soon products wait their
	// release. The server renders the catalogue order (day 0) and the browser
	// applies the day's rotation once it loads.
	const HOME_PRODUCT_COUNT = 6;
	const rotating = featuredProducts.filter((p) => p.status !== 'coming-soon');
	let day = $state(0);
	$effect(() => {
		day = dayNumber();
	});
	const homeProducts = $derived(rotateByDay(rotating, day, HOME_PRODUCT_COUNT));
	const hasMore = visibleProducts.length > HOME_PRODUCT_COUNT;
</script>

<SEO url="/" />

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(websiteSchema)}
</svelte:head>

<Hero
	eyebrow="Kathmandu studio"
	title={company.tagline}
	subtitle={company.description}
	primary={{ label: 'See our products', href: '/products' }}
	secondary={{ label: 'Work with us', href: '/contact' }}
/>

<section class="max-w-6xl mx-auto px-6 pb-24">
	<div class="flex items-end justify-between mb-10">
		<div>
			<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
				Products
			</p>
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
				Apps we build and ship.
			</h2>
		</div>
		<a href="/products" class="hidden md:inline text-sm font-semibold text-primary hover:underline">
			See all →
		</a>
	</div>
	<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		{#each homeProducts as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
	{#if hasMore}
		<div class="mt-10 flex justify-center">
			<Button href="/products" variant="outline" size="lg">
				See all {visibleProducts.length} products
			</Button>
		</div>
	{/if}
</section>

<StatsBand stats={company.stats} />

<ConsultingSection
	blurb={company.consulting.blurb}
	capabilities={company.consulting.capabilities}
/>

<section class="max-w-3xl mx-auto px-6 pb-24 text-center">
	<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
		Have an idea? Let's talk.
	</h2>
	<p class="mt-4 text-muted-foreground">
		Whether you want to ship an app or rethink an existing one, we're up for a conversation.
	</p>
	<div class="mt-8">
		<Button href="/contact" size="lg">Get in touch</Button>
	</div>
</section>
