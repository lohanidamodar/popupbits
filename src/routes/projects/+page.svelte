<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import projects from '$lib/data/projects.js';
	import companyData from '$lib/data/company.js';
</script>

<svelte:head>
	<title>Projects - {companyData.name}</title>
	<meta
		name="description"
		content="Explore our portfolio of digital transformation projects. See how we've helped businesses build sustainable, secure, and scalable systems."
	/>
</svelte:head>

<PageHeader title="Our Projects" />

<section class="section">
	<div class="container">
		<div class="section-header mb-4 text-center">
			<p class="section-subtitle">
				Explore our portfolio of successful digital transformation projects. From automated business
				processes to scalable cloud systems, we've helped organizations build sustainable technology
				solutions that drive growth.
			</p>
		</div>

		<div class="projects-grid grid-auto-fit grid">
			{#each projects as project}
				<div class="project-card card">
					<div class="project-image-container">
						<img src={project.image} alt={project.title} class="project-image" />
						<div class="project-overlay">
							<div class="project-links">
								{#if project.web}
									<a href={project.web} target="_blank" class="project-link-btn"> 🌐 Live Demo </a>
								{/if}
								{#if project.github}
									<a href={project.github} target="_blank" class="project-link-btn"> 📦 GitHub </a>
								{/if}
								{#if project.playStore}
									<a href={project.playStore} target="_blank" class="project-link-btn">
										📱 Play Store
									</a>
								{/if}
								{#if project.appStore}
									<a href={project.appStore} target="_blank" class="project-link-btn">
										🍎 App Store
									</a>
								{/if}
							</div>
						</div>
					</div>

					<div class="project-content">
						<h3 class="project-title text-primary">{project.title}</h3>
						<div class="project-tech">{project.tech}</div>
						<p class="project-description">{project.description}</p>
						<a href={'/projects/' + project.slug} class="btn btn-secondary"> View Details </a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="section section-gray">
	<div class="container">
		<div class="cta-card card text-center">
			<h2>Have a Project in Mind?</h2>
			<p class="mb-3">
				Let's discuss your ideas and see how we can bring them to life. We'd love to help you create
				something amazing.
			</p>
			<div class="cta-actions">
				<a href="/contact" class="btn btn-primary btn-lg"> Start Your Project </a>
				<a href="/about" class="btn btn-secondary btn-lg"> Learn More About Us </a>
			</div>
		</div>
	</div>
</section>

<style>
	.section-header {
		max-width: 700px;
		margin: 0 auto;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.projects-grid {
		margin-top: 3rem;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-5px);
	}

	.project-image-container {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-lg);
		margin-bottom: 1.5rem;
	}

	.project-image {
		width: 100%;
		height: 250px;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.project-card:hover .project-image {
		transform: scale(1.05);
	}

	.project-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .project-overlay {
		opacity: 1;
	}

	.project-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.project-link-btn {
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border: 2px solid white;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 600;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.project-link-btn:hover {
		background: white;
		color: var(--text-primary);
	}

	.project-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.project-title {
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
	}

	.project-tech {
		color: var(--text-muted);
		font-size: 0.875rem;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	.project-description {
		flex-grow: 1;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.cta-card {
		background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-light));
		color: white;
		padding: 4rem 2rem;
	}

	.cta-card h2 {
		color: white;
		margin-bottom: 1rem;
	}

	.cta-card p {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.125rem;
	}

	.cta-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.project-image {
			height: 200px;
		}

		.project-links {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.project-link-btn {
			font-size: 0.75rem;
			padding: 0.375rem 0.75rem;
		}

		.cta-card {
			padding: 3rem 1.5rem;
		}

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}
	}

	@media (max-width: 480px) {
		.project-image {
			height: 180px;
		}

		.project-links {
			flex-direction: column;
		}
	}
</style>
