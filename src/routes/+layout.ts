// Every page is built from static data, so serve them all as prebuilt HTML:
// crawlers and agents get full content with no server round trip. Routes that
// need a server opt out with `export const prerender = false`.
export const prerender = true;
