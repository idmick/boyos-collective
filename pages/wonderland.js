import Head from 'next/head'
import { generateNextSeo } from 'next-seo/pages'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
// Lazy load RadioPlayer for performance
const RadioPlayerDyn = dynamic(() => import('../components/RadioPlayer'), {
  ssr: false,
})
import WonderlandLogo from '../components/WonderlandLogo'
// import SignupForm from '../components/SignupForm'
import Footer from '../components/layout/Footer'
import { useKeenSlider } from 'keen-slider/react'
import CarouselDots from '@/components/CarouselDots'

export default function BoyosWonderlandPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)
  const bannerRef = useRef(null)

  const QUICK_FACTS_HEIGHT = 52
  const HEADER_BASE_OFFSET = 0

  const effectiveBannerHeight = showStickyCta
    ? Math.max(bannerHeight, QUICK_FACTS_HEIGHT)
    : 0

  const stickyHeadlineOffset = `${effectiveBannerHeight + HEADER_BASE_OFFSET}px`

  const contentTopPadding = showStickyCta
    ? `${effectiveBannerHeight + 12}px`
    : '0px'

  // Note: slider state moved into PhotoAlbums component to avoid page re-renders

  const HeroVideo = dynamic(() => import('../components/HeroVideo'), {
    ssr: false,
  })

  const CTAButton = ({ href, label }) => {
    const isExternal = /^https?:\/\//.test(href)
    const handleClick = (e) => {
      if (!isExternal && href?.startsWith('#')) {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="mt-4 text-2xl font-[moret]  px-6 py-2 bg-[#FFD700] text-[#8B008B] font-medium rounded-full max-w-fit w-fit flex-none hover:bg-yellow-500"
        onClick={handleClick}
      >
        {label}
      </a>
    )
  }

  // Isolated Photo Albums slider to prevent page re-render on slide change
  const PhotoAlbums = ({ albums }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider({
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      loop: true,
      slides: { perView: 1 },
      mode: 'snap',
      rubberband: false,
    })
    return (
      <section id="photos" className="bg-[#9370DB] px-6 py-12">
        <h2 className="uppercase font-[anton] tracking-wider text-4xl text-[#F0E68C] py-8">
          Photo Albums
        </h2>
        <div className="relative w-full">
          <div ref={sliderRef} className="keen-slider">
            {albums.map((album) => (
              <a
                key={album.url}
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                className="keen-slider__slide group flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg focus:outline-none cursor-pointer"
                tabIndex={0}
                aria-label={`Open album: ${album.title}`}
                title={`View album: ${album.title}`}
              >
                <div className="relative w-full h-80">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-80 object-cover transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end opacity-100 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                    <span className="text-[#F0E68C] text-xl font-bold p-4">
                      {album.title}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                    <span className="bg-[#9370DB]/90 text-[#F0E68C] px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      View Album
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {/* Navigation buttons */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#1B1212] rounded-full p-2 shadow transition z-10"
            aria-label="Previous album"
          >
            &#8592;
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#1B1212] rounded-full p-2 shadow transition z-10"
            aria-label="Next album"
          >
            &#8594;
          </button>
          {/* Dots */}
          <CarouselDots
            total={albums.length}
            current={currentSlide}
            onDotClick={(idx) => instanceRef.current?.moveToIdx(idx)}
          />
        </div>
      </section>
    )
  }

  const channels = [
    {
      name: 'Essential Groove Radio (Default)',
      url: 'https://soundcloud.com/boyos_soundsystem/sets/essential-groove',
    },
    {
      name: 'Wonderland Artist Channel',
      url: 'https://soundcloud.com/boyos_soundsystem/sets/artist-channel',
    },
    {
      name: 'Jaguar House',
      url: 'https://soundcloud.com/jaguarhousemusic/sets/jaguar-house-season-i',
    },
    {
      name: '&Friends Mix Series',
      url: 'https://soundcloud.com/and_friends/sets/mix-series',
    },
  ]

  // Next event data (hardcoded)
  const nextEvent = {
    title: 'Boyos Wonderland x INI Movement Present: Summer Jam',
    shortTitle: 'Summer Jam',
    date: '2026-07-25',
    dateLabel: 'Saturday, July 25, 2026',
    start: '13:00',
    end: '23:00',
    timeLabel: '13:00 to 23:00',
    afterpartyLabel: 'After 23:00 the event continues indoors till late',
    venueName: 'Houtbaar',
    venueUrl: 'https://houtbaar.nl/',
    address: {
      streetAddress: 'Woudplein 2',
      postalCode: '2031CZ',
      addressLocality: 'Haarlem',
      addressCountry: 'NL',
    },
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Houtbaar%2C%20Woudplein%202%2C%202031CZ%20Haarlem',
    lineUpLabel: 'Still to be announced',
    ticketLabel: 'Still to be announced',
    ticketUrl: null,
    whatsappUrl: 'https://chat.whatsapp.com/CB2AbyXgPYH3eUphbKVyQR',
    instagramUrl: 'https://www.instagram.com/boyos.wonderland/?hl=en',
    iniUrl: 'https://www.inimovement.nl/',
    iniInstagramUrl: 'https://www.instagram.com/inimovement/',
  }

  const photoAlbums = [
    {
      title: 'Dine and Dance 19.12.25',
      cover: '/images/albums/cover_dine_dance_christmas_19.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/IgCmn5dF8NTdR6yGvJhtHw-AAfG9IEd7xRLOPCVbZwrDgMQ?e=KUgkcx',
    },
    {
      title: 'Mini Festival 28.06.25',
      cover: '/images/albums/cover_minifestival_2.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/EmvsUIjckHxIn6AQJg7DoXEBIO84vzIzjU66sRVUc4GB3w?e=g3WgEL',
    },
    {
      title: 'Dine and Dance 16.05.25',
      cover: '/images/albums/cover_dine_dance_2.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/EjgpbRxYJLhDh8npP18xpDIBkACc1p1d8ATNy1F9J-zNUQ?e=2JDEE8',
    },
    {
      title: 'Dine and Dance 12.04.25',
      cover: '/images/albums/cover_dine_dance_1.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/EvRL9_kDsXRMmsdl2k9GgeEBlhZhAoiiBPnaoetFuPNylA?e=HqzSFC',
    },
    {
      title: 'Mini Festival 17.8.24',
      cover: '/images/albums/cover_minifestival_1_24.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/EpOMafot_TJHu437auQpZgwBvll7UOzvQq4GBjlX0XzRcA?e=EGILLu',
    },
    {
      title: 'Boyos Wonderland 10.02.24',
      cover: '/images/albums/cover_wonderland_2_w-laura.jpg',
      url: 'https://1drv.ms/a/c/3ffa6c8616c781f7/EpVXR6eV1gBIitfiUlS3uU4B72jW6b8xbdMDHzxcSuV6bw?e=uLk8ZR',
    },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setShowStickyCta(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!bannerRef.current || typeof window === 'undefined') return
    const element = bannerRef.current
    const updateHeight = () => {
      const rect = element.getBoundingClientRect()
      setBannerHeight(rect.height)
    }
    updateHeight()
    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateHeight)
      observer.observe(element)
    }
    window.addEventListener('resize', updateHeight)
    return () => {
      if (observer) {
        observer.disconnect()
      }
      window.removeEventListener('resize', updateHeight)
    }
  }, [showStickyCta])

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Boyos Wonderland x INI Movement: Summer Jam',
          description:
            'Boyos Wonderland x INI Movement present Summer Jam on Saturday, July 25, 2026 at Houtbaar, Haarlem: an open air mini festival moving from live jam energy into DJ sets, dancing, and an indoor afterparty.',
          canonical: 'https://www.boyoscollective.nl/wonderland',
          openGraph: {
            url: 'https://www.boyoscollective.nl/wonderland',
            title: 'Boyos Wonderland x INI Movement: Summer Jam',
            description:
              'Saturday, July 25, 2026 at Houtbaar, Haarlem. A dance-forward open air mini festival by Boyos Wonderland, INI Movement, and Houtbaar, flowing from live jam energy into DJ sets and an indoor afterparty.',
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/cover.png',
                alt: 'Boyos Wonderland',
              },
            ],
            siteName: 'Boyos Collective',
            locale: 'en_GB',
          },
          additionalMetaTags: [
            {
              name: 'keywords',
              content:
                'Boyos Wonderland, Summer Jam, INI Movement, Houtbaar, Haarlem events, open air festival, live jam, Estafete',
            },
          ],
        })}
      </Head>
      {nextEvent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicEvent',
              name: nextEvent.title,
              startDate: '2026-07-25T13:00:00+02:00',
              endDate: '2026-07-25T23:00:00+02:00',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              genre: ['Live music', 'DJ sets', 'House', 'Soul'],
              image: ['https://www.boyoscollective.nl/images/cover.png'],
              location: {
                '@type': 'Place',
                name: nextEvent.venueName,
                sameAs: nextEvent.venueUrl,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: nextEvent.address.streetAddress,
                  addressLocality: nextEvent.address.addressLocality,
                  postalCode: nextEvent.address.postalCode,
                  addressCountry: nextEvent.address.addressCountry,
                },
              },
              organizer: [
                {
                  '@type': 'Organization',
                  name: 'Boyos Collective',
                  url: 'https://www.boyoscollective.nl',
                },
                {
                  '@type': 'Organization',
                  name: 'INI Movement',
                  url: nextEvent.iniUrl,
                },
              ],
              sameAs: [
                'https://www.boyoscollective.nl/wonderland',
                nextEvent.instagramUrl,
                nextEvent.iniUrl,
                nextEvent.iniInstagramUrl,
              ],
              description:
                'Boyos Wonderland x INI Movement Present: Summer Jam at Houtbaar in Haarlem. An open air mini festival with open participation jam energy, a separate Estafete live exchange moment, DJ sets, dancing, and an indoor afterparty. Line-up and tickets to be announced.',
            }),
          }}
        />
      )}
      <div
        className="theme-core min-h-screen"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
      >
        <RadioPlayerDyn
          channels={channels}
          clientId="sQHBwYwmzeqpmKktQSeKYpDpE1YsCSWl"
        />

        <div
          className="relative flex flex-col scroll-smooth max-w-[500px] mx-auto font-sans transition-all duration-300 ease-out"
          style={{ paddingTop: contentTopPadding }}
        >
          {/* Sticky quick facts bar */}
          {nextEvent && (
            <nav
              ref={bannerRef}
              className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
                showStickyCta
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              style={{
                backgroundColor: '#9370DB',
                color: '#F8F4E8',
                minHeight: `${QUICK_FACTS_HEIGHT}px`,
                boxShadow: showStickyCta
                  ? '0 18px 40px rgba(27, 18, 18, 0.35)'
                  : 'none',
              }}
              aria-label="Event quick facts and actions"
            >
              <div className="mx-auto max-w-[500px] px-3 py-2 text-[12px] sm:text-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <p className="font-semibold leading-snug tracking-wide text-left text-[#F8F4E8] sm:flex-1 sm:truncate">
                      {nextEvent.dateLabel} - Summer Jam - Houtbaar, Haarlem -
                      {` ${nextEvent.timeLabel}`}
                    </p>
                    <a
                      href={nextEvent.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full bg-[#FFB332] px-4 py-2 text-[#1B1212] text-sm font-semibold shadow shadow-[#1B1212]/10 transition-transform hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC75B]"
                    >
                      Updates
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          )}

          <img
            src="/images/cover.png"
            className="fixed top-0 bottom-0 left-0 h-screen object-none z-40 pointer-events-none"
            alt="essential groove logo"
          />

          {menuOpen && (
            <div
              id="mobile-menu"
              className="fixed inset-0 bg-[#9370DB]  text-[#F0E68C] font-[moret] flex flex-col items-center justify-center gap-8 text-4xl font-bold z-50 "
              style={{ zIndex: 99999 }}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="absolute hover:text-[#FFD700] font-bold top-6 right-6 text-3xl"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
              <a
                href="#about"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Our Story
              </a>
              <a
                href="#events"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </a>
              <a
                href="#photos"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Photos Albums
              </a>
              {nextEvent?.ticketUrl ? (
                <a
                  href={nextEvent.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD700]"
                  onClick={() => setMenuOpen(false)}
                >
                  Tickets
                </a>
              ) : nextEvent ? (
                <a
                  href={nextEvent.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD700]"
                  onClick={() => setMenuOpen(false)}
                >
                  Updates
                </a>
              ) : null}
              {/* <a
                href="#cta"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Stay in the loop
              </a> */}
            </div>
          )}

          {/* HERO */}
          <section
            id="hero"
            className="relative flex h-screen overflow-hidden items-center justify-center text-[#F2EEE9]"
          >
            {!showStickyCta && (
              <div className="absolute top-6 right-4 z-20">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#9370DB]/90 px-4 py-2 text-[#F0E68C] text-sm font-semibold shadow-lg shadow-[#1B1212]/25 backdrop-blur-sm transition-transform hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open site menu"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  aria-controls="mobile-menu"
                >
                  <span>Menu</span>
                  <span aria-hidden="true" className="text-base leading-none">
                    ☰
                  </span>
                </button>
              </div>
            )}
            <HeroVideo />

            <div className="absolute left-0 top-0 w-full h-full  bg-[#1B1212]/30" />

            <div className="flex flex-col z-10  px-4">
              <div className="">
                <WonderlandLogo />
              </div>
              <p className="mt-4 font-[moret] text-2xl tracking-wide text-left">
                Step beyond the ordinary, where groove sparks imagination, and
                every rhythm invites adventure.
              </p>
              {<CTAButton href="#events" label="View Events"></CTAButton>}
            </div>
          </section>

          {/* ABOUT / MANIFESTO */}
          <section
            id="about"
            className="bg-[#9370DB] px-6 py-12 text-left text-[#F0E68C]"
          >
            <h2
              className="uppercase font-[anton] tracking-wider sticky z-10 bg-[#9370DB] text-4xl text-[#F0E68C] py-8 transition-all duration-300"
              style={{ top: stickyHeadlineOffset }}
            >
              Our Story
            </h2>
            <div className="text-2xl font-[moret]">
              <p className="mb-4">
                Boyos Wonderland is what happens when DJs dream beyond the
                booth. What started as friends cooking, hosting, and spinning
                tunes has grown into a series of warm, soulful events, first at
                Houtbaar, our home base and creative partner, and now expanding
                to new spaces and cities.
              </p>
              <p className="mb-4">
                We blend food, music, tattoos, and good people into one shared
                rhythm. Our line-ups are curated on vibe, not hype. No
                clout-chasing, just artists who know how to move a room.
              </p>
              <p>
                This is a space where the essential groove comes alive. Come
                early, stay late, and be part of something real.
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <img src="/images/BoyosWonderland-mini-fest-at.jpg" />
            </div>
          </section>

          {/* EVENTS */}
          <section
            id="events"
            className="bg-[#F0E68C] text-[#8B008B] px-6 py-12"
          >
            <h2
              className="uppercase font-[anton] tracking-wider sticky z-10 bg-[#F0E68C] text-4xl text-[#8B008B] py-8 transition-all duration-300"
              style={{ top: stickyHeadlineOffset }}
            >
              Upcoming events
            </h2>
            <article className="font-[moret]">
              <p className="uppercase tracking-[0.22em] text-sm font-bold text-[#9370DB] mb-3">
                New upcoming edition
              </p>
              <h3 className="uppercase text-4xl font-[anton] tracking-wider font-bold mb-5 leading-none">
                {nextEvent.title}
              </h3>
              <p className="text-2xl mb-6">
                Summer Jam is a collaborative open air mini festival by Boyos
                Wonderland,{' '}
                <a
                  href={nextEvent.iniUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-2 hover:text-[#9370DB] transition"
                >
                  INI Movement
                </a>
                , and Houtbaar. A warm, loose day built around rhythm and
                release: a live jam in the sun, a steady lift into DJ energy,
                and a dancefloor that opens up before the night moves indoors.
              </p>

              <dl className="grid grid-cols-1 gap-3 text-lg mb-6">
                <div className="rounded-lg bg-[#9370DB]/10 p-4">
                  <dt className="uppercase text-sm font-bold tracking-wider text-[#41159a]">
                    Date
                  </dt>
                  <dd className="text-2xl">{nextEvent.dateLabel}</dd>
                </div>
                <div className="rounded-lg bg-[#9370DB]/10 p-4">
                  <dt className="uppercase text-sm font-bold tracking-wider text-[#41159a]">
                    Location
                  </dt>
                  <dd className="text-2xl">
                    {nextEvent.venueName}, {nextEvent.address.streetAddress},{' '}
                    {nextEvent.address.postalCode}{' '}
                    {nextEvent.address.addressLocality}
                  </dd>
                </div>
                <div className="rounded-lg bg-[#9370DB]/10 p-4">
                  <dt className="uppercase text-sm font-bold tracking-wider text-[#41159a]">
                    Time
                  </dt>
                  <dd className="text-2xl">{nextEvent.timeLabel}</dd>
                  <dd className="mt-1 text-base text-[#41159a] opacity-90">
                    {nextEvent.afterpartyLabel}
                  </dd>
                </div>
              </dl>

              <div className="space-y-4 text-xl mb-6">
                <p>
                  INI Movement brings two separate live elements into the day:
                  an open participation jam and an Estafete moment where DJs and
                  musicians pass grooves back and forth in the moment.
                </p>
                <p>
                  The program moves from hands-on live energy into deeper
                  electronic pressure, building the dancefloor step by step
                  without leaning on one big headliner.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-8">
                <div className="rounded-lg border-2 border-[#9370DB] p-4">
                  <p className="uppercase text-sm font-bold tracking-wider text-[#41159a]">
                    Line-up
                  </p>
                  <p className="text-2xl">{nextEvent.lineUpLabel}</p>
                </div>
                <div className="rounded-lg border-2 border-[#9370DB] p-4">
                  <p className="uppercase text-sm font-bold tracking-wider text-[#41159a]">
                    Tickets
                  </p>
                  <p className="text-2xl">{nextEvent.ticketLabel}</p>
                  <p className="text-base text-[#41159a] opacity-90">
                    More info soon. Stay close for the first ticket and line-up
                    drop.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mt-8 justify-center items-center">
                <a
                  href={nextEvent.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  Stay updated
                </a>
                <a
                  href={nextEvent.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  Boyos Instagram
                </a>
                <a
                  href={nextEvent.iniUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  INI Movement
                </a>
                <a
                  href={nextEvent.iniInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  INI Instagram
                </a>
                <a
                  href={nextEvent.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  Directions
                </a>
              </div>
            </article>
          </section>
          {/* PHOTO ALBUMS CAROUSEL */}
          <PhotoAlbums albums={photoAlbums} />

          {/* Sticky mobile CTA */}
          {nextEvent && (
            <div
              className={`sm:hidden fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 ${
                showStickyCta
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <div
                className="flex items-center justify-between gap-3 rounded-full px-3 py-2"
                style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
              >
                <a
                  href={nextEvent.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join WhatsApp for Boyos Wonderland Summer Jam updates"
                  className="flex-1 text-center px-4 py-3 text-black font-bold rounded-full focus-visible:outline focus-visible:outline-offset-2"
                  style={{ backgroundColor: 'var(--event-accent-1)' }}
                >
                  Get Updates
                </a>
                <span
                  className="text-[11px] px-3 py-2 rounded-full"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    color: 'var(--event-off)',
                  }}
                >
                  Tickets soon
                </span>
              </div>
            </div>
          )}

          {/* CTA */}
          {/* <section
            id="cta"
            className="bg-[#F0E68C] px-6 py-12 text-center text-[#8B008B]"
          >
            <h2
              className="uppercase sticky z-10 bg-[#F0E68C] text-4xl text-left text-[#8B008B] py-8 font-[anton] tracking-wider transition-all duration-300"
              style={{ top: stickyHeadlineOffset }}
            >
              Stay Up to Date
            </h2>
            <p className="max-w-sm text-left text-2xl font-[moret]">
              Wanna stay on top of the next drops? Join our WhatsApp community,
              hop on the newsletter, or follow us on Instagram.
            </p>
            <div className="flex flex-col gap-4 ">
              {
                <CTAButtonSecond
                  href="https://www.instagram.com/boyos.wonderland/?hl=en"
                  label="Follow us on Instagram"
                ></CTAButtonSecond>
              }
              {
                <CTAButtonSecond
                  href="https://chat.whatsapp.com/CB2AbyXgPYH3eUphbKVyQR"
                  label="Join our WhatsApp Community"
                ></CTAButtonSecond>
              }
            </div>
          </section> */}
          <div className="mb-[156px]">
            <Footer bgColor="#F0E68C" textColor="#9370DB" />
          </div>
        </div>
      </div>
    </>
  )
}
