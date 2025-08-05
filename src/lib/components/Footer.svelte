<script lang="ts">
	import companyData from '$lib/data/company.js';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-main">
				<div class="footer-brand">
					<h3 class="footer-logo">{companyData.name}</h3>
					<p class="footer-tagline">{companyData.tagline}</p>
					<p class="footer-description">
						{companyData.description}
					</p>
				</div>

				<div class="footer-links">
					<div class="footer-section">
						<h4>Quick Links</h4>
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="/about">About</a></li>
							<li><a href="/projects">Projects</a></li>
							<li><a href="/contact">Contact</a></li>
						</ul>
					</div>

					<div class="footer-section">
						<h4>Services</h4>
						<ul>
							<li>Web Development</li>
							<li>Mobile App Development</li>
							<li>Backend Development</li>
							<li>UI/UX Design</li>
						</ul>
					</div>

					<div class="footer-section">
						<h4>Contact</h4>
						<ul>
							<li>{companyData.contact.address}</li>
							<li>
								<a href="tel:{companyData.contact.phone}">
									{companyData.contact.phone}
								</a>
							</li>
							<li>
								<a href="mailto:{companyData.contact.email}">
									{companyData.contact.email}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="footer-bottom">
				<div class="footer-social">
					<a href={companyData.social.github} target="_blank" aria-label="GitHub"> GitHub </a>
					<a href={companyData.social.youtube} target="_blank" aria-label="YouTube"> YouTube </a>
					<a href={companyData.social.email} aria-label="Email"> Email </a>
				</div>
				<div class="footer-copyright">
					<p>&copy; {currentYear} {companyData.name}. All rights reserved.</p>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--text-primary);
		color: white;
		padding: 3rem 0 1rem;
		margin-top: auto;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.footer-main {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
		align-items: start;
	}

	.footer-brand {
		max-width: 400px;
	}

	.footer-logo {
		color: white;
		font-size: 1.5rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		letter-spacing: -0.5px;
	}

	.footer-tagline {
		color: var(--primary-blue-light);
		font-weight: 600;
		margin-bottom: 1rem;
		font-size: 1.125rem;
	}

	.footer-description {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin: 0;
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.footer-section h4 {
		color: white;
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-section li {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.footer-section a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.footer-section a:hover {
		color: var(--primary-blue-light);
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.footer-social {
		display: flex;
		gap: 1.5rem;
	}

	.footer-social a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.footer-social a:hover {
		color: var(--primary-blue-light);
	}

	.footer-copyright {
		margin: 0;
	}

	.footer-copyright p {
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.footer-main {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-links {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.footer-bottom {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}

		.footer-social {
			order: 2;
		}

		.footer-copyright {
			order: 1;
		}
	}

	@media (max-width: 480px) {
		.footer {
			padding: 2rem 0 1rem;
		}

		.footer-links {
			gap: 1rem;
		}

		.footer-social {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
