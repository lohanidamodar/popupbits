<script lang="ts">
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import company from '$lib/data/company.js';
	import services from '$lib/data/services.js';
	import technologies from '$lib/data/technologies.js';
	import projects from '$lib/data/projects.js';
	import pricing from '$lib/data/pricing.js';
	import PricingCard from '$lib/components/PricingCard.svelte';
</script>

<svelte:head>
	<title>PopupBits - Tech Consultancy for Modern Businesses</title>
	<meta name="description" content={company.description} />
</svelte:head>

<!-- Hero Section -->
<section class="section-lg">
	<div class="container">
		<div class="text-center">
			<h1 class="mb-4">{company.tagline}</h1>
			<p class="mb-4">{company.description}</p>
			<div class="flex-center gap-3">
				<a href="/contact" class="btn btn-lg btn-primary"> Let's get started </a>
				<a href="/about" class="btn btn-lg btn-secondary"> My Approach & Experience </a>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="section section-gray">
	<div class="container">
		<div class="grid grid-cols-3" style="gap: 2rem;">
			<StatCard stat={company.stats.experience} label="Experience" />
			<StatCard stat={company.stats.projectsCompleted} label="Projects Completed" />
			<StatCard stat={company.stats.clientsSatisfied} label="Clients Satisfied" />
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="section">
	<div class="container">
		<div class="mb-4 text-center">
			<h2 class="mb-2">How We Can Help Your Business</h2>
			<p class="text-secondary" style="max-width: 700px; margin: 0 auto;">
				With over 8 years of experience, we provide comprehensive consulting services to help your
				business thrive in the digital age.
			</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each services as service}
				<ServiceCard
					icon={service.icon}
					title={service.title}
					description={service.description}
					features={service.features}
				/>
			{/each}
		</div>
	</div>
</section>

<!-- Technologies Section -->
<section class="section section-gray">
	<div class="container">
		<div class="mb-4 text-center">
			<h2 class="mb-2">Technologies We Use</h2>
			<p class="text-secondary">
				We work with modern, proven technologies to deliver robust solutions.
			</p>
		</div>
		<div class="grid grid-cols-3" style="gap: 2rem; text-align: center;">
			{#each technologies as tech}
				<div class="card" style="padding: 1.5rem; text-align: center;">
					<img
						src={tech.icon}
						alt={tech.name}
						style="width: 48px; height: 48px; margin: 0 auto 1rem;"
					/>
					<h4 class="mb-1">{tech.name}</h4>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="section">
	<div class="container">
		<div class="mb-8 text-center">
			<h2 class="mb-2">Featured Projects</h2>
			<p class="text-secondary">
				Highlighting some of our most impactful and successful projects
			</p>
		</div>

		<div class="space-y-12">
			{#each projects.slice(0, 3) as project, i}
				<div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
					<div class={`md:col-span-2 ${i % 2 !== 0 ? 'md:order-last' : ''}`}>
						<a href={project.web || project.playStore || project.github || `/projects/${project.slug}`} target="_blank">
							<img src={project.image} alt={project.title} class="rounded-lg shadow-lg" />
						</a>
					</div>
					<div class="md:col-span-3">
						<p class="text-sm text-primary-500 font-semibold">{project.category || 'CASE STUDY'}</p>
						<h3 class="text-2xl font-bold mt-2 mb-4">{project.title}</h3>
						<p class="text-secondary mb-4">{project.description}</p>
						<div class="flex flex-wrap gap-2 mb-4">
							{#each project.tags || [] as tag}
								<span
									class="text-sm"
									style="background-color: var(--chip-bg); color: var(--chip-color); padding: 4px 8px; border-radius: 4px;"
									>{tag}</span
								>
							{/each}
						</div>
						<a
							href={project.web || project.playStore || project.github || `/projects/${project.slug}`}
							target="_blank"
							class="btn btn-primary"
						>
							View Project
						</a>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a href="/projects" class="btn btn-secondary"> View All Projects </a>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="section section-gray">
	<div class="container">
		<div class="mb-8 text-center">
			<h2 class="mb-2">For everyone, from startups to enterprises</h2>
			<p class="text-secondary">Affordable pricing plans to suit your needs</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
			{#each pricing as plan}
				<PricingCard plan={plan} />
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="section cta-section">
	<div class="container text-center">
		<h2 class="mb-2">Ready to Transform Your Business?</h2>
		<p class="mb-4">
			Let's work together to build scalable solutions that drive growth and innovation for your
			company.
		</p>
		<a href="/contact" class="btn btn-lg btn-light"> Get Started Today </a>
	</div>
</section>
