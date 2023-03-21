<script lang="ts">
	export let title: string = '';
	export let subtitle: string|null;
</script>

<div>
	<h1>{title}</h1>
	{#if subtitle}
		<h2>{subtitle}</h2>
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		flex-direction: column;

		h1 {
			margin-bottom: 1rem;
			padding-bottom: 1rem;
			position: relative;
			overflow: hidden;
			&::after {
				content: '';
				height: 0.1em;
				background: var(--primary);
				width: 100%;
				margin-left: -100%;
				position: absolute;
				bottom: 0;
			}
		}

		h2 {
			font-weight: 500;
		}
	}
</style>
