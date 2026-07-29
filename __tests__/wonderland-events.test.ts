import fs from 'node:fs'
import path from 'node:path'
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

  it('emits minimal MusicEvent structured data on the dynamic page', () => {
    expect(eventPageSource).toContain("'@type': 'MusicEvent'")
    expect(eventPageSource).toContain("'@id': event.canonical")
    expect(eventPageSource).toContain('startDate: event.date')
    expect(eventPageSource).toContain(
      "'https://schema.org/EventScheduled'"
    )
    expect(eventPageSource).toContain(
      "'https://schema.org/OfflineEventAttendanceMode'"
    )
    expect(eventPageSource).not.toContain('offers:')
    expect(eventPageSource).not.toContain('performer:')
    expect(eventPageSource).not.toContain('endDate:')
    expect(eventPageSource).not.toContain('image: event.')
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
})
