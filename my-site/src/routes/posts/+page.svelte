<script>
	import Header from '../Header.svelte';
	import PushPinIcon from 'phosphor-svelte/lib/PushPinIcon';
	import { posts } from '$lib/content/posts.js';
	import Seo from '$lib/Seo.svelte';

	const DEFAULT_PAPER = '#fdf2b3';

	// pinned posts first; original (newest-first) order within each group
	const ordered = [...posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

	// alternating gentle tilts so the board looks hand-placed
	/** @param {number} i */
	function tilt(i) {
		return (i % 2 ? 1 : -1) * (1.2 + (i % 3) * 0.8);
	}

	// preview text: the first paragraph (skipping any images), tags stripped
	/** @param {(typeof posts)[number]} post */
	function excerpt(post) {
		const first = post.body.find((item) => typeof item === 'string') ?? '';
		return first.replace(/<[^>]+>/g, '');
	}
</script>

<Seo title="Posts — Inue Kang" description="my posts" />

<Header></Header>
<div class="content">
	<h1>My Posts</h1>
	<div class="board">
		{#each ordered as post, i (post.slug)}
			<a
				class="note"
				href="/posts/{post.slug}"
				style="--tilt: {tilt(i)}deg; --paper: {post.color ?? DEFAULT_PAPER};"
			>
				{#if post.pinned}
					<span class="pin" title="Pinned"><PushPinIcon weight="fill" /></span>
				{/if}
				<h2>{post.title}</h2>
				<p class="date">{post.date}</p>
				<p class="excerpt">{excerpt(post)}</p>
				<span class="read-more">Click to read more...</span>
			</a>
		{:else}
			<div class="empty">
				<p>No posts currently.</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0vh 6vw;
	}
	h1 {
		font-size: 3vw;
	}

	.board {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 4vh 2.5vw;
		margin-bottom: 6vh;
		padding-top: 1.5vh; /* room for the tape to peek over */
	}

	/* ── sticky note ─────────────────────────────────────── */
	.note {
		position: relative;
		aspect-ratio: 1 / 1;
		display: flex;
		flex-direction: column;
		padding: 2.7rem 1.4rem 1.4rem;
		background: var(--paper);
		color: #0a0a0a;
		text-decoration: none;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
		rotate: var(--tilt);
		transition:
			rotate 0.25s ease,
			scale 0.25s ease,
			box-shadow 0.25s ease;
		overflow: hidden;
	}
	/* the strip of tape holding the note up */
	.note::before {
		content: '';
		position: absolute;
		top: 0.55rem;
		left: 50%;
		width: 5.5rem;
		height: 1.3rem;
		background: rgba(10, 10, 10, 0.08);
		border: 1px solid rgba(10, 10, 10, 0.1);
		transform: translateX(-50%) rotate(-3deg);
	}
	.note:hover,
	.note:focus-visible {
		rotate: 0deg;
		scale: 1.04;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.24);
		outline: none;
	}

	/* pinned posts get a pin stuck through the top corner */
	.pin {
		position: absolute;
		top: 0.45rem;
		right: 0.7rem;
		font-size: 1.35rem;
		color: #0a0a0a;
		rotate: 25deg;
		filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
	}

	.note h2 {
		margin: 0 0 0.25rem;
		font-size: 1.05rem;
		line-height: 1.3;
	}
	.date {
		margin: 0 0 0.6rem;
		font-size: 0.72rem;
		color: rgba(10, 10, 10, 0.55);
	}
	.excerpt {
		margin: 0;
		font-size: 0.78rem;
		line-height: 1.55;
		/* fill whatever space the note has left and fade the text out at
		   the bottom — adapts to any note size, unlike a fixed line clamp */
		flex: 1;
		min-height: 0;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(180deg, #000 65%, transparent 96%);
		mask-image: linear-gradient(180deg, #000 65%, transparent 96%);
	}

	/* bottom hint: hover-revealed on pointer devices, always on for touch.
	   space is always reserved so the note doesn't shift on hover */
	.read-more {
		display: block;
		margin-top: 0.7rem;
		text-align: center;
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #0a0a0a;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.note:hover .read-more,
	.note:focus-visible .read-more {
		opacity: 1;
	}
	@media (hover: none), (max-width: 768px) {
		.read-more {
			opacity: 1;
		}
	}

	.empty {
		grid-column: 1 / -1;
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
		border-radius: 2vw;
		padding: 2vh max(1.5rem, 2vw);
	}
	.empty p {
		font-size: 1vw;
		margin: 0;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 1.8rem;
		}
		.board {
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		}
		.empty p {
			font-size: 0.9rem;
		}
	}
</style>
