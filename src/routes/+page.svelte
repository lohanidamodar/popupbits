<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import StatsBand from '$lib/components/StatsBand.svelte';
	import ConsultingSection from '$lib/components/ConsultingSection.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company, featuredProducts } from '$lib';
</script>

<svelte:head>
	<title>{company.seo.defaultTitle}</title>
	<meta name="description" content={company.seo.defaultDescription} />
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
		{#each featuredProducts as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
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
