import { describe, expect, it } from 'vitest'
import {
  getPastGigVenues,
  getVisiblePastGigs,
  pastGigs,
} from '../data/pastGigs'

describe('past gigs data', () => {
  it('keeps the newest 2026 additions at the top of the archive', () => {
    expect(pastGigs.slice(0, 7)).toEqual([
      {
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'Jul 2026',
      },
      {
        title: 'Boyos Wonderland & INI Movement Present: SUMMER JAM',
        venue: 'Houtbaar, Haarlem',
        monthYear: 'Jul 2026',
      },
      {
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'May 2026',
      },
      {
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'May 2026',
      },
      {
        title: 'Lepeltje Lepeltje Amsterdam',
        venue: 'NDSM Werf, Amsterdam',
        monthYear: 'May 2026',
      },
      {
        title: 'Studio Houtbaar Boyos Soundsystem invites Carlo Alberto & we.amps',
        venue: 'Houtbaar, Haarlem',
        monthYear: 'May 2026',
      },
      {
        title: 'EP Release DGKM - DIGI-TAAL',
        venue: 'Volta, Amsterdam',
        monthYear: 'May 2026',
      },
    ])
  })

  it('shows the latest gigs first in the default soundsystem slice', () => {
    const visibleGigs = getVisiblePastGigs(pastGigs)

    expect(visibleGigs).toHaveLength(18)
    expect(visibleGigs).toEqual(pastGigs.slice(0, 18))
    expect(visibleGigs[0]?.monthYear).toBe('Jul 2026')
    expect(visibleGigs[17]).toEqual(pastGigs[17])
    expect(visibleGigs).not.toContainEqual(pastGigs[18])
  })

  it('keeps venue chips unique while exposing newly added stops', () => {
    const venues = getPastGigVenues()

    expect(venues).toContain('Houtbaar, Haarlem')
    expect(venues).toContain('NDSM Werf, Amsterdam')
    expect(venues).toContain('Volta, Amsterdam')
    expect(
      venues.filter((venue) => venue === 'Woodstock 69, Bloemendaal aan Zee')
    ).toHaveLength(1)
  })
})
