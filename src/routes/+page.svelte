<script lang="ts">
	import { SEO, Hero, Section, SectionHeader, Button, Card, projects } from '$lib';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import PricingCard from '$lib/components/PricingCard.svelte';
	import company from '$lib/data/company.js';
	import services from '$lib/data/services.js';
	import technologies from '$lib/data/technologies.js';
	import pricing from '$lib/data/pricing.js';

	const seoData = {
		title: `${company.name} - ${company.tagline}`,
		description: company.description,
		keywords:
			'business consulting, digital transformation, app development, flutter, react, firebase',
		type: 'website'
	};
</script>

<SEO data={seoData} />

<!-- Hero Section -->
<Hero variant="gradient" size="lg" title={company.tagline} subtitle={company.description}>
	{#snippet cta()}
		<div class="flex flex-wrap justify-center gap-4">
			<Button href="/contact" variant="light" size="lg">Let's get started</Button>
			<Button href="/about" variant="secondary" size="lg">Learn More</Button>
		</div>
	{/snippet}
</Hero>

<!-- Stats Section -->
<Section variant="gray">
	<div class="grid grid-cols-3 gap-8">
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
</Section>

<!-- Services Section -->
<Section>
	<SectionHeader
		title="How We Can Help Your Business"
		subtitle="We provide comprehensive consulting services to help your business systematize processes, build scalable solutions, and integrate technology effectively for measurable improvements."
	/>

	<div class="mt-12 grid grid-cols-3 gap-8">
		{#each services as service}
			<ServiceCard {service} />
		{/each}
	</div>
</Section>

<!-- Technologies Section -->
<Section variant="gray">
	<SectionHeader
		title="Technologies We Work With"
		subtitle="Modern, reliable, and scalable technology stack for sustainable business solutions."
	/>

	<div class="mt-12 grid grid-cols-4 gap-6">
		{#each technologies as tech}
			<Card variant="compact" class="text-center">
				<div class="tech-icon mb-4">
					<img src={tech.icon} alt={tech.name} width="48" height="48" />
				</div>
				<h4 class="mb-2 text-lg font-semibold">{tech.name}</h4>
				<p class="text-secondary text-sm">{tech.description}</p>
			</Card>
		{/each}
	</div>
</Section>

<!-- Featured Projects Section -->
<Section>
	<SectionHeader
		title="Featured Projects"
		subtitle="Explore some of our successful digital transformation projects and solutions."
	/>

	<div class="mt-12 grid grid-cols-3 gap-8">
		{#each projects.slice(0, 3) as project}
			<Card hover class="project-card">
				<div class="project-image mb-6">
					<img src={project.image} alt={project.title} />
				</div>
				<div class="project-content">
					<h3 class="mb-3 text-xl font-semibold">{project.title}</h3>
					<p class="text-secondary mb-4">{project.description}</p>
					<div class="project-tech mb-4">
						<span class="tech-tag">{project.tech}</span>
					</div>
					<Button href="/projects/{project.slug}" variant="primary" size="sm">View Project</Button>
				</div>
			</Card>
		{/each}
	</div>

	<div class="mt-12 text-center">
		<Button href="/projects" variant="secondary" size="lg">View All Projects</Button>
	</div>
</Section>

<!-- Pricing Section -->
<Section variant="gray">
	<SectionHeader
		title="Consultation Packages"
		subtitle="Flexible consulting packages designed to meet your business transformation needs."
	/>

	<div class="mt-12 grid grid-cols-3 gap-8">
		{#each pricing as plan}
			<PricingCard {plan} />
		{/each}
	</div>
</Section>

<!-- CTA Section -->
<Section variant="dark">
	<div class="text-center">
		<h2 class="mb-6 text-white">Ready to Transform Your Business?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-lg text-white/90">
			Let's discuss how we can help you build secure, scalable, and sustainable tech systems that
			drive digital transformation and business growth. Get a free consultation today.
		</p>
		<Button href="/contact" variant="primary" size="xl">Start Your Digital Transformation</Button>
	</div>
</Section>

<style>
	.tech-icon img {
		width: 48px;
		height: 48px;
		object-fit: contain;
		margin: 0 auto;
	}

	:global(.project-card) {
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

	:global(.project-card:hover) .project-image img {
		transform: scale(1.05);
	}

	.tech-tag {
		display: inline-block;
		background-color: var(--primary-50);
		color: var(--primary-700);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		font-weight: 600;
	}
</style>
