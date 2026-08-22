<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>PhotoReady — Privacy Policy</title>
	<meta
		name="description"
		content="Privacy policy for the PhotoReady passport, visa and ID photo app."
	/>
</svelte:head>

<PageHeader title="PhotoReady — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 9 August 2026</em></p>

	<p>
		<strong>PhotoReady</strong> ("the app") makes passport, visa and ID photos on your device. It is
		published by {company.legalName} for Android as
		<code>com.popupbits.photoready</code>. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>There is no account or sign-in, and no server.</li>
		<li>The app has no analytics, tracking, advertising, or crash-reporting SDKs.</li>
		<li>Your photos are processed on your device and stay there until you share or delete them.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for PhotoReady and never receives your photos
		or any other data. Everything the app stores lives in its own private storage on your device:
	</p>
	<ul>
		<li>
			<strong>The photo you imported</strong>, resized for editing — removed when you start over or
			the app restarts.
		</li>
		<li>
			<strong>Photos and PDFs you export</strong> — removed when you delete them in Settings, or
			uninstall.
		</li>
		<li><strong>Templates you create</strong> — removed when you delete them, or uninstall.</li>
		<li>
			<strong>Which documents you have used, and recent searches</strong> — removed when you clear
			them, or uninstall.
		</li>
	</ul>
	<p>
		Settings → Storage clears the working files and the exports. Uninstalling the app removes all of
		it.
	</p>

	<h2>Face detection and background removal</h2>
	<p>
		Both run entirely on your device using Google ML Kit, and both models ship inside the app — so
		the app works with no internet connection at all, from the first launch. Your photo is never
		uploaded for processing.
	</p>
	<p>
		Where Google Play services offers a higher-detail background-removal model, PhotoReady uses it
		if it is already present on your device. That model is delivered and updated by Google Play
		services, not by us, and it is never required. In either case the model comes to the photo — the
		photo does not go anywhere.
	</p>
	<p>
		Google's handling of Play services is covered by the
		<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
			Google Privacy Policy
		</a>.
	</p>

	<h2>Checking for document updates</h2>
	<p>
		PhotoReady ships with a complete set of document specifications and works with no internet.
		<strong>Settings → Document rules → Check for updates</strong> is the only feature that uses the
		network, and it runs only when you tap it.
	</p>
	<p>
		It downloads a public file from the open
		<a
			href="https://github.com/lohanidamodar/document-photo-specs"
			rel="noopener noreferrer"
			target="_blank">document-photo-specs</a
		>
		repository. GitHub sees that request the way any website sees a visit — your IP address and the time.
		Nothing about you, your photos, or your device is sent; the request carries no identifier, and the
		app sends nothing back.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li>
			<strong>Camera</strong> — only for the guided capture screen, so you can take the photo inside
			the app. Importing from your gallery works without it.
		</li>
		<li>
			<strong>Storage (Android 9 and older)</strong> — used only when you tap "Save to gallery", to
			write that one file.
		</li>
	</ul>
	<p>
		PhotoReady requests no other permissions, and asks for no location, contacts, identifiers, or
		device information.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we do not collect any. When you tap Share or
		Save to gallery, you hand that one file to another app you choose, and what that app does with
		it is governed by its own privacy policy.
	</p>

	<h2>Children's privacy</h2>
	<p>
		PhotoReady is a utility with no accounts, no user-generated content, and no communication
		features. It collects no personal information from anyone, including children.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above, and the updated version
		is published at this address before the change takes effect in a released version of the app.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about PhotoReady? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
