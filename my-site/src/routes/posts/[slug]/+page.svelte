<script>
	import Header from '../../Header.svelte';
	import CaretLeftIcon from 'phosphor-svelte/lib/CaretLeftIcon';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';
	import Seo from '$lib/Seo.svelte';
	import { posts } from '$lib/content/posts.js';

	let { data } = $props();
	const post = $derived(data.post);

	// the posts array is newest-first: left goes newer, right goes older
	// (chronological order — pinning only affects the board, not this)
	const index = $derived(posts.findIndex((p) => p.slug === post.slug));
	const newer = $derived(index > 0 ? posts[index - 1] : null);
	const older = $derived(index < posts.length - 1 ? posts[index + 1] : null);
</script>

<Seo title="posts/{post.slug}" description="my posts: {post.title}" />

<Header></Header>
<div class="content">
	<article class="sheet" style="--paper: {post.color ?? '#fdf2b3'};">
		<h1>{post.title}</h1>
		<p class="date">{post.date}</p>
		{#each post.body as item, i (i)}
			{#if typeof item === 'string'}
				<!-- content comes from our own src/lib/content files, not user input -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html item}</p>
			{:else}
				<figure>
					<img src={item.image} alt={item.alt} />
					{#if item.caption}<figcaption>{item.caption}</figcaption>{/if}
				</figure>
			{/if}
		{/each}
	</article>

	<nav class="pager" aria-label="More posts">
		{#if newer}
			<a class="pager-btn" href="/posts/{newer.slug}">
				<CaretLeftIcon weight="bold" />{newer.title}
			</a>
		{:else}
			<button class="pager-btn" disabled><CaretLeftIcon weight="bold" />Newer</button>
		{/if}
		{#if older}
			<a class="pager-btn" href="/posts/{older.slug}">
				{older.title}<CaretRightIcon weight="bold" />
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
		padding: 0vh 6vw;
	}

	/* the post itself is one big sticky note */
	.sheet {
		position: relative;
		box-sizing: border-box; /* width includes the padding — no overflow */
		width: min(720px, 100%);
		margin: 0 auto 3vh;
		padding: 3.2rem 2.6rem 2.6rem;
		background: var(--paper);
		/* the paper stays bright in dark mode, so its text stays ink-dark */
		color: #0a0a0a;
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
		rotate: -0.5deg;
	}
	.sheet::before {
		content: '';
		position: absolute;
		top: 0.7rem;
		left: 50%;
		width: 7rem;
		height: 1.5rem;
		background: rgba(10, 10, 10, 0.08);
		border: 1px solid rgba(10, 10, 10, 0.1);
		transform: translateX(-50%) rotate(-3deg);
	}

	h1 {
		margin: 0 0 0.3rem;
		font-size: 1.7rem;
		line-height: 1.3;
	}
	.date {
		margin: 0 0 1.2rem;
		font-size: 0.8rem;
		color: rgba(10, 10, 10, 0.55);
	}
	.sheet p {
		font-size: 0.92rem;
		line-height: 1.7;
		margin: 0.7rem 0;
	}
	.sheet :global(a) {
		color: #0a0a0a;
		text-decoration: underline;
	}

	figure {
		margin: 1.2rem 0;
	}
	figure img {
		display: block;
		width: 100%;
		border: 1px solid rgba(10, 10, 10, 0.2);
	}
	figcaption {
		margin-top: 0.4rem;
		text-align: center;
		font-size: 0.75rem;
		color: rgba(10, 10, 10, 0.55);
	}

	/* ── newer/older pager ───────────────────────────────── */
	.pager {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		width: min(720px, 100%);
		margin: 0 auto 8vh;
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
		.sheet {
			padding: 2.8rem 1.4rem 1.6rem;
		}
		h1 {
			font-size: 1.35rem;
		}
	}
</style>
