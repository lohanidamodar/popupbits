<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	import { onMount } from 'svelte';

	let { children } = $props();

	// WebMCP tools for in-browser AI agents. The module, and the catalogue it
	// reads, load only in a browser that supports the API.
	onMount(() => {
		if (!('modelContext' in document) && !('modelContext' in navigator)) return;
		let cleanup: (() => void) | undefined;
		import('$lib/webmcp.js').then((m) => (cleanup = m.registerWebMcpTools()));
		return () => cleanup?.();
	});
</script>

<ModeWatcher />
<Toaster richColors closeButton />

<div class="arch-utility theme-popupbits min-h-dvh flex flex-col">
	<SiteNav />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<SiteFooter />
</div>
