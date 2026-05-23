<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Achiver — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Achiver pomodoro and time-tracking app." />
</svelte:head>

<PageHeader title="Achiver — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 23 May 2026</em></p>

	<p>
		<strong>Achiver</strong> ("the app") is a pomodoro and project time-tracking app published by
		{company.legalName}. This page explains what data the app handles, how it is protected, and
		your rights.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>You can create an account to sync your work across devices. We collect your email and a
			password (hashed by our backend).</li>
		<li>Your time entries, projects, and settings sync to our backend so they're available on
			every device you sign in from.</li>
		<li>We do not sell your data. We do not run analytics or advertising SDKs inside the app.</li>
		<li>You can delete your account and all associated data at any time from inside the app —
			see the
			<a href="/contact/achiver-delete-account">account deletion instructions</a>.</li>
	</ul>

	<h2>Information we collect</h2>
	<ul>
		<li>
			<strong>Account details</strong> — email address and a password you choose. The password is
			stored as a salted hash by our authentication provider; we never see your plaintext password.
			An optional display name / username may also be stored.
		</li>
		<li>
			<strong>Your content</strong> — projects you create, pomodoro sessions you complete, time
			entries you log, and related metadata (start/end times, labels, notes you choose to add).
			This is the data the app exists to manage.
		</li>
		<li>
			<strong>Device basics</strong> — your account record stores the date your account was created
			and last updated. We do not collect device identifiers, location, contacts, or browsing data.
		</li>
	</ul>

	<h2>How we use it</h2>
	<p>
		Your email, password hash, and content are used solely to:
	</p>
	<ul>
		<li>Sign you in across your devices.</li>
		<li>Sync your projects and time entries between those devices.</li>
		<li>Send transactional emails when strictly necessary — e.g. password reset confirmations.
			We do not send marketing emails.</li>
	</ul>

	<h2>Where your data is stored</h2>
	<p>
		Account and content data is stored in an
		<a href="https://appwrite.io/" rel="noopener noreferrer" target="_blank">Appwrite</a> backend
		project operated by {company.legalName}. The app additionally caches a copy of your data
		locally on your device for offline use (so you can start a pomodoro without signal). The local
		cache is removed when you sign out or uninstall the app.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share your personal data with third parties for advertising or
		profiling. The only third party involved in delivering the service is our backend provider
		(Appwrite), which processes data on our behalf so the app can sync.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Notifications</strong> — to alert you when a pomodoro session ends or a break is
			over. Handled by Android's local notification system on your device.
		</li>
		<li>
			<strong>Background activity / exact alarms</strong> (where required) — so timers fire on
			time even with the screen off.
		</li>
		<li>
			<strong>Network</strong> — to sync your projects and time entries with our backend when
			you're online.
		</li>
	</ul>

	<h2>Your rights and choices</h2>
	<ul>
		<li>
			<strong>Access and export</strong> — Achiver lets you export your time entries to CSV from
			inside the app. You can also email us to request a copy of your account data.
		</li>
		<li>
			<strong>Correction</strong> — edit or remove projects and entries directly inside the app.
		</li>
		<li>
			<strong>Deletion</strong> — see the
			<a href="/contact/achiver-delete-account">account deletion instructions</a>. Deletion is
			permanent.
		</li>
	</ul>

	<h2>Children's privacy</h2>
	<p>
		Achiver is intended for users aged 13 and over. We do not knowingly collect personal
		information from children under 13. If you believe a child has created an account, contact us
		at the email below and we will delete the account.
	</p>

	<h2>Security</h2>
	<p>
		Connections between the app and our backend use TLS. Passwords are stored as salted hashes by
		our authentication provider. We restrict server access to authorized personnel only. No
		system is perfectly secure; we encourage you to use a strong, unique password.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Achiver? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
