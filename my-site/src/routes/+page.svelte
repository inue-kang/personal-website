<script>
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { separate, clampBounds, clampTarget } from '$lib/physics.js';
	import Seo from '$lib/Seo.svelte';
	import { draggable } from '$lib/draggable.js';

	// ── intro splash: "InK" expands to "Inue Kang", then the name glides
	// up onto the homepage heading. Plays on every visit to the homepage. ──
	/** @type {'logo' | 'expand' | 'drift' | 'done'} */
	let splashPhase = $state('logo');
	let driftStyle = $state('');
	/** @type {HTMLElement | undefined} */
	let heroTitle = $state();
	/** @type {HTMLElement | undefined} */
	let logoEl = $state();

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			splashPhase = 'expand'; // show the full name, skip the animation
			const t = setTimeout(() => (splashPhase = 'done'), 900);
			return () => clearTimeout(t);
		}
		const drift = async () => {
			// switch the logo to the literal heading text first, so the
			// measured geometry (and glyph spacing) matches the h1 exactly
			splashPhase = 'drift';
			await tick();
			if (logoEl && heroTitle) {
				const from = logoEl.getBoundingClientRect();
				const to = heroTitle.getBoundingClientRect();
				const dx = to.left + to.width / 2 - (from.left + from.width / 2);
				const dy = to.top + to.height / 2 - (from.top + from.height / 2);
				// same single-line string on both sides, so the width ratio is
				// the exact scale (and stays correct at any viewport size)
				const s = to.width / from.width;
				driftStyle = `transform: translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${s.toFixed(3)});`;
			}
		};
		const t1 = setTimeout(() => (splashPhase = 'expand'), 700);
		const t2 = setTimeout(drift, 1650);
		const t3 = setTimeout(() => (splashPhase = 'done'), 2400);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	});

	const links = [
		{ id: 'projects', label: 'Projects', href: '/projects', baseR: 64, ax: 0.15, ay: 0.32 },
		{ id: 'posts', label: 'Posts', href: '/posts', baseR: 50, ax: 0.42, ay: 0.68 },
		{ id: 'awards', label: 'Awards', href: '/awards', baseR: 56, ax: 0.62, ay: 0.26 },
		{ id: 'about', label: 'About', href: '/about', baseR: 53, ax: 0.85, ay: 0.62 }
	];

	/** @type {HTMLElement | undefined} */
	let pond = $state();
	/** @type {any[]} */
	let bubbles = $state([]);
	/** @type {number} */
	let raf;

	onMount(() => {
		if (!pond) return;
		const el = pond;
		const w0 = el.clientWidth;
		const h0 = el.clientHeight;
		bubbles = links.map((l, i) => ({
			...l,
			r: l.baseR,
			x: l.ax * w0,
			y: l.ay * h0,
			vx: 0,
			vy: 0,
			phase: i * 2.3,
			hold: false
		}));

		let t = 0;
		function step() {
			t += 1 / 60;
			const w = el.clientWidth;
			const h = el.clientHeight;
			const scale = window.innerWidth <= 560 ? 0.72 : 1;

			for (const b of bubbles) {
				b.r = b.baseR * scale;
				const [tx, ty] = clampTarget(
					b,
					b.ax * w + Math.sin(t * 0.34 + b.phase) * 26,
					b.ay * h + Math.cos(t * 0.27 + b.phase) * 20,
					w,
					h
				);
				if (!b.hold) {
					b.vx = (b.vx + (tx - b.x) * 0.02) * 0.86;
					b.vy = (b.vy + (ty - b.y) * 0.02) * 0.86;
					b.x += b.vx;
					b.y += b.vy;
				} else {
					b.vx *= 0.8;
					b.vy *= 0.8;
				}
			}

			separate(bubbles, 14);
			clampBounds(bubbles, w, h);
		}

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			for (let k = 0; k < 240; k++) step();
		} else {
			const loop = () => {
				step();
				raf = requestAnimationFrame(loop);
			};
			loop();
		}
		return () => cancelAnimationFrame(raf);
	});
</script>

<Seo title="Inue Kang" description="my personal website" />

{#if splashPhase !== 'done'}
	<div
		class="splash"
		class:expand={splashPhase === 'expand' || splashPhase === 'drift'}
		class:drift={splashPhase === 'drift'}
		out:fade={{ duration: 250 }}
		aria-hidden="true"
	>
		<span class="logo" bind:this={logoEl} style={driftStyle}>
			{#if splashPhase === 'drift'}Inue Kang{:else}<span>In</span><span class="fill ue">ue</span><span
					class="gap"
				></span><span>K</span><span class="fill ang">ang</span>{/if}
		</span>
	</div>
{/if}

<div class="hero">
	<h1 bind:this={heroTitle} class:veiled={splashPhase !== 'done'}>Inue Kang</h1>
	<p class="intro">
		Hi! I am a student interested in all things computer-related, from web, software, and game
		development to video editing, graphics, and animation. I also dabble in cybersecurity and
		machine learning/AI.
	</p>
	<nav class="pond" bind:this={pond} aria-label="Pages">
		{#each bubbles as b (b.id)}
			<a
				class="bubble"
				href={b.href}
				style="left: {b.x}px; top: {b.y}px; width: {b.r * 2}px; height: {b.r * 2}px; font-size: {Math.max(0.62, b.r / 64).toFixed(2)}rem;"
				use:draggable={b}
				onmouseenter={() => (b.hold = true)}
				onmouseleave={() => (b.hold = false)}
			>
				{b.label}
			</a>
		{/each}
	</nav>
</div>

<style>
	/* ── intro splash ────────────────────────────────────── */
	.splash {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		place-items: center;
		background: #0a0a0a;
		transition: background-color 0.6s ease;
	}
	.splash.drift {
		background: transparent;
		pointer-events: none;
	}

	.logo {
		display: flex;
		align-items: center;
		color: #ffffff;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.4rem, 10vw, 6.5rem);
		letter-spacing: 0.04em; /* matches the hero h1 for a clean landing */
		white-space: pre;
		transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.splash.drift .logo {
		color: var(--text); /* fade to ink as the backdrop clears */
		transition:
			transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
			color 0.5s ease 0.1s;
	}

	/* hidden letters expand out of "InK" to spell the full name */
	.fill {
		max-width: 0;
		opacity: 0;
		overflow: hidden;
		transition:
			max-width 0.7s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.45s ease 0.12s;
	}
	.gap {
		width: 0;
		transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.splash.expand .ue {
		max-width: 2.2em;
	}
	.splash.expand .ang {
		max-width: 3.2em;
	}
	.splash.expand .fill {
		opacity: 1;
	}
	.splash.expand .gap {
		width: 0.38em;
	}

	@media (prefers-reduced-motion: reduce) {
		.fill,
		.gap {
			transition: none;
		}
	}

	.hero {
		min-height: 96vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3.5vh;
		padding: 0 6vw;
		text-align: center;
	}

	h1 {
		margin: 0;
		/* single line at every viewport — the splash name lands on it */
		font-size: clamp(2.4rem, 8vw, 6rem);
		white-space: nowrap;
		font-weight: 800;
		letter-spacing: 0.04em;
		transition: opacity 0.25s ease;
	}
	h1.veiled {
		opacity: 0;
	}

	.intro {
		margin: 0;
		max-width: 62ch;
		font-size: clamp(0.85rem, 1.1vw, 1.05rem);
		line-height: 1.7;
		color: var(--text-dim);
	}

	/* the bubbles' confined space */
	.pond {
		position: relative;
		width: min(760px, 92vw);
		height: clamp(300px, 36vh, 400px);
		border: 1px solid var(--wall);
		border-radius: 2rem;
	}

	.bubble {
		position: absolute;
		transform: translate(-50%, -50%);
		cursor: grab;
		touch-action: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink);
		background: var(--surface);
		border: 1.5px solid var(--ink);
		backdrop-filter: blur(4px);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.bubble:hover,
	.bubble:focus-visible {
		background: var(--ink);
		color: var(--bg);
		outline: none;
	}

	@media (max-width: 560px) {
		/* centering squeezes the heading against the top edge on phones —
		   top-align with a real gap instead (the splash landing follows
		   automatically, since it measures the heading's live position) */
		.hero {
			justify-content: flex-start;
			padding-top: 12vh;
			gap: 3vh;
		}
		.pond {
			height: 420px;
		}
	}
</style>
