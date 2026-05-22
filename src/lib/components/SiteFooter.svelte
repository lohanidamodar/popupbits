<script lang="ts">
	import { company, featuredProducts } from '$lib';
	import { CodeXml, Link, AtSign, Play, Mail } from '@lucide/svelte';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border mt-24">
	<div class="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
		<div class="md:col-span-2">
			<div class="font-display text-xl font-extrabold tracking-tight">{company.name}</div>
			<p class="text-sm text-muted-foreground mt-3 max-w-sm">{company.description}</p>
			<address class="not-italic text-sm text-muted-foreground mt-6">
				{company.contact.address.street}, Ward {company.contact.address.zone}<br />
				{company.contact.address.city}, {company.contact.address.country}<br />
				<a class="hover:underline" href="mailto:{company.contact.email}">{company.contact.email}</a>
			</address>
		</div>
		<div>
			<div class="font-semibold text-sm mb-3">Products</div>
			<ul class="space-y-2 text-sm">
				{#each featuredProducts as p (p.slug)}
					<li>
						<a class="text-muted-foreground hover:text-foreground" href={`/products/${p.slug}`}>
							{p.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<div class="font-semibold text-sm mb-3">Studio</div>
			<ul class="space-y-2 text-sm">
				<li><a class="text-muted-foreground hover:text-foreground" href="/about">About</a></li>
				<li><a class="text-muted-foreground hover:text-foreground" href="/contact">Contact</a></li>
				<li>
					<a
						class="text-muted-foreground hover:text-foreground"
						href="/contact/flutter-ui-challenges-privacy-policy"
					>
						Privacy
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="border-t border-border">
		<div class="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
			<div class="text-xs text-muted-foreground">© {year} {company.legalName}</div>
			<div class="flex gap-1">
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.github} aria-label="GitHub">
					<CodeXml class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.linkedin} aria-label="LinkedIn">
					<Link class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.twitter} aria-label="Twitter / X">
					<AtSign class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.youtube} aria-label="YouTube">
					<Play class="size-5" />
				</a>
				<a class="p-2 text-muted-foreground hover:text-foreground" href={company.social.email} aria-label="Email">
					<Mail class="size-5" />
				</a>
			</div>
		</div>
	</div>
</footer>
