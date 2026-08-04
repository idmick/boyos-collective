import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { wonderlandPageContent } from '../data/wonderland'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'

const homepageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/index.js'),
  'utf8'
)

describe('Home page current Wonderland event wiring', () => {
  it('derives homepage event content from the selected Wonderland event', () => {
    const nextEvent = getCurrentWonderlandEvent(wonderlandPageContent)

    expect(nextEvent.slug).toBe('club-up-september-2026')
    expect(nextEvent.date).toBe('2026-09-18')
    expect(nextEvent.shortTitleLines).toEqual(['Club', 'UP'])
    expect(nextEvent.locationLabel).toBe('Club UP, Amsterdam')
    expect(nextEvent.href).toBe('/wonderland/club-up-september-2026')
  })

  it('renders the homepage next-event section from dynamic event fields', () => {
    expect(homepageSource).toContain(
      'nextEvent: getCurrentWonderlandEvent(wonderlandPageContent)'
    )
    expect(homepageSource).toContain('nextEvent.shortTitleLines.map')
    expect(homepageSource).toContain(
      '[nextEvent.dateLabel, nextEvent.locationLabel].map'
    )
    expect(homepageSource).toContain('{nextEvent.detailsLabel}')
    expect(homepageSource).toContain('href={nextEvent.href}')
    expect(homepageSource).not.toContain('Club UP')
    expect(homepageSource).not.toContain('18 September 2026')
  })
})
