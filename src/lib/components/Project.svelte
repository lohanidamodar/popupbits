<script lang="ts">
	export let project: any;
</script>

<div class="container">
	<div class="image">
		<img width="1920" height="1080" src={project.image} alt="" />
	</div>
	<div class="details">
		<div class="project-details">
			<h3>{project.title}</h3>
			<p>{project.tech}</p>
			<a href="/projects/{project.slug}">View Project</a>
		</div>
		<div class="description">
			<p>
				{project.description}
			</p>
			<p />
		</div>
	</div>
</div>

<style lang="scss">
	.image {
		max-width: 1400px;
		height: 550px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		background-color: #e9ecef;
	}
	img {
		max-width: 1000px;
		height: auto;
	}
</style>
