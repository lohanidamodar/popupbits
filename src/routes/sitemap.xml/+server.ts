import { execFileSync } from 'node:child_process';
import { company } from '$lib/data/company.js';
import { visibleProducts } from '$lib/data/products.js';
import { posts } from '$lib/data/posts.js';

export const prerender = true;

// Every static page, found from the route files, so new pages are listed
// without editing this file. Dynamic routes are added from their data below.
const staticPaths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map((file) => file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/')
	.filter((path) => !path.includes('['));

const PRODUCT_DATA = ['src/lib/data/products.ts', 'src/lib/data/product-pages.ts'];

/**
 * The date of the last commit that touched any of the files, from git at build
 * time. A shallow or missing history gives no date, and the URL is listed
 * without lastmod rather than with a guessed one.
 */
function lastCommitDate(files: string[]): string | undefined {
	try {
		const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore']
		}).trim();
		return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
	} catch {
		return undefined;
	}
}

const routeFile = (path: string) => `src/routes${path === '/' ? '' : path}/+page.svelte`;

/** The source files whose changes change the page at this path. */
function sourcesOf(path: string): string[] {
	const post = posts.find((p) => `/blog/${p.slug}` === path);
	if (post) return [`src/lib/posts/${post.slug}.md`];
	if (path.startsWith('/products/')) return PRODUCT_DATA;
	if (path === '/kickstand') return [routeFile(path), 'src/lib/data/kickstand.ts'];
	if (path === '/products' || path === '/') return [routeFile(path), ...PRODUCT_DATA];
	if (path === '/blog') return [routeFile(path), 'src/lib/posts'];
	return [routeFile(path)];
}

export function GET() {
	const paths = new Set([
		...staticPaths,
		// Products with their own landing page are listed there, not under /products.
		...visibleProducts.map((p) => p.pageHref ?? `/products/${p.slug}`),
		...posts.map((p) => `/blog/${p.slug}`)
	]);
	const urls = [...paths]
		.sort()
		.map((path) => {
			const loc = `${company.url}${path === '/' ? '' : path}`;
			const post = posts.find((p) => `/blog/${p.slug}` === path);
			// Without git history, a post still has its publication date.
			const lastmod = lastCommitDate(sourcesOf(path)) ?? post?.date;
			return lastmod
				? `\t<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
				: `\t<url><loc>${loc}</loc></url>`;
		})
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
