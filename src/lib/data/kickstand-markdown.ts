// The Kickstand sales page as Markdown, built from the same data as the page,
// for AI agents and LLM tools (served at /kickstand.md and linked from
// /llms.txt).
import { company } from './company.js';
import {
	buildLog,
	byHandHours,
	faq,
	features,
	fileTree,
	launchOffer,
	packages,
	seller,
	tierIncludes,
	tiers
} from './kickstand.js';

export function kickstandMarkdown(): string {
	const price = (t: (typeof tiers)[number]) =>
		t.launchPrice === null
			? `$${t.price} USD`
			: `$${t.launchPrice} USD (launch price, normally $${t.price})`;
	const lines = [
		'# Kickstand: Flutter Starter Kit for Appwrite',
		'',
		'> A production-ready Flutter starter kit on Appwrite: auth, guest mode, paywall, settings, i18n, accessibility, tests and CI. It runs offline in demo mode before you configure anything, and you rebrand it from one file.',
		'',
		`Sales page: ${company.url}/kickstand`,
		'',
		'## What it includes',
		'',
		...features.map((f) => `- **${f.title}**: ${f.text}`),
		'',
		'## What it took to build',
		'',
		`- **By hand:** about ${byHandHours} hours of an experienced Flutter developer (our estimate).`,
		`- **With an AI agent:** about ${buildLog.aiHours} hours of developer time plus ~$${buildLog.aiTokenCost} of tokens (measured: what it took us with ${buildLog.model}).`,
		`- **Kickstand:** from $${Math.min(...tiers.map((t) => t.launchPrice ?? t.price))}, once, and you start on your own features today.`,
		'',
		'Estimated hours by hand:',
		'',
		...buildLog.byHand.map((p) => `- ${p.part}: ${p.hours} h`),
		'',
		`Measured: ${buildLog.measured.map((m) => `${m.value} ${m.label}`).join(', ')}.`,
		'',
		'## Licences and prices',
		'',
		'One-time payments in USD, checkout by Stripe.',
		launchOffer ? `Launch prices apply until ${launchOffer.until}.` : '',
		'',
		...tiers.map((t) => `- **${t.name}** (${t.seats}): ${price(t)}. Buy: ${t.href}`),
		'',
		'Both licences include:',
		'',
		...tierIncludes.map((i) => `- ${i}`),
		'',
		'The download link is emailed within 24 hours of payment.',
		'',
		'## Tech',
		'',
		'Flutter 3.47+ (Dart 3.13), Riverpod 3, go_router 18, appwrite 28 (TablesDB). Android, iOS and web. Appwrite Cloud or Appwrite 1.8+ for the backend mode.',
		'',
		'## Packages',
		'',
		...packages.map((p) => `- ${p.name} ${p.version}: ${p.role}`),
		'',
		'## Project layout',
		'',
		'```',
		fileTree,
		'```',
		'',
		'## FAQ',
		'',
		...faq.flatMap((item) => [`### ${item.q}`, '', item.a, '']),
		seller.legalName ? `Sold by ${seller.legalName}.` : '',
		seller.supportEmail ? `Support: ${seller.supportEmail}` : ''
	];
	return (
		lines
			.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			.trim() + '\n'
	);
}
