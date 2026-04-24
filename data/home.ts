import { summerJamEvent } from './wonderland'
import { getPastGigVenues } from './pastGigs'

/**
 * Homepage content consumed by pages/index.js.
 */
export const homePage = {
  hero: {
    eyebrow: 'Amsterdam · Est. 2020',
    title: 'Boyos Collective',
    subtitle: 'We Got The Funk',
    image: '/images/BoyosWonderland-mini-fest-at.jpg',
  },
  playedAt: getPastGigVenues(),
  nextEvent: summerJamEvent,
  identities: [
    {
      eyebrow: 'The Music',
      title: 'Boyos Soundsystem',
      badge: '/images/boyos_we_got_the_funk.png',
      image: '/images/boyos-25-20.jpg',
      href: '/soundsystem',
      cta: 'Checkout the Groove',
      tone: 'pink',
      body:
        'Tomas, Nico & Mickey. Energetic sets blending Disco, House, and global grooves, from intimate club nights to major festivals.',
    },
    {
      eyebrow: 'The Experience',
      title: 'Boyos Wonderland',
      badge: '/images/essential_groove.png',
      image: '/images/wonderland_home.jpg',
      href: '/wonderland',
      cta: 'Enter Wonderland',
      tone: 'teal',
      body:
        'An ongoing event series: Dine & Dance nights, indoor parties, open-air festivals. Music, art, food, tattoos.',
    },
  ],
  merch: {
    eyebrow: 'Coming Soon',
    title: 'Boyos Merch',
    image: '/images/boyos_merch.jpeg',
    body:
      'Born from a band of brothers. Apparel designed by Mickey Anthony, made for people who carry the groove with them.',
  },
}
