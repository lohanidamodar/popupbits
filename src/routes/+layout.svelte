<script lang="ts">
	import '../app.css';
	import MainHeader from '$lib/components/MainHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<div class="app">
	<MainHeader />
	<main class="main-content">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex: 1;
	}
</style>
