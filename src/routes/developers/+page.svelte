<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import LangText from '$lib/components/LangText.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		flagship,
		toolGroups,
		developerTools,
		kindLabels,
		toolSchema,
		type DeveloperTool
	} from '$lib/data/developer-tools.js';
	import { jsonLd } from '$lib/jsonld.js';
	import { ORG_ID, absoluteUrl } from '$lib/seo.js';
	import { Code, Download, ArrowRight, Terminal, Package, AppWindow } from '@lucide/svelte';

	const kindIcon = { app: AppWindow, cli: Terminal, package: Package, template: Package };

	const access = (t: DeveloperTool) => (t.paid ? 'Paid' : `Open source · ${t.license}`);

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${absoluteUrl('/developers')}#page`,
		name: 'Popup Bits for developers',
		url: absoluteUrl('/developers'),
		publisher: { '@id': ORG_ID },
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: developerTools.map((t, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				item: { ...toolSchema(t), author: { '@id': ORG_ID } }
			}))
		}
	};

	// Karmashala's highlights, from its README and the PopupBits project catalogue.
	const highlights = [
		{
			title: 'Claude Code, Codex and Antigravity',
			text: 'Each driven through its own protocol, plus any agent that speaks ACP. Sessions started outside the app are imported.'
		},
		{
			title: 'Terminals and chat',
			text: 'Every session is an embedded terminal or a chat view of the same conversation, in split, tabbed groups that survive a restart.'
		},
		{
			title: 'Sessions that start sessions',
			text: 'An agent can start sub-sessions on any agent and model, which report back when they finish.'
		},
		{
			title: 'Editor, files and checkpoints',
			text: 'Edit files in tabs, browse any environment, and roll back to a checkpoint taken every turn.'
		},
		{
			title: 'Anywhere the work is',
			text: 'This machine, a WSL distribution or an SSH host. The headless server keeps sessions running; follow them from your phone.'
		},
		{
			title: 'Device, browser and MCP',
			text: 'Device and browser tooling for agents, and an MCP server of Karmashala’s own.'
		}
	];
</script>

<SEO
	title="Popup Bits for developers"
	description="Karmashala, an open-source agent development environment for Claude Code, Codex and Antigravity, and the Dart and Flutter tools around it."
	url="/developers"
	breadcrumbs={[{ name: 'Developers', path: '/developers' }]}
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from our own data -->
	{@html jsonLd(pageSchema)}
</svelte:head>

<PageHeader
	eyebrow="For developers"
	title="Tools we build for building."
	subtitle="Most of what we make for our own work is open source. It starts with Karmashala, where we run our coding agents every day."
/>

<section id={flagship.slug} class="max-w-6xl mx-auto px-6 pb-16">
	<div class="rounded-3xl border border-border bg-card p-8 md:p-12">
		<div class="flex items-center gap-4">
			{#if flagship.iconSrc}
				<img src={flagship.iconSrc} alt="" width="64" height="64" class="size-16 rounded-2xl" />
			{/if}
			<div>
				<h2 class="font-display text-4xl font-extrabold tracking-tight">
					{flagship.name} <span lang="ne" class="text-muted-foreground font-bold">कर्मशाला</span>
				</h2>
				<p class="text-sm font-semibold text-primary">{access(flagship)}</p>
			</div>
		</div>
		<p class="mt-6 text-xl max-w-3xl"><LangText text={flagship.tagline} /></p>
		<p class="mt-3 text-muted-foreground max-w-3xl">
			One Flutter app that runs coding-agent CLIs on your desktop, on a server, or both, and follows
			them from your phone. Windows is the primary target; Windows, macOS, Linux and Android builds
			are attached to every release.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			{#if flagship.releases}
				<Button href={flagship.releases} size="lg"><Download class="size-4" /> Download</Button>
			{/if}
			{#if flagship.repo}
				<Button href={flagship.repo} size="lg" variant="outline"
					><Code class="size-4" /> Source on GitHub</Button
				>
			{/if}
			{#if flagship.page}
				<Button href={flagship.page} size="lg" variant="ghost"
					>More about Karmashala <ArrowRight class="size-4" /></Button
				>
			{/if}
		</div>

		<a href="/products/karmashala/dashboard.webp" class="mt-10 block">
			<img
				src="/products/karmashala/dashboard.webp"
				alt="Karmashala's agent dashboard on Windows: running and finished sessions grouped by project with their sub-sessions, and glances for todos, listening ports, store reviews and agent usage limits."
				width="1920"
				height="1080"
				loading="lazy"
				decoding="async"
				class="w-full h-auto rounded-2xl border border-border"
			/>
		</a>

		<ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each highlights as h (h.title)}
				<li>
					<h3 class="font-semibold">{h.title}</h3>
					<p class="mt-1 text-sm text-muted-foreground">{h.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

{#each toolGroups as g (g.group)}
	<section class="max-w-6xl mx-auto px-6 pb-16">
		<h2 class="font-display text-3xl font-extrabold tracking-tight mb-8">{g.label}</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each g.tools as t (t.slug)}
				{@const Icon = kindIcon[t.kind]}
				<article id={t.slug} class="rounded-2xl border border-border bg-card p-6 flex flex-col">
					<div class="flex items-start gap-4">
						{#if t.iconSrc}
							<img src={t.iconSrc} alt="" width="48" height="48" class="size-12 rounded-xl" />
						{:else}
							<div class="size-12 rounded-xl bg-muted grid place-items-center shrink-0">
								<Icon class="size-6 text-primary" />
							</div>
						{/if}
						<div class="min-w-0">
							<h3 class="font-display text-2xl font-bold">{t.name}</h3>
							<p class="text-sm text-muted-foreground">
								{kindLabels[t.kind]}{t.platforms.length ? ` · ${t.platforms.join(', ')}` : ''}
							</p>
						</div>
						<span
							class={`ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
								t.paid ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
							}`}
						>
							{access(t)}
						</span>
					</div>
					<p class="mt-4 font-medium"><LangText text={t.tagline} /></p>
					<p class="mt-2 text-sm text-muted-foreground flex-1"><LangText text={t.description} /></p>
					{#if t.note}
						<p class="mt-3 text-xs text-muted-foreground border-l-2 border-border pl-3">{t.note}</p>
					{/if}
					<div class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
						{#if t.page}
							<a href={t.page} class="text-primary hover:underline"
								>{t.paid ? 'See plans' : 'Details'} →</a
							>
						{/if}
						{#if t.releases}
							<a href={t.releases} class="text-primary hover:underline">Releases →</a>
						{/if}
						{#if t.repo}
							<a href={t.repo} class="text-primary hover:underline">Source →</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
{/each}

<section class="max-w-3xl mx-auto px-6 pb-24">
	<div class="rounded-2xl border border-border bg-card p-8 text-center">
		<h2 class="font-display text-2xl md:text-3xl font-bold">Found a bug, or want a feature?</h2>
		<p class="mt-3 text-muted-foreground">
			Open an issue on the tool’s GitHub repository. For anything else, write to us.
		</p>
		<div class="mt-6">
			<Button href="/contact" size="lg" variant="outline">Contact us</Button>
		</div>
	</div>
</section>
