<script lang="ts">
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Toggle theme">
	<Sun class="size-5 dark:hidden" />
	<Moon class="size-5 hidden dark:block" />
</Button>
