// Landing-page content for /products/<slug>: store screenshots, the pitch,
// feature highlights, facts and FAQ. The catalogue itself (name, links,
// platforms, status) stays in products.ts; this file only adds what the detail
// page shows. Screenshots are the store listings' own images, downloaded to
// static/products/<slug>/ as play-NN.webp, appstore-NN.webp or github-NN.webp.

export type Screenshot = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type Highlight = { title: string; text: string };
export type Fact = { value: string; label: string };
export type Faq = { q: string; a: string };

export type ProductPage = {
	/** In listing order. Portrait images are shown in a grid, landscape ones full width. */
	screenshots: Screenshot[];
	/**
	 * 'phone': the images are raw screen captures and get a device frame.
	 * 'none': the images are store-ready marketing shots or desktop windows.
	 */
	frame: 'phone' | 'none';
	/** The value proposition: why this exists and what it does for you. */
	pitch: { eyebrow: string; headline: string; text: string };
	highlights: Highlight[];
	facts?: Fact[];
	/** Who it is made for. */
	audience?: string[];
	faq?: Faq[];
};

const pad = (n: number) => String(n).padStart(2, '0');

/** Screenshots NN = 1..alts.length from one store set, all the same size. */
const set = (
	slug: string,
	store: 'play' | 'appstore' | 'github',
	width: number,
	height: number,
	alts: string[],
	from = 1
): Screenshot[] =>
	alts.map((alt, i) => ({
		src: `/products/${slug}/${store}-${pad(from + i)}.webp`,
		alt,
		width,
		height
	}));

export const productPages: Record<string, ProductPage> = {
	bhadama: {
		frame: 'phone',
		screenshots: set('bhadama', 'play', 758, 1600, [
			'Map of Kathmandu with rental prices pinned on it, filtered by listing type',
			'Listing form: location, rent or sale, price per month and features',
			'Choosing a listing type: room, flat, apartment, house, hostel, shutter',
			'Side menu with browse, manage listings and settings',
			'Map view with grouped listings and a search button'
		]),
		pitch: {
			eyebrow: 'Why Bhadama',
			headline: 'Rentals in Nepal, found on a map and listed in minutes.',
			text: 'Finding a room or a flat in Nepal still happens through brokers, Facebook groups and word of mouth. Bhadama puts every listing on a map with its price, lets owners list a property in a few taps, and connects the two directly.'
		},
		highlights: [
			{
				title: 'Search on the map',
				text: 'Listings appear where they are, with the price on the pin. Draw a radius around where you want to live and see what is inside it.'
			},
			{
				title: 'Eleven kinds of rental',
				text: 'Rooms, apartments, flats, houses, land, bikes, cars, shutters, hostels, halls and parking, for rent or for sale.'
			},
			{
				title: 'List in minutes',
				text: 'Pick the location, set the price per day, week, month or year, tick the features, and the listing is live with your contact details.'
			},
			{
				title: 'Direct to the owner',
				text: 'Seekers reach property owners and agents directly, with the contact details on the listing. No middleman.'
			},
			{
				title: 'Nepali and English',
				text: 'The whole app in either language, switched at any time.'
			},
			{
				title: 'Light and dark',
				text: 'Material 3 design with light and dark themes and a backend that keeps your account and listings safe.'
			}
		],
		facts: [
			{ value: '11', label: 'listing types' },
			{ value: '2', label: 'languages' },
			{ value: 'Map', label: 'first search' }
		],
		audience: [
			'People looking for a room, flat or house in Nepal',
			'Owners and agents with a property to rent or sell',
			'Anyone renting out a vehicle, shutter, hall or parking space'
		],
		faq: [
			{
				q: 'Where does Bhadama work?',
				a: 'Nepal only. Listings are mapped with their real location, so it is most useful where there are listings near you.'
			},
			{
				q: 'Is it only for rentals?',
				a: 'Rentals first, but every listing type can be marked for sale as well.'
			},
			{
				q: 'Why is it in beta?',
				a: 'The app is live and usable, and we are still shaping it with early users. Expect regular updates.'
			}
		]
	},

	'mero-nepali': {
		frame: 'none',
		screenshots: set('mero-nepali', 'play', 900, 1600, [
			'Home screen with the current lesson and a grid of colourful games',
			'A letter card: उ with a picture of sugarcane and a speaker button',
			'Letter Fishing game: catch the fish carrying the letter you hear',
			'Balloon Pop game: pop the balloon with the right vowel',
			'Listening exercise: hear a sound and pick the matching letter'
		]),
		pitch: {
			eyebrow: 'Why Mero Nepali',
			headline: 'A child’s first steps in Nepali, taught the way children like to learn.',
			text: 'For Nepali families abroad and beginners at home, Mero Nepali teaches the Devanagari alphabet, numbers, colours, animals and first words through structured lessons and games that are spoken by a real voice. No ads, no account, and it works offline.'
		},
		highlights: [
			{
				title: 'Eight progressive levels',
				text: 'From the 13 vowels through all 36 consonants and barakhari to numbers, animals, colours and vocabulary. Each lesson has learn, trace and assess steps, and the next unlocks when it is done.'
			},
			{
				title: 'Eleven games',
				text: 'Letter Fishing, Balloon Pop, Word Rain, Memory Pairs, Sorting Baskets, the Sweet Shop, Barna Jump and more, each practising what the lessons teach.'
			},
			{
				title: 'Letter tracing',
				text: 'Trace every Nepali letter on screen along a guided path, then colour a giant letter in and keep it.'
			},
			{
				title: 'Festival games',
				text: 'Dashain and Tihar at home: raise the linge ping, fly a kite, offer puja, receive tika, light the diyo, fry sel roti. Nothing can be failed.'
			},
			{
				title: 'A sticker book',
				text: 'A good round in any game earns a sticker to arrange on decorated pages. A collection to come back to, not just a reward screen.'
			},
			{
				title: 'Safe for children',
				text: 'No ads, no in-app purchases, no data collection, a parental gate on every external link, and everything works offline.'
			}
		],
		facts: [
			{ value: '8', label: 'levels' },
			{ value: '11', label: 'games' },
			{ value: '100+', label: 'words' },
			{ value: '0', label: 'ads' }
		],
		audience: [
			'Children of Nepali families living abroad',
			'Kids in Nepal starting to read and write',
			'Absolute beginners who want the alphabet first'
		],
		faq: [
			{
				q: 'What age is it for?',
				a: 'Designed for young children learning to read. Lessons are spoken, so a child who cannot read yet can still follow them.'
			},
			{
				q: 'Does it need internet?',
				a: 'No. Everything works offline after download.'
			},
			{
				q: 'Are there ads or in-app purchases?',
				a: 'No. On the App Store the app is bought once and everything is included. There is no data collection and no account.'
			}
		]
	},

	aakar: {
		frame: 'phone',
		screenshots: set('aakar', 'play', 758, 1600, [
			'Keyboard mode: clock, favourites and an always-on keyboard on the home screen',
			'Typing “u” filters apps and contacts instantly, with a Google search fallback',
			'Welcome screen: choose between Standard and Keyboard home styles',
			'Settings: list or grid layout, search bar and keyboard options',
			'All apps grid with a search field at the bottom',
			'Standard mode: clock, date and a row of favourites',
			'Appearance settings: corner roundness, home mode, text size and density'
		]),
		pitch: {
			eyebrow: 'Why Aakar',
			headline: 'One launcher for grandparents and power users, on the same phone.',
			text: 'Most launchers pick a side: huge icons for simplicity, or dense grids for speed. Aakar does both. Standard mode is a clean clock and favourites; Keyboard mode puts a QWERTY keyboard on the home screen so any app or contact is a few letters away. Switch with a long press.'
		},
		highlights: [
			{
				title: 'Two home styles',
				text: 'Standard: clock, favourites and a swipe-up drawer. Keyboard: a pinned grid above an always-on keyboard. Change your mind any time with a long press on home.'
			},
			{
				title: 'Type to open anything',
				text: 'The first letters of an app name or package name find it, even when the label is odd. Contacts too, with a picker for mobile, home and work numbers.'
			},
			{
				title: 'Pin apps and people',
				text: 'Drag icons into a sparse grid that keeps your gaps. Contact tiles show the photo and call on tap. Auto-arrange sorts everything and packs it to thumb height.'
			},
			{
				title: 'Customisation that customises',
				text: 'Compact, cozy or roomy density; light, dark or system theme; seven accent colours; a corner-radius slider; five fonts including Atkinson Hyperlegible for low vision.'
			},
			{
				title: 'Made for Nepal and anywhere',
				text: 'An optional Bikram Sambat date next to the Gregorian one, and good behaviour on Samsung One UI, stock Android and most OEM skins.'
			},
			{
				title: 'Private by design',
				text: 'No account, no cloud, no analytics, no tracking SDKs. Contacts stay on the phone and notification badges only count, never read.'
			}
		],
		facts: [
			{ value: '2', label: 'home styles' },
			{ value: '5', label: 'fonts' },
			{ value: '7', label: 'accent colours' },
			{ value: '0', label: 'trackers' }
		],
		audience: [
			'Older relatives who need big text and big icons',
			'People who would rather type than hunt for an icon',
			'Anyone who wants a launcher without accounts or ads'
		],
		faq: [
			{
				q: 'Will it work on my phone?',
				a: 'Aakar is an Android home launcher and runs on stock Android, Samsung One UI and most manufacturer skins. Set it as the default home app from its settings.'
			},
			{
				q: 'Does it read my notifications?',
				a: 'Only if you opt in to badges, and then only the count per app. It never reads the content, and you can revoke the permission any time.'
			},
			{
				q: 'Is it free?',
				a: 'Yes, with no ads and no in-app purchases.'
			}
		]
	},

	achiver: {
		frame: 'none',
		screenshots: set('achiver', 'play', 783, 1600, [
			'Pomodoro timer ready to start a 25-minute work session, with today’s total and streak',
			'Projects list with ongoing projects, each with its own client and rate',
			'Stats: tracked hours, sessions, billable amount and charts for the month',
			'Invoices list with sent and paid invoices and their amounts'
		]),
		pitch: {
			eyebrow: 'Why Achiver',
			headline: 'From the first Pomodoro to the paid invoice, in one app.',
			text: 'Most time trackers stop at the timer. Achiver ties every session to a project and client, keeps the hourly rate with the project, and turns the hours into a PDF invoice you can send from your phone. Then it tracks the payment.'
		},
		highlights: [
			{
				title: 'Pomodoro or stopwatch',
				text: 'Classic work, short break and long break cycles, or a stopwatch when the work does not fit a block. Idle detection asks before a forgotten timer inflates a bill.'
			},
			{
				title: 'Projects, clients, rates',
				text: 'An hourly rate and currency per project, per-client rounding for billing increments, tags, and billable or non-billable marking.'
			},
			{
				title: 'Invoices and estimates',
				text: 'Turn tracked hours into line items, add discounts and tax, send a clean PDF, and convert an accepted estimate into an invoice. Multiple business profiles if you wear more than one hat.'
			},
			{
				title: 'Payments and revenue',
				text: 'Record partial payments, see overdue invoices before they go quiet, and a dashboard of tracked, invoiced and outstanding amounts.'
			},
			{
				title: 'Reports you can export',
				text: 'Patterns by day, hour, project and tag; daily and weekly focus goals with streaks; export to CSV, Excel, JSON or a printable PDF.'
			},
			{
				title: 'Offline, synced, private',
				text: 'Track and edit without a connection and sync across devices when you are back online. No ads and no third-party analytics.'
			}
		],
		facts: [
			{ value: '1', label: 'tap to start, from the widget' },
			{ value: '4', label: 'export formats' },
			{ value: '0', label: 'ads or trackers' }
		],
		audience: [
			'Freelance developers, designers and writers who bill by the hour',
			'Consultants, lawyers and tutors who need a timesheet and an invoice',
			'Anyone who wants Pomodoro focus with a record of where the time went'
		],
		faq: [
			{
				q: 'Do I need an account?',
				a: 'Only for sync across devices. Everything works offline on one device without signing in.'
			},
			{
				q: 'Can I invoice without tracking time?',
				a: 'Yes. Invoices take tracked hours as line items, but you can add custom line items, discounts and tax rates by hand.'
			},
			{
				q: 'What does the home screen widget do?',
				a: 'Starts a session in one tap, so tracking begins before you open the app.'
			}
		]
	},

	tipot: {
		frame: 'none',
		screenshots: set('tipot', 'play', 739, 1600, [
			'Today view with a week strip, the Nepali month alongside and today’s tasks',
			'Tasks filtered by all, overdue, upcoming and no date, with due dates and stars',
			'Notes as cards: a reading list, Dashain shopping and a Pokhara trip plan',
			'Dashboard: what needs attention, today’s tasks and recent notes'
		]),
		pitch: {
			eyebrow: 'Why Tipot',
			headline: 'A calm, fast home for tasks and notes, with the Nepali calendar built in.',
			text: 'Tipot is a to-do list, a daily planner, a block-based notebook and a day counter in one quiet app. It works fully offline, shows Bikram Sambat dates everywhere you want them, and syncs only if you ask it to.'
		},
		highlights: [
			{
				title: 'Plan your day',
				text: 'A Today view with a swipeable week strip and a month calendar. Due dates, reminders, sub-tasks, stars, and repeats like “the 2nd Tuesday”. Someday for everything without a date yet.'
			},
			{
				title: 'Notes that hold their shape',
				text: 'A block editor with headings, checklists, quotes, callouts, code and dividers. Embed real to-dos inside a note, lock a note against accidental edits, and read it clean.'
			},
			{
				title: 'Count the days',
				text: 'Counters track days since or until: petrol fills, bills, birthdays and deadlines, with reminders before a date or after the last entry.'
			},
			{
				title: 'Nepali and Gregorian',
				text: 'Switch between Bikram Sambat and AD. Nepali dates run through the Today strip, the calendar and every date picker.'
			},
			{
				title: 'Capture in a tap',
				text: 'Share text from any app straight into a task or note, or long-press the icon for a new one. Link notes to tasks and contacts, tag anything, search everything.'
			},
			{
				title: 'Yours, everywhere',
				text: 'Offline first, with opt-in sync across devices. Export a backup as a zip of Markdown and JSON, and import it anywhere. Trash keeps deletions for 90 days.'
			}
		],
		facts: [
			{ value: '2', label: 'calendars, BS and AD' },
			{ value: '90', label: 'days in Trash' },
			{ value: '0', label: 'ads or tracking' }
		],
		audience: [
			'People who plan the day in Nepali dates as well as English ones',
			'Note-takers who want structure without a heavy app',
			'Anyone keeping tasks, notes and reminders in one quiet place'
		],
		faq: [
			{
				q: 'Does Tipot need an account?',
				a: 'No. Sign in only if you want sync across devices. Your data lives on your device otherwise.'
			},
			{
				q: 'Can I get my notes out?',
				a: 'Yes. Export a backup as a zip: notes as Markdown, everything else as JSON. Import it back on any device.'
			},
			{
				q: 'Does it do repeating tasks?',
				a: 'Daily, weekly, monthly, quarterly, half-yearly or yearly, including rules like the second Tuesday of a month.'
			}
		]
	},

	photoready: {
		frame: 'phone',
		screenshots: set('photoready', 'play', 758, 1600, [
			'Home: take a photo, choose from the gallery or try the sample, with 58 documents built in',
			'Document step: Nepal passport at 35 × 45 mm, 300 DPI, with the head height and eye line measured',
			'Choosing a document: passports, visas and ID cards with recently used ones first',
			'Background step: the original beside the cut-out, with white, off-white, grey and blue options',
			'Crop step: the face framed automatically, meeting every rule for this document',
			'Export: a digital photo at the exact pixel size and DPI for online applications',
			'Print sheet: a grid of copies on 4 × 6 inch paper with cut guides',
			'Print sheet on A4 with the paper sizes to choose from'
		]),
		pitch: {
			eyebrow: 'Why PhotoReady',
			headline: 'A passport photo that meets the rules, made on your phone in a minute.',
			text: 'Photo counters charge for a crop. PhotoReady does the crop to the document’s own published numbers, removes the background on the device, checks the result in millimetres, and gives you a print-ready file or a sheet of copies for any print shop. No account, no internet, no upload of your face.'
		},
		highlights: [
			{
				title: '58 documents built in',
				text: 'Passport, visa and ID photo specifications for Nepal, India, the US, the Schengen area, the UK, Canada, Australia and 30 more countries, plus generic 35 × 45 mm, 2 × 2 inch and stamp sizes.'
			},
			{
				title: 'Background removed on the phone',
				text: 'Replace it with white, light grey, blue or any colour your document allows. Shot against a plain wall already? Skip the step and keep your own.'
			},
			{
				title: 'Face positioned to the millimetre',
				text: 'Face detection sets head height, eye line, margins and tilt to that document’s numbers, and a compliance check tells you what is off and how to fix it.'
			},
			{
				title: 'Print sheets with cut guides',
				text: '4 × 6, 5 × 7, 8 × 10, A4, A5 or US Letter, with adjustable copies, margins and gaps. Take the file to any print shop.'
			},
			{
				title: 'Files that print at the right size',
				text: 'A print-ready JPEG, a transparent PNG or a PDF sheet, each with the correct DPI written into the file.'
			},
			{
				title: 'Make your own size',
				text: 'Build a template with size, resolution, background colour, head-height band and eye-line band. It is checked like a built-in one.'
			}
		],
		facts: [
			{ value: '58', label: 'document specs' },
			{ value: '6', label: 'paper sizes' },
			{ value: '0', label: 'uploads' },
			{ value: '~1 min', label: 'per photo' }
		],
		audience: [
			'Anyone applying for a passport, visa or ID',
			'Families preparing several applications at once',
			'Travellers who need a compliant photo with no signal and no counter nearby'
		],
		faq: [
			{
				q: 'Is my photo uploaded anywhere?',
				a: 'No. Face detection and background removal ship inside the app. There is no server, no analytics and no sign-in.'
			},
			{
				q: 'Does it retouch my face?',
				a: 'Never. It crops, resizes and can replace the background. Some authorities, including the United States, reject edited photos; where a replaced background is not allowed, shoot against a plain light wall and skip that step.'
			},
			{
				q: 'Are the rules guaranteed?',
				a: 'They are our best reading of each authority’s published requirements and can change. Check the issuing authority’s own guidance before you submit. The specifications are open on GitHub.'
			},
			{
				q: 'Is there a watermark or a limit?',
				a: 'No watermark, no export limit and no per-photo charge.'
			}
		]
	},

	listora: {
		frame: 'none',
		screenshots: set('listora', 'play', 813, 1600, [
			'Home: most downloaded and recently added LibriVox audiobooks',
			'Book page for The Art of War with chapters, a play button and download all',
			'Now playing: full-screen artwork, scrubber, skip buttons, speed and sleep timer',
			'Library: favourites, continue listening and downloaded books',
			'Search results for “sherlock” across the whole catalogue'
		]),
		pitch: {
			eyebrow: 'Why Listora',
			headline: 'Thousands of classic audiobooks, free, with a player made for listening.',
			text: 'LibriVox volunteers have recorded the public-domain classics; the Internet Archive hosts them. Listora is a beautiful, open-source player on top of both: browse, search, download for offline, and pick up exactly where you left off. No subscription, no ads, no account.'
		},
		highlights: [
			{
				title: 'The whole LibriVox catalogue',
				text: 'Most downloaded, newly added, search by title or author, and “more by this author” to explore everything they narrated.'
			},
			{
				title: 'An immersive player',
				text: 'Full-screen artwork, a smooth scrubber, skip back 10 s and forward 30 s, playback speed from 0.75× to 2×, and a sleep timer for bedtime.'
			},
			{
				title: 'Offline listening',
				text: 'Download a chapter or a whole book for the plane, the trail or the commute. Downloads play straight from the device.'
			},
			{
				title: 'Remembers your place',
				text: 'Every book resumes where you stopped. Favourites, continue listening and downloads live together in your Library.'
			},
			{
				title: 'Background playback',
				text: 'Lock-screen and notification controls keep you in charge without unlocking the phone.'
			},
			{
				title: 'Free and open source',
				text: 'GPL-3.0 licensed, with the source on GitHub. No sign-up and no cost.'
			}
		],
		facts: [
			{ value: '1000s', label: 'of free audiobooks' },
			{ value: '0.75–2×', label: 'playback speed' },
			{ value: 'GPL-3.0', label: 'open source' }
		],
		audience: [
			'Readers who want the classics read aloud for free',
			'Commuters and walkers who listen offline',
			'Students of literature and languages'
		],
		faq: [
			{
				q: 'Is it really free?',
				a: 'Yes. All audio is in the public domain, recorded by LibriVox volunteers and served by the Internet Archive. Listora adds no cost, ads or account.'
			},
			{
				q: 'Is Listora affiliated with LibriVox?',
				a: 'No. It is an independent player and is not affiliated with LibriVox or the Internet Archive.'
			},
			{
				q: 'Can I contribute?',
				a: 'The source is on GitHub under the GPL-3.0 licence. Issues and pull requests are welcome.'
			}
		]
	},

	sanskrit: {
		frame: 'none',
		screenshots: set('sanskrit', 'appstore', 737, 1600, [
			'Every sūtra worked through: a Laghu Kaumudī sūtra with its step-by-step derivation',
			'200 verb roots conjugated: the root भू with participles and present-tense forms',
			'All eight cases at a glance: the declension table for राम',
			'Grammar one lesson at a time: what is sandhi, with core phrases',
			'Practise with instant feedback: a sandhi exercise marked correct',
			'Something new to read each day: a verse, a verb root and a sūtra on the home screen',
			'Read the Gītā in Sanskrit: a verse with transliteration and translation'
		]),
		pitch: {
			eyebrow: 'Why Sanskrit',
			headline: 'Sanskrit grammar the way it has long been taught, in your pocket and offline.',
			text: 'Begin with the Devanagari script and simple sentences, then study grammar through the sūtras of the Laghu Siddhānta Kaumudī, each one worked through on real words. Lessons, exercises, declension and conjugation tables, and the complete Bhagavad Gītā to read, in English and Nepali.'
		},
		highlights: [
			{
				title: 'Laghu Siddhānta Kaumudī',
				text: 'All 1,279 sūtras in 60 chapters with their Pāṇini reference and IAST transliteration, and 1,301 worked examples that derive a word step by step.'
			},
			{
				title: '93 lessons, 60 on grammar',
				text: 'From the script to reading connected Sanskrit, with a separate grammar track covering sandhi, case, compounds and syntax.'
			},
			{
				title: '890 exercises',
				text: 'Instant feedback in nine sets: sandhi, declension, conjugation, case usage, compound analysis, word formation, translation, sentence correction and mixed practice.'
			},
			{
				title: 'Roots and declensions',
				text: 'A Dhātu Kosha of 200 verb roots, 50 conjugated in full across five tenses and moods, and declension tables for 748 words across eight cases and three numbers.'
			},
			{
				title: 'Reading',
				text: 'The complete Bhagavad Gītā, 701 verses with transliteration and translation, plus subhāṣitas, stories and riddles. A verse, a root and a sūtra offered every day.'
			},
			{
				title: 'Offline, bilingual, private',
				text: 'Interface, lessons and translations in English and Nepali. Everything bundled in the app, no account, no ads, no tracking.'
			}
		],
		facts: [
			{ value: '1,279', label: 'sūtras' },
			{ value: '890', label: 'exercises' },
			{ value: '748', label: 'declined words' },
			{ value: '701', label: 'Gītā verses' }
		],
		audience: [
			'Adult learners who want the grammar, not just phrases',
			'Students of the Pāṇinian tradition and the Laghu Kaumudī',
			'Readers who want to understand the Gītā and stotras in the original'
		],
		faq: [
			{
				q: 'Is there audio?',
				a: 'No recorded audio. Pronunciation is taught through written IAST transliteration, with vowel length, retroflex sounds and visarga marked on every word.'
			},
			{
				q: 'Do I need to know Devanagari?',
				a: 'No. The course starts with the script, and every word carries its transliteration.'
			},
			{
				q: 'Which language is the commentary in?',
				a: 'The sūtra commentary is written in Nepali. The interface, lessons and translations are available in both English and Nepali.'
			}
		]
	},

	sabdabhandar: {
		frame: 'phone',
		screenshots: [],
		pitch: {
			eyebrow: 'Why Sabdabhandar',
			headline: 'A Nepali dictionary that understands how you type, fully offline.',
			text: 'Type “pani” in Roman letters and get पानी. Sabdabhandar is a modern Nepali–Nepali dictionary with 128,000+ entries, rich definitions with examples, etymology, synonyms and word families, spoken pronunciation and a daily word puzzle. Everything on the device.'
		},
		highlights: [
			{
				title: '128,000+ entries',
				text: 'A comprehensive Nepali–Nepali dictionary with definitions, usage examples, etymology, synonyms and word families.'
			},
			{
				title: 'Smart search',
				text: 'Search in Devanagari or in Roman letters: “pani” finds पानी.'
			},
			{
				title: 'Hear the word',
				text: 'Text-to-speech pronunciation for every entry.'
			},
			{
				title: 'A daily word puzzle',
				text: 'A short puzzle each day to grow your vocabulary.'
			},
			{
				title: 'Fully offline',
				text: 'The whole dictionary is on the device, with full-text search that stays fast.'
			}
		],
		facts: [
			{ value: '128K+', label: 'entries' },
			{ value: 'Offline', label: 'always' }
		],
		audience: [
			'Students and writers working in Nepali',
			'Diaspora Nepalis keeping their vocabulary sharp',
			'Anyone who types Nepali in Roman letters'
		]
	},

	sambandha: {
		frame: 'phone',
		screenshots: set('sambandha', 'play', 740, 1600, [
			'Contacts grouped alphabetically with favourites, tags and last-contact notes',
			'A contact: work, birthday in three days, relationships, memories and notes',
			'Memories timeline: coffee, a call about a trip, a job offer, a recommendation',
			'Upcoming birthdays and important dates with days remaining',
			'Settings: appearance, tags, relationships, duplicates, vCard import and backup'
		]),
		pitch: {
			eyebrow: 'Why Sambandha',
			headline: 'Remember the whole person, not just the number.',
			text: 'Sambandha, meaning relationship, is a private personal CRM. It keeps how you met, what you talked about, who they are connected to and when to reach out next, and it reminds you of birthdays on the real Bikram Sambat date. Offline, with no account and no cloud.'
		},
		highlights: [
			{
				title: 'Rich profiles',
				text: 'Notes, photos, multiple numbers, emails and addresses, work and education history. Search finds anyone by name or number, across country codes.'
			},
			{
				title: 'Log memories',
				text: 'A meeting, a call, a message, a milestone, a gift, with dates, photos and several people per memory. A timeline per contact and a feed of everything.'
			},
			{
				title: 'Map relationships',
				text: 'Link people into a graph of family, friends and colleagues, with family grouped by closeness: immediate, extended and in-laws.'
			},
			{
				title: 'Stay in touch',
				text: 'Set a keep-in-touch cadence and see who is going cold. One-time follow-up reminders with a completed history so nothing slips.'
			},
			{
				title: 'Birthdays in BS and AD',
				text: 'An Upcoming view with reminders in advance, and native Bikram Sambat support so a birthday can be on its real Nepali date.'
			},
			{
				title: 'Yours to keep',
				text: 'Tags, groups, vCard import and export, QR-code sharing, bulk actions and two-way sync with the device address book. No sign-up, no backend, no tracking.'
			}
		],
		facts: [
			{ value: '2', label: 'calendars for birthdays' },
			{ value: 'QR', label: 'contact exchange' },
			{ value: '0', label: 'cloud, 0 account' }
		],
		audience: [
			'People who want to keep up with friends and family on purpose',
			'Freelancers and founders who need a light leads list without a sales tool',
			'Nepali families who track birthdays and dates in Bikram Sambat'
		],
		faq: [
			{
				q: 'Does it replace my phone’s contacts app?',
				a: 'It can sit alongside it. Two-way sync keeps the device address book in step, and you can import and export vCard files.'
			},
			{
				q: 'Where is my data?',
				a: 'On your phone only. There is no backend and no account. Export a backup to a file you keep.'
			},
			{
				q: 'Can I use it for work leads?',
				a: 'Yes. Tag leads and work a focused list of people you have not reached out to yet.'
			}
		]
	},

	karmakanda: {
		frame: 'none',
		screenshots: set('karmakanda', 'play', 900, 1600, [
			'Every step, every mantra: Lakshmi puja with the mantra, what to do and what it means',
			'Close to 100 vidhis: daily rites, pujas, festivals and samskaras to browse',
			'Durga Puja, day by day: all ten days of Navaratri',
			'Your sankalpa in your name: the sankalpa filled in with your name, gotra and the day',
			'Rudri, suktas and stotras: ninety collections to recite',
			'Count your japa: a mala counter that keeps your place',
			'Nothing forgotten: a samagri checklist for every puja',
			'When does sutak end? The ashaucha calculator by relation and date'
		]),
		pitch: {
			eyebrow: 'Why Karmakanda',
			headline: 'Perform a puja the way the book sets it out, one step at a time.',
			text: 'Karmakanda brings close to a hundred vidhis to your phone: daily rites, festival pujas, vratas, the sixteen samskaras, homa, dana and shraddha. The reader walks you through every step in order, with the mantra to recite, what to do while reciting it and what it means, in Nepali or English. Offline, with no account or ads.'
		},
		highlights: [
			{
				title: 'Puja, step by step',
				text: 'Daily rites from pratah kritya to devapuja; Durga Puja for all ten days of Navaratri, Lakshmi Puja, Bhai Tika, Satyanarayan, Haritalika, Shivaratri and many more; samskaras from namakarana to vivaha; shraddha and the rites after death.'
			},
			{
				title: 'Your sankalpa, written for you',
				text: 'Enter your name, thar, gotra and place once. Every sankalpa is filled in instead of saying “amuka”. Not sure of your gotra? Look it up in the thar–gotra–pravara list.'
			},
			{
				title: 'Ninety collections to recite',
				text: 'Rudri with optional Vedic accent marks, Purusha Sukta, Shri Sukta, Durga Saptashati, Bhagavad Gita, Vishnu Sahasranama, Shiva Mahimna, Aditya Hridaya, Hanuman stotras and more.'
			},
			{
				title: 'Tools for the day',
				text: 'A samagri list per puja or per day to tick off and share, a japa mala counter, an ahuti counter inside homa steps, and an ashaucha calculator for when sutak and jutho end.'
			},
			{
				title: 'Made for reading',
				text: 'Larger text, light and dark, keep-screen-on, auto-scroll, a whole-day view, and search across every vidhi, step and mantra in Devanagari or Roman letters.'
			},
			{
				title: 'Share and print',
				text: 'Any vidhi, or one day of it, as a printable PDF. Progress is saved and favourites pinned.'
			}
		],
		facts: [
			{ value: '~100', label: 'vidhis' },
			{ value: '90', label: 'mantra collections' },
			{ value: '10', label: 'days of Durga Puja' },
			{ value: '0', label: 'ads or tracking' }
		],
		audience: [
			'Families performing pujas at home without a priest at hand',
			'Purohits who want the text, the samagri list and the counters in one place',
			'Anyone who wants to understand the meaning of what is recited'
		],
		faq: [
			{
				q: 'Which language is it in?',
				a: 'The interface, instructions and meanings are in Nepali or English. Mantras are in Devanagari.'
			},
			{
				q: 'Does it work offline?',
				a: 'Yes, entirely. No account, no ads, no tracking; your sankalpa details and reading progress stay on the phone.'
			},
			{
				q: 'I found a mistake in a vidhi.',
				a: 'Please write to info@popupbits.com with the vidhi and step. Corrections are welcome.'
			}
		]
	},

	jyotisha: {
		frame: 'phone',
		screenshots: set('jyotisha', 'play', 720, 1600, [
			'Today: the Bikram Sambat date, tithi, nakshatra and the auspicious time running now',
			'Patro: a Bikram Sambat month with AD dates and tithis, holidays marked',
			'Festivals and holidays for the month, with the day of the week and AD date',
			'Kundali: a North Indian lagna chart with graha positions below',
			'Kundali: the hora varga chart with rashi details',
			'Dasha: Vimshottari mahadasha and antardasha with the running period and its reading',
			'Records: saved kundalis for clients with birth details',
			'Muhurta search: the best windows of a day with what each suits'
		]),
		pitch: {
			eyebrow: 'Why Jyotisha',
			headline: 'Panchanga, patro and a full kundali, calculated on your phone in Nepali.',
			text: 'Open it for today’s tithi and auspicious times, look up any month and its festivals, or work through a complete kundali with sixteen vargas, dashas, transits and matching. A jyotishi gets a client workspace with saved records and printable reports. Every calculation runs on the device.'
		},
		highlights: [
			{
				title: 'Today and the patro',
				text: 'Bikram Sambat and AD dates, the tithi with the time it ends, sunrise and sunset for your place, nakshatra, yoga and karana, and the favourable and unfavourable periods with the one running now marked.'
			},
			{
				title: 'A complete kundali',
				text: 'North Indian chart with lagna, Moon chart and all sixteen vargas from D1 to D60, graha positions and dignity, bhava chalit, drishti, birth chakras, and a Cheena birth sheet with image and PDF export.'
			},
			{
				title: 'Dashas and transits',
				text: 'Vimshottari, Tribhagi, Yogini and Chara dashas down to pratyantar with the running period for today, gochar and varshaphal, shadbala and ashtakavarga.'
			},
			{
				title: 'Readings that explain themselves',
				text: 'Yogas and observations, readings by topic for career, marriage, education, finance and health, and “यो किन?” explanations of how each result was reached.'
			},
			{
				title: 'Muhurta and matching',
				text: 'The best windows of a day with choghadiya and hora, a planner for the best days over the next 30 or 90 days, and kundali milan with guna score, kootas, manglik and rajju.'
			},
			{
				title: 'For jyotishis',
				text: 'A client workspace with saved records, search, tags, pins and notes, comparison of two records, import and export, and printable PDF reports.'
			}
		],
		facts: [
			{ value: '16', label: 'varga charts' },
			{ value: '4', label: 'dasha systems' },
			{ value: '3', label: 'calculation methods' },
			{ value: '0', label: 'internet needed' }
		],
		audience: [
			'Anyone who checks the tithi and the auspicious time before starting the day',
			'Practising jyotishis with clients to keep records for',
			'Students of Vedic astrology who want to see how a result is reached'
		],
		faq: [
			{
				q: 'Which calculation method does it use?',
				a: 'Your choice of Surya Siddhanta, Ketaki Siddhanta or Improved Surya Siddhanta, with kundali terms in Devanagari, English or IAST.'
			},
			{
				q: 'Is it in English?',
				a: 'The app is in Nepali. Kundali terms can be shown in Devanagari, English or IAST, with Devanagari or Western numerals.'
			},
			{
				q: 'Where are my clients’ records stored?',
				a: 'On your phone. There is no account and no server. Export records as files to back them up or move them.'
			}
		]
	},

	kheti: {
		frame: 'none',
		screenshots: [],
		pitch: {
			eyebrow: 'Why Kheti',
			headline: 'A gentle farming game set on a Nepali hillside.',
			text: 'Tend a 3D homestead on stone terraces: plant radish, maize and marigold, cook dal-bhat for the family, pay off the sahukar at the haat bazaar, and automate the farm with pumps and compost drips. In Nepali and English, offline, with no ads.'
		},
		highlights: [
			{
				title: 'Terraces to tend',
				text: 'Grow from one stone-terraced bed to twelve, planting radish, maize and marigold through the seasons.'
			},
			{
				title: 'Feed the family',
				text: 'Cook daily dal-bhat rations from what the farm gives.'
			},
			{
				title: 'The sahukar’s loan',
				text: 'Sell at the haat bazaar and pay the village moneylender back, one instalment at a time.'
			},
			{
				title: 'Automate the farm',
				text: 'Water pump motors and compost drip systems take over the chores as you grow.'
			},
			{
				title: 'Nepali and English, offline',
				text: 'Fully bilingual, 100% offline, no ads and no tracking.'
			}
		],
		facts: [
			{ value: '12', label: 'terraced beds' },
			{ value: '3D', label: 'hillside homestead' },
			{ value: '0', label: 'ads' }
		],
		audience: [
			'Players who like calm, cosy farming games',
			'Nepalis at home and abroad who know these hillsides',
			'Kids and parents who want a game without ads or purchases'
		]
	},

	'momo-pasal': {
		frame: 'none',
		screenshots: set('momo-pasal', 'play', 1200, 676, [
			'The shop mid-shift: customers at the counter, steamers on the stove, plates and achar ready',
			'Serving a rush with a combo running and orders coming in',
			'Day 8 at level 6: the khata is due in three days, with Kitchen, Bazaar and Decor to visit',
			'What’s cooking today: jhol first, add achar, khursani if they ask, and today’s goals',
			'The Kitchen shop: a kadai for fried momo, a fourth steamer tier, mushroom masala and chilli sauce'
		]),
		pitch: {
			eyebrow: 'Why Momo Pasal',
			headline: 'Run your own little veg momo shop in Kathmandu.',
			text: 'Hot momos, a steel plate, a spoon of tomato achar. Fill the steamer, pull the momos the moment they are ready, plate them and serve before anyone walks off in a huff. Climb from a street cart to momo emperor while paying the weekly khata. Fully in Nepali and English, offline, with no ads or purchases.'
		},
		highlights: [
			{
				title: 'Cook against the clock',
				text: 'Soggy momos go in the bin. Serve fast and the combo keeps climbing. Some customers want it धेरै पिरो: add khursani on the achar.'
			},
			{
				title: 'From ठेला to मोमो सम्राट',
				text: 'Every day earns XP. Level up to unlock steamer tiers, plates, a big burner, paneer, mushroom and cheese-corn fillings, a jhol handi, a kadai and chilli sauce for C-momo.'
			},
			{
				title: 'Run the shop, not just the stove',
				text: 'Buy masala and khursani at the bazaar, pay rent and gas on the weekly khata early for a discount or fall into udharo, and unlock the delivery app for online orders.'
			},
			{
				title: 'Decorate',
				text: 'Marigolds, a radio, a fan, a thangka, a TV showing cricket and a glowing sign. Happy customers wait longer and tip more.'
			},
			{
				title: 'Timed or cozy',
				text: 'Timed mode: the clock runs and customers walk out. Cozy mode: no clock, nobody leaves, momos stay fresh longer. Three save slots with autosave.'
			},
			{
				title: 'Kathmandu shop vibes',
				text: 'Prayer flags, carved windows, steel plates and clay handi, fully in Nepali and English. Offline, no ads, no in-app purchases, no account.'
			}
		],
		facts: [
			{ value: '4', label: 'fillings' },
			{ value: '4', label: 'momo styles' },
			{ value: '3', label: 'save slots' },
			{ value: '0', label: 'ads or purchases' }
		],
		audience: [
			'Fans of time-management cooking games',
			'Anyone homesick for a Kathmandu momo shop',
			'Players who want a cozy mode with no pressure'
		],
		faq: [
			{
				q: 'Are there in-app purchases?',
				a: 'No. Everything is unlocked by playing, with no ads, no purchases and no account.'
			},
			{
				q: 'Is it in Nepali?',
				a: 'Fully in Nepali and English. Switch any time.'
			},
			{
				q: 'What if I don’t like timers?',
				a: 'Play cozy mode: no clock, nobody leaves, and momos stay fresh longer.'
			}
		]
	},

	gaadidesk: {
		frame: 'phone',
		screenshots: [],
		pitch: {
			eyebrow: 'Why Gaadidesk',
			headline: 'Sell more recondition vehicles with fewer missed follow-ups.',
			text: 'A recondition showroom runs on inquiries, follow-ups and paperwork, usually spread across notebooks, phone calls and chat. Gaadidesk puts inventory, buyer inquiries, follow-ups, documents and financing in one app, built for the way Nepali showrooms actually work.'
		},
		highlights: [
			{
				title: 'Inventory',
				text: 'Every vehicle in the showroom, in one list.'
			},
			{
				title: 'Inquiries and follow-ups',
				text: 'Record each buyer inquiry and the follow-up it needs, so none is missed.'
			},
			{
				title: 'Documents',
				text: 'The documents for each vehicle and each sale, kept with the vehicle.'
			},
			{
				title: 'Financing',
				text: 'Financing for a sale, tracked alongside the inquiry it belongs to.'
			},
			{
				title: 'Built for Nepal',
				text: 'Made for recondition dealers in Nepal, in the terms and workflows showrooms use.'
			}
		],
		audience: [
			'Recondition vehicle dealers and showroom staff in Nepal',
			'Owners who want to see the whole pipeline at a glance'
		]
	},

	'typer-kids': {
		frame: 'none',
		screenshots: set('typer-kids', 'github', 1200, 597, [
			'Typer Kids home screen on the desktop: start learning, all lessons and typing games'
		]),
		pitch: {
			eyebrow: 'Why Typer Kids',
			headline: 'A colourful typing tutor for kids, free on the desktop.',
			text: 'Structured lessons teach touch typing one key group at a time, and arcade-style games make the practice feel like play. Free and open source under GPL-3.0, with builds for Linux, macOS and Windows.'
		},
		highlights: [
			{
				title: 'Structured lessons',
				text: 'A lesson path that builds from the home row outward, at a child’s pace.'
			},
			{
				title: 'Typing games',
				text: 'Arcade-style games that turn the keys learned so far into play.'
			},
			{
				title: 'Profiles',
				text: 'Each child picks a profile and keeps their own progress.'
			},
			{
				title: 'Keyboard first',
				text: 'Buttons show their key, so children drive the app from the keyboard they are learning.'
			},
			{
				title: 'Free and open source',
				text: 'GPL-3.0 licensed. Download a build for Linux, macOS or Windows, or build it from source.'
			}
		],
		facts: [
			{ value: '3', label: 'desktop platforms' },
			{ value: 'GPL-3.0', label: 'open source' },
			{ value: 'Free', label: 'no ads' }
		],
		audience: [
			'Children learning to touch type',
			'Parents and teachers who want a free tutor without ads',
			'Schools with Linux, macOS or Windows machines'
		]
	},

	tilepad: {
		frame: 'none',
		screenshots: [
			...set('tilepad', 'github', 1003, 1600, [
				'The phone client: a deck page with a system monitor, clock, active window, media controls and shortcuts'
			]),
			...set(
				'tilepad',
				'github',
				1200,
				851,
				[
					'The server’s button editor: a Mute/Unmute toggle with actions, a toggled-on face and hold actions'
				],
				2
			)
		],
		pitch: {
			eyebrow: 'Why Tilepad',
			headline: 'Your phone as a touch deck for your desktop, free and open source.',
			text: 'A Tilepad server runs on your computer; the client on your phone or tablet shows a grid of tiles for shortcuts, media controls, scene switches and macros. An open-source alternative to Touch Portal, cross-platform and BSD-3 licensed.'
		},
		highlights: [
			{
				title: 'A grid of tiles',
				text: 'Pages of tiles for media keys, shortcuts, launching apps and running macros, laid out the way you want.'
			},
			{
				title: 'Live tiles',
				text: 'System monitor, clock and the active window update live on the deck.'
			},
			{
				title: 'Toggles and hold actions',
				text: 'A button can alternate faces, like Mute and Unmute, and run a different action set when held.'
			},
			{
				title: 'Server and client',
				text: 'The server runs on Windows or Linux; the client runs on Android, connecting over your own network.'
			},
			{
				title: 'Free and open source',
				text: 'BSD-3-Clause licensed, with releases and source on GitHub.'
			}
		],
		facts: [
			{ value: 'BSD-3', label: 'open source' },
			{ value: 'LAN', label: 'no cloud' }
		],
		audience: [
			'Streamers and presenters who want scene and media controls at hand',
			'Developers who run the same commands all day',
			'Anyone who wants a stream deck without buying one'
		]
	},

	sshetu: {
		frame: 'none',
		screenshots: [],
		pitch: {
			eyebrow: 'Why SSHetu',
			headline: 'Your servers in one place, from a phone, a tablet or a desktop.',
			text: 'SSHetu keeps your hosts and keys together and connects from any device: a real terminal, an SFTP file browser, port forwarding and SSH keys generated on the device. No backend and no account. Named from सेतु, a bridge.'
		},
		highlights: [
			{
				title: 'A real terminal',
				text: 'Full terminal sessions to every host you keep, on Android, Windows, macOS and Linux.'
			},
			{
				title: 'SFTP file browser',
				text: 'Browse, upload and download files on the server from the same app.'
			},
			{
				title: 'Tunnels',
				text: 'Port forwarding to reach services behind the server.'
			},
			{
				title: 'Keys made on the device',
				text: 'Generate SSH keys on the device. Hosts and keys stay in the OS keychain.'
			},
			{
				title: 'Move between devices, privately',
				text: 'Hosts move to a second device over your own network, and back up to an encrypted file you keep. No backend, no account.'
			},
			{
				title: 'Free and open source',
				text: 'MIT licensed, with releases for every platform on GitHub.'
			}
		],
		facts: [
			{ value: '4', label: 'platforms' },
			{ value: 'MIT', label: 'open source' },
			{ value: '0', label: 'backend' }
		],
		audience: [
			'Developers and sysadmins who manage servers from more than one device',
			'Anyone who wants an SSH client that keeps keys out of the cloud'
		]
	},

	karmashala: {
		frame: 'none',
		screenshots: [],
		pitch: {
			eyebrow: 'Why Karmashala',
			headline: 'The hall where the agents work, on your desktop and in your pocket.',
			text: 'Karmashala runs coding-agent CLIs, Claude Code, Codex and Antigravity, on your desktop, on a server, or both, and lets you follow them from your phone. Embedded terminals and chat, an editor and file explorer, per-turn checkpoints, device and browser tooling, and an MCP server of its own. Free and open source.'
		},
		highlights: [
			{
				title: 'Three agents, one place',
				text: 'Claude Code, Codex and Antigravity sessions side by side, each with its own transcript and terminal.'
			},
			{
				title: 'Follow from your phone',
				text: 'Run the agents on a desktop or a server and watch, answer and steer from the Android app.'
			},
			{
				title: 'Checkpoints per turn',
				text: 'Capture the working tree every turn, diff between checkpoints and restore when an agent goes wrong.'
			},
			{
				title: 'Editor and explorer',
				text: 'Read and edit the code the agent is changing without leaving the app.'
			},
			{
				title: 'Device and browser tooling',
				text: 'Boot emulators, install builds, tap and screenshot devices, and drive a browser, all exposed to the agents.'
			},
			{
				title: 'An MCP server of its own',
				text: 'Agents inside Karmashala can start sessions, delegate work, record decisions and read store data through its tools.'
			}
		],
		facts: [
			{ value: '3', label: 'agent CLIs' },
			{ value: '4', label: 'platforms' },
			{ value: 'Apache-2.0', label: 'open source' }
		],
		audience: [
			'Developers running several coding agents at once',
			'Teams who want agents on a server and oversight from anywhere',
			'Flutter developers who want device tooling in the agent’s hands'
		]
	},

	spellcraft: {
		frame: 'phone',
		screenshots: set('spellcraft', 'play', 739, 1600, [
			'Home: choose a level, quick practice, choose a theme and your own word lists',
			'Choose your level: kindergarten and grades 1 to 6',
			'Create a word list with a name, description and your own words',
			'Practice: hear the word, type the answer with the letter grid',
			'Themes: animals, colours, food, body parts, family, school, toys and nature'
		]),
		pitch: {
			eyebrow: 'Why SpellCraft',
			headline: 'Spelling practice by dictation, the way kids actually learn it.',
			text: 'SpellCraft reads a word aloud, at normal or slow speed, and the child spells it on a letter grid with instant feedback. Six grade levels, ten themes, 1,000+ words, and custom word lists for this week’s homework. No ads, no purchases, works offline.'
		},
		highlights: [
			{
				title: 'Voice-powered learning',
				text: 'Clear audio dictation, repeat at normal or slow speed, and letter-by-letter help when a word is hard.'
			},
			{
				title: 'Six grades, ten themes',
				text: 'Age-appropriate words from kindergarten to grade 6, and themes like animals, colours, food, school and sports.'
			},
			{
				title: 'Your own word lists',
				text: 'Parents and teachers create lists for homework and track progress across several children.'
			},
			{
				title: 'Feedback that encourages',
				text: 'Instant feedback, a retry system for difficult words and celebration screens for achievements.'
			},
			{
				title: 'Progress tracking',
				text: 'Daily streaks, accuracy, words attempted against words correct, and lesson completion reports.'
			},
			{
				title: 'Kid-friendly and safe',
				text: 'Large touch targets, light and dark themes, phones and tablets, no ads, no in-app purchases, and it works offline.'
			}
		],
		facts: [
			{ value: '1,000+', label: 'words' },
			{ value: '6', label: 'grade levels' },
			{ value: '10', label: 'themes' },
			{ value: '0', label: 'ads' }
		],
		audience: [
			'Children from kindergarten to grade 6',
			'Parents running homework spelling practice',
			'Teachers and homeschooling families who need custom lists'
		],
		faq: [
			{
				q: 'Does it need internet?',
				a: 'No. Dictation and practice work offline.'
			},
			{
				q: 'Can I add my own words?',
				a: 'Yes. Create a word list with its own name and description and practise from it like any built-in list.'
			}
		]
	},

	'ui-challenges-flutter': {
		frame: 'none',
		screenshots: set('ui-challenges-flutter', 'play', 900, 1600, [
			'Flutter UI Challenges on three phones: the app’s menu of categories',
			'Settings and profile screens in the challenge collection',
			'Settings with notification preferences and the drawer of categories',
			'A banking app home screen: balance, quick actions and last transactions',
			'View Code: the Dart source of a screen inside the app',
			'Share Code: send the source of a screen to another app',
			'A dark profile screen with language, email and push settings',
			'A calendar with the day’s meetings in cards'
		]),
		pitch: {
			eyebrow: 'Why UI Challenges',
			headline: 'A hundred-plus Flutter screens you can run, read and copy.',
			text: 'Since 2018, UI Challenges has collected production-quality screens built in Flutter: logins, dashboards, e-commerce, food, travel, banking, animations. Install it to see each one run, open the source inside the app, and take what you need. Open source under MIT.'
		},
		highlights: [
			{
				title: '100+ screens',
				text: 'Login and sign-up flows, profiles, settings, lists, dashboards, e-commerce, food and recipe apps, travel, banking, invitations and more.'
			},
			{
				title: 'Code inside the app',
				text: 'View the Dart source of any screen and share it to another app, without leaving the phone.'
			},
			{
				title: 'Animations',
				text: 'Animated app bars, bottom navigation and page transitions you can study on a device, not a GIF.'
			},
			{
				title: 'Used by thousands',
				text: 'A long-running reference app that thousands of developers have learned Flutter from, with over 10,000 installs on Google Play.'
			},
			{
				title: 'MIT licensed',
				text: 'The full repository is on GitHub. Copy a screen into your project or contribute one back.'
			}
		],
		facts: [
			{ value: '100+', label: 'screens' },
			{ value: '10K+', label: 'installs on Play' },
			{ value: '2018', label: 'running since' },
			{ value: 'MIT', label: 'open source' }
		],
		audience: [
			'Developers learning Flutter who learn best from working examples',
			'Designers checking what a layout looks like in Flutter',
			'Teams looking for a starting point for a screen'
		],
		faq: [
			{
				q: 'Can I use the screens in my app?',
				a: 'Yes. The repository is MIT licensed. Copy what you need; attribution is appreciated.'
			},
			{
				q: 'Is it still updated?',
				a: 'It is maintained as a reference and updated when there is something worth adding. The source on GitHub is the latest.'
			}
		]
	}
};

export const getProductPage = (slug: string): ProductPage | undefined => productPages[slug];
