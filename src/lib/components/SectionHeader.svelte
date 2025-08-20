<script lang="ts">
	interface SectionHeaderProps {
		title: string;
		subtitle?: string;
		align?: 'left' | 'center' | 'right';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let { title, subtitle, align = 'center', size = 'md', class: className = '' } = $props();

	const headerClasses = ['section-header', `text-${align}`, `header-${size}`, className]
		.filter(Boolean)
		.join(' ');
</script>

<div class={headerClasses}>
	<h2 class="section-title">{title}</h2>
	{#if subtitle}
		<p class="section-subtitle">{subtitle}</p>
	{/if}
</div>

<style>
	.section-header {
		margin-bottom: var(--space-12);
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		line-height: 1.2;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 600px;
		line-height: 1.6;
	}

	.text-center .section-subtitle {
		margin: 0 auto;
	}

	.text-right .section-subtitle {
		margin-left: auto;
	}

	/* Size variants */
	.header-sm .section-title {
		font-size: 2rem;
	}

	.header-sm .section-subtitle {
		font-size: 1rem;
	}

	.header-lg .section-title {
		font-size: 3rem;
	}

	.header-lg .section-subtitle {
		font-size: 1.25rem;
	}

	@media (max-width: 768px) {
		.section-header {
			margin-bottom: var(--space-8);
		}

		.section-title {
			font-size: 2rem;
		}

		.header-sm .section-title {
			font-size: 1.75rem;
		}

		.header-lg .section-title {
			font-size: 2.25rem;
		}

		.section-subtitle {
			font-size: 1rem;
		}
	}
</style>
