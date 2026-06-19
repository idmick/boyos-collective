import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { summerJamEvent, summerJamPage } from '../data/wonderland'

const summerJamPageSource = readFileSync(
  path.resolve(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('summer jam page regression coverage', () => {
  it('keeps the structured-data offer timing and performer filtering in sync with the page source', () => {
    expect(summerJamPageSource).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
    expect(summerJamPageSource).toContain(
      ".filter((act) => act.name !== 'Open Jam')"
    )
    expect(summerJamPageSource).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
  })

  it('keeps the updated Summer Jam social preview image metadata on the page', () => {
    expect(summerJamPageSource).toContain('width: 1200')
    expect(summerJamPageSource).toContain('height: 630')
    expect(summerJamPageSource).toContain("type: 'image/jpeg'")
    expect(summerJamPageSource).toContain("name: 'twitter:image:alt'")
    expect(summerJamPageSource).toContain('sizes="100vw"')
    expect(summerJamPageSource).toContain('sizes="(min-width: 768px) 50vw, 100vw"')
  })

  it('exports the CMS-backed Summer Jam event and page data expected by the route', () => {
    expect(summerJamPage.event).toBe(summerJamEvent)
    expect(summerJamPage.event.shortTitle).toBe('Summer Jam')
    expect(summerJamPage.event.ticketUrl).toContain('weeztix.com')
    expect(summerJamPage.seo.ogImage).toBe(
      'https://www.boyoscollective.nl/images/og/summer-jam.jpg'
    )
    expect(summerJamPage.lineup.map((act) => act.name)).toEqual(
      expect.arrayContaining([
        'Open Jam',
        'SYNGA',
        'Estafête',
        'UMOJA',
        'Shamis',
        'Boyos Soundsystem',
      ])
    )
  })
})
