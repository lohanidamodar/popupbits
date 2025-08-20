<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';
		size?: 'sm' | 'base' | 'lg' | 'xl';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		class?: string;
		onclick?: () => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'base',
		href,
		type = 'button',
		disabled = false,
		loading = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	let classes = $derived(() => {
		const baseClasses = 'btn';
		const variantClass = `btn-${variant}`;
		const sizeClass = size !== 'base' ? `btn-${size}` : '';
		return [baseClasses, variantClass, sizeClass, className].filter(Boolean).join(' ');
	});
</script>

{#if href}
	<a {href} class={classes} aria-disabled={disabled}>
		{#if loading}
			<span class="animate-pulse">⟳</span>
		{/if}
		{@render children()}
	</a>
{:else}
	<button {type} class={classes} {disabled} {onclick}>
		{#if loading}
			<span class="animate-pulse">⟳</span>
		{/if}
		{@render children()}
	</button>
{/if}
