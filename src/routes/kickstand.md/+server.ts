import { kickstandMarkdown } from '$lib/data/kickstand-markdown.js';

export const prerender = true;

export function GET() {
	return new Response(kickstandMarkdown(), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
	});
}
