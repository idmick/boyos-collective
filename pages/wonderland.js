import { NextSeo } from 'next-seo'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import RadioPlayer from '../components/RadioPlayer'
import WonderlandLogo from '../components/WonderlandLogo'
import SignupForm from '../components/SignupForm'
import Footer from '../components/layout/Footer'
import { useKeenSlider } from 'keen-slider/react'
import CarouselDots from '@/components/CarouselDots'

export default function BoyosWonderlandPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Keen slider setup
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    loop: true,
    slides: { perView: 1 },
    mode: 'snap',
    rubberband: false, // Optional: disables bounce at the ends
  })

  const HeroVideo = dynamic(() => import('../components/HeroVideo'), {
    ssr: false,
  })

  const CTAButton = ({ href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 text-2xl font-[moret]  px-6 py-2 bg-[#FFD700] text-[#8B008B] font-medium rounded-full max-w-fit w-fit flex-none hover:bg-yellow-500"
    >
      {label}
    </a>
  )

  const CTAButtonSecond = ({ href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex text-2xl font-[moret] font-bold underline gap-2 text-[#9370DB] hover:text-[#8B008B] max-w-fit w-fit"
    >
      {label}
    </a>
  )

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

  const photoAlbums = [
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

  return (
    <>
      <NextSeo
        title="Boyos Wonderland"
        description="Boyos Wonderland is a unique Amsterdam party series blending music, art, food, tattoos, and immersive experiences. Step into a world where groove sparks imagination and every rhythm invites adventure."
        openGraph={{
          url: 'https://www.boyoscollective.nl/wonderland',
          title: 'Boyos Wonderland',
          description:
            'Boyos Wonderland is a unique Amsterdam party series blending music, art, food, and immersive experiences. Step into a world where groove sparks imagination and every rhythm invites adventure.',
          images: [
            {
              url: 'https://www.boyoscollective.nl/images/essential_groove.png',
              alt: 'Boyos Wonderland og-image',
            },
          ],
          siteName: 'Boyos Collective',
        }}
      />
      <div className="bg-[#FAF4EB]">
        <RadioPlayer
          channels={channels}
          clientId="sQHBwYwmzeqpmKktQSeKYpDpE1YsCSWl"
        />

        <div className="relative flex flex-col scroll-smooth max-w-[500px] mx-auto bg-neutral-100 text-[#1B1212] font-sans">
          {/* FLOATING MENU BUTTON */}
          <div className="fixed flex top-4 right-4 z-50 gap-2">
            {/* <a
              className=" bg-[#F9ABC5] text-[#1B1212] font-bold p-3 rounded-full  shadow-lg hover:text-[#641B16]"
              href="https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=50d15694-0f22-4859-8c4c-df03dff309fc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tickets
            </a> */}
            <button
              className=" bg-[#9370DB] text-[#F0E68C] font-bold p-3 rounded-full  shadow-lg hover:text-[#FFD700]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu ☰
            </button>
          </div>

          <img
            src="/images/cover.png"
            className="fixed top-0 bottom-0 left-0 h-screen object-none z-40 pointer-events-none"
            alt="essential groove logo"
          />

          {menuOpen && (
            <div
              id="mobile-menu"
              className="fixed inset-0 bg-[#9370DB]  text-[#F0E68C] font-[moret] flex flex-col items-center justify-center gap-8 text-4xl font-bold z-50 "
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
              {/* <a
                href="https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#641B16]"
                onClick={() => setMenuOpen(false)}
              >
                Tickets
              </a> */}
              <a
                href="#cta"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Stay in the loop
              </a>
            </div>
          )}

          {/* HERO */}
          <section
            id="hero"
            className="relative flex h-screen overflow-hidden items-center justify-center text-[#F2EEE9]"
          >
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
            <h2 className="uppercase  font-[pretoria] tracking-wider sticky top-0 z-10 bg-[#9370DB] text-4xl text-[#F0E68C]  py-8">
              Our Story
            </h2>
            <div className="text-2xl font-[moret]">
              <p className="mb-4">
                Boyos Wonderland is what happens when DJs dream beyond the
                booth. What started as friends cooking, hosting, and spinning
                tunes has grown into a series of warm, soulful events at
                Houtbaar, from intimate Dine & Dance nights to our garden mini
                festival.
              </p>
              <p className="mb-4">
                We blend food, music, tattoos, and good people into one shared
                rhythm. Our line-ups are curated on vibe, not hype. No
                clout-chasing, just artists who know how to move a room.
              </p>
              <p>
                This is a space where the essential groove comes alive. Come
                early, stay late, and be part part of something real.
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <img src="/images/mini-fest-party.png" />
            </div>
          </section>

          {/* EVENTS */}
          <section
            id="events"
            className="bg-[#F0E68C] text-[#8B008B] px-6 py-12"
          >
            <h2 className="uppercase  font-[pretoria] tracking-wider sticky top-0 z-10 bg-[#F0E68C] text-4xl text-[#8B008B]  py-8">
              No Events Scheduled
            </h2>
            {/* <div className="mb-12">
              <img
                src="/images/events/dine_and_dance_2.png"
                alt="Dine & Dance poster"
                className="mb-6"
              />
              <h3 className="uppercase text-3xl font-[pretoria] tracking-wider font-bold mb-6">
                Dine and Dance
              </h3>
              <p className="text-2xl font-[moret] mb-6">
                A cozy shared-table dinner and a dancefloor that flows.
                Japanese-inspired food, curated music, and all the right energy.
              </p>
              <p className="text-2xl font-[moret] font-bold mb-1">
                16 May from 17:00 – 01:00 at Houtbaar
              </p>
              <ul className="text-2xl font-[moret] mb-4 list-disc list-inside">
                <li>3-course vegetarian dinner – €15</li>
                <li>Dance Free from 20:00</li>
              </ul>
              {<CTAButton href="" label="Sold Out"></CTAButton>}
            </div> */}
            <div>
              <p className="text-2xl font-[moret]  mb-1">
                We had an amazing season with our Dine & Dance events and Mini
                Festival, but we currently have no new events scheduled.
              </p>
              <p className="text-lg font-[moret] text-[#41159a] opacity-80">
                Stay tuned for updates and follow us on Instagram or join our
                WhatsApp community to be the first to know!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center items-center">
                <a
                  href="https://chat.whatsapp.com/CB2AbyXgPYH3eUphbKVyQR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  <svg
                    fill="currentColor"
                    width="24px"
                    height="24px"
                    viewBox="-1.66 0 740.824 740.824"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714"
                      ></path>
                    </g>
                  </svg>
                  Join WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/boyos.wonderland/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-bold underline text-[#9370DB] hover:text-[#8B008B] transition"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="currentColor"
                      ></path>{' '}
                      <path
                        d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                        fill="currentColor"
                      ></path>{' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                        fill="currentColor"
                      ></path>{' '}
                    </g>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </section>
          {/* PHOTO ALBUMS CAROUSEL */}
          <section id="photos" className="bg-[#9370DB] px-6 py-12">
            <h2 className="uppercase font-[pretoria] tracking-wider text-4xl text-[#F0E68C] py-8">
              Photo Albums
            </h2>
            <div className="relative w-full">
              <div ref={sliderRef} className="keen-slider">
                {photoAlbums.map((album, idx) => (
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
                total={photoAlbums.length}
                current={currentSlide}
                onDotClick={(idx) => instanceRef.current?.moveToIdx(idx)}
              />
            </div>
          </section>

          {/* CTA */}
          {/* <section
            id="cta"
            className="bg-[#F0E68C] px-6 py-12 text-center text-[#8B008B]"
          >
            <h2 className="uppercase  sticky top-0 z-10 bg-[#F0E68C] text-4xl text-left text-[#8B008B]  py-8 font-[pretoria] tracking-wider">
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
            <Footer bgColor="#FF6347" />
          </div>
        </div>
      </div>
    </>
  )
}
