import { describe, expect, it } from 'vitest';
import { clamp, fullTitle, appSchema, breadcrumbSchema, TITLE_MAX } from './seo.js';
import { visibleProducts, getProductBySlug } from './data/products.js';
import { getProductPage } from './data/product-pages.js';
import { catalogue } from './data/catalogue.js';
import { splitDevanagari } from './components/LangText.svelte';

describe('clamp', () => {
	it('leaves short text alone', () => {
		expect(clamp('Short and sweet.', 160)).toBe('Short and sweet.');
	});

	it('cuts long text at a word and ends it with an ellipsis', () => {
		const out = clamp('one two three four five six seven eight nine ten', 20);
		expect(out.length).toBeLessThanOrEqual(20);
		expect(out).toBe('one two three four…');
	});
});

describe('fullTitle', () => {
	it('adds the site name when it fits', () => {
		expect(fullTitle('About')).toBe('About — Popup Bits');
	});

	it('drops the site name, then shortens, when it would not fit', () => {
		for (const p of visibleProducts) {
			expect(fullTitle(`${p.name}: ${p.tagline}`).length).toBeLessThanOrEqual(TITLE_MAX);
		}
	});
});

describe('appSchema', () => {
	it('is a MobileApplication with store links for a phone app', () => {
		const sanskrit = getProductBySlug('sanskrit')!;
		const schema = appSchema(sanskrit, getProductPage('sanskrit'));
		expect(schema['@type']).toBe('MobileApplication');
		expect(schema.applicationCategory).toBe('EducationalApplication');
		expect(schema.installUrl).toMatch(/^https:\/\/play\.google\.com\//);
		expect(schema.inLanguage).toContain('sa');
	});

	it('is a SoftwareApplication for a desktop-only app', () => {
		const desktop = visibleProducts.find(
			(p) => !p.platforms.includes('android') && !p.platforms.includes('ios')
		);
		if (desktop) expect(appSchema(desktop, undefined)['@type']).toBe('SoftwareApplication');
	});

	it('gives coming-soon apps no install URL', () => {
		const soon = visibleProducts.find((p) => p.status === 'coming-soon')!;
		expect(appSchema(soon, undefined)).not.toHaveProperty('installUrl');
	});
});

describe('breadcrumbSchema', () => {
	it('starts at Home and numbers from 1', () => {
		const list = breadcrumbSchema([{ name: 'Blog', path: '/blog' }]).itemListElement;
		expect(list.map((i) => [i.position, i.name, i.item])).toEqual([
			[1, 'Home', 'https://www.popupbits.com'],
			[2, 'Blog', 'https://www.popupbits.com/blog']
		]);
	});
});

describe('catalogue', () => {
	it('lists every visible product with absolute URLs', () => {
		const { apps } = catalogue();
		expect(apps).toHaveLength(visibleProducts.length);
		for (const app of apps) {
			expect(app.url).toMatch(/^https:\/\//);
			if (app.privacyPolicyUrl) expect(app.privacyPolicyUrl).toMatch(/^https:\/\//);
		}
	});
});

describe('splitDevanagari', () => {
	it('puts Devanagari runs at odd indexes, keeping spaces between words in one run', () => {
		expect(splitDevanagari('From ठेला to मोमो सम्राट')).toEqual([
			'From ',
			'ठेला',
			' to ',
			'मोमो सम्राट',
			''
		]);
	});

	it('returns plain text untouched', () => {
		expect(splitDevanagari('No Devanagari here.')).toEqual(['No Devanagari here.']);
	});
});
