<script>
	import Header from '../../Header.svelte';
	import Seo from '$lib/Seo.svelte';

	let { data } = $props();
	const post = $derived(data.post);
</script>

<Seo title="posts/{post.slug}" description="my posts: {post.title}" />

<Header></Header>
<div class="content">
	<article class="sheet" style="--paper: {post.color ?? '#fdf2b3'};">
		<h1>{post.title}</h1>
		<p class="date">{post.date}</p>
		{#each post.body as paragraph (paragraph)}
			<!-- content comes from our own src/lib/content files, not user input -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p>{@html paragraph}</p>
		{/each}
	</article>
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
		margin: 0 auto 8vh;
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

	@media (max-width: 768px) {
		.sheet {
			padding: 2.8rem 1.4rem 1.6rem;
		}
		h1 {
			font-size: 1.35rem;
		}
	}
</style>
