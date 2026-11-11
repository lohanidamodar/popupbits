// WebMCP: read-only tools that an AI agent in the visitor's browser can call
// instead of scraping the page. The API is a W3C Web Machine Learning
// Community Group draft, behind a Chrome origin trial and flag in 2026, and it
// has moved from navigator.modelContext to document.modelContext, so both are
// feature-detected. Where neither exists this does nothing.
//
// Every tool reads the same catalogue as /apps.json. Nothing here writes,
// sends or signs in.
import { catalogue, type CatalogueApp } from './data/catalogue.js';
import { company } from './data/company.js';

type ToolResult = { content: { type: 'text'; text: string }[] };

type Tool = {
	name: string;
	description: string;
	inputSchema: object;
	annotations?: { readOnlyHint?: boolean };
	execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ModelContext = {
	registerTool: (tool: Tool, options?: { signal?: AbortSignal }) => unknown;
	unregisterTool?: (name: string) => void;
};

const text = (value: unknown): ToolResult => ({
	content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value) }]
});

function findApp(query: unknown): CatalogueApp | undefined {
	const q = String(query ?? '')
		.trim()
		.toLowerCase();
	if (!q) return undefined;
	const apps = catalogue().apps;
	const exact = apps.find((a) => a.slug === q || a.name.toLowerCase() === q);
	if (exact) return exact;
	// A partial name counts only when it picks out one app, so "a" finds nothing
	// rather than whichever app happens to be listed first.
	const partial = apps.filter((a) => a.name.toLowerCase().includes(q) || a.slug.includes(q));
	return partial.length === 1 ? partial[0] : undefined;
}

const appInput = {
	type: 'object',
	properties: {
		app: {
			type: 'string',
			description: 'The app name or slug, for example "Sanskrit" or "momo-pasal".'
		}
	},
	required: ['app']
};

const notFound = (app: unknown) =>
	text(`No app matches "${String(app)}". Call list_apps for the names and slugs.`);

const tools: Tool[] = [
	{
		name: 'list_apps',
		description: `List every app ${company.name} publishes, with its slug, tagline, platforms and status. Optionally filter by platform.`,
		inputSchema: {
			type: 'object',
			properties: {
				platform: {
					type: 'string',
					enum: ['Android', 'iOS', 'Web', 'Windows', 'macOS', 'Linux'],
					description: 'Only apps available on this platform.'
				}
			}
		},
		annotations: { readOnlyHint: true },
		execute: async ({ platform }) =>
			text(
				catalogue()
					.apps.filter((a) => !platform || a.platforms.includes(String(platform)))
					.map(({ name, slug, tagline, platforms, status, url }) => ({
						name,
						slug,
						tagline,
						platforms,
						status,
						url
					}))
			)
	},
	{
		name: 'get_app_details',
		description:
			'Everything the site knows about one app: description, platforms, store and download links, category, languages, privacy policy and account deletion page.',
		inputSchema: appInput,
		annotations: { readOnlyHint: true },
		execute: async ({ app }) => {
			const found = findApp(app);
			return found ? text(found) : notFound(app);
		}
	},
	{
		name: 'get_privacy_policy',
		description:
			"The URL of an app's privacy policy, and its account deletion page when it has one.",
		inputSchema: appInput,
		annotations: { readOnlyHint: true },
		execute: async ({ app }) => {
			const found = findApp(app);
			if (!found) return notFound(app);
			return text({
				app: found.name,
				privacyPolicyUrl: found.privacyPolicyUrl,
				accountDeletionUrl: found.accountDeletionUrl,
				note: found.privacyPolicyUrl
					? undefined
					: `No policy is published; ask ${company.contact.email}.`
			});
		}
	},
	{
		name: 'get_contact',
		description: `How to contact ${company.name}: email, phone, address and the contact page. Returns the details only; it sends nothing.`,
		inputSchema: { type: 'object', properties: {} },
		annotations: { readOnlyHint: true },
		execute: async () =>
			text({
				name: company.legalName,
				email: company.contact.email,
				phone: company.contact.phone,
				address: `${company.contact.address.street}, ${company.contact.address.city}, ${company.contact.address.country}`,
				timezone: company.contact.timezone,
				contactPage: `${company.url}/contact`
			})
	}
];

/** Registers the tools when the browser supports WebMCP. Returns a cleanup function. */
export function registerWebMcpTools(): () => void {
	if (typeof window === 'undefined') return () => {};
	const ctx =
		(document as unknown as { modelContext?: ModelContext }).modelContext ??
		(navigator as unknown as { modelContext?: ModelContext }).modelContext;
	if (!ctx || typeof ctx.registerTool !== 'function') return () => {};
	const controller = new AbortController();
	for (const tool of tools) {
		try {
			ctx.registerTool(tool, { signal: controller.signal });
		} catch (e) {
			console.warn(`WebMCP: could not register ${tool.name}`, e);
		}
	}
	return () => {
		controller.abort();
		for (const tool of tools) {
			try {
				ctx.unregisterTool?.(tool.name);
			} catch {
				// Already gone: the signal unregistered it.
			}
		}
	};
}
