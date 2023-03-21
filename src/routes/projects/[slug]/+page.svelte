<script lang="ts">
	import PageHeader from "$lib/components/PageHeader.svelte";
	import Project from "$lib/components/Project.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<PageHeader title={data.title} subtitle={data.tech} />

<div class="container">
    <div class="image">
		<img
			width="1920"
			height="1080"
			src="{data.image}"
			alt=""
		/>
	</div>
    <p>{data.description}</p>

    <div class="links">
        {#if data.github}
            <a class="btn" href="{data.github}" target="_blank">GitHub</a>
        {/if}
        {#if data.web}
            <a class="btn" href="{data.web}" target="_blank">Web</a>
        {/if}
        {#if data.playStore}
            <a class="btn" href="{data.playStore}" target="_blank">Play Store</a>
        {/if}
        {#if data.appStore}
            <a class="btn" href="{data.appStore}" target="_blank">App Store</a>
        {/if}
    </div>
</div>

<style lang="scss">
.image {
	    width: 100%;
		height: 550px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		background-color: #e9ecef;
	}
	img {
		width: 1000px;
		height: auto;
		margin-left: auto;
		margin-right: auto;
	}
</style>