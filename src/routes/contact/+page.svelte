<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import companyData from '$lib/data/company.js';
</script>

<svelte:head>
	<title>Contact - {companyData.name}</title>
	<meta
		name="description"
		content="Get in touch with {companyData.name}. We'd love to discuss your project and help you achieve your digital goals."
	/>
</svelte:head>

<PageHeader title="Contact Us" />

<section class="section">
	<div class="container">
		<div class="contact-grid grid grid-cols-2">
			<!-- Contact Information -->
			<div class="contact-info">
				<div class="contact-card card">
					<h2 class="contact-title">{companyData.contact.company}</h2>

					<div class="contact-item">
						<h4>📍 Address</h4>
						<p>{companyData.contact.address}</p>
					</div>

					<div class="contact-item">
						<h4>📞 Phone</h4>
						<p>
							<a href="tel:{companyData.contact.phone}" class="contact-link">
								{companyData.contact.phone}
							</a>
						</p>
					</div>

					<div class="contact-item">
						<h4>✉️ Email</h4>
						<p>
							<a href="mailto:{companyData.contact.email}" class="contact-link">
								{companyData.contact.email}
							</a>
						</p>
					</div>

					<div class="contact-item">
						<h4>🌐 Follow Us</h4>
						<div class="social-links">
							<a href={companyData.social.github} target="_blank" class="social-link"> GitHub </a>
							<a href={companyData.social.youtube} target="_blank" class="social-link"> YouTube </a>
							<a href={companyData.social.email} class="social-link"> Email </a>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="contact-form-section">
				<div class="contact-card card">
					<h3>Start Your Digital Transformation</h3>
					<p class="text-secondary mb-3">
						Ready to transform your business with sustainable digital solutions? Fill out the form
						below and we'll get back to you within 24 hours to discuss your transformation needs.
					</p>

					<form class="contact-form" method="POST" action="mailto:{companyData.contact.email}">
						<div class="form-group">
							<label for="name">Name *</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								class="form-input"
								placeholder="Your full name"
							/>
						</div>

						<div class="form-group">
							<label for="email">Email *</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								class="form-input"
								placeholder="your.email@example.com"
							/>
						</div>

						<div class="form-group">
							<label for="phone">Phone</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								class="form-input"
								placeholder="Your phone number"
							/>
						</div>

						<div class="form-group">
							<label for="project-type">Transformation Area</label>
							<select id="project-type" name="project-type" class="form-input">
								<option value="">Select transformation area</option>
								<option value="digital-transformation">Digital Transformation</option>
								<option value="process-automation">Business Process Automation</option>
								<option value="sustainable-systems">Sustainable Tech Systems</option>
								<option value="security-solutions">Security & Compliance</option>
								<option value="scalable-architecture">Scalable Architecture</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div class="form-group">
							<label for="budget">Budget Range</label>
							<select id="budget" name="budget" class="form-input">
								<option value="">Select budget range</option>
								<option value="under-25k">Under NPR 25,000</option>
								<option value="25k-50k">NPR 25,000 - 50,000</option>
								<option value="50k-100k">NPR 50,000 - 1,00,000</option>
								<option value="100k-plus">NPR 1,00,000+</option>
							</select>
						</div>

						<div class="form-group">
							<label for="message">Transformation Goals *</label>
							<textarea
								id="message"
								name="message"
								required
								class="form-textarea"
								rows="5"
								placeholder="Tell us about your business transformation goals, current challenges, and how we can help you build sustainable digital systems..."
							></textarea>
						</div>

						<button type="submit" class="btn btn-primary btn-lg form-submit">
							Start Transformation Discussion
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Why Choose Us Section -->
<section class="section section-gray">
	<div class="container">
		<div class="section-header mb-4 text-center">
			<h2>Why Choose {companyData.name}?</h2>
		</div>
		<div class="grid grid-cols-3">
			<div class="feature-card card text-center">
				<div class="feature-icon">🌱</div>
				<h4>Sustainable Solutions</h4>
				<p>Environmentally conscious technology choices for long-term sustainability</p>
			</div>
			<div class="feature-card card text-center">
				<div class="feature-icon">�</div>
				<h4>Security First</h4>
				<p>Advanced security measures and data protection in every solution</p>
			</div>
			<div class="feature-card card text-center">
				<div class="feature-icon">📈</div>
				<h4>Scalable Growth</h4>
				<p>Systems designed to grow with your business transformation needs</p>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-grid {
		max-width: 1000px;
		margin: 0 auto;
		align-items: start;
	}

	.contact-card {
		height: 100%;
	}

	.contact-title {
		color: var(--primary-blue);
		margin-bottom: 2rem;
		font-size: 1.5rem;
	}

	.contact-item {
		margin-bottom: 2rem;
	}

	.contact-item h4 {
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		font-size: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.contact-item p {
		color: var(--text-secondary);
		margin: 0;
	}

	.contact-link {
		color: var(--primary-blue);
		text-decoration: none;
		font-weight: 500;
	}

	.contact-link:hover {
		text-decoration: underline;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.social-link {
		color: var(--primary-blue);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border: 1px solid var(--primary-blue);
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.social-link:hover {
		background: var(--primary-blue);
		color: white;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: var(--text-primary);
	}

	.form-input,
	.form-textarea {
		padding: 0.75rem;
		border: 2px solid var(--border-color);
		border-radius: var(--radius-md);
		font-size: 1rem;
		transition: border-color 0.2s ease;
		background: white;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: var(--primary-blue);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
	}

	.form-submit {
		width: 100%;
		margin-top: 1rem;
	}

	.feature-card {
		padding: 2rem 1rem;
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.feature-card h4 {
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.section-header {
		max-width: 600px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.social-links {
			flex-direction: column;
		}

		.social-link {
			text-align: center;
		}

		.feature-card {
			padding: 1.5rem 1rem;
		}
	}
</style>
