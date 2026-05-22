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
        github: project.links?.github || null,
        web: project.links?.web || null,
        playStore: project.links?.playStore || null,
        appStore: (project.links as Record<string, string | null>)?.appStore || null
    };
};
