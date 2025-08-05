<script lang="ts">
	export let icon: string = '';
	export let title: string = '';
	export let description: string = '';
	export let features: string[] = [];
</script>

<div class="service-card card">
	<div class="service-icon">
		{icon}
	</div>
	<h3 class="service-title">{title}</h3>
	<p class="service-description">{description}</p>
	{#if features.length > 0}
		<ul class="service-features">
			{#each features as feature}
				<li>{feature}</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.service-card {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.service-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 80px;
		background: var(--light-gray);
		border-radius: 50%;
		margin: 0 auto 1rem;
	}

	.service-title {
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.service-description {
		flex-grow: 1;
		margin-bottom: 1.5rem;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
	}

	.service-features li {
		color: var(--text-secondary);
		padding: 0.25rem 0;
		position: relative;
		padding-left: 1.5rem;
	}

	.service-features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success);
		font-weight: bold;
	}
</style>
