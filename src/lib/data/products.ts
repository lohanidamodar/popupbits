export type ProductPlatform = 'web' | 'android' | 'ios';
export type ProductStatus = 'live' | 'beta' | 'pipeline';
export type ProductLinkKind = 'play' | 'web' | 'github' | 'other';

export type ProductLink = {
	label: string;
	href: string;
	kind: ProductLinkKind;
};

export type Product = {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	themeClass: string;
	platforms: ProductPlatform[];
	links: ProductLink[];
	screenshots: string[];
	tech: string[];
	status: ProductStatus;
	featured: boolean;
	year: number;
};

export const products: Product[] = [
	{
		slug: 'mero-patro',
		name: 'Mero Patro',
		tagline: 'The Nepali calendar, the way Nepalis use it.',
		description:
			'Mero Patro is a Nepali calendar (Bikram Sambat) with tithis, festivals, panchanga, and date conversion — built for everyday use in Nepal and the diaspora.',
		themeClass: 'theme-meropatro',
		platforms: ['web'],
		links: [{ label: 'Open Mero Patro', href: 'https://meropatro.purkha.org/', kind: 'web' }],
		screenshots: [],
		tech: ['Svelte', 'TypeScript', 'PWA'],
		status: 'live',
		featured: true,
		year: 2020
	},
	{
		slug: 'mero-nepali',
		name: 'Mero Nepali',
		tagline: 'Learn Nepali, designed for kids and absolute beginners.',
		description:
			'Mero Nepali teaches the Devanagari alphabet, numbers, and core vocabulary through bright, friendly lessons — for children and anyone starting fresh.',
		themeClass: 'theme-meronepali',
		platforms: ['android', 'web'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.meronepali',
				kind: 'play'
			},
			{ label: 'Visit Mero Nepali', href: 'https://www.meronepali.org/', kind: 'web' }
		],
		screenshots: [],
		tech: ['Flutter', 'Firebase'],
		status: 'live',
		featured: true,
		year: 2022
	},
	{
		slug: 'spellcraft',
		name: 'SpellCraft',
		tagline: 'A word-building game with a Nepali twist.',
		description:
			'SpellCraft turns spelling and word puzzles into a daily game — with bilingual support for English and Nepali wordlists.',
		themeClass: 'theme-spellcraft',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.spellcraft',
				kind: 'play'
			}
		],
		screenshots: [],
		tech: ['Flutter'],
		status: 'live',
		featured: true,
		year: 2023
	},
	{
		slug: 'bhadama',
		name: 'Bhadama',
		tagline: 'Rent, list, borrow — the local-first marketplace.',
		description:
			'Bhadama is a local rental and listing marketplace — tools, gear, and short-term items, neighbour to neighbour.',
		themeClass: 'theme-bhadama',
		platforms: ['android', 'web'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=app.bhadama.bhadama',
				kind: 'play'
			},
			{ label: 'Visit Bhadama', href: 'https://bhadama.app', kind: 'web' }
		],
		screenshots: [],
		tech: ['Flutter', 'Appwrite'],
		status: 'beta',
		featured: true,
		year: 2024
	},
	{
		slug: 'ui-challenges-flutter',
		name: 'UI Challenges — Flutter',
		tagline: '100+ open-source Flutter UI screens.',
		description:
			'A long-running open-source reference app with 100+ production-quality UI screens implemented in Flutter — used by thousands of developers learning the framework.',
		themeClass: 'theme-popupbits',
		platforms: ['android', 'ios'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.lohanidamodar.fluc',
				kind: 'play'
			},
			{
				label: 'iOS / Source on GitHub',
				href: 'https://github.com/lohanidamodar/flutter_ui_challenges',
				kind: 'github'
			}
		],
		screenshots: [],
		tech: ['Flutter', 'Open source'],
		status: 'live',
		featured: true,
		year: 2018
	}
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
