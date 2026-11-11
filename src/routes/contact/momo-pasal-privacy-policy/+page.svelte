<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { company } from '$lib';
</script>

<SEO
	title="Momo Pasal — Privacy Policy"
	description="Privacy policy for Momo Pasal (मोमो पसल), the Nepali veg momo shop cooking game: what data it handles, what stays on your device, and how to contact Popup Bits."
	url="/contact/momo-pasal-privacy-policy"
	breadcrumbs={[
		{ name: 'Contact', path: '/contact' },
		{ name: 'Momo Pasal — Privacy Policy', path: '/contact/momo-pasal-privacy-policy' }
	]}
/>

<PageHeader title="Momo Pasal — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 4 November 2026</em></p>

	<p>
		<strong>Momo Pasal</strong> (<span lang="ne">मोमो पसल</span>, "the app") is a cooking game about running a vegetarian
		momo shop in Kathmandu. It is published by {company.legalName}, Kathmandu, Nepal, for Android as
		<code>com.popupbits.momo_pasal</code>. This page explains what data the app handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>The app does not collect, transmit, or sell any personal information.</li>
		<li>It works fully offline. There is no account or sign-in, and no backend server.</li>
		<li>
			The app has no advertising, analytics, tracking, or crash-reporting SDKs, and no in-app
			purchases.
		</li>
		<li>Everything you save in the app stays on your device.</li>
	</ul>

	<h2>Information we collect</h2>
	<p>
		None. {company.legalName} does not operate a backend for Momo Pasal and never receives any data from
		it. The whole game runs on your device. What the app stores lives only in its own local app preferences
		(<code>shared_preferences</code>) on your device:
	</p>
	<ul>
		<li>
			<strong>Up to 3 save slots</strong>: the day you are on, your shop level and XP, your money,
			the weekly khata (bills owed), the kitchen upgrades and decorations you bought, your stock of
			masala, khursani and takeaway boxes, the play mode (timed or cozy), your best stars per day,
			and which daily goals you have completed. You can overwrite or delete any save slot in the
			game at any time.
		</li>
		<li>
			<strong>App settings</strong>: language (Nepali or English), sound on or off, and vibration on
			or off.
		</li>
		<li>
			<strong>A log of recent app errors</strong> (capped at 50 entries), kept locally so you can see
			what went wrong. It never leaves your device unless you choose to share it from Settings → Diagnostics.
		</li>
	</ul>
	<p>Uninstalling the app, or clearing its storage in Android settings, removes all of it.</p>

	<h2>Google Play and external links</h2>
	<p>
		The game itself makes no network requests. When installed from Google Play, Google Play on your
		device may check for app updates and show the rating prompt, in accordance with the
		<a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
			Google Privacy Policy
		</a>.
	</p>
	<p>
		External links open only when you tap them in <strong>Settings</strong>: opening this privacy
		policy, viewing more apps on popupbits.com, rating the app on Google Play, sharing the app, or
		writing an email to support in your mail app.
	</p>

	<h2>Permissions the app requests</h2>
	<p>
		Momo Pasal requests no sensitive or dangerous device permissions. It does not ask for your
		camera, microphone, location, contacts, photos, files, or device identifiers. Vibration
		feedback, which you can turn off in Settings, needs no permission prompt.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share any data, because we do not collect any. If you tap
		<strong>Share</strong> on the error log in Settings → Diagnostics, or share the app with a friend,
		you hand that text to another app you choose on your device, and what that app does with it is governed
		by its own privacy policy.
	</p>

	<h2>Children's privacy</h2>
	<p>
		Momo Pasal is a family-friendly cooking game with no accounts, no chat or user-generated
		content, no advertising, no in-app purchases, and no data collection from anyone, including
		children.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above, and the updated version
		is published at this address before the change takes effect in a released version of the app.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Momo Pasal? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
