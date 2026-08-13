// ─────────────────────────────────────────────────────────────
// PROJECTS — edit this file to add/remove/change projects.
// Each entry becomes an orb on /projects and a page at /projects/<slug>.
// See src/lib/content/README.md for a field-by-field guide.
// ─────────────────────────────────────────────────────────────
import CloudSunIcon from 'phosphor-svelte/lib/CloudSunIcon';
import MapPinIcon from 'phosphor-svelte/lib/MapPinIcon';
import PlanetIcon from 'phosphor-svelte/lib/PlanetIcon';
import MagnifyingGlassIcon from 'phosphor-svelte/lib/MagnifyingGlassIcon';
import WindIcon from 'phosphor-svelte/lib/WindIcon';
import BookBookmarkIcon from 'phosphor-svelte/lib/BookBookmarkIcon';

import img_acclimate from '$lib/assets/acclimate.avif';
import img_pinscout from '$lib/assets/pinscout.C4CbqxjS.avif';
import img_cmail from '$lib/assets/cmail.OhCrrboZ.avif';
import img_papercut from '$lib/assets/papercut.BA6ec049.avif';
import img_respir from '$lib/assets/respir.NzXN-C-F.avif';
import img_tcgscout_homepage from '$lib/assets/tcgscout-homepage.avif';
import img_tcgscout_pokemon from '$lib/assets/tcgscout-pokemon.avif';
import img_tcgscout_pack_subpage from '$lib/assets/tcgscout-pack-subpage.avif';
import img_tcgscout_simulate from '$lib/assets/tcgscout-simulate.avif';
import img_tcgscout_compare from '$lib/assets/tcgscout-compare.avif';
import img_tcgscout_community from '$lib/assets/tcgscout-community.avif';
import img_tcgscout_about from '$lib/assets/tcgscout-about.avif';
import img_tcgscout_signin from '$lib/assets/tcgscout-signin.avif';


export const projects = [
	{
		slug: 'tcgscout',
		name: 'TCGScout',
		tag: 'tcg product database', // short line inside the orb
		blurb: 'a comprehensive product database for trading card games', // subtitle on the detail page
		icon: BookBookmarkIcon, // any icon from https://phosphoricons.com (import it above)
		links: [{ label: 'site', href: 'https://www.thetcgscout.com/' }],
		// each string is one paragraph; plain HTML like <a> is allowed
		body: [
			`TCGScout is a comprehensive product database for trading card games. It provides users with detailed information about cards, sets, and products, 
			making it easy to research and collect their favorite cards. I built this site to solve the problem of figuring out what's inside TCG products and 
			what is the value you can expect from purchasing them. It's something I wish I had when I got back into the hobby, and I hope it can help others as well.`
		],
		images: [
			{ image: img_tcgscout_homepage, alt: 'TCGScout homepage screenshot', caption: 'Homepage' },
			{ image: img_tcgscout_pokemon, alt: 'TCGScout Pokemon set page screenshot', caption: 'Pokemon Set Page' },
			{ image: img_tcgscout_pack_subpage, alt: 'TCGScout pack subpage screenshot', caption: 'Pack Subpage' },
			{ image: img_tcgscout_simulate, alt: 'TCGScout simulate page screenshot', caption: 'Simulate Page' },
			{ image: img_tcgscout_compare, alt: 'TCGScout compare page screenshot', caption: 'Compare Page' },
			{ image: img_tcgscout_community, alt: 'TCGScout community page screenshot', caption: 'Community Page' },
			{ image: img_tcgscout_about, alt: 'TCGScout about page screenshot', caption: 'About Page' },
			{ image: img_tcgscout_signin, alt: 'TCGScout sign-in page screenshot', caption: 'Sign-In Page' }
		]
	},
	{
		slug: 'acclimate',
		name: 'AccliMate',
		tag: 'weather assistant', // short line inside the orb
		blurb: 'The (mostly) all-in-one weather assistant', // subtitle on the detail page
		icon: CloudSunIcon, // any icon from https://phosphoricons.com (import it above)
		links: [
			{ label: 'site', href: 'https://acclimate.vercel.app/' },
			{ label: 'github', href: 'https://github.com/inue-kang/ipc-hackathon-2025' }
		],
		// each string is one paragraph; plain HTML like <a> is allowed
		body: [
			`AccliMate is an (almost) all-in-one weather assistant. Alongside a sleek UI to see the current weather,
			future weather, and any weather advisories/alerts, we created a trip planner service that briefs you on potential
			weather conditions you might expect along a road trip. We also integrated an AI assistant that suggests weather-appropriate
			activities, gives tips on how to stay safe and prepared during inclement weather, and can answer any weather-related questions
			in your area. For more insight,
			check out our devpost page here: <a target="_blank" href="https://devpost.com/software/acclimate-26zdjt">Devpost - Acclimate</a>.`
		],
		// carousel images — add more objects to add slides.
		// alt is required (screen readers); caption is optional.
		images: [{ image: img_acclimate, alt: 'AccliMate homepage screenshot', caption: 'Homepage' }]
	},
	{
		slug: 'pinscout',
		name: 'pinScout',
		tag: 'urban resource map',
		blurb: 'a user-powered map to find hidden urban resources',
		icon: MapPinIcon,
		links: [
			{ label: 'site', href: 'https://pinscout.vercel.app/' },
			{ label: 'github', href: 'https://github.com/refact0r/pinscout' }
		],
		body: [
			`pinScout is a web app that provides a space for users to contribute to crowdsource data on urban resources that most people
			might find helpful or not know much about. It was created by me, refact0r, raymon-zhang and won third place in our group at the 2025 EmP Hackfest - AccessHack.
			It was built with the SvelteKit framework, and utilized Mapbox for the map API and Supabase for storing user and location information. For more insight,
			check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/pinscout">refact0r.dev/projects/pinscout</a>.`
		],
		images: [{ image: img_pinscout, alt: 'pinScout homepage screenshot', caption: 'Homepage' }]
	},
	{
		slug: 'cmail',
		name: 'cmail',
		tag: 'interplanetary mail',
		blurb: 'an interplanetary pseudo-messaging platform',
		icon: PlanetIcon,
		links: [
			{ label: 'site', href: 'https://cmail.vercel.app' },
			{ label: 'github', href: 'https://github.com/refact0r/cmail' }
		],
		body: [
			`cmail is an interplanetary pseudo-messaging platform on the web created by me, refact0r, ben-6, and raymon-zhang.
			This project was submitted for the 2024 EmP Hackfest - SpaceHack and won first place in our group. It was built with
			the SvelteKit framework and utilized Supabase to handle message contents. For more insight,
			check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/cmail">refact0r.dev/projects/cmail</a>.`
		],
		images: [{ image: img_cmail, alt: 'cmail homepage screenshot', caption: 'Homepage' }]
	},
	{
		slug: 'papercut',
		name: 'papercut',
		tag: 'academic search',
		blurb: 'an AI-powered academic search engine',
		icon: MagnifyingGlassIcon,
		links: [
			{ label: 'site', href: 'https://papercut-nu.netlify.app/' },
			{ label: 'github', href: 'https://github.com/refact0r/papercut' }
		],
		body: [
			`papercut is an AI-powered academic search engine designed to help scholars find research papers quickly
			and effectively. It was created by me, refact0r, ben-6, and NicoNekoru and won 2nd place for design at the 2024 HackPNW Spring.
			It was built with the Svelte framework and utilized ChatGPT to handle search prompts. For more insight,
			check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/papercut">refact0r.dev/projects/papercut</a>.`
		],
		images: [{ image: img_papercut, alt: 'papercut homepage screenshot', caption: 'Homepage' }]
	},
	{
		slug: 'respir',
		name: 'respir',
		tag: 'breathing exercises',
		blurb: 'a breathing exercise assistant',
		icon: WindIcon,
		links: [
			{ label: 'site', href: 'https://respir.netlify.app/' },
			{ label: 'github', href: 'https://github.com/refact0r/respir' }
		],
		body: [
			`respir is a web application designed to help people destress with breathing exercises and won 1st place overall
			at the 2024 IPC Winter Hackathon. Made by me, refact0r, and ben-6, it was built with the SvelteKit framework and
			utilized browser storage to store user-made exercises. For more insight,
			check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/respir">refact0r.dev/projects/respir</a>.`
		],
		images: [{ image: img_respir, alt: 'respir homepage screenshot', caption: 'Homepage' }]
	}
];
