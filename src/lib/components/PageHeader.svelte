<script lang="ts">
	export let title: string = '';
</script>

<div>
	<h1>{title}</h1>
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;

		h1 {
			position: relative;
			overflow: hidden;
			padding-bottom: 1rem;
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
	}
</style>
