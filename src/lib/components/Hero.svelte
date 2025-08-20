<script lang="ts">
	import type { Snippet } from 'svelte';

	interface HeroButton {
		text: string;
		href: string;
		variant?: 'primary' | 'secondary';
	}

	interface HeroProps {
		title: string;
		subtitle?: string;
		primaryCta?: {
			text: string;
			href: string;
		};
		secondaryCta?: {
			text: string;
			href: string;
		};
		buttons?: HeroButton[];
		variant?: 'gradient' | 'image' | 'video' | 'dark';
		background?: 'gradient' | 'image' | 'video' | 'dark';
		backgroundImage?: string;
		overlay?: boolean;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
		cta?: Snippet;
		children?: Snippet;
	}

	let {
		title,
		subtitle,
		primaryCta,
		secondaryCta,
		buttons,
		variant = 'gradient',
		background,
		backgroundImage,
		overlay = false,
		size = 'lg',
		class: className = '',
		cta,
		children
	}: HeroProps = $props();

	// Use variant as background if background is not explicitly set
	const heroBackground = background || variant;

	const heroClasses = [
		'hero',
		`hero-${size}`,
		`hero-${heroBackground}`,
		overlay ? 'hero-overlay' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<section class={heroClasses} style={backgroundImage ? `--bg-image: url(${backgroundImage})` : ''}>
	{#if overlay}
		<div class="hero-overlay-bg"></div>
	{/if}

	<div class="container">
		<div class="hero-content">
			<h1 class="hero-title">{title}</h1>

			{#if subtitle}
				<p class="hero-subtitle">{subtitle}</p>
			{/if}

			{#if cta}
				<div class="hero-actions">
					{@render cta()}
				</div>
			{:else if buttons}
				<div class="hero-actions">
					{#each buttons as button}
						<a
							href={button.href}
							class="hero-btn {button.variant === 'primary'
								? 'hero-btn-primary'
								: 'hero-btn-secondary'}"
						>
							{button.text}
						</a>
					{/each}
				</div>
			{:else if primaryCta || secondaryCta}
				<div class="hero-actions">
					{#if primaryCta}
						<a href={primaryCta.href} class="hero-btn hero-btn-primary">
							{primaryCta.text}
						</a>
					{/if}

					{#if secondaryCta}
						<a href={secondaryCta.href} class="hero-btn hero-btn-secondary">
							{secondaryCta.text}
						</a>
					{/if}
				</div>
			{/if}

			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 60vh;
		color: white;
		text-align: center;
		overflow: hidden;
	}

	.hero-gradient {
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
	}

	.hero-image {
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.hero-overlay .hero-overlay-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.hero-content {
		position: relative;
		z-index: 2;
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 800;
		color: white;
		margin-bottom: var(--space-6);
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: var(--space-8);
		line-height: 1.6;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
		margin-top: var(--space-8);
		z-index: 10;
		position: relative;
	}

	/* Hero button base styles */
	.hero-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 200px;
		min-height: 56px;
		padding: var(--space-4) var(--space-8);
		font-size: 1.1rem;
		font-weight: 900;
		text-decoration: none;
		border-radius: var(--radius-lg);
		border: 3px solid white;
		transition: all 0.3s ease;
		cursor: pointer;
		z-index: 10;
	}

	/* Primary button - semi-transparent white background */
	.hero-btn-primary {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	}

	.hero-btn-primary:hover {
		background: rgba(255, 255, 255, 0.25);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	/* Secondary button - darker semi-transparent background */
	.hero-btn-secondary {
		background: rgba(0, 0, 0, 0.3);
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	}

	.hero-btn-secondary:hover {
		background: rgba(0, 0, 0, 0.4);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	/* Size variants */
	.hero-sm {
		min-height: 40vh;
		padding: var(--space-16) 0;
	}

	.hero-sm .hero-title {
		font-size: 2.5rem;
	}

	.hero-sm .hero-subtitle {
		font-size: 1.125rem;
	}

	.hero-md {
		min-height: 50vh;
		padding: var(--space-20) 0;
	}

	.hero-md .hero-title {
		font-size: 3rem;
	}

	.hero-lg {
		min-height: 60vh;
		padding: var(--space-24) 0;
	}

	.hero-xl {
		min-height: 80vh;
		padding: var(--space-32) 0;
	}

	.hero-xl .hero-title {
		font-size: 4rem;
	}

	.hero-xl .hero-subtitle {
		font-size: 1.375rem;
	}

	@media (max-width: 768px) {
		.hero {
			min-height: 50vh;
			padding: var(--space-16) 0;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-sm .hero-title {
			font-size: 2rem;
		}

		.hero-md .hero-title {
			font-size: 2.25rem;
		}

		.hero-lg .hero-title {
			font-size: 2.5rem;
		}

		.hero-xl .hero-title {
			font-size: 2.75rem;
		}

		.hero-subtitle {
			font-size: 1.125rem;
		}

		.hero-xl .hero-subtitle {
			font-size: 1.25rem;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.hero-btn {
			width: 100%;
			max-width: 280px;
		}
	}
</style>
