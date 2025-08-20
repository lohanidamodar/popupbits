<script lang="ts">
	export let service: {
		icon: string;
		title: string;
		description: string;
		features: string[];
	};
</script>

<div class="service-card">
	<div class="service-icon">
		<span class="icon-emoji">{service.icon}</span>
		<div class="icon-glow"></div>
	</div>
	<h3 class="service-title">{service.title}</h3>
	<p class="service-description">{service.description}</p>
	{#if service.features.length > 0}
		<ul class="service-features">
			{#each service.features as feature}
				<li>
					<svg
						class="check-icon"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="20,6 9,17 4,12"></polyline>
					</svg>
					{feature}
				</li>
			{/each}
		</ul>
	{/if}
	<div class="card-accent"></div>
</div>

<style>
	.service-card {
		background: white;
		border-radius: 1.5rem;
		padding: 2.5rem 2rem;
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		border: 1px solid #e2e8f0;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.service-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
		border-color: #3b82f6;
	}

	.service-card:hover .icon-glow {
		opacity: 1;
		transform: scale(1);
	}

	.service-card:hover .card-accent {
		width: 100%;
	}

	.service-icon {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 80px;
		margin: 0 auto 2rem;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border-radius: 20px;
		border: 1px solid #e2e8f0;
	}

	.icon-emoji {
		font-size: 2.5rem;
		position: relative;
		z-index: 2;
	}

	.icon-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.8);
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
		border-radius: inherit;
		opacity: 0;
		transition: all 0.4s ease;
	}

	.service-title {
		color: var(--text-primary);
		margin-bottom: 1rem;
		font-size: 1.375rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.service-description {
		flex-grow: 1;
		margin-bottom: 2rem;
		color: var(--text-secondary);
		line-height: 1.6;
		font-size: 1rem;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.service-features li {
		color: var(--text-secondary);
		position: relative;
		padding-left: 2rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.check-icon {
		color: var(--success);
		flex-shrink: 0;
		position: absolute;
		left: 0;
	}

	.card-accent {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 3px;
		width: 0;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		border-radius: 2px 2px 0 0;
		transition: width 0.4s ease;
	}

	@media (max-width: 768px) {
		.service-card {
			padding: 2rem 1.5rem;
		}

		.service-icon {
			width: 70px;
			height: 70px;
			border-radius: 16px;
		}

		.icon-emoji {
			font-size: 2rem;
		}

		.service-title {
			font-size: 1.25rem;
		}
	}
</style>
