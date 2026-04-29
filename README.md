# Boyos Collective Website

Officiële website van **Boyos Collective**: een DJ-collectief uit Amsterdam, Haarlem en Den Haag.

De site bevat:
- een homepagina met introductie van het collectief;
- een **Boyos Soundsystem**-pagina met radio/player-ervaring via SoundCloud;
- een **Boyos Wonderland**-pagina voor events, media en sfeerimpressie;
- SEO- en sitemap-configuratie voor betere vindbaarheid.

## Tech stack

- **Next.js** (React)
- **Tailwind CSS** (+ DaisyUI)
- **next-seo** voor metadata/structured data
- **next-sitemap** voor sitemapgeneratie
- **Netlify** voor deployment

## Projectstructuur (belangrijkste mappen)

- `pages/` — routes zoals `/`, `/soundsystem`, `/wonderland`
- `components/` — herbruikbare UI-blokken (o.a. player, layout, signup)
- `data/` — JSON-data voor content zoals eerdere gigs
- `public/` — statische assets (afbeeldingen, video, fonts)

## Lokaal ontwikkelen

1. Installeer dependencies:
   ```bash
   npm install
   ```
2. Start de dev-server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Checks

Gebruik deze checks lokaal voordat je een PR opent:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Of alles in een keer:

```bash
npm run ci
```

## Build en export

```bash
npm run build
npm run export
```

Na `npm run build` wordt ook automatisch `next-sitemap` uitgevoerd (via `postbuild`).

## Content updaten

- **Afbeeldingen/video's**: vervang of voeg toe in `public/images` en `public/videos`.
- **Event/gig data**: werk `data/PastGigs.json` bij.
- **Pagina-inhoud**: pas de relevante bestanden in `pages/` en `components/` aan.

## Deployment

De site is ingericht voor Netlify met instellingen in `netlify.toml`.

### Review / staging flow

Aanbevolen flow voor review vóór livegang:

1. Koppel de GitHub-repository aan Netlify.
2. Stel `main` in als production branch.
3. Zet **Deploy Previews** aan voor pull requests.
4. Maak eventueel een vaste `staging` branch aan als gedeelde review-omgeving.
5. Gebruik GitHub Actions als merge-gate: PR's naar `main` of `staging` draaien automatisch `lint`, `typecheck`, `test` en `build`.

Praktisch betekent dit:
- elke PR krijgt een eigen Netlify preview-URL die Tomas en Nico kunnen bekijken;
- `staging` kan gebruikt worden als gezamenlijke pre-live omgeving;
- `main` blijft de productie-branch.
