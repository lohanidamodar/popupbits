<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company } from '$lib';
	import { services, process, businessFaq } from '$lib/data/services.js';
	import { jsonLd } from '$lib/jsonld.js';
	import { ORG_ID, absoluteUrl } from '$lib/seo.js';
	import { Check, Phone, Mail } from '@lucide/svelte';

	const tel = `tel:${company.contact.phone.replace(/[^+\d]/g, '')}`;
	const mailto = `mailto:${company.contact.email}?subject=${encodeURIComponent('Free check-up')}`;
	const npr = new Intl.NumberFormat('en-IN');

	const serviceSchema = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${absoluteUrl('/for-business')}#service`,
		name: `${company.name}: software for Nepali businesses`,
		url: absoluteUrl('/for-business'),
		parentOrganization: { '@id': ORG_ID },
		telephone: company.contact.phone,
		email: company.contact.email,
		areaServed: { '@type': 'Country', name: 'Nepal' },
		address: {
			'@type': 'PostalAddress',
			streetAddress: company.contact.address.street,
			addressLocality: company.contact.address.city,
			addressCountry: 'NP'
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services',
			itemListElement: services.map((s) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: s.title, description: s.summary }
			}))
		}
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: businessFaq.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: f.answer }
		}))
	};
</script>

<SEO
	title="Software for Nepali businesses"
	description="Popup Bits helps Nepali shops, showrooms and offices stop losing orders, follow-ups and time: websites, order trackers, daily accounts and custom apps, at a fixed price."
	url="/for-business"
	breadcrumbs={[{ name: 'For business', path: '/for-business' }]}
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(serviceSchema)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(faqSchema)}
</svelte:head>

<PageHeader
	eyebrow="For business"
	title="Less time on admin. Fewer lost customers."
	subtitle="We help Nepali businesses fix the everyday problems that cost them money: orders lost in chat, follow-ups forgotten, days that end without knowing what was sold. Every project starts with a free check-up and a fixed price."
/>

<section class="max-w-6xl mx-auto px-6 pb-8 flex flex-wrap gap-3">
	<Button href={tel} size="lg"><Phone class="size-4" /> Call {company.contact.phone}</Button>
	<Button href={mailto} size="lg" variant="outline"
		><Mail class="size-4" /> Book a free check-up</Button
	>
</section>

<section class="max-w-6xl mx-auto px-6 py-16">
	<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
		Which of these sounds like your business?
	</h2>
	<div class="grid gap-6 md:grid-cols-2">
		{#each services as s (s.slug)}
			<article id={s.slug} class="rounded-2xl border border-border bg-card p-8 flex flex-col">
				<p class="text-lg italic text-muted-foreground">“{s.problem}”</p>
				<h3 class="mt-4 font-display text-2xl font-bold">{s.title}</h3>
				<p class="mt-3 text-muted-foreground">{s.summary}</p>
				<ul class="mt-6 grid gap-2 flex-1">
					{#each s.deliverables as d (d)}
						<li class="flex items-start gap-3">
							<Check class="mt-1 size-4 text-primary shrink-0" />
							<span>{d}</span>
						</li>
					{/each}
				</ul>
				<dl class="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4 text-sm">
					<div>
						<dt class="text-muted-foreground">Typical time</dt>
						<dd class="font-semibold">{s.timeline}</dd>
					</div>
					<div>
						<dt class="text-muted-foreground">Price</dt>
						<dd class="font-semibold">
							{s.priceFromNpr
								? `From Rs ${npr.format(s.priceFromNpr)}`
								: 'Fixed quote after a free call'}
						</dd>
					</div>
				</dl>
			</article>
		{/each}
	</div>
</section>

<section class="bg-muted/40 border-y border-border">
	<div class="max-w-6xl mx-auto px-6 py-16">
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
			How we work
		</h2>
		<ol class="grid gap-8 md:grid-cols-4">
			{#each process as step, i (step.title)}
				<li>
					<div class="font-display text-4xl font-extrabold text-primary">{i + 1}</div>
					<h3 class="mt-2 font-semibold text-lg">{step.title}</h3>
					<p class="mt-1 text-muted-foreground">{step.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
	<div>
		<h2 class="font-display text-3xl font-extrabold tracking-tight">Why work with us</h2>
		<ul class="mt-6 grid gap-4 text-lg">
			<li class="flex items-start gap-3">
				<Check class="mt-1.5 size-5 text-primary shrink-0" />
				<span>
					Building software in Kathmandu since {company.established}, with more than 50 projects
					shipped for ourselves and for clients.
				</span>
			</li>
			<li class="flex items-start gap-3">
				<Check class="mt-1.5 size-5 text-primary shrink-0" />
				<span>
					We run our own apps, used every day on Android, iOS, web and desktop. <a
						href="/products"
						class="text-primary font-semibold hover:underline">See them</a
					>.
				</span>
			</li>
			<li class="flex items-start gap-3">
				<Check class="mt-1.5 size-5 text-primary shrink-0" />
				<span>
					We build in Nepali as well as English: our apps teach Nepali and Sanskrit, and run a
					Nepali dictionary offline.
				</span>
			</li>
			<li class="flex items-start gap-3">
				<Check class="mt-1.5 size-5 text-primary shrink-0" />
				<span>You talk to the people building your software, not a sales team.</span>
			</li>
		</ul>
	</div>
	<div class="rounded-2xl border border-border bg-card p-8">
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary">
			From our own products
		</p>
		<h3 class="mt-3 font-display text-2xl font-bold">Gaadidesk, for vehicle showrooms</h3>
		<p class="mt-3 text-muted-foreground">
			Recondition showrooms run on inquiries, follow-ups and paperwork, usually spread across
			notebooks, phone calls and chat. Gaadidesk puts inventory, buyer inquiries, follow-ups,
			documents and financing in one app. It is the same approach we bring to client work: start
			from how the business already runs, and remove the steps that lose customers.
		</p>
		<a
			href="/products/gaadidesk"
			class="mt-6 inline-block text-primary font-semibold hover:underline"
		>
			About Gaadidesk →
		</a>
	</div>
</section>

<section class="max-w-3xl mx-auto px-6 py-16">
	<h2 class="font-display text-3xl font-extrabold tracking-tight mb-8">Common questions</h2>
	<div class="grid gap-6">
		{#each businessFaq as f (f.question)}
			<div>
				<h3 class="font-semibold text-lg">{f.question}</h3>
				<p class="mt-1 text-muted-foreground">{f.answer}</p>
			</div>
		{/each}
	</div>
</section>

<section class="max-w-3xl mx-auto px-6 pb-24">
	<div class="rounded-2xl border border-border bg-card p-8 text-center">
		<h2 class="font-display text-2xl md:text-3xl font-bold">Start with a free check-up</h2>
		<p class="mt-3 text-muted-foreground">
			Thirty minutes, by phone or in person in Kathmandu. Tell us what slows your business down and
			we will tell you honestly whether software can help.
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<Button href={tel} size="lg"><Phone class="size-4" /> Call us</Button>
			<Button href={mailto} size="lg" variant="outline"><Mail class="size-4" /> Email us</Button>
		</div>
	</div>
</section>
