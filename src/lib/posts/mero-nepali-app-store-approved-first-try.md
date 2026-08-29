---
title: 'How Mero Nepali passed App Store review on the first try'
seoTitle: 'Passing App Store Review on the First Try'
description: 'Our Flutter kids app cleared App Store review on the first submission. How a zero-data build made the privacy nutrition label and age rating trivial.'
date: '2026-08-28'
author: 'Damodar Lohani'
product: 'mero-nepali'
image: '/images/blog/mero-nepali-app-store-first-try.png'
tags: ['App Store Review', 'iOS', 'Flutter', 'Privacy', 'Kids Apps', 'Mero Nepali']
---

[Mero Nepali](/products/mero-nepali) is now on the App Store, and it got there on the
first submission. No rejection, no resubmission, no back-and-forth in Resolution Center.

For a children's education app, that is worth writing down. Kids apps sit in the
strictest corner of App Review — the rules that apply to everyone, plus a second layer
about data, advertising, and what you are allowed to put in front of a child. It is a
category where "we'll fix it if they flag it" is an expensive plan.

We did not get lucky. The submission was easy because of decisions made long before
there was anything to submit.

## The boring reason it passed

Most App Store rejections in this category come down to a mismatch: the app does
something with data, and the disclosure does not quite match it. The privacy nutrition
label says one thing, an SDK does another, and a reviewer notices.

Mero Nepali has no gap to mismatch, because it has no data surface at all:

- **No internet access.** There is no HTTP client, no socket, no network layer anywhere
  in the codebase. Not "we don't send much" — there is nothing to send with.
- **No data collection.** No account, no login, no email, no identifiers. Progress is
  stored on the device with `shared_preferences` and never leaves it.
- **No ads.** No ad SDK, no ad mediation, no interstitials between lessons.
- **No third-party sharing.** There is no analytics package, no crash reporter, no
  attribution SDK. There is no third party.

The whole dependency list is a game engine, an audio player, a router, local storage,
and an SVG parser. Every one of them draws something on screen or reads something from
disk. None of them phone home.

That turns the hardest part of a kids submission into the easiest. The privacy nutrition
label is the strongest answer Apple offers — **Data Not Collected** — and it is true, and
it is trivially verifiable by anyone who opens the project. The age rating questionnaire
is a column of "none." The data-use questions collapse into nothing.

Privacy as a feature is a nice line for a landing page. Privacy as an _absence_ is what
makes review boring, and boring is what you want.

## Where AI actually helped

The parts of a store submission that sink you are rarely the code. They are the hundred
small compliance details around it, and the fact that you have read your own listing so
many times you cannot see it any more.

We split the work by what each side is actually good at.

**We filled the declarations ourselves.** The privacy nutrition label and the age-rating
questionnaire were done by hand, line by line. These are legal statements about your own
app, and they are the two places where a wrong answer is not a typo but a
misrepresentation. They were also the easiest part of the whole submission, for the
reason above: when the app collects nothing, both forms answer themselves — there is
exactly one truthful path through each, and no judgement calls along the way. There was
nothing to agonise over, so there was nothing worth delegating.

**AI ran the readiness audit.** We had it sweep the repository against the App Store
Review Guidelines and hand back a prioritised list — blockers first, then should-fix,
then nice-to-have. Concrete checks rather than vibes: does every declared capability have
a usage string, do the bundle ID and version line up across the project, is there a
reachable privacy policy URL, does anything in the dependency tree contradict a "collects
nothing" claim, are there placeholder assets or debug switches still reachable in a
release build. The value was less in any single finding than in the sweep being
_complete_ — a checklist does not get bored on item forty.

**AI audited and finalised the listing.** The store description, the keyword set, and the
screenshots all went through it. Screenshots deserve calling out, because they are a
quiet source of rejections: they have to show the actual app rather than a marketing
mock-up, cover the required device sizes, and not promise anything the binary does not
do. A second pass checking every shot against what the app really renders — and
tightening the description and keywords while it was in there — catches the kind of thing
you stop being able to see after the fifth read.

What AI did not do is make the app compliant, and it did not sign anything on our behalf.
The app was compliant because it does not collect anything. The declarations were ours
because they should be. AI covered the ground in between: the sweep, and the polish.

## What we would tell you to do

If you are shipping a kids app, or any app where privacy is part of the pitch:

1. **Decide the data posture first.** "No network" is a decision you make at the start
   and defend, not one you retrofit. Retrofitting it means auditing every dependency you
   already shipped.
2. **Let the dependency list be your evidence.** Before you answer a single nutrition
   label question, read your own `pubspec.yaml`. If something in there can make a
   request, your answer is not "Data Not Collected," whatever you intended.
3. **Audit before you submit, not after they reject.** A rejection costs days of
   round-trip. A sweep costs an afternoon.
4. **Sign the declarations yourself; automate the sweep.** The nutrition label and age
   rating are statements about your own app — own them, and answer them from the
   dependency list rather than from memory. Point AI at the work that rewards
   exhaustiveness instead: auditing the repo, and checking the listing copy and
   screenshots against what the build actually does.

Mero Nepali teaches the Devanagari alphabet, numbers, and core vocabulary to children
through games, tracing, and a sticker book — entirely offline, with nothing to sign up
for. It is on the [App Store](https://apps.apple.com/us/app/mero-nepali-%E0%A4%AE-%E0%A4%B0-%E0%A4%A8-%E0%A4%AA-%E0%A4%B2/id6761828591)
and [Google Play](https://play.google.com/store/apps/details?id=dev.appwriters.mero_nepali).
