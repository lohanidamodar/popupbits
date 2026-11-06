import { company } from '$lib/data/company.js';

export const prerender = true;

export function GET() {
	const body = `User-agent: *
Allow: /

Sitemap: ${company.url}/sitemap.xml
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
