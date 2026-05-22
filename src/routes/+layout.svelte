<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
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
