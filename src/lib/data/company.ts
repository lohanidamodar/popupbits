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
		'We design and ship our own apps, and build the software Nepali businesses need to work with less admin: websites, order and lead tracking, daily accounts, custom apps and automation.',
	founder: 'Damodar Lohani',
	established: 2016,
	// The canonical host: popupbits.com redirects here.
	url: 'https://www.popupbits.com',
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
			'Shops, showrooms, clinics and offices lose customers to orders buried in chat, follow-ups nobody remembered and days that end without a clear count. We build the simple software that fixes that, starting with a free check-up and a fixed price.',
		capabilities: [
			'A website and Google listing customers can find',
			'Orders, inquiries and follow-ups in one place',
			'Sales matched against QR, wallet and cash payments',
			'Custom mobile, web and desktop apps',
			'Automation and AI that take repetitive work off your staff',
			'Training in Nepali, and code you own'
		]
	},
	seo: {
		defaultTitle: 'Popup Bits — a Kathmandu studio',
		defaultDescription:
			'Popup Bits is a Kathmandu studio shipping its own apps and building websites, order tracking, daily accounts and custom software for Nepali businesses.',
		ogImage: '/images/og-image.png',
		twitterHandle: '@lohanidamodar'
	}
} as const;

export type Company = typeof company;
