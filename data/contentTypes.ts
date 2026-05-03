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
  nextEvent: SummerJamEvent
}

export type Address = {
  streetAddress: string
  postalCode: string
  addressLocality: string
  addressCountry: string
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
  ticketLabel: string
  ticketUrl: ExternalUrl
  lineUpLabel: string
  whatsappUrl: ExternalUrl
  instagramUrl: ExternalUrl
  iniUrl: ExternalUrl
  iniInstagramUrl: ExternalUrl
  directionsUrl: ExternalUrl
  address: Address
  description: string
}

export type WonderlandPage = {
  hero: Required<Pick<HeroContent, 'eyebrow' | 'title' | 'subtitle' | 'image' | 'badge'>>
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
  upcomingRows: {
    date: string
    title: string
    venue: string
    tag: string
  }[]
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

export type SummerJamPage = {
  event: SummerJamEvent
  seo: {
    title: string
    description: string
    keywords: string
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
  finalCta: {
    eyebrow: string
    title: string
    body: string
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
  lineup: {
    name: string
    role: string
    description: string
    image?: ImagePath
    imagePosition?: string
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
