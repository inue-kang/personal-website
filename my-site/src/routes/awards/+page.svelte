<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Header from '../Header.svelte';
	import { years } from '$lib/content/awards.js';
	import { separate, clampBounds, clampTarget } from '$lib/physics.js';
	import { draggable } from '$lib/draggable.js';
	import Seo from '$lib/Seo.svelte';

	const YEAR_R = 54; // px radius of a year orb
	const NODE_R = 38; // px radius of an award node
	const RING_PAD = 44; // gap between an orb edge and its nodes

	// year orbs place themselves in a two-column zigzag; rows grow with content
	const yearRows = Math.ceil(years.length / 2);
	/** @param {number} yi */
	function yearAnchor(yi) {
		const col = yi % 2;
		const row = Math.floor(yi / 2);
		return {
			ax: (col === 0 ? 0.24 : 0.72) + (row % 2 ? 0.04 : -0.02),
			ay: (row + 0.5) / yearRows
		};
	}

	/** @type {HTMLElement | undefined} */
	let container = $state();
	/** @type {any[]} */
	let bodies = $state([]);
	/** @type {Record<string, any> | null} */
	let selected = $state(null);
	/** @type {number} */
	let raf;

	const nodes = $derived(bodies.filter((b) => b.kind === 'award'));

	// shrink a node label until its longest word fits inside the circle
	/** @param {string} name */
	function nodeFontPx(name) {
		const longest = Math.max(...name.split(' ').map((w) => w.length));
		return Math.min(9.5, 58 / (0.78 * longest));
	}

	onMount(() => {
		if (!container) return;
		const el = container;
		// match the CSS breakpoint (@media max-width: 700px), which is
		// viewport-based — the container is narrower than the viewport
		const isMobile = () => window.innerWidth <= 700;
		const w0 = el.clientWidth;
		const h0 = el.clientHeight;
		const m0 = isMobile();

		bodies = [];
		years.forEach((y, yi) => {
			const { ax, ay } = yearAnchor(yi);
			bodies.push({
				kind: 'year',
				id: 'y' + y.year,
				label: y.year,
				r: YEAR_R,
				ax,
				ay,
				yi,
				x: (m0 ? 0.5 : ax) * w0,
				y: (m0 ? (yi + 0.5) / years.length : ay) * h0,
				vx: 0,
				vy: 0,
				phase: yi * 1.7,
				weight: 0.15
			});
			// reference the reactive proxy that $state stored, NOT the raw
			// object — the SVG edges render parent.x/parent.y, and reads
			// through the raw object aren't tracked, freezing the lines'
			// orb ends at their mount positions
			const orb = bodies[bodies.length - 1];
			y.awards.forEach((a, ai) => {
				const angle = (ai / y.awards.length) * Math.PI * 2 + yi * 0.9;
				const d = YEAR_R + NODE_R + RING_PAD;
				bodies.push({
					kind: 'award',
					id: a.id,
					award: a,
					r: NODE_R,
					parent: orb,
					angle,
					x: orb.x + Math.cos(angle) * d,
					y: orb.y + Math.sin(angle) * d,
					vx: 0,
					vy: 0,
					phase: ai * 2.1
				});
			});
		});

		let t = 0;
		function step() {
			t += 1 / 60;
			const w = el.clientWidth;
			const h = el.clientHeight;
			const mobile = isMobile();

			// pull every body toward its drifting target; on mobile the year
			// clusters stack in a single column with generous spacing
			for (const b of bodies) {
				let tx, ty;
				if (b.kind === 'year') {
					const ax = mobile ? 0.5 : b.ax;
					const ay = mobile ? (b.yi + 0.5) / years.length : b.ay;
					tx = ax * w + Math.sin(t * 0.3 + b.phase) * (mobile ? 22 : 18);
					ty = ay * h + Math.cos(t * 0.23 + b.phase) * (mobile ? 26 : 14);
				} else {
					const ang = b.angle + t * 0.07; // slow orbit around the year orb
					const d = b.parent.r + b.r + (mobile ? 28 : RING_PAD);
					tx = b.parent.x + Math.cos(ang) * d + Math.sin(t * 0.5 + b.phase) * 6;
					ty = b.parent.y + Math.sin(ang) * d + Math.cos(t * 0.4 + b.phase) * 6;
				}
				const [cx, cy] = clampTarget(b, tx, ty, w, h);
				if (!b.hold) {
					b.vx = (b.vx + (cx - b.x) * 0.02) * 0.86;
					b.vy = (b.vy + (cy - b.y) * 0.02) * 0.86;
					b.x += b.vx;
					b.y += b.vy;
				} else {
					b.vx *= 0.8;
					b.vy *= 0.8;
				}
			}

			separate(bodies, 14);
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

	function close() {
		selected = null;
	}
</script>

<Seo title="Awards — Inue Kang" description="stuff I won" />

<svelte:window onkeydown={(e) => e.key === 'Escape' && close()} />

<Header></Header>

<div class="content">
	<h1>My Achievements</h1>
	<div class="map" bind:this={container} style="--yrows: {yearRows}; --ycount: {years.length};">
		<svg class="edges" aria-hidden="true">
			{#each nodes as n (n.id)}
				<line x1={n.parent.x} y1={n.parent.y} x2={n.x} y2={n.y} />
			{/each}
		</svg>
		{#each bodies as b (b.id)}
			{#if b.kind === 'year'}
				<div
					class="year-orb"
					style="left: {b.x}px; top: {b.y}px; width: {b.r * 2}px; height: {b.r * 2}px;"
					use:draggable={b}
				>
					{b.label}
				</div>
			{:else}
				<button
					class="node"
					style="left: {b.x}px; top: {b.y}px; width: {b.r * 2}px; height: {b.r * 2}px;"
					use:draggable={b}
					onclick={() => (selected = b.award)}
				>
					<span class="node-name" style="font-size: {nodeFontPx(b.award.name)}px;"
						>{b.award.name}</span
					>
					<span class="node-place">{b.award.place}</span>
				</button>
			{/if}
		{/each}
	</div>
</div>

{#if selected}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="overlay"
		transition:fade={{ duration: 120 }}
		onclick={(e) => e.target === e.currentTarget && close()}
	>
		<div
			class="popup"
			role="dialog"
			aria-modal="true"
			aria-label={selected.title}
			transition:fly={{ y: 16, duration: 160 }}
		>
			<button class="close" onclick={close} aria-label="Close">&times;</button>
			<h2>{selected.title}</h2>
			<p class="meta">{selected.date} &middot; {selected.meta}</p>
			{#if selected.members}
				<p>Group Members: {selected.members}</p>
			{/if}
			<p>
				Link:
				{#if selected.link}
					<a target="_blank" href={selected.link.href}>{selected.link.label}</a>
				{:else}
					Currently Unavailable
				{/if}
			</p>
			<h3>Overview</h3>
			<p>Objective: {selected.objective}</p>
			{#if selected.theme}
				<p>Theme: {selected.theme}</p>
			{/if}
			{#if selected.project}
				<p>
					Our Project: <a target="_blank" href={selected.project.href}>{selected.project.label}</a>
				</p>
			{/if}
		</div>
	</div>
{/if}

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

	.map {
		position: relative;
		/* grows with the number of years */
		height: max(520px, calc(var(--yrows) * 380px));
		border: 1px solid var(--wall);
		border-radius: 2rem;
		margin-bottom: 6vh;
		overflow: hidden;
	}

	.edges {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.edges line {
		stroke: var(--edge);
		stroke-width: 1.5;
	}

	.year-orb {
		position: absolute;
		transform: translate(-50%, -50%);
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--ink);
		color: var(--bg);
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.15rem;
		letter-spacing: 0.08em;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
		user-select: none;
		cursor: grab;
		touch-action: pan-y;
	}

	.node {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.1rem;
		padding: 0;
		border-radius: 50%;
		background: var(--surface);
		border: 1.5px solid var(--ink);
		backdrop-filter: blur(3px);
		font-family: var(--font-display);
		color: var(--ink);
		cursor: grab;
		touch-action: pan-y;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.node:hover,
	.node:focus-visible {
		background: var(--ink);
		color: var(--bg);
		outline: none;
	}
	.node-name {
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		max-width: 92%;
		line-height: 1.2;
	}
	.node-place {
		font-size: 0.62rem;
		font-weight: 800;
	}

	/* ── popup ───────────────────────────────────────────── */
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 90;
		display: grid;
		place-items: center;
		background: var(--veil);
		backdrop-filter: blur(5px);
		padding: 4vh 4vw;
	}
	.popup {
		position: relative;
		max-width: 640px;
		max-height: 80vh;
		overflow: auto;
		background: var(--bg);
		border: 2px solid var(--ink);
		border-radius: 1rem;
		padding: 2rem 2.2rem;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
	}
	.popup h2 {
		margin: 0 0 0.4rem;
		font-size: 1.25rem;
		line-height: 1.35;
	}
	.popup h3 {
		margin: 1.1rem 0 0.2rem;
		font-size: 1rem;
	}
	.popup p {
		margin: 0.45rem 0;
		font-size: 0.85rem;
		line-height: 1.6;
	}
	.popup .meta {
		color: var(--text-dim);
	}
	.popup a {
		color: var(--ink);
		text-decoration: underline;
	}
	.popup a:hover {
		background: var(--ink);
		color: var(--bg);
	}
	.close {
		position: absolute;
		top: 0.7rem;
		right: 0.9rem;
		border: none;
		background: none;
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		color: var(--ink);
	}
	.close:hover {
		scale: 1.2;
	}

	@media (max-width: 700px) {
		h1 {
			font-size: 1.8rem;
		}
		.map {
			/* one year cluster per row */
			height: calc(var(--ycount) * 400px);
		}
		.popup {
			padding: 1.4rem 1.2rem;
		}
	}
</style>
