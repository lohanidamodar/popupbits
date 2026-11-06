// llms.txt (https://llmstxt.org): a Markdown map of the site for LLM tools.
import { company } from '$lib/data/company.js';
import { visibleProducts } from '$lib/data/products.js';

export const prerender = true;

export function GET() {
	const products = visibleProducts
		.map((p) => `- [${p.name}](${company.url}${p.pageHref ?? `/products/${p.slug}`}): ${p.tagline}`)
		.join('\n');
	const body = `# ${company.name}

> ${company.description}

## For developers

- [Kickstand: Flutter Starter Kit for Appwrite](${company.url}/kickstand.md): what's included, licences, prices and FAQ, in Markdown. Sales page: ${company.url}/kickstand

## Products

${products}

## Company

- [About](${company.url}/about)
- [Contact](${company.url}/contact): ${company.contact.email}
- [Blog](${company.url}/blog)
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
