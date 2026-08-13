<script>
	import Header from '../../Header.svelte';
	import ArrowSquareOutIcon from 'phosphor-svelte/lib/ArrowSquareOutIcon';
	import CaretLeftIcon from 'phosphor-svelte/lib/CaretLeftIcon';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';
	import Seo from '$lib/Seo.svelte';
	import { projects } from '$lib/content/projects.js';

	let { data } = $props();
	const project = $derived(data.project);
	const images = $derived(project.images ?? []);

	// the projects array is newest-first: left goes newer, right goes older
	const index = $derived(projects.findIndex((p) => p.slug === project.slug));
	const newer = $derived(index > 0 ? projects[index - 1] : null);
	const older = $derived(index < projects.length - 1 ? projects[index + 1] : null);

	let idx = $state(0);

	// restart the carousel when navigating between projects
	$effect(() => {
		void project.slug;
		idx = 0;
	});

	function prev() {
		idx = (idx - 1 + images.length) % images.length;
	}

	function next() {
		idx = (idx + 1) % images.length;
	}
</script>

<Seo title="{project.name} — Inue Kang" description={project.blurb} />

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
		{#if images.length}
			<div class="carousel">
				<div class="frame">
					<!-- all slides stay mounted in a sliding track: no reload
					     flash, no height collapse (= no scroll jump), and a
					     smooth slide between images -->
					<div class="track" style="transform: translateX(-{idx * 100}%);">
						{#each images as slide, i (i)}
							<div class="slide">
								<img src={slide.image} alt={slide.alt} />
							</div>
						{/each}
					</div>
					{#if images.length > 1}
						<button class="step left" onclick={prev} aria-label="Previous image">
							<CaretLeftIcon weight="bold" />
						</button>
						<button class="step right" onclick={next} aria-label="Next image">
							<CaretRightIcon weight="bold" />
						</button>
					{/if}
				</div>
				{#if images[idx].caption}
					<p class="caption">{images[idx].caption}</p>
				{/if}
				{#if images.length > 1}
					<div class="dots">
						{#each images as _, i (i)}
							<button
								class="dot"
								class:active={i === idx}
								onclick={() => (idx = i)}
								aria-label="Image {i + 1} of {images.length}"
							></button>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<nav class="pager" aria-label="More projects">
		{#if newer}
			<a class="pager-btn" href="/projects/{newer.slug}">
				<CaretLeftIcon weight="bold" />{newer.name}
			</a>
		{:else}
			<button class="pager-btn" disabled><CaretLeftIcon weight="bold" />Newer</button>
		{/if}
		{#if older}
			<a class="pager-btn" href="/projects/{older.slug}">
				{older.name}<CaretRightIcon weight="bold" />
			</a>
		{:else}
			<button class="pager-btn" disabled>Older<CaretRightIcon weight="bold" /></button>
		{/if}
	</nav>
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
	.inline {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem 1.2rem;
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
		margin-bottom: 2.5vh;
		padding: 2vh max(1.5rem, 2vw);
		border-radius: 1vw;
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
	}
	.info :global(a) {
		color: var(--accent);
	}

	/* ── image carousel ──────────────────────────────────── */
	.carousel {
		/* half the card width on desktop, centered; full width on mobile */
		width: 50%;
		margin: 3.5rem auto 2.5rem;
	}
	@media (max-width: 768px) {
		.carousel {
			width: 100%;
		}
	}
	.frame {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--card-border);
	}
	.track {
		display: flex;
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.slide {
		flex: 0 0 100%;
		display: grid;
		place-items: center;
	}
	.slide img {
		display: block;
		width: 100%;
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			transition: none;
		}
	}
	.step {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.6rem;
		height: 2.6rem;
		display: grid;
		place-items: center;
		padding: 0;
		border-radius: 50%;
		font-size: 1.25rem;
		color: var(--ink);
		background: var(--surface);
		border: 1.5px solid var(--ink);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			scale 0.2s ease;
	}
	.step.left {
		left: 0.8rem;
	}
	.step.right {
		right: 0.8rem;
	}
	.step:hover,
	.step:focus-visible {
		background: var(--ink);
		color: var(--bg);
		scale: 1.08;
		outline: none;
	}
	.caption {
		margin: 0.6rem 0 0;
		text-align: center;
		font-size: 0.8rem;
		color: var(--text-dim);
	}
	.dots {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.7rem;
	}
	.dot {
		width: 0.65rem;
		height: 0.65rem;
		padding: 0;
		border-radius: 50%;
		border: 1.5px solid var(--ink);
		background: transparent;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	.dot.active {
		background: var(--ink);
	}

	/* ── newer/older pager ───────────────────────────────── */
	.pager {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 6vh;
	}
	.pager-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 1.1rem;
		border-radius: 999px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		text-decoration: none;
		color: var(--ink);
		background: var(--surface);
		border: 1.5px solid var(--ink);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	a.pager-btn:hover,
	a.pager-btn:focus-visible {
		background: var(--ink);
		color: var(--bg);
		outline: none;
	}
	.pager-btn:disabled {
		opacity: 0.35;
		cursor: default;
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
