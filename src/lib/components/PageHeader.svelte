<script lang="ts">
	let {
		eyebrow,
		title,
		subtitle
	}: { eyebrow?: string; title: string; subtitle?: string } = $props();
</script>

<header class="max-w-6xl mx-auto px-6 pt-24 pb-12">
	{#if eyebrow}
		<p class="t-eyebrow uppercase tracking-widest text-sm font-semibold text-primary mb-3">
			{eyebrow}
		</p>
	{/if}
	<h1 class="font-display text-5xl font-extrabold tracking-tight">{title}</h1>
	{#if subtitle}
		<p class="text-lg text-muted-foreground mt-4 max-w-2xl">{subtitle}</p>
	{/if}
</header>
