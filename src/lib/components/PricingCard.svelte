<script lang="ts">
	export let name: string;
	export let price: string;
	export let originalPrice: string = '';
	export let discount: string = '';
	export let description: string;
	export let features: string[];
	export let popular: boolean = false;
</script>

<div class="pricing-card card {popular ? 'popular' : ''}">
	{#if popular}
		<div class="popular-badge">Most Popular</div>
	{/if}

	{#if discount}
		<div class="discount-badge">{discount}</div>
	{/if}

	<div class="pricing-header">
		<h3 class="pricing-title">{name}</h3>
		<div class="pricing-price">
			<span class="price">{price}</span>
			{#if originalPrice}
				<span class="original-price">{originalPrice}</span>
			{/if}
		</div>
		<p class="pricing-description">{description}</p>
	</div>

	<ul class="pricing-features">
		{#each features as feature}
			<li>{feature}</li>
		{/each}
	</ul>

	<div class="pricing-action">
		<a href="/contact" class="btn {popular ? 'btn-primary' : 'btn-secondary'} btn-lg">
			Get Started
		</a>
	</div>
</div>

<style>
	.pricing-card {
		position: relative;
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		border: 2px solid var(--border-color);
	}

	.pricing-card.popular {
		border-color: var(--primary-blue);
		transform: scale(1.05);
		box-shadow: var(--shadow-xl);
	}

	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--primary-blue);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-lg);
		font-size: 0.875rem;
		font-weight: 600;
	}

	.discount-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--success);
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.pricing-header {
		padding: 2rem 2rem 1rem;
	}

	.pricing-title {
		color: var(--text-primary);
		margin-bottom: 1rem;
	}

	.pricing-price {
		margin-bottom: 1rem;
	}

	.price {
		font-size: 2rem;
		font-weight: 800;
		color: var(--primary-blue);
	}

	.original-price {
		font-size: 1.25rem;
		color: var(--text-muted);
		text-decoration: line-through;
		margin-left: 0.5rem;
	}

	.pricing-description {
		color: var(--text-secondary);
		margin-bottom: 0;
	}

	.pricing-features {
		list-style: none;
		padding: 0 2rem;
		margin: 0;
		text-align: left;
		flex-grow: 1;
	}

	.pricing-features li {
		color: var(--text-secondary);
		padding: 0.5rem 0;
		position: relative;
		padding-left: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.pricing-features li:last-child {
		border-bottom: none;
	}

	.pricing-features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--success);
		font-weight: bold;
	}

	.pricing-action {
		padding: 2rem;
		margin-top: auto;
	}

	@media (max-width: 768px) {
		.pricing-card.popular {
			transform: none;
		}
	}
</style>
