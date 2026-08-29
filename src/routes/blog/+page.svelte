<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { posts, formatPostDate } from '$lib/data/posts.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
</script>

<SEO
	title="Blog"
	description="Notes from the Popup Bits studio — shipping apps, store submissions, and what we learn building for Nepal."
	url="/blog"
/>

<PageHeader
	eyebrow="Blog"
	title="Notes from the studio."
	subtitle="What we learn shipping our own apps — releases, store submissions, and the occasional hard-won lesson."
/>

<section class="max-w-3xl mx-auto px-6 pb-24">
	{#if posts.length === 0}
		<p class="text-muted-foreground">Nothing published yet. Check back soon.</p>
	{:else}
		<ul class="space-y-6">
			{#each posts as post (post.slug)}
				<li>
					<Card.Root class="overflow-hidden pt-0 transition-shadow hover:shadow-lg">
						<a href={`/blog/${post.slug}`} class="block">
							{#if post.cover}
								<img
									src={post.cover}
									alt=""
									class="w-full aspect-[3/1] object-cover"
									loading="lazy"
								/>
							{/if}
							<Card.Header class="pt-6">
								<div class="flex flex-wrap items-center gap-2 mb-2">
									<time class="text-xs text-muted-foreground" datetime={post.date}>
										{formatPostDate(post.date)}
									</time>
									{#each post.tags as tag (tag)}
										<Badge variant="outline" class="text-xs">{tag}</Badge>
									{/each}
								</div>
								<Card.Title class="text-2xl font-display">{post.title}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="text-muted-foreground">{post.description}</p>
							</Card.Content>
						</a>
					</Card.Root>
				</li>
			{/each}
		</ul>
	{/if}
</section>
