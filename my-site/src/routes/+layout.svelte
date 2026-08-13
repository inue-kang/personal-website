<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import SunIcon from 'phosphor-svelte/lib/SunIcon';
	import MoonIcon from 'phosphor-svelte/lib/MoonIcon';

	let { children } = $props();

	// ── dark mode ─────────────────────────────────────────────
	// the pre-paint script in app.html applies the stored/OS theme;
	// this just mirrors it into state and flips it on click
	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');

		// warm the easter-egg frames (~75KB total) once the browser is idle,
		// so the animation is ready the moment someone types "doggo".
		// skipped for users on data-saver connections.
		const saveData =
			'connection' in navigator &&
			/** @type {any} */ (navigator).connection?.saveData === true;
		if (!saveData) {
			if ('requestIdleCallback' in window) {
				requestIdleCallback(() => preloadDogFrames(), { timeout: 8000 });
			} else {
				setTimeout(preloadDogFrames, 3000);
			}
		}
	});

	function toggleTheme() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch {
			/* fine — theme just won't persist */
		}
	}

	// ── doggo easter egg: type "doggo" anywhere ───────────────
	// the original site's shiba jumps up from the bottom, hangs out
	// for a second, then drops back down
	const dogFrames = Object.entries(
		import.meta.glob('../lib/assets/shibest_doggo00*.png', {
			eager: true,
			query: '?url',
			import: 'default'
		})
	)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([, url]) => /** @type {string} */ (url))
		.slice(0, 24); // frames 1-24 are the jump cycle

	let dogSrc = $state('');
	let dogShown = $state(false);
	let dogBusy = false;
	let typedBuf = '';

	// the frames are 24 separate ~3KB images — on the live site the first
	// playback would stutter as each one loads mid-animation. Fetch and
	// decode them all up front (kicked off as soon as "dog" is typed) and
	// keep references so the decoded bitmaps stay warm.
	/** @type {HTMLImageElement[]} */
	const dogImgs = [];
	/** @type {Promise<unknown> | null} */
	let dogPreload = null;

	function preloadDogFrames() {
		if (!dogPreload) {
			dogPreload = Promise.all(
				dogFrames.map((src) => {
					const img = new Image();
					img.src = src;
					dogImgs.push(img);
					return img.decode().catch(() => {});
				})
			);
		}
		return dogPreload;
	}

	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (e.key && e.key.length === 1) {
			typedBuf = (typedBuf + e.key.toLowerCase()).slice(-5);
			if (typedBuf.endsWith('dog')) preloadDogFrames();
			if (typedBuf === 'doggo') {
				typedBuf = '';
				summonDoggo();
			}
		}
	}

	async function summonDoggo() {
		if (dogBusy || dogFrames.length === 0) return;
		dogBusy = true;
		await preloadDogFrames(); // never start playback with cold frames
		dogShown = true;
		let frame = 0;
		let tick = 0;
		const enter = () => {
			if (tick % 3 === 0) {
				dogSrc = dogFrames[frame];
				if (frame >= dogFrames.length - 1) {
					setTimeout(dropDown, 1000);
					return;
				}
				frame++;
			}
			tick++;
			requestAnimationFrame(enter);
		};
		const dropDown = () => {
			let f = dogFrames.length - 1;
			let tk = 0;
			const exit = () => {
				if (tk % 2 === 0) {
					dogSrc = dogFrames[f];
					if (f <= 0) {
						dogShown = false;
						dogBusy = false;
						return;
					}
					f--;
				}
				tk++;
				requestAnimationFrame(exit);
			};
			exit();
		};
		enter();
	}

	// ── click sparks: every clickable element bursts ──────────
	// one global listener instead of per-element wiring; lives in the
	// layout so sparks even survive page swaps mid-flight
	const sparkColors = () =>
		document.documentElement.classList.contains('dark')
			? ['#f2f2f2', '#cfcfcf', '#a3a3a3', '#7d7d7d']
			: ['#0a0a0a', '#333333', '#6b6b6b', '#9a9a9a'];

	/** @type {{ id: number, x: number, y: number, angle: number, dist: number, size: number, color: string, dur: number }[]} */
	let sparks = $state([]);
	let sparkSeq = 0;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	function burst(x, y) {
		const colors = sparkColors();
		const batch = Array.from({ length: 18 }, () => ({
			id: sparkSeq++,
			x,
			y,
			angle: Math.random() * 360,
			dist: 45 + Math.random() * 85,
			size: 2.5 + Math.random() * 4,
			color: colors[Math.floor(Math.random() * colors.length)],
			dur: 300 + Math.random() * 250
		}));
		sparks = [...sparks, ...batch];
		const ids = new Set(batch.map((s) => s.id));
		setTimeout(() => {
			sparks = sparks.filter((s) => !ids.has(s.id));
		}, 600);
	}

	// bubble-phase on window: the draggable action's capture-phase
	// stopPropagation on tossed elements keeps drags spark-free.
	// composedPath (snapshotted at dispatch) instead of target.closest —
	// a button that re-renders its own contents on click (like the theme
	// toggle swapping icons) detaches e.target before this runs
	/** @param {MouseEvent} e */
	function onGlobalClick(e) {
		const el = /** @type {Element | undefined} */ (
			e.composedPath().find((n) => n instanceof Element && (n.tagName === 'A' || n.tagName === 'BUTTON'))
		);
		if (!el) return;
		let x = e.clientX;
		let y = e.clientY;
		if (!x && !y) {
			// keyboard activation has no pointer position — spark from the element
			const r = el.getBoundingClientRect();
			x = r.left + r.width / 2;
			y = r.top + r.height / 2;
		}
		burst(x, y);
	}

	// page transition: a white sheet slides over the old page, the route
	// swaps beneath it, then the sheet slides off the other side.
	// onNavigate's returned promise holds the swap until the cover is across.
	/** @type {'rest' | 'in' | 'out'} */
	let cover = $state('rest');

	onNavigate((navigation) => {
		// clicking a link to the page you're already on: no transition
		if (navigation.to?.url.pathname === navigation.from?.url.pathname) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		cover = 'in';
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(); // the page swaps while fully covered
				setTimeout(() => (cover = 'out'), 80);
				setTimeout(() => (cover = 'rest'), 440);
			}, 300);
		});
	});

	// Zipping background lines. Each line shoots across the screen during the
	// first ~35% of its cycle, then rests off-screen — staggered delays keep
	// the zips periodic rather than constant. lane is vh/vw, len is vmax,
	// dur/delay are seconds.
	const lines = [
		{ dir: 'h', lane: 8, len: 34, thick: 2, dur: 7, delay: 0, reverse: false, shade: '#9e9e9e' },
		{ dir: 'h', lane: 21, len: 22, thick: 1.5, dur: 9, delay: 3.2, reverse: true, shade: '#b8b8b8' },
		{ dir: 'h', lane: 33, len: 40, thick: 2.5, dur: 6, delay: 1.4, reverse: false, shade: '#9e9e9e' },
		{ dir: 'h', lane: 46, len: 26, thick: 1.5, dur: 8, delay: 5.6, reverse: false, shade: '#c9c9c9' },
		{ dir: 'h', lane: 58, len: 36, thick: 2, dur: 7.5, delay: 2.3, reverse: true, shade: '#9e9e9e' },
		{ dir: 'h', lane: 69, len: 20, thick: 1.5, dur: 10, delay: 7.1, reverse: false, shade: '#b8b8b8' },
		{ dir: 'h', lane: 81, len: 32, thick: 2, dur: 6.5, delay: 4.4, reverse: true, shade: '#9e9e9e' },
		{ dir: 'h', lane: 92, len: 26, thick: 1.5, dur: 8.5, delay: 0.9, reverse: false, shade: '#c9c9c9' },
		{ dir: 'v', lane: 7, len: 30, thick: 2, dur: 8, delay: 1.8, reverse: false, shade: '#9e9e9e' },
		{ dir: 'v', lane: 19, len: 22, thick: 1.5, dur: 10, delay: 5.1, reverse: true, shade: '#b8b8b8' },
		{ dir: 'v', lane: 34, len: 38, thick: 2.5, dur: 6.5, delay: 3.7, reverse: false, shade: '#9e9e9e' },
		{ dir: 'v', lane: 49, len: 24, thick: 1.5, dur: 9, delay: 0.4, reverse: true, shade: '#c9c9c9' },
		{ dir: 'v', lane: 63, len: 34, thick: 2, dur: 7, delay: 6.3, reverse: false, shade: '#9e9e9e' },
		{ dir: 'v', lane: 78, len: 20, thick: 1.5, dur: 10.5, delay: 2.9, reverse: true, shade: '#b8b8b8' },
		{ dir: 'v', lane: 91, len: 30, thick: 2, dur: 7.5, delay: 4.9, reverse: false, shade: '#9e9e9e' }
	];
</script>

<svelte:window onkeydown={onKeydown} onclick={onGlobalClick} />

<div class="app">
	<div class="main">
		{@render children()}
	</div>

	<button
		class="theme-toggle"
		onclick={toggleTheme}
		aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		{#if dark}
			<SunIcon weight="duotone" />
		{:else}
			<MoonIcon weight="duotone" />
		{/if}
	</button>

	{#if dogShown}
		<img class="doggo" src={dogSrc} alt="" aria-hidden="true" />
	{/if}

	{#each sparks as s (s.id)}
		<span
			class="spark"
			style="left: {s.x}px; top: {s.y}px; --a: {s.angle}deg; --d: {s.dist}px; --size: {s.size}px; --c: {s.color}; --dur: {s.dur}ms;"
		></span>
	{/each}

	<div class="cover" class:in={cover === 'in'} class:out={cover === 'out'} aria-hidden="true"></div>

	<div class="scene" aria-hidden="true">
		{#each lines as l, i (i)}
			<div
				class="line {l.dir}"
				class:reverse={l.reverse}
				style="--lane: {l.lane}{l.dir === 'h' ? 'vh' : 'vw'}; --len: {l.len}vmax; --thick: {l.thick}px; --shade: {l.shade}; animation-duration: {l.dur}s; animation-delay: {l.delay}s;"
			></div>
		{/each}
	</div>
</div>

<style>
	.main {
		font-family: var(--font-body);
		font-optical-sizing: auto;
		font-style: normal;
	}

	.theme-toggle {
		position: fixed;
		top: 1.4rem;
		right: 1.4rem;
		z-index: 60;
		width: 2.7rem;
		height: 2.7rem;
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
	.theme-toggle:hover,
	.theme-toggle:focus-visible {
		background: var(--ink);
		color: var(--bg);
		scale: 1.08;
		outline: none;
	}

	.doggo {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: min(420px, 70vw);
		z-index: 400;
		pointer-events: none;
	}

	/* ── click sparks ────────────────────────────────────── */
	.spark {
		position: fixed;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: var(--c);
		box-shadow: 0 0 6px var(--c);
		pointer-events: none;
		z-index: 100;
		animation: spark-fly var(--dur) cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
	}

	@keyframes spark-fly {
		0% {
			opacity: 1;
			transform: translate(-50%, -50%) rotate(var(--a)) translateX(0) scale(1);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) rotate(var(--a)) translateX(var(--d)) scale(0.2);
		}
	}

	.cover {
		position: fixed;
		inset: 0;
		z-index: 300;
		background: var(--bg);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
		transform: translateX(-102%);
		pointer-events: none;
	}
	.cover.in {
		transform: translateX(0);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.cover.out {
		transform: translateX(102%);
		transition: transform 0.34s cubic-bezier(0.4, 0, 0.2, 1);
	}
	/* 'rest' snaps back to the left, off-screen, with no transition */

	.scene {
		position: fixed;
		inset: 0;
		overflow: hidden;
		z-index: -2;
	}

	.line {
		position: absolute;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-fill-mode: backwards;
		will-change: transform;
	}

	.line.h {
		/* snap onto a dot row: dot centers sit at 12px + n*24px */
		top: calc(round(down, var(--lane), 24px) + 12px - (var(--thick) / 2));
		left: 0;
		width: var(--len);
		height: var(--thick);
		background: linear-gradient(90deg, transparent, var(--shade) 35%, var(--shade) 65%, transparent);
		animation-name: zip-h;
	}

	.line.h.reverse {
		animation-name: zip-h-rev;
	}

	.line.v {
		/* snap onto a dot column */
		left: calc(round(down, var(--lane), 24px) + 12px - (var(--thick) / 2));
		top: 0;
		height: var(--len);
		width: var(--thick);
		background: linear-gradient(180deg, transparent, var(--shade) 35%, var(--shade) 65%, transparent);
		animation-name: zip-v;
	}

	.line.v.reverse {
		animation-name: zip-v-rev;
	}

	@keyframes zip-h {
		0% {
			transform: translateX(calc(-1 * var(--len)));
		}
		35% {
			transform: translateX(100vw);
		}
		100% {
			transform: translateX(100vw);
		}
	}

	@keyframes zip-h-rev {
		0% {
			transform: translateX(100vw);
		}
		35% {
			transform: translateX(calc(-1 * var(--len)));
		}
		100% {
			transform: translateX(calc(-1 * var(--len)));
		}
	}

	@keyframes zip-v {
		0% {
			transform: translateY(calc(-1 * var(--len)));
		}
		35% {
			transform: translateY(100vh);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	@keyframes zip-v-rev {
		0% {
			transform: translateY(100vh);
		}
		35% {
			transform: translateY(calc(-1 * var(--len)));
		}
		100% {
			transform: translateY(calc(-1 * var(--len)));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.line {
			animation: none;
			opacity: 0;
		}
		.spark {
			animation: none;
		}
	}
</style>
