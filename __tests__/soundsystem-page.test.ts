import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import pastGigsJson from '../data/PastGigs.json'
import { getVisiblePastGigs, pastGigs } from '../data/pastGigs'

const pageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/soundsystem.js'),
  'utf8'
)

describe('Soundsystem past gigs', () => {
  it('keeps the newest added gigs at the top of the source data', () => {
    expect(pastGigs).toHaveLength(149)
    expect(pastGigsJson.pastGigs.slice(0, 6)).toEqual([
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
    ])
  })

  it('returns only the first 18 gigs by default and all gigs when expanded', () => {
    const collapsed = getVisiblePastGigs(pastGigs)
    const expanded = getVisiblePastGigs(pastGigs, true)

    expect(collapsed).toHaveLength(18)
    expect(collapsed.at(-1)).toEqual({
      title: 'De Kelder Invites: Tonno Disko, Estrella, Boyos Soundsystem',
      venue: 'De Kelder, Haarlem',
      monthYear: 'Dec 2025',
    })
    expect(collapsed).not.toContainEqual({
      title:
        'Boyos Wonderland Dine and Dance: Chirstmas Special w/ Aïs de la Montagne & Boyos Soundsystem',
      venue: 'Houtbaar, Haarlem',
      monthYear: 'Dec 2025',
    })
    expect(expanded).toHaveLength(pastGigs.length)
    expect(expanded[18]).toEqual({
      title:
        'Boyos Wonderland Dine and Dance: Chirstmas Special w/ Aïs de la Montagne & Boyos Soundsystem',
      venue: 'Houtbaar, Haarlem',
      monthYear: 'Dec 2025',
    })
  })

  it('keeps the page wired to the shared 18-gig collapsed state and JSON source', () => {
    expect(pageSource).toContain("path.join(process.cwd(), 'data', 'PastGigs.json')")
    expect(pageSource).toContain('const INITIAL_GIGS_COUNT = 18')
    expect(pageSource).toContain('pastGigs.slice(0, INITIAL_GIGS_COUNT)')
    expect(pageSource).toContain("{showAllGigs ? 'Show Less' : 'Show All Gigs'}")
  })
})
