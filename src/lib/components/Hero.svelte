<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';

	type Cta = { label: string; href: string; variant?: 'default' | 'secondary' | 'outline' };

	let {
		eyebrow,
		title,
		subtitle,
		primary,
		secondary,
		visual
	}: {
		eyebrow?: string;
		title: string;
		subtitle?: string;
		primary?: Cta;
		secondary?: Cta;
		visual?: Snippet;
	} = $props();
</script>

<section class="relative overflow-hidden">
	<div class="max-w-6xl mx-auto px-6 pt-24 pb-20 grid gap-12 md:grid-cols-2 md:items-center">
		<div>
			{#if eyebrow}
				<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-4">
					{eyebrow}
				</p>
			{/if}
			<h1 class="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
				{title}
			</h1>
			{#if subtitle}
				<p class="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">{subtitle}</p>
			{/if}
			{#if primary || secondary}
				<div class="mt-10 flex flex-wrap gap-3">
					{#if primary}
						<Button href={primary.href} size="lg" variant={primary.variant ?? 'default'}>
							{primary.label}
						</Button>
					{/if}
					{#if secondary}
						<Button href={secondary.href} size="lg" variant={secondary.variant ?? 'outline'}>
							{secondary.label}
						</Button>
					{/if}
				</div>
			{/if}
		</div>
		{#if visual}
			<div class="relative">
				{@render visual()}
			</div>
		{/if}
	</div>
</section>
