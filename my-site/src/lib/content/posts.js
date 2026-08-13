// ─────────────────────────────────────────────────────────────
// POSTS — edit this file to add/remove posts.
// Each entry becomes a sticky note on /posts and a page at
// /posts/<slug>. Newest first. An empty array shows
// "No posts currently."
// See src/lib/content/README.md for a field-by-field guide.
// ─────────────────────────────────────────────────────────────

// Example post — copy this shape into the array below:
// {
//     slug: 'another-post',    // the URL: /posts/another-post
//     title: 'Another post',
//     date: '8/13/26',
//     color: '#fdf2b3',        // optional sticky-note color (this yellow is the default)
//     body: [
//         'Each string is one paragraph.',
//         'Plain HTML like <a href="...">links</a> is allowed.'
//     ]
// }

/** @type {{ slug: string, title: string, date: string, color?: string, body: string[] }[]} */
export const posts = [
	{
		slug: 'my-first-post',
		title: 'My First Post',
		date: '8/13/26',
		body: [
			'Hello to whomever may be reading this! This is my first post on my personal website, and I am excited to share my thoughts and experiences with you.',
			'I will be posting on random occasions about many different topics from tech to trading card games, so stay tuned for more updates. Thank you for visiting my site!'
		]
	}
];
