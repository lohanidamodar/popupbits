<script lang="ts">
	export let plan: {
		title: string;
		price: string;
		originalPrice?: string;
		per: string;
		description: string;
		features: string[];
		popular?: boolean;
	};
</script>

<div class="card relative" class:popular={plan.popular}>
	{#if plan.popular}
		<div
			class="absolute top-0 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-b-lg"
			style="background-color: var(--primary-color); color: white;"
		>
			Most Popular
		</div>
	{/if}
	<div class="p-6">
		<h3 class="text-xl font-bold mb-2">{plan.title}</h3>
		<p class="text-secondary mb-4">{plan.description}</p>
		<div class="mb-4">
			<span class="text-4xl font-bold">NPR {plan.price}</span>
			{#if plan.originalPrice}
				<span class="text-lg line-through text-secondary">NPR {plan.originalPrice}</span>
			{/if}
			<span class="text-secondary">/{plan.per}</span>
		</div>
		<ul class="space-y-2 mb-6">
			{#each plan.features as feature}
				<li class="flex items-center">
					<svg
						class="w-5 h-5 text-green-500 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						></path></svg
					>
					<span>{feature}</span>
				</li>
			{/each}
		</ul>
		<a href="/contact" class="btn btn-primary w-full">Choose Plan</a>
	</div>
</div>

<style>
	.popular {
		border: 2px solid var(--primary-color, #667eea);
		--tw-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.2), 0 4px 6px -4px rgba(102, 126, 234, 0.2);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
	}
</style>
