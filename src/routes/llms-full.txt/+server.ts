// llms-full.txt: the whole site's product content in one Markdown file.
import { company } from '$lib/data/company.js';
import { visibleProducts } from '$lib/data/products.js';
import { getProductPage } from '$lib/data/product-pages.js';
import { productMarkdown } from '$lib/data/product-markdown.js';
import { kickstandMarkdown } from '$lib/data/kickstand-markdown.js';

export const prerender = true;

export function GET() {
	const sections = visibleProducts.map((p) =>
		p.slug === 'kickstand' ? kickstandMarkdown() : productMarkdown(p, getProductPage(p.slug))
	);
	const body = `# ${company.name}

> ${company.description}

Site map for tools: ${company.url}/llms.txt

---

${sections.join('\n---\n\n')}`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
