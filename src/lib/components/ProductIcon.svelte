<script lang="ts">
	import type { Component } from 'svelte';
	import type { Product } from '$lib/data/products.js';
	import {
		CalendarDays,
		BookOpenText,
		SpellCheck,
		Store,
		LayoutDashboard,
		Box
	} from '@lucide/svelte';

	type Size = 'sm' | 'md' | 'lg';

	let {
		product,
		size = 'sm',
		class: className = ''
	}: { product: Product; size?: Size; class?: string } = $props();

	const iconMap: Record<string, Component> = {
		'mero-patro': CalendarDays,
		'mero-nepali': BookOpenText,
		spellcraft: SpellCheck,
		bhadama: Store,
		'ui-challenges-flutter': LayoutDashboard
	};

	const sizeClasses: Record<Size, { box: string; icon: string }> = {
		sm: { box: 'h-12 w-12 rounded-xl', icon: 'size-6' },
		md: { box: 'h-20 w-20 rounded-2xl', icon: 'size-10' },
		lg: { box: 'h-32 w-32 rounded-3xl', icon: 'size-16' }
	};

	const Icon = $derived(iconMap[product.slug] ?? Box);
	const sizes = $derived(sizeClasses[size]);
</script>

<div
	class={`${product.themeClass} ${sizes.box} bg-primary text-primary-foreground inline-flex items-center justify-center shadow-md ${className}`}
	aria-hidden="true"
>
	<Icon class={sizes.icon} />
</div>
