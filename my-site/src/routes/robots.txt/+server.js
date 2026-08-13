// robots.txt — allow all crawlers and point them at the sitemap
import { siteUrl } from '$lib/content/site.js';

export const prerender = true;

export function GET() {
	const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
