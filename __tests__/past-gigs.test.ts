import { describe, expect, it } from 'vitest'
import { homePage } from '../data/home'
import {
  getPastGigVenues,
  getVisiblePastGigs,
  pastGigs,
} from '../data/pastGigs'

describe('past gigs data', () => {
  it('derives unique venues in the same order as the latest gigs', () => {
    expect(getPastGigVenues().slice(0, 5)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
    ])

    expect(
      getPastGigVenues().filter(
        (venue) => venue === 'Woodstock 69, Bloemendaal aan Zee'
      )
    ).toHaveLength(1)
  })

  it('feeds the homepage ticker from the deduplicated venue list', () => {
    expect(homePage.playedAt).toEqual(getPastGigVenues())
    expect(homePage.playedAt).toEqual(
      expect.arrayContaining([
        'Woodstock 69, Bloemendaal aan Zee',
        'Houtbaar, Haarlem',
      ])
    )
  })

  it('keeps the soundsystem page teaser capped unless all gigs are requested', () => {
    expect(getVisiblePastGigs(pastGigs)).toHaveLength(18)
    expect(getVisiblePastGigs(pastGigs)[0]).toEqual(
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        monthYear: 'Jul 2026',
      })
    )

    expect(getVisiblePastGigs(pastGigs, true)).toEqual(pastGigs)
  })
})
