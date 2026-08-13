<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import HouseIcon from 'phosphor-svelte/lib/HouseIcon';
	import ProjectorScreenIcon from 'phosphor-svelte/lib/ProjectorScreenIcon';
	import NoteBlankIcon from 'phosphor-svelte/lib/NoteBlankIcon';
	import MedalIcon from 'phosphor-svelte/lib/MedalIcon';
	import UserIcon from 'phosphor-svelte/lib/UserIcon';

	const RADIUS = 6.4; // rem, distance of icons from orb center
	const links = [
		{ href: '/', label: 'Home', icon: HouseIcon },
		{ href: '/projects', label: 'Projects', icon: ProjectorScreenIcon },
		{ href: '/posts', label: 'Posts', icon: NoteBlankIcon },
		{ href: '/awards', label: 'Awards', icon: MedalIcon },
		{ href: '/about', label: 'About', icon: UserIcon }
	].map((link, i, all) => {
		// fan the icons across the lower semicircle, left to right
		const angle = ((180 - (i * 180) / (all.length - 1)) * Math.PI) / 180;
		return {
			...link,
			tx: (Math.cos(angle) * RADIUS).toFixed(2),
			ty: (Math.sin(angle) * RADIUS).toFixed(2)
		};
	});

	let open = $state(false);
	/** @type {HTMLElement | undefined} */
	let navEl = $state();
	// on touch screens hover events are synthesized inconsistently, so the
	// orb becomes a pure click-toggle there
	let touchMode = false;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let closeTimer;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let navTimer;

	onMount(() => {
		touchMode = matchMedia('(hover: none)').matches;
	});

	function openNav() {
		clearTimeout(closeTimer);
		open = true;
	}

	function closeNav() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => (open = false), 220);
	}

	function enterNav() {
		if (!touchMode) openNav();
	}

	function leaveNav() {
		if (!touchMode) closeNav();
	}

	function toggleNav() {
		clearTimeout(closeTimer);
		open = !open;
	}

	// open on keyboard focus only — click/tap focus is handled by toggleNav,
	// and letting it through here would insta-close every orb tap
	/** @param {FocusEvent} event */
	function onFocusIn(event) {
		if (event.target instanceof Element && event.target.matches(':focus-visible')) openNav();
	}

	/** @param {FocusEvent} event */
	function onFocusOut(event) {
		if (!(event.relatedTarget instanceof Node && navEl?.contains(event.relatedTarget))) closeNav();
	}

	/** @param {MouseEvent} event */
	function onWindowClick(event) {
		if (open && navEl && !(event.target instanceof Node && navEl.contains(event.target))) {
			clearTimeout(closeTimer);
			open = false;
		}
	}

	// short delay so the click sparks (rendered globally by the layout)
	// register before the page transition starts
	/**
	 * @param {MouseEvent} event
	 * @param {string} href
	 */
	function navigate(event, href) {
		event.preventDefault();
		clearTimeout(navTimer);
		navTimer = setTimeout(() => goto(href), 150);
	}
</script>

<svelte:window onclick={onWindowClick} />

<div class="nav-spacer"></div>

<nav
	bind:this={navEl}
	class="orb-nav"
	class:open
	aria-label="Site navigation"
	onmouseenter={enterNav}
	onmouseleave={leaveNav}
	onfocusin={onFocusIn}
	onfocusout={onFocusOut}
>
	<button
		type="button"
		class="orb"
		onclick={toggleNav}
		aria-expanded={open}
		aria-label="Toggle navigation"
	>
		<span class="orb-name">Inue<br />Kang</span>
	</button>

	{#each links as link, i (link.href)}
		{@const Icon = link.icon}
		<div class="icon-pos" style="--i: {i}; --tx: {link.tx}rem; --ty: {link.ty}rem;">
			<a
				class="icon-link"
				href={link.href}
				onclick={(e) => navigate(e, link.href)}
				aria-label={link.label}
			>
				<Icon weight="duotone" />
				<span class="tip">{link.label}</span>
			</a>
		</div>
	{/each}
</nav>


<style>
	.nav-spacer {
		height: 10.5rem;
	}

	.orb-nav {
		/* absolute, not fixed: the orb lives at the top of the page and
		   scrolls away with it */
		position: absolute;
		top: 1.2rem;
		left: 50%;
		transform: translateX(-50%);
		width: 21rem;
		height: 15rem;
		z-index: 70; /* above the theme toggle (60) */
		pointer-events: none;
	}

	/* ── the orb ─────────────────────────────────────────── */
	.orb {
		pointer-events: auto;
		position: absolute;
		z-index: 2; /* icons fan out from behind the orb */
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 50%;
		display: grid;
		place-items: center;
		padding: 0;
		font: inherit;
		cursor: pointer;
		background: var(--ink);
		border: 1px solid var(--ink);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
		transition:
			box-shadow 0.4s ease,
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.orb-nav.open .orb,
	.orb:hover {
		transform: translateX(-50%) scale(1.06);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.orb-name {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.02rem;
		line-height: 1.3;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--bg);
	}

	/* ── fan-out icon links ──────────────────────────────── */
	/* the wrapper carries the fan/stagger animation; the link inside keeps
	   its hover colors instant */
	.icon-pos {
		pointer-events: none;
		position: absolute;
		z-index: 1; /* behind the orb */
		top: 3.75rem; /* orb center */
		left: 50%;
		opacity: 0;
		/* keep the same transform function list as the open state
		   (translate, translate, scale) so the browser can interpolate —
		   mismatched lists snap discretely instead of animating */
		transform: translate(-50%, -50%) translate(0rem, 0rem) scale(0);
		transition:
			transform 0.25s cubic-bezier(0.55, 0, 0.55, 1),
			opacity 0.22s ease-in;
		/* collapse counterclockwise: left icon (9 o'clock) first, then around
		   through the bottom to the right icon (3 o'clock) */
		transition-delay: calc(var(--i) * 45ms);
	}

	.orb-nav.open .icon-pos {
		pointer-events: auto;
		opacity: 1;
		transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1);
		transition:
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.25s ease;
		transition-delay: calc(var(--i) * 45ms);
	}

	.icon-link {
		position: relative;
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		font-size: 1.5rem;
		color: var(--ink);
		background: var(--surface);
		border: 1.5px solid var(--ink);
		backdrop-filter: blur(4px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.icon-link:hover,
	.icon-link:focus-visible {
		color: var(--bg);
		background: var(--ink);
		outline: none;
	}

	/* ── icon tooltips ───────────────────────────────────── */
	.tip {
		position: absolute;
		top: 115%;
		left: 50%;
		transform: translateX(-50%) translateY(-0.3rem);
		font-family: var(--font-display);
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--bg);
		background: var(--ink);
		border-radius: 0.5rem;
		padding: 0.25rem 0.55rem;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.icon-link:hover .tip,
	.icon-link:focus-visible .tip {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}


	@media (prefers-reduced-motion: reduce) {
		.icon-pos,
		.icon-link,
		.orb {
			transition: none;
		}
	}
</style>
