// Titles, descriptions and schema.org JSON-LD built from the site's own data,
// so every page's meta stays in step with what the page shows.
import { company } from './data/company.js';
import { type Product, platformLabels } from './data/products.js';
import type { ProductPage } from './data/product-pages.js';
import { getAppMeta } from './data/app-meta.js';

/** Search results cut titles at about 60 characters and descriptions at about 160. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

const SUFFIX = ` — ${company.name}`;

export const absoluteUrl = (href: string) =>
	href.startsWith('http') ? href : `${company.url}${href === '/' ? '' : href}`;

/** Shortens text at a word boundary, ending it with an ellipsis when cut. */
export function clamp(text: string, max: number): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const space = cut.lastIndexOf(' ');
	return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.—–-]+$/, '')}…`;
}

/** The full <title>: the page title with the site name, dropping the name when it would not fit. */
export function fullTitle(title: string | undefined): string {
	if (!title) return company.seo.defaultTitle;
	if (title.length + SUFFIX.length <= TITLE_MAX) return `${title}${SUFFIX}`;
	return clamp(title, TITLE_MAX);
}

/** A product page title: "Name: tagline", shortened to fit. */
export const productTitle = (product: Product) =>
	`${product.name}: ${product.tagline.replace(/\.$/, '')}`;

export const ORG_ID = `${company.url}/#organization`;
export const SITE_ID = `${company.url}/#website`;

export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': ORG_ID,
	name: company.name,
	legalName: company.legalName,
	url: company.url,
	logo: `${company.url}/favicon.svg`,
	description: company.seo.defaultDescription,
	foundingDate: String(company.established),
	founder: { '@type': 'Person', name: company.founder },
	address: {
		'@type': 'PostalAddress',
		streetAddress: company.contact.address.street,
		addressLocality: company.contact.address.city,
		addressCountry: 'NP'
	},
	contactPoint: {
		'@type': 'ContactPoint',
		email: company.contact.email,
		telephone: company.contact.phone,
		contactType: 'customer service',
		availableLanguage: ['en', 'ne']
	},
	sameAs: [
		company.social.github,
		company.social.youtube,
		company.social.linkedin,
		company.social.twitter
	]
};

/** The site has no search, so WebSite carries no SearchAction. */
export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': SITE_ID,
	name: company.name,
	url: company.url,
	description: company.seo.defaultDescription,
	inLanguage: 'en',
	publisher: { '@id': ORG_ID }
};

export type Crumb = { name: string; path: string };

/** BreadcrumbList from Home down to the current page. */
export const breadcrumbSchema = (crumbs: Crumb[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: c.name,
		item: absoluteUrl(c.path)
	}))
});

const isMobile = (p: Product) => p.platforms.includes('android') || p.platforms.includes('ios');

const storeKinds = new Set(['play', 'appstore', 'release', 'web']);

/** The store, release and web links for a product, split by kind. */
export function productLinks(product: Product) {
	const of = (kind: string) => product.links.filter((l) => l.kind === kind).map((l) => l.href);
	return {
		play: of('play')[0],
		appStore: of('appstore')[0],
		web: of('web')[0],
		source: of('github')[0],
		releases: [...new Set(of('release'))]
	};
}

/**
 * MobileApplication for apps on Android or iOS, SoftwareApplication otherwise.
 * No offers or aggregateRating: the site holds no prices or store ratings, and
 * schema.org data must match what the page shows.
 */
export function appSchema(product: Product, page: ProductPage | undefined) {
	const url = absoluteUrl(`/products/${product.slug}`);
	const meta = getAppMeta(product.slug);
	const links = product.links.filter((l) => storeKinds.has(l.kind)).map((l) => l.href);
	const install = links[0];
	const screenshots = page?.screenshots.map((s) => absoluteUrl(s.src)) ?? [];
	return {
		'@context': 'https://schema.org',
		'@type': isMobile(product) ? 'MobileApplication' : 'SoftwareApplication',
		'@id': `${url}#app`,
		name: product.name,
		description: product.description,
		url,
		image: absoluteUrl(product.iconSrc ?? company.seo.ogImage),
		...(screenshots.length > 0 ? { screenshot: screenshots } : {}),
		operatingSystem: product.platforms.map((p) => platformLabels[p]).join(', '),
		applicationCategory: meta.category,
		inLanguage: meta.languages,
		datePublished: String(product.year),
		...(product.status === 'coming-soon' ? {} : install ? { installUrl: install } : {}),
		...(product.availableIn
			? { countriesSupported: product.availableIn === 'Nepal' ? 'NP' : product.availableIn }
			: {}),
		...(links.length > 0 ? { sameAs: [...new Set(links)] } : {}),
		author: { '@id': ORG_ID },
		publisher: { '@id': ORG_ID },
		...(product.license
			? { license: `https://spdx.org/licenses/${product.license}.html`, isAccessibleForFree: true }
			: {})
	};
}
