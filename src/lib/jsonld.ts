// JSON-LD for <svelte:head>, rendered with {@html}. "<" is escaped so no string
// in the data can close the script tag; the tag names are split so the
// template literal does not end the calling component's own script block.
export const jsonLd = (data: object) =>
	`<${'script'} type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</${'script'}>`;
