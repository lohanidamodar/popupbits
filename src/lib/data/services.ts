// What Popup Bits offers Nepali businesses, written around the problem each
// offer solves rather than the technology behind it. Shown on /for-business.

export type Service = {
	slug: string;
	/** The problem, in the owner's words. */
	problem: string;
	title: string;
	summary: string;
	/** What the business has at the end. */
	deliverables: string[];
	timeline: string;
	/**
	 * A "starting from" price in NPR. Null until a real price is set: the page
	 * then says the quote is fixed after a free call, rather than showing a guess.
	 */
	priceFromNpr: number | null;
};

export const services: Service[] = [
	{
		slug: 'get-found-online',
		problem: 'Customers can only find us on Facebook.',
		title: 'Website and Google listing',
		summary:
			'A fast website in English and Nepali that you own, and a Google Business Profile, so people searching for you find your hours, location and phone number, and a page to send your Facebook followers to.',
		deliverables: [
			'A bilingual website that loads fast on mobile data',
			'Google Business Profile set up and verified',
			'Call, Viber and map buttons on every page',
			'A short handover so your staff can update it'
		],
		timeline: '2–3 weeks',
		priceFromNpr: null
	},
	{
		slug: 'orders-and-leads',
		problem: 'Orders and inquiries get lost in Messenger, Viber and notebooks.',
		title: 'Orders and leads in one place',
		summary:
			'One simple app, on the phone and the shop computer, for every inquiry, order and follow-up, so nobody has to remember who to call back. The same idea behind Gaadidesk, our app for vehicle showrooms.',
		deliverables: [
			'A list of every inquiry and order, with its status',
			'Follow-up reminders for your staff',
			'A daily view for the owner: what came in, what closed',
			'Training for your team, in Nepali'
		],
		timeline: '3–6 weeks',
		priceFromNpr: null
	},
	{
		slug: 'daily-accounts',
		problem: 'At the end of the day we do not know what we actually sold.',
		title: 'Sales and payments, matched every day',
		summary:
			'Sales recorded as they happen and matched against QR, wallet and cash payments, so the day closes with one clear summary instead of an evening with the statements.',
		deliverables: [
			'Sales entry that works on a phone at the counter',
			'Payments matched from Fonepay, eSewa, Khalti and bank statements',
			'A daily and monthly summary the owner can read at a glance',
			'Exports your accountant can use'
		],
		timeline: '4–8 weeks',
		priceFromNpr: null
	},
	{
		slug: 'custom-software',
		problem: 'Nothing off the shelf fits how we work.',
		title: 'Your own app or automation',
		summary:
			'When ready-made software does not fit, we build what does: a mobile app for your customers, a web system for your team, or automation, including AI, that takes repetitive work off your staff.',
		deliverables: [
			'A fixed scope and price agreed before work starts',
			'Android, iOS, web or desktop, whichever your users need',
			'Source code and accounts handed over to you',
			'Support after launch, on terms agreed up front'
		],
		timeline: 'Depends on scope',
		priceFromNpr: null
	}
];

export type Step = { title: string; text: string };

export const process: Step[] = [
	{
		title: 'Free check-up',
		text: 'A 30-minute call or visit. We look at how you work today and where time or money is lost. No cost, no obligation.'
	},
	{
		title: 'Fixed quote',
		text: 'A written scope with one price and a timeline. If it is not worth building, we will say so.'
	},
	{
		title: 'Build in small steps',
		text: 'You see working software every week or two, so you can change course early.'
	},
	{
		title: 'Train and hand over',
		text: 'We train your staff in Nepali and hand over the code and accounts. You own what you paid for.'
	}
];

export type Faq = { question: string; answer: string };

export const businessFaq: Faq[] = [
	{
		question: 'How much does it cost?',
		answer:
			'It depends on what you need, so every project gets a fixed written quote after a free check-up. You know the full price before any work starts.'
	},
	{
		question: 'We are a small business. Is this for us?',
		answer:
			'Yes. Most of our offers are sized for shops, showrooms, clinics and small offices. We start with the one problem costing you the most, not a big system.'
	},
	{
		question: 'Who looks after it after launch?',
		answer:
			'We do, on support terms agreed before the project starts. You also get the code and accounts, so you are never locked in to us.'
	},
	{
		question: 'Will my staff be able to use it?',
		answer:
			'We design for the people who will use it every day, and train them in Nepali. If something is hard to use, that is ours to fix.'
	},
	{
		question: 'Does it work when the internet is slow or down?',
		answer:
			'Where it matters, yes. Many of our own apps work fully offline and sync when the connection is back.'
	},
	{
		question: 'Can you work with the software we already use?',
		answer:
			'Usually. We connect to existing tools, spreadsheets and payment providers where they allow it, rather than asking you to replace everything.'
	}
];
