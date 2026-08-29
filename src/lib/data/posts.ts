import type { Component } from 'svelte';

export type PostMeta = {
	title: string;
	/** Overrides title in <title> and og:title when the on-page headline is too long for SERPs. */
	seoTitle?: string;
	description: string;
	/** ISO date, e.g. '2026-08-28'. */
	date: string;
	author: string;
	tags: string[];
	/** Product slug this post is about, linking it from that product's page. */
	product?: string;
	/** Relative to /static, e.g. '/images/blog/foo.jpg'. Falls back to the site OG image. */
	image?: string;
	/** Textless cover art shown on the blog index and atop the post. */
	cover?: string;
	draft?: boolean;
};

export type Post = PostMeta & { slug: string };

type PostModule = { metadata: PostMeta; default: Component };

const modules = import.meta.glob<PostModule>('../posts/*.md', { eager: true });

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

export const posts: Post[] = Object.entries(modules)
	.map(([path, mod]) => ({ ...mod.metadata, slug: slugOf(path) }))
	.filter((p) => !p.draft)
	.sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** The rendered component for a post, or undefined if the slug is unknown or a draft. */
export const getPostComponent = (slug: string): Component | undefined => {
	if (!getPostBySlug(slug)) return undefined;
	const entry = Object.entries(modules).find(([path]) => slugOf(path) === slug);
	return entry?.[1].default;
};

export const formatPostDate = (date: string) =>
	new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});

export const getPostsByProduct = (productSlug: string) =>
	posts.filter((p) => p.product === productSlug);
