/** Days since the Unix epoch, in UTC, for the given moment. */
export const dayNumber = (now = Date.now()) => Math.floor(now / 86_400_000);

/**
 * The first `count` items of `items`, starting `day` places in and wrapping
 * around, so a list shown on consecutive days moves one place a day and every
 * item takes its turn at the front. An empty list stays empty.
 */
export function rotateByDay<T>(items: readonly T[], day: number, count = items.length): T[] {
	if (items.length === 0) return [];
	const offset = ((day % items.length) + items.length) % items.length;
	return [...items.slice(offset), ...items.slice(0, offset)].slice(0, count);
}
