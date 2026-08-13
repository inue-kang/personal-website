import { error } from '@sveltejs/kit';
import { projects } from '$lib/content/projects.js';

// tells the prerenderer which project pages exist
export const entries = () => projects.map(({ slug }) => ({ slug }));

export const load = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
