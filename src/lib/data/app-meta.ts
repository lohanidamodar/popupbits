// Catalogue facts that only machines read: the schema.org category and the
// languages each product's content is in. Kept out of products.ts so the
// listing and detail pages do not change when this does. Used by the
// SoftwareApplication JSON-LD, /apps.json and the lang attributes on
// Devanagari text.
//
// Languages are BCP 47 tags for the languages the product's own content is in,
// taken from its description; confirm them against the store listings.

/** schema.org applicationCategory values that Google recognises. */
export type AppCategory =
	| 'BusinessApplication'
	| 'DeveloperApplication'
	| 'DesktopEnhancementApplication'
	| 'EducationalApplication'
	| 'GameApplication'
	| 'LifestyleApplication'
	| 'MultimediaApplication'
	| 'ProductivityApplication'
	| 'ReferenceApplication'
	| 'ShoppingApplication'
	| 'UtilitiesApplication';

export type AppMeta = {
	category: AppCategory;
	languages: string[];
};

const meta: Record<string, AppMeta> = {
	kickstand: { category: 'DeveloperApplication', languages: ['en', 'es'] },
	bhadama: { category: 'ShoppingApplication', languages: ['en'] },
	'mero-nepali': { category: 'EducationalApplication', languages: ['en', 'ne'] },
	aakar: { category: 'DesktopEnhancementApplication', languages: ['en'] },
	achiver: { category: 'ProductivityApplication', languages: ['en'] },
	tipot: { category: 'ProductivityApplication', languages: ['en'] },
	photoready: { category: 'MultimediaApplication', languages: ['en'] },
	listora: { category: 'MultimediaApplication', languages: ['en'] },
	sanskrit: { category: 'EducationalApplication', languages: ['en', 'sa'] },
	sabdabhandar: { category: 'ReferenceApplication', languages: ['ne'] },
	sambandha: { category: 'UtilitiesApplication', languages: ['en'] },
	karmakanda: { category: 'LifestyleApplication', languages: ['ne', 'sa'] },
	jyotisha: { category: 'LifestyleApplication', languages: ['ne', 'en'] },
	kheti: { category: 'GameApplication', languages: ['ne', 'en'] },
	'momo-pasal': { category: 'GameApplication', languages: ['ne', 'en'] },
	gaadidesk: { category: 'BusinessApplication', languages: ['en'] },
	'typer-kids': { category: 'EducationalApplication', languages: ['en'] },
	tilepad: { category: 'UtilitiesApplication', languages: ['en'] },
	sshetu: { category: 'DeveloperApplication', languages: ['en'] },
	karmashala: { category: 'DeveloperApplication', languages: ['en'] },
	spellcraft: { category: 'GameApplication', languages: ['en', 'ne'] },
	'ui-challenges-flutter': { category: 'DeveloperApplication', languages: ['en'] },
	'mero-patro': { category: 'UtilitiesApplication', languages: ['ne', 'en'] }
};

const fallback: AppMeta = { category: 'UtilitiesApplication', languages: ['en'] };

export const getAppMeta = (slug: string): AppMeta => meta[slug] ?? fallback;

/** The language to tag Devanagari text with on a product's pages: Sanskrit for the Sanskrit app, Nepali otherwise. */
export const devanagariLang = (slug: string): 'ne' | 'sa' => (slug === 'sanskrit' ? 'sa' : 'ne');
