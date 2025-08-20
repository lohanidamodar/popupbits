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
					We are a team of passionate developers and digital transformation specialists who believe
					in the power of sustainable technology to revolutionize business operations. Our mission
					is to help organizations embrace digital transformation through secure, scalable, and
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
	</div>
</section>

<section class="section section-gray">
	<div class="container">
		<div class="section-header mb-12 text-center">
			<h2>Our Impact</h2>
			<p class="section-subtitle">Numbers that showcase our commitment to excellence</p>
		</div>
		<div class="grid grid-cols-3">
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
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="grid grid-cols-2">
			<div class="value-card card">
				<h3>🎯 Our Mission</h3>
				<p>
					To empower businesses with sustainable digital transformation solutions that drive
					operational efficiency, reduce environmental impact, and create secure, scalable systems
					for long-term growth.
				</p>
			</div>
			<div class="value-card card">
				<h3>🚀 Our Vision</h3>
				<p>
					To become the leading digital transformation partner for businesses seeking sustainable
					technology solutions, known for our commitment to security, scalability, and environmental
					responsibility.
				</p>
			</div>
			<div class="value-card card">
				<h3>💎 Our Values</h3>
				<ul>
					<li>Sustainable technology practices</li>
					<li>Security and data protection first</li>
					<li>Transparent communication and process</li>
					<li>Long-term partnership approach</li>
				</ul>
			</div>
			<div class="value-card card">
				<h3>🛠️ Our Approach</h3>
				<ul>
					<li>Sustainability-first design thinking</li>
					<li>Security-driven development</li>
					<li>Scalable architecture planning</li>
					<li>Continuous monitoring and optimization</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="section section-gray">
	<div class="container">
		<div class="cta-card card text-center">
			<h2>Ready to Transform Your Business?</h2>
			<p class="mb-3">
				Let's discuss how we can help you build secure, scalable, and sustainable digital systems
				that drive lasting business transformation.
			</p>
			<a href="/contact" class="btn btn-primary btn-lg"> Start Your Digital Journey </a>
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
