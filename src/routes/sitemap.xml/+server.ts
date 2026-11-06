import { company } from '$lib/data/company.js';
import { visibleProducts } from '$lib/data/products.js';
import { posts } from '$lib/data/posts.js';

export const prerender = true;

// Every static page, found from the route files, so new pages are listed
// without editing this file. Dynamic routes are added from their data below.
const staticPaths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map((file) => file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/')
	.filter((path) => !path.includes('['));

export function GET() {
	const paths = new Set([
		...staticPaths,
		// Products with their own landing page are listed there, not under /products.
		...visibleProducts.map((p) => p.pageHref ?? `/products/${p.slug}`),
		...posts.map((p) => `/blog/${p.slug}`)
	]);
	const urls = [...paths]
		.sort()
		.map((path) => `\t<url><loc>${company.url}${path === '/' ? '' : path}</loc></url>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
