export type ProductPlatform = 'web' | 'android' | 'ios';
export type ProductStatus = 'live' | 'beta' | 'pipeline' | 'coming-soon';
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
	iconSrc?: string;
	iconBgSrc?: string;
	privacyHref?: string;
	accountDeletionHref?: string;
	screenshots: string[];
	tech: string[];
	status: ProductStatus;
	featured: boolean;
	year: number;
};

export const products: Product[] = [
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
		iconSrc: '/products/bhadama/icon.png',
		screenshots: [],
		tech: ['Flutter', 'Appwrite'],
		status: 'beta',
		featured: true,
		year: 2024
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
				href: 'https://play.google.com/store/apps/details?id=dev.appwriters.mero_nepali',
				kind: 'play'
			},
			{ label: 'Visit Mero Nepali', href: 'https://www.meronepali.org/', kind: 'web' }
		],
		iconSrc: '/products/mero-nepali/icon.png',
		screenshots: [],
		tech: ['Flutter', 'Firebase'],
		status: 'live',
		featured: true,
		year: 2022
	},
	{
		slug: 'aakar',
		name: 'Aakar Launcher',
		tagline: 'A polished, fully customizable Android home launcher.',
		description:
			'Aakar is an Android home launcher built to fit anyone from grandparents to power users — clean defaults, deep customization where you want it.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.aakar',
				kind: 'play'
			}
		],
		iconSrc: '/products/aakar/icon-foreground.png',
		iconBgSrc: '/products/aakar/icon-background.png',
		privacyHref: '/contact/aakar-launcher-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Riverpod'],
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'achiver',
		name: 'Achiver',
		tagline: 'Pomodoro and project-based time tracking.',
		description:
			'Achiver pairs the Pomodoro technique with project time tracking — focus in timed sessions, then see exactly where your hours went. Sync across devices with your account.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.achiver',
				kind: 'play'
			}
		],
		iconSrc: '/products/achiver/icon.png',
		privacyHref: '/contact/achiver-privacy-policy',
		accountDeletionHref: '/contact/achiver-delete-account',
		screenshots: [],
		tech: ['Flutter', 'Appwrite', 'Riverpod', 'Drift'],
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'tipot',
		name: 'Tipot',
		tagline: 'Block-based notes and a calendar todo, in your pocket.',
		description:
			'Tipot is a compact pocket-capture app — Notion-style block notes and a calendar-driven todo list, woven together with linked contacts. Offline-first, with optional sync across your devices. Coming soon to the Play Store.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.tipot',
				kind: 'play'
			}
		],
		iconSrc: '/products/tipot/icon.png',
		privacyHref: '/contact/tipot-privacy-policy',
		accountDeletionHref: '/contact/tipot-delete-account',
		screenshots: [],
		tech: ['Flutter', 'Appwrite', 'Riverpod', 'SQLite'],
		status: 'coming-soon',
		featured: true,
		year: 2026
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
		iconSrc: '/products/spellcraft/icon.png',
		screenshots: [],
		tech: ['Flutter'],
		status: 'live',
		featured: true,
		year: 2023
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
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.flutteruichallenges',
				kind: 'play'
			},
			{
				label: 'iOS / Source on GitHub',
				href: 'https://github.com/lohanidamodar/flutter_ui_challenges',
				kind: 'github'
			}
		],
		iconSrc: '/products/ui-challenges-flutter/icon.png',
		privacyHref: '/contact/flutter-ui-challenges-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Open source'],
		status: 'live',
		featured: true,
		year: 2018
	},
	{
		slug: 'mero-patro',
		name: 'Mero Patro',
		tagline: 'The Nepali calendar, the way Nepalis use it.',
		description:
			'Mero Patro is a Nepali calendar (Bikram Sambat) with tithis, festivals, panchanga, and date conversion — built for everyday use in Nepal and the diaspora.',
		themeClass: 'theme-meropatro',
		platforms: ['web'],
		links: [{ label: 'Open Mero Patro', href: 'https://meropatro.purkha.org/', kind: 'web' }],
		iconSrc: '/products/mero-patro/icon.svg',
		screenshots: [],
		tech: ['Svelte', 'TypeScript', 'PWA'],
		status: 'live',
		featured: true,
		year: 2020
	}
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}

export const statusLabels: Record<ProductStatus, string> = {
	live: 'Live',
	beta: 'Beta',
	pipeline: 'Pipeline',
	'coming-soon': 'Coming soon'
};

export const platformLabels: Record<ProductPlatform, string> = {
	web: 'Web',
	android: 'Android',
	ios: 'iOS'
};
