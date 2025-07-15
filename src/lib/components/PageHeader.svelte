<script>
	export let title = '';
	export let subtitle = '';
</script>

<header style="margin-bottom:2rem; text-align:center;">
	<h1 style="font-size:2rem; font-weight:700;">{title}</h1>
	{#if subtitle}
		<p style="color:#666;">{subtitle}</p>
	{/if}
</header>
