<script>
    import TopNavigation from '$lib/components/TopNavigation.svelte';
import '$lib/styles/main.scss';
</script>

<svelte:head>
    <title>PopupBits - Digital bits for your organization</title>
</svelte:head>

<main>
    <TopNavigation />
    <div class="content">
        <slot></slot>
    </div>
</main>

<style>
    .content {
        margin-top: 64px;
    }
</style>