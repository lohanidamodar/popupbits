<script lang="ts">
	export let stat: string;
	export let label: string;
	export let description: string = '';
</script>

<div class="stat-card">
	<div class="stat-icon">
		<div class="stat-circle">
			<div class="stat-number">{stat}</div>
		</div>
		<div class="stat-glow"></div>
	</div>
	<div class="stat-label">{label}</div>
	{#if description}
		<div class="stat-description">{description}</div>
	{/if}
</div>

<style>
	.stat-card {
		text-align: center;
		padding: 2.5rem 2rem;
		background: white;
		border-radius: 1.5rem;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
		border-radius: 1.5rem 1.5rem 0 0;
	}

	.stat-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		border-color: #3b82f6;
	}

	.stat-card:hover .stat-glow {
		opacity: 1;
		transform: scale(1);
	}

	.stat-icon {
		position: relative;
		margin-bottom: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.stat-circle {
		position: relative;
		z-index: 2;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		border: 3px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.stat-card:hover .stat-circle {
		border-color: #3b82f6;
		background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--primary-blue);
		line-height: 1;
		transition: all 0.3s ease;
	}

	.stat-card:hover .stat-number {
		transform: scale(1.1);
	}

	.stat-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.8);
		width: 140px;
		height: 140px;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
		border-radius: 50%;
		opacity: 0;
		transition: all 0.4s ease;
	}

	.stat-label {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.stat-description {
		color: var(--text-secondary);
		font-size: 0.875rem;
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.stat-card {
			padding: 2rem 1.5rem;
		}

		.stat-circle {
			width: 100px;
			height: 100px;
		}

		.stat-number {
			font-size: 2rem;
		}

		.stat-glow {
			width: 120px;
			height: 120px;
		}

		.stat-label {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.stat-circle {
			width: 80px;
			height: 80px;
		}

		.stat-number {
			font-size: 1.75rem;
		}

		.stat-glow {
			width: 100px;
			height: 100px;
		}
	}
</style>
