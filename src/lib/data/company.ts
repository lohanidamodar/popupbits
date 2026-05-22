export type SocialLinks = {
	github: string;
	youtube: string;
	linkedin: string;
	twitter: string;
	email: string;
};

export type CompanyStat = {
	value: string;
	label: string;
	description: string;
};

export const company = {
	name: 'Popup Bits',
	legalName: 'Popup Bits Pvt. Ltd.',
	tagline: 'A Kathmandu studio building apps for the way Nepal uses tech',
	description:
		'We design and build our own products — calendars, learning apps, games — and take on selected client work in Flutter, web, and platform engineering.',
	founder: 'Damodar Lohani',
	established: 2016,
	url: 'https://popupbits.com',
	contact: {
		email: 'popupbits@gmail.com',
		phone: '+977-9823341413',
		address: {
			street: 'Gaurighat',
			city: 'Kathmandu',
			zone: '8',
			country: 'Nepal'
		},
		timezone: 'Asia/Kathmandu (GMT+5:45)'
	},
	social: {
		github: 'https://github.com/lohanidamodar',
		youtube: 'https://www.youtube.com/c/reactbits',
		linkedin: 'https://linkedin.com/in/lohanidamodar',
		twitter: 'https://twitter.com/lohanidamodar',
		email: 'mailto:popupbits@gmail.com'
	} satisfies SocialLinks,
	stats: [
		{ value: '8+', label: 'Years shipping', description: 'building products since 2016' },
		{ value: '6', label: 'Products live', description: 'across Android and Web' },
		{ value: '50+', label: 'Projects shipped', description: 'studio + consulting work' },
		{ value: '2', label: 'Languages', description: 'English and Nepali (Devanagari)' }
	] satisfies CompanyStat[],
	consulting: {
		blurb:
			'We take on a small number of consulting engagements each year — usually Flutter app builds, design systems, or backend platform work.',
		capabilities: [
			'Flutter apps end-to-end',
			'Svelte / web platforms',
			'Firebase & Appwrite backends',
			'Design systems & UI engineering'
		]
	},
	seo: {
		defaultTitle: 'Popup Bits — a Kathmandu studio',
		defaultDescription:
			'Popup Bits is a Kathmandu-based software studio building apps like Mero Patro, Mero Nepali, SpellCraft, and Bhadama — and taking on selected client work.',
		ogImage: '/images/og-image.jpg',
		twitterHandle: '@lohanidamodar'
	}
} as const;

export type Company = typeof company;
