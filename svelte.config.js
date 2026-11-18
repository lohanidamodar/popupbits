import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

// Vercel sets VERCEL=1 during its builds. Everywhere else (Appwrite Sites,
// local `bun run build`) the site builds as a Node server into ./build.
const adapter = process.env.VERCEL
	? vercelAdapter({ runtime: 'nodejs22.x' })
	: nodeAdapter({ out: 'build' });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter
	}
};

export default config;
