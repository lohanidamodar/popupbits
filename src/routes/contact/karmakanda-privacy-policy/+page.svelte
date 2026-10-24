<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Karmakanda — Privacy Policy</title>
	<meta
		name="description"
		content="Privacy policy for the Karmakanda (कर्मकाण्ड) puja vidhi app."
	/>
</svelte:head>

<PageHeader title="Karmakanda — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 24 October 2026</em></p>

	<p>
		<strong>Karmakanda</strong> (कर्मकाण्ड, "the app") gives step-by-step puja vidhi with mantras
		and their Nepali meaning. It is published by {company.legalName}, Kathmandu, Nepal, for Android
		as <code>com.popupbits.karmakanda</code>. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>It works offline. There is no account or sign-in, and no server.</li>
		<li>The app has no advertising, analytics, tracking, or crash-reporting SDKs.</li>
		<li>Everything you save in the app stays on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for Karmakanda and never receives any data from
		it. All of the vidhi and mantra content ships inside the app. What the app stores lives in its own
		private storage on your device:
	</p>
	<ul>
		<li>
			<strong>Your sankalpa details</strong>, if you choose to fill them in — your name, thar, gotra,
			upadhi, father's name, maternal gotra, and the country, region and place you perform the puja
			in, along with the samvat, month, paksha and tithi you set. The app uses them only to write
			your sankalpa out in full inside the vidhi you are reading. Every field is optional, and you
			can clear them at any time.
		</li>
		<li><strong>Japa counts</strong> — the count you are on and a short history of recent ones, with their dates.</li>
		<li><strong>Ahuti counts</strong> during a havan.</li>
		<li><strong>Favourites</strong> you mark.</li>
		<li><strong>Reading progress</strong> through each vidhi.</li>
		<li><strong>Checklists</strong> of puja items you tick off.</li>
		<li>
			<strong>Settings</strong> — language, theme, accent colour, text size, and whether to keep the screen
			on.
		</li>
		<li>
			<strong>A log of recent app errors</strong>, kept so you can see what went wrong. It never
			leaves your device unless you choose to share it from Settings → Diagnostics.
		</li>
	</ul>
	<p>Uninstalling the app, or clearing its data in Android settings, removes all of it.</p>

	<h2>Google Play</h2>
	<p>
		The app's only automatic network contact is with Google Play, which is part of your device. When
		you open the app, it asks Google Play whether a newer version is available, so it can offer you
		the update. Google Play handles that check itself; the app sends nothing about you through it.
	</p>
	<p>
		If you tap <strong>Rate the app</strong> in Settings, Google Play shows its own review sheet, or the
		app opens its Play Store listing. Links you tap on the About screen open in your browser.
	</p>
	<p>
		Google's handling of Google Play is covered by the
		<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
			Google Privacy Policy
		</a>.
	</p>

	<h2>Keeping the screen on</h2>
	<p>
		While you are reading a vidhi, the app can keep your screen from turning off, so you can follow
		along during a puja. You can turn this off in Settings. It stores nothing and sends nothing.
	</p>

	<h2>Permissions the app requests</h2>
	<p>
		Karmakanda requests no dangerous permissions. It does not ask for your camera, microphone,
		location, contacts, files, or device identifiers.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we do not collect any. If you tap Share —
		including on the error log in Settings → Diagnostics, or <strong>Share as PDF</strong> on a
		vidhi — you hand that content to another app you choose, and what that app does with it is
		governed by its own privacy policy. A shared PDF is made on your device; nothing is uploaded to
		make it.
	</p>

	<h2>Children's privacy</h2>
	<p>
		Karmakanda has no accounts, no user-generated content, and no communication features. It
		collects no personal information from anyone, including children.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above, and the updated version
		is published at this address before the change takes effect in a released version of the app.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Karmakanda? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
