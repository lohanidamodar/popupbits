<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Check } from '@lucide/svelte';
	import { company } from '$lib';
	import ProductPager from '$lib/components/ProductPager.svelte';
	import {
		buildLog,
		byHandHours,
		faq,
		features,
		fileTree,
		launchOffer,
		packages,
		screenshots,
		seller,
		tierIncludes,
		tiers
	} from '$lib/data/kickstand.js';

	const title = 'Kickstand: Flutter Starter Kit for Appwrite';
	const description =
		'A production-ready Flutter starter on Appwrite: auth, guest mode, paywall, settings, i18n, accessibility, tests and CI. Runs offline in demo mode.';
	const url = `${company.url}/kickstand`;
	const image = `${company.url}/products/kickstand/og.png`;

	const fromPrice = Math.min(...tiers.map((t) => t.launchPrice ?? t.price));
	const offerEnds = launchOffer
		? new Date(`${launchOffer.until}T00:00:00`).toLocaleDateString('en', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		: null;
	const rate = buildLog.exampleRate;
	const usd = (n: number) => `$${n.toLocaleString('en')}`;
	const ways = [
		{
			name: 'By hand',
			hours: `~${byHandHours} hours`,
			detail: `Over ${Math.floor(byHandHours / 40)} full-time weeks for an experienced Flutter developer, before your first feature.`,
			cost: usd(byHandHours * rate),
			note: 'of developer time',
			highlighted: false
		},
		{
			name: 'With an AI agent',
			hours: `~${buildLog.aiHours} hours`,
			detail: `What it took us: 3 working days directing, reviewing and fixing, plus ~$${buildLog.aiTokenCost} of tokens. Assumes you know exactly what to build.`,
			cost: usd(buildLog.aiHours * rate + buildLog.aiTokenCost),
			note: 'of time and tokens',
			highlighted: false
		},
		{
			name: 'Start from Kickstand',
			hours: 'Today',
			detail:
				'Rebrand from one file and connect Appwrite, then build your own features from day one. Every 1.x update included.',
			cost: usd(fromPrice),
			note: 'once',
			highlighted: true
		}
	];

	const productSchema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'Kickstand',
		description,
		image,
		url,
		category: 'Software > Developer tools > Flutter templates',
		brand: { '@type': 'Brand', name: 'Kickstand' },
		offers: tiers.map((t) => ({
			'@type': 'Offer',
			name: `${t.name} licence (${t.seats})`,
			price: String(t.launchPrice ?? t.price),
			priceCurrency: 'USD',
			url: t.href,
			availability: 'https://schema.org/InStock'
		}))
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: { '@type': 'Answer', text: item.a }
		}))
	};

	// Escape "<" so no string in the data can close the script tag. The tags
	// are split so they don't end this component's own script block.
	const ld = 'application/ld+json';
	const jsonLd = (data: object) =>
		`<${'script'} type="${ld}">${JSON.stringify(data).replace(/</g, '\\u003c')}</${'script'}>`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Kickstand running on a tablet: notes home screen" />
	<meta property="og:type" content="product" />
	<meta property="og:site_name" content={company.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<!-- A plain-markdown version of this page, for AI agents and LLM tools. -->
	<link rel="alternate" type="text/markdown" href="/kickstand.md" title="Kickstand (Markdown)" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(productSchema)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(faqSchema)}
</svelte:head>

<div class="theme-popupbits">
	<!-- Hero -->
	<header class="bg-accent text-accent-foreground">
		<div class="max-w-6xl mx-auto px-6 py-20 md:py-28 grid gap-12 md:grid-cols-2 items-center">
			<div>
				<div class="flex flex-wrap gap-2 mb-5">
					<Badge variant="secondary">Flutter</Badge>
					<Badge variant="secondary">Appwrite</Badge>
					<Badge variant="secondary">Android · iOS · Web</Badge>
				</div>
				<h1 class="font-display text-4xl md:text-6xl font-extrabold tracking-tight">Kickstand</h1>
				<p class="mt-4 text-xl md:text-2xl font-semibold">
					Ship your Flutter app this week: auth, data, paywall and i18n, ready to go.
				</p>
				<p class="mt-4 text-lg opacity-80">
					A production-ready Flutter starter kit for Appwrite. It runs before you configure
					anything, and you rebrand it from one file.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button href="#pricing" size="lg">Buy from ${fromPrice}</Button>
					<Button href="#features" size="lg" variant="outline">What's included</Button>
				</div>
				{#if launchOffer}
					<p class="mt-4 text-sm font-medium">
						Launch price until {offerEnds}, applied automatically at checkout.
					</p>
				{/if}
			</div>
			<img
				src="/products/kickstand/hero-home.webp"
				alt="Kickstand's home screen on a phone: greeting, stats and coloured notes"
				width="640"
				height="1387"
				fetchpriority="high"
				class="mx-auto h-auto w-64 md:w-72 rounded-[2.5rem] border-8 border-neutral-900 shadow-2xl"
			/>
		</div>
	</header>

	<!-- Features -->
	<section id="features" class="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
			What's included
		</p>
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
			The first two weeks of every app, done properly.
		</h2>
		<p class="mt-4 max-w-2xl text-lg text-muted-foreground">
			Sign-in, a router that knows who is signed in, settings, dark mode, translations, a paywall,
			account deletion, analytics, tests, CI. Start on the part of your app that is actually yours.
		</p>
		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f (f.title)}
				<Card.Root>
					<Card.Header>
						<Card.Title class="text-lg">{f.title}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<!-- Screenshots -->
	<section class="bg-muted/40 py-20">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
				Phone, tablet and desktop.
			</h2>
			<p class="mt-3 text-muted-foreground">Captured from the running app, light and dark.</p>
			<div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
				{#each screenshots.filter((s) => !s.wide) as shot (shot.src)}
					<img
						src={shot.src}
						alt={shot.alt}
						loading="lazy"
						width="860"
						height="1864"
						class="h-auto w-full rounded-2xl"
					/>
				{/each}
			</div>
			<div class="mx-auto mt-6 max-w-4xl">
				{#each screenshots.filter((s) => s.wide) as shot (shot.src)}
					<img
						src={shot.src}
						alt={shot.alt}
						loading="lazy"
						width="1600"
						height="1200"
						class="h-auto w-full rounded-2xl"
					/>
				{/each}
			</div>
		</div>
	</section>

	<!-- What's in the box -->
	<section id="inside" class="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
			What's in the box
		</p>
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
			Clean architecture you can read in an afternoon.
		</h2>
		<p class="mt-4 max-w-2xl text-lg text-muted-foreground">
			Feature-first folders, each in four layers. Copy the notes feature to build your own. The full
			source, on current stable packages.
		</p>
		<div class="mt-10 grid gap-8 lg:grid-cols-[3fr,2fr] items-start">
			<figure class="rounded-2xl bg-neutral-950 text-neutral-100 p-6 overflow-x-auto shadow-xl">
				<figcaption class="mb-4 flex items-center gap-2 text-xs text-neutral-400">
					<span class="size-3 rounded-full bg-red-400" aria-hidden="true"></span>
					<span class="size-3 rounded-full bg-amber-400" aria-hidden="true"></span>
					<span class="size-3 rounded-full bg-green-400" aria-hidden="true"></span>
					<span class="ml-2">Project layout</span>
				</figcaption>
				<pre class="text-[13px] leading-6 font-mono"><code>{fileTree}</code></pre>
			</figure>
			<div>
				<h3 class="font-display text-xl font-bold">Packages</h3>
				<p class="mt-1 text-sm text-muted-foreground">
					Latest stable versions, no code generation, nothing exotic.
				</p>
				<table class="mt-4 w-full text-sm">
					<thead class="sr-only">
						<tr><th>Package</th><th>Version</th><th>Used for</th></tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each packages as pkg (pkg.name)}
							<tr>
								<td class="py-3 pr-3 font-mono font-semibold">{pkg.name}</td>
								<td class="py-3 pr-3"><Badge variant="secondary">{pkg.version}</Badge></td>
								<td class="py-3 text-muted-foreground">{pkg.role}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- What it took to build -->
	<section id="build-log" class="bg-muted/40 py-20 scroll-mt-20">
		<div class="max-w-6xl mx-auto px-6">
			<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
				What it took to build
			</p>
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl">
				~{byHandHours} hours of work, for {usd(fromPrice)}.
			</h2>
			<p class="mt-4 max-w-2xl text-lg text-muted-foreground">
				Even with an AI agent, a foundation like this takes days of a developer's attention:
				deciding, reviewing, fixing. We did that once, so you don't have to.
			</p>

			<div class="mt-10 grid gap-6 md:grid-cols-3">
				{#each ways as w (w.name)}
					<Card.Root class={w.highlighted ? 'border-2 border-primary' : ''}>
						<Card.Header>
							<Card.Title class="text-lg">{w.name}</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col gap-3">
							<p class="font-display text-4xl font-extrabold {w.highlighted ? 'text-primary' : ''}">
								{w.cost}
								<span class="text-sm font-normal text-muted-foreground">{w.note}</span>
							</p>
							<p class="font-semibold">{w.hours}</p>
							<p class="text-sm text-muted-foreground leading-relaxed">{w.detail}</p>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
			<p class="mt-4 text-xs text-muted-foreground">
				Time valued at an example rate of {usd(rate)} an hour. Use your own rate: the hours are what matter.
			</p>

			<div class="mt-12 grid gap-10 lg:grid-cols-2 items-start">
				<table class="w-full text-sm">
					<caption class="mb-3 text-left font-display text-xl font-bold text-foreground">
						Where ~{byHandHours} hours go by hand
					</caption>
					<thead>
						<tr class="text-left text-muted-foreground">
							<th class="py-2 pr-3 font-medium">Part</th>
							<th class="py-2 font-medium text-right">Hours</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each buildLog.byHand as p (p.part)}
							<tr>
								<td class="py-3 pr-3">{p.part}</td>
								<td class="py-3 text-right font-mono">{p.hours}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<div>
					<h3 class="font-display text-xl font-bold">How we built it</h3>
					<p class="mt-2 text-sm text-muted-foreground leading-relaxed">
						With {buildLog.model}, a developer making every product call, and nothing counted as
						done until the formatter, analyzer and tests passed. Measured from the session:
					</p>
					<dl class="mt-6 grid grid-cols-2 gap-4">
						{#each buildLog.measured as m (m.label)}
							<div class="rounded-2xl bg-background p-5 shadow-sm">
								<dt class="sr-only">{m.label}</dt>
								<dd class="font-display text-3xl font-extrabold text-primary">{m.value}</dd>
								<dd class="mt-1 text-sm text-muted-foreground">{m.label}</dd>
							</div>
						{/each}
					</dl>
					<details class="mt-6 group">
						<summary class="cursor-pointer text-sm font-semibold">
							Where the tokens went (~${buildLog.aiTokenCost} at API prices)
						</summary>
						<table class="mt-3 w-full text-sm">
							<caption class="sr-only">AI token usage by kind</caption>
							<thead>
								<tr class="text-left text-muted-foreground">
									<th class="py-2 pr-3 font-medium">Tokens</th>
									<th class="py-2 pr-3 font-medium text-right">Count</th>
									<th class="py-2 font-medium text-right">Cost</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-border">
								{#each buildLog.tokens as t (t.kind)}
									<tr>
										<td class="py-3 pr-3">{t.kind}</td>
										<td class="py-3 pr-3 text-right font-mono">{t.count}</td>
										<td class="py-3 text-right font-mono">{t.cost}</td>
									</tr>
								{/each}
							</tbody>
						</table>
						<p class="mt-3 text-xs text-muted-foreground">
							Anthropic API list prices for Claude Opus 5.5. The session also covered research, the
							licence and this page. The tokens were the cheap part; the developer's time was not.
						</p>
					</details>
				</div>
			</div>
			<p class="mt-6 text-xs text-muted-foreground">
				The by-hand hours are our estimate, not a measurement. The AI numbers are measured.
			</p>
		</div>
	</section>

	<!-- Pricing -->
	<section id="pricing" class="max-w-5xl mx-auto px-6 py-20 scroll-mt-20">
		<div class="text-center">
			<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-2">
				Licences
			</p>
			<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
				One-time payment. Unlimited apps.
			</h2>
			<p class="mt-3 text-muted-foreground">Prices in USD. Checkout by Stripe.</p>
			{#if launchOffer}
				<p class="mt-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold">
					Launch price until {offerEnds}
				</p>
			{/if}
		</div>
		<div class="mt-12 grid gap-6 md:grid-cols-2">
			{#each tiers as tier (tier.id)}
				<Card.Root class={tier.highlighted ? 'border-2 border-primary' : ''}>
					<Card.Header>
						<div class="flex items-center justify-between gap-2">
							<Card.Title class="text-2xl">{tier.name}</Card.Title>
							<Badge variant={tier.highlighted ? 'default' : 'secondary'}>{tier.seats}</Badge>
						</div>
						<Card.Description>{tier.blurb}</Card.Description>
					</Card.Header>
					<Card.Content class="flex flex-col gap-6">
						<div class="flex items-baseline gap-3">
							<span class="font-display text-5xl font-extrabold">
								${tier.launchPrice ?? tier.price}
							</span>
							{#if tier.launchPrice !== null}
								<span class="text-xl text-muted-foreground line-through">${tier.price}</span>
							{/if}
							<span class="text-sm text-muted-foreground">USD, once</span>
						</div>
						<ul class="space-y-2 text-sm">
							<li class="flex gap-2">
								<Check class="size-4 mt-0.5 text-primary" aria-hidden="true" />
								<span class="font-medium">{tier.seats}</span>
							</li>
							{#each tierIncludes as item (item)}
								<li class="flex gap-2">
									<Check class="size-4 mt-0.5 text-primary" aria-hidden="true" />
									<span>{item}</span>
								</li>
							{/each}
						</ul>
						<Button
							href={tier.href}
							size="lg"
							variant={tier.highlighted ? 'default' : 'outline'}
							class="w-full"
						>
							Buy {tier.name}
						</Button>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
		<p class="mt-8 text-center text-sm text-muted-foreground">
			Your download link arrives by email within 24 hours. Solo can be upgraded to Team by paying
			the difference.
		</p>
	</section>

	<!-- How it works -->
	<section class="bg-muted/40 py-20">
		<div class="max-w-5xl mx-auto px-6 grid gap-8 md:grid-cols-3">
			<div>
				<p class="font-display text-4xl font-extrabold text-primary">1</p>
				<h3 class="mt-2 text-lg font-semibold">Buy</h3>
				<p class="mt-1 text-sm text-muted-foreground">
					Pay securely through Stripe. Keep your receipt: its number is your licence reference.
				</p>
			</div>
			<div>
				<p class="font-display text-4xl font-extrabold text-primary">2</p>
				<h3 class="mt-2 text-lg font-semibold">Download</h3>
				<p class="mt-1 text-sm text-muted-foreground">
					Your download link arrives by email within 24 hours, to the address you paid with.
				</p>
			</div>
			<div>
				<p class="font-display text-4xl font-extrabold text-primary">3</p>
				<h3 class="mt-2 text-lg font-semibold">Run</h3>
				<p class="mt-1 text-sm text-muted-foreground">
					<code class="text-xs">flutter pub get && flutter run</code> starts it in demo mode. Then
					edit <code class="text-xs">brand.yaml</code> and make it yours.
				</p>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="max-w-3xl mx-auto px-6 py-20">
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">Questions</h2>
		<div class="mt-8 divide-y divide-border">
			{#each faq as item (item.q)}
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

	<!-- Final CTA -->
	<section class="max-w-3xl mx-auto px-6 pb-24 text-center">
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
			Start on the part that's yours.
		</h2>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			{#each tiers as tier (tier.id)}
				<Button href={tier.href} size="lg" variant={tier.highlighted ? 'default' : 'outline'}>
					Buy {tier.name} · ${tier.launchPrice ?? tier.price}
				</Button>
			{/each}
		</div>
		<p class="mt-10 text-xs text-muted-foreground">
			{#if seller.legalName}Sold by {seller.legalName}.{/if}
			{#if seller.supportEmail}
				Support: <a class="underline" href={`mailto:${seller.supportEmail}`}
					>{seller.supportEmail}</a
				>.
			{/if}
			Payments processed by Stripe.
		</p>
	</section>

	<ProductPager slug="kickstand" />
</div>
