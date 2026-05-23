<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Delete your Achiver account</title>
	<meta name="description" content="How to delete your Achiver account and all associated data." />
</svelte:head>

<PageHeader title="Delete your Achiver account" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p>
		You can permanently delete your Achiver account, and everything attached to it, at any time
		from inside the app. No emails or support tickets required.
	</p>

	<h2>How to delete your account</h2>
	<ol>
		<li>Open the <strong>Achiver</strong> app and sign in if you aren't already.</li>
		<li>Go to the <strong>Settings</strong> tab.</li>
		<li>
			Scroll down and tap <strong>Delete account</strong>.
		</li>
		<li>
			Confirm the prompt that appears. Once you confirm, the deletion runs immediately and
			cannot be undone.
		</li>
	</ol>

	<h2>What gets deleted</h2>
	<ul>
		<li>Your account record — email, username, and password hash.</li>
		<li>All of your projects.</li>
		<li>All of your pomodoro sessions and time entries.</li>
		<li>Any preferences and settings tied to your account.</li>
	</ul>

	<h2>What is retained, and for how long</h2>
	<p>
		For routine security and abuse-prevention, our backend may retain minimal authentication
		and access logs (e.g. failed sign-in attempts associated with the email address) for up to
		<strong>7 days</strong> after deletion, after which they are erased automatically. No content
		(projects, time entries, etc.) is retained.
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
		<a href="/contact/achiver-privacy-policy">Achiver Privacy Policy</a>.
	</p>
</article>
