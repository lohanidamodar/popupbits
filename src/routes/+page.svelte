<script lang="ts">
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import PricingCard from '$lib/components/PricingCard.svelte';
	import company from '$lib/data/company.js';
	import services from '$lib/data/services.js';
	import technologies from '$lib/data/technologies.js';
	import projects from '$lib/data/projects.js';
	import pricing from '$lib/data/pricing.js';
</script>

<svelte:head>
	<title>{company.name} - {company.tagline}</title>
	<meta name="description" content={company.description} />
</svelte:head>

<!-- Hero Section -->
<section class="section-lg hero-section">
	<div class="container">
		<div class="text-center">
			<h1 class="mb-6">{company.tagline}</h1>
			<p class="mb-8">{company.description}</p>
			<div class="flex-center gap-4">
				<a href="/contact" class="btn btn-lg btn-light"> Let's get started </a>
				<a href="/about" class="btn btn-lg btn-secondary"> Learn More </a>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="section section-gray">
	<div class="container">
		<div class="grid grid-cols-3">
			<StatCard
				stat={company.stats.experience}
				label="Years Experience"
				description="Transforming businesses digitally"
			/>
			<StatCard
				stat={company.stats.projectsCompleted}
				label="Projects Completed"
				description="Successful digital solutions"
			/>
			<StatCard
				stat={company.stats.clientsSatisfied}
				label="Clients Satisfied"
				description="Happy business partners"
			/>
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="section">
	<div class="container">
		<div class="section-header mb-12">
			<h2 class="mb-4">How We Can Help Your Business</h2>
			<p class="section-subtitle">
				We provide comprehensive consulting services to help your business systematize processes,
				build scalable solutions, and integrate technology effectively for measurable improvements.
			</p>
		</div>
		<div class="grid-auto-fit grid">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</section>

<!-- Technologies Section -->
<section class="section section-gray">
	<div class="container">
		<div class="section-header mb-12">
			<h2 class="mb-4">Technologies We Work With</h2>
			<p class="section-subtitle">
				Modern, reliable, and scalable technology stack for sustainable business solutions.
			</p>
		</div>
		<div class="grid grid-cols-4">
			{#each technologies as tech}
				<div class="tech-card card text-center">
					<div class="tech-icon mb-4">
						<img src={tech.icon} alt={tech.name} width="48" height="48" />
					</div>
					<h4 class="mb-2">{tech.name}</h4>
					<p class="text-secondary">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="section">
	<div class="container">
		<div class="section-header mb-12">
			<h2 class="mb-4">Featured Projects</h2>
			<p class="section-subtitle">
				Explore some of our successful digital transformation projects and solutions.
			</p>
		</div>
		<div class="grid-auto-fit grid">
			{#each projects.slice(0, 3) as project}
				<div class="project-card card">
					<div class="project-image mb-6">
						<img src={project.image} alt={project.title} />
					</div>
					<div class="project-content">
						<h3 class="mb-3">{project.title}</h3>
						<p class="text-secondary mb-4">{project.description}</p>
						<div class="project-tech mb-4">
							<span class="tech-tag">{project.tech}</span>
						</div>
						<a href="/projects/{project.slug}" class="btn btn-primary">View Project</a>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/projects" class="btn btn-lg btn-secondary">View All Projects</a>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="section section-gray">
	<div class="container">
		<div class="section-header mb-12">
			<h2 class="mb-4">Consultation Packages</h2>
			<p class="section-subtitle">
				Flexible consulting packages designed to meet your business transformation needs.
			</p>
		</div>
		<div class="grid grid-cols-3">
			{#each pricing as plan}
				<PricingCard {plan} />
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="section hero-section">
	<div class="container text-center">
		<h2 class="mb-4">Ready to Transform Your Business?</h2>
		<p class="mb-8">
			Let's discuss how we can help you build secure, scalable, and sustainable tech systems that
			drive digital transformation and business growth. Get a free consultation today.
		</p>
		<a href="/contact" class="btn btn-xl btn-light"> Start Your Digital Transformation </a>
	</div>
</section>

<style>
	.tech-card {
		padding: var(--space-6);
	}

	.tech-icon img {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.project-card {
		overflow: hidden;
	}

	.project-image {
		aspect-ratio: 16/9;
		overflow: hidden;
		border-radius: var(--radius-lg);
		background-color: var(--gray-100);
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-normal);
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.tech-tag {
		display: inline-block;
		background-color: var(--gray-100);
		color: var(--text-secondary);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		font-weight: 600;
	}
</style>
