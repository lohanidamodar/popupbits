<script lang="ts">
	import type { CompanyStat } from '$lib/data/company.js';

	let { stats }: { stats: readonly CompanyStat[] } = $props();
</script>

<section class="bg-muted/40 border-y border-border">
	<div class="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
		{#each stats as s (s.label)}
			<div>
				<div class="font-display text-4xl md:text-5xl font-extrabold text-primary">
					{s.value}
				</div>
				<div class="mt-1 font-semibold">{s.label}</div>
				<div class="text-sm text-muted-foreground">{s.description}</div>
			</div>
		{/each}
	</div>
</section>
