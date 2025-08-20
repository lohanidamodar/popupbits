<script lang="ts">
	import { SEO, Section, SectionHeader, Button, Card } from '$lib';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import companyData from '$lib/data/company.js';

	const seoData = {
		title: `About - ${companyData.name}`,
		description: companyData.description,
		keywords: 'about popup bits, digital transformation consulting, flutter development team',
		type: 'website'
	};
</script>

<SEO data={seoData} />

<PageHeader title="About Us" />

<Section>
	<div class="about-content">
		<div class="about-text">
			<blockquote class="quote">
				{companyData.tagline}
			</blockquote>
			<p class="lead">
				{companyData.description}
			</p>
			<p>
				We are a team of passionate developers and digital transformation specialists who believe in
				the power of sustainable technology to revolutionize business operations. Our mission is to
				help organizations embrace digital transformation through secure, scalable, and
				environmentally conscious tech solutions.
			</p>
			<p>
				With over {companyData.stats.experience} of combined experience in digital transformation and
				system automation, we have successfully delivered {companyData.stats.projectsCompleted} projects
				to satisfied clients. We specialize in sustainable technologies and automation frameworks that
				ensure your digital transformation initiatives are scalable, secure, and environmentally responsible.
			</p>
		</div>
	</div>
</Section>

<Section variant="gray">
	<SectionHeader title="Our Impact" subtitle="Numbers that showcase our commitment to excellence" />

	<div class="mt-12 grid grid-cols-3 gap-8">
		<StatCard
			stat={companyData.stats.experience}
			label="Years of Experience"
			description="In digital transformation"
		/>
		<StatCard
			stat={companyData.stats.projectsCompleted}
			label="Digital Solutions Delivered"
			description="Successful transformation projects"
		/>
		<StatCard
			stat={companyData.stats.clientsSatisfied}
			label="Businesses Transformed"
			description="Organizations going digital"
		/>
	</div>
</Section>

<Section>
	<div class="grid grid-cols-2 gap-8">
		<Card class="value-card">
			<h3 class="mb-4 text-xl font-semibold">🎯 Our Mission</h3>
			<p>
				To empower businesses with sustainable digital transformation solutions that drive
				operational efficiency, reduce environmental impact, and create secure, scalable systems for
				long-term growth.
			</p>
		</Card>

		<Card class="value-card">
			<h3 class="mb-4 text-xl font-semibold">🚀 Our Vision</h3>
			<p>
				To become the leading digital transformation partner for businesses seeking sustainable
				technology solutions, known for our commitment to security, scalability, and environmental
				responsibility.
			</p>
		</Card>

		<Card class="value-card">
			<h3 class="mb-4 text-xl font-semibold">💎 Our Values</h3>
			<ul class="value-list">
				<li>Sustainable technology practices</li>
				<li>Security and data protection first</li>
				<li>Transparent communication and process</li>
				<li>Long-term partnership approach</li>
			</ul>
		</Card>

		<Card class="value-card">
			<h3 class="mb-4 text-xl font-semibold">🛠️ Our Approach</h3>
			<ul class="value-list">
				<li>Sustainability-first design thinking</li>
				<li>Security-driven development</li>
				<li>Scalable architecture planning</li>
				<li>Continuous monitoring and optimization</li>
			</ul>
		</Card>
	</div>
</Section>

<Section variant="dark">
	<div class="text-center">
		<h2 class="mb-6 text-white">Ready to Transform Your Business?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-lg text-white/90">
			Let's discuss how we can help you build secure, scalable, and sustainable digital systems that
			drive lasting business transformation.
		</p>
		<Button href="/contact" variant="primary" size="lg">Start Your Digital Journey</Button>
	</div>
</Section>

<style>
	.about-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.quote {
		font-size: clamp(1.25rem, 4vw, 1.5rem);
		color: var(--primary-500);
		font-weight: 600;
		margin-bottom: var(--space-8);
		border-left: 4px solid var(--primary-500);
		padding-left: var(--space-8);
		font-style: italic;
		text-align: left;
	}

	.lead {
		font-size: clamp(1.125rem, 3vw, 1.25rem);
		color: var(--text-primary);
		font-weight: 500;
		margin-bottom: var(--space-8);
		line-height: 1.6;
	}

	:global(.value-card) {
		height: 100%;
	}

	.value-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.value-list li {
		color: var(--text-secondary);
		padding: var(--space-1) 0;
		position: relative;
		padding-left: var(--space-6);
		line-height: 1.6;
	}

	.value-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--primary-500);
		font-weight: bold;
		font-size: 1.1rem;
	}

	@media (max-width: 768px) {
		.quote {
			padding-left: var(--space-4);
		}
	}
</style>
