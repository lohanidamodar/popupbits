<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Sabdabhandar — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Sabdabhandar Nepali dictionary app." />
</svelte:head>

<PageHeader title="Sabdabhandar — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 11 June 2026</em></p>

	<p>
		<strong>Sabdabhandar</strong> ("the app") is an offline Nepali dictionary app published by
		{company.legalName}. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your search history, favourites, and preferences are stored only on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for this app and does not receive your
		data. The dictionary content (entries, definitions, examples, etymology, word puzzles) is
		bundled inside the app, so it works fully offline. Your recent searches, saved words, and
		settings are stored locally on your device. Uninstalling the app removes all of it.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Notifications</strong> — used to deliver the daily "Word of the Day" alert if you
			turn that feature on. Handled by Android locally on your device.
		</li>
		<li>
			<strong>Text-to-speech</strong> — pronunciation uses Android's on-device TTS engine (Nepali
			voice where available, otherwise Hindi as a fallback). Nothing is sent to a server.
		</li>
		<li>
			<strong>Home-screen widget</strong> — an optional widget displays the day's word on your
			home screen. Data comes only from the app's local dictionary.
		</li>
		<li>
			<strong>Share</strong> — if you choose to share a word or definition, the app uses
			Android's standard share sheet. The app itself doesn't see what you share or where.
		</li>
	</ul>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we don't collect any. The app doesn't make
		network calls of its own to look up words, so no servers see what you're searching for.
	</p>

	<h2>Children's privacy</h2>
	<p>
		The app is suitable for all ages. Because it does not collect personal information from
		anyone, no special handling is required.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Sabdabhandar? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
