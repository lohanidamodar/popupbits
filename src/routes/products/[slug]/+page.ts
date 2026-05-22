import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { products, getProductBySlug } from '$lib/data/products.js';

export const prerender = true;

export const entries = () => products.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	return { product };
};
