<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Check } from '@lucide/svelte';

	let {
		blurb,
		capabilities
	}: { blurb: string; capabilities: readonly string[] } = $props();
</script>

<section class="max-w-6xl mx-auto px-6 py-24 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
	<div>
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-4">
			Consulting
		</p>
		<h2 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
			We also take on selected client work.
		</h2>
		<p class="mt-4 text-lg text-muted-foreground max-w-prose">{blurb}</p>
		<div class="mt-8">
			<Button href="/contact" size="lg">Work with us</Button>
		</div>
	</div>
	<ul class="grid gap-3">
		{#each capabilities as c (c)}
			<li class="flex items-start gap-3">
				<Check class="mt-1 size-5 text-primary shrink-0" />
				<span class="text-base">{c}</span>
			</li>
		{/each}
	</ul>
</section>
