<script lang="ts">
	import '../app.css';
	import MainHeader from '$lib/components/MainHeader.svelte';
	let { children } = $props();
</script>

<MainHeader />
{@render children()}
