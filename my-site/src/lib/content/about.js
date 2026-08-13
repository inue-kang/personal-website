// ─────────────────────────────────────────────────────────────
// ABOUT — edit this file to change the text on the /about page.
// Each section renders as a heading + card, in order.
// See src/lib/content/README.md for a field-by-field guide.
// ─────────────────────────────────────────────────────────────

export const whoAmI = [
	`My name is Inue Kang and I am a student from the Pacific Northwest, currently attending the University of Washington in Seattle. When I'm not coding away, you'll find me attempting to make music, taking walks outside, hanging out with friends, or theorycrafting a new Magic: The Gathering deck.`,
	`Since my first Coding in Python class in middle school, I've been fascinated by what could be accomplished through code, and I've taken that passion to build a variety of projects to solve real problems. I am endlessly curious about how things work, and I love to learn new skills and technologies.`
];

export const skills = [
	'Languages: JS / TS / HTML / CSS / Java / Python',
	'Tools: Visual Studio Code / Claude Code / Git'
];

// { label, href } — each renders as an external link
export const certificates = [
	{
		label: 'Machine Learning (Specialization)',
		href: 'https://coursera.org/share/c292cb95727ed0fc800873f70f5c58ce'
	},
	{
		label: 'Unsupervised Learning, Recommenders, Reinforcement Learning (Course)',
		href: 'https://coursera.org/share/a811c20dcd49b44140ac33d5629eeb38'
	},
	{
		label: 'Advanced Learning Algorithms (Course)',
		href: 'https://coursera.org/share/7ac5257c40bcb8d7c56d3a47f0a368dd'
	},
	{
		label: 'Supervised Machine Learning: Regression and Classification (Course)',
		href: 'https://coursera.org/share/ba9fa1f18b4a620de4004387b8895a68'
	}
];

// structured like contact: text is shown as-is after the label; add href
// to turn the text into a link. Add/remove/reorder freely.
export const miscLinks = [
	{ label: 'GitHub', text: 'My GitHub', href: 'https://github.com/inue-kang' },
	{ label: 'LinkedIn', text: 'My LinkedIn', href: 'https://www.linkedin.com/in/inue-kang/' },
	{ label: 'MTG Decks', text: 'My MTG Decks', href: 'https://archidekt.com/u/InK.Decks.' }
];

// text is shown as-is; add href to turn the text into a link
// (use a mailto: href for email addresses)
export const contact = [
	{ label: 'Discord', text: '@shibest' },
	{
		label: 'Email',
		text: 'contact@inuekang.dev',
		href: 'mailto:contact@inuekang.dev'
	}
];
