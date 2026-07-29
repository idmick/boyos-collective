import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../../components/ui/ButtonLink'
import Reveal from '../../components/ui/Reveal'
import SiteFooter from '../../components/ui/SiteFooter'
import Ticker from '../../components/ui/Ticker'
import {
  currentWonderlandEvent,
  wonderlandCommunity,
} from '../../data/wonderland'

export default function ClubUpSeptember2026Page() {
  const event = currentWonderlandEvent
  const community = wonderlandCommunity
  const socialImage =
    'https://www.boyoscollective.nl/images/og/boyos-wonderland.jpg'

  return (
    <>
      <Head>
        {generateNextSeo({
          title:
            'Boyos Wonderland at Club UP Amsterdam | 18 September 2026',
          description: `${event.description} ${event.detailsLabel}`,
          canonical: event.canonical,
          openGraph: {
            url: event.canonical,
            title: 'Boyos Wonderland at Club UP Amsterdam',
            description: `${event.description} ${event.detailsLabel}`,
            images: [
              {
                url: socialImage,
                width: 1200,
                height: 630,
                type: 'image/jpeg',
                alt: 'Boyos Wonderland',
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
              content: 'Boyos Wonderland at Club UP Amsterdam',
            },
            {
              name: 'twitter:description',
              content: `${event.description} ${event.detailsLabel}`,
            },
            {
              name: 'twitter:image',
              content: socialImage,
            },
            {
              name: 'twitter:image:alt',
              content: 'Boyos Wonderland',
            },
          ],
        })}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicEvent',
            '@id': event.canonical,
            url: event.canonical,
            name: event.title,
            startDate: event.date,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.venueName,
              address: {
                '@type': 'PostalAddress',
                ...event.address,
              },
            },
            organizer: {
              '@type': 'Organization',
              name: 'Boyos Collective',
            },
            description: `${event.description} ${event.detailsLabel}`,
          }),
        }}
      />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[rgb(var(--color-brand-deep))] px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(94,196,188,0.2),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(239,125,167,0.15),transparent_36%)]" />
        <div
          aria-hidden="true"
          className="type-display absolute -right-[0.08em] top-[0.18em] select-none text-[clamp(15rem,44vw,42rem)] leading-none text-white/[0.025]"
        >
          18
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <Reveal variant="text">
            <p className="type-meta mb-6 text-[var(--color-brand-secondary)]">
              Next edition · Amsterdam
            </p>
            <h1 className="type-display max-w-5xl text-[clamp(3.35rem,10vw,9.5rem)] leading-[0.84]">
              Boyos Wonderland
              <span className="mt-2 block text-[var(--color-brand-secondary)]">
                at Club UP
              </span>
            </h1>
            <p className="type-accent mt-10 max-w-3xl text-[clamp(1.35rem,3.2vw,2.7rem)] leading-tight text-white/70">
              {event.description}
            </p>
            <p className="type-body mt-6 text-sm leading-7 text-white/48">
              {event.detailsLabel}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={community.url} tone="teal">
                {community.ctaLabel}
              </ButtonLink>
              <ButtonLink href="/wonderland" tone="paper">
                Back to Boyos Wonderland
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay="short" variant="card">
            <dl className="border-y border-white/12 py-2">
              {[
                ['Date', event.dateLabel],
                ['Venue', event.venueName],
                [
                  'Address',
                  `${event.address.streetAddress}, ${event.address.postalCode} ${event.address.addressLocality}`,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[76px_1fr] gap-6 border-b border-white/10 py-6 last:border-b-0"
                >
                  <dt className="type-meta pt-1 text-white/35">{label}</dt>
                  <dd className="type-body font-semibold leading-7">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <Ticker
        items={[
          'Boyos Wonderland',
          '18 September 2026',
          'Club UP Amsterdam',
          'Details follow',
        ]}
        tone="teal"
      />

      <SiteFooter />
    </>
  )
}
