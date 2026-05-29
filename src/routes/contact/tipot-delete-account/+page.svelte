<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Delete your Tipot account</title>
	<meta name="description" content="How to delete your Tipot account and all associated data." />
</svelte:head>

<PageHeader title="Delete your Tipot account" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p>
		You can permanently delete your Tipot account, and everything synced to it, at any time from
		inside the app. No emails or support tickets required.
	</p>

	<h2>How to delete your account</h2>
	<ol>
		<li>Open the <strong>Tipot</strong> app and sign in if you aren't already.</li>
		<li>Go to the <strong>Profile</strong> tab.</li>
		<li>Scroll down and tap <strong>Delete account</strong>.</li>
		<li>
			Confirm the prompt that appears. Once you confirm, the deletion runs immediately and cannot
			be undone.
		</li>
	</ol>

	<h2>What gets deleted</h2>
	<ul>
		<li>Your account record — email, display name, and password hash.</li>
		<li>All notes and blocks synced to your account.</li>
		<li>All todos, reminders, and their metadata synced to your account.</li>
		<li>Any preferences and settings tied to your account.</li>
	</ul>

	<h2>About your on-device data</h2>
	<p>
		Tipot is offline-first, so a copy of your notes and todos also lives in the app's local
		database on your device. Deleting your account removes the synced server copy; to also remove
		the local copy, sign out and uninstall the app, or use the in-app "Clear local data" option.
	</p>

	<h2>What is retained, and for how long</h2>
	<p>
		For routine security and abuse-prevention, our backend may retain minimal authentication and
		access logs (e.g. failed sign-in attempts associated with the email address) for up to
		<strong>7 days</strong> after deletion, after which they are erased automatically. No content
		(notes, todos, etc.) is retained.
	</p>

	<h2>Can't access the app?</h2>
	<p>
		If you've lost access to your device or are unable to use the in-app option for any reason,
		email <a href="mailto:{company.contact.email}">{company.contact.email}</a> from the email
		address associated with your account and we'll process the deletion for you within a few
		business days.
	</p>

	<h2>Privacy policy</h2>
	<p>
		For details on what we collect and why, see the
		<a href="/contact/tipot-privacy-policy">Tipot Privacy Policy</a>.
	</p>
</article>
