<script>
	import Header from '../Header.svelte';
	import ArrowSquareOutIcon from 'phosphor-svelte/lib/ArrowSquareOutIcon';
	import { status, whoAmI, skills, certificates, miscLinks, contact } from '$lib/content/about.js';
	import Seo from '$lib/Seo.svelte';
</script>

<Seo title="about" description="more about me" />

<Header></Header>
<div class="content">
	<h1>About Me</h1>
	{#if status.length}
		<div class="status-bar">
			<span class="status-label">Currently</span>
			{#each status as item (item)}
				<span class="status-pill"><span class="status-dot"></span>{item}</span>
			{/each}
		</div>
	{/if}
	<div class="about">
		<h2>Who am I?</h2>
		<div class="info">
			{#each whoAmI as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>
		<h2>Skills</h2>
		<div class="info">
			{#each skills as line (line)}
				<p>{line}</p>
			{/each}
		</div>
		<h2>Certificates</h2>
		<div class="info">
			{#each certificates as cert (cert.href)}
				<p><a target="_blank" href={cert.href}>{cert.label}<ArrowSquareOutIcon /></a></p>
			{/each}
		</div>
		{#if miscLinks.length}
			<h2>Misc Links</h2>
			<div class="info">
				{#each miscLinks as entry (entry.label)}
					<p class="misc-row">
						{#if entry.icon}
							{@const Icon = entry.icon}
							<span class="misc-icon"><Icon weight="duotone" /></span>
						{/if}
						{entry.label}:
						{#if entry.href}
							<a
								class="misc-link"
								target={entry.href.startsWith('mailto:') ? undefined : '_blank'}
								href={entry.href}>{entry.text}<ArrowSquareOutIcon /></a
							>
						{:else}
							{entry.text}
						{/if}
					</p>
				{/each}
			</div>
		{/if}
		<h2>Contact Me</h2>
		<div class="info">
			{#each contact as entry (entry.label)}
				<p>
					{entry.label}:
					{#if entry.href}
						<a
							target={entry.href.startsWith('mailto:') ? undefined : '_blank'}
							href={entry.href}>{entry.text}</a
						>
					{:else}
						{entry.text}
					{/if}
				</p>
			{/each}
		</div>
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
	h2 {
		font-size: 1.5vw;
	}
	p {
		font-size: 1vw;
	}
	.about {
		margin-bottom: 6vh;
	}
	/* ── status bar ──────────────────────────────────────── */
	.status-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 0.9rem;
		margin: 0 auto 2.5vh; /* horizontally centered */
		padding: 0.7rem max(1.5rem, 2vw);
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
		border-radius: 999px;
		width: fit-content;
	}
	.status-label {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-dim);
	}
	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.85rem;
	}
	.status-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--ink);
		animation: status-pulse 2.4s ease-in-out infinite;
	}
	@keyframes status-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.status-dot {
			animation: none;
		}
	}

	.info {
		/* the max() keeps side padding comfortable on narrow screens */
		padding: 2vh max(1.5rem, 2vw);
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
		border-radius: 2vw;
	}

	/* misc links read unmistakably as links: icon, underline, out-arrow */
	.misc-row .misc-link {
		text-decoration: underline;
	}
	.misc-icon {
		display: inline-block;
		vertical-align: -0.18em;
		font-size: 1.15em;
		margin-right: 0.15rem;
	}
	a {
		font-size: 1vw;
		color: var(--accent);
		text-decoration: none;
		transition: 0.2s;
	}
	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 1.8rem;
		}
		h2 {
			font-size: 1.05rem;
		}
		p,
		a {
			font-size: 0.9rem;
		}
	}
</style>
