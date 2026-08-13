<script>
	import Header from '../Header.svelte';
	import ArrowSquareOutIcon from 'phosphor-svelte/lib/ArrowSquareOutIcon';
	import { whoAmI, skills, certificates, miscLinks, contact } from '$lib/content/about.js';
	import Seo from '$lib/Seo.svelte';
</script>

<Seo title="about" description="more about me" />

<Header></Header>
<div class="content">
	<h1>About Me</h1>
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
	.info {
		padding: 2vh 2vw;
		background: var(--card);
		border: 1px solid var(--card-border);
		backdrop-filter: blur(10px);
		border-radius: 2vw;
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
