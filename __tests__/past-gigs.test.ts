import { describe, expect, it } from 'vitest'
import { homePage } from '../data/home'
import { getPastGigVenues, getVisiblePastGigs, pastGigs } from '../data/pastGigs'

describe('past gigs data helpers', () => {
  it('keeps the latest gigs at the top of the default visible list', () => {
    expect(getVisiblePastGigs(pastGigs)).toHaveLength(18)
    expect(getVisiblePastGigs(pastGigs).slice(0, 4)).toEqual(pastGigs.slice(0, 4))
  })

  it('returns the full list when showAll is enabled', () => {
    expect(getVisiblePastGigs(pastGigs, true)).toEqual(pastGigs)
  })

  it('builds a de-duplicated venue list in source order for the homepage', () => {
    const venues = getPastGigVenues()

    expect(venues.slice(0, 6)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
    ])
    expect(venues).toContain('Paard Café, The Hague')
    expect(venues).toContain('Mosso, Milan, Italy')
    expect(venues).toHaveLength(new Set(venues).size)
    expect(homePage.playedAt).toEqual(venues)
  })
})
