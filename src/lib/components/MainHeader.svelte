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
			{companyData.name}
		</a>

		<!-- Desktop Menu -->
		<ul class="nav-menu desktop-menu">
			<li>
				<a href="/" class="nav-link {currentPath === '/' ? 'active' : ''}"> Home </a>
			</li>
			<li>
				<a href="/about" class="nav-link {currentPath === '/about' ? 'active' : ''}"> About </a>
			</li>
			<li>
				<a href="/projects" class="nav-link {currentPath === '/projects' ? 'active' : ''}">
					Projects
				</a>
			</li>
			<li>
				<a href="/contact" class="nav-link {currentPath === '/contact' ? 'active' : ''}">
					Contact
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
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-color);
		box-shadow: var(--shadow-sm);
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		min-height: 70px;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--primary-blue);
		text-decoration: none;
		letter-spacing: -0.5px;
	}

	.logo:hover {
		color: var(--primary-blue-dark);
	}

	.desktop-menu {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 0;
		position: relative;
		transition: color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--primary-blue);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--primary-blue);
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: var(--radius-md);
	}

	.mobile-menu-btn:hover {
		background: var(--light-gray);
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
		transition: all 0.3s ease;
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
		background: white;
		border-top: 1px solid var(--border-color);
		padding: 1rem 0;
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
		font-weight: 500;
		padding: 0.75rem 0;
		display: block;
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: var(--primary-blue);
		background: var(--light-gray);
		padding-left: 1rem;
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
	}
</style>
