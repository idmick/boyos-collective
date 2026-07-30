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

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': event.canonical,
    url: event.canonical,
    name: event.title,
    startDate: event.date,
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
    description: event.description,
    ...(images.length > 0 ? { image: images } : {}),
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
