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
  const { event, concept, dayArc, partners } = summerJamPage

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Summer Jam | Boyos Wonderland x INI Movement',
          description:
            'Summer Jam by Boyos Wonderland and INI Movement: an open air mini festival at Houtbaar, Haarlem on Saturday 25 July 2026, with live jam energy, DJ sets and an indoor afterparty.',
          canonical: 'https://www.boyoscollective.nl/wonderland/summer-jam',
          openGraph: {
            url: 'https://www.boyoscollective.nl/wonderland/summer-jam',
            title: 'Summer Jam | Boyos Wonderland x INI Movement',
            description: event.description,
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/summer-jam-poster.png',
                alt: 'Summer Jam poster',
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
            '@type': 'MusicEvent',
            name: event.title,
            startDate: '2026-07-25T13:00:00+02:00',
            endDate: '2026-07-26T03:00:00+02:00',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            image: ['https://www.boyoscollective.nl/images/summer-jam-poster.png'],
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
              },
              {
                '@type': 'Organization',
                name: 'INI Movement',
                url: event.iniUrl,
              },
            ],
            description: event.description,
          }),
        }}
      />

      <section className="relative grid min-h-screen overflow-hidden bg-[rgb(var(--color-brand-deep))] pt-[72px] md:grid-cols-2">
        <div className="hero-safe-content hero-safe-content-summerjam relative z-10 flex flex-col justify-center px-6 py-14 md:px-14 md:py-20">
          <ButtonLink href="/wonderland" tone="paper" className="mb-12 w-fit">
            ← Boyos Wonderland
          </ButtonLink>
          <p className="type-meta mb-5 text-[var(--color-brand-amber)]">
            Boyos Wonderland & INI Movement present
          </p>
          <h1 className="type-display text-[clamp(5rem,12vw,11rem)] leading-[0.86]">
            Summer
            <br />
            Jam
          </h1>
          <p className="type-accent mb-12 mt-2 text-[clamp(1.25rem,2.4vw,2rem)] text-[var(--color-brand-amber)]">
            A mini festival
          </p>
          <dl className="mb-12 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-white/10 pb-10">
            {[
              ['Date', event.dateLabel],
              ['Time', event.timeLabel],
              ['Venue', event.locationLabel],
              ['Format', event.format],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="type-meta mb-1 text-white/35">
                  {label}
                </dt>
                <dd className="type-body text-sm font-semibold leading-6">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-5">
            <ButtonLink href={event.instagramUrl} tone="amber">
              Follow for updates
            </ButtonLink>
            <span className="type-body text-xs tracking-wide text-white/40">
              {event.ticketLabel}
            </span>
          </div>
        </div>
        <div className="relative order-first aspect-[3/4] md:order-none md:aspect-auto">
          <Image
            src={event.poster}
            alt={`${event.shortTitle} poster`}
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </section>

      <Ticker
        items={[
          'Summer Jam',
          '25 July 2026',
          'Live Jam',
          'DJ Sets',
          'Dancefloor',
          'After Till Late',
          'Houtbaar Haarlem',
        ]}
        tone="paper"
      />

      <section
        id="concept"
        className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10"
      >
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <Reveal>
            <div className="md:sticky md:top-24">
              <SectionTitle eyebrow="The concept" title="The Day" />
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

      <section className="bg-[rgb(var(--color-brand-deep))] px-6 py-[var(--space-section)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle eyebrow="Together with" title="The Partners" />
          </Reveal>
          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {partners.map((partner, index) => (
              <Reveal key={partner.name} delay={index > 0 ? 'short' : 'none'}>
                <article className="h-full border border-white/10 p-9 transition hover:border-[color:rgb(240_200_80/0.18)] hover:bg-[color:rgb(240_200_80/0.04)]">
                  <div className="type-display mb-[-8px] text-6xl leading-none text-[var(--color-brand-amber)] opacity-25">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="type-display text-4xl leading-none">
                    {partner.name}
                  </h3>
                  <p className="type-body my-5 text-sm leading-7 text-white/45">
                    {partner.description}
                  </p>
                  <ButtonLink href={partner.href} tone="amber">
                    Visit
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand-charcoal)] px-6 py-[var(--space-section)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle eyebrow="Program" title="Line-up" />
            <div className="mt-10 border-y border-white/10 py-12">
              <p className="type-accent text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-white/25">
                {event.lineUpLabel}
              </p>
              <p className="type-body mt-5 max-w-lg text-sm leading-7 text-white/45">
                Artists and timings will be shared when the full shape of the day
                is ready.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-brand-event)] px-6 py-[var(--space-section)] text-[var(--color-text-primary)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionTitle eyebrow="Practical info" title="Good To Know" dark={false} />
          </Reveal>
          <div className="mt-14 grid gap-0 md:grid-cols-3">
            {[
              ['Date', event.dateLabel, 'Summer in Haarlem, starting early afternoon.'],
              ['Time', event.timeLabel, 'The garden closes at 23:00, then the night moves inside.'],
              [
                'Location',
                event.locationLabel,
                `${event.address.streetAddress}, ${event.address.postalCode} ${event.address.addressLocality}`,
              ],
            ].map(([label, value, detail]) => (
              <Reveal key={label} delay="short">
                <article className="h-full border border-black/15 bg-black/[0.03] p-8">
                  <p className="type-meta mb-3 text-black/45">
                    {label}
                  </p>
                  <h3 className="type-display text-[clamp(2rem,4vw,3.2rem)] leading-none">
                    {value}
                  </h3>
                  <p className="type-body mt-4 text-sm leading-7 text-black/60">
                    {detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgb(var(--color-brand-deep))] px-6 py-24 text-center md:px-10">
        <Reveal className="mx-auto max-w-3xl">
          <span className="type-meta mb-5 block text-[var(--color-brand-amber)]">
            Tickets
          </span>
          <p className="type-accent text-[clamp(2rem,5vw,4rem)] leading-tight">
            Come for the live jam, stay for the room opening up.
          </p>
          <p className="type-body mx-auto mb-10 mt-6 max-w-xl text-[15px] leading-8 text-white/45">
            {event.ticketLabel}. Until then, updates will land through the
            Boyos Wonderland channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ButtonLink href={event.whatsappUrl} tone="amber">
              Join WhatsApp updates
            </ButtonLink>
            <ButtonLink href={event.directionsUrl} tone="paper">
              Directions
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  )
}
