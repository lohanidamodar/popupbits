<script lang="ts">
	import { type Product, isOpenSource, platformLabels, statusLabels } from '$lib/data/products.js';
	import type { ProductPage, Screenshot } from '$lib/data/product-pages.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ExternalLink, CodeXml, Globe, Download, Check } from '@lucide/svelte';
	import GooglePlay from './icons/GooglePlay.svelte';
	import AppStore from './icons/AppStore.svelte';
	import NepalFlag from './icons/NepalFlag.svelte';
	import ProductIcon from './ProductIcon.svelte';
	import ProductPager from './ProductPager.svelte';
	import { getPostsByProduct, formatPostDate } from '$lib/data/posts.js';

	let { product, page }: { product: Product; page?: ProductPage } = $props();

	const relatedPosts = $derived(getPostsByProduct(product.slug));

	// A policy can live on the product's own domain (e.g. Mero Nepali), not just /contact.
	const isExternal = (href: string) => href.startsWith('http');

	const iconFor = (kind: Product['links'][number]['kind']) => {
		if (kind === 'play') return GooglePlay;
		if (kind === 'appstore') return AppStore;
		if (kind === 'github') return CodeXml;
		if (kind === 'web') return Globe;
		if (kind === 'release') return Download;
		return ExternalLink;
	};

	// A coming-soon product's store page is not live yet, so its store buttons
	// would be dead links. Keep the other links (site, source) and say so instead.
	const isStore = (kind: Product['links'][number]['kind']) =>
		kind === 'play' || kind === 'appstore';
	const ctaLinks = $derived(
		product.status === 'coming-soon' ? product.links.filter((l) => !isStore(l.kind)) : product.links
	);
	const comingTo = $derived(
		product.status === 'coming-soon'
			? product.links
					.filter((l) => isStore(l.kind))
					.map((l) => (l.kind === 'play' ? 'Google Play' : 'the App Store'))
			: []
	);

	const shots = $derived(page?.screenshots ?? []);
	const isPortrait = (s: Screenshot) => s.height > s.width;
	const hero = $derived(shots[0]);
	const portraitShots = $derived(shots.filter(isPortrait));
	const landscapeShots = $derived(shots.filter((s) => !isPortrait(s)));

	// Raw screen captures get a device frame; store-ready marketing shots and
	// desktop windows already have their own.
	const frameClass = $derived(
		page?.frame === 'phone'
			? 'rounded-[2.5rem] border-8 border-neutral-900 bg-neutral-900 shadow-2xl'
			: 'rounded-2xl shadow-xl'
	);
	const gridFrameClass = $derived(
		page?.frame === 'phone'
			? 'rounded-[1.75rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-lg'
			: 'rounded-2xl shadow-md'
	);

	// Where the screenshots came from, for the caption under the gallery.
	const sources = $derived(
		[
			shots.some((s) => s.src.includes('/play-')) && 'Google Play',
			shots.some((s) => s.src.includes('/appstore-')) && 'the App Store',
			shots.some((s) => s.src.includes('/github-')) && 'the project on GitHub'
		].filter((s): s is string => Boolean(s))
	);
	const joinList = (items: string[]) =>
		items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
</script>

<div class={`${product.themeClass}`}>
	<!-- Hero -->
	<header class="bg-accent text-accent-foreground">
		<div
			class={`max-w-6xl mx-auto px-6 py-16 md:py-24 grid gap-12 items-center ${
				hero && isPortrait(hero) ? 'md:grid-cols-[3fr_2fr]' : ''
			}`}
		>
			<div>
				<div class="flex items-center gap-5 mb-6">
					<ProductIcon {product} size="md" />
					<div class="flex flex-wrap items-center gap-2">
						{#each product.platforms as p (p)}
							<Badge variant="secondary">{platformLabels[p]}</Badge>
						{/each}
						{#if product.status !== 'live'}
							<Badge variant="outline">{statusLabels[product.status]}</Badge>
						{/if}
						{#if isOpenSource(product)}
							<Badge variant="outline">
								<CodeXml />
								Open source · {product.license}
							</Badge>
						{/if}
					</div>
				</div>
				<h1 class="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
					{product.name}
				</h1>
				<p class="mt-4 text-xl md:text-2xl font-semibold">{product.tagline}</p>
				{#if page}
					<p class="mt-4 max-w-2xl text-lg opacity-80">{page.pitch.text}</p>
				{/if}
				{#if product.availableIn}
					<p class="mt-4 inline-flex items-center gap-2 text-sm font-medium opacity-90">
						<NepalFlag class="h-5 w-auto" />
						Available in {product.availableIn} only
					</p>
				{/if}
				<div class="mt-8 flex flex-wrap items-center gap-3">
					{#each ctaLinks as link (link.label + link.href)}
						{@const Icon = iconFor(link.kind)}
						<Button href={link.href} size="lg" target="_blank" rel="noopener noreferrer">
							<Icon class="size-4" />
							{link.label}
						</Button>
					{/each}
					{#if comingTo.length > 0}
						<span class="rounded-full bg-background/70 px-4 py-2 text-sm font-semibold">
							Coming soon to {joinList(comingTo)}
						</span>
					{/if}
				</div>
			</div>
			{#if hero && isPortrait(hero)}
				<img
					src={hero.src}
					alt={hero.alt}
					width={hero.width}
					height={hero.height}
					fetchpriority="high"
					class={`mx-auto h-auto w-56 md:w-72 ${frameClass}`}
				/>
			{:else if hero}
				<img
					src={hero.src}
					alt={hero.alt}
					width={hero.width}
					height={hero.height}
					fetchpriority="high"
					class={`mx-auto h-auto w-full max-w-4xl ${frameClass}`}
				/>
			{/if}
		</div>
	</header>

	{#if page}
		<!-- Pitch, audience and facts -->
		<section class="max-w-6xl mx-auto px-6 py-20">
			<div class="grid gap-12 lg:grid-cols-[3fr_2fr] items-start">
				<div>
					<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
						{page.pitch.eyebrow}
					</p>
					<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
						{page.pitch.headline}
					</h2>
					<p class="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
						{product.description}
					</p>
					{#if page.audience && page.audience.length > 0}
						<h3 class="mt-10 font-display text-xl font-bold">Made for</h3>
						<ul class="mt-3 space-y-2">
							{#each page.audience as who (who)}
								<li class="flex gap-2">
									<Check class="size-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
									<span>{who}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
				{#if page.facts && page.facts.length > 0}
					<dl class="grid grid-cols-2 gap-4">
						{#each page.facts as fact (fact.label)}
							<div class="rounded-2xl bg-muted/40 p-5">
								<dt class="sr-only">{fact.label}</dt>
								<dd class="font-display text-3xl font-extrabold text-primary">{fact.value}</dd>
								<dd class="mt-1 text-sm text-muted-foreground">{fact.label}</dd>
							</div>
						{/each}
					</dl>
				{/if}
			</div>
		</section>

		<!-- Highlights -->
		{#if page.highlights.length > 0}
			<section id="features" class="bg-muted/40 py-20 scroll-mt-20">
				<div class="max-w-6xl mx-auto px-6">
					<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
						What it does
					</p>
					<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
						Everything in {product.name}.
					</h2>
					<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each page.highlights as h (h.title)}
							<Card.Root>
								<Card.Header>
									<Card.Title class="text-lg">{h.title}</Card.Title>
								</Card.Header>
								<Card.Content>
									<p class="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
								</Card.Content>
							</Card.Root>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Screenshots -->
		{#if shots.length > 0}
			<section id="screenshots" class="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
				<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
					See it on the screen.
				</h2>
				<p class="mt-3 text-muted-foreground">
					Screenshots from {joinList(sources)}.
				</p>
				{#if portraitShots.length > 0}
					<div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
						{#each portraitShots as shot (shot.src)}
							<img
								src={shot.src}
								alt={shot.alt}
								loading="lazy"
								width={shot.width}
								height={shot.height}
								class={`h-auto w-full ${gridFrameClass}`}
							/>
						{/each}
					</div>
				{/if}
				{#if landscapeShots.length > 0}
					<div class="mt-6 grid gap-6 md:grid-cols-2 items-start">
						{#each landscapeShots as shot (shot.src)}
							<img
								src={shot.src}
								alt={shot.alt}
								loading="lazy"
								width={shot.width}
								height={shot.height}
								class="h-auto w-full rounded-2xl shadow-md"
							/>
						{/each}
					</div>
				{/if}
			</section>
		{/if}
	{:else}
		<section class="max-w-3xl mx-auto px-6 py-16">
			<h2 class="font-display text-2xl font-bold mb-4">About</h2>
			<p class="text-lg leading-relaxed text-foreground/90">{product.description}</p>
		</section>
	{/if}

	<!-- Built with, policies -->
	<section class="bg-muted/40 py-16">
		<div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center gap-8">
			<div class="flex-1">
				<h2 class="font-display text-xl font-bold mb-3">Built with</h2>
				<div class="flex flex-wrap gap-2">
					{#each product.tech as t (t)}
						<Badge variant="outline">{t}</Badge>
					{/each}
				</div>
			</div>
			{#if product.privacyHref || product.accountDeletionHref}
				<p class="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
					{#if product.privacyHref}
						<a
							class="underline-offset-4 hover:underline"
							href={product.privacyHref}
							target={isExternal(product.privacyHref) ? '_blank' : undefined}
							rel={isExternal(product.privacyHref) ? 'noopener noreferrer' : undefined}
						>
							Privacy policy
						</a>
					{/if}
					{#if product.accountDeletionHref}
						<a class="underline-offset-4 hover:underline" href={product.accountDeletionHref}>
							Delete your account
						</a>
					{/if}
				</p>
			{/if}
		</div>
	</section>

	<!-- FAQ -->
	{#if page?.faq && page.faq.length > 0}
		<section class="max-w-3xl mx-auto px-6 py-20">
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">Questions</h2>
			<div class="mt-8 divide-y divide-border">
				{#each page.faq as item (item.q)}
					<details class="group py-4">
						<summary class="cursor-pointer list-none flex justify-between gap-4 font-semibold">
							{item.q}
							<span
								class="text-muted-foreground transition-transform group-open:rotate-45"
								aria-hidden="true">+</span
							>
						</summary>
						<p class="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
					</details>
				{/each}
			</div>
		</section>
	{/if}

	{#if relatedPosts.length > 0}
		<section class="max-w-6xl mx-auto px-6 py-20">
			<h2 class="font-display text-2xl font-bold mb-6">From the blog</h2>
			<ul class="space-y-4">
				{#each relatedPosts as post (post.slug)}
					<li>
						<a
							href={`/blog/${post.slug}`}
							class="block rounded-xl border border-border p-6 transition-colors hover:bg-accent"
						>
							<time class="text-xs text-muted-foreground" datetime={post.date}>
								{formatPostDate(post.date)}
							</time>
							<h3 class="font-display text-lg font-semibold mt-1">{post.title}</h3>
							<p class="text-sm text-muted-foreground mt-2">{post.description}</p>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Final CTA -->
	{#if ctaLinks.length > 0 || comingTo.length > 0}
		<section class="max-w-3xl mx-auto px-6 py-20 text-center">
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
				{#if comingTo.length > 0 && ctaLinks.length === 0}
					{product.name} is coming soon to {joinList(comingTo)}.
				{:else}
					Get {product.name}.
				{/if}
			</h2>
			{#if ctaLinks.length > 0}
				<div class="mt-8 flex flex-wrap justify-center gap-3">
					{#each ctaLinks as link (link.label + link.href)}
						{@const Icon = iconFor(link.kind)}
						<Button href={link.href} size="lg" target="_blank" rel="noopener noreferrer">
							<Icon class="size-4" />
							{link.label}
						</Button>
					{/each}
				</div>
			{/if}
		</section>
	{/if}

	<ProductPager slug={product.slug} />
</div>
