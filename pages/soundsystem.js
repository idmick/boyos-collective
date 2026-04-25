import fs from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import path from 'path'
import { useState } from 'react'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../components/ui/ButtonLink'
import Reveal from '../components/ui/Reveal'
import SectionTitle from '../components/ui/SectionTitle'
import SiteFooter from '../components/ui/SiteFooter'
import Ticker from '../components/ui/Ticker'
import { soundsystemPage } from '../data/soundsystem'

const INITIAL_GIGS_COUNT = 18

export default function Soundsystem({ pastGigs }) {
  const page = soundsystemPage
  const [showAllGigs, setShowAllGigs] = useState(false)
  const visibleGigs = showAllGigs ? pastGigs : pastGigs.slice(0, INITIAL_GIGS_COUNT)

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Boyos Soundsystem | DJ Booking Netherlands',
          description:
            'Boyos Soundsystem is a DJ trio from Amsterdam, Haarlem & The Hague for disco, house, Brazilian Boogie, Soca, Zouk, Italo and Afro House bookings in the Netherlands.',
          canonical: 'https://www.boyoscollective.nl/soundsystem',
          openGraph: {
            url: 'https://www.boyoscollective.nl/soundsystem',
            title: 'Boyos Soundsystem | Disco House DJ Collective',
            description:
              'Book Boyos Soundsystem for warm, dance-forward sets across Disco, House, Brazilian Boogie, Soca, Zouk, Italo and Afro House.',
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/boyos-25-20.jpg',
                alt: 'Boyos Soundsystem',
              },
            ],
            siteName: 'Boyos Collective',
          },
        })}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: 'Boyos Soundsystem',
            url: 'https://www.boyoscollective.nl/soundsystem',
            genre: page.genres,
            foundingLocation: 'Amsterdam, Netherlands',
            image: 'https://www.boyoscollective.nl/images/boyos-25-20.jpg',
            sameAs: [
              'https://www.instagram.com/boyos.soundsystem/',
              'https://ra.co/dj/boyossoundsystem',
              'https://soundcloud.com/boyos_soundsystem',
            ],
            member: page.hero.djs.map((name) => ({
              '@type': 'Person',
              name,
            })),
          }),
        }}
      />

      <section
        data-hero-parallax
        className="hero-parallax-scene relative flex min-h-screen items-end overflow-hidden bg-[var(--color-brand-charcoal)] px-6 pt-24 md:px-10"
      >
        <Image
          src={page.hero.image}
          alt=""
          fill
          priority
          className="hero-parallax-background object-cover brightness-[0.45] grayscale-[0.45]"
        />
        <div className="hero-parallax-wordmark type-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(8rem,25vw,24rem)] tracking-[0.05em] text-transparent [-webkit-text-stroke:1px_rgba(240,235,226,0.07)]">
          Soundsystem
        </div>
        <Image
          src={page.hero.badge}
          alt=""
          width={520}
          height={520}
          className="hero-parallax-badge absolute right-[-5%] top-1/2 hidden w-[min(38vw,520px)] -translate-y-1/2 opacity-10 grayscale md:block"
          style={{ '--hero-badge-tilt': '12deg' }}
        />
        <Image
          src={page.hero.badge}
          alt="Boyos Soundsystem"
          width={190}
          height={190}
          className="hero-parallax-badge surface-badge absolute bottom-[calc(var(--hero-bottom-safe)+1.25rem)] right-8 hidden w-[clamp(120px,14vw,190px)] drop-shadow-2xl transition hover:rotate-0 hover:scale-105 md:block md:bottom-[calc(var(--hero-bottom-safe)+1.25rem)]"
          style={{ '--hero-badge-tilt': '-6deg' }}
        />
        <div className="hero-parallax-content hero-safe-content relative z-10 max-w-4xl">
          <p className="type-meta mb-4 text-[var(--color-brand-primary)]">
            {page.hero.eyebrow}
          </p>
          <h1 className="type-display text-[clamp(5rem,17vw,14rem)] leading-[0.86]">
            Boyos
            <br />
            Sound
            <br />
            System
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-5 md:gap-8">
            {page.hero.djs.map((dj, index) => (
              <span
                key={dj}
                className="type-accent text-[clamp(1.25rem,2.5vw,2rem)] text-[color:rgb(var(--color-surface-paper-rgb)/0.72)]"
              >
                {dj}
                {index < page.hero.djs.length - 1 ? (
                  <span className="ml-5 text-base not-italic text-[var(--color-brand-primary)]">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Ticker items={page.ticker} />

      <section className="bg-[var(--color-surface-paper)] px-6 py-[var(--space-section)] text-[var(--color-text-primary)] md:px-10">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-20">
          <Reveal variant="text">
            <SectionTitle
              eyebrow={page.about.eyebrow}
              title={page.about.title}
              dark={false}
            />
            <div className="mt-12 grid grid-cols-3 gap-5 border-t border-black/10 pt-10">
              {page.about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="type-display text-6xl leading-none text-[var(--color-brand-primary)]">
                    {stat.value}
                  </div>
                  <div className="type-meta mt-1 text-[var(--color-text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay="short" variant="media">
            <Image
              src={page.about.image}
              alt="Boyos Soundsystem live"
              width={520}
              height={650}
              className="surface-card surface-media aspect-[4/5] w-full max-w-[440px] rotate-1 rounded-md object-cover shadow-2xl"
            />
            <div className="type-body mt-10 space-y-5 text-base leading-8 text-[var(--color-text-muted)]">
              {page.about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="The People" title="The Boyos" />
          </Reveal>
          <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
            {page.artists.map((artist, index) => (
              <Reveal
                key={artist.name}
                delay={index === 0 ? 'none' : 'short'}
                variant="card"
              >
                <article className="surface-card group h-full overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] hover:border-[color:rgb(217_112_144/0.45)]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="surface-media object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,18,16,0.96)] via-[rgba(20,18,16,0.18)] to-transparent" />
                    <div className="absolute left-6 top-5 type-display text-7xl leading-none text-[var(--color-brand-primary)] opacity-35 md:left-7 md:top-6 md:text-8xl">
                      {artist.number}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <h3 className="type-display text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.88] text-[var(--color-surface-paper)]">
                        {artist.name}
                      </h3>
                      <p className="type-meta mt-3 text-[var(--color-brand-secondary)]">
                        {artist.role}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand-event)] px-6 py-24 text-[var(--color-text-primary)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="The Sound" title="What We Play" dark={false} />
            <div className="mt-12 flex flex-wrap gap-3">
              {page.genres.map((genre) => (
                <span
                  key={genre}
                  className="type-body rounded-full border border-[var(--color-text-primary)] px-5 py-2 text-sm font-semibold tracking-[0.08em] transition hover:bg-[var(--color-text-primary)] hover:text-[var(--color-brand-event)]"
                >
                  {genre}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sets" className="bg-[var(--color-brand-charcoal)] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="Listen" title="Our Sets" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.sets.map((set) => (
              <Reveal key={set.url} delay="short" variant="card">
                <div className="surface-card border border-white/10 bg-white/[0.02] p-5">
                  <p className="type-meta mb-3 text-[color:rgb(var(--color-surface-paper-rgb)/0.38)]">
                    {set.label}
                  </p>
                  <iframe
                    src={set.url}
                    title={set.label}
                    width="100%"
                    height="225px"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="past-gigs" className="bg-[var(--color-brand-charcoal)] px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="The Record" title="Past Gigs" />
          </Reveal>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {visibleGigs.map((gig) => (
              <article
                key={`${gig.monthYear}-${gig.title}-${gig.venue}`}
                className="bg-[var(--color-brand-charcoal)] p-5 transition hover:bg-white/[0.05]"
              >
                <p className="type-meta mb-2 text-[var(--color-brand-secondary)]">
                  {gig.monthYear}
                </p>
                <h3 className="type-body text-sm font-semibold leading-5 text-[var(--color-surface-paper)]">
                  {gig.title || gig.venue}
                </h3>
                <p className="type-body mt-1 text-xs tracking-wide text-[color:rgb(var(--color-surface-paper-rgb)/0.38)]">
                  {gig.venue}
                </p>
              </article>
            ))}
          </div>
          {pastGigs.length > INITIAL_GIGS_COUNT ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllGigs((current) => !current)}
                className="btn btn-ink"
              >
                {showAllGigs ? 'Show Less' : 'Show All Gigs'}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[var(--color-surface-paper)] px-6 py-24 text-center text-[var(--color-text-primary)] md:px-10">
        <Reveal className="mx-auto max-w-3xl" variant="text">
          <span className="eyebrow eyebrow-dark text-center">
            Get in touch
          </span>
          <h2 className="type-display text-[clamp(4rem,11vw,9rem)] leading-[0.86]">
            Book
            <br />
            Boyos
            <br />
            Soundsystem
          </h2>
          <p className="type-accent mx-auto mb-10 mt-8 max-w-2xl text-2xl leading-9 text-[var(--color-text-muted)]">
            {page.booking.body}
          </p>
          <ButtonLink href={page.booking.href} tone="ink">
            {page.booking.cta}
          </ButtonLink>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  )
}

export async function getStaticProps() {
  const pastGigsFilePath = path.join(process.cwd(), 'data', 'PastGigs.json')
  const pastGigsFileContent = await fs.readFile(pastGigsFilePath, 'utf8')
  const { pastGigs = [] } = JSON.parse(pastGigsFileContent)

  return {
    props: { pastGigs },
  }
}
