import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import wonderlandContent from '../data/wonderland.json'

const clubUpPageSource = fs.readFileSync(
  path.join(
    process.cwd(),
    'pages/wonderland/club-up-september-2026.js'
  ),
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
  it('uses one confirmed Club UP event across the site', () => {
    expect(wonderlandContent.currentEvent).toEqual(
      expect.objectContaining({
        title: 'Boyos Wonderland at Club UP',
        href: '/wonderland/club-up-september-2026',
        date: '2026-09-18',
        dateLabel: 'Friday 18 September 2026',
        venueName: 'Club UP',
        locationLabel: 'Club UP, Amsterdam',
      })
    )
    expect(wonderlandContent.currentEvent.address).toEqual({
      streetAddress: 'Korte Leidsedwarsstraat 26-1',
      postalCode: '1017 RC',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    })
    expect(homepageSource).toContain('nextEvent.href')
    expect(wonderlandPageSource).toContain('page.currentEvent')
  })

  it('publishes no unconfirmed event details', () => {
    const eventFields = Object.keys(wonderlandContent.currentEvent)

    expect(eventFields).not.toContain('timeLabel')
    expect(eventFields).not.toContain('ticketLabel')
    expect(eventFields).not.toContain('ticketUrl')
    expect(eventFields).not.toContain('performer')
    expect(eventFields).not.toContain('lineup')
  })

  it('emits minimal MusicEvent structured data on a unique page', () => {
    expect(clubUpPageSource).toContain("'@type': 'MusicEvent'")
    expect(clubUpPageSource).toContain("'@id': event.canonical")
    expect(clubUpPageSource).toContain('startDate: event.date')
    expect(clubUpPageSource).toContain(
      "'https://schema.org/EventScheduled'"
    )
    expect(clubUpPageSource).toContain(
      "'https://schema.org/OfflineEventAttendanceMode'"
    )
    expect(clubUpPageSource).not.toContain('offers:')
    expect(clubUpPageSource).not.toContain('performer:')
    expect(clubUpPageSource).not.toContain('endDate:')
  })

  it('keeps the community CTA evergreen and Summer Jam discoverable', () => {
    expect(wonderlandContent.community.url).toMatch(
      /^https:\/\/chat\.whatsapp\.com\//
    )
    expect(wonderlandContent.pastEditions).toEqual([
      expect.objectContaining({
        title: 'Summer Jam',
        href: '/wonderland/summer-jam',
      }),
    ])
  })
})
