export { company } from './data/company.js';
export type { Company, CompanyStat, SocialLinks } from './data/company.js';

export { products, featuredProducts, getProductBySlug } from './data/products.js';
export type {
	Product,
	ProductLink,
	ProductLinkKind,
	ProductPlatform,
	ProductStatus
} from './data/products.js';

export { default as SEO } from './components/SEO.svelte';
export { default as PageHeader } from './components/PageHeader.svelte';

export {
	posts,
	getPostBySlug,
	getPostComponent,
	getPostsByProduct,
	formatPostDate
} from './data/posts.js';
export type { Post, PostMeta } from './data/posts.js';
