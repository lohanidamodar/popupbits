<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Tipot — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Tipot notes and todo app." />
</svelte:head>

<PageHeader title="Tipot — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 25 May 2026</em></p>

	<p>
		<strong>Tipot</strong> ("the app") is a notes and todo app published by {company.legalName}.
		This page explains what data the app handles, how it is protected, and your rights.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>Tipot is offline-first. By default, your notes and todos live only on your device.</li>
		<li>Creating an account is optional, and is only used to sync your data across your devices.
			If you create one we collect your email and a password (hashed by our backend).</li>
		<li>We do not sell your data. We do not run analytics or advertising SDKs inside the app.</li>
		<li>Contacts access is optional and used only to link people to your todos on your device.</li>
		<li>You can delete your account and all synced data at any time — see the
			<a href="/contact/tipot-delete-account">account deletion instructions</a>.</li>
	</ul>

	<h2>Information we collect</h2>
	<ul>
		<li>
			<strong>Your content</strong> — the notes, blocks, todos, reminders, and related metadata
			(dates, ordering, links between items) that you create. This is the data the app exists to
			manage. It is always stored locally on your device.
		</li>
		<li>
			<strong>Account details</strong> (only if you choose to sync) — email address and a password
			you choose. The password is stored as a salted hash by our authentication provider; we never
			see your plaintext password. An optional display name may also be stored.
		</li>
		<li>
			<strong>No tracking data</strong> — we do not collect device identifiers, location, or
			advertising IDs, and there are no analytics or advertising libraries in the app.
		</li>
	</ul>

	<h2>How sync works</h2>
	<p>
		Sync is opt-in. If you sign in, your notes and todos are copied to an
		<a href="https://appwrite.io/" rel="noopener noreferrer" target="_blank">Appwrite</a> backend
		project operated by {company.legalName} so they're available on your other devices. If you
		never sign in, nothing leaves your device. A local SQLite database always holds your data so
		the app works fully offline.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Contacts</strong> (optional) — used only so you can link a contact to a todo and
			act on it (call, SMS, email, WhatsApp) from within the app. Contact data is read on demand,
			used only on your device, and is never uploaded to our servers or shared with anyone. You
			can deny or revoke this permission and the rest of the app continues to work.
		</li>
		<li>
			<strong>Notifications &amp; exact alarms</strong> — to deliver reminders you set on your
			todos at the right time, even with the screen off. Handled by Android locally.
		</li>
		<li>
			<strong>Share &amp; quick actions</strong> — to receive text or links shared from other apps
			into a new note or todo, and to offer "New task" / "New note" launcher shortcuts.
		</li>
		<li>
			<strong>Network</strong> — only used for optional account sign-in and sync.
		</li>
	</ul>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share your personal data with third parties for advertising or
		profiling. The only third party involved in delivering the service is our backend provider
		(Appwrite), which processes synced data on our behalf — and only if you enable sync.
	</p>

	<h2>Your rights and choices</h2>
	<ul>
		<li><strong>Use without an account</strong> — sync is entirely optional.</li>
		<li><strong>Correction</strong> — edit or delete any note or todo directly in the app.</li>
		<li>
			<strong>Deletion</strong> — see the
			<a href="/contact/tipot-delete-account">account deletion instructions</a>. Deletion is
			permanent.
		</li>
	</ul>

	<h2>Children's privacy</h2>
	<p>
		Tipot is intended for users aged 13 and over. We do not knowingly collect personal information
		from children under 13. If you believe a child has created a synced account, contact us at the
		email below and we will delete it.
	</p>

	<h2>Security</h2>
	<p>
		Connections between the app and our backend use TLS. Passwords are stored as salted hashes by
		our authentication provider, and server access is restricted to authorized personnel. No
		system is perfectly secure; we encourage you to use a strong, unique password.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Tipot? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
