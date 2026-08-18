import { describe, expect, it } from 'vitest'
import wonderlandContent from '../data/wonderland.json'
import { getCurrentWonderlandEvent } from '../lib/wonderlandEvents'

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

})
