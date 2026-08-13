// Sanity checks for the content files — `npm test` runs these, so a typo
// in src/lib/content/ gets caught before it ships.
import { describe, it, expect } from 'vitest';
import { projects } from './projects.js';
import { years } from './awards.js';
import { posts } from './posts.js';
import { whoAmI, skills, certificates, miscLinks, contact } from './about.js';

describe('projects content', () => {
	it('has unique, url-safe slugs', () => {
		const slugs = projects.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
	});

	it('every project has the required fields', () => {
		for (const p of projects) {
			expect(p.name, p.slug).toBeTruthy();
			expect(p.tag, p.slug).toBeTruthy();
			expect(p.blurb, p.slug).toBeTruthy();
			expect(p.icon, p.slug).toBeTruthy();
			expect(Array.isArray(p.links), p.slug).toBe(true);
			expect(p.body.length, p.slug).toBeGreaterThan(0);
			for (const link of p.links) {
				expect(link.label, p.slug).toBeTruthy();
				expect(link.href, p.slug).toMatch(/^https?:\/\//);
			}
		}
	});
});

describe('awards content', () => {
	it('has unique award ids across all years', () => {
		const ids = years.flatMap((y) => y.awards.map((a) => a.id));
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('every award has the required fields', () => {
		for (const y of years) {
			expect(y.year).toMatch(/^\d{4}$/);
			expect(y.awards.length, y.year).toBeGreaterThan(0);
			for (const a of y.awards) {
				expect(a.name, a.id).toBeTruthy();
				expect(a.place, a.id).toBeTruthy();
				expect(a.date, a.id).toBeTruthy();
				expect(a.title, a.id).toBeTruthy();
				expect(a.meta, a.id).toBeTruthy();
				expect(a.objective, a.id).toBeTruthy();
				// link is either null ("Currently Unavailable") or {label, href}
				if (a.link) expect(a.link.href, a.id).toMatch(/^https?:\/\//);
			}
		}
	});
});

describe('posts content', () => {
	it('has unique, url-safe slugs', () => {
		const slugs = posts.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
	});

	it('every post has the required fields', () => {
		for (const post of posts) {
			expect(post.title, post.slug).toBeTruthy();
			expect(post.date, post.slug).toBeTruthy();
			expect(post.body.length, post.slug).toBeGreaterThan(0);
		}
	});
});

describe('about content', () => {
	it('has text in every section', () => {
		expect(whoAmI.length).toBeGreaterThan(0);
		expect(skills.length).toBeGreaterThan(0);
		expect(certificates.length).toBeGreaterThan(0);
		expect(contact.length).toBeGreaterThan(0);
		for (const cert of certificates) expect(cert.href).toMatch(/^https?:\/\//);
		for (const link of miscLinks) {
			expect(link.label).toBeTruthy();
			expect(link.text).toBeTruthy();
			if (link.href) expect(link.href).toMatch(/^(https?:\/\/|mailto:)/);
		}
	});
});
