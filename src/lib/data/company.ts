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
		'We design and ship our own products, and partner with businesses to build full-stack apps, custom SaaS platforms, AI-integrated systems, and the automation that runs them — on web, mobile, and desktop.',
	founder: 'Damodar Lohani',
	established: 2016,
	url: 'https://popupbits.com',
	contact: {
		email: 'info@popupbits.com.np',
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
		email: 'mailto:info@popupbits.com.np'
	} satisfies SocialLinks,
	stats: [
		{ value: '8+', label: 'Years shipping', description: 'building products since 2016' },
		{ value: '6', label: 'Products live', description: 'across Android and Web' },
		{ value: '50+', label: 'Projects shipped', description: 'studio + consulting work' },
		{ value: '2', label: 'Languages', description: 'English and Nepali (Devanagari)' }
	] satisfies CompanyStat[],
	consulting: {
		blurb:
			'We build end-to-end business solutions — full-stack apps on Node.js and PHP, custom SaaS platforms, AI-integrated products, and the automation that ties them together. One team, shipping on web, mobile, and desktop.',
		capabilities: [
			'Full-stack apps — Node.js & PHP stacks',
			'Custom SaaS platforms, end to end',
			'Mobile, web, and desktop applications',
			'AI-integrated products and workflows',
			'Business systems and process automation',
			'Integrations, APIs, and platform engineering'
		]
	},
	seo: {
		defaultTitle: 'Popup Bits — a Kathmandu studio',
		defaultDescription:
			'Popup Bits is a Kathmandu studio shipping its own apps and building full-stack platforms, SaaS, AI-integrated products, and business automation for clients across web, mobile, and desktop.',
		ogImage: '/images/og-image.jpg',
		twitterHandle: '@lohanidamodar'
	}
} as const;

export type Company = typeof company;
