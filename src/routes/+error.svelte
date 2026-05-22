<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft, Home } from '@lucide/svelte';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Something went wrong.');

	const heading = $derived(
		status === 404 ? "We can't find that page." : "Something's not quite right."
	);
	const body = $derived(
		status === 404
			? "The link you followed may be broken, or the page may have moved. Try heading back home or browsing our products."
			: message
	);
</script>

<svelte:head>
	<title>{status} — Popup Bits</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="min-h-[70vh] flex items-center">
	<div class="max-w-3xl mx-auto px-6 py-24 text-center">
		<div
			class="font-display text-[clamp(6rem,18vw,11rem)] font-extrabold leading-none tracking-tight text-primary"
			aria-hidden="true"
		>
			{status}
		</div>
		<h1 class="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
			{heading}
		</h1>
		<p class="mt-4 text-lg text-muted-foreground">{body}</p>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
			<Button href="/" size="lg">
				<Home class="size-4" />
				Back home
			</Button>
			<Button href="/products" size="lg" variant="outline">
				<ArrowLeft class="size-4" />
				See our products
			</Button>
		</div>

		{#if status !== 404 && message && message !== 'Something went wrong.'}
			<details class="mt-12 text-left max-w-md mx-auto">
				<summary class="text-xs text-muted-foreground cursor-pointer">Technical detail</summary>
				<pre
					class="mt-2 text-xs bg-muted text-muted-foreground p-3 rounded-md overflow-x-auto">{message}</pre>
			</details>
		{/if}
	</div>
</section>
