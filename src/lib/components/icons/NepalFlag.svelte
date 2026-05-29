<script lang="ts">
	let { class: className = 'size-4' }: { class?: string } = $props();
</script>

<svg viewBox="0 0 48 58" class={className} aria-hidden="true">
	<polygon
		points="5,3 34,21 16,21 42,40 5,55"
		fill="#DC143C"
		stroke="#003893"
		stroke-width="3"
		stroke-linejoin="round"
	/>
	<circle cx="13" cy="14.5" r="3" fill="#fff" />
	<circle cx="13" cy="38" r="3.4" fill="#fff" />
</svg>
