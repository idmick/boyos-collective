import { fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import clubUpContent from '../data/wonderland-events/club-up-september-2026.json'
import type {
  WonderlandEventContent,
  WonderlandPage as WonderlandPageData,
} from '../data/contentTypes'
import { wonderlandPageContent } from '../data/wonderland'
import {
  getWonderlandEventBySlug,
  resolveWonderlandEvent,
} from '../lib/wonderlandEvents'
import Home, { getStaticProps as getHomeStaticProps } from '../pages/index'
import WonderlandOverviewPage, {
  getStaticProps as getWonderlandStaticProps,
} from '../pages/wonderland'
import WonderlandEventPage, {
  getStaticPaths as getEventStaticPaths,
  getStaticProps as getEventStaticProps,
} from '../pages/wonderland/[slug]'

vi.mock('next/head', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('next/image', () => ({
  default: React.forwardRef<HTMLImageElement, Record<string, unknown>>(
    function MockImage(props, ref) {
      const {
        priority,
        fill,
        sizes,
        quality,
        placeholder,
        blurDataURL,
        ...imageProps
      } = props

      void priority
      void fill
      void sizes
      void quality
      void placeholder
      void blurDataURL

      return React.createElement('img', { ...imageProps, ref })
    }
  ),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => React.createElement('a', { href, ...props }, children),
}))

vi.mock('next-seo', () => ({
  OrganizationJsonLd: () => null,
}))

vi.mock('next-seo/pages', () => ({
  generateNextSeo: () => null,
}))

vi.mock('@gsap/react', () => ({
  useGSAP: () => undefined,
}))

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    matchMedia: vi.fn(),
  },
}))

vi.mock('gsap/dist/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

vi.mock('geist/font/sans', () => ({
  GeistSans: { className: 'geist-sans' },
}))

vi.mock('../components/ui/Reveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../components/ui/SiteFooter', () => ({
  default: () => null,
}))

vi.mock('../components/ui/Ticker', () => ({
  default: ({ items }: { items: string[] }) => (
    <div data-testid="ticker">{items.join(' · ')}</div>
  ),
}))

vi.mock('../components/SignupForm', () => ({
  default: () => <div data-testid="signup-form" />,
}))

vi.mock('../components/ui/SectionTitle', () => ({
  default: ({ title }: { title: string }) => <h2>{title}</h2>,
}))

const community = {
  ...wonderlandPageContent.community,
  url: 'https://chat.whatsapp.com/fixture-community',
}

const makeEvent = (
  overrides: Partial<WonderlandEventContent> = {}
) =>
  resolveWonderlandEvent('fixture-wonderland', {
    ...(clubUpContent as WonderlandEventContent),
    title: 'Fixture Wonderland at Test Club',
    shortTitle: 'Fixture Wonderland',
    titleLines: ['Fixture Wonderland', 'at Test Club'],
    shortTitleLines: ['Fixture', 'Wonderland'],
    date: '2027-03-07',
    intro: [
      'A fixture-led night that proves the page renders its event input.',
      'Come together, stay for the groove.',
    ],
    body: [
      'Fixture story one.',
      'Fixture story two.',
      'Fixture story three.',
      'Fixture story four.',
    ],
    poster: '/images/fixture-poster.webp',
    heroImage: '/images/fixture-hero.webp',
    venueName: 'Test Club',
    venueUrl: 'https://test-club.example/',
    address: {
      streetAddress: 'Teststraat 10',
      postalCode: '1000 AA',
      addressLocality: 'Rotterdam',
      addressCountry: 'NL',
    },
    lineup: [
      {
        name: 'Artist One',
        links: [
          {
            label: 'Artist One Instagram',
            url: 'https://instagram.com/artist-one',
          },
        ],
      },
      {
        name: 'Artist Two',
        links: [
          {
            label: 'Artist Two Instagram',
            url: 'https://instagram.com/artist-two',
          },
        ],
      },
      {
        name: 'Artist Three',
        links: [
          {
            label: 'Artist Three Instagram',
            url: 'https://instagram.com/artist-three',
          },
        ],
      },
    ],
    tickets: {
      url: 'https://tickets.example/fixture',
      currency: 'EUR',
      availability: 'InStock',
      statusLabel: 'Tickets are on sale now.',
      tiers: [
        { name: 'Early Bird', price: 8, serviceFee: 1.75, total: 9.75 },
        { name: 'Regular', price: 12, serviceFee: 1.75, total: 13.75 },
        { name: 'Door', price: 15, total: 15 },
      ],
    },
    practical: {
      minimumAge: '21+',
      doors: '22:30',
      end: '05:00',
      reentry: 'With a fixture stamp',
      lockers: 'Fixture lockers available',
      lastEntry: 'No fixture last-entry time',
    },
    instagramUrl: 'https://instagram.com/fixture-wonderland',
    residentAdvisorUrl: null,
    ...overrides,
  })

const expectSafeExternalLink = (link: HTMLElement, href: string) => {
  expect(link).toHaveAttribute('href', href)
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noopener noreferrer')
}

describe('Wonderland event page', () => {
  it('renders event, practical and ticket information through the DOM', () => {
    const event = makeEvent()

    render(<WonderlandEventPage event={event} community={community} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Boyos Wonderland\s*at Club UP/i
    )
    expect(screen.getByText(event.intro[0])).toBeInTheDocument()
    expect(screen.getByText('21+')).toBeInTheDocument()
    expect(screen.getByText('22:30')).toBeInTheDocument()
    expect(screen.getByText('05:00')).toBeInTheDocument()
    expect(screen.getByText('With a fixture stamp')).toBeInTheDocument()
    expect(screen.getByText('Fixture lockers available')).toBeInTheDocument()
    expect(screen.getByText('No fixture last-entry time')).toBeInTheDocument()
    expect(screen.getByText('€9.75')).toBeInTheDocument()
    expect(screen.getByText('€13.75')).toBeInTheDocument()
    expect(screen.getByText('€15')).toBeInTheDocument()
    expect(screen.getByText('€8 + €1.75 service fee')).toBeInTheDocument()
    expect(screen.getByText('At the door')).toBeInTheDocument()

    screen.getAllByRole('link', { name: /get tickets/i }).forEach((link) =>
      expectSafeExternalLink(link, event.tickets.url)
    )
    expectSafeExternalLink(
      screen.getByRole('link', { name: 'Join the community' }),
      community.url
    )
  })

  it('changes the expanded line-up item through user interaction', () => {
    const event = makeEvent()

    render(<WonderlandEventPage event={event} community={community} />)

    const firstArtist = screen.getByRole('button', { name: 'Artist One' })
    const secondArtist = screen.getByRole('button', { name: 'Artist Two' })
    const thirdArtist = screen.getByRole('button', { name: 'Artist Three' })

    expect(firstArtist).toHaveAttribute('aria-expanded', 'true')
    expect(secondArtist).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(secondArtist)
    expect(firstArtist).toHaveAttribute('aria-expanded', 'false')
    expect(secondArtist).toHaveAttribute('aria-expanded', 'true')

    fireEvent.focus(thirdArtist)
    expect(secondArtist).toHaveAttribute('aria-expanded', 'false')
    expect(thirdArtist).toHaveAttribute('aria-expanded', 'true')

    expectSafeExternalLink(
      screen.getByRole('link', { name: /Artist Two Instagram/i }),
      event.lineup[1].links[0].url
    )
  })

  it('keeps internal artist pages local and opens socials safely', () => {
    const event = getWonderlandEventBySlug(
      'club-up-september-2026'
    )

    expect(event).not.toBeNull()
    render(<WonderlandEventPage event={event!} community={community} />)

    const boyosButton = screen.getByRole('button', {
      name: 'Boyos Soundsystem',
    })
    const boyosPanel = boyosButton.closest('article')
    const soundsystemPage = within(boyosPanel as HTMLElement).getByRole(
      'link',
      { name: 'Soundsystem page' }
    )

    expect(soundsystemPage).toHaveAttribute('href', '/soundsystem')
    expect(soundsystemPage).not.toHaveAttribute('target')
    expect(soundsystemPage).not.toHaveAttribute('rel')

    const b2bButton = screen.getByRole('button', {
      name: 'Damian Zico B2B Vince Fajardo',
    })
    fireEvent.click(b2bButton)
    expect(b2bButton).toHaveAttribute('aria-expanded', 'true')

    const expectedExternalLinks = [
      ['Boyos Instagram', 'https://www.instagram.com/boyos.soundsystem/'],
      ['Boyos SoundCloud', 'https://soundcloud.com/boyos_soundsystem'],
      ['Damian Zico Instagram', 'https://www.instagram.com/damianzico_/'],
      ['Damian Zico SoundCloud', 'https://soundcloud.com/damianzico'],
      ['Vince Fajardo Instagram', 'https://www.instagram.com/vince_fjr/'],
      ['Vince Fajardo SoundCloud', 'https://soundcloud.com/inceajardo'],
      ['Ferkoel Instagram', 'https://www.instagram.com/_ferkoel/'],
      ['Ferkoel SoundCloud', 'https://soundcloud.com/ferkoel'],
    ] as const

    expectedExternalLinks.forEach(([label, href]) => {
      expectSafeExternalLink(
        screen.getByRole('link', { name: new RegExp(label) }),
        href
      )
    })

    const b2bPanel = b2bButton.closest('article')
    expect(within(b2bPanel as HTMLElement).getAllByRole('link')).toHaveLength(
      4
    )
  })

  it('only renders Resident Advisor when a URL is available', () => {
    const event = makeEvent()
    const { rerender } = render(
      <WonderlandEventPage event={event} community={community} />
    )

    expect(
      screen.queryByRole('link', { name: /Resident Advisor/i })
    ).not.toBeInTheDocument()

    const eventWithRa = makeEvent({
      residentAdvisorUrl: 'https://ra.co/events/fixture',
    })
    rerender(
      <WonderlandEventPage event={eventWithRa} community={community} />
    )

    expectSafeExternalLink(
      screen.getByRole('link', { name: /Resident Advisor/i }),
      'https://ra.co/events/fixture'
    )
  })

  it('publishes valid event and breadcrumb JSON-LD in the document', () => {
    const event = makeEvent()
    const { container } = render(
      <WonderlandEventPage event={event} community={community} />
    )

    const eventScript = container.querySelector(
      '#wonderland-event-jsonld'
    )
    const breadcrumbScript = container.querySelector(
      '#wonderland-breadcrumb-jsonld'
    )

    expect(eventScript).toHaveAttribute('type', 'application/ld+json')
    expect(breadcrumbScript).toHaveAttribute(
      'type',
      'application/ld+json'
    )
    expect(JSON.parse(eventScript?.textContent ?? '')).toEqual(
      expect.objectContaining({
        '@type': 'MusicEvent',
        name: event.title,
        url: event.canonical,
      })
    )
    expect(JSON.parse(breadcrumbScript?.textContent ?? '')).toEqual(
      expect.objectContaining({ '@type': 'BreadcrumbList' })
    )
  })

  it('exposes static paths and not-found behavior through page exports', () => {
    expect(getEventStaticPaths()).toEqual({
      paths: expect.arrayContaining([
        { params: { slug: 'club-up-september-2026' } },
      ]),
      fallback: false,
    })
    expect(
      getEventStaticProps({ params: { slug: 'does-not-exist' } })
    ).toEqual({ notFound: true })

    const knownEvent = getEventStaticProps({
      params: { slug: 'club-up-september-2026' },
    })
    expect(knownEvent).toEqual({
      props: {
        event: expect.objectContaining({
          slug: 'club-up-september-2026',
        }),
        community: wonderlandPageContent.community,
      },
    })
  })
})

describe('Shared Club UP promotion surfaces', () => {
  it('renders homepage event links and poster from the supplied event', () => {
    const event = makeEvent()

    render(<Home nextEvent={event} latestAlbum={null} />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Fixture\s*Wonderland/,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(event.locationLabel)).toBeInTheDocument()
    expect(screen.getByText(event.dateLabel)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: `${event.title} poster` })).toHaveAttribute(
      'src',
      event.poster
    )
    expectSafeExternalLink(
      screen.getByRole('link', { name: 'Tickets' }),
      event.tickets.url
    )
    expect(screen.getByRole('link', { name: 'Event details' })).toHaveAttribute(
      'href',
      event.href
    )
    expect(screen.queryByTestId('signup-form')).not.toBeInTheDocument()
  })

  it('renders the Wonderland overview card from its supplied event', () => {
    const event = makeEvent()
    const page: WonderlandPageData = {
      ...wonderlandPageContent,
      currentEvent: event,
    }

    render(<WonderlandOverviewPage page={page} />)

    const eventLink = screen.getByRole('link', {
      name: /Event details & tickets/i,
    })
    expect(eventLink).toHaveAttribute('href', event.href)
    expect(within(eventLink).getByText('Fixture Wonderland')).toBeInTheDocument()
    expect(within(eventLink).getByText('at Test Club')).toBeInTheDocument()
    expect(within(eventLink).getByText(event.dateLabel)).toBeInTheDocument()
    expect(within(eventLink).getByText(event.locationLabel)).toBeInTheDocument()
    expect(
      within(eventLink).getByRole('img', { name: `${event.title} artwork` })
    ).toHaveAttribute('src', event.heroImage)
    expect(screen.getByTestId('signup-form')).toBeInTheDocument()
  })

  it('promotes the supplied photo album and exposes stable section links', () => {
    const event = makeEvent()
    const album = wonderlandPageContent.albums[0]
    const page: WonderlandPageData = {
      ...wonderlandPageContent,
      currentEvent: event,
    }

    const { unmount } = render(
      <Home nextEvent={event} latestAlbum={album} />
    )

    expect(screen.getByRole('heading', { name: album.title })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: album.title })).toHaveAttribute(
      'src',
      album.cover
    )
    expectSafeExternalLink(
      screen.getByRole('link', { name: /View full album/i }),
      album.url
    )
    expect(screen.getByRole('link', { name: 'All photo albums' })).toHaveAttribute(
      'href',
      '/wonderland#photos'
    )

    unmount()
    const { container } = render(<WonderlandOverviewPage page={page} />)

    for (const anchor of ['story', 'events', 'archive', 'photos']) {
      expect(
        screen.getByRole('link', {
          name: new RegExp(`^${anchor}$`, 'i'),
        })
      ).toHaveAttribute('href', `#${anchor}`)
      expect(container.querySelector(`#${anchor}`)).toBeInTheDocument()
    }
  })

  it('resolves the current event through homepage and overview static props', () => {
    expect(getHomeStaticProps()).toEqual({
      props: {
        nextEvent: expect.objectContaining({
          slug: wonderlandPageContent.currentEventSlug,
        }),
        latestAlbum: wonderlandPageContent.albums[0],
      },
    })
    expect(getWonderlandStaticProps()).toEqual({
      props: {
        page: expect.objectContaining({
          currentEvent: expect.objectContaining({
            slug: wonderlandPageContent.currentEventSlug,
          }),
        }),
      },
    })
  })
})
