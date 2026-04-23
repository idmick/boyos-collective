# CLAUDE.md — Boyos Collective Website

This file tells you how to work on this project. Keep it lean. Update it when you spot a recurring pattern or fix a mistake worth remembering.

---

## Project overview

**boyoscollective.nl** — the main web presence for Boyos Collective, a DJ trio (Tomas, Nico, Mickey) based across Amsterdam, Haarlem & The Hague.

Two identities:
- **Boyos Soundsystem** — DJ/booking identity (club nights, festivals, gigs)
- **Boyos Collective** — umbrella brand (events, art, community)

**Tech stack:**
- Next.js 15 (Pages Router)
- Tailwind CSS v4 + DaisyUI
- Deployed on Netlify
- `next-seo` for SEO/meta tags
- `next-sitemap` for sitemap generation
- `wavesurfer.js` for audio waveform
- `react-player` for video

**Key pages:**
- `pages/index.js` — homepage (two blocks: Soundsystem + Wonderland)
- `pages/soundsystem.js` — booking/DJ identity page
- `pages/wonderland.js` — event series page

**Key components:**
- `components/layout/` — Header, Footer, shared layout
- `components/HeroVideo.js`, `RadioPlayer.js`, `Waveform.js`, `SignupForm.js`, `CarouselDots.js`

---

## Brand voice

**Always:** warm, real, community-first, feel-good, soulful, inclusive, unpretentious.  
**Never:** corporate, hype-y, clout-chasing, exclusive-sounding, FOMO-driven.

Specific rules and why they exist:
- **No "don't miss out", "exclusive", "VIP", "limited spots"** — the brand is explicitly anti-elitist. These words signal the kind of event Boyos is not.
- **No exclamation point overload** — one per piece of copy max. More than that reads like a flyer, not a brand.
- **Lead with experience, not logistics** — describe what it feels like to be there before mentioning the date/time/price.
- **"Essential groove" and "stay groovy" are the brand's own language** — use them sparingly and only where they feel natural, not as filler.
- **Speak to people like they're already part of the community** — not like you're trying to sell them something.

If copy starts to sound like a nightclub promotion, it's wrong. Push back and rewrite.

---

## Anti-sycophancy

Challenge ideas that don't fit the brand. If a headline, caption, or copy direction reads too hype-y, too corporate, or too conversion-focused, say so and suggest an alternative. Don't fold just because I like my own idea — that's how bad copy ships.

For copy reviews, assume there's at least one thing that doesn't fit the brand voice and find it before signing off.

---

## Scope lock

Only modify the files explicitly mentioned in the request. Do not refactor components, rename variables, restructure pages, or "clean up" adjacent files unless specifically asked. If a change requires touching something outside the stated scope, ask first.

---

## Task-specific success criteria

**Instagram caption**
- Max 150 words
- Leads with a feeling or a scene, not an announcement
- Practical info (date, venue, ticket link) comes last if at all
- Ends with a vibe, not a hard CTA
- Hashtags in a separate block at the bottom, max 10

**Event announcement (website or WhatsApp)**
- First sentence puts you in the room
- Second sentence is what makes this edition different
- Third+ covers the practical stuff
- Never "don't miss out" or countdown urgency language

**Booking page / press bio copy**
- Speaks to promoters and bookers, not fans
- Confident but not arrogant — let the track record speak
- Include real venue/festival names (Woodstock 69, Shelter, Pacific, Veerplas, De Zon, Paard, Mosso Milan, Bleyenberg Rooftop)
- Genres: Disco, House, Brazilian Boogie, Soca, Zouk, Italo, Afro House

**SEO / meta copy**
- Descriptive, not clickbait
- Include location (Amsterdam, Haarlem, The Hague, Netherlands) naturally
- Target terms: DJ collective, DJ booking Netherlands, disco house DJ, Boyos Soundsystem

**Code changes**
- Match the existing code style (functional components, Tailwind classes, no CSS-in-JS)
- Don't introduce new dependencies without flagging it
- Test that the dev server would still run (`npm run dev`) — no broken imports

---

## Common tasks & how to handle them

**Adding a new event to the Wonderland page:** edit `pages/wonderland.js` only, follow the existing data structure.  
**Updating homepage text:** edit `pages/index.js` — the `blocks` array controls the two content cards.  
**Changing SEO/meta tags:** use `next-seo` `<NextSeo>` component already in each page, don't add raw `<meta>` tags.  
**Updating the sitemap:** it auto-generates on build via `next-sitemap.config.js` — no manual edits needed.

---

## Self-update instruction

If you notice a pattern in this project — a mistake that keeps happening, a convention that should be documented, a decision that was made and shouldn't be revisited — suggest an addition to this file. Keep the addition short and include the reason, not just the rule.
