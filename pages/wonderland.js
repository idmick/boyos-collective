import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../components/ui/ButtonLink'
import SignupForm from '../components/SignupForm'
import Reveal from '../components/ui/Reveal'
import SectionTitle from '../components/ui/SectionTitle'
import SiteFooter from '../components/ui/SiteFooter'
import Ticker from '../components/ui/Ticker'
import { wonderlandPageContent } from '../data/wonderland'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'

const wonderlandSections = [
  { label: 'Story', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Archive', href: '#archive' },
  { label: 'Photos', href: '#photos' },
]

export default function BoyosWonderlandPage({ page }) {
  const event = page.currentEvent

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Boyos Wonderland | Events, Art & Essential Groove',
          description:
            'Boyos Wonderland is the event world of Boyos Collective: Dine & Dance nights, open-air mini festivals, music, art, food and community in Haarlem and Amsterdam.',
          canonical: 'https://www.boyoscollective.nl/wonderland',
          openGraph: {
            url: 'https://www.boyoscollective.nl/wonderland',
            title: 'Boyos Wonderland | Events, Art & Essential Groove',
            description:
              'Step into Boyos Wonderland: warm events around music, art, food, tattoos and the essential groove.',
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/og/boyos-wonderland.jpg',
                width: 1200,
                height: 630,
                type: 'image/jpeg',
                alt: 'Boyos Wonderland at Houtbaar Haarlem',
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
              content: 'Boyos Wonderland | Events, Art & Essential Groove',
            },
            {
              name: 'twitter:description',
              content:
                'Step into Boyos Wonderland: warm events around music, art, food, tattoos and the essential groove.',
            },
            {
              name: 'twitter:image',
              content:
                'https://www.boyoscollective.nl/images/og/boyos-wonderland.jpg',
            },
            {
              name: 'twitter:image:alt',
              content: 'Boyos Wonderland at Houtbaar Haarlem',
            },
          ],
        })}
      </Head>

      <section
        data-hero-parallax
        className="hero-parallax-scene relative flex min-h-screen items-end overflow-hidden bg-[rgb(var(--color-brand-deep))] px-6 pt-24 md:px-10"
      >
        <Image
          src={page.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-parallax-background object-cover brightness-[0.38] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(94,196,188,0.08),transparent_70%)]" />
        <Image
          src={page.hero.badge}
          alt=""
          width={560}
          height={560}
          className="hero-parallax-badge absolute right-[-2%] top-1/2 hidden w-[min(42vw,560px)] -translate-y-1/2 opacity-10 grayscale md:block"
          style={{ '--hero-badge-tilt': '-12deg' }}
        />
        <Image
          src={page.hero.badge}
          alt="Essential Groove"
          width={210}
          height={210}
          className="hero-parallax-badge surface-badge absolute bottom-[calc(var(--hero-bottom-safe)+1rem)] right-[5%] z-10 hidden w-[clamp(130px,16vw,210px)] drop-shadow-2xl transition hover:rotate-0 hover:scale-105 md:block"
          style={{ '--hero-badge-tilt': '6deg' }}
        />
        <div className="hero-parallax-content hero-safe-content hero-safe-content-wonderland relative z-10 max-w-3xl">
          <p className="type-meta mb-4 text-[var(--color-brand-secondary)]">
            {page.hero.eyebrow}
          </p>
          <h1 className="type-display text-[clamp(5rem,17vw,14rem)] leading-[0.86]">
            <span>Boyos</span>
            <br />
            <span className="text-[var(--color-brand-secondary)]">
              Wonder
              <br />
              Land
            </span>
          </h1>
          <p className="type-accent mt-8 max-w-xl text-2xl leading-9 text-[color:rgb(var(--color-surface-paper-rgb)/0.62)]">
            {page.hero.subtitle}
          </p>
        </div>
      </section>

      <Ticker
        items={[
          'Dine & Dance',
          'Garden Festival',
          'Music',
          'Art',
          'Food',
          'Tattoos',
          'Essential Groove',
        ]}
        tone="teal"
      />

      <nav
        aria-label="Wonderland sections"
        className="border-y border-white/10 bg-[rgb(var(--color-brand-deep))]"
      >
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <div className="flex min-w-max items-center gap-1 px-6 py-3 md:min-w-0 md:justify-center md:px-10">
            {wonderlandSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="type-control shrink-0 border-b border-transparent px-4 py-3 text-[11px] text-white/55 no-underline transition hover:border-[var(--color-brand-secondary)] hover:text-white focus-visible:border-[var(--color-brand-secondary)] focus-visible:text-white focus-visible:outline-none"
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <section
        id="story"
        className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-24">
          <Reveal variant="media">
            <Image
              src={page.story.image}
              alt="Boyos Wonderland mini festival"
              width={520}
              height={693}
              className="surface-card surface-media aspect-[3/4] w-full max-w-[460px] -rotate-1 rounded-md object-cover shadow-2xl"
            />
          </Reveal>
          <Reveal delay="short" variant="text">
            <SectionTitle
              eyebrow={page.story.eyebrow}
              title={page.story.title}
            />
            <Image
              src={page.story.logo}
              alt="Boyos Wonderland"
              width={280}
              height={120}
              className="my-8 max-w-[280px] opacity-90 invert"
            />
            <div className="type-body space-y-5 text-[15px] leading-8 text-[color:rgb(var(--color-surface-paper-rgb)/0.58)]">
              {page.story.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[rgb(var(--color-brand-deep))] px-6 py-[var(--space-section)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="What we bring" title="The Elements" />
          </Reveal>
          <div className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {page.pillars.map((pillar, index) => (
              <Reveal
                key={pillar.name}
                delay={index > 0 ? 'short' : 'none'}
                variant="card"
              >
                <article className="surface-card h-full border border-white/10 p-8 hover:border-[color:rgb(94_196_188/0.28)] hover:bg-[color:rgb(94_196_188/0.06)]">
                  <div className="type-display mb-[-10px] text-6xl leading-none text-[var(--color-brand-secondary)] opacity-25">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="type-display text-4xl leading-none">
                    {pillar.name}
                  </h3>
                  <p className="type-body mt-5 text-sm leading-7 text-[color:rgb(var(--color-surface-paper-rgb)/0.5)]">
                    {pillar.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="events"
        className="bg-[var(--color-brand-event)] px-6 py-[var(--space-section)] text-[var(--color-text-primary)] md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle
              eyebrow="Upcoming editions"
              title="Events"
              dark={false}
            />
          </Reveal>
          <Reveal delay="short" variant="card">
            <Link
              href={event.href}
              className="surface-card group mt-14 grid overflow-hidden border border-black/20 text-inherit no-underline hover:border-black/50 md:grid-cols-2"
            >
              <div className="relative min-h-[360px] overflow-hidden bg-[rgb(var(--color-brand-deep))] md:min-h-[620px]">
                <Image
                  src={event.heroImage}
                  alt={`${event.title} artwork`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="surface-media object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between bg-black/[0.04] p-8 md:p-12">
                <div>
                  <p className="type-meta mb-3 text-black/45">
                    Next edition · {event.locationLabel}
                  </p>
                  <h3 className="type-display text-[clamp(3.4rem,6vw,5.8rem)] leading-[0.86]">
                    {event.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <dl className="type-body my-8 space-y-3 text-sm">
                    <div className="flex gap-4">
                      <dt className="type-meta w-16 text-black/45">Date</dt>
                      <dd className="font-semibold">{event.dateLabel}</dd>
                    </div>
                    <div className="flex gap-4">
                      <dt className="type-meta w-16 text-black/45">Venue</dt>
                      <dd className="font-semibold">{event.locationLabel}</dd>
                    </div>
                  </dl>
                  <p className="type-body border-t border-black/10 pt-7 text-sm leading-7 text-black/65">
                    {event.description}
                  </p>
                  <p className="type-body mt-4 text-sm font-semibold leading-7 text-black/70">
                    {event.detailsLabel}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="btn btn-ink type-control">
                    Event details &amp; tickets →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-brand-charcoal)] px-6 py-24 md:px-10">
        <Reveal
          className="mx-auto grid max-w-6xl overflow-hidden border-y border-white/10 md:grid-cols-12"
          variant="text"
        >
          <div className="py-14 md:col-span-7 md:border-r md:border-white/10 md:py-20 md:pr-14">
            <span className="type-meta mb-5 block text-[var(--color-brand-secondary)]">
              {page.community.eyebrow}
            </span>
            <p className="type-accent max-w-3xl text-[clamp(2.8rem,6vw,5.7rem)] leading-[0.95]">
              {page.community.title}
            </p>
            <p className="type-body mt-8 max-w-xl text-[15px] leading-8 text-white/55">
              {page.community.body}
            </p>
            <ButtonLink
              href={page.community.url}
              tone="teal"
              className="mt-8"
            >
              {page.community.ctaLabel}
            </ButtonLink>
          </div>

          <div
            id="wonderland-signup"
            className="border-t border-white/10 py-14 md:col-span-5 md:border-t-0 md:py-20 md:pl-14"
          >
            <span className="type-meta mb-5 block text-white/38">
              {page.community.emailSignup.eyebrow}
            </span>
            <h2 className="type-display max-w-md text-[clamp(2.9rem,5vw,4.8rem)] leading-[0.9]">
              {page.community.emailSignup.title}
            </h2>
            <p className="type-body mt-7 max-w-md text-sm leading-7 text-white/52">
              {page.community.emailSignup.body}
            </p>
            <SignupForm />
          </div>
        </Reveal>
      </section>

      <section
        id="archive"
        className="bg-[rgb(var(--color-brand-deep))] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <SectionTitle eyebrow="Past editions" title="The Archive" />
          </Reveal>

          <div className="mt-12 space-y-4">
            {page.pastEditions.map((edition) => (
              <Reveal key={edition.href} variant="card">
                <Link
                  href={edition.href}
                  className="surface-card group grid overflow-hidden border border-white/10 text-inherit no-underline transition hover:border-white/25 md:grid-cols-[220px_1fr_auto] md:items-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
                    <Image
                      src={edition.poster}
                      alt={`${edition.title} poster`}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="surface-media object-cover"
                    />
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="type-meta mb-3 text-[var(--color-brand-amber)]">
                      {edition.dateLabel} · {edition.venueLabel}
                    </p>
                    <h3 className="type-display text-[clamp(3rem,6vw,5rem)] leading-none">
                      {edition.title}
                    </h3>
                  </div>
                  <span className="btn btn-paper type-control mb-7 ml-7 mr-7 md:mb-0 md:ml-0 md:mr-9">
                    View edition →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div id="photos" className="mt-24">
            <Reveal variant="text">
              <SectionTitle eyebrow="Captured moments" title="Photo Albums" />
            </Reveal>
            <div className="mt-12 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {page.albums.map((album) => (
                <a
                  key={album.url}
                  href={album.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card group relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="surface-media object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-5 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                    <span className="type-display text-2xl leading-none">
                      {album.title}
                    </span>
                    <small className="type-meta mt-1 text-[var(--color-brand-secondary)]">
                      View album
                    </small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand-charcoal)] px-6 py-24 text-center md:px-10">
        <Reveal className="mx-auto max-w-3xl" variant="text">
          <span className="eyebrow text-center">The spirit</span>
          <p className="type-accent text-[clamp(2rem,5vw,4rem)] leading-tight">
            “{page.philosophy.title}”
          </p>
          <p className="type-body mx-auto mb-10 mt-8 max-w-xl text-[15px] leading-8 text-[color:rgb(var(--color-surface-paper-rgb)/0.55)]">
            {page.philosophy.body}
          </p>
          <ButtonLink href="mailto:events@boyoscollective.nl" tone="teal">
            Collaborate with us
          </ButtonLink>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      page: {
        ...wonderlandPageContent,
        currentEvent: getCurrentWonderlandEvent(wonderlandPageContent),
      },
    },
  }
}
