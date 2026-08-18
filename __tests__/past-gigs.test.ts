import { describe, expect, it, vi } from 'vitest'
import pastGigsJson from '../data/PastGigs.json'
import type { PastGig } from '../data/contentTypes'
import { homePage } from '../data/home'
import {
  getPastGigVenues,
  getVisiblePastGigs,
} from '../data/pastGigs'
import { getStaticProps } from '../pages/soundsystem'

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

const makeGigs = (count: number): PastGig[] =>
  Array.from({ length: count }, (_, index) => ({
    title: `Gig ${index + 1}`,
    venue: `Venue ${index + 1}`,
    monthYear: 'Jan 2026',
  }))

describe('Past gigs data flow', () => {
  it('builds a trimmed, unique venue list in source order', () => {
    const gigs: PastGig[] = [
      {
        title: 'Newly added gig',
        venue: 'Newest Venue, Amsterdam',
        monthYear: 'Sep 2026',
      },
      {
        title: 'First return',
        venue: '  First Venue, Haarlem  ',
        monthYear: 'Aug 2026',
      },
      {
        title: 'Blank venue',
        venue: '   ',
        monthYear: 'Aug 2026',
      },
      {
        title: 'Duplicate return',
        venue: 'First Venue, Haarlem',
        monthYear: 'Jul 2026',
      },
      {
        title: 'Second return',
        venue: 'Second Venue, The Hague',
        monthYear: 'Jun 2026',
      },
    ]

    expect(getPastGigVenues(gigs)).toEqual([
      'Newest Venue, Amsterdam',
      'First Venue, Haarlem',
      'Second Venue, The Hague',
    ])
  })

  it('keeps the homepage ticker wired to the default venue result', () => {
    expect(homePage.playedAt).toEqual(getPastGigVenues())
  })

  it('returns the default, expanded and custom visible ranges', () => {
    const gigs = makeGigs(21)

    expect(getVisiblePastGigs(gigs)).toEqual(gigs.slice(0, 18))
    expect(getVisiblePastGigs(gigs, true)).toEqual(gigs)
    expect(getVisiblePastGigs(gigs, false, 3)).toEqual(gigs.slice(0, 3))
  })

  it('loads the stored gigs through the Soundsystem page contract', async () => {
    await expect(getStaticProps()).resolves.toEqual({
      props: { pastGigs: pastGigsJson.pastGigs },
    })
  })
})
