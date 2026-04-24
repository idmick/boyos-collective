import Head from 'next/head'
import Image from 'next/image'
import { OrganizationJsonLd } from 'next-seo'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../components/ui/ButtonLink'
import Reveal from '../components/ui/Reveal'
import SiteFooter from '../components/ui/SiteFooter'
import Ticker from '../components/ui/Ticker'
import { homePage } from '../data/home'

export default function Home() {
  const { hero, playedAt, nextEvent, identities, merch } = homePage

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
                url: 'https://www.boyoscollective.nl/images/Boyos_logo_boxed.png',
                alt: 'Boyos Collective logo',
              },
            ],
            siteName: 'Boyos Collective',
          },
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

      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[rgb(var(--color-brand-deep))]">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          className="object-cover opacity-80 transition duration-[8000ms] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,16,9,0.3)] via-[rgba(17,16,9,0.1)] to-[rgb(var(--color-brand-deep))]" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
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
          <div className="mb-16 mt-9 flex flex-col gap-3 sm:flex-row">
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
          <Reveal>
            <p className="type-meta mb-4 text-[var(--color-text-muted)]">
              Next up · Boyos Wonderland × INI Movement
            </p>
            <h2 className="type-display text-[clamp(4rem,10vw,8rem)] leading-[0.86]">
              Summer
              <br />
              Jam
            </h2>
            <div className="my-8 flex flex-wrap gap-3">
              {[
                nextEvent.dateLabel,
                nextEvent.locationLabel,
                nextEvent.timeLabel,
              ].map((item) => (
                <span
                  key={item}
                  className="type-body rounded-full bg-black/10 px-4 py-2 text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={nextEvent.href} tone="ink">
                More info →
              </ButtonLink>
              <ButtonLink href="/wonderland" tone="ink">
                All events
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay="short">
            <Image
              src={nextEvent.poster}
              alt={`${nextEvent.shortTitle} poster`}
              width={320}
              height={426}
              className="w-full max-w-[260px] rotate-2 rounded-lg object-cover shadow-2xl transition hover:rotate-0 md:w-[22vw]"
            />
          </Reveal>
        </div>
      </section>

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
            className="group relative flex min-h-[520px] flex-col justify-end overflow-hidden p-8 md:min-h-[620px] md:p-12"
          >
            <Image
              src={identity.image}
              alt={identity.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,16,9,0.95)] via-[rgba(17,16,9,0.46)] to-transparent" />
            <Reveal className="relative z-10">
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
                className="mb-4 h-[76px] w-[76px] rounded-full object-contain transition duration-500 group-hover:-rotate-12 group-hover:scale-110"
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
          className="object-cover grayscale-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,16,9,0.96)] via-[rgba(17,16,9,0.72)] to-[rgba(17,16,9,0.22)]" />
        <Reveal className="relative z-10 max-w-lg">
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
