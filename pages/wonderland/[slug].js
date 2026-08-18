import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { GeistSans } from 'geist/font/sans'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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

gsap.registerPlugin(useGSAP, ScrollTrigger)

const formatEuro = (value) =>
  `€${value.toFixed(2).replace(/\.00$/, '')}`

function LineupAccordion({ artists }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="mt-8 flex min-h-[300px] flex-col overflow-hidden border border-black/15 lg:flex-row">
      {artists.map((artist, index) => {
        const active = activeIndex === index

        return (
          <article
            key={artist.name}
            className={`group flex min-h-0 min-w-0 flex-col bg-white/35 transition-[flex-grow,background-color] duration-700 ease-out hover:bg-white/75 lg:min-h-[300px] ${
              active ? 'flex-[4] bg-white/75' : 'flex-1'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <button
              type="button"
              className="flex flex-1 cursor-pointer items-start justify-between gap-5 border-b border-black/15 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-black lg:border-b-0 lg:border-r"
              aria-expanded={active}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`font-black uppercase leading-[0.88] tracking-[-0.055em] [overflow-wrap:anywhere] transition-[font-size] duration-700 ${
                  active
                    ? 'text-[clamp(1.75rem,2.4vw,2.4rem)]'
                    : 'text-lg lg:text-sm lg:[writing-mode:vertical-rl]'
                }`}
              >
                {artist.name}
              </span>
              <span className="text-sm font-semibold" aria-hidden="true">
                {active ? '−' : '+'}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-500 ${
                active ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2 p-5 pt-3">
                {artist.links.map((link) => {
                  const external = /^https?:\/\//.test(link.url)
                  const className =
                    'text-xs font-bold uppercase tracking-[0.12em] text-black/60 underline decoration-black/25 underline-offset-4 transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black'

                  return external ? (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      key={link.url}
                      href={link.url}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function WonderlandEventPage({ event, community }) {
  const pageRef = useRef(null)
  const storySectionRef = useRef(null)
  const storyMediaRef = useRef(null)
  const storyImageRef = useRef(null)

  const eventStructuredData =
    buildWonderlandEventStructuredData(event)
  const breadcrumbStructuredData =
    buildWonderlandEventBreadcrumbs(event)

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      if (reducedMotion) return

      const media = gsap.matchMedia()
      media.add('(min-width: 1024px)', () => {
        const section = storySectionRef.current
        const pinnedMedia = storyMediaRef.current
        const image = storyImageRef.current
        if (!section || !pinnedMedia || !image) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top top+=96',
          end: 'bottom bottom-=96',
          pin: pinnedMedia,
          pinSpacing: false,
        })

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
          .fromTo(
            image,
            { scale: 0.8, opacity: 0.82, filter: 'brightness(0.82)' },
            {
              scale: 1,
              opacity: 1,
              filter: 'brightness(1)',
              duration: 0.45,
              ease: 'none',
            }
          )
          .to(image, {
            opacity: 0.2,
            filter: 'brightness(0.36)',
            duration: 0.55,
            ease: 'none',
          })
      })

      return () => media.revert()
    },
    { scope: pageRef }
  )

  return (
    <div
      ref={pageRef}
      className={`${GeistSans.className} club-up-page w-full max-w-full overflow-x-hidden`}
    >
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

      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#07090d] px-6 pb-20 pt-32 md:px-10 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(46,143,220,0.24),transparent_35%),radial-gradient(circle_at_84%_20%,rgba(46,143,220,0.14),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)] lg:gap-20">
          <Reveal variant="text">
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-[var(--club-up-blue)]">
              Boyos Wonderland · Amsterdam
            </p>
            <h1 className="max-w-6xl text-[7.8vw] font-black uppercase leading-[0.82] tracking-[-0.075em] md:text-[clamp(3.4rem,4.45vw,4.2rem)]">
              <span className="block whitespace-nowrap">Boyos Wonderland</span>
              <span className="mt-2 block whitespace-nowrap text-[var(--club-up-blue)]">
                at Club UP
              </span>
            </h1>
            <p className="mt-10 max-w-2xl text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.55] text-white/68">
              {event.intro[0]}
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-white/45">
              {event.intro[1]}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink
                href={event.tickets.url}
                tone="paper"
                className="club-up-ticket-button"
              >
                Get tickets
              </ButtonLink>
              <ButtonLink href={community.url} tone="outline">
                Join the community
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay="short" variant="media">
            <div className="surface-card group relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden border border-white/10 bg-[var(--club-up-blue)] shadow-[0_35px_100px_rgba(0,0,0,0.48)] lg:rotate-[1.25deg]">
              <Image
                src={event.poster}
                alt={`${event.title} poster with line-up, date, time and venue`}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Ticker items={event.tickerItems} tone="teal" />

      <section className="bg-[var(--club-up-paper)] px-6 py-32 text-[var(--club-up-ink)] md:px-10 md:py-48">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <h2 className="max-w-6xl text-[clamp(3rem,7.3vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
              The first
              <span
                aria-hidden="true"
                className="mx-[0.18em] inline-block h-[0.58em] w-[1.5em] rounded-full bg-cover bg-center align-[0.03em]"
                style={{ backgroundImage: `url(${event.heroImage})` }}
              />
              Wonderland in Amsterdam
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-flow-dense overflow-hidden border border-black/15 lg:grid-cols-12 lg:grid-rows-2">
            <Reveal
              className="border-b border-black/15 p-8 md:p-12 lg:col-span-7 lg:row-span-2 lg:border-b-0 lg:border-r"
              variant="text"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                From Haarlem to Club UP
              </p>
              <div className="mt-12 space-y-7 text-[clamp(1.25rem,2.3vw,2rem)] font-medium leading-[1.45] tracking-[-0.025em]">
                {event.body.slice(0, 2).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-16 aspect-[16/9] overflow-hidden">
                <Image
                  src={event.heroImage}
                  alt="Boyos Wonderland artwork for Club UP"
                  width={1920}
                  height={1080}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal
              className="border-b border-black/15 p-7 md:p-9 lg:col-span-5"
              delay="short"
              variant="card"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                Line-up A–Z
              </p>
              <LineupAccordion artists={event.lineup} />
            </Reveal>

            <Reveal
              className="p-7 md:p-9 lg:col-span-5"
              delay="medium"
              variant="card"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                Practical information
              </p>
              <dl className="mt-8 divide-y divide-black/12 border-y border-black/12">
                {[
                  ['Date', event.dateLabel],
                  ['Doors', event.practical.doors],
                  ['End', event.practical.end],
                  ['Age', event.practical.minimumAge],
                  ['Re-entry', event.practical.reentry],
                  ['Lockers', event.practical.lockers],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[92px_1fr] gap-4 py-3 text-sm leading-6"
                  >
                    <dt className="font-bold uppercase tracking-[0.08em] text-black/40">
                      {label}
                    </dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        ref={storySectionRef}
        className="bg-[#07090d] px-6 py-20 md:px-10 md:py-32 lg:py-48"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-24">
          <div ref={storyMediaRef} className="h-fit">
            <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-[var(--club-up-blue)]">
              <Image
                ref={storyImageRef}
                src={event.heroImage}
                alt="Boyos Wonderland and Club UP campaign artwork"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover will-change-transform"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--club-up-blue)]">
              One room, one dancefloor
            </p>
            <h2 className="mt-7 max-w-3xl text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
              House is a thread, not a limitation.
            </h2>
            <div className="mt-12 md:mt-16 lg:mt-20">
              {event.body.slice(2).map((paragraph) => (
                <article
                  key={paragraph}
                  className="flex items-center border-t border-white/10 py-8 first:border-t-0 md:py-10 lg:min-h-[58vh] lg:py-14"
                >
                  <p className="max-w-2xl text-[clamp(1.35rem,2.7vw,2.4rem)] font-medium leading-[1.42] tracking-[-0.03em] text-white/72">
                    {paragraph}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="tickets"
        className="bg-[var(--club-up-blue)] px-6 py-32 text-[var(--club-up-ink)] md:px-10 md:py-48"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal variant="text">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/55">
              {event.tickets.statusLabel}
            </p>
            <h2 className="mt-6 max-w-5xl text-[12vw] font-black uppercase leading-[0.82] tracking-[-0.08em] md:text-[clamp(4rem,8vw,8rem)]">
              Meet us on the dancefloor.
            </h2>
          </Reveal>

          <Reveal delay="short" variant="card">
            <div className="mt-20 grid border border-black/25 md:grid-cols-3">
              {event.tickets.tiers.map((tier) => (
                <article
                  key={tier.name}
                  className="border-b border-black/25 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-9"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/52">
                    {tier.name}
                  </p>
                  <p className="mt-8 text-[clamp(3.2rem,6vw,5.4rem)] font-black leading-none tracking-[-0.07em]">
                    {formatEuro(tier.total)}
                  </p>
                  <p className="mt-4 min-h-6 text-sm font-semibold text-black/55">
                    {tier.serviceFee
                      ? `${formatEuro(tier.price)} + ${formatEuro(
                          tier.serviceFee
                        )} service fee`
                      : 'At the door'}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-4">
            <ButtonLink href={event.tickets.url} tone="ink">
              Get tickets
            </ButtonLink>
            <ButtonLink href={community.url} tone="outline">
              Join the Wonderland community
            </ButtonLink>
          </div>

          <div className="mt-20 grid gap-8 border-t border-black/20 pt-8 text-sm font-semibold md:grid-cols-2">
            <address className="not-italic leading-7">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-black/50">
                Club UP
              </span>
              {event.address.streetAddress}, {event.address.postalCode}{' '}
              {event.address.addressLocality}
            </address>
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              <a
                href={event.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Instagram ↗
              </a>
              {event.residentAdvisorUrl ? (
                <a
                  href={event.residentAdvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  Resident Advisor ↗
                </a>
              ) : null}
              <a
                href={event.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-black/30 underline-offset-4 transition hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Club UP ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
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
