import { describe, expect, it } from 'vitest'
import { homePage } from '../data/home'
import {
  getPastGigVenues,
  getVisiblePastGigs,
  pastGigs,
} from '../data/pastGigs'

describe('Past gigs data', () => {
  it('keeps the newest imported gigs at the front of the archive', () => {
    expect(pastGigs.slice(0, 7)).toEqual([
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        monthYear: 'Jul 2026',
      }),
      expect.objectContaining({
        title: 'Boyos Wonderland & INI Movement Present: SUMMER JAM',
        monthYear: 'Jul 2026',
      }),
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title: 'Lepeltje Lepeltje Amsterdam',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title:
          'Studio Houtbaar Boyos Soundsystem invites Carlo Alberto & we.amps',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title: 'EP Release DGKM - DIGI-TAAL',
        monthYear: 'May 2026',
      }),
    ])
  })

  it('deduplicates played-at venues in first-seen order for homepage content', () => {
    expect(getPastGigVenues().slice(0, 6)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
    ])

    expect(homePage.playedAt).toEqual(getPastGigVenues())
    expect(homePage.playedAt.filter((venue) => venue === 'Houtbaar, Haarlem'))
      .toHaveLength(1)
    expect(
      homePage.playedAt.filter(
        (venue) => venue === 'Woodstock 69, Bloemendaal aan Zee'
      )
    ).toHaveLength(1)
  })

  it('shows a stable default archive slice before expanding the full list', () => {
    const visibleGigs = getVisiblePastGigs(pastGigs)

    expect(visibleGigs).toHaveLength(18)
    expect(visibleGigs.at(-1)).toEqual(
      expect.objectContaining({
        title: 'De Kelder Invites: Tonno Disko, Estrella, Boyos Soundsystem',
        monthYear: 'Dec 2025',
      })
    )
    expect(visibleGigs).not.toContainEqual(
      expect.objectContaining({
        title: 'Boyos Soundsystem Presents: Essential Groove',
      })
    )
    expect(getVisiblePastGigs(pastGigs, true)).toEqual(pastGigs)
  })
})
