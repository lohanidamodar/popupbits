<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { company } from '$lib';
	import { Mail, MapPin, Phone } from '@lucide/svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	const mailtoHref = $derived(
		`mailto:${company.contact.email}` +
			`?subject=${encodeURIComponent('Hello from ' + (name || 'popupbits.com'))}` +
			`&body=${encodeURIComponent(message || '') + '\n\n— ' + (name || '') + ' <' + (email || '') + '>'}`
	);
</script>

<svelte:head>
	<title>Contact — Popup Bits</title>
	<meta name="description" content="Get in touch with Popup Bits." />
</svelte:head>

<PageHeader
	eyebrow="Contact"
	title="Tell us about your project."
	subtitle="Fill the form and your email client will open with a pre-filled draft, or reach us directly via the channels below."
/>

<section class="max-w-5xl mx-auto px-6 pb-24 grid gap-12 md:grid-cols-[2fr_1fr]">
	<form
		class="space-y-6"
		onsubmit={(e) => {
			e.preventDefault();
			window.location.href = mailtoHref;
		}}
	>
		<div class="space-y-2">
			<Label for="name">Your name</Label>
			<Input id="name" bind:value={name} required />
		</div>
		<div class="space-y-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" bind:value={email} required />
		</div>
		<div class="space-y-2">
			<Label for="message">What's on your mind?</Label>
			<Textarea id="message" bind:value={message} rows={6} required />
		</div>
		<Button type="submit" size="lg">Open my email client</Button>
	</form>

	<aside class="space-y-6 text-sm">
		<div class="flex gap-3 items-start">
			<Mail class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">Email</div>
				<a class="text-muted-foreground hover:underline" href="mailto:{company.contact.email}">
					{company.contact.email}
				</a>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<Phone class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">Phone</div>
				<div class="text-muted-foreground">{company.contact.phone}</div>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<MapPin class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold">{company.contact.address.city}</div>
				<div class="text-muted-foreground">
					{company.contact.address.street}, Ward {company.contact.address.zone},<br />
					{company.contact.address.city}, {company.contact.address.country}
				</div>
				<div class="text-muted-foreground mt-1">{company.contact.timezone}</div>
			</div>
		</div>
	</aside>
</section>
