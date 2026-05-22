<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
	import { Mail, MapPin, Phone, ArrowRight } from '@lucide/svelte';

	type Prompt = { title: string; description: string; subject: string };

	const prompts: Prompt[] = [
		{
			title: 'Start a project',
			description:
				"Full-stack app, custom SaaS, AI integration, or business automation — tell us what you're building.",
			subject: 'Project enquiry'
		},
		{
			title: 'Aakar Launcher beta',
			description: 'Want early access, or have feedback on the launcher? Reach out here.',
			subject: 'Aakar Launcher beta'
		},
		{
			title: 'Just saying hi',
			description: 'Questions about one of our products, a bug report, or just to chat.',
			subject: 'Hello from popupbits.com'
		}
	];

	const mailto = (subject: string) =>
		`mailto:${company.contact.email}?subject=${encodeURIComponent(subject)}`;
</script>

<svelte:head>
	<title>Contact — Popup Bits</title>
	<meta name="description" content="Get in touch with Popup Bits." />
</svelte:head>

<PageHeader
	eyebrow="Contact"
	title="Get in touch."
	subtitle="We reply to every email — usually within a couple of days. Pick what fits and write to us directly."
/>

<section class="max-w-5xl mx-auto px-6 pb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each prompts as p (p.title)}
		<a
			href={mailto(p.subject)}
			class="group rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition p-6 flex flex-col"
		>
			<h2 class="font-display text-xl font-bold mb-2">{p.title}</h2>
			<p class="text-sm text-muted-foreground flex-1">{p.description}</p>
			<div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
				Email us <ArrowRight class="size-4 group-hover:translate-x-0.5 transition-transform" />
			</div>
		</a>
	{/each}
</section>

<section class="max-w-5xl mx-auto px-6 pb-24">
	<div class="rounded-2xl border border-border bg-muted/30 p-8 grid gap-8 md:grid-cols-3">
		<div class="flex gap-3 items-start">
			<Mail class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold text-sm">Email</div>
				<a
					class="text-sm text-muted-foreground hover:text-foreground hover:underline"
					href="mailto:{company.contact.email}"
				>
					{company.contact.email}
				</a>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<Phone class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold text-sm">Phone</div>
				<div class="text-sm text-muted-foreground">{company.contact.phone}</div>
				<div class="text-xs text-muted-foreground mt-1">{company.contact.timezone}</div>
			</div>
		</div>
		<div class="flex gap-3 items-start">
			<MapPin class="size-5 text-primary mt-0.5 shrink-0" />
			<div>
				<div class="font-semibold text-sm">{company.contact.address.city}</div>
				<div class="text-sm text-muted-foreground">
					{company.contact.address.street}, Ward {company.contact.address.zone},<br />
					{company.contact.address.city}, {company.contact.address.country}
				</div>
			</div>
		</div>
	</div>
</section>
