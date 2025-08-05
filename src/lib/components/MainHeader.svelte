<script>
	import { page } from '$app/stores';
	import companyData from '$lib/data/company.js';

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$: currentPath = $page.url.pathname;
</script>

<nav class="nav">
	<div class="nav-container container">
		<a href="/" class="logo" on:click={closeMobileMenu}>
			<span class="logo-text">{companyData.name}</span>
			<div class="logo-accent"></div>
		</a>

		<!-- Desktop Menu -->
		<ul class="nav-menu desktop-menu">
			<li>
				<a href="/" class="nav-link {currentPath === '/' ? 'active' : ''}">
					<span>Home</span>
				</a>
			</li>
			<li>
				<a href="/about" class="nav-link {currentPath === '/about' ? 'active' : ''}">
					<span>About</span>
				</a>
			</li>
			<li>
				<a href="/projects" class="nav-link {currentPath === '/projects' ? 'active' : ''}">
					<span>Projects</span>
				</a>
			</li>
			<li>
				<a href="/contact" class="nav-link {currentPath === '/contact' ? 'active' : ''}">
					<span>Contact</span>
				</a>
			</li>
		</ul>

		<!-- Mobile Menu Button -->
		<button class="mobile-menu-btn" on:click={toggleMobileMenu} aria-label="Toggle menu">
			<span class="hamburger {mobileMenuOpen ? 'open' : ''}">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu">
			<ul class="mobile-nav-menu">
				<li>
					<a
						href="/"
						class="mobile-nav-link {currentPath === '/' ? 'active' : ''}"
						on:click={closeMobileMenu}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/about"
						class="mobile-nav-link {currentPath === '/about' ? 'active' : ''}"
						on:click={closeMobileMenu}
					>
						About
					</a>
				</li>
				<li>
					<a
						href="/projects"
						class="mobile-nav-link {currentPath === '/projects' ? 'active' : ''}"
						on:click={closeMobileMenu}
					>
						Projects
					</a>
				</li>
				<li>
					<a
						href="/contact"
						class="mobile-nav-link {currentPath === '/contact' ? 'active' : ''}"
						on:click={closeMobileMenu}
					>
						Contact
					</a>
				</li>
			</ul>
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 1000;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(226, 232, 240, 0.8);
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		min-height: 76px;
	}

	.logo {
		text-decoration: none;
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: transform 0.2s ease;
	}

	.logo:hover {
		transform: translateY(-1px);
	}

	.logo-text {
		font-size: 1.75rem;
		font-weight: 800;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		letter-spacing: -0.5px;
	}

	.logo-accent {
		width: 6px;
		height: 6px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		border-radius: 50%;
	}

	.desktop-menu {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 1rem;
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-weight: 600;
		padding: 0.75rem 1.25rem;
		position: relative;
		transition: all 0.3s ease;
		border-radius: 12px;
		font-size: 0.95rem;
	}

	.nav-link span {
		position: relative;
		z-index: 2;
	}

	.nav-link:hover {
		color: var(--primary-blue);
		background: rgba(59, 130, 246, 0.08);
		transform: translateY(-1px);
	}

	.nav-link.active {
		color: var(--primary-blue);
		background: rgba(59, 130, 246, 0.1);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.nav-link.active::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 20px;
		height: 2px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		border-radius: 1px;
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.75rem;
		border-radius: 12px;
		transition: background 0.2s ease;
	}

	.mobile-menu-btn:hover {
		background: rgba(59, 130, 246, 0.08);
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		width: 24px;
		height: 18px;
		position: relative;
	}

	.hamburger span {
		display: block;
		height: 2px;
		width: 100%;
		background: var(--text-primary);
		border-radius: 1px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: absolute;
	}

	.hamburger span:nth-child(1) {
		top: 0;
	}

	.hamburger span:nth-child(2) {
		top: 50%;
		transform: translateY(-50%);
	}

	.hamburger span:nth-child(3) {
		bottom: 0;
	}

	.hamburger.open span:nth-child(1) {
		transform: rotate(45deg);
		top: 50%;
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: rotate(-45deg);
		bottom: 50%;
	}

	.mobile-menu {
		display: none;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		border-top: 1px solid rgba(226, 232, 240, 0.8);
		padding: 1.5rem 0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.mobile-nav-menu {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.mobile-nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-weight: 600;
		padding: 1rem 1.5rem;
		display: block;
		border-radius: 12px;
		transition: all 0.3s ease;
		position: relative;
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: var(--primary-blue);
		background: rgba(59, 130, 246, 0.1);
		transform: translateX(8px);
	}

	.mobile-nav-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 20px;
		background: linear-gradient(180deg, #3b82f6, #8b5cf6);
		border-radius: 0 2px 2px 0;
	}

	@media (max-width: 768px) {
		.desktop-menu {
			display: none;
		}

		.mobile-menu-btn {
			display: block;
		}

		.mobile-menu {
			display: block;
		}

		.nav-container {
			min-height: 70px;
		}

		.logo-text {
			font-size: 1.5rem;
		}
	}
</style>
