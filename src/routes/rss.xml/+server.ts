// RSS 2.0 feed of the blog, for feed readers and tools that follow updates.
import { company } from '$lib/data/company.js';
import { posts } from '$lib/data/posts.js';

export const prerender = true;

const xml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

export function GET() {
	const items = posts
		.map((p) => {
			const url = `${company.url}/blog/${p.slug}`;
			return `		<item>
			<title>${xml(p.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${xml(p.description)}</description>
			<pubDate>${rfc822(p.date)}</pubDate>
			<dc:creator>${xml(p.author)}</dc:creator>
${p.tags.map((t) => `			<category>${xml(t)}</category>`).join('\n')}
		</item>`;
		})
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>${xml(company.name)} blog</title>
		<link>${company.url}/blog</link>
		<description>${xml('Notes from the Popup Bits studio: shipping apps, store submissions, and what we learn building for Nepal.')}</description>
		<language>en</language>
		<atom:link href="${company.url}/rss.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `		<lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ''}${items}
	</channel>
</rss>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
