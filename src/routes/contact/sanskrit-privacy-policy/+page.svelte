<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Sanskrit — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Sanskrit learning app." />
</svelte:head>

<PageHeader title="Sanskrit — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 29 May 2026</em></p>

	<p>
		<strong>Sanskrit</strong> ("the app") is a beginner-friendly Sanskrit learning app published
		by {company.legalName}. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your progress, preferences, and any saved lessons are stored only on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for this app and does not receive your
		data. The lessons, vocabulary, sutras, and translations are bundled inside the app, so it
		works fully offline. Your progress and settings are stored locally on your device using
		Android's standard storage. Uninstalling the app removes all of it.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Open external links</strong> — when you tap an outbound link in the app (for example
			to a reference site), the app asks Android to open it in your browser. The destination's
			own privacy policy applies once you leave the app.
		</li>
		<li>
			<strong>Share</strong> — if you choose to share a verse or translation, the app uses
			Android's standard share sheet. The app itself doesn't see what you share or where you send
			it.
		</li>
	</ul>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we don't collect any. The app doesn't make
		network calls of its own to load lesson content, so no servers see what you're studying.
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
		Questions about this policy or about the Sanskrit app? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
