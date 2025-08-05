<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
</script>

<section class="page-header">
	<div class="container">
		<div class="page-header-content">
			<h1 class="page-title">{title}</h1>
			{#if subtitle}
				<p class="page-subtitle">{subtitle}</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.page-header {
		background: linear-gradient(135deg, var(--light-gray) 0%, #e2e8f0 100%);
		padding: 4rem 0 3rem;
		position: relative;
		overflow: hidden;
	}

	.page-header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E");
	}

	.page-header-content {
		text-align: center;
		position: relative;
		z-index: 1;
		max-width: 700px;
		margin: 0 auto;
	}

	.page-title {
		font-size: 3rem;
		font-weight: 800;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-light));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
	}

	.page-subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin: 0;
		font-weight: 400;
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 3rem 0 2rem;
		}

		.page-title {
			font-size: 2.5rem;
		}

		.page-subtitle {
			font-size: 1.125rem;
		}
	}

	@media (max-width: 480px) {
		.page-title {
			font-size: 2rem;
		}

		.page-subtitle {
			font-size: 1rem;
		}
	}
</style>
