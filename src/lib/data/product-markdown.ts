// A product page as Markdown, built from the same data as the HTML page, for
// AI agents and LLM tools. Served at /products/<slug>.md and listed in
// /llms.txt and /llms-full.txt.
import { company } from './company.js';
import { type Product, platformLabels, statusLabels } from './products.js';
import type { ProductPage } from './product-pages.js';

const absolute = (href: string) => (href.startsWith('http') ? href : `${company.url}${href}`);

export function productMarkdown(product: Product, page: ProductPage | undefined): string {
	const url = `${company.url}/products/${product.slug}`;
	const lines: string[] = [
		`# ${product.name}: ${product.tagline.replace(/\.$/, '')}`,
		'',
		`> ${product.description}`,
		'',
		`- Page: ${url}`,
		`- Platforms: ${product.platforms.map((p) => platformLabels[p]).join(', ')}`,
		`- Status: ${statusLabels[product.status]}`,
		`- Built by: ${company.name}, Kathmandu (${company.url})`,
		`- Built with: ${product.tech.join(', ')}`
	];
	if (product.license) lines.push(`- Licence: open source, ${product.license}`);
	if (product.availableIn) lines.push(`- Available in: ${product.availableIn} only`);
	if (product.links.length > 0) {
		lines.push('', '## Get it', '');
		for (const link of product.links) lines.push(`- [${link.label}](${link.href})`);
		if (product.status === 'coming-soon') {
			lines.push('', 'Not yet published; the store links go live with the release.');
		}
	}
	if (page) {
		lines.push(
			'',
			`## ${page.pitch.eyebrow}`,
			'',
			`**${page.pitch.headline}**`,
			'',
			page.pitch.text
		);
		if (page.audience && page.audience.length > 0) {
			lines.push('', '## Made for', '');
			for (const who of page.audience) lines.push(`- ${who}`);
		}
		if (page.facts && page.facts.length > 0) {
			lines.push('', '## At a glance', '');
			for (const fact of page.facts) lines.push(`- ${fact.value} ${fact.label}`);
		}
		if (page.highlights.length > 0) {
			lines.push('', '## What it does', '');
			for (const h of page.highlights) lines.push(`- **${h.title}.** ${h.text}`);
		}
		if (page.screenshots.length > 0) {
			lines.push('', '## Screenshots', '');
			for (const s of page.screenshots) lines.push(`- [${s.alt}](${company.url}${s.src})`);
		}
		if (page.faq && page.faq.length > 0) {
			lines.push('', '## Questions', '');
			for (const item of page.faq) lines.push(`**${item.q}**`, '', item.a, '');
		}
	}
	const policies: string[] = [];
	if (product.privacyHref) policies.push(`- [Privacy policy](${absolute(product.privacyHref)})`);
	if (product.accountDeletionHref) {
		policies.push(`- [Delete your account](${absolute(product.accountDeletionHref)})`);
	}
	if (policies.length > 0) lines.push('', '## Policies', '', ...policies);
	lines.push(
		'',
		'## Contact',
		'',
		`${company.name}, ${company.contact.address.city}, ${company.contact.address.country}. Email: ${company.contact.email}`,
		''
	);
	return lines.join('\n').replace(/\n{3,}/g, '\n\n');
}
