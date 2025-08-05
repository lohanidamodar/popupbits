<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import companyData from '$lib/data/company.js';
</script>

<svelte:head>
	<title>About - {companyData.name}</title>
	<meta name="description" content={companyData.description} />
</svelte:head>

<PageHeader title="About Us" />

<section class="section">
	<div class="container">
		<div class="about-content">
			<div class="about-text">
				<blockquote class="quote">
					{companyData.tagline}
				</blockquote>
				<p class="lead">
					{companyData.description}
				</p>
				<p>
					We are a team of passionate developers and designers who believe in the power of
					technology to transform businesses. Our mission is to help organizations leverage digital
					solutions to reach their full potential and connect better with their customers.
				</p>
				<p>
					With over {companyData.stats.experience} of combined experience in web and mobile development,
					we have successfully delivered {companyData.stats.projectsCompleted} projects to satisfied
					clients. We specialize in modern technologies and frameworks that ensure your digital solutions
					are scalable, maintainable, and future-proof.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="section section-gray">
	<div class="container">
		<div class="section-header mb-4 text-center">
			<h2>Our Impact</h2>
			<p class="section-subtitle">Numbers that showcase our commitment to excellence</p>
		</div>
		<div class="grid grid-cols-3">
			<StatCard
				stat={companyData.stats.experience}
				label="Years of Experience"
				description="In web and mobile development"
			/>
			<StatCard
				stat={companyData.stats.projectsCompleted}
				label="Projects Delivered"
				description="Successfully completed projects"
			/>
			<StatCard
				stat={companyData.stats.clientsSatisfied}
				label="Happy Clients"
				description="Satisfied with our services"
			/>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="grid grid-cols-2 gap-4">
			<div class="value-card card">
				<h3>🎯 Our Mission</h3>
				<p>
					To empower businesses with cutting-edge digital solutions that drive growth, improve
					efficiency, and create meaningful connections with their customers.
				</p>
			</div>
			<div class="value-card card">
				<h3>🚀 Our Vision</h3>
				<p>
					To become the leading digital transformation partner for businesses in Nepal and beyond,
					known for our innovation, quality, and customer-centric approach.
				</p>
			</div>
			<div class="value-card card">
				<h3>💎 Our Values</h3>
				<ul>
					<li>Quality first in everything we do</li>
					<li>Transparent communication</li>
					<li>Continuous learning and improvement</li>
					<li>Customer success is our success</li>
				</ul>
			</div>
			<div class="value-card card">
				<h3>🛠️ Our Approach</h3>
				<ul>
					<li>User-centered design thinking</li>
					<li>Agile development methodology</li>
					<li>Modern technology stack</li>
					<li>Comprehensive testing and QA</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="section section-gray">
	<div class="container">
		<div class="cta-card card text-center">
			<h2>Ready to Work Together?</h2>
			<p class="mb-3">
				Let's discuss your project and see how we can help transform your business digitally.
			</p>
			<a href="/contact" class="btn btn-primary btn-lg"> Get In Touch </a>
		</div>
	</div>
</section>

<style>
	.about-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.quote {
		font-size: 1.5rem;
		color: var(--primary-blue);
		font-weight: 600;
		margin-bottom: 2rem;
		border-left: 4px solid var(--primary-blue);
		padding-left: 2rem;
		font-style: italic;
	}

	.lead {
		font-size: 1.25rem;
		color: var(--text-primary);
		font-weight: 500;
		margin-bottom: 2rem;
	}

	.value-card {
		height: 100%;
	}

	.value-card h3 {
		color: var(--text-primary);
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.value-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.value-card li {
		color: var(--text-secondary);
		padding: 0.25rem 0;
		position: relative;
		padding-left: 1.5rem;
	}

	.value-card li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary-blue);
		font-weight: bold;
	}

	.section-header {
		max-width: 600px;
		margin: 0 auto;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0;
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

	@media (max-width: 768px) {
		.quote {
			font-size: 1.25rem;
			padding-left: 1rem;
		}

		.lead {
			font-size: 1.125rem;
		}

		.cta-card {
			padding: 3rem 1.5rem;
		}
	}
</style>
