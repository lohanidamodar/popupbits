import type { PageLoad } from './$types';
import { visibleProducts } from '$lib/data/products.js';

export const prerender = true;

export const load: PageLoad = () => {
	return { products: visibleProducts };
};
