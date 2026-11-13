// The developer tools Popup Bits publishes, shown on /developers and listed in
// /apps.json and llms.txt. Karmashala is the flagship.
//
// Facts come from docs/PROJECTS.md in the PopupBits hub and the GitHub API
// (visibility, licence, releases) as of 2026-11-13. Tools that are also
// products take their name, tagline and description from products.ts, so the
// two pages cannot disagree.
import { getProductBySlug, platformLabels, type Product } from './products.js';
import { absoluteUrl } from '../seo.js';

export type ToolKind = 'app' | 'cli' | 'package' | 'template';

export type ToolGroup = 'agents' | 'flutter' | 'speech' | 'desktop';

export const groupLabels: Record<ToolGroup, string> = {
	agents: 'Coding agents',
	flutter: 'Flutter',
	speech: 'Speech, on your own machine',
	desktop: 'Desktop and devices'
};

export const kindLabels: Record<ToolKind, string> = {
	app: 'App',
	cli: 'CLI',
	package: 'Dart package',
	template: 'Starter kit'
};

type ToolSource = {
	slug: string;
	group: ToolGroup;
	kind: ToolKind;
	/** A product in products.ts this tool is; its copy and links are used. */
	product?: string;
	name?: string;
	tagline?: string;
	description?: string;
	/** SPDX id for open source; null for a paid product. */
	license?: string | null;
	repo?: string;
	releases?: string;
	platforms?: string[];
	/** Something the reader should know before using it, shown under the description. */
	note?: string;
};

export type DeveloperTool = {
	slug: string;
	group: ToolGroup;
	kind: ToolKind;
	name: string;
	tagline: string;
	description: string;
	license: string | null;
	paid: boolean;
	repo: string | null;
	releases: string | null;
	/** The tool's page on this site, when it has one. */
	page: string | null;
	iconSrc: string | null;
	platforms: string[];
	note: string | null;
};

const gh = (repo: string) => `https://github.com/${repo}`;

const MODEL_NOTE =
	'The code is MIT. Speech models are never bundled: they download from their publishers, under their own licences, and some of those are not open source. The licence is shown before anything downloads.';

const sources: ToolSource[] = [
	{
		slug: 'karmashala',
		group: 'agents',
		kind: 'app',
		product: 'karmashala',
		repo: 'lohanidamodar/karmashala',
		releases: `${gh('lohanidamodar/karmashala')}/releases`
	},
	{
		slug: 'kickstand',
		group: 'flutter',
		kind: 'template',
		product: 'kickstand',
		license: null,
		// products.ts still says the download link is emailed; kickstand.ts (the
		// sales page) says buyers get a GitHub invitation. This follows kickstand.ts.
		description:
			'A production-ready Flutter starter: onboarding, email and guest sign-in, account deletion, a store-ready paywall, settings, English and Spanish, 45 tests and CI. It runs offline in demo mode before you configure anything, and you rebrand it from one file. Solo licence for one developer, Team for up to 10. Checkout is by Stripe, and within 24 hours you get an invitation to the private repository on GitHub.'
	},
	{
		slug: 'beej',
		group: 'flutter',
		kind: 'cli',
		name: 'beej',
		tagline: 'Plant a new Flutter app from one command.',
		description:
			'बीज, a seed: a Dart CLI that generates a complete, buildable Flutter project from the stack every Popup Bits app uses: material_ui, Riverpod 3, English and Nepali localisation, a working theme and settings, and the About screens wired in. It prompts a person, or takes a spec file and publishes a JSON Schema for agents to write against. A generated matrix runs flutter analyze and flutter test on every combination it can produce.',
		license: 'MIT',
		repo: 'lohanidamodar/beej'
	},
	{
		slug: 'agent-cli',
		group: 'agents',
		kind: 'package',
		name: 'agent_cli',
		tagline: 'Use the coding agents already on a machine as an LLM backend.',
		description:
			'Finds and drives the AI coding CLIs already installed, Claude Code, Codex and Gemini CLI, on the host and inside WSL. Someone using one has already signed in, so an app can use it with no API key. Claude Code and Codex are verified end to end; Gemini CLI follows its documented interface and has not been run.',
		license: 'MIT',
		repo: 'lohanidamodar/agent_cli',
		note: 'The README states the cost: seconds to the first word through a coding CLI, against milliseconds from a local llama.cpp server.'
	},
	{
		slug: 'dictation',
		group: 'speech',
		kind: 'app',
		name: 'Dictation',
		tagline: 'Hold a hotkey, speak, and the words are typed where your cursor is.',
		description:
			'Local, offline speech recognition on Windows, in pure Dart over Win32: no Flutter and no cloud. It compiles to a small exe, and every release has an installer and a portable zip.',
		license: 'MIT',
		repo: 'lohanidamodar/dictation',
		releases: `${gh('lohanidamodar/dictation')}/releases`,
		platforms: ['Windows'],
		note: MODEL_NOTE
	},
	{
		slug: 'voice-models',
		group: 'speech',
		kind: 'package',
		name: 'voice-models',
		tagline: 'One shared store for speech models, downloaded once per machine.',
		description:
			'Speech models are hundreds of megabytes each, and several apps need the same ones. voice-models keeps them in one place per machine, checks every download before using it, and records each model’s upstream source and licence.',
		license: 'MIT',
		repo: 'lohanidamodar/voice-models',
		note: MODEL_NOTE
	},
	{
		slug: 'speech-pipeline',
		group: 'speech',
		kind: 'package',
		name: 'speech-pipeline',
		tagline: 'Streaming speech-to-speech in Dart: VAD, STT, LLM, TTS.',
		description:
			'A voice assistant pipeline built on Dart isolates and streams. Voice detection, recognition and synthesis run locally through sherpa-onnx, a second path answers in a cloned voice, and the language model can be local (llama.cpp, Ollama) or any of a catalogue of cloud providers. English, Nepali and Sanskrit.',
		license: 'MIT',
		repo: 'lohanidamodar/speech-pipeline',
		note: MODEL_NOTE
	},
	{
		slug: 'voicelab',
		group: 'speech',
		kind: 'app',
		name: 'Voicelab',
		tagline: 'A Flutter client for speech-pipeline.',
		description:
			'A Flutter app that runs speech-pipeline, generated with beej. Builds are attached to its GitHub releases.',
		license: 'MIT',
		repo: 'lohanidamodar/voicelab',
		releases: `${gh('lohanidamodar/voicelab')}/releases`
	},
	{
		slug: 'sshetu',
		group: 'desktop',
		kind: 'app',
		product: 'sshetu',
		repo: 'popupbits/sshetu',
		releases: `${gh('popupbits/sshetu')}/releases`
	},
	{
		slug: 'tilepad',
		group: 'desktop',
		kind: 'app',
		product: 'tilepad',
		repo: 'lohanidamodar/tilepad',
		releases: `${gh('lohanidamodar/tilepad')}/releases`
	}
];

function resolve(s: ToolSource): DeveloperTool {
	const p: Product | undefined = s.product ? getProductBySlug(s.product) : undefined;
	if (s.product && !p) throw new Error(`developer-tools: no product "${s.product}"`);
	const license = s.license !== undefined ? s.license : (p?.license ?? null);
	return {
		slug: s.slug,
		group: s.group,
		kind: s.kind,
		name: s.name ?? p!.name,
		tagline: s.tagline ?? p!.tagline,
		description: s.description ?? p!.description,
		license,
		paid: license === null,
		repo: s.repo ? gh(s.repo) : null,
		releases: s.releases ?? null,
		page: p ? (p.pageHref ?? `/products/${p.slug}`) : null,
		iconSrc: p?.iconSrc ?? null,
		platforms: s.platforms ?? p?.platforms.map((x) => platformLabels[x]) ?? [],
		note: s.note ?? null
	};
}

export const developerTools: DeveloperTool[] = sources.map(resolve);

export const flagship = developerTools.find((t) => t.slug === 'karmashala')!;

/** Every tool but the flagship, grouped in display order. */
export const toolGroups = (Object.keys(groupLabels) as ToolGroup[])
	.map((group) => ({
		group,
		label: groupLabels[group],
		tools: developerTools.filter((t) => t.group === group && t !== flagship)
	}))
	.filter((g) => g.tools.length > 0);

/** The tools in /apps.json form. */
export const developerToolsCatalogue = () =>
	developerTools.map((t) => ({
		name: t.name,
		slug: t.slug,
		category: 'developer-tools',
		kind: t.kind,
		tagline: t.tagline,
		description: t.description,
		access: t.paid ? 'paid' : 'open-source',
		license: t.license,
		repository: t.repo,
		releases: t.releases,
		url: t.page ? absoluteUrl(t.page) : absoluteUrl(`/developers#${t.slug}`),
		platforms: t.platforms
	}));

/**
 * schema.org for one tool: SoftwareSourceCode for open source, with the app it
 * builds as targetProduct; SoftwareApplication for the paid starter kit.
 */
export function toolSchema(t: DeveloperTool) {
	const url = t.page ? absoluteUrl(t.page) : absoluteUrl(`/developers#${t.slug}`);
	const app = {
		'@type': 'SoftwareApplication',
		name: t.name,
		description: t.description,
		url,
		applicationCategory: 'DeveloperApplication',
		...(t.platforms.length > 0 ? { operatingSystem: t.platforms.join(', ') } : {}),
		...(t.releases ? { downloadUrl: t.releases } : {})
	};
	if (t.paid) return { ...app, isAccessibleForFree: false };
	return {
		'@type': 'SoftwareSourceCode',
		name: t.name,
		description: t.description,
		url,
		codeRepository: t.repo,
		license: `https://spdx.org/licenses/${t.license}.html`,
		programmingLanguage: 'Dart',
		isAccessibleForFree: true,
		...(t.kind === 'app' ? { targetProduct: app } : {})
	};
}
