import { error } from '@sveltejs/kit';
import { getPostBySlug, posts } from '$lib/data/posts.js';
import type { EntryGenerator, PageLoad } from './$types';

// Prerendered like every page (see src/routes/+layout.ts); list each post.
export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
};
