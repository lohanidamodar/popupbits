// llms.txt (https://llmstxt.org): a Markdown map of the site for LLM tools.
// Every product has a Markdown version of its page; /llms-full.txt inlines them all.
import { company } from '$lib/data/company.js';
import { visibleProducts, platformLabels, statusLabels } from '$lib/data/products.js';
import { posts } from '$lib/data/posts.js';

export const prerender = true;

export function GET() {
	const products = visibleProducts
		.map((p) => {
			const page = `${company.url}${p.pageHref ?? `/products/${p.slug}`}`;
			const status = p.status === 'live' ? '' : ` (${statusLabels[p.status].toLowerCase()})`;
			return `- [${p.name}](${page}.md): ${p.tagline} ${p.platforms.map((x) => platformLabels[x]).join(', ')}${status}. HTML: ${page}`;
		})
		.join('\n');
	const absolute = (href: string) => (href.startsWith('http') ? href : `${company.url}${href}`);
	const policies = visibleProducts
		.filter((p) => p.privacyHref)
		.map((p) => `- [${p.name} privacy policy](${absolute(p.privacyHref!)})`)
		.join('\n');
	const blog = posts
		.map((p) => `- [${p.title}](${company.url}/blog/${p.slug}): ${p.description}`)
		.join('\n');
	const body = `# ${company.name}

> ${company.description}

${company.name} (${company.legalName}) is a software studio in ${company.contact.address.city}, ${company.contact.address.country}, founded in ${company.established}. It ships its own apps, most of them Flutter apps for Android and iOS, several made for Nepal, and takes on client work. Each link below ending in .md is a Markdown version of that page; drop the .md for the HTML page.

## For developers

- [Kickstand: Flutter Starter Kit for Appwrite](${company.url}/kickstand.md): what's included, licences, prices and FAQ. Sales page: ${company.url}/kickstand

## Products

${products}

## Privacy policies

${policies}

## Blog

${blog}

## Company

- [About](${company.url}/about)
- [Contact](${company.url}/contact): ${company.contact.email}
- [Everything in one file](${company.url}/llms-full.txt): every product page as Markdown
- [App catalogue as JSON](${company.url}/apps.json): every app's name, description, platforms, store links, privacy policy, category and languages
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
