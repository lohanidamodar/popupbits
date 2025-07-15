<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Project from '$lib/components/Project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Project: {data.title} - PopupBits</title>
</svelte:head>

<PageHeader title={data.title} subtitle={data.tech} />

<section
	style="max-width:700px; margin:2rem auto; background:#fff; border-radius:1rem; box-shadow:0 2px 12px #0001; padding:2rem;"
>
	<img
		src={data.image}
		alt={data.title}
		style="width:100%; max-width:600px; border-radius:0.75rem; margin-bottom:1rem; background:#f8fafc; display:block; margin-left:auto; margin-right:auto;"
	/>
	<p style="color:#555; font-size:1.1rem; margin-bottom:1rem; text-align:center;">
		{data.description}
	</p>
	<div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; margin-top:1rem;">
		{#if data.github}
			<a
				class="btn"
				href={data.github}
				target="_blank"
				style="background:#222; color:#fff; padding:0.5rem 1.5rem; border-radius:2rem; text-decoration:none; font-weight:500;"
				>GitHub</a
			>
		{/if}
		{#if data.web}
			<a
				class="btn"
				href={data.web}
				target="_blank"
				style="background:#2563eb; color:#fff; padding:0.5rem 1.5rem; border-radius:2rem; text-decoration:none; font-weight:500;"
				>Web</a
			>
		{/if}
		{#if data.playStore}
			<a
				class="btn"
				href={data.playStore}
				target="_blank"
				style="background:#34a853; color:#fff; padding:0.5rem 1.5rem; border-radius:2rem; text-decoration:none; font-weight:500;"
				>Play Store</a
			>
		{/if}
		{#if data.appStore}
			<a
				class="btn"
				href={data.appStore}
				target="_blank"
				style="background:#007aff; color:#fff; padding:0.5rem 1.5rem; border-radius:2rem; text-decoration:none; font-weight:500;"
				>App Store</a
			>
		{/if}
	</div>
</section>
