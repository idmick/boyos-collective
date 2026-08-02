import { describe, expect, it } from 'vitest'
import { homePage } from '../data/home'
import { getVisiblePastGigs, pastGigs } from '../data/pastGigs'

describe('Past gigs content', () => {
  it('deduplicates homepage venue rollups while preserving latest-first order', () => {
    expect(homePage.playedAt.slice(0, 8)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
      'Radio TNP, Amsterdam',
      'Radiator Radio, Haarlem',
    ])

    expect(
      homePage.playedAt.filter(
        (venue) => venue === 'Woodstock 69, Bloemendaal aan Zee'
      )
    ).toHaveLength(1)
    expect(
      homePage.playedAt.filter((venue) => venue === 'Mosso, Milan, Italy')
    ).toHaveLength(1)
  })

  it('keeps the soundsystem archive collapsed to the first 18 gigs by default', () => {
    const visibleGigs = getVisiblePastGigs(pastGigs)
    const expandedGigs = getVisiblePastGigs(pastGigs, true)

    expect(visibleGigs).toHaveLength(18)
    expect(visibleGigs).toEqual(pastGigs.slice(0, 18))
    expect(expandedGigs).toEqual(pastGigs)
  })
})
