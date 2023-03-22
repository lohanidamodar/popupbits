<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/data/projects.js';
</script>

<svelte:head>
	<title>Projects - PopupBits</title>
</svelte:head>

<PageHeader title="Projects" />

<div class="container">
	{#each projects as project}
		<Project {project} />
	{/each}
</div>
