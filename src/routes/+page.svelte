<script lang="ts">
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import company from '$lib/data/company.js';
	import services from '$lib/data/services.js';
	import technologies from '$lib/data/technologies.js';
	import projects from '$lib/data/projects.js';
</script>

<svelte:head>
	<title>PopupBits - Your Vision, Our Code</title>
	<meta
		name="description"
		content="Expert web development and software solutions. Transforming ideas into digital reality with modern technologies and clean code."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="section-lg"
	style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"
>
	<div class="container">
		<div class="text-center">
			<h1 class="mb-4" style="color: white; font-size: 3rem; font-weight: 800;">
				{company.tagline}
			</h1>
			<p
				class="mb-4"
				style="font-size: 1.25rem; color: rgba(255,255,255,0.9); max-width: 700px; margin: 0 auto 2rem;"
			>
				We help businesses transform digitally with secure, scalable, and sustainable tech systems.
				From process automation to legacy modernization, we build cost-effective solutions that
				drive growth and efficiency.
			</p>
			<div class="flex-center gap-3" style="flex-wrap: wrap; justify-content: center;">
				<a
					href="/contact"
					class="btn btn-lg"
					style="background: white; color: #667eea; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
				>
					Get Started
				</a>
				<a
					href="/projects"
					class="btn btn-lg"
					style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; text-decoration: none;"
				>
					View Our Work
				</a>
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
			<h2 class="mb-2">Digital Transformation Services</h2>
			<p class="text-secondary" style="max-width: 700px; margin: 0 auto;">
				We help businesses go digital by building secure, scalable, and sustainable tech systems
				that transform processes, reduce costs, and drive long-term growth.
			</p>
		</div>
		<div class="grid-auto-fit grid">
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
		<div class="mb-4 text-center">
			<h2 class="mb-2">Featured Projects</h2>
			<p class="text-secondary">
				Some of our recent work that showcases our expertise and creativity.
			</p>
		</div>
		<div class="grid-auto-fit grid">
			{#each projects.slice(0, 3) as project}
				<div class="card">
					<img
						src={project.image}
						alt={project.title}
						style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;"
					/>
					<h4 class="mb-2">{project.title}</h4>
					<p class="text-secondary mb-3">{project.description}</p>
					<div class="flex flex-wrap gap-1" style="margin-bottom: 1rem;">
						<span
							style="background: var(--light-gray); color: var(--text-secondary); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;"
						>
							{project.tech}
						</span>
					</div>
					<a
						href={project.web || project.playStore || project.github || `/projects/${project.slug}`}
						target="_blank"
						class="btn btn-primary"
					>
						View Project
					</a>
				</div>
			{/each}
		</div>
		<div class="mt-4 text-center">
			<a href="/projects" class="btn btn-secondary"> View All Projects </a>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="section" style="background: var(--primary-blue); color: white;">
	<div class="container text-center">
		<h2 class="mb-2" style="color: white;">Ready to Transform Your Business?</h2>
		<p class="mb-4" style="color: rgba(255,255,255,0.9); max-width: 700px; margin: 0 auto 2rem;">
			Let's discuss how we can help you build secure, scalable, and sustainable tech systems that
			drive digital transformation and business growth. Get a free consultation today.
		</p>
		<a
			href="/contact"
			class="btn btn-lg"
			style="background: white; color: var(--primary-blue); padding: 1rem 2rem;"
		>
			Start Your Digital Transformation
		</a>
	</div>
</section>
