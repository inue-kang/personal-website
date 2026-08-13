<script>
	import Header from '../../Header.svelte';
	import ArrowSquareOutIcon from 'phosphor-svelte/lib/ArrowSquareOutIcon';
	import Seo from '$lib/Seo.svelte';

	let { data } = $props();
	const project = $derived(data.project);
</script>

<Seo title="projects/{project.slug}" description="my projects: {project.name}" />

<Header></Header>
<div class="content">
	<h1>{project.name}</h1>
	<p class="desc">{project.blurb}</p>
	<div class="inline">
		{#each project.links as link (link.href)}
			<a class="redirect" target="_blank" href={link.href}>{link.label}<ArrowSquareOutIcon /></a>
		{/each}
	</div>

	<div class="info">
		{#each project.body as paragraph (paragraph)}
			<!-- content comes from our own src/lib/content files, not user input -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p>{@html paragraph}</p>
		{/each}
		{#if project.image}
			<br />
			<p>{project.imageCaption}</p>
			<img class="shot" src={project.image} alt="{project.name} screenshot" />
		{/if}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0vh 5vw;
	}
	.desc {
		margin-top: -3vh;
	}
	h1 {
		font-size: 3vw;
	}
	.redirect {
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(8px);
		text-decoration: none;
		color: var(--accent);
		padding: 1vh 1vw;
		border-radius: 1vw;
		transition: 0.2s;
	}
	.redirect:hover {
		background: var(--ink);
		color: var(--bg);
		border-color: var(--ink);
		text-decoration: underline;
	}

	.info {
		margin-top: 4vh;
		margin-bottom: 6vh;
		padding: 2vh 2vw;
		border-radius: 1vw;
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
	}
	.info :global(a) {
		color: var(--accent);
	}
	.shot {
		width: 100%;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 1.7rem;
		}
		.desc {
			margin-top: -1vh;
		}
	}
</style>
