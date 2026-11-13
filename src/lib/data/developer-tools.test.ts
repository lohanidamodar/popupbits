import { describe, expect, it } from 'vitest';
import {
	developerTools,
	flagship,
	toolGroups,
	developerToolsCatalogue,
	toolSchema
} from './developer-tools.js';

describe('developer tools', () => {
	it('lists every tool once, with Karmashala as the flagship', () => {
		expect(developerTools.map((t) => t.slug)).toEqual([
			'karmashala',
			'kickstand',
			'beej',
			'agent-cli',
			'dictation',
			'voice-models',
			'speech-pipeline',
			'voicelab',
			'sshetu',
			'tilepad'
		]);
		expect(flagship.name).toBe('Karmashala');
		expect(flagship.license).toBe('Apache-2.0');
		expect(flagship.repo).toBe('https://github.com/lohanidamodar/karmashala');
	});

	it('marks Kickstand paid and everything else open source with a repository', () => {
		for (const t of developerTools) {
			if (t.slug === 'kickstand') {
				expect(t.paid).toBe(true);
				expect(t.page).toBe('/kickstand');
			} else {
				expect(t.paid).toBe(false);
				expect(t.license).toMatch(/^(MIT|Apache-2\.0|BSD-3-Clause)$/);
				expect(t.repo).toMatch(/^https:\/\/github\.com\//);
			}
		}
	});

	it('shows the flagship once, outside the groups', () => {
		const grouped = toolGroups.flatMap((g) => g.tools);
		expect(grouped).not.toContain(flagship);
		expect(grouped.length).toBe(developerTools.length - 1);
	});

	it('puts every tool in the developer-tools category of apps.json', () => {
		const entries = developerToolsCatalogue();
		expect(entries.every((e) => e.category === 'developer-tools')).toBe(true);
		expect(entries.find((e) => e.slug === 'kickstand')?.access).toBe('paid');
	});

	it('describes open source as SoftwareSourceCode and the paid kit as SoftwareApplication', () => {
		for (const t of developerTools) {
			const s = toolSchema(t) as Record<string, unknown>;
			if (t.paid) {
				expect(s['@type']).toBe('SoftwareApplication');
				expect(s.isAccessibleForFree).toBe(false);
			} else {
				expect(s['@type']).toBe('SoftwareSourceCode');
				expect(s.codeRepository).toBe(t.repo);
				expect(s.license).toBe(`https://spdx.org/licenses/${t.license}.html`);
			}
		}
	});
});
