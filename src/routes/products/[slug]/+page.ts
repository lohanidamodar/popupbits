import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { visibleProducts, getProductBySlug } from '$lib/data/products.js';
import { getProductPage } from '$lib/data/product-pages.js';

export const prerender = true;

export const entries = () => visibleProducts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	if (product.pageHref) throw redirect(308, product.pageHref);
	return { product, page: getProductPage(product.slug) };
};
