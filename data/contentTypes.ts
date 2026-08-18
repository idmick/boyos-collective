export type ImagePath = string
export type ExternalUrl = string
export type InternalHref = string

export type HeroContent = {
  eyebrow: string
  title: string
  subtitle?: string
  image: ImagePath
  badge?: ImagePath
}

export type HomeIdentity = {
  eyebrow: string
  title: string
  badge: ImagePath
  image: ImagePath
  href: InternalHref
  cta: string
  tone: 'pink' | 'teal'
  body: string
}

export type HomeContent = {
  hero: Required<Pick<HeroContent, 'eyebrow' | 'title' | 'subtitle' | 'image'>>
  nextEventSection: {
    eyebrow: string
    detailsCtaLabel: string
    allEventsCtaLabel: string
  }
  identities: HomeIdentity[]
  merch: {
    eyebrow: string
    title: string
    image: ImagePath
    body: string
  }
}

export type HomePage = HomeContent & {
  playedAt: string[]
}

export type Address = {
  streetAddress: string
  postalCode: string
  addressLocality: string
  addressCountry: string
}

export type WonderlandEventArtist = {
  name: string
  links: {
    label: string
    url: ExternalUrl
  }[]
}

export type WonderlandTicketTier = {
  name: string
  price: number
  serviceFee?: number
  total: number
}

export type WonderlandPracticalInfo = {
  minimumAge: string
  doors: string
  end: string
  reentry: string
  lockers: string
  lastEntry: string
}

export type WonderlandEventContent = {
  title: string
  shortTitle: string
  titleLines: string[]
  shortTitleLines: string[]
  date: string
  startDateTime: string
  endDateTime: string
  venueName: string
  venueUrl: ExternalUrl
  address: Address
  description: string
  detailsLabel: string
  intro: string[]
  body: string[]
  poster: ImagePath
  heroImage: ImagePath
  lineup: WonderlandEventArtist[]
  tickets: {
    url: ExternalUrl
    currency: 'EUR'
    availability: 'InStock' | 'SoldOut' | 'PreOrder'
    statusLabel: string
    tiers: WonderlandTicketTier[]
  }
  practical: WonderlandPracticalInfo
  instagramUrl: ExternalUrl
  residentAdvisorUrl?: ExternalUrl | null
  images?: {
    landscape16x9?: ExternalUrl
    landscape4x3?: ExternalUrl
    square?: ExternalUrl
  }
  seo: {
    title: string
    description: string
    ogTitle: string
    ogImage: ExternalUrl
    ogImageAlt: string
  }
}

export type WonderlandEvent = WonderlandEventContent & {
  slug: string
  href: InternalHref
  canonical: ExternalUrl
  dateLabel: string
  dateShort: string
  dateDay: string
  locationLabel: string
  tickerItems: string[]
}

export type WonderlandEventSummary = WonderlandEvent

export type WonderlandCommunity = {
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  url: ExternalUrl
  emailSignup: {
    eyebrow: string
    title: string
    body: string
  }
}

export type WonderlandPastEdition = {
  title: string
  dateLabel: string
  venueLabel: string
  href: InternalHref
  poster: ImagePath
}

export type SummerJamEvent = {
  title: string
  shortTitle: string
  href: InternalHref
  date: string
  dateLabel: string
  timeLabel: string
  venueName: string
  venueUrl: ExternalUrl
  locationLabel: string
  poster: ImagePath
  format: string
  partners: string[]
  lineUpLabel: string
  instagramUrl: ExternalUrl
  iniUrl: ExternalUrl
  iniInstagramUrl: ExternalUrl
  directionsUrl: ExternalUrl
  address: Address
  description: string
}

export type WonderlandPageContent = {
  hero: Required<Pick<HeroContent, 'eyebrow' | 'title' | 'subtitle' | 'image' | 'badge'>>
  currentEventSlug: string
  community: WonderlandCommunity
  story: {
    eyebrow: string
    title: string
    logo: ImagePath
    image: ImagePath
    body: string[]
  }
  pillars: {
    name: string
    description: string
  }[]
  pastEditions: WonderlandPastEdition[]
  albums: {
    title: string
    cover: ImagePath
    url: ExternalUrl
  }[]
  philosophy: {
    title: string
    body: string
  }
}

export type WonderlandPage = Omit<WonderlandPageContent, 'currentEventSlug'> & {
  currentEvent: WonderlandEvent
}

export type SummerJamPage = {
  event: SummerJamEvent
  seo: {
    title: string
    description: string
    canonical: ExternalUrl
    ogTitle: string
    ogImage: ExternalUrl
    ogImageAlt: string
    siteName: string
  }
  hero: {
    backLabel: string
    presentedBy: string
    titleLines: string[]
    subtitle: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
    stats: {
      dateLabel: string
      timeLabel: string
      venueLabel: string
      formatLabel: string
    }
  }
  sections: {
    concept: {
      eyebrow: string
      title: string
    }
    lineup: {
      eyebrow: string
      title: string
    }
    partners: {
      eyebrow: string
      title: string
    }
    practicalInfo: {
      eyebrow: string
      title: string
    }
  }
  ticker: string[]
  schedule: {
    eyebrow: string
    title: string
    garden: {
      title: string
      hours: string
      items: {
        time: string
        name: string
      }[]
    }
    afterparty: {
      title: string
      hours: string
      items: {
        time: string
        name: string
      }[]
    }
    openJamNote: string
  }
  press: {
    eyebrow: string
    title: string
    summary: string
    linkLabel: string
    url: ExternalUrl
  }
  finalCta: {
    eyebrow: string
    title: string
    body: string
    primaryLabel: string
    secondaryLabel: string
  }
  lineupIntro: string
  partnerCtaLabel: string
  practicalInfo: {
    label: string
    value: string
    detail: string
  }[]
  concept: string[]
  dayArc: {
    time: string
    name: string
    description: string
  }[]
  partners: {
    name: string
    description: string
    href: string
  }[]
  lineupGroups: {
    id: string
    eyebrow: string
    title: string
    intro: string
  }[]
  lineup: {
    name: string
    role: string
    description: string
    image: ImagePath
    alt: string
    group: string
    imagePosition?: string
    schemaType?: 'Person' | 'MusicGroup'
    schemaName?: string
    sourceUrl?: ExternalUrl
  }[]
  partnerLogos: {
    name: string
    image: ImagePath
    href: string
  }[]
}

export type SummerJamContent = {
  event: SummerJamEvent
  page: Omit<SummerJamPage, 'event'>
}

export type SoundsystemPage = {
  hero: {
    eyebrow: string
    title: string
    image: ImagePath
    badge: ImagePath
    djs: string[]
  }
  about: {
    eyebrow: string
    title: string
    image: ImagePath
    stats: {
      value: string
      label: string
    }[]
    body: string[]
  }
  artists: {
    number: string
    name: string
    role: string
    image: ImagePath
  }[]
  genres: string[]
  sets: {
    label: string
    url: string
    type: 'soundcloud' | 'youtube'
  }[]
  ticker: string[]
  booking: {
    title: string
    body: string
    href: string
    cta: string
  }
}

export type PastGig = {
  title?: string
  venue: string
  monthYear: string
}
