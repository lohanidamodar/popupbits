<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'compact' | 'bordered' | 'elevated';
		hover?: boolean;
		class?: string;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let {
		variant = 'default',
		hover = true,
		class: className = '',
		header,
		footer,
		children
	}: Props = $props();

	let classes = $derived(() => {
		const baseClasses = 'card';
		const variantClass = variant !== 'default' ? `card-${variant}` : '';
		const hoverClass = hover ? 'card-hover' : '';
		return [baseClasses, variantClass, hoverClass, className].filter(Boolean).join(' ');
	});
</script>

<div class={classes}>
	{#if header}
		<div class="card-header">
			{@render header()}
		</div>
	{/if}

	<div class="card-body">
		{@render children()}
	</div>

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.card-hover:hover {
		box-shadow: var(--shadow-xl);
		transform: translateY(-4px);
	}

	.card-compact .card-body {
		padding: var(--space-4);
	}

	.card-compact .card-header,
	.card-compact .card-footer {
		padding: var(--space-4);
	}

	.card-bordered {
		border: 2px solid var(--border-color);
	}

	.card-elevated {
		box-shadow: var(--shadow-lg);
	}

	.card-header {
		padding: var(--space-6);
		border-bottom: 1px solid var(--border-color);
		background: var(--bg-secondary);
	}

	.card-body {
		padding: var(--space-6);
	}

	.card-footer {
		padding: var(--space-6);
		border-top: 1px solid var(--border-color);
		background: var(--bg-secondary);
	}
</style>
