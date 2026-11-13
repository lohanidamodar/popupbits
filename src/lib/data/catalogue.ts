// The app catalogue in machine-readable form, served at /apps.json for AI
// agents and other tools, and read by the site's WebMCP tools.
import { company } from './company.js';
import { visibleProducts, platformLabels, type Product } from './products.js';
import { getAppMeta } from './app-meta.js';
import { absoluteUrl as absolute } from '../seo.js';
import { developerToolsCatalogue } from './developer-tools.js';

export type CatalogueApp = {
	name: string;
	slug: string;
	tagline: string;
	description: string;
	url: string;
	markdownUrl: string;
	iconUrl: string | null;
	platforms: string[];
	status: Product['status'];
	category: string;
	languages: string[];
	availableIn: string | null;
	year: number;
	openSourceLicense: string | null;
	store: {
		googlePlay: string | null;
		appStore: string | null;
		web: string | null;
		releases: string[];
		source: string | null;
	};
	/** Links that are neither stores nor source, such as checkout pages. */
	otherLinks: { label: string; url: string }[];
	privacyPolicyUrl: string | null;
	accountDeletionUrl: string | null;
};

export function catalogueApp(p: Product): CatalogueApp {
	const page = absolute(p.pageHref ?? `/products/${p.slug}`);
	const of = (kind: string) => p.links.filter((l) => l.kind === kind).map((l) => l.href);
	const meta = getAppMeta(p.slug);
	return {
		name: p.name,
		slug: p.slug,
		tagline: p.tagline,
		description: p.description,
		url: page,
		markdownUrl: `${page}.md`,
		iconUrl: p.iconSrc ? absolute(p.iconSrc) : null,
		platforms: p.platforms.map((x) => platformLabels[x]),
		status: p.status,
		category: meta.category,
		languages: meta.languages,
		availableIn: p.availableIn ?? null,
		year: p.year,
		openSourceLicense: p.license ?? null,
		store: {
			googlePlay: of('play')[0] ?? null,
			appStore: of('appstore')[0] ?? null,
			web: of('web')[0] ?? null,
			releases: [...new Set(of('release'))],
			source: of('github')[0] ?? null
		},
		otherLinks: p.links
			.filter((l) => l.kind === 'other')
			.map((l) => ({ label: l.label, url: l.href })),
		privacyPolicyUrl: p.privacyHref ? absolute(p.privacyHref) : null,
		accountDeletionUrl: p.accountDeletionHref ? absolute(p.accountDeletionHref) : null
	};
}

export const catalogue = () => ({
	publisher: {
		name: company.name,
		legalName: company.legalName,
		url: company.url,
		email: company.contact.email,
		contactUrl: `${company.url}/contact`,
		location: `${company.contact.address.city}, ${company.contact.address.country}`
	},
	docs: {
		llms: `${company.url}/llms.txt`,
		llmsFull: `${company.url}/llms-full.txt`,
		developers: `${company.url}/developers`
	},
	apps: visibleProducts.map(catalogueApp),
	/** Developer tools, open source and paid; some are also apps above. */
	developerTools: developerToolsCatalogue()
});
