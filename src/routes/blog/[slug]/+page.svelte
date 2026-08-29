<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { getPostComponent, formatPostDate } from '$lib/data/posts.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
	const Content = $derived(getPostComponent(post.slug));
</script>

<SEO
	title={post.seoTitle ?? post.title}
	description={post.description}
	image={post.image}
	url={`/blog/${post.slug}`}
	article={{ publishedTime: post.date, author: post.author, tags: post.tags }}
/>

<article class="max-w-3xl mx-auto px-6 pt-24 pb-24">
	{#if post.cover}
		<img
			src={post.cover}
			alt=""
			class="w-full aspect-[5/2] object-cover rounded-2xl border border-border mb-10"
		/>
	{/if}
	<header class="mb-10">
		<div class="flex flex-wrap items-center gap-2 mb-4">
			<time class="text-sm text-muted-foreground" datetime={post.date}>
				{formatPostDate(post.date)}
			</time>
			{#each post.tags as tag (tag)}
				<Badge variant="outline" class="text-xs">{tag}</Badge>
			{/each}
		</div>
		<h1 class="font-display text-4xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
		<p class="text-lg text-muted-foreground mt-4">{post.description}</p>
		<p class="text-sm text-muted-foreground mt-6">By {post.author}</p>
	</header>

	<div
		class="prose prose-neutral dark:prose-invert max-w-none
			prose-headings:font-display prose-headings:tracking-tight
			prose-a:text-primary prose-img:rounded-xl"
	>
		{#if Content}
			<Content />
		{/if}
	</div>

	<div class="mt-16 pt-8 border-t border-border">
		<Button href="/blog" variant="outline" size="sm">
			<ArrowLeft class="size-4" />
			All posts
		</Button>
	</div>
</article>
