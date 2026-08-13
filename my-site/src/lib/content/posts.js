// ─────────────────────────────────────────────────────────────
// POSTS — edit this file to add/remove posts.
// Each entry becomes a sticky note on /posts and a page at
// /posts/<slug>. Newest first; pinned posts float to the front.
// An empty array shows "No posts currently."
// See src/lib/content/README.md for a field-by-field guide.
// ─────────────────────────────────────────────────────────────

// Example post — copy this shape into the array below:
// {
//     slug: 'another-post',    // the URL: /posts/another-post
//     title: 'Another post',
//     date: '8/13/26',
//     pinned: true,            // optional: pin to the front with a pin icon
//     color: '#fdf2b3',        // optional sticky-note color (this yellow is the default)
//     body: [
//         'Each string is one paragraph. Plain HTML like <a href="...">links</a> is allowed.',
//         // an image between paragraphs — put the file in src/lib/assets,
//         // import it at the top of this file, and reference it here.
//         // alt is required (screen readers); caption is optional.
//         // { image: myImage, alt: 'What the image shows', caption: 'Shown to readers' },
//         'Another paragraph.'
//     ]
// }

/** @type {{ slug: string, title: string, date: string, pinned?: boolean, color?: string, body: Array<string | { image: string, alt: string, caption?: string }> }[]} */
export const posts = [
	{
		slug: 'my-first-post',
		title: 'My First Post',
		date: '8/13/26',
        pinned: true,
		body: [
			'Hello to whomever may be reading this! This is my first post on my personal website, and I am excited to share my thoughts and experiences with you.',
			'I will be posting on random occasions about many different topics from tech to trading card games, so stay tuned for more updates. Thank you for visiting my site!'
		]
	}
];
