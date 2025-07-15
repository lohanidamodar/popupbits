<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/data/projects.js';
</script>

<svelte:head>
	<title>Projects - PopupBits</title>
</svelte:head>

<PageHeader title="Projects" />

<section style="max-width:1200px; margin:2rem auto;">
	<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:2rem;">
		{#each projects as project}
			<div
				style="background:#fff; border-radius:1rem; box-shadow:0 2px 12px #0001; padding:2rem; display:flex; flex-direction:column; align-items:center;"
			>
				<img
					src={project.image}
					alt={project.title}
					style="width:100%; max-width:320px; border-radius:0.75rem; margin-bottom:1rem; background:#f8fafc;"
				/>
				<h3 style="font-size:1.25rem; font-weight:700; color:#2563eb; margin-bottom:0.5rem;">
					{project.title}
				</h3>
				<div style="color:#555; margin-bottom:0.5rem;">{project.tech}</div>
				<p style="color:#666; font-size:1rem; margin-bottom:1rem; text-align:center;">
					{project.description}
				</p>
				<a
					href={'/projects/' + project.slug}
					style="color:#2563eb; text-decoration:underline; font-weight:500;">View Project</a
				>
			</div>
		{/each}
	</div>
</section>
