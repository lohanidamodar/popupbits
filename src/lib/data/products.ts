export type ProductPlatform = 'web' | 'android' | 'ios' | 'linux' | 'macos' | 'windows';
export type ProductStatus = 'live' | 'beta' | 'pipeline' | 'coming-soon';
export type ProductLinkKind = 'play' | 'appstore' | 'web' | 'github' | 'release' | 'other';

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
	/** Site-relative path, or an absolute URL when the policy lives on the product's own domain. */
	privacyHref?: string;
	accountDeletionHref?: string;
	availableIn?: string;
	screenshots: string[];
	tech: string[];
	/** SPDX licence id of the public source. Its presence marks the product open source. */
	license?: string;
	status: ProductStatus;
	featured: boolean;
	year: number;
	/** When true, the product is excluded from all listings and its detail page 404s. */
	hidden?: boolean;
};

export const products: Product[] = [
	{
		slug: 'bhadama',
		name: 'Bhadama',
		tagline: 'Rent, list, borrow — the local-first marketplace.',
		description:
			'Bhadama is a local rental and listing marketplace — tools, gear, and short-term items, neighbour to neighbour.',
		themeClass: 'theme-bhadama',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=app.bhadama.bhadama',
				kind: 'play'
			}
		],
		iconSrc: '/products/bhadama/icon.png',
		availableIn: 'Nepal',
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
		platforms: ['android', 'ios', 'web'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=dev.appwriters.mero_nepali',
				kind: 'play'
			},
			{
				label: 'Get on App Store',
				href: 'https://apps.apple.com/us/app/mero-nepali-%E0%A4%AE-%E0%A4%B0-%E0%A4%A8-%E0%A4%AA-%E0%A4%B2/id6761828591',
				kind: 'appstore'
			},
			{ label: 'Visit Mero Nepali', href: 'https://www.meronepali.org/', kind: 'web' }
		],
		iconSrc: '/products/mero-nepali/icon.png',
		privacyHref: 'https://www.meronepali.org/privacy',
		screenshots: [],
		tech: ['Flutter', 'Flame', 'Riverpod'],
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
			'Tipot is a compact pocket-capture app — Notion-style block notes and a calendar-driven todo list, woven together with linked contacts. Offline-first, with optional sync across your devices.',
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
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'photoready',
		name: 'PhotoReady',
		tagline: 'Passport size photos for visa and ID, made offline on your phone.',
		description:
			'PhotoReady crops a portrait to the exact size a passport, visa or ID photo needs — background removed, face positioned to the document\u2019s own published rules, and print sheets ready for the counter. Everything runs on the device, with no account and no internet.',
		themeClass: 'theme-popupbits',
		platforms: ['android', 'ios'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.photoready',
				kind: 'play'
			},
			{
				label: 'Get on App Store',
				href: 'https://apps.apple.com/us/app/photoready-passport-size-photo/id6806537666',
				kind: 'appstore'
			},
			{
				label: 'Document specifications',
				href: 'https://github.com/lohanidamodar/document-photo-specs',
				kind: 'github'
			}
		],
		iconSrc: '/products/photoready/icon.png',
		privacyHref: '/contact/photoready-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'ML Kit', 'LiteRT', 'Riverpod'],
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'listora',
		name: 'Listora',
		tagline: 'Free public-domain audiobooks, powered by LibriVox.',
		description:
			'Listora is a free, open-source audiobook player backed by LibriVox and archive.org — thousands of public-domain titles to stream or download for offline listening.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.listora',
				kind: 'play'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/flutter_audiobooks_app',
				kind: 'github'
			}
		],
		iconSrc: '/products/listora/icon.png',
		privacyHref: '/contact/listora-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'just_audio', 'Riverpod'],
		license: 'GPL-3.0',
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'sanskrit',
		name: 'Sanskrit',
		tagline: 'Learn Sanskrit, the easy way.',
		description:
			'A friendly path into Sanskrit — vocabulary, basic grammar, and key sutras with clear translations. Designed for absolute beginners and works fully offline.',
		themeClass: 'theme-sanskrit',
		platforms: ['android', 'ios'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.sanskrit',
				kind: 'play'
			},
			{
				label: 'Get on App Store',
				href: 'https://apps.apple.com/us/app/sanskrit-grammar-sutras/id6806470563',
				kind: 'appstore'
			}
		],
		iconSrc: '/products/sanskrit/icon.png',
		privacyHref: '/contact/sanskrit-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Riverpod', 'Hive'],
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'sabdabhandar',
		name: 'Sabdabhandar',
		tagline: 'A modern Nepali dictionary, fully offline.',
		description:
			'A modern Nepali–Nepali dictionary with 128,000+ entries — smart search (including Romanized queries like "pani" → पानी), rich definitions with examples, etymology, synonyms and word families, TTS pronunciation, and a daily word puzzle. Fully offline, made for everyday use.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.sabdabhandar',
				kind: 'play'
			}
		],
		iconSrc: '/products/sabdabhandar/icon.png',
		privacyHref: '/contact/sabdabhandar-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'SQLite (FTS5)', 'TTS'],
		status: 'coming-soon',
		featured: true,
		year: 2026
	},
	{
		slug: 'sambandha',
		name: 'Sambandha',
		tagline: 'A rethinking of the contacts app.',
		description:
			'Sambandha is a rethinking of the phone contacts app — richer profiles, photos, birthdays in both BS and AD, QR-code exchange, and offline-first storage on your device. Bilingual and made for Nepal.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.sambandha',
				kind: 'play'
			}
		],
		iconSrc: '/products/sambandha/icon.png',
		privacyHref: '/contact/sambandha-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Riverpod', 'SQLite'],
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'karmakanda',
		name: 'Karmakanda',
		tagline: 'Step-by-step puja vidhi, with mantras and their meaning.',
		description:
			'Karmakanda (कर्मकाण्ड) walks you through puja vidhi step by step — each mantra with its Nepali meaning, item checklists, favourites and reading progress. Fully offline, with no account, ads or tracking.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.karmakanda',
				kind: 'play'
			}
		],
		iconSrc: '/products/karmakanda/icon.png',
		privacyHref: '/contact/karmakanda-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Riverpod', 'SQLite (FTS5)'],
		status: 'coming-soon',
		featured: true,
		year: 2026
	},
	{
		slug: 'jyotisha',
		name: 'Jyotisha',
		tagline: 'Kundali, dasha and panchanga, calculated on your phone.',
		description:
			'Jyotisha (ज्योतिष) calculates the kundali and its divisional charts, dashas, transits, varshaphal, kundali milan and muhurta, alongside the daily panchanga, the Bikram Sambat calendar and festivals — with saved records for a jyotishi’s clients. Fully offline, with no account, ads or tracking.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.jyotisha',
				kind: 'play'
			}
		],
		iconSrc: '/products/jyotisha/icon.png',
		privacyHref: '/contact/jyotisha-privacy-policy',
		screenshots: [],
		tech: ['Flutter', 'Riverpod', 'Swiss Ephemeris'],
		status: 'coming-soon',
		featured: true,
		year: 2026
	},
	{
		slug: 'gaadidesk',
		name: 'Gaadidesk',
		tagline: 'Sell more recondition vehicles with fewer missed follow-ups.',
		description:
			'Gaadidesk is a showroom management app for recondition vehicle dealers — inventory, buyer inquiries, follow-ups, documents, and financing in one place. Built for the way Nepali showrooms actually work.',
		themeClass: 'theme-popupbits',
		platforms: ['android'],
		links: [
			{
				label: 'Get on Play Store',
				href: 'https://play.google.com/store/apps/details?id=com.popupbits.gaadidesk',
				kind: 'play'
			},
			{
				label: 'Visit gaadidesk.com',
				href: 'https://atktm.com/gaadidesk',
				kind: 'web'
			}
		],
		iconSrc: '/products/gaadidesk/icon.svg',
		privacyHref: '/contact/gaadidesk-privacy-policy',
		availableIn: 'Nepal',
		screenshots: [],
		tech: ['Flutter', 'Riverpod'],
		status: 'coming-soon',
		featured: true,
		year: 2026
	},
	{
		slug: 'typer-kids',
		name: 'Typer Kids',
		tagline: 'A colorful typing tutor for kids.',
		description:
			'A fun, colorful typing tutor built with Flutter — structured lessons and arcade-style games to help kids learn touch typing. Free and open source (GPLv3), with builds for Linux, macOS, and Windows.',
		themeClass: 'theme-popupbits',
		platforms: ['linux', 'macos', 'windows'],
		links: [
			{
				label: 'Download (latest)',
				href: 'https://github.com/lohanidamodar/typer_kids/releases/latest',
				kind: 'release'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/typer_kids',
				kind: 'github'
			}
		],
		iconSrc: '/products/typer-kids/icon.png',
		screenshots: [],
		tech: ['Flutter'],
		license: 'GPL-3.0',
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'tilepad',
		name: 'Tilepad',
		tagline: 'An open-source alternative to Touch Portal.',
		description:
			'Build your own touch deck — a Tilepad server runs on your desktop while the client on your phone gives you a fully customizable grid of tiles for shortcuts, media controls, and macros. Cross-platform, free, and BSD-3 licensed.',
		themeClass: 'theme-popupbits',
		platforms: ['windows', 'linux', 'android'],
		links: [
			{
				label: 'Download (latest)',
				href: 'https://github.com/lohanidamodar/tilepad/releases/latest',
				kind: 'release'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/tilepad',
				kind: 'github'
			}
		],
		iconSrc: '/products/tilepad/icon.png',
		screenshots: [],
		tech: ['Flutter'],
		license: 'BSD-3-Clause',
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'sshetu',
		name: 'SSHetu',
		tagline: 'SSH client, terminal, SFTP and tunnels for every device.',
		description:
			'SSHetu keeps your servers in one place and connects to them from a phone, a tablet or a desktop — a real terminal, an SFTP file browser, port forwarding, and SSH keys generated on the device. No backend and no account: hosts and keys stay in the OS keychain, move to a second device over your own network, and back up to an encrypted file you keep. Named from सेतु (setu), a bridge. Free and open source (MIT).',
		themeClass: 'theme-popupbits',
		platforms: ['android', 'windows', 'macos', 'linux'],
		links: [
			{
				label: 'Android',
				href: 'https://github.com/popupbits/sshetu/releases/latest',
				kind: 'release'
			},
			{
				label: 'Windows',
				href: 'https://github.com/popupbits/sshetu/releases/latest',
				kind: 'release'
			},
			{
				label: 'macOS',
				href: 'https://github.com/popupbits/sshetu/releases/latest',
				kind: 'release'
			},
			{
				label: 'Linux',
				href: 'https://github.com/popupbits/sshetu/releases/latest',
				kind: 'release'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/popupbits/sshetu',
				kind: 'github'
			}
		],
		iconSrc: '/products/sshetu/icon.png',
		screenshots: [],
		tech: ['Flutter'],
		license: 'MIT',
		status: 'live',
		featured: true,
		year: 2026
	},
	{
		slug: 'karmashala',
		name: 'Karmashala',
		tagline: 'An agent development environment for Claude Code, Codex and Antigravity.',
		description:
			'Karmashala (कर्मशाला, the hall where the work is done) runs coding-agent CLIs — Claude Code, Codex and Antigravity — on your desktop, on a server, or both, and lets you follow them from your phone. Embedded terminals and chat, an editor and file explorer, per-turn checkpoints, device and browser tooling, and an MCP server of its own. Free and open source (Apache-2.0).',
		themeClass: 'theme-popupbits',
		platforms: ['windows', 'macos', 'linux', 'android'],
		// Server-only point releases ship without app builds, so link the full
		// releases list rather than /releases/latest.
		links: [
			{
				label: 'Windows',
				href: 'https://github.com/lohanidamodar/karmashala/releases',
				kind: 'release'
			},
			{
				label: 'macOS',
				href: 'https://github.com/lohanidamodar/karmashala/releases',
				kind: 'release'
			},
			{
				label: 'Linux',
				href: 'https://github.com/lohanidamodar/karmashala/releases',
				kind: 'release'
			},
			{
				label: 'Android',
				href: 'https://github.com/lohanidamodar/karmashala/releases',
				kind: 'release'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/karmashala',
				kind: 'github'
			}
		],
		iconSrc: '/products/karmashala/icon.png',
		screenshots: [],
		tech: ['Flutter'],
		license: 'Apache-2.0',
		status: 'live',
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
		privacyHref: '/contact/spellcraft-privacy-policy',
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
				label: 'Get on App Store',
				href: 'https://apps.apple.com/np/app/flutter-ui-challenges/id1473537882',
				kind: 'appstore'
			},
			{
				label: 'Source on GitHub',
				href: 'https://github.com/lohanidamodar/flutter_ui_challenges',
				kind: 'github'
			}
		],
		iconSrc: '/products/ui-challenges-flutter/icon.png',
		privacyHref: '/contact/flutter-ui-challenges-privacy-policy',
		screenshots: [],
		tech: ['Flutter'],
		license: 'MIT',
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
		year: 2020,
		hidden: true
	}
];

export const visibleProducts = products.filter((p) => !p.hidden);
export const featuredProducts = visibleProducts.filter((p) => p.featured);

export const isOpenSource = (p: Product): boolean => p.license !== undefined;

export function getProductBySlug(slug: string): Product | undefined {
	const product = products.find((p) => p.slug === slug);
	return product?.hidden ? undefined : product;
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
	ios: 'iOS',
	linux: 'Linux',
	macos: 'macOS',
	windows: 'Windows'
};
