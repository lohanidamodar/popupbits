<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Jyotisha — Privacy Policy</title>
	<meta
		name="description"
		content="Privacy policy for the Jyotisha (ज्योतिष) kundali, dasha and panchanga app."
	/>
</svelte:head>

<PageHeader title="Jyotisha — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 31 October 2026</em></p>

	<p>
		<strong>Jyotisha</strong> (ज्योतिष, "the app") calculates kundali (birth charts), divisional
		charts, dashas, transits, varshaphal, kundali milan, muhurta, and the daily panchanga, Bikram
		Sambat calendar and festivals. It is published by {company.legalName}, Kathmandu, Nepal, for
		Android as <code>com.popupbits.jyotisha</code>. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>
			Every calculation runs on your device. There is no account or sign-in, and no server.
		</li>
		<li>The app does not request internet access.</li>
		<li>The app has no advertising, analytics, tracking, or crash-reporting SDKs.</li>
		<li>The birth details you enter stay on your device.</li>
		<li>Reminders are off until you turn them on, and they are scheduled on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for Jyotisha and never receives any data from
		it. The astronomical data and the list of places ship inside the app. What the app stores lives
		in its own private storage on your device:
	</p>
	<ul>
		<li>
			<strong>Birth details</strong> you enter to calculate a kundali — a name, date and time of
			birth, place of birth (its name, coordinates and time zone), and gender.
		</li>
		<li>
			<strong>Saved records</strong> (अभिलेख), whether your own or, if you use the app as a jyotishi,
			your clients'. Besides the birth details, a record holds whatever you choose to add: notes,
			tags, consultation notes, reminders, and family details such as gotra and parents' names. The
			app also remembers which records you pinned and opened recently.
		</li>
		<li>
			<strong>Places</strong> you chose recently, and the place used for the panchanga. Places are
			picked from the list built into the app; the app never reads your device's location.
		</li>
		<li>
			<strong>Personal tithis</strong> (मेरा तिथि) you add for reminders, such as a tithi birthday or a
			shraddha — a name you choose, its kind, its lunar date, and when to remind you.
		</li>
		<li>
			<strong>Settings</strong> — script, calculation options, theme, the tab to open on, which
			reminders are on, and so on.
		</li>
		<li>
			<strong>Calculated panchanga</strong>, kept so the calendar and the home screen widgets open
			quickly. It contains no personal information.
		</li>
	</ul>
	<p>
		You can delete any saved record from the अभिलेख screen. Uninstalling the app, or clearing its data
		in Android settings, removes everything.
	</p>
	<p>
		If Android backup is turned on for your device, Android may include the app's data in your
		device backup to your Google account. That backup is made and kept by Google under your account;
		{company.legalName} has no access to it.
	</p>

	<h2>Reminders and notifications</h2>
	<p>
		The app can remind you of festivals, your personal tithis, eclipses and other events you choose,
		and can show today's tithi and nakshatra in the notification bar. All of this is off until you
		turn it on. Reminders are worked out and scheduled on your device; nothing is sent to us or
		through any push service.
	</p>
	<p>
		A reminder can include a name you entered, such as the name on a personal tithi, and Android may
		show it on your lock screen. You can turn reminders off in the app, or change how they appear
		in Android settings.
	</p>

	<h2>Files you export or import</h2>
	<p>
		You can save a kundali report as a PDF, or export your saved records as a file. The app hands the
		file to Android's own save dialog, and it is written wherever you choose. Importing records reads
		only the file you pick. Nothing is uploaded anywhere — what happens to an exported file afterwards
		is up to you.
	</p>

	<h2>Links that open other apps</h2>
	<p>
		The app itself has no internet access. Some rows in Settings hand you to another app on your
		device, only when you tap them:
	</p>
	<ul>
		<li>
			<strong>Share the app</strong> opens Android's share sheet with a short message and the Play
			Store link. You choose where it goes, and none of your data is added to it.
		</li>
		<li><strong>Rate the app</strong> opens the app's Play Store listing.</li>
		<li>
			<strong>More apps</strong> and <strong>this policy</strong> open popupbits.com in your browser.
		</li>
		<li>
			<strong>Contact</strong> opens your email app, addressed to us. If you send that email, we
			receive your address and whatever you write, and use them only to reply to you.
		</li>
	</ul>
	<p>Once one of those apps is open, its own privacy policy applies.</p>

	<h2>Google Play</h2>
	<p>
		The app also talks to Google Play, which is part of your device. When you open the app, it asks Google Play whether a newer version is available, so it can offer you
		the update. Google Play handles that check itself; the app sends nothing about you through it. If
		an update cannot finish, the app can open its Play Store listing for you.
	</p>
	<p>
		Google's handling of Google Play is covered by the
		<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
			Google Privacy Policy
		</a>.
	</p>

	<h2>Permissions the app requests</h2>
	<p>
		Jyotisha requests no internet permission. It does not ask for your camera, microphone, location,
		contacts, files, or device identifiers. It uses these Android permissions, all for reminders:
	</p>
	<ul>
		<li>
			<strong>Notifications</strong> — on Android 13 and later, the app asks for this only when you
			turn reminders on. You can say no and use everything else.
		</li>
		<li>
			<strong>Run at startup</strong> — so that scheduled reminders are restored after your phone
			restarts.
		</li>
		<li><strong>Vibrate</strong> — so that a reminder can vibrate.</li>
	</ul>
	<p>
		Removing the notifications permission stops reminders and changes nothing else in the app.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we do not collect any. A file you export goes
		only where you save it, and an email you send us is used only to reply to you.
	</p>

	<h2>Children's privacy</h2>
	<p>
		Jyotisha is not directed at children. It has no accounts, no user-generated content shared with
		others, and no communication features, and it collects no personal information from anyone,
		including children.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above, and the updated version
		is published at this address before the change takes effect in a released version of the app.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Jyotisha? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
