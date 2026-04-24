import { describe, expect, it } from 'vitest'
import pastGigsData from '../data/PastGigs.json'
import { homePage } from '../data/home'
import { getPastGigVenues, getVisiblePastGigs, pastGigs } from '../data/pastGigs'
import { soundsystemPage } from '../data/soundsystem'
import { summerJamEvent, wonderlandPage } from '../data/wonderland'

describe('redesign data', () => {
  it('preserves the full past gigs dataset', () => {
    expect(pastGigsData.pastGigs).toHaveLength(141)
    expect(pastGigsData.pastGigs[0]).toMatchObject({
      title: 'De Nada',
      venue: 'De Nada, Amsterdam',
      monthYear: 'Mar 2026',
    })
  })

  it('derives homepage played-at venues from past gigs', () => {
    const venues = getPastGigVenues()

    expect(homePage.playedAt).toEqual(venues)
    expect(venues).toContain('Woodstock 69, Bloemendaal aan Zee')
    expect(venues).toContain('Mosso, Milan, Italy')
  })

  it('keeps all existing Soundsystem embeds in iframe-ready form', () => {
    expect(soundsystemPage.sets.map((set) => set.url)).toEqual(
      expect.arrayContaining([
        'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/boyos_soundsystem/&color=%23EC90B0&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true',
        'https://www.youtube.com/embed/CBAqa9s1DPE',
        'https://www.youtube.com/embed/TY_hzG5HY3k',
        'https://www.youtube.com/embed/ANB1UNfqitE?start=3359',
      ])
    )
  })

  it('uses the updated booking title', () => {
    expect(soundsystemPage.booking.title).toBe('Book Boyos Soundsystem')
  })

  it('uses image-backed artist cards with stage names', () => {
    expect(soundsystemPage.artists).toEqual([
      expect.objectContaining({
        number: '01',
        name: 'Di Tomasso',
        role: 'DJ · Selector',
        image: '/images/di-tomasso.jpg',
      }),
      expect.objectContaining({
        number: '02',
        name: 'NMN (Near Mint Nico)',
        role: 'DJ · Selector',
        image: '/images/nmn-near-mint-nico.jpg',
      }),
      expect.objectContaining({
        number: '03',
        name: 'Mickey',
        role: 'DJ · Selector',
        image: '/images/mickey-card.jpg',
      }),
    ])
  })

  it('supports the past gigs expand/collapse behavior', () => {
    expect(getVisiblePastGigs(pastGigs, false, 18)).toHaveLength(18)
    expect(getVisiblePastGigs(pastGigs, true, 18)).toHaveLength(pastGigs.length)
  })

  it('links the homepage and Wonderland page to the child Summer Jam route', () => {
    expect(homePage.nextEvent.href).toBe('/wonderland/summer-jam')
    expect(summerJamEvent.href).toBe('/wonderland/summer-jam')
    expect(wonderlandPage.albums).toHaveLength(6)
  })
})
