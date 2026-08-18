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
  })

  it('fails fast when the configured current event slug cannot be resolved', () => {
    expect(() =>
      getCurrentWonderlandEvent({
        currentEventSlug: 'missing-event',
      })
    ).toThrowError('Unknown current Wonderland event: missing-event')
  })

  it('publishes the confirmed Club UP event details', () => {
    expect(clubUpContent.startDateTime).toBe(
      '2026-09-18T23:00:00+02:00'
    )
    expect(clubUpContent.endDateTime).toBe(
      '2026-09-19T04:00:00+02:00'
    )
    expect(clubUpContent.lineup.map((artist) => artist.name)).toEqual([
      'Boyos Soundsystem',
      'Damian Zico B2B Vince Fajardo',
      'Ferkoel',
    ])
    expect(
      clubUpContent.lineup
        .flatMap((artist) => artist.links)
        .filter((link) => link.url.includes('soundcloud.com'))
        .map((link) => link.url)
    ).toEqual([
      'https://soundcloud.com/boyos_soundsystem',
      'https://soundcloud.com/damianzico',
      'https://soundcloud.com/inceajardo',
      'https://soundcloud.com/ferkoel',
    ])
    expect(JSON.stringify(clubUpContent)).not.toContain('Vince FJR')
    expect(clubUpContent.tickets.url).toBe(
      'https://kring.stager.co/shop/default/events/111668271'
    )
    expect(clubUpContent.tickets.tiers.map((tier) => tier.total)).toEqual([
      9.75,
      13.75,
      15,
    ])
    expect(clubUpContent.residentAdvisorUrl).toBeNull()
  })

  it('derives public event labels and rejects invalid dates', () => {
    const event = resolveWonderlandEvent('fixture-event', {
      ...(clubUpContent as WonderlandEventContent),
      date: '2027-03-07',
      venueName: 'Fixture Club',
      address: {
        ...clubUpContent.address,
        addressLocality: 'Rotterdam',
      },
      lineup: [
        { name: 'Artist One', links: [] },
        { name: 'Artist Two', links: [] },
      ],
    })

    expect(event).toEqual(
      expect.objectContaining({
        href: '/wonderland/fixture-event',
        canonical:
          'https://www.boyoscollective.nl/wonderland/fixture-event',
        dateLabel: 'Sunday 7 March 2027',
        dateShort: '07.03',
        dateDay: '7',
        locationLabel: 'Fixture Club, Rotterdam',
      })
    )
    expect(event.tickerItems).toEqual([
      'Boyos Wonderland',
      'Sunday 7 March 2027',
      'Fixture Club Rotterdam',
      'Artist One',
      'Artist Two',
    ])

    expect(() =>
      resolveWonderlandEvent('invalid-date', {
        ...(clubUpContent as WonderlandEventContent),
        date: 'not-a-date',
      })
    ).toThrowError('Invalid Wonderland event date: not-a-date')
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
        startDate: '2026-09-18T23:00:00+02:00',
        endDate: '2026-09-19T04:00:00+02:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode:
          'https://schema.org/OfflineEventAttendanceMode',
        description: clubUpContent.description,
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
        performer: [
          expect.objectContaining({
            name: 'Boyos Soundsystem',
            sameAs: expect.arrayContaining([
              'https://www.boyoscollective.nl/soundsystem',
              'https://www.instagram.com/boyos.soundsystem/',
              'https://soundcloud.com/boyos_soundsystem',
            ]),
          }),
          expect.objectContaining({
            name: 'Damian Zico B2B Vince Fajardo',
          }),
          expect.objectContaining({ name: 'Ferkoel' }),
        ],
        offers: {
          '@type': 'Offer',
          url: clubUpContent.tickets.url,
          price: 9.75,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      })
    )
    expect(structuredData.startDate).toContain('T23:00:00+02:00')
    expect(event?.tickerItems).toContain(
      'Damian Zico B2B Vince Fajardo'
    )
  })

  it('omits image markup when an event has no gallery images configured', () => {
    const eventWithoutImages = resolveWonderlandEvent('no-images', {
      ...(clubUpContent as WonderlandEventContent),
      images: undefined,
    })

    expect(
      buildWonderlandEventStructuredData(eventWithoutImages)
    ).not.toHaveProperty('image')
  })

  it('uses the cheapest online ticket regardless of tier order', () => {
    const event = resolveWonderlandEvent('reordered-tickets', {
      ...(clubUpContent as WonderlandEventContent),
      tickets: {
        ...(clubUpContent.tickets as WonderlandEventContent['tickets']),
        tiers: [
          { name: 'Regular', price: 12, serviceFee: 1.75, total: 13.75 },
          { name: 'Door', price: 15, total: 15 },
          { name: 'Early Bird', price: 8, serviceFee: 1.75, total: 9.75 },
        ],
      },
    })

    expect(buildWonderlandEventStructuredData(event).offers).toEqual(
      expect.objectContaining({ price: 9.75 })
    )
  })

  it('omits an online offer when only a door tier exists', () => {
    const event = resolveWonderlandEvent('door-only', {
      ...(clubUpContent as WonderlandEventContent),
      tickets: {
        ...(clubUpContent.tickets as WonderlandEventContent['tickets']),
        tiers: [{ name: 'Door', price: 15, total: 15 }],
      },
    })

    expect(buildWonderlandEventStructuredData(event)).not.toHaveProperty(
      'offers'
    )
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
  })

  it('ships every referenced event image at its intended size', async () => {
    const expectedImages = [
      [clubUpContent.seo.ogImage, 1200, 630],
      [clubUpContent.images.landscape16x9, 1920, 1080],
      [clubUpContent.images.landscape4x3, 1200, 900],
      [clubUpContent.images.square, 1200, 1200],
      [clubUpContent.poster, 1600, 2000],
      [clubUpContent.heroImage, 1920, 1080],
    ] as const

    for (const [imageUrl, width, height] of expectedImages) {
      const imagePathname = imageUrl.startsWith('http')
        ? new URL(imageUrl).pathname
        : imageUrl
      const imagePath = path.join(
        process.cwd(),
        'public',
        imagePathname.replace(/^\//, '')
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
})
