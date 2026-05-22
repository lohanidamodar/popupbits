<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Aakar Launcher — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Aakar Launcher Android app." />
</svelte:head>

<PageHeader title="Aakar Launcher — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 22 May 2026</em></p>

	<p>
		<strong>Aakar Launcher</strong> ("the app") is an Android home launcher published by
		{company.legalName}. This page explains what data the app handles and what it does not.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>All your preferences and settings are stored only on your device.</li>
		<li>The app does not require an account or sign-in.</li>
	</ul>

	<h2>Permissions the app requests</h2>
	<p>
		As a home launcher, Aakar needs a few Android permissions to do its job. Each one is used
		locally on your device only:
	</p>
	<ul>
		<li>
			<strong>Query installed apps</strong> — to show your installed apps on the home screen and
			app drawer.
		</li>
		<li>
			<strong>Set as default launcher</strong> — so the home button opens Aakar.
		</li>
		<li>
			<strong>Notification access</strong> (optional) — used only to show notification badges on
			app icons if you turn the feature on.
		</li>
		<li>
			<strong>Contacts access</strong> (optional) — used only so the launcher's search can include
			your contacts alongside apps and lets you call or message someone directly from the search
			bar. Contact data is read on demand, used only to render results on your screen, and is
			never transmitted off your device, logged, or shared with anyone. The permission can be
			revoked at any time from Android's settings; the rest of the launcher continues to work
			without it.
		</li>
		<li>
			<strong>Other system permissions</strong> the launcher may request (e.g. wallpaper) are used
			only for the corresponding on-device feature and are never transmitted off your device.
		</li>
	</ul>

	<h2>Data stored on your device</h2>
	<p>
		The app stores layout, preferences, wallpaper choices, and similar settings locally using
		Android's standard storage APIs. This data never leaves your device. Uninstalling the app
		removes all of it.
	</p>

	<h2>Data sent to servers</h2>
	<p>
		None. The app does not send your data, your usage, your installed-app list, or any other
		information to any server operated by {company.legalName} or any third party. The app does not
		include analytics, crash reporting, or advertising libraries.
	</p>

	<h2>Links to other apps and websites</h2>
	<p>
		When you tap a link inside the app (e.g. opening another app or visiting a website from a
		shortcut), that interaction is handled by Android and the destination app or browser. Their
		respective privacy policies apply once you leave Aakar.
	</p>

	<h2>Children's privacy</h2>
	<p>
		The app is suitable for all ages and is not directed at children under 13. Because the app
		does not collect personal information from anyone, no special handling is required.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Aakar?
		Email <a href="mailto:{company.contact.email}">{company.contact.email}</a> or use the
		<a href="/contact">contact form</a>.
	</p>
</article>
