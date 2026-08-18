import type { WonderlandEvent } from '../data/contentTypes'

const SITE_URL = 'https://www.boyoscollective.nl'

export const buildWonderlandEventStructuredData = (
  event: WonderlandEvent
) => {
  const images = event.images
    ? [
        event.images.landscape16x9,
        event.images.landscape4x3,
        event.images.square,
      ].filter((image): image is string => Boolean(image))
    : []
  const lowestOnlineTier = event.tickets.tiers
    .filter((tier) => tier.name !== 'Door')
    .reduce<(typeof event.tickets.tiers)[number] | undefined>(
      (lowest, tier) =>
        !lowest || tier.total < lowest.total ? tier : lowest,
      undefined
    )

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': event.canonical,
    url: event.canonical,
    name: event.title,
    startDate: event.startDateTime,
    endDate: event.endDateTime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venueName,
      url: event.venueUrl,
      address: {
        '@type': 'PostalAddress',
        ...event.address,
      },
    },
    organizer: {
      '@type': 'Organization',
      '@id': SITE_URL,
      name: 'Boyos Collective',
      url: SITE_URL,
    },
    performer: event.lineup.map((artist) => ({
      '@type': 'PerformingGroup',
      name: artist.name,
      sameAs: artist.links.map((link) => link.url),
    })),
    description: event.description,
    ...(images.length > 0 ? { image: images } : {}),
    ...(lowestOnlineTier
      ? {
          offers: {
            '@type': 'Offer',
            url: event.tickets.url,
            price: lowestOnlineTier.total,
            priceCurrency: event.tickets.currency,
            availability: `https://schema.org/${event.tickets.availability}`,
          },
        }
      : {}),
  }
}

export const buildWonderlandEventBreadcrumbs = (
  event: WonderlandEvent
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Boyos Collective',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Boyos Wonderland',
      item: `${SITE_URL}/wonderland`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: event.title,
      item: event.canonical,
    },
  ],
})
