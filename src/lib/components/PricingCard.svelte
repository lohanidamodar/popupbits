<script lang="ts">
	export let plan;
</script>

<div class="pricing-card {plan.popular ? 'popular' : ''}">
	{#if plan.popular}
		<div class="popular-badge">Most Popular</div>
	{/if}

	{#if plan.discount}
		<div class="discount-badge">{plan.discount}</div>
	{/if}

	<div class="pricing-header">
		<h3 class="plan-name">{plan.name}</h3>
		<p class="plan-description">{plan.description}</p>
	</div>

	<div class="pricing-details">
		<div class="price-container">
			{#if plan.originalPrice}
				<div class="original-price">{plan.originalPrice}</div>
			{/if}
			<div class="current-price">{plan.price}</div>
			<div class="price-duration">{plan.duration}</div>
		</div>

		{#if plan.hourlyRate}
			<div class="hourly-rate">{plan.hourlyRate}</div>
		{/if}
	</div>

	<div class="features-list">
		{#each plan.features as feature}
			<div class="feature">
				<svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
				<span>{feature}</span>
			</div>
		{/each}
	</div>

	<div class="pricing-cta">
		<a
			href={plan.cta.href}
			class="btn {plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg w-full"
		>
			{plan.cta.text}
		</a>
	</div>
</div>

<style>
	.pricing-card {
		position: relative;
		background: var(--white);
		border: 2px solid var(--gray-200);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		transition: all var(--transition-normal);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.pricing-card:hover {
		border-color: var(--primary-300);
		transform: translateY(-4px);
		box-shadow: var(--shadow-xl);
	}

	.pricing-card.popular {
		border-color: var(--primary-500);
		transform: scale(1.05);
		box-shadow: var(--shadow-2xl);
	}

	.pricing-card.popular:hover {
		transform: scale(1.05) translateY(-4px);
	}

	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
		color: var(--white);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.discount-badge {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: var(--success-500);
		color: var(--white);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		font-weight: 700;
	}

	.pricing-header {
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.plan-name {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.plan-description {
		color: var(--text-secondary);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.pricing-details {
		text-align: center;
		margin-bottom: var(--space-8);
		padding-bottom: var(--space-6);
		border-bottom: 1px solid var(--gray-200);
	}

	.price-container {
		margin-bottom: var(--space-2);
	}

	.original-price {
		font-size: 1rem;
		color: var(--text-secondary);
		text-decoration: line-through;
		margin-bottom: var(--space-1);
	}

	.current-price {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--primary-600);
		line-height: 1;
	}

	.price-duration {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin-top: var(--space-1);
	}

	.hourly-rate {
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-style: italic;
	}

	.features-list {
		flex: 1;
		margin-bottom: var(--space-8);
	}

	.feature {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}

	.feature:last-child {
		margin-bottom: 0;
	}

	.feature-icon {
		width: 20px;
		height: 20px;
		color: var(--success-500);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.feature span {
		color: var(--text-primary);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.pricing-cta {
		margin-top: auto;
	}

	.w-full {
		width: 100%;
	}

	@media (max-width: 768px) {
		.pricing-card.popular {
			transform: none;
		}

		.pricing-card.popular:hover {
			transform: translateY(-4px);
		}

		.current-price {
			font-size: 2rem;
		}
	}
</style>
