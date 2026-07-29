import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../../components/ui/ButtonLink'
import Reveal from '../../components/ui/Reveal'
import SiteFooter from '../../components/ui/SiteFooter'
import Ticker from '../../components/ui/Ticker'
import { wonderlandPageContent } from '../../data/wonderland'
import {
  getAllWonderlandEvents,
  getWonderlandEventBySlug,
} from '../../lib/wonderlandEvents'
import {
  buildWonderlandEventBreadcrumbs,
  buildWonderlandEventStructuredData,
} from '../../lib/wonderlandEventStructuredData'

export default function WonderlandEventPage({ event, community }) {
  const eventStructuredData =
    buildWonderlandEventStructuredData(event)
  const breadcrumbStructuredData =
    buildWonderlandEventBreadcrumbs(event)

  return (
    <>
      <Head>
        {generateNextSeo({
          title: event.seo.title,
          description: event.seo.description,
          canonical: event.canonical,
          openGraph: {
            url: event.canonical,
            title: event.seo.ogTitle,
            description: event.seo.description,
            images: [
              {
                url: event.seo.ogImage,
                width: 1200,
                height: 630,
                type: 'image/jpeg',
                alt: event.seo.ogImageAlt,
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
              content: event.seo.ogTitle,
            },
            {
              name: 'twitter:description',
              content: event.seo.description,
            },
            {
              name: 'twitter:image',
              content: event.seo.ogImage,
            },
            {
              name: 'twitter:image:alt',
              content: event.seo.ogImageAlt,
            },
          ],
        })}
      </Head>
      <script
        id="wonderland-event-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventStructuredData),
        }}
      />
      <script
        id="wonderland-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[rgb(var(--color-brand-deep))] px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(94,196,188,0.2),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(239,125,167,0.15),transparent_36%)]" />
        <div
          aria-hidden="true"
          className="type-display absolute -right-[0.08em] top-[0.18em] select-none text-[clamp(15rem,44vw,42rem)] leading-none text-white/[0.025]"
        >
          {event.dateDay}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <Reveal variant="text">
            <p className="type-meta mb-6 text-[var(--color-brand-secondary)]">
              Next edition · {event.address.addressLocality}
            </p>
            <h1 className="type-display max-w-5xl text-[clamp(3.35rem,10vw,9.5rem)] leading-[0.84]">
              {event.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={
                    index === 0
                      ? 'block'
                      : 'mt-2 block text-[var(--color-brand-secondary)]'
                  }
                >
                  {line}
                </span>
              ))}
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

      <Ticker items={event.tickerItems} tone="teal" />

      <SiteFooter />
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: getAllWonderlandEvents().map((event) => ({
      params: { slug: event.slug },
    })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const event = getWonderlandEventBySlug(params.slug)

  if (!event) return { notFound: true }

  return {
    props: {
      event,
      community: wonderlandPageContent.community,
    },
  }
}
