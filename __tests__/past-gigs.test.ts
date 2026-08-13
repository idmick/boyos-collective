import { describe, expect, it } from 'vitest'
import { homePage } from '../data/home'
import {
  getPastGigVenues,
  getVisiblePastGigs,
  pastGigs,
} from '../data/pastGigs'

describe('past gigs data', () => {
  it('keeps the newest added gigs at the top of the feed', () => {
    expect(pastGigs.slice(0, 6)).toEqual([
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'Jul 2026',
      }),
      expect.objectContaining({
        title: 'Boyos Wonderland & INI Movement Present: SUMMER JAM',
        venue: 'Houtbaar, Haarlem',
        monthYear: 'Jul 2026',
      }),
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title: 'Woodstock 69: All Day Set',
        venue: 'Woodstock 69, Bloemendaal aan Zee',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title: 'Lepeltje Lepeltje Amsterdam',
        venue: 'NDSM Werf, Amsterdam',
        monthYear: 'May 2026',
      }),
      expect.objectContaining({
        title:
          'Studio Houtbaar Boyos Soundsystem invites Carlo Alberto & we.amps',
        venue: 'Houtbaar, Haarlem',
        monthYear: 'May 2026',
      }),
    ])
  })

  it('builds a unique venue ticker in first-seen order for the homepage', () => {
    const venues = getPastGigVenues()

    expect(venues.slice(0, 8)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
      'Radio TNP, Amsterdam',
      'Radiator Radio, Haarlem',
    ])
    expect(venues).toEqual(homePage.playedAt)
    expect(new Set(venues).size).toBe(venues.length)
  })

  it('shows the first 18 gigs by default and returns all gigs when expanded', () => {
    expect(getVisiblePastGigs(pastGigs)).toHaveLength(18)
    expect(getVisiblePastGigs(pastGigs)[17]).toEqual(
      expect.objectContaining({
        title: 'De Kelder Invites: Tonno Disko, Estrella, Boyos Soundsystem',
        monthYear: 'Dec 2025',
      })
    )
    expect(getVisiblePastGigs(pastGigs, true)).toEqual(pastGigs)
  })
})
