import { company } from '$lib/data/company.js';

export const prerender = true;

// AI crawlers are allowed: the site exists to be found, by people and by the
// tools they ask. "User-agent: *" already allows them; the named groups make
// the policy explicit, and a crawler that matches a named group reads only
// that group, so each one repeats the Allow.
const aiCrawlers = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'anthropic-ai',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
	'meta-externalagent',
	'Amazonbot',
	'DuckAssistBot',
	'MistralAI-User'
];

export function GET() {
	const body = `User-agent: *
Allow: /

# AI crawlers and assistants: allowed.
${aiCrawlers.map((ua) => `User-agent: ${ua}`).join('\n')}
Allow: /

Sitemap: ${company.url}/sitemap.xml

# For AI agents and LLM tools:
# ${company.url}/llms.txt       site map in Markdown
# ${company.url}/llms-full.txt  every product page in one Markdown file
# ${company.url}/apps.json      the app catalogue as JSON
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
