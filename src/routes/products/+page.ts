import type { PageLoad } from './$types';
import { products } from '$lib/data/products.js';

export const prerender = true;

export const load: PageLoad = () => {
	return { products };
};
