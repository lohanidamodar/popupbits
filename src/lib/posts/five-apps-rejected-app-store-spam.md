---
title: 'We sent five apps to App Store review at once. All five came back.'
seoTitle: 'Guideline 4.3(a): Five Apps Rejected as Spam'
description: 'Two of our Flutter apps passed App Store review on the first try. The next five were rejected as spam, twice. We found real defects, built a theory, published its prediction, and the third rejection broke it. Then Apple asked nine questions. We answered them, and the app went live.'
date: '2026-10-14'
author: 'Damodar Lohani'
product: 'sanskrit'
image: '/images/blog/five-apps-rejected-app-store-spam.png'
cover: '/images/blog/five-apps-rejected-app-store-spam-cover.png'
tags: ['App Store Review', 'iOS', 'Flutter', 'Guideline 4.3', 'App Store Connect']
---

We have written about [Mero Nepali passing App Store review on the first
try](/blog/mero-nepali-app-store-approved-first-try). This is the other half of that
story, and it is less flattering.

On 1 September, PhotoReady went live — our second app on the App Store, also first try.
The day after, we submitted five more: Tipot, SpellCraft, Listora, Sambandha and
Sanskrit. All five on the same day.

All five were rejected within hours, under **Guideline 4.3(a) — Design: Spam**, with
byte-identical text:

> We noticed the app shares a similar binary, metadata, and/or concept as apps submitted
> to the App Store by you or other developers, with only minor differences.

We resubmitted all five a week later with detailed review notes and a demo video of each
app. All five were rejected again, same guideline, same wording, plus a new paragraph
warning that repeated submissions of this kind can lead to removal from the Apple
Developer Program.

Two apps accepted on the first try. Five rejected twice. Same developer, same framework,
same fortnight.

Then we fixed what we could find, wrote down why we thought it had happened, and sent one
app back alone. It was rejected a third time, under more guidelines than before. This post
is the whole sequence, including the part where our own explanation stopped holding up,
the written reply we sent after it, and how it ended.

## What we assumed, and why it was reasonable

Our first read was that this was about volume, not content.

The two that were accepted went in on their own, at separate times. The five that were
rejected went in together on one day, from an account that had exactly two apps on the
store. That looked like a bulk-submission heuristic: an account triples its catalogue
overnight and something flags it before a human looks closely.

The theory had the virtue of explaining the identical responses. It had one problem we
did not take seriously enough: we never tested it. Round two changed the review notes
and added videos — neither of which answers a similarity complaint — and sent all five
together again. The variable we blamed never moved.

## Then we read our own listings

Before the third attempt we did something we should have done in August: opened each
listing and clicked every link in it, as a stranger would.

**Two of the five had a dead privacy policy URL.** Tipot and Sanskrit pointed at
`/tipot/privacy` and `/sanskrit/privacy`. Neither path has ever existed on this site.
Both returned 404. SpellCraft's privacy URL was dead too.

The policies themselves were fine. They live at `/contact/tipot-privacy-policy` and
`/contact/sanskrit-privacy-policy`, written and published months ago. The listings simply
pointed somewhere else, and nobody had clicked.

**Three of the five used a generic page as their support URL** — the site's home page or
its product index, rather than anything about that app.

So a reviewer opening five apps from one developer found two with no reachable privacy
policy and three whose "support site" was the same landing page. A missing privacy policy
is an independent rejection under Guideline 5.1.1. It was never reached, because 4.3 is
decided first.

**One listing described a feature the app does not have.** Sanskrit's App Store
description offered to teach you to recite mantras "with correct pronunciation." The app
ships no audio at all — no audio dependency, no audio asset, no speech code anywhere in
it. We had already caught that sentence and removed it from the Play listing on 24
August, in a commit whose message is literally "drop the audio claim we can't back." The
fix was applied to `android/fastlane/` and never to `ios/fastlane/`. It sat in the App
Store listing through both rejections.

**Promotional text exceeded a hard character limit** — 170 is the cap, ours was 206.

**And we had been maintaining a translation for a listing that cannot exist.** The
iOS metadata carried a full Nepali locale directory, written and kept up to date.
Nepali is not an App Store localization. It never has been — Apple's list goes
Gujarati, Hindi, Kannada, and no Nepali. It had been copied across from Play, where
Nepali is real, and nobody checked. Our own upload tool says so plainly: fastlane's
`deliver` refuses the directory outright — "Unsupported directory name(s) for
screenshots/metadata: ne" — so that translation never reached the App Store in any
round. Hindi is supported, and we already had a full Hindi translation sitting in the
Play listing, unused on the App Store.

**And the app opened in the wrong language.** Sanskrit is bilingual — every lesson and
grammar chapter exists in English and in Nepali, which is the point: it is a Sanskrit
course an English speaker can take. But a fresh install
defaulted to Nepali regardless of the device. A reviewer in California opened it and
got an interface they could not read, in an app whose listing is in English. That
turns "a Sanskrit course for anyone" into "a regional app" in the first three seconds,
which is precisely the impression we could least afford. It now follows the device
locale.

None of this is Apple's fault. All of it was ours, all of it was checkable in about
twenty minutes, and none of it was checked for two rounds because we were busy being
confident about the batch.

## The collision we thought triggered 4.3(a)

What follows is the explanation we settled on after round two. We are leaving it as we
wrote it, because the next section tests it.

Guideline 4.3(a) is narrower than the rejection boilerplate suggests. Its actual text is
about shipping one app under many bundle IDs:

> Don't create multiple Bundle IDs of the same app (for example, submitting a separate
> map app for every city in the world instead of a single worldwide map).

We spent two weeks comparing the five apps to each other, and they are genuinely five
different things — a to-do app, a spelling game, an audiobook player, a personal CRM and
a Sanskrit course. Different architectures, a threefold spread in dependency count, no
shared template.

What we never did was compare them against the app that was already on the store.

| | Mero Nepali | SpellCraft |
|---|---|---|
| Primary category | Education | Education |
| Secondary category | Games | Games |
| Sub-categories | Word, Family | Word, Family |
| Audience | Children 5–8 | Children K–5 |
| Mechanic | Audio pronunciation, levels, mini-games | Audio dictation, grade levels, gameplay |
| Themed sets | Animals, colors, numbers | Animals, colors, food, school |
| Differentiator | Nepali, in Devanagari | English spelling |

Identical category and sub-category assignment. Same audience, same mechanic, same themed
word sets. What separates them is the language.

A children's letters-and-words game per language is structurally the same proposition as
a map app per city — and Mero Nepali was already live, which makes it the reference and
SpellCraft the variant. A 4.3 determination attaches to a developer's submission set
rather than to one app, so one real collision in a batch of five plausibly returns the
same template five times.

We want to be careful here. Apple never named a specific pair of apps, and we are reading
backwards from a form letter. This is our best explanation, not a confirmed one. But it
fits things the batch theory does not: why the citation was 4.3(a), the bundle-ID clause,
rather than 4.3(b), the "indistinguishable from what's widely available" clause that fits
a to-do app far better. And it explains the two acceptances without needing luck —
Mero Nepali was first, so it had no neighbour, and PhotoReady is a Photo & Video utility
with nothing adjacent to it in our catalogue at all.

## Round three: one app, alone

**We sent [Sanskrit](/products/sanskrit) on its own.** The other four were withdrawn from review.

We picked it as the hardest of the five to mistake for a template: 93 hand-authored
lessons, 60 grammar chapters, 890 exercises and all eighteen chapters of the Bhagavad Gita,
all bundled offline, in a category Apple does not list as saturated. It is taught in
English as well as Nepali, so it is a course for anyone learning the language rather than
a localised edition for one market. It has been on Google Play since 1 June, where it has
passed the 1,000+ downloads mark. Its listing went in with working URLs, honest copy, a
category that does not seat it beside a children's word game, and an app that opens in
English on an English device.

Before round three, in an earlier draft of this post, we wrote down what we expected.
Sanskrit alone was the test of whether the fixes were enough, and SpellCraft, alone and
unchanged, would be the sharper test after it.

**Sanskrit was rejected again.** And this time the citation grew. The first two rounds
named Guideline 4.3(a) only. The third named three:

- **4.3(a)**, the same bundle-ID clause as before;
- **4.3(b)**, the clause about saturated categories and apps that add nothing new;
- **4.2.6**, which covers apps built from a commercialised template or an app-generation
  service — those have to be submitted by the provider of the app's content, not by
  whoever ran the template.

The instruction changed too. Rounds one and two invited a resubmission. Round three said
the opposite: if we believe the app meets all three guidelines, do not resubmit — reply,
and answer nine questions in full. What the app does. Who it is for. What gap in the
market it fills. What beta testing we did, and what feedback changed the build. Whether it
is standalone or part of a suite. Whether it could be an in-app purchase inside another
app. What code, frameworks or assets it shares with our own apps. What codebase, SDK or
content library it shares with anyone else's. And whether it was built for a client or
from a template.

## What that does to our theory

It does not survive intact, and we would rather say so than quietly drop it.

The collision reading said a children's word game in one language sat too close to a
children's word game in another, and that one bad pair in a batch returned five identical
rejections. With SpellCraft withdrawn there was no pair left in the submission. Sanskrit
went in by itself, with every defect we had found fixed, and the rejection came anyway —
broader than before. Whatever is driving this, a collision inside the batch cannot be all
of it.

It also undoes one of the reasons we liked the theory. We argued that the citation being
4.3(a) and not 4.3(b) pointed at a duplicate rather than a crowded category. Round three
cites both, so that argument now cuts nowhere.

What we do not know is why. Apple named three guidelines and asked nine questions. It did
not name a specific app, a specific similarity or a specific template. The questions read
as a standard set rather than a finding: 4.2.6 being cited means Apple is asking whether
the app came from a template, not that it has concluded it did. For the record, it did
not: the lessons, grammar chapters and exercises were written for this app, and our reply
said so.

None of this makes the fixes pointless. A privacy policy that 404s, a listing that
promises audio the app does not have, promotional text over the limit and an app that
opens in a language the reviewer cannot read are all real defects, and the first of them
could have been a rejection on its own under 5.1.1 had 4.3 not been decided first. They
were worth fixing. They were not sufficient.

## Where it stands

We did what round three asked: instead of resubmitting, we wrote a reply answering all
nine questions for Sanskrit.

It did not fit in one message. Resolution Center caps a message at 4,000 characters, and
the nine answers came to about 11,500, so the reply went as three messages — questions
1–3, 4–6 and 7–9, each labelled "1 of 3" and so on, the first saying more were coming. We
tried compressing it into one and gave up. The two answers that suffer most under
compression are the market-gap question and the shared-code question, and those are
exactly the answers to 4.3(b) and to the duplicate-binary charge.

The reply opened with our weaknesses, before Apple could find them. We ran no TestFlight
beta. The classical sources are public-domain text that anyone can use. Four other apps
sit withdrawn from review. Two Devanagari apps do sit side by side in our catalogue.
Conceding those up front only works if every other claim survives checking. So the
figures in the reply were counted from the assets the app ships, not copied from its
marketing — the same discipline this post argues for, coming from the other direction.

Apple's response, in full:

> Hello,
>
> Thank you for providing this information.
>
> We will continue the review, and we will notify you if there are any further issues.
>
> Best regards,
> App Review

That was not an approval, and at the time we were careful not to read it as one. It
meant the review was moving again instead of sitting blocked, and nothing more.

## The outcome

**Sanskrit is on the App Store.** Apple re-reviewed it after the reply and approved it.
It went live on 13 October as *Sanskrit: Grammar & Sutras*, version 1.2.0, under
Education and Reference.

It took three rejections, a withdrawn batch of four and a reply split across three
messages. What the final round added was an explanation: every dependency the app
uses and what each one is for, who the course is for and what gap it fills, and the
weaknesses we listed above, before anyone had to find them.

We can't tell you which of those answers mattered. Apple approved it without
giving a reason. What we can say is the order of events: the listing fixes alone
were not enough, a written account of the app was asked for, we gave one that we had
checked against the shipped assets, and the next review passed.

SpellCraft, Tipot, Listora and Sambandha are still withdrawn. The test we planned for
SpellCraft assumed the collision reading was the right frame, and round three took that
away.

## What we would tell anyone else

1. **Click every URL in your own listing before you blame the reviewer.** Two of ours
   404'd through two rejections and a fortnight of theorising.
2. **A metadata fix on one store is not a fix on the other.** Our commit removing a false
   claim touched one directory and left the same sentence live on the other store for
   three weeks.
3. **Compare your new app against your own catalogue, not just against itself.** 4.3 says
   "apps submitted by you or other developers." It did not turn out to be our whole
   problem, but it is a check that costs nothing.
4. **Open your app the way a reviewer will — on a device set to English.** Ours
   defaulted to Nepali on a fresh install, and we had never once seen the first screen
   a reviewer sees.
5. **Don't submit your portfolio in a batch.** It is real advice, but it was not our
   biggest problem, and reaching for it first cost us two weeks.
6. **Don't trust a single explanation of a form letter.** We had a theory that fitted
   every fact we had, and we believed it enough to plan the next two submissions around
   it. Write down what your theory predicts before you test it. Ours predicted a pass,
   and that is the only reason the rejection taught us anything.
7. **If Apple sends you questions, plan for the 4,000-character limit.** Expect several
   messages, label them, and don't trim the answers about market gap and shared code to
   make them fit. Those two carry the argument.
8. **Write the account of your app before Apple asks for it.** What it does, who it is
   for, every dependency and why it is there, what it shares with your other apps. We
   wrote ours after three rejections.

One app out of five is through. The other four are still waiting.

All three of our apps on the App Store:
[Mero Nepali](https://apps.apple.com/us/app/mero-nepali-%E0%A4%AE-%E0%A4%B0-%E0%A4%A8-%E0%A4%AA-%E0%A4%B2/id6761828591)
and [PhotoReady](https://apps.apple.com/us/app/photoready-passport-size-photo/id6806537666),
which passed first time, and now
[Sanskrit: Grammar & Sutras](https://apps.apple.com/us/app/sanskrit-grammar-sutras/id6806470563).
