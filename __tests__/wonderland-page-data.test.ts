import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import wonderlandContent from '../data/wonderland.json'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'

const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

const homePageSource = readSource('pages/index.js')
const wonderlandPageSource = readSource('pages/wonderland.js')
const wonderlandEventPageSource = readSource('pages/wonderland/[slug].js')

describe('Wonderland page data', () => {
  it('resolves the current Wonderland slug for shared page data', () => {
    const event = getCurrentWonderlandEvent(wonderlandContent)

    expect(event).toEqual(
      expect.objectContaining({
        slug: wonderlandContent.currentEventSlug,
        href: `/wonderland/${wonderlandContent.currentEventSlug}`,
        title: 'Boyos Wonderland at Club UP',
        dateLabel: 'Friday 18 September 2026',
        locationLabel: 'Club UP, Amsterdam',
      })
    )
  })

  it('keeps homepage and Wonderland static props wired to the shared current-event helper', () => {
    expect(homePageSource).toContain(
      'nextEvent: getCurrentWonderlandEvent(wonderlandPageContent)'
    )
    expect(wonderlandPageSource).toContain(
      'currentEvent: getCurrentWonderlandEvent(wonderlandPageContent)'
    )
  })

  it('keeps the Wonderland event page on file-backed static paths with no fallback', () => {
    expect(wonderlandEventPageSource).toContain(
      'paths: getAllWonderlandEvents().map((event) => ({'
    )
    expect(wonderlandEventPageSource).toContain(
      'params: { slug: event.slug }'
    )
    expect(wonderlandEventPageSource).toContain('fallback: false')
  })

  it('keeps unknown Wonderland event slugs on the notFound path and shares the community CTA', () => {
    expect(wonderlandEventPageSource).toContain(
      'if (!event) return { notFound: true }'
    )
    expect(wonderlandEventPageSource).toContain(
      'community: wonderlandPageContent.community'
    )
  })
})
