<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
</script>

<section class="page-header">
	<div class="page-header-bg">
		<div class="bg-pattern"></div>
		<div class="bg-gradient"></div>
	</div>
	<div class="container">
		<div class="page-header-content">
			<div class="page-header-text">
				<h1 class="page-title">
					<span class="title-text">{title}</span>
					<div class="title-accent"></div>
				</h1>
				{#if subtitle}
					<p class="page-subtitle">{subtitle}</p>
				{/if}
			</div>
		</div>
	</div>
	<div class="header-decoration">
		<div class="decoration-circle circle-1"></div>
		<div class="decoration-circle circle-2"></div>
		<div class="decoration-circle circle-3"></div>
	</div>
</section>

<style>
	.page-header {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		padding: 5rem 0 4rem;
		position: relative;
		overflow: hidden;
		min-height: 300px;
		display: flex;
		align-items: center;
	}

	.page-header-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.bg-pattern {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image:
			radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
			radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
	}

	.bg-gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
		backdrop-filter: blur(1px);
	}

	.page-header-content {
		position: relative;
		z-index: 2;
		text-align: center;
		width: 100%;
	}

	.page-header-text {
		max-width: 800px;
		margin: 0 auto;
	}

	.page-title {
		margin-bottom: 1.5rem;
		position: relative;
	}

	.title-text {
		font-size: 3.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1.1;
		display: block;
		position: relative;
	}

	.title-accent {
		width: 80px;
		height: 4px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
		border-radius: 2px;
		margin: 1rem auto 0;
		opacity: 0.8;
	}

	.page-subtitle {
		font-size: 1.375rem;
		color: var(--text-secondary);
		margin: 0;
		font-weight: 400;
		line-height: 1.5;
		opacity: 0.9;
	}

	.header-decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		pointer-events: none;
	}

	.decoration-circle {
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		animation: float 6s ease-in-out infinite;
	}

	.circle-1 {
		width: 120px;
		height: 120px;
		top: 20%;
		left: 10%;
		animation-delay: 0s;
	}

	.circle-2 {
		width: 80px;
		height: 80px;
		top: 60%;
		right: 15%;
		animation-delay: 2s;
	}

	.circle-3 {
		width: 100px;
		height: 100px;
		bottom: 20%;
		left: 20%;
		animation-delay: 4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}

	@media (max-width: 1024px) {
		.circle-1,
		.circle-2,
		.circle-3 {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 4rem 0 3rem;
			min-height: 250px;
		}

		.title-text {
			font-size: 2.75rem;
		}

		.page-subtitle {
			font-size: 1.25rem;
		}

		.title-accent {
			width: 60px;
			height: 3px;
		}
	}

	@media (max-width: 480px) {
		.page-header {
			padding: 3rem 0 2rem;
			min-height: 200px;
		}

		.title-text {
			font-size: 2.25rem;
		}

		.page-subtitle {
			font-size: 1.125rem;
		}

		.title-accent {
			width: 50px;
		}
	}
</style>
