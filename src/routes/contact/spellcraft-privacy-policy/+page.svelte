<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>SpellCraft — Privacy Policy</title>
	<meta
		name="description"
		content="Privacy policy for the SpellCraft dictation and spelling app."
	/>
</svelte:head>

<PageHeader title="SpellCraft — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 29 August 2026</em></p>

	<p>
		<strong>SpellCraft</strong> ("the app") is a dictation and spelling practice app published by
		{company.legalName}. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your word lists, progress, and settings are stored only on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for this app and does not receive your data.
		The word lists are bundled inside the app, so it works fully offline. Any custom word lists you create,
		along with your progress and your sound and haptics preferences, are stored locally on your device
		using Android's standard storage. Uninstalling the app removes all of it.
	</p>

	<h2>Permissions the app requests</h2>
	<p>
		None. The app declares no Android permissions at all — it does not ask for the camera,
		microphone, storage, contacts, or location.
	</p>

	<h2>Text-to-speech</h2>
	<p>
		Dictation works by asking your device's built-in text-to-speech engine to read out a word. That
		request goes to the speech engine your device provides — Google's, Samsung's, or whichever you
		have selected — and never to us. Depending on the voice chosen in your system settings, that
		engine may generate speech on the device or on its own servers; that behaviour is controlled by
		your device and its speech engine, not by SpellCraft. The only text sent to it is the word being
		practised, taken from the app's built-in lists or from a list you created yourself.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we don't collect any. The app makes no network
		calls of its own, so no servers of ours see what you're practising.
	</p>

	<h2>Children's privacy</h2>
	<p>
		The app is suitable for all ages and is often used by children practising spelling. Because it
		does not collect personal information from anyone, no special handling is required.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes will
		be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about the SpellCraft app? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
