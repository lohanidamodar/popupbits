<script lang="ts">
	export let stat: string;
	export let label: string;
	export let description: string = '';
</script>

<div class="stat-card">
	<div class="stat-number">{stat}</div>
	<div class="stat-label">{label}</div>
	{#if description}
		<div class="stat-description">{description}</div>
	{/if}
</div>

<style>
	.stat-card {
		text-align: center;
		padding: 2rem 1rem;
	}

	.stat-number {
		font-size: 3rem;
		font-weight: 800;
		color: var(--primary-blue);
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.stat-description {
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.stat-number {
			font-size: 2.5rem;
		}

		.stat-card {
			padding: 1.5rem 1rem;
		}
	}
</style>
