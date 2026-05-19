import Head from 'next/head'
import Image from 'next/image'
import { generateNextSeo } from 'next-seo/pages'
import ButtonLink from '../../components/ui/ButtonLink'
import Reveal from '../../components/ui/Reveal'
import SectionTitle from '../../components/ui/SectionTitle'
import SiteFooter from '../../components/ui/SiteFooter'
import Ticker from '../../components/ui/Ticker'
import { summerJamPage } from '../../data/wonderland'

export default function SummerJamPage() {
  const {
    event,
    seo,
    hero,
    sections,
    ticker,
    finalCta,
    lineupIntro,
    partnerCtaLabel,
    practicalInfo,
    concept,
    dayArc,
    partners,
    lineup,
    partnerLogos,
  } = summerJamPage

  return (
    <>
      <Head>
        {generateNextSeo({
          title: seo.title,
          description: seo.description,
          canonical: seo.canonical,
          additionalMetaTags: [
            {
              name: 'twitter:title',
              content: seo.ogTitle,
            },
            {
              name: 'twitter:description',
              content: seo.description,
            },
            {
              name: 'twitter:image',
              content: seo.ogImage,
            },
            {
              name: 'twitter:image:alt',
              content: seo.ogImageAlt,
            },
          ],
          openGraph: {
            url: seo.canonical,
            title: seo.ogTitle,
            description: event.description,
            images: [
              {
                url: seo.ogImage,
                width: 1200,
                height: 630,
                type: 'image/jpeg',
                alt: seo.ogImageAlt,
              },
            ],
            siteName: seo.siteName,
          },
          twitter: {
            cardType: 'summary_large_image',
          },
        })}
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicEvent',
            name: event.title,
            startDate: '2026-07-25T13:00:00+02:00',
            endDate: '2026-07-26T03:00:00+02:00',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            image: [seo.ogImage],
            location: {
              '@type': 'Place',
              name: event.venueName,
              sameAs: event.venueUrl,
              address: {
                '@type': 'PostalAddress',
                ...event.address,
              },
            },
            organizer: [
              {
                '@type': 'Organization',
                name: 'Boyos Collective',
                url: 'https://www.boyoscollective.nl',
                sameAs: [
                  'https://www.instagram.com/boyos.wonderland/',
                  'https://www.instagram.com/boyos.soundsystem/',
                  'https://soundcloud.com/boyos_soundsystem',
                  'https://ra.co/dj/boyossoundsystem',
                ],
              },
              {
                '@type': 'Organization',
                name: 'INI Movement',
                url: event.iniUrl,
                sameAs: event.iniInstagramUrl,
              },
            ],
            description: event.description,
            offers: {
              '@type': 'Offer',
              url: event.ticketUrl,
              price: '20',
              priceCurrency: 'EUR',
              validFrom: '2026-05-03T00:00:00+02:00',
              availability: 'https://schema.org/InStock',
            },
            performer: lineup
              .filter((act) => act.name !== 'Open Jam')
              .map((act) => ({
                '@type': ['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes(
                  act.name
                )
                  ? 'MusicGroup'
                  : 'Person',
                name: act.name,
                description: act.role,
                sameAs: act.sourceUrl,
              })),
          }),
        }}
      />

      <section className="relative grid min-h-screen w-full max-w-full overflow-hidden bg-[rgb(var(--color-brand-deep))] pt-[72px] md:grid-cols-2">
        <div className="hero-safe-content hero-safe-content-summerjam relative z-10 flex w-screen max-w-[100vw] min-w-0 flex-col justify-center px-6 py-14 md:w-auto md:max-w-none md:px-14 md:py-20">
          <ButtonLink href="/wonderland" tone="paper" className="mb-12 w-fit">
            {hero.backLabel}
          </ButtonLink>
          <p className="type-meta mb-5 text-[var(--color-brand-amber)]">
            {hero.presentedBy}
          </p>
          <h1 className="type-display max-w-full text-[clamp(4.6rem,22vw,11rem)] leading-[0.86] md:text-[clamp(5rem,12vw,11rem)]">
            {hero.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="type-accent mb-12 mt-2 text-[clamp(1.25rem,2.4vw,2rem)] text-[var(--color-brand-amber)]">
            {hero.subtitle}
          </p>
          <dl className="mb-12 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-white/10 pb-10">
            {[
              [hero.stats.dateLabel, event.dateLabel],
              [hero.stats.timeLabel, event.timeLabel],
              [hero.stats.venueLabel, event.locationLabel],
              [hero.stats.formatLabel, event.format],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="type-meta mb-1 text-white/35">{label}</dt>
                <dd className="type-body text-sm font-semibold leading-6">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-5">
            <ButtonLink href={event.ticketUrl} tone="amber">
              {event.ticketLabel}
            </ButtonLink>
            <ButtonLink href={event.instagramUrl} tone="paper">
              {hero.secondaryCtaLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="order-first w-screen max-w-[100vw] min-w-0 bg-[var(--color-brand-event)] md:relative md:order-none md:w-auto md:max-w-none">
          <Image
            src={event.poster}
            alt={`${event.shortTitle} poster`}
            width={960}
            height={1200}
            priority
            sizes="100vw"
            className="block h-auto w-screen max-w-[100vw] md:hidden"
          />
          <Image
            src={event.poster}
            alt={`${event.shortTitle} poster`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="hidden object-cover object-top md:block"
          />
        </div>
      </section>

      <Ticker items={ticker} tone="paper" />

      <section
        id="concept"
        className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10"
      >
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <Reveal>
            <div className="md:sticky md:top-24">
              <SectionTitle
                eyebrow={sections.concept.eyebrow}
                title={sections.concept.title}
              />
            </div>
          </Reveal>
          <Reveal delay="short">
            <div className="type-body space-y-5 text-[15px] leading-8 text-[color:rgb(var(--color-surface-paper-rgb)/0.58)]">
              {concept.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-14">
              {dayArc.map((step, index) => (
                <article
                  key={step.name}
                  className={`grid grid-cols-[72px_1fr] gap-6 border-b border-white/10 py-7 ${
                    index === 0 ? 'border-t' : ''
                  }`}
                >
                  <div className="type-display text-3xl leading-none text-[var(--color-brand-amber)]">
                    {step.time}
                  </div>
                  <div>
                    <h3 className="type-body font-semibold">{step.name}</h3>
                    <p className="type-body mt-1 text-sm leading-7 text-white/45">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="lineup"
        className="bg-[rgb(var(--color-brand-deep))] px-6 py-[var(--space-section)] md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle
              eyebrow={sections.lineup.eyebrow}
              title={sections.lineup.title}
            />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <p className="type-body text-[15px] leading-8 text-[color:rgb(var(--color-surface-paper-rgb)/0.58)]">
              {lineupIntro}
            </p>
          </div>
          <div className="mt-14 grid grid-flow-dense gap-5 md:grid-cols-12">
            {lineup.map((act, index) => (
              <Reveal
                key={act.name}
                delay={index > 0 ? 'short' : 'none'}
                className={act.image ? 'md:col-span-6' : 'md:col-span-12'}
              >
                <article className="group h-full overflow-hidden border border-white/10 bg-white/[0.025] transition hover:border-[color:rgb(240_200_80/0.22)]">
                  {act.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
                      <Image
                        src={act.image}
                        alt={act.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                        style={
                          act.imagePosition
                            ? { objectPosition: act.imagePosition }
                            : undefined
                        }
                      />
                    </div>
                  ) : null}
                  <div className="flex min-h-[240px] flex-col justify-between p-7 md:p-8">
                    <div>
                      <p className="type-meta mb-3 text-[var(--color-brand-amber)]">
                        {act.role}
                      </p>
                      <h3 className="type-display text-[clamp(2.4rem,5vw,4rem)] leading-none">
                        {act.name}
                      </h3>
                      <p className="type-body mt-5 text-sm leading-7 text-white/50">
                        {act.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(var(--color-brand-deep))] px-6 py-[var(--space-section)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle
              eyebrow={sections.partners.eyebrow}
              title={sections.partners.title}
            />
          </Reveal>
          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {partners.map((partner, index) => (
              <Reveal key={partner.name} delay={index > 0 ? 'short' : 'none'}>
                <article className="group h-full border border-white/10 p-9 transition hover:border-[color:rgb(240_200_80/0.18)] hover:bg-[color:rgb(240_200_80/0.04)]">
                  {partnerLogos[index] ? (
                    <a
                      href={partnerLogos[index].href}
                      target={
                        partnerLogos[index].href.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        partnerLogos[index].href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-brand-event)] p-4 transition group-hover:scale-[1.03]"
                    >
                      <Image
                        src={partnerLogos[index].image}
                        alt={partnerLogos[index].name}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                      />
                    </a>
                  ) : null}
                  <h3 className="type-display text-4xl leading-none">
                    {partner.name}
                  </h3>
                  <p className="type-body my-5 text-sm leading-7 text-white/45">
                    {partner.description}
                  </p>
                  <ButtonLink href={partner.href} tone="amber">
                    {partnerCtaLabel}
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand-event)] px-6 py-[var(--space-section)] text-[var(--color-text-primary)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle
              eyebrow={sections.practicalInfo.eyebrow}
              title={sections.practicalInfo.title}
              dark={false}
            />
          </Reveal>
          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {practicalInfo.map((item) => (
              <Reveal key={item.label} delay="short">
                <article className="h-full border border-black/15 bg-black/[0.03] p-8">
                  <p className="type-meta mb-3 text-black/45">{item.label}</p>
                  <h3 className="type-display text-[clamp(2rem,4vw,3.2rem)] leading-none">
                    {item.value}
                  </h3>
                  <p className="type-body mt-4 text-sm leading-7 text-black/60">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(var(--color-brand-deep))] px-6 py-[var(--space-section)] md:px-10">
        <Reveal className="mx-auto grid max-w-6xl gap-10 border-y border-white/10 py-16 md:grid-cols-[1.35fr_0.65fr] md:items-end md:py-20">
          <div>
            <span className="type-meta mb-6 block text-[var(--color-brand-amber)]">
              {finalCta.eyebrow}
            </span>
            <p className="type-accent max-w-5xl text-[clamp(2.7rem,7vw,6.8rem)] leading-[0.95]">
              {finalCta.title}
            </p>
          </div>
          <div>
            <p className="type-body text-[15px] leading-8 text-white/58">
              {finalCta.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={event.ticketUrl} tone="amber">
                {event.ticketLabel}
              </ButtonLink>
              <ButtonLink href={event.instagramUrl} tone="paper">
                {finalCta.secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  )
}
