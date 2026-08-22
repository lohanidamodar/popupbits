<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Sambandha — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Sambandha contacts app." />
</svelte:head>

<PageHeader title="Sambandha — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 22 August 2026</em></p>

	<p>
		<strong>Sambandha</strong> ("the app") is a contacts app published by {company.legalName}.
		This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your contacts and notes stay only on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for this app and does not receive your
		data. Contact records you create in Sambandha, along with any notes, birthdays, tags, and
		preferences, are stored locally on your device in an SQLite database. Uninstalling the app
		removes all of it.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Contacts</strong> (optional) — used only so you can import your existing phone
			contacts into Sambandha and, if you choose, keep them in sync. Contact data is read on
			demand, used only on your device, and is never uploaded to our servers or shared with
			anyone. Denying or revoking this permission just disables the sync/import feature; the rest
			of the app works without it.
		</li>
		<li>
			<strong>Photos / media</strong> — to attach a profile photo to a contact from your gallery
			or by cropping an existing image. Photos stay on your device.
		</li>
		<li>
			<strong>Camera</strong> — used only if you scan a QR-code to add someone's contact card, or
			take a photo for a profile.
		</li>
		<li>
			<strong>Share</strong> — the app uses Android's standard share sheet if you share a contact
			card or receive one shared from another app. The app doesn't see what you share or where.
		</li>
		<li>
			<strong>Notifications</strong> — to remind you about follow-ups you have scheduled, and,
			only if you turn it on, to show you context when someone calls.
		</li>
		<li>
			<strong>Run at startup</strong> — so your follow-up reminders survive a restart. The app
			does not otherwise run in the background.
		</li>
		<li>
			<strong>Phone</strong> (optional, off by default) — only if you turn on "Tap to call", so a
			call can be placed without a second tap in the dialer. Leave it off, or decline the
			permission, and the app simply opens your dialer with the number filled in.
		</li>
		<li>
			<strong>Call screening</strong> (optional, off by default) — only if you turn on "Show
			context on incoming calls", so the app can tell you who is calling and how you know them.
			The lookup happens entirely on your device against contacts you already have in Sambandha.
			The app never blocks, rejects, redirects, or records calls, and it does not log them.
		</li>
	</ul>

	<h2>Your data is yours to take</h2>
	<p>
		Sambandha can export everything — contacts, memories, relationships, groups, follow-ups and
		optionally your photos — to a single backup file you choose where to keep, and import it
		again later. The backup is written straight to the destination you pick; it never passes
		through us, and we hold no copy of it. Deleting the app deletes its data, and because we
		store nothing there is no request to make of us.
	</p>
	<p>
		If you enabled address-book syncing, contacts Sambandha wrote to your phone's own contacts
		remain there after uninstalling, and your phone may sync those to whichever account you have
		configured (for example Google). That syncing is performed by your device, not by Sambandha,
		and is governed by that provider's terms. Remove them in your phone's Contacts app.
	</p>

	<h2>Network access</h2>
	<p>
		The app has no backend, but two standard components do reach the internet, and neither sends
		anything about you: fonts are downloaded from Google Fonts on first launch, and Google Play
		is used to check for app updates.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we don't collect any. QR-code contact
		exchange happens directly between your device and the other person's device.
	</p>

	<h2>Children's privacy</h2>
	<p>
		The app is intended for users aged 13 and over. Because it does not collect personal
		information from anyone, no special handling is required.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Sambandha? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
