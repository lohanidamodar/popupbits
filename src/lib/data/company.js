import { content } from './index.js';

// Export the complete company info with stats, contact, and social
export default {
  name: content.site.name,
  tagline: content.site.tagline,
  description: content.site.description,
  ...content.company,
  contact: content.contact,
  social: content.contact.social,
  stats: {
    experience: content.stats.experience + "+",
    projectsCompleted: content.stats.projectsCompleted,
    clientsSatisfied: content.stats.clientsSatisfied
  }
};
