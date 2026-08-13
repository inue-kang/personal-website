// sitemap for search engines — regenerated on every build from the
// content files, so new projects/posts are included automatically
import { projects } from '$lib/content/projects.js';
import { posts } from '$lib/content/posts.js';
import { siteUrl } from '$lib/content/site.js';

export const prerender = true;

export function GET() {
	const paths = [
		'',
		'/projects',
		'/posts',
		'/awards',
		'/about',
		...projects.map((p) => `/projects/${p.slug}`),
		...posts.map((p) => `/posts/${p.slug}`)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
