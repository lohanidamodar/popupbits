<script lang="ts" module>
	// A run of Devanagari, allowing spaces, dandas and punctuation between words.
	const DEVANAGARI = /([ऀ-ॿ]+(?:[\s।॥,?!]+[ऀ-ॿ]+)*)/;

	/** Splits text into plain parts (even indexes) and Devanagari runs (odd indexes). */
	export const splitDevanagari = (text: string) => text.split(DEVANAGARI);
</script>

<script lang="ts">
	// Renders text with each Devanagari run in <span lang>, so screen readers,
	// search engines and fonts treat it as Nepali or Sanskrit, not English.
	let { text, lang = 'ne' }: { text: string; lang?: 'ne' | 'sa' } = $props();

	const parts = $derived(splitDevanagari(text));
</script>

{#each parts as part, i (i)}{#if i % 2 === 1}<span {lang}>{part}</span>{:else}{part}{/if}{/each}
