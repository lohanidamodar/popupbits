<script lang="ts">
	import { page } from '$app/state';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ThemeToggle from './ThemeToggle.svelte';
	import { Menu } from '@lucide/svelte';

	const links = [
		{ label: 'Products', href: '/products' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' }
	];

	let mobileOpen = $state(false);

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(href + '/');
</script>

<nav class="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a href="/" class="font-display text-xl font-extrabold tracking-tight">Popup Bits</a>

		<div class="hidden md:flex items-center gap-1">
			{#each links as l (l.href)}
				<a
					href={l.href}
					class={`px-3 py-2 text-sm font-medium rounded-md transition ${
						isActive(l.href)
							? 'text-primary bg-accent'
							: 'text-muted-foreground hover:text-foreground'
					}`}
				>
					{l.label}
				</a>
			{/each}
			<ThemeToggle />
			<Button href="/contact" size="sm">Hire us</Button>
		</div>

		<div class="md:hidden flex items-center gap-1">
			<ThemeToggle />
			<Sheet.Root bind:open={mobileOpen}>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button variant="ghost" size="icon" aria-label="Open menu" {...props}>
							<Menu class="size-5" />
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-72">
					<Sheet.Header>
						<Sheet.Title>Menu</Sheet.Title>
					</Sheet.Header>
					<nav class="mt-6 flex flex-col gap-1">
						{#each links as l (l.href)}
							<a
								href={l.href}
								class={`px-3 py-3 rounded-md text-base font-medium ${
									isActive(l.href)
										? 'text-primary bg-accent'
										: 'text-muted-foreground hover:text-foreground'
								}`}
								onclick={() => (mobileOpen = false)}
							>
								{l.label}
							</a>
						{/each}
						<a
							href="/contact"
							onclick={() => (mobileOpen = false)}
							class="mt-2 inline-flex justify-center rounded-md bg-primary text-primary-foreground px-3 py-3 font-medium"
						>
							Hire us
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</nav>
