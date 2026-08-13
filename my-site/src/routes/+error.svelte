<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Inue Kang</title>
</svelte:head>

<div class="lost">
	<div class="err-orb">{page.status}</div>
	<h1>
		{page.status === 404 ? 'Nothing floating here.' : 'Something went wrong.'}
	</h1>
	<p class="sub">
		{page.status === 404
			? "This page doesn't exist — it may have drifted away."
			: (page.error?.message ?? 'An unexpected error occurred.')}
	</p>
	<a class="home" href="/">Back home</a>
</div>

<style>
	.lost {
		min-height: 92vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.4rem;
		padding: 0 6vw;
		text-align: center;
	}

	.err-orb {
		width: 9rem;
		height: 9rem;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--ink);
		color: var(--bg);
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 2.2rem;
		letter-spacing: 0.06em;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		animation: bob 4.5s ease-in-out infinite alternate;
	}

	@keyframes bob {
		from {
			translate: 0 -0.6rem;
			rotate: -2deg;
		}
		to {
			translate: 0 0.6rem;
			rotate: 2deg;
		}
	}

	h1 {
		margin: 0;
		font-size: clamp(1.6rem, 4vw, 2.6rem);
	}

	.sub {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.95rem;
	}

	.home {
		margin-top: 0.8rem;
		width: 7rem;
		height: 7rem;
		display: grid;
		place-items: center;
		border-radius: 50%;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink);
		background: var(--surface);
		border: 1.5px solid var(--ink);
		backdrop-filter: blur(4px);
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			scale 0.2s ease;
	}
	.home:hover,
	.home:focus-visible {
		background: var(--ink);
		color: var(--bg);
		scale: 1.06;
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.err-orb {
			animation: none;
		}
	}
</style>
