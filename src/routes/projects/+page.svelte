<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/data/projects.js';

	let filteredProjects = projects;
	let searchTerm = '';
	let selectedCategory = 'all';

	// Get unique categories
	const categories = ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))];

	function filterProjects() {
		filteredProjects = projects.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}

	$: {
		searchTerm;
		selectedCategory;
		filterProjects();
	}
</script>

<svelte:head>
	<title>Projects - PopupBits</title>
	<meta
		name="description"
		content="Explore our portfolio of successful digital transformation projects and solutions."
	/>
</svelte:head>

<PageHeader
	title="Our Projects"
	subtitle="Explore our portfolio of successful digital transformation projects and solutions that have helped businesses grow and innovate."
/>

<!-- Filters Section -->
<section class="section">
	<div class="container">
		<div class="filters-container mb-8">
			<div class="search-filter">
				<input
					type="text"
					placeholder="Search projects..."
					bind:value={searchTerm}
					class="search-input"
				/>
			</div>
			<div class="category-filters">
				{#each categories as category}
					<button
						class="filter-btn {selectedCategory === category ? 'active' : ''}"
						on:click={() => (selectedCategory = category)}
					>
						{category === 'all' ? 'All Projects' : category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Projects Grid -->
		<div class="projects-grid">
			{#each filteredProjects as project}
				<Project {project} />
			{:else}
				<div class="no-projects">
					<h3>No projects found</h3>
					<p>Try adjusting your search or filter criteria.</p>
				</div>
			{/each}
		</div>

		<!-- Stats -->
		<div class="projects-stats mt-12">
			<div class="grid grid-cols-3 text-center">
				<div class="stat">
					<div class="stat-number">{projects.length}</div>
					<div class="stat-label">Total Projects</div>
				</div>
				<div class="stat">
					<div class="stat-number">{categories.length - 1}</div>
					<div class="stat-label">Categories</div>
				</div>
				<div class="stat">
					<div class="stat-number">{filteredProjects.length}</div>
					<div class="stat-label">Showing</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.filters-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.search-input {
		width: 100%;
		max-width: 400px;
		padding: 0.75rem 1rem;
		border: 2px solid var(--gray-200);
		border-radius: var(--radius-md);
		font-size: 1rem;
		transition: border-color var(--transition-normal);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary-500);
	}

	.category-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-btn {
		padding: 0.5rem 1rem;
		border: 2px solid var(--gray-200);
		background: var(--white);
		color: var(--text-primary);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-normal);
		text-transform: capitalize;
	}

	.filter-btn:hover {
		border-color: var(--primary-500);
		color: var(--primary-500);
	}

	.filter-btn.active {
		background: var(--primary-500);
		border-color: var(--primary-500);
		color: var(--white);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}

	.no-projects {
		grid-column: 1 / -1;
		text-align: center;
		padding: 3rem;
		color: var(--text-secondary);
	}

	.no-projects h3 {
		margin-bottom: 0.5rem;
		color: var(--text-primary);
	}

	.projects-stats {
		padding: 2rem;
		background: var(--gray-50);
		border-radius: var(--radius-lg);
	}

	.stat {
		padding: 1rem;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-600);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (min-width: 768px) {
		.filters-container {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.search-filter {
			flex: 1;
			max-width: 400px;
		}

		.category-filters {
			flex-shrink: 0;
		}
	}
</style>
