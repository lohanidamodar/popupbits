import { describe, expect, it } from 'vitest';
import { services, process, businessFaq } from './services.js';

describe('business services', () => {
	it('gives every offer a unique slug, deliverables and a timeline', () => {
		expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
		for (const s of services) {
			expect(s.deliverables.length).toBeGreaterThan(0);
			expect(s.timeline).not.toBe('');
		}
	});

	it('only shows a price when one is set and positive', () => {
		for (const s of services) {
			if (s.priceFromNpr !== null) expect(s.priceFromNpr).toBeGreaterThan(0);
		}
	});

	it('has a process and FAQ to show', () => {
		expect(process.length).toBeGreaterThan(0);
		expect(businessFaq.length).toBeGreaterThan(0);
	});
});
