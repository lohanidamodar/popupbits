<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Listora — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Listora audiobook app." />
</svelte:head>

<PageHeader title="Listora — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 29 May 2026</em></p>

	<p>
		<strong>Listora</strong> ("the app") is a free, open-source audiobook player published by
		{company.legalName}. It streams and downloads public-domain audiobooks from
		<a href="https://librivox.org/" rel="noopener noreferrer" target="_blank">LibriVox</a> and the
		<a href="https://archive.org/" rel="noopener noreferrer" target="_blank">Internet Archive</a>.
		This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your library, listening progress, downloads, and settings are stored only on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for Listora and does not receive your
		data. Everything the app remembers — the books in your library, your playback position,
		downloaded files, and your preferences — is stored locally on your device using Android's
		standard storage and a local database. Uninstalling the app removes all of it.
	</p>

	<h2>Connecting to LibriVox and the Internet Archive</h2>
	<p>
		To browse, stream, or download audiobooks, the app contacts the LibriVox and Internet Archive
		APIs and content servers directly from your device. These requests are necessary to deliver
		the audiobooks and cover images. We do not proxy, log, or store these requests. When your
		device talks to those services, their own privacy policies apply:
	</p>
	<ul>
		<li>
			<a href="https://archive.org/about/terms.php" rel="noopener noreferrer" target="_blank">
				Internet Archive Privacy Policy
			</a>
		</li>
		<li>
			<a href="https://librivox.org/pages/privacy-policy/" rel="noopener noreferrer" target="_blank">
				LibriVox Privacy Policy
			</a>
		</li>
	</ul>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Network access</strong> — to fetch the audiobook catalogue, cover art, and audio
			streams or downloads from LibriVox / the Internet Archive.
		</li>
		<li>
			<strong>Storage</strong> — to save audiobooks you choose to download for offline listening.
			Downloaded files live on your device and are removed when you delete them or uninstall the
			app.
		</li>
		<li>
			<strong>Notifications &amp; background playback</strong> — to show playback controls and keep
			audio playing while the app is in the background or the screen is off.
		</li>
	</ul>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we don't collect any. The only network
		connections the app makes are to the public LibriVox and Internet Archive services described
		above, and only to deliver the audiobooks you request.
	</p>

	<h2>Children's privacy</h2>
	<p>
		Listora is suitable for all ages. Because the app does not collect personal information from
		anyone, no special handling is required. Note that the LibriVox catalogue contains a wide range
		of public-domain literature intended for general audiences.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Listora? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
