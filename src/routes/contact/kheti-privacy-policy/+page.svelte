<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { company } from '$lib';
</script>

<SEO
	title="Kheti — Privacy Policy"
	description="Privacy policy for the Kheti (खेती) 3D Nepali hillside farming game: what data it handles, what stays on your device, and how to contact Popup Bits."
	url="/contact/kheti-privacy-policy"
	breadcrumbs={[
		{ name: 'Contact', path: '/contact' },
		{ name: 'Kheti — Privacy Policy', path: '/contact/kheti-privacy-policy' }
	]}
/>

<PageHeader title="Kheti — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 1 November 2026</em></p>

	<p>
		<strong>Kheti</strong> (<span lang="ne">खेती</span>, "the app") is a 3D Nepali hillside terrace farming game. It is
		published by {company.legalName}, Kathmandu, Nepal, for Android as
		<code>com.popupbits.kheti</code>. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>It works 100% offline. There is no account or sign-in, and no backend server.</li>
		<li>The app has no advertising, analytics, tracking, or crash-reporting SDKs.</li>
		<li>Everything you save in the app stays on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for Kheti and never receives any data from
		it. The entire 3D hillside farming game runs locally on your device. What the app stores lives
		exclusively in its own local app preferences (<code>shared_preferences</code>) on your device:
	</p>
	<ul>
		<li>
			<strong>Up to 3 homestead save slots</strong> — your coins, planted crops and growth
			timestamps, harvested basket items, field expansions (1 to 12 beds), water pump motor and
			auto-fertilizer upgrades, daily family rations, and homestead loan repayment progress. You can
			overwrite or delete any save slot in-game at any time.
		</li>
		<li>
			<strong>App settings</strong> — language (English or Nepali), sound effects mute toggle, text
			size, and theme/accent preferences.
		</li>
		<li>
			<strong>A log of recent app errors</strong> (capped at 50 entries), kept locally so you can
			inspect what went wrong. It never leaves your device unless you explicitly choose to share it
			from Settings → Diagnostics.
		</li>
	</ul>
	<p>Uninstalling the app, or clearing its storage in Android settings, removes all of it.</p>

	<h2>Google Play and external links</h2>
	<p>
		The gameplay itself makes zero network requests. When installed from Google Play, Google Play on
		your device may check for app updates in accordance with the
		<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
			Google Privacy Policy
		</a>.
	</p>
	<p>
		External links only open when you explicitly tap them in <strong>Settings → About</strong> (such
		as opening this privacy policy, viewing more apps on popupbits.com, rating the app on Google
		Play, or composing an email to support in your mail app).
	</p>

	<h2>Permissions the app requests</h2>
	<p>
		Kheti requests no sensitive or dangerous device permissions. It does not ask for your camera,
		microphone, location, contacts, photos, files, or device identifiers.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data — because we do not collect any. If you tap
		<strong>Share report</strong> on the error log in Settings → Diagnostics, you hand that text to
		another app you choose on your device, and what that app does with it is governed by its own
		privacy policy.
	</p>

	<h2>Children's privacy</h2>
	<p>
		Kheti is a family-friendly farming simulation game with no accounts, no chat or user-generated
		content, no in-app purchases, and no data collection from anyone, including children.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above, and the updated version
		is published at this address before the change takes effect in a released version of the app.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Kheti? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>