import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { homePage } from '../data/home'
import {
  getPastGigVenues,
  getVisiblePastGigs,
  pastGigs,
} from '../data/pastGigs'

vi.mock('next/head', () => ({
  default: ({ children }: { children: unknown }) => children,
}))

vi.mock('next/image', () => ({
  default: () => null,
}))

vi.mock('next/link', () => ({
  default: ({ children }: { children: unknown }) => children,
}))

vi.mock('next-seo/pages', () => ({
  generateNextSeo: () => null,
}))

describe('Past gigs data flow', () => {
  it('keeps the newest confirmed gigs at the top of the source data', () => {
    expect(pastGigs.slice(0, 8)).toEqual([
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
        title:
          'Studio Houtbaar Boyos Soundsystem invites Carlo Alberto & we.amps',
        venue: 'Houtbaar, Haarlem',
        monthYear: 'May 2026',
      },
      {
        title: 'EP Release DGKM - DIGI-TAAL',
        venue: 'Volta, Amsterdam',
        monthYear: 'May 2026',
      },
      {
        title: 'King Vinyldici',
        venue: 'Docici, Haarlem',
        monthYear: 'Apr 2026',
      },
    ])
  })

  it('builds the homepage venue ticker as a latest-first unique list', () => {
    expect(getPastGigVenues().slice(0, 6)).toEqual([
      'Woodstock 69, Bloemendaal aan Zee',
      'Houtbaar, Haarlem',
      'NDSM Werf, Amsterdam',
      'Volta, Amsterdam',
      'Docici, Haarlem',
      'De Nada, Amsterdam',
    ])
    expect(homePage.playedAt).toEqual(getPastGigVenues())
  })

  it('keeps the Soundsystem page collapsed by default', () => {
    expect(getVisiblePastGigs(pastGigs)).toHaveLength(18)
    expect(getVisiblePastGigs(pastGigs, true)).toHaveLength(pastGigs.length)
    expect(getVisiblePastGigs(pastGigs)).not.toContainEqual(pastGigs[18])
    expect(getVisiblePastGigs(pastGigs, true)).toContainEqual(pastGigs[18])
  })

  it('keeps soundsystem static props wired to the updated JSON source', () => {
    const soundsystemSource = fs.readFileSync(
      path.join(process.cwd(), 'pages/soundsystem.js'),
      'utf8'
    )

    expect(soundsystemSource).toContain("path.join(process.cwd(), 'data', 'PastGigs.json')")
    expect(soundsystemSource).toContain('const { pastGigs = [] } = JSON.parse')
    expect(soundsystemSource).toContain('props: { pastGigs }')
    expect(pastGigs).toHaveLength(
      JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), 'data/PastGigs.json'),
          'utf8'
        )
      ).pastGigs.length
    )
  })
})
