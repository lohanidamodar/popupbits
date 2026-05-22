import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	if (path === '/projects' || path === '/projects/') {
		throw redirect(308, '/products');
	}
	if (path.startsWith('/projects/')) {
		throw redirect(308, '/products/' + path.slice('/projects/'.length));
	}

	return resolve(event);
};
