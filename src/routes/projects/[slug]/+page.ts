import type { PageLoad } from './$types';
import projects from '$lib/data/projects.js';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
        throw error(404, 'Project not found');
    }

    return {
        title: project.title,
        description: project.description,
        tech: project.tech,
        image: project.image,
        slug: project.slug,
        github: project.github || null,
        web: project.web || null,
        playStore: project.playStore || null,
        appStore: project.appStore || null
    };
};
