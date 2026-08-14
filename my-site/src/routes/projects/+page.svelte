<script>
	import { onMount } from 'svelte';
	import Header from '../Header.svelte';
	import { projects } from '$lib/content/projects.js';
	import { separate, clampBounds, clampTarget } from '$lib/physics.js';
	import { draggable } from '$lib/draggable.js';
	import Seo from '$lib/Seo.svelte';

	// orbs place themselves — anchor slots cycle for however many projects exist
	const ANCHORS = [
		[0.17, 0.3],
		[0.5, 0.6],
		[0.83, 0.26],
		[0.28, 0.78],
		[0.72, 0.8],
		[0.6, 0.22],
		[0.15, 0.58],
		[0.88, 0.55]
	];

	/** @type {HTMLElement | undefined} */
	let container = $state();
	/** @type {any[]} */
	let bodies = $state([]);
	/** @type {number} */
	let raf;

	onMount(() => {
		if (!container) return;
		const el = container;
		// match the CSS breakpoint (@media max-width: 700px), viewport-based
		const isMobile = () => window.innerWidth <= 700;
		const w0 = el.clientWidth;
		const h0 = el.clientHeight;
		const m0 = isMobile();

		bodies = projects.map((p, i) => {
			const [ax, ay] = ANCHORS[i % ANCHORS.length];
			return {
				slug: p.slug,
				name: p.name,
				tag: p.tag,
				icon: p.icon,
				ax,
				ay,
				r: 68,
				x: (m0 ? 0.5 : ax) * w0,
				y: (m0 ? (i + 0.5) / projects.length : ay) * h0,
				vx: 0,
				vy: 0,
				phase: i * 1.9,
				hold: false
			};
		});

		let t = 0;
		function step() {
			t += 1 / 60;
			const w = el.clientWidth;
			const h = el.clientHeight;
			const mobile = isMobile();

			for (const [i, b] of bodies.entries()) {
				b.r = mobile ? 58 : 68;
				const ax = mobile ? 0.5 : b.ax;
				const ay = mobile ? (i + 0.5) / bodies.length : b.ay;
				const [tx, ty] = clampTarget(
					b,
					ax * w + Math.sin(t * 0.32 + b.phase) * (mobile ? 26 : 30),
					ay * h + Math.cos(t * 0.26 + b.phase) * (mobile ? 20 : 24),
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

			separate(bodies, 16);
			clampBounds(bodies, w, h);
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

<Seo title="Projects — Inue Kang" description="my projects" />

<Header></Header>
<div class="content">
	<h1>My Projects</h1>
	<div class="field" bind:this={container} style="--count: {projects.length};">
		{#each bodies as b (b.slug)}
			{@const Icon = b.icon}
			<a
				class="orb-link"
				href="/projects/{b.slug}"
				style="left: {b.x}px; top: {b.y}px; width: {b.r * 2}px; height: {b.r * 2}px;"
				use:draggable={b}
				onmouseenter={() => (b.hold = true)}
				onmouseleave={() => (b.hold = false)}
			>
				<span class="p-icon"><Icon weight="duotone" /></span>
				<span class="p-name">{b.name}</span>
				<span class="p-tag">{b.tag}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0vh 5vw;
	}
	h1 {
		font-size: 3vw;
	}

	.field {
		position: relative;
		height: clamp(480px, 66vh, 800px);
		border: 1px solid var(--wall);
		border-radius: 2rem;
		margin-bottom: 6vh;
		overflow: hidden;
	}

	.orb-link {
		position: absolute;
		transform: translate(-50%, -50%);
		cursor: grab;
		touch-action: pan-y; /* vertical swipes still scroll the page */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.15rem;
		border-radius: 50%;
		text-decoration: none;
		background: var(--surface);
		border: 1.5px solid var(--ink);
		backdrop-filter: blur(3px);
		color: var(--ink);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.orb-link:hover,
	.orb-link:focus-visible {
		background: var(--ink);
		color: var(--bg);
		outline: none;
	}

	.p-icon {
		font-size: 1.7rem;
		line-height: 1;
	}
	.p-name {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.85rem;
		letter-spacing: 0.04em;
	}
	.p-tag {
		font-family: var(--font-body);
		font-size: 0.55rem;
		letter-spacing: 0.02em;
		color: inherit;
		opacity: 0.7;
		max-width: 84%;
		text-align: center;
		line-height: 1.3;
	}

	@media (max-width: 700px) {
		h1 {
			font-size: 1.8rem;
		}
		.field {
			/* one orb per row — grows with the number of projects */
			height: calc(var(--count) * 210px);
		}
		.p-name {
			font-size: 0.72rem;
		}
		.p-tag {
			font-size: 0.5rem;
		}
	}
</style>
