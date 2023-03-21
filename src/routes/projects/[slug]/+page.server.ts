import type { PageServerLoad } from "./$types";
import projects from '$lib/data/projects.js';

export const load: PageServerLoad = async ({params}) => {
    let slug = params.slug;
    let project = projects.find((project) => project.slug == slug);
    return {
        ...project
    };
};