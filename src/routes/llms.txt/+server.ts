// llms.txt (https://llmstxt.org): a Markdown map of the site for LLM tools.
// Every product has a Markdown version of its page; /llms-full.txt inlines them all.
import { company } from '$lib/data/company.js';
import { visibleProducts, platformLabels, statusLabels } from '$lib/data/products.js';
import { posts } from '$lib/data/posts.js';
import { absoluteUrl } from '$lib/seo.js';
import { developerTools } from '$lib/data/developer-tools.js';

export const prerender = true;

export function GET() {
	const products = visibleProducts
		.map((p) => {
			const page = `${company.url}${p.pageHref ?? `/products/${p.slug}`}`;
			const status = p.status === 'live' ? '' : ` (${statusLabels[p.status].toLowerCase()})`;
			return `- [${p.name}](${page}.md): ${p.tagline} ${p.platforms.map((x) => platformLabels[x]).join(', ')}${status}. HTML: ${page}`;
		})
		.join('\n');
	const policies = visibleProducts
		.filter((p) => p.privacyHref)
		.map((p) => `- [${p.name} privacy policy](${absoluteUrl(p.privacyHref!)})`)
		.join('\n');
	const devTools = developerTools
		.filter((t) => !t.paid)
		.map(
			(t) =>
				`- ${t.name} (${t.license}, ${t.repo}): ${t.tagline}${t.releases ? ` Releases: ${t.releases}` : ''}`
		)
		.join('\n');
	const blog = posts
		.map((p) => `- [${p.title}](${company.url}/blog/${p.slug}): ${p.description}`)
		.join('\n');
	const body = `# ${company.name}

> ${company.description}

${company.name} (${company.legalName}) is a software studio in ${company.contact.address.city}, ${company.contact.address.country}, founded in ${company.established}. It ships its own apps, most of them Flutter apps for Android and iOS, several made for Nepal, and takes on client work. Each link below ending in .md is a Markdown version of that page; drop the .md for the HTML page.

## For developers

- [Popup Bits for developers](${company.url}/developers): every developer tool we publish, with its licence, repository and releases. Karmashala is the flagship.
${devTools}
- [Kickstand: Flutter Starter Kit for Appwrite](${company.url}/kickstand.md): what's included, licences, prices and FAQ. Sales page: ${company.url}/kickstand

## Products

${products}

## Privacy policies

${policies}

## Blog

${blog}

## Company

- [For business](${company.url}/for-business): websites, order and lead tracking, daily accounts, and custom apps for Nepali businesses, each with a free check-up and a fixed quote
- [About](${company.url}/about)
- [Contact](${company.url}/contact): ${company.contact.email}
- [Everything in one file](${company.url}/llms-full.txt): every product page as Markdown
- [App catalogue as JSON](${company.url}/apps.json): every app's name, description, platforms, store links, privacy policy, category and languages
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
