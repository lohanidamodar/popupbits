<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SectionProps {
		variant?: 'default' | 'gray' | 'hero' | 'dark';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		container?: boolean;
		class?: string;
		id?: string;
		children: Snippet;
	}

	let {
		variant = 'default',
		size = 'md',
		container = true,
		class: className = '',
		id,
		children
	}: SectionProps = $props();

	const sectionClasses = [
		'section',
		`section-${size}`,
		variant !== 'default' ? `section-${variant}` : '',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<section class={sectionClasses} {id}>
	{#if container}
		<div class="container">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</section>

<style>
	/* Size variants */
	.section-sm {
		padding: var(--space-12) 0;
	}

	.section-md {
		padding: var(--space-16) 0;
	}

	.section-lg {
		padding: var(--space-20) 0;
	}

	.section-xl {
		padding: var(--space-24) 0;
	}

	/* Variant styles */
	.section-gray {
		background-color: var(--gray-50);
	}

	.section-hero {
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
		color: white;
		text-align: center;
	}

	.section-dark {
		background-color: var(--gray-900);
		color: white;
	}

	@media (max-width: 768px) {
		.section-sm {
			padding: var(--space-8) 0;
		}

		.section-md {
			padding: var(--space-12) 0;
		}

		.section-lg {
			padding: var(--space-16) 0;
		}

		.section-xl {
			padding: var(--space-20) 0;
		}
	}
</style>
