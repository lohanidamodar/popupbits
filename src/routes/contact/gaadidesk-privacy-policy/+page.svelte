<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { company } from '$lib';
</script>

<svelte:head>
	<title>Gaadidesk — Privacy Policy</title>
	<meta name="description" content="Privacy policy for the Gaadidesk showroom management app." />
</svelte:head>

<PageHeader title="Gaadidesk — Privacy Policy" />

<article class="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 pb-24">
	<p><em>Last updated: 11 June 2026</em></p>

	<p>
		<strong>Gaadidesk</strong> ("the app") is a showroom management app for recondition vehicle
		dealers, published by {company.legalName}. It helps a dealership track inventory, buyer
		inquiries, follow-ups, documents, and financing. This page explains what data Gaadidesk
		handles.
	</p>

	<h2>The short version</h2>
	<ul>
		<li>You sign in with a dealership account to use Gaadidesk. We collect the account details
			and the business records you enter, and nothing else.</li>
		<li>We do not sell your data or share it with third parties for advertising or profiling.</li>
		<li>There are no advertising or analytics SDKs inside the app.</li>
		<li>You can request account and data deletion at any time (see below).</li>
	</ul>

	<h2>Information we collect</h2>
	<ul>
		<li>
			<strong>Account details</strong> — your name, email, phone, and dealership name. Your
			password is stored as a salted hash by our authentication provider; we never see your
			plaintext password.
		</li>
		<li>
			<strong>Business data you enter</strong> — vehicles in your inventory, buyer/inquiry
			records (name, phone, notes), follow-up schedules, document attachments, and financing
			records. This is the data the app exists to manage.
		</li>
		<li>
			<strong>Operational logs</strong> — minimal server-side logs (timestamps, IP address, error
			traces) needed to keep the service running and secure. These are retained for a short
			period and not used to profile you.
		</li>
	</ul>

	<h2>How we use it</h2>
	<p>
		The data above is used solely to run the app for your dealership — signing you in, syncing
		your records across your devices, backing up your data, and sending transactional emails
		strictly necessary for the service (e.g. password resets). We do not send marketing emails
		unless you opt in.
	</p>

	<h2>Where your data is stored</h2>
	<p>
		Account and business data are stored in a backend operated by {company.legalName}. The app
		may also cache a copy of your data locally so it works offline; the local cache is cleared
		when you sign out or uninstall the app.
	</p>

	<h2>Sharing with third parties</h2>
	<p>
		We do not sell, rent, or share your data with third parties for advertising or profiling.
		The only third parties involved in delivering the service are our infrastructure provider
		(hosting the backend) and our authentication provider, which process data on our behalf.
	</p>

	<h2>Permissions the app requests</h2>
	<ul>
		<li><strong>Network</strong> — to sync data with the Gaadidesk backend.</li>
		<li><strong>Camera / photos</strong> — to attach photos of vehicles or documents.</li>
		<li><strong>Notifications</strong> — to remind you of scheduled follow-ups.</li>
	</ul>

	<h2>Your rights and choices</h2>
	<ul>
		<li><strong>Access &amp; export</strong> — email us to request an export of your dealership's
			data.</li>
		<li><strong>Correction</strong> — edit or remove records directly inside the app.</li>
		<li><strong>Deletion</strong> — email us and we'll delete your account and all associated
			data within a few business days.</li>
	</ul>

	<h2>Security</h2>
	<p>
		Connections between the app and our backend use TLS. Passwords are stored as salted hashes.
		Server access is restricted to authorized personnel. No system is perfectly secure; use a
		strong, unique password.
	</p>

	<h2>Changes to this policy</h2>
	<p>
		If we update this policy, we will change the "Last updated" date above. Substantive changes
		will be highlighted in the app's release notes and, where appropriate, communicated to
		account holders directly.
	</p>

	<h2>Contact</h2>
	<p>
		Questions about this policy or about Gaadidesk? Email
		<a href="mailto:{company.contact.email}">{company.contact.email}</a> or visit our
		<a href="/contact">contact page</a>.
	</p>
</article>
