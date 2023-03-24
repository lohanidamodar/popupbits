<script>
	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/data/projects.js';
</script>

<section class="hero">
	<div class="overlay">
		<div class="content">
			<p class="subtitle">
				Let Us Establish
				<br />Your Digital Brand
			</p>
		</div>
		<p>
			<a class="btn btn-lg btn-primary" href="/contact">Lets Work Together</a>
		</p>
	</div>
</section>
<section class="skills">
	<div class="container">
		<h2>Skills</h2>
		<p class="subtitle">
			Over 8 years of development experience using these platforms, frameworks and languages
		</p>
		<ul class="icons">
			<li>
				<img src="/icons/html.svg" alt="HTML" />
			</li>
			<li>
				<img src="/icons/css.svg" alt="CSS" />
			</li>
			<li>
				<img src="/icons/js.svg" alt="Javascript" />
			</li>
			<li>
				<img src="/icons/flutter.svg" alt="Flutter" />
			</li>
			<li>
				<img src="/icons/appwrite.svg" alt="Appwrite" />
			</li>
			<li>
				<img src="/icons/firebase.svg" alt="Firebase" />
			</li>
			<li>
				<img src="/icons/react.svg" alt="React JS" />
			</li>
		</ul>
	</div>
</section>
<section class="projects">
	<div class="container">
		{#each projects.slice(0,3) as project}
			<Project {project} />
		{/each}
	</div>
</section>
<section class="socials">
	<div class="container">
		<h2>Follow Me On</h2>
		<p>I would love to connect with you.</p>
		<div class="links">
			<a href="https://github.com/lohanidamodar" target="_blank">Github</a>
			<a href="https://www.youtube.com/c/reactbits" target="_blank">Youtube</a>
			<a href="mailto:popupbits@gmail.com">Email</a>
		</div>
	</div>
</section>

<footer>
	<p>Copyright &copy; 2023 PopupBits</p>
</footer>

<style lang="scss">
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
	}
	.hero {
		height: 100vh;
		margin-top: -64px;
		background-image: url(https://popupbits.com/images/hero_bg.jpg);
		background-size: cover;
		background-repeat: no-repeat;
		font-size: 1.5rem;
		color: var(--inkdark);

		.overlay {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background-color: #ffffffaa;
		}
	}

	.skills,
	.socials {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		text-align: center;
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			justify-content: center;
			li {
				margin-left: 8px;
			}
			img {
				width: 48px;
				height: 48px;
			}
		}
	}

	.projects {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer {
		background-color: var(--ink);
		color: var(--paper);
		padding-top: 40px;
		padding-bottom: 40px;
		text-align: center;
	}

	.socials {
		a {
			margin-left: 8px;
			display: inline-block;
			padding: 8px;
		}
	}
</style>
