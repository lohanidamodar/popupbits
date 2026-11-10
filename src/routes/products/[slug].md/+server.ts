// Markdown version of a product page, for AI agents and LLM tools.
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { visibleProducts, getProductBySlug } from '$lib/data/products.js';
import { getProductPage } from '$lib/data/product-pages.js';
import { productMarkdown } from '$lib/data/product-markdown.js';

export const prerender = true;

export const entries = () =>
	visibleProducts.filter((p) => !p.pageHref).map((p) => ({ slug: p.slug }));

export const GET: RequestHandler = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) throw error(404, 'Product not found');
	// A product with its own landing page has its own Markdown next to it.
	if (product.pageHref) throw redirect(308, `${product.pageHref}.md`);
	return new Response(productMarkdown(product, getProductPage(product.slug)), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
};
