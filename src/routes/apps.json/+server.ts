// The app catalogue as JSON, for AI agents and other tools.
import { catalogue } from '$lib/data/catalogue.js';

export const prerender = true;

export function GET() {
	return new Response(JSON.stringify(catalogue(), null, '\t') + '\n', {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		}
	});
}
