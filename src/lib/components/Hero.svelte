<script lang="ts">
	import type { Snippet } from 'svelte';

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
			{:else if primaryCta || secondaryCta}
				<div class="hero-actions">
					{#if primaryCta}
						<a href={primaryCta.href} class="btn btn-lg btn-light">
							{primaryCta.text}
						</a>
					{/if}

					{#if secondaryCta}
						<a href={secondaryCta.href} class="btn btn-lg btn-secondary">
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

		.hero-actions .btn {
			width: 100%;
			max-width: 280px;
		}
	}
</style>
