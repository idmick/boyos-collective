import { describe, expect, it } from 'vitest'
import { getPastGigVenues, getVisiblePastGigs, pastGigs } from '../data/pastGigs'

describe('past gigs data', () => {
  it('keeps the latest updated gigs at the top of the list', () => {
    expect(pastGigs.slice(0, 3)).toEqual([
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
    ])
  })

  it('returns unique venues in source order for homepage social proof', () => {
    expect(getPastGigVenues().slice(0, 8)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
      'Radio TNP, Amsterdam',
      'Radiator Radio, Haarlem',
    ])
  })

  it('keeps the soundsystem page preview capped until all gigs are requested', () => {
    const previewGigs = getVisiblePastGigs(pastGigs)

    expect(previewGigs).toHaveLength(18)
    expect(previewGigs).toEqual(pastGigs.slice(0, 18))
    expect(getVisiblePastGigs(pastGigs, true)).toEqual(pastGigs)
  })
})
