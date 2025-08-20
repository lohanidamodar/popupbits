import contentData from './content.js';

// Main content object with all website data
export const content = contentData;

// Individual exports for backward compatibility and easier imports
export const site = content.site;
export const company = content.company;
export const contact = content.contact;
export const stats = content.stats;
export const hero = content.hero;
export const services = content.services;
export const technologies = content.technologies;
export const pricing = content.pricing;
export const projects = content.projects;
export const testimonials = content.testimonials;
export const about = content.about;
export const blog = content.blog;
export const seo = content.seo;
export const navigation = content.navigation;

// Utility functions for filtering and accessing data
export const getServicesByCategory = (category) => {
    if (category === 'all') return services;
    return services.filter(service => service.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
};

export const getTechnologiesByCategory = (category) => {
    if (category === 'all') return technologies;
    return technologies.filter(tech => tech.category.toLowerCase() === category.toLowerCase());
};

export const getPopularPricingPlan = () => {
    return pricing.find(plan => plan.popular);
};

export const getFeaturedBlogPosts = () => {
    return blog.featuredPosts || [];
};

// SEO helper functions
export const getPageTitle = (pageTitle) => {
    return pageTitle ? `${pageTitle} - ${site.name}` : seo.defaultTitle;
};

export const getPageDescription = (pageDescription) => {
    return pageDescription || seo.defaultDescription;
};

export default content;
