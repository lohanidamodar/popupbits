<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<svelte:head>
	<title>About — Popup Bits</title>
	<meta
		name="description"
		content="Popup Bits is a Kathmandu-based studio building apps and taking on selected client work."
	/>
</svelte:head>

<PageHeader
	eyebrow="About"
	title="A small studio, shipping useful apps."
	subtitle="Popup Bits was founded in {company.established} in Kathmandu. We design, build, and run our own products — and occasionally help other teams do the same."
/>

<section class="max-w-3xl mx-auto px-6 pb-16 space-y-6 text-lg leading-relaxed">
	<p>
		We started by scratching our own itches — a Nepali calendar, a learning app for kids, a UI
		reference for Flutter developers. Some of those grew into products people now use every day.
	</p>
	<p>
		Today we still ship our own apps and take a handful of consulting engagements each year, mostly
		Flutter app builds, design systems, and backend platform work.
	</p>
	<p>
		The studio is led by <strong>{company.founder}</strong> and based in {company.contact.address
			.city},
		{company.contact.address.country}.
	</p>
</section>

<section class="max-w-3xl mx-auto px-6 pb-24">
	<div class="rounded-2xl border border-border bg-card p-8">
		<h2 class="font-display text-2xl font-bold mb-2">Want to work together?</h2>
		<p class="text-muted-foreground mb-6">We reply to everything within a couple of days.</p>
		<Button href="/contact" size="lg">Get in touch</Button>
	</div>
</section>
