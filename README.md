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

