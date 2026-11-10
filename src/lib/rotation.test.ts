import { describe, expect, it } from 'vitest';
import { dayNumber, rotateByDay } from './rotation.js';

describe('rotateByDay', () => {
	const items = ['a', 'b', 'c', 'd', 'e'];

	it('keeps the catalogue order on day 0', () => {
		expect(rotateByDay(items, 0, 3)).toEqual(['a', 'b', 'c']);
	});

	it('moves one place a day and wraps around', () => {
		expect(rotateByDay(items, 1, 3)).toEqual(['b', 'c', 'd']);
		expect(rotateByDay(items, 4, 3)).toEqual(['e', 'a', 'b']);
		expect(rotateByDay(items, 5, 3)).toEqual(['a', 'b', 'c']);
	});

	it('gives every item a turn at the front over a full cycle', () => {
		const firsts = items.map((_, day) => rotateByDay(items, day, 3)[0]);
		expect(firsts.sort()).toEqual([...items].sort());
	});

	it('handles a count larger than the list, and an empty list', () => {
		expect(rotateByDay(items, 2, 10)).toEqual(['c', 'd', 'e', 'a', 'b']);
		expect(rotateByDay([], 3, 6)).toEqual([]);
	});

	it('counts days in UTC', () => {
		expect(dayNumber(Date.UTC(1970, 0, 2, 12))).toBe(1);
		expect(dayNumber(Date.UTC(2026, 10, 10))).toBe(20767);
	});
});
