import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'
import clubUpContent from '../data/wonderland-events/club-up-september-2026.json'
import wonderlandContent from '../data/wonderland.json'
import type { WonderlandEventContent } from '../data/contentTypes'
import {
  getAllWonderlandEvents,
  getCurrentWonderlandEvent,
  getWonderlandEventBySlug,
  resolveWonderlandEvent,
} from '../lib/wonderlandEvents'
import {
  buildWonderlandEventBreadcrumbs,
  buildWonderlandEventStructuredData,
} from '../lib/wonderlandEventStructuredData'

const eventPageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/wonderland/[slug].js'),
  'utf8'
)
const homepageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/index.js'),
  'utf8'
)
const wonderlandPageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/wonderland.js'),
  'utf8'
)

describe('Wonderland events', () => {
  it('resolves the confirmed Club UP entry selected by Decap', () => {
    expect(wonderlandContent.currentEventSlug).toBe(
      'club-up-september-2026'
    )

    const event = getCurrentWonderlandEvent(wonderlandContent)

    expect(event).toEqual(
      expect.objectContaining({
        slug: 'club-up-september-2026',
        title: 'Boyos Wonderland at Club UP',
        href: '/wonderland/club-up-september-2026',
        canonical:
          'https://www.boyoscollective.nl/wonderland/club-up-september-2026',
        date: '2026-09-18',
        dateLabel: 'Friday 18 September 2026',
        dateShort: '18.09',
        dateDay: '18',
        venueName: 'Club UP',
        venueUrl: 'https://www.clubup.nl/',
        locationLabel: 'Club UP, Amsterdam',
      })
    )
    expect(event.address).toEqual({
      streetAddress: 'Korte Leidsedwarsstraat 26-1',
      postalCode: '1017 RC',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    })
  })

  it('keeps a permanent event stable when another event becomes current', () => {
    const clubUp = getWonderlandEventBySlug('club-up-september-2026')
    const futureEvent = resolveWonderlandEvent('future-edition', {
      ...(clubUpContent as WonderlandEventContent),
      title: 'A future Wonderland edition',
      shortTitle: 'Future edition',
      titleLines: ['A future', 'Wonderland edition'],
      shortTitleLines: ['Future', 'edition'],
      date: '2027-05-01',
      venueName: 'Future venue',
      address: {
        ...clubUpContent.address,
        addressLocality: 'The Hague',
      },
    })

    expect(futureEvent.href).toBe('/wonderland/future-edition')
    expect(clubUp).toEqual(
      expect.objectContaining({
        href: '/wonderland/club-up-september-2026',
        title: 'Boyos Wonderland at Club UP',
        date: '2026-09-18',
      })
    )
  })

  it('discovers event paths and rejects unknown slugs', () => {
    expect(getAllWonderlandEvents().map((event) => event.slug)).toContain(
      'club-up-september-2026'
    )
    expect(getWonderlandEventBySlug('does-not-exist')).toBeNull()
    expect(eventPageSource).toContain('getStaticPaths')
    expect(eventPageSource).toContain('fallback: false')
  })

  it('keeps the static event route constrained to known slugs', () => {
    expect(getAllWonderlandEvents().map((event) => event.slug)).toEqual(
      expect.arrayContaining(['club-up-september-2026'])
    )
    expect(eventPageSource).toContain(
      'if (!event) return { notFound: true }'
    )
  })

  it('publishes no unconfirmed event details', () => {
    const eventFields = Object.keys(clubUpContent)

    expect(eventFields).not.toContain('startTime')
    expect(eventFields).not.toContain('endDate')
    expect(eventFields).not.toContain('ticketLabel')
    expect(eventFields).not.toContain('ticketUrl')
    expect(eventFields).not.toContain('performer')
    expect(eventFields).not.toContain('lineup')
    expect(eventFields).not.toContain('image')
  })

  it('emits enriched confirmed MusicEvent structured data', () => {
    const event = getWonderlandEventBySlug(
      'club-up-september-2026'
    )

    expect(event).not.toBeNull()

    const structuredData = buildWonderlandEventStructuredData(event!)

    expect(structuredData).toEqual(
      expect.objectContaining({
        '@type': 'MusicEvent',
        '@id':
          'https://www.boyoscollective.nl/wonderland/club-up-september-2026',
        url: 'https://www.boyoscollective.nl/wonderland/club-up-september-2026',
        startDate: '2026-09-18',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode:
          'https://schema.org/OfflineEventAttendanceMode',
        description:
          'A new Boyos Wonderland edition bringing the Boyos Collective community together around music.',
        location: expect.objectContaining({
          name: 'Club UP',
          url: 'https://www.clubup.nl/',
        }),
        organizer: {
          '@type': 'Organization',
          '@id': 'https://www.boyoscollective.nl',
          name: 'Boyos Collective',
          url: 'https://www.boyoscollective.nl',
        },
        image: [
          'https://www.boyoscollective.nl/images/og/wonderland-club-up-september-2026-16x9.jpg',
          'https://www.boyoscollective.nl/images/og/wonderland-club-up-september-2026-4x3.jpg',
          'https://www.boyoscollective.nl/images/og/wonderland-club-up-september-2026-1x1.jpg',
        ],
      })
    )
    expect(structuredData).not.toHaveProperty('offers')
    expect(structuredData).not.toHaveProperty('performer')
    expect(structuredData).not.toHaveProperty('endDate')
    expect(structuredData.startDate).not.toContain('T')
  })

  it('omits optional schema images when an event has no gallery assets', () => {
    const event = resolveWonderlandEvent('gallery-free-edition', {
      ...(clubUpContent as WonderlandEventContent),
      images: undefined,
    })

    const structuredData = buildWonderlandEventStructuredData(event)

    expect(structuredData).not.toHaveProperty('image')
  })

  it('emits a canonical Wonderland breadcrumb trail', () => {
    const event = getWonderlandEventBySlug(
      'club-up-september-2026'
    )

    expect(buildWonderlandEventBreadcrumbs(event!)).toEqual(
      expect.objectContaining({
        '@type': 'BreadcrumbList',
        itemListElement: [
          expect.objectContaining({
            position: 1,
            item: 'https://www.boyoscollective.nl',
          }),
          expect.objectContaining({
            position: 2,
            item: 'https://www.boyoscollective.nl/wonderland',
          }),
          expect.objectContaining({
            position: 3,
            item: event?.canonical,
          }),
        ],
      })
    )
    expect(eventPageSource).toContain('wonderland-event-jsonld')
    expect(eventPageSource).toContain('wonderland-breadcrumb-jsonld')
  })

  it('ships every referenced event image at its intended size', async () => {
    const expectedImages = [
      [clubUpContent.seo.ogImage, 1200, 630],
      [clubUpContent.images.landscape16x9, 1920, 1080],
      [clubUpContent.images.landscape4x3, 1200, 900],
      [clubUpContent.images.square, 1200, 1200],
    ] as const

    for (const [imageUrl, width, height] of expectedImages) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        new URL(imageUrl).pathname.replace(/^\//, '')
      )
      expect(fs.existsSync(imagePath)).toBe(true)

      const metadata = await sharp(imagePath).metadata()

      expect(metadata.width).toBe(width)
      expect(metadata.height).toBe(height)
    }

    expect(clubUpContent.seo.ogImageAlt).toBe(
      'Boyos Wonderland at Club UP — 18 September 2026, Amsterdam'
    )
  })

  it('renders event-specific content without Club UP hardcoding', () => {
    expect(homepageSource).toContain('nextEvent.shortTitleLines')
    expect(homepageSource).not.toContain('Club UP')
    expect(wonderlandPageSource).toContain('event.titleLines')
    expect(wonderlandPageSource).toContain('event.dateDay')
    expect(wonderlandPageSource).toContain(
      'event.address.addressLocality'
    )
    expect(wonderlandPageSource).not.toContain('Club UP')
  })

  it('keeps the community CTA evergreen and Summer Jam discoverable', () => {
    expect(wonderlandContent.community.url).toMatch(
      /^https:\/\/chat\.whatsapp\.com\//
    )
    expect(wonderlandContent.community.emailSignup.title).toBe(
      'Keep Wonderland in your inbox.'
    )
    expect(wonderlandContent.pastEditions).toEqual([
      expect.objectContaining({
        title: 'Summer Jam',
        href: '/wonderland/summer-jam',
      }),
    ])
  })

  it('fails fast when the configured current Wonderland slug is unknown', () => {
    expect(() =>
      getCurrentWonderlandEvent({
        ...wonderlandContent,
        currentEventSlug: 'does-not-exist',
      })
    ).toThrow('Unknown current Wonderland event: does-not-exist')
  })

  it('rejects invalid event dates before they can be published', () => {
    expect(() =>
      resolveWonderlandEvent('invalid-date', {
        ...(clubUpContent as WonderlandEventContent),
        date: 'not-a-date',
      })
    ).toThrow('Invalid Wonderland event date: not-a-date')
  })
})
