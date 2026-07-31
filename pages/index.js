import Head from 'next/head'
import Image from 'next/image'
import { OrganizationJsonLd } from 'next-seo'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../components/ui/ButtonLink'
import Reveal from '../components/ui/Reveal'
import SiteFooter from '../components/ui/SiteFooter'
import Ticker from '../components/ui/Ticker'
import { homePage } from '../data/home'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'
import { wonderlandPageContent } from '../data/wonderland'

export default function Home({ nextEvent, latestAlbum }) {
  const {
    hero,
    playedAt,
    nextEventSection,
    identities,
    merch,
  } = homePage

  return (
    <>
      <Head>
        {generateNextSeo({
          title:
            'Boyos Collective | DJ Collective Amsterdam, Haarlem & The Hague',
          description:
            'Boyos Collective is a DJ collective based in Amsterdam, Haarlem & The Hague. We organize events, play at clubs and festivals, and bring people together through music, art, and creativity.',
          canonical: 'https://www.boyoscollective.nl/',
          openGraph: {
            url: 'https://www.boyoscollective.nl/',
            title:
              'Boyos Collective | DJ Collective Amsterdam, Haarlem & The Hague',
            description:
              'Boyos Collective is a DJ collective based in Amsterdam, Haarlem & The Hague. We organize events, play at clubs and festivals, and bring people together through music, art, and creativity.',
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/og/boyos-collective.jpg',
                width: 1200,
                height: 630,
                type: 'image/jpeg',
                alt: 'Boyos Collective dancefloor',
              },
            ],
            siteName: 'Boyos Collective',
          },
          twitter: {
            cardType: 'summary_large_image',
          },
          additionalMetaTags: [
            {
              name: 'twitter:title',
              content:
                'Boyos Collective | DJ Collective Amsterdam, Haarlem & The Hague',
            },
            {
              name: 'twitter:description',
              content:
                'Boyos Collective is a DJ collective based in Amsterdam, Haarlem & The Hague. We organize events, play at clubs and festivals, and bring people together through music, art, and creativity.',
            },
            {
              name: 'twitter:image',
              content:
                'https://www.boyoscollective.nl/images/og/boyos-collective.jpg',
            },
            {
              name: 'twitter:image:alt',
              content: 'Boyos Collective dancefloor',
            },
          ],
        })}
      </Head>
      <OrganizationJsonLd
        type="Organization"
        id="https://www.boyoscollective.nl"
        name="Boyos Collective"
        url="https://www.boyoscollective.nl"
        logo="https://www.boyoscollective.nl/images/Boyos_logo_boxed.png"
        sameAs={[
          'https://www.instagram.com/boyos.soundsystem/',
          'https://www.instagram.com/boyos.wonderland/',
          'https://ra.co/dj/boyossoundsystem',
          'https://soundcloud.com/boyos_soundsystem',
        ]}
      />

      <section
        data-hero-parallax
        className="hero-parallax-scene relative flex min-h-screen flex-col justify-end overflow-hidden bg-[rgb(var(--color-brand-deep))]"
      >
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-parallax-background object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,16,9,0.3)] via-[rgba(17,16,9,0.1)] to-[rgb(var(--color-brand-deep))]" />
        <div className="hero-parallax-content hero-safe-content hero-safe-content-home relative z-10 flex flex-col items-center px-6 text-center">
          <p className="type-meta mb-3 text-[color:rgb(var(--color-surface-paper-rgb)/0.62)]">
            {hero.eyebrow}
          </p>
          <h1 className="type-display text-[clamp(4.5rem,14vw,11rem)] leading-[0.86] text-[var(--color-surface-paper)] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
            Boyos
            <br />
            Collective
          </h1>
          <p className="type-accent mt-3 text-[clamp(1.2rem,2.6vw,2rem)] text-[color:rgb(var(--color-surface-paper-rgb)/0.72)]">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#next-event" tone="pink">
              Next Event
            </ButtonLink>
            <ButtonLink
              href="mailto:soundsystem@boyoscollective.nl"
              tone="outline"
            >
              Book Boyos Soundsystem
            </ButtonLink>
          </div>
        </div>
        <Ticker items={playedAt} label="Played at" tone="paper" />
      </section>

      <section
        id="next-event"
        className="bg-[var(--color-brand-event)] px-6 py-20 text-[var(--color-text-primary)] md:px-10"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto]">
          <Reveal variant="text">
            <p className="type-meta mb-4 text-[var(--color-text-muted)]">
              {nextEventSection.eyebrow}
            </p>
            <h2 className="type-display text-[clamp(4rem,10vw,8rem)] leading-[0.86]">
              {nextEvent.shortTitleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className="my-8 flex flex-wrap gap-3">
              {[nextEvent.dateLabel, nextEvent.locationLabel].map((item) => (
                <span
                  key={item}
                  className="type-body rounded-full bg-black/10 px-4 py-2 text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="type-body mb-8 max-w-xl text-sm leading-7 text-black/60">
              {nextEvent.detailsLabel}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={nextEvent.href} tone="ink">
                {nextEventSection.detailsCtaLabel}
              </ButtonLink>
              <ButtonLink href="/wonderland" tone="ink">
                {nextEventSection.allEventsCtaLabel}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay="short" variant="media">
            <div className="surface-card relative flex aspect-[4/5] w-full max-w-[280px] rotate-2 flex-col justify-between overflow-hidden bg-[rgb(var(--color-brand-deep))] p-7 text-[var(--color-surface-paper)] shadow-2xl md:w-[23vw]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(94,196,188,0.3),transparent_34%),radial-gradient(circle_at_20%_88%,rgba(239,125,167,0.2),transparent_40%)]" />
              <p className="type-meta relative text-[var(--color-brand-secondary)]">
                {nextEvent.dateLabel}
              </p>
              <div className="relative">
                <p className="type-display text-[clamp(5.2rem,10vw,8rem)] leading-[0.78]">
                  {nextEvent.dateShort}
                </p>
                <p className="type-accent mt-5 text-2xl text-white/55">
                  {nextEvent.locationLabel}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {latestAlbum ? (
        <section
          id="latest-photos"
          className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10"
        >
          <div className="mx-auto grid max-w-6xl overflow-hidden border border-white/10 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="h-full min-w-0" variant="media">
              <div className="surface-card group relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[560px]">
                <Image
                  src={latestAlbum.cover}
                  alt={latestAlbum.title}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="surface-media object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal
              className="flex min-w-0 items-center border-t border-white/10 lg:border-l lg:border-t-0"
              delay="short"
              variant="text"
            >
              <div className="p-8 sm:p-10 md:p-14">
                <span className="type-meta mb-5 block text-[var(--color-brand-secondary)]">
                  Latest from Wonderland
                </span>
                <h2 className="type-display max-w-[14ch] text-[clamp(3.2rem,6vw,6rem)] leading-[0.86]">
                  {latestAlbum.title}
                </h2>
                <p className="type-body mt-7 max-w-md text-[15px] leading-8 text-white/55">
                  A look back at the latest Wonderland edition, from the first
                  arrivals to the last groove.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href={latestAlbum.url} tone="teal">
                    View full album ↗
                  </ButtonLink>
                  <ButtonLink href="/wonderland#photos" tone="outline">
                    All photo albums
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <Ticker
        items={[
          'Disco',
          'House',
          'Global Grooves',
          'Boyos Collective',
          'Amsterdam',
          'We Got The Funk',
        ]}
        reverse
      />

      <section className="grid md:grid-cols-2">
        {identities.map((identity) => (
          <article
            key={identity.href}
            className="surface-card group relative flex min-h-[520px] flex-col justify-end overflow-hidden p-8 md:min-h-[620px] md:p-12"
          >
            <Image
              src={identity.image}
              alt={identity.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="surface-media object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,16,9,0.95)] via-[rgba(17,16,9,0.46)] to-transparent" />
            <Reveal className="relative z-10" variant="card">
              <span
                className={`type-meta mb-3 block ${
                  identity.tone === 'teal'
                    ? 'text-[var(--color-brand-secondary)]'
                    : 'text-[var(--color-brand-primary)]'
                }`}
              >
                {identity.eyebrow}
              </span>
              <Image
                src={identity.badge}
                alt=""
                width={76}
                height={76}
                className="surface-badge mb-4 h-[76px] w-[76px] rounded-full object-contain transition duration-500 group-hover:-rotate-12 group-hover:scale-110"
              />
              <h2 className="type-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.86]">
                {identity.title.split(' ').map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h2>
              <p className="type-body my-6 max-w-sm text-sm leading-7 text-[color:rgb(var(--color-surface-paper-rgb)/0.65)]">
                {identity.body}
              </p>
              <ButtonLink
                href={identity.href}
                tone={identity.tone === 'teal' ? 'teal' : 'outline'}
              >
                {identity.cta} →
              </ButtonLink>
            </Reveal>
          </article>
        ))}
      </section>

      <Ticker
        items={[
          'Dine & Dance',
          'Garden Festival',
          'Wonderland',
          'Music · Art · Food · Tattoos',
          'Essential Groove',
        ]}
        tone="teal"
      />

      <section
        id="merch"
        className="relative flex min-h-[500px] items-center overflow-hidden px-6 py-20 md:px-10"
      >
        <Image
          src={merch.image}
          alt="Boyos Merch"
          fill
          sizes="100vw"
          className="object-cover grayscale-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,16,9,0.96)] via-[rgba(17,16,9,0.72)] to-[rgba(17,16,9,0.22)]" />
        <Reveal className="relative z-10 max-w-lg" variant="text">
          <span className="type-meta mb-5 inline-block rounded-full bg-[rgba(240,208,96,0.15)] px-3 py-1 text-[var(--color-brand-event)]">
            {merch.eyebrow}
          </span>
          <h2 className="type-display text-[clamp(4rem,11vw,9rem)] leading-[0.86]">
            Boyos
            <br />
            Merch
          </h2>
          <p className="type-accent mt-5 max-w-sm text-xl leading-8 text-[color:rgb(var(--color-surface-paper-rgb)/0.66)]">
            {merch.body}
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      nextEvent: getCurrentWonderlandEvent(wonderlandPageContent),
      latestAlbum: wonderlandPageContent.albums[0] ?? null,
    },
  }
}
