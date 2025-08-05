<script lang="ts">
	import companyData from '$lib/data/company.js';

	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' }
	];

	const services = [
		'Web Development',
		'Mobile App Development',
		'Backend Development',
		'UI/UX Design',
		'E-commerce Solutions',
		'API Development'
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-main">
				<div class="footer-brand">
					<div class="brand-logo">
						<h3 class="footer-logo">{companyData.name}</h3>
						<div class="logo-accent"></div>
					</div>
					<p class="footer-tagline">{companyData.tagline}</p>
					<p class="footer-description">
						{companyData.description}
					</p>
					<div class="footer-social">
						<a
							href={companyData.social.github}
							target="_blank"
							aria-label="GitHub"
							class="social-link"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
						</a>
						<a
							href={companyData.social.youtube}
							target="_blank"
							aria-label="YouTube"
							class="social-link"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
								/>
							</svg>
						</a>
						<a href={companyData.social.email} aria-label="Email" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"
								/>
							</svg>
						</a>
					</div>
				</div>

				<div class="footer-links">
					<div class="footer-section">
						<h4>Quick Links</h4>
						<ul>
							{#each quickLinks as link}
								<li><a href={link.href}>{link.label}</a></li>
							{/each}
						</ul>
					</div>

					<div class="footer-section">
						<h4>Services</h4>
						<ul>
							{#each services as service}
								<li>{service}</li>
							{/each}
						</ul>
					</div>

					<div class="footer-section">
						<h4>Contact Info</h4>
						<ul>
							<li class="contact-item">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
									/>
								</svg>
								{companyData.contact.address}
							</li>
							<li class="contact-item">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
									/>
								</svg>
								<a href="tel:{companyData.contact.phone}">
									{companyData.contact.phone}
								</a>
							</li>
							<li class="contact-item">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
									/>
								</svg>
								<a href="mailto:{companyData.contact.email}">
									{companyData.contact.email}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="footer-bottom">
				<div class="footer-copyright">
					<p>&copy; {currentYear} {companyData.name}. All rights reserved.</p>
				</div>
				<div class="footer-legal">
					<a href="/privacy-policy">Privacy Policy</a>
					<a href="/terms-of-service">Terms of Service</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
		color: white;
		padding: 4rem 0 2rem;
		margin-top: auto;
		position: relative;
		overflow: hidden;
	}

	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		position: relative;
		z-index: 1;
	}

	.footer-main {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 4rem;
		align-items: start;
	}

	.footer-brand {
		max-width: 400px;
	}

	.brand-logo {
		position: relative;
		margin-bottom: 1rem;
	}

	.footer-logo {
		color: white;
		font-size: 1.75rem;
		font-weight: 800;
		margin: 0;
		letter-spacing: -0.5px;
		background: linear-gradient(135deg, #ffffff 0%, #3b82f6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.logo-accent {
		width: 40px;
		height: 3px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		border-radius: 2px;
		margin-top: 0.5rem;
	}

	.footer-tagline {
		color: #94a3b8;
		font-weight: 600;
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.4;
	}

	.footer-description {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin: 0 0 2rem;
	}

	.footer-social {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
	}

	.social-link:hover {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
		transform: translateY(-2px);
		border-color: rgba(59, 130, 246, 0.3);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
	}

	.footer-section h4 {
		color: white;
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		position: relative;
		padding-bottom: 0.5rem;
	}

	.footer-section h4::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 30px;
		height: 2px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		border-radius: 1px;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-section li {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		line-height: 1.5;
		transition: color 0.2s ease;
	}

	.footer-section a {
		color: inherit;
		text-decoration: none;
		transition: all 0.2s ease;
		position: relative;
	}

	.footer-section a:hover {
		color: #3b82f6;
		padding-left: 0.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.contact-item svg {
		color: #3b82f6;
		flex-shrink: 0;
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

	.footer-copyright p {
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
		font-size: 0.875rem;
	}

	.footer-legal {
		display: flex;
		gap: 2rem;
	}

	.footer-legal a {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s ease;
	}

	.footer-legal a:hover {
		color: #3b82f6;
	}

	@media (max-width: 1024px) {
		.footer-main {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.footer-links {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.footer {
			padding: 3rem 0 1.5rem;
		}

		.footer-links {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-bottom {
			flex-direction: column;
			text-align: center;
			gap: 1.5rem;
		}

		.footer-legal {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.footer-content {
			gap: 2rem;
		}

		.footer-social {
			justify-content: center;
		}

		.footer-legal {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
