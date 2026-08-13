<script>
	import { page } from '$app/state';
	import { siteUrl } from '$lib/content/site.js';
	import { miscLinks } from '$lib/content/about.js';

	// person: set on the homepage only — adds Person structured data so
	// search engines connect the site to its owner and their profiles
	let { title, description, person = false } = $props();

	const image = `${siteUrl}/og.png`;
	const canonical = $derived(`${siteUrl}${page.url.pathname === '/' ? '' : page.url.pathname}`);

	const personLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Inue Kang',
		url: siteUrl,
		sameAs: miscLinks.filter((l) => l.href?.startsWith('http')).map((l) => l.href)
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Inue Kang" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{#if person}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${personLd}<\/script>`}
	{/if}
</svelte:head>
