import { NextSeo } from "next-seo";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
// Lazy load RadioPlayer for performance
const RadioPlayerDyn = dynamic(() => import("../components/RadioPlayer"), {
  ssr: false,
});
import WonderlandLogo from "../components/WonderlandLogo";
// import SignupForm from '../components/SignupForm'
import Footer from "../components/layout/Footer";
import { useKeenSlider } from "keen-slider/react";
import CarouselDots from "@/components/CarouselDots";

export default function BoyosWonderlandPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const grainOpacity = useMemo(() => 0.18 + Math.random() * 0.07, []);
  const bannerRef = useRef(null);

  const QUICK_FACTS_HEIGHT = 52;
  const HEADER_BASE_OFFSET = 0;

  const effectiveBannerHeight = showStickyCta
    ? Math.max(bannerHeight, QUICK_FACTS_HEIGHT)
    : 0;

  const stickyHeadlineOffset = `${
    effectiveBannerHeight + HEADER_BASE_OFFSET
  }px`;

  const contentTopPadding = showStickyCta
    ? `${effectiveBannerHeight + 12}px`
    : "0px";

  // Note: slider state moved into PhotoAlbums component to avoid page re-renders

  const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
    ssr: false,
  });

  const CTAButton = ({ href, label }) => {
    const isExternal = /^https?:\/\//.test(href);
    const handleClick = (e) => {
      trackPiratepx("cta_view_events");
      if (!isExternal && href?.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="mt-4 text-2xl font-[moret]  px-6 py-2 bg-[#FFD700] text-[#8B008B] font-medium rounded-full max-w-fit w-fit flex-none hover:bg-yellow-500"
        onClick={handleClick}
      >
        {label}
      </a>
    );
  };

  // Isolated Photo Albums slider to prevent page re-render on slide change
  const PhotoAlbums = ({ albums, onTrack }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      loop: true,
      slides: { perView: 1 },
      mode: "snap",
      rubberband: false,
    });
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
                onClick={() =>
                  onTrack(`album_open_${album.title.replace(/\s+/g, "_")}`)
                }
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
    );
  };

  const channels = [
    {
      name: "Essential Groove Radio (Default)",
      url: "https://soundcloud.com/boyos_soundsystem/sets/essential-groove",
    },
    {
      name: "Wonderland Artist Channel",
      url: "https://soundcloud.com/boyos_soundsystem/sets/artist-channel",
    },
    {
      name: "Jaguar House",
      url: "https://soundcloud.com/jaguarhousemusic/sets/jaguar-house-season-i",
    },
    {
      name: "&Friends Mix Series",
      url: "https://soundcloud.com/and_friends/sets/mix-series",
    },
  ];

  // Next event data (hardcoded)
  const nextEvent = null; // No events currently scheduled

  const photoAlbums = [
    {
      title: "Dine and Dance 19.12.25",
      cover: "/images/albums/cover_dine_dance_christmas_19.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/IgCmn5dF8NTdR6yGvJhtHw-AAfG9IEd7xRLOPCVbZwrDgMQ?e=KUgkcx",
    },
    {
      title: "Mini Festival 28.06.25",
      cover: "/images/albums/cover_minifestival_2.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EmvsUIjckHxIn6AQJg7DoXEBIO84vzIzjU66sRVUc4GB3w?e=g3WgEL",
    },
    {
      title: "Dine and Dance 16.05.25",
      cover: "/images/albums/cover_dine_dance_2.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EjgpbRxYJLhDh8npP18xpDIBkACc1p1d8ATNy1F9J-zNUQ?e=2JDEE8",
    },
    {
      title: "Dine and Dance 12.04.25",
      cover: "/images/albums/cover_dine_dance_1.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EvRL9_kDsXRMmsdl2k9GgeEBlhZhAoiiBPnaoetFuPNylA?e=HqzSFC",
    },
    {
      title: "Mini Festival 17.8.24",
      cover: "/images/albums/cover_minifestival_1_24.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EpOMafot_TJHu437auQpZgwBvll7UOzvQq4GBjlX0XzRcA?e=EGILLu",
    },
    {
      title: "Boyos Wonderland 10.02.24",
      cover: "/images/albums/cover_wonderland_2_w-laura.jpg",
      url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EpVXR6eV1gBIitfiUlS3uU4B72jW6b8xbdMDHzxcSuV6bw?e=uLk8ZR",
    },
  ];

  const previousWonderlandAlbum = {
    label: "See last Wonderland gallery",
    url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EpVXR6eV1gBIitfiUlS3uU4B72jW6b8xbdMDHzxcSuV6bw?e=uLk8ZR",
  };

  const appendUtm = (base, medium) => {
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}utm_source=site&utm_medium=${medium}&utm_campaign=wonderland_dec19`;
  };

  const buildDate = (dateString, timeString) =>
    new Date(`${dateString}T${timeString}:00`);
  const formatCalendarStamp = (date) =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}00`;

  const trackPiratepx = (eventId) => {
    const img = new window.Image();
    img.src = `https://app.piratepx.com/ship?p=55de87a9-341f-4c3f-ac22-feba7ac931d8&i=${encodeURIComponent(
      eventId
    )}`;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setShowStickyCta(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!bannerRef.current || typeof window === "undefined") return;
    const element = bannerRef.current;
    const updateHeight = () => {
      const rect = element.getBoundingClientRect();
      setBannerHeight(rect.height);
    };
    updateHeight();
    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHeight);
      observer.observe(element);
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("resize", updateHeight);
    };
  }, [showStickyCta]);

  // Minimal in-view once hook to reveal content with motion-safe transitions
  const useInViewOnce = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      if (!ref.current || typeof window === "undefined") return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        setInView(true);
        return;
      }
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setInView(true);
              obs.disconnect();
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
      );
      obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);

    return { ref, inView };
  };

  // Subcomponents for the feature card
  const FeaturePoster = ({ ImageCmp, nextEvent }) => {
    const { ref, inView } = useInViewOnce();
    return (
      <div
        ref={ref}
        className={[
          "relative group w-full rounded-xl overflow-hidden",
          "ring-1 ring-white/10 shadow-xl",
          "transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          "motion-reduce:transition-none motion-reduce:transform-none",
        ].join(" ")}
      >
        <Image
          src={nextEvent.poster}
          alt="Boyos Wonderland Dine & Dance Christmas Special poster for 19 December at Houtbaar in Haarlem."
          width={1200}
          height={1500}
          priority
          sizes="(max-width: 640px) 100vw, 600px"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          className="block w-full h-auto motion-safe:group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="snow-overlay" aria-hidden="true" />
        {/* Soft inner glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 80px rgba(22,211,215,0.18)" }}
        />
      </div>
    );
  };

  const FeatureContent = ({ nextEvent, onTrack }) => {
    const { ref, inView } = useInViewOnce();
    const sub = `Friday 19 Dec · Dinner ${nextEvent.dinnerAt} · Dance ${nextEvent.danceFrom} · ${nextEvent.venueName}, Haarlem`;

    const PrimaryCTA = () => (
      <>
        <a
          href={nextEvent.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reserve dinner for Boyos Wonderland Dine & Dance Christmas Special"
          onClick={() => onTrack && onTrack("cta_tickets_dec19")}
          className="px-6 py-3 w-full text-center text-black font-bold rounded-full transition focus-visible:outline focus-visible:outline-offset-2"
          style={{ backgroundColor: "var(--event-accent-1)" }}
        >
          {nextEvent.ticketCtaLabel}
          <div className="text-xs text-center self-center tracking-wide rounded-full">
            Free from 20:00
          </div>
        </a>
      </>
    );

    const DirectionsCTA = () => {
      const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${nextEvent.address.streetAddress}, ${nextEvent.address.postalCode} ${nextEvent.address.addressLocality}`
      )}`;
      return (
        <a
          href={gmaps}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to Houtbaar in Haarlem"
          className="px-5 py-3 rounded-full border border-current/40 text-current hover:bg-white/10 transition focus-visible:outline focus-visible:outline-offset-2"
          style={{ color: "var(--event-off)" }}
        >
          Get Directions
        </a>
      );
    };

    const handleCalendar = () => {
      const fmt = (d) =>
        `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
          d.getDate()
        ).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(
          d.getMinutes()
        ).padStart(2, "0")}00`;
      const startD = new Date(`${nextEvent.date}T${nextEvent.dinnerAt}:00`);
      const [eh, em] = (nextEvent.end || "01:00").split(":").map(Number);
      const endD = new Date(startD);
      endD.setHours(eh, em, 0, 0);
      if (endD <= startD) endD.setDate(endD.getDate() + 1);
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Boyos//Wonderland//EN\nBEGIN:VEVENT\nUID:${Date.now()}@boyoscollective.nl\nDTSTAMP:${fmt(
        new Date()
      )}\nDTSTART:${fmt(startD)}\nDTEND:${fmt(endD)}\nSUMMARY:${
        nextEvent.title
      }\nLOCATION:${nextEvent.venueName}, ${nextEvent.address.streetAddress}, ${
        nextEvent.address.postalCode
      } ${nextEvent.address.addressLocality}\nDESCRIPTION:Dinner at ${
        nextEvent.dinnerAt
      }. Dance from ${nextEvent.danceFrom}. Reserve: ${
        nextEvent.ticketUrl
      }\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "boyos-wonderland.ics";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        ref={ref}
        className={[
          "flex flex-col gap-4 pr-2 sm:pr-4 font-[moret]",
          "transition-all duration-700 ease-out theme-event",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          "motion-reduce:transition-none motion-reduce:transform-none",
        ].join(" ")}
      >
        <p
          className="uppercase tracking-[0.22em] text-xs sm:text-sm"
          style={{ color: "var(--event-accent-2)" }}
        >
          THE DINE & DANCE EDITION
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <h1
            className="font-[anton] uppercase text-6xl sm:text-7xl leading-[0.95]"
            style={{ color: "var(--event-accent-1)" }}
          >
            BOYOS WONDERLAND
          </h1>
          <span
            className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: "var(--event-accent-2)",
              color: "var(--event-off)",
            }}
            aria-label="Final edition of the year"
          >
            Final edition of the year
          </span>
        </div>

        <p
          className="text-base sm:text-lg uppercase"
          style={{ color: "var(--event-accent-2)" }}
        >
          {sub}
        </p>

        <p className="text-lg sm:text-xl">
          Christmas special edition. Warm dinner first, then a small, sweaty
          dance party.
        </p>

        <ul className="mt-2 list-disc list-inside space-y-1 text-lg">
          <li>Doors {nextEvent.doors}</li>
          <li>Dinner {nextEvent.dinnerAt}</li>
          <li>Vegetarian {nextEvent.prices.veg}</li>
          <li>Non-vegetarian {nextEvent.prices.nonVeg}</li>
          <li>Dance free from {nextEvent.danceFrom}</li>
        </ul>
        <p className="text-sm opacity-90 mt-1">
          Choose vegetarian or non-vegetarian at checkout.
        </p>

        <div className="mt-4 text-lg sm:text-xl tracking-wide">
          <p className="font-bold">Boyos Soundsystem invites:</p>
          <p style={{ color: "var(--feature-accent)" }}>Guest DJ TBA</p>
          <p className="italic">Dinner Set</p>
        </div>

        <p className="text-sm sm:text-base text-neutral-300 mt-2">
          Our Dine & Dance tables go fast. Previous editions filled up early.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <PrimaryCTA />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <DirectionsCTA />
            <button
              onClick={handleCalendar}
              className="px-5 py-3 rounded-full border border-current/40 text-current hover:bg-white/10 transition focus-visible:outline focus-visible:outline-offset-2"
              aria-label="Add Boyos Wonderland to your calendar"
            >
              Add to Calendar
            </button>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                nextEvent.title
              )}&dates=20251219T180000/20251220T010000&details=${encodeURIComponent(
                `Dinner at ${nextEvent.dinnerAt}, dance from ${nextEvent.danceFrom}. Reserve: ${nextEvent.ticketUrl}`
              )}&location=${encodeURIComponent(
                `${nextEvent.venueName}, ${nextEvent.address.streetAddress}, ${nextEvent.address.postalCode} ${nextEvent.address.addressLocality}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-current/40 text-current hover:bg-white/10 transition focus-visible:outline focus-visible:outline-offset-2"
              aria-label="Add Boyos Wonderland to your Google Calendar"
            >
              Google Calendar
            </a>
          </div>
          <div className="text-sm opacity-80">
            Follow updates:{" "}
            <a
              href={nextEvent.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrack && onTrack("cta_whatsapp_dec19")}
              className="underline underline-offset-4 hover:opacity-90"
              aria-label="Join WhatsApp for Boyos Wonderland updates"
            >
              WhatsApp
            </a>{" "}
            ·{" "}
            <a
              href={nextEvent.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrack && onTrack("cta_instagram_dec19")}
              className="underline underline-offset-4 hover:opacity-90"
              aria-label="Follow Boyos Wonderland on Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NextSeo
        title="Boyos Wonderland - New Editions Brewing "
        description="Boyos Wonderland brings together music, food, and community. Currently brewing on new editions. Follow us for updates on the next events."
        canonical="https://www.boyoscollective.nl/wonderland"
        openGraph={{
          url: "https://www.boyoscollective.nl/wonderland",
          title: "Boyos Wonderland - New Editions Brewing",
          description: "Boyos Wonderland brings together music, food, and community. Currently brewing new editions. Follow us for updates.",
          images: [
            {
              url: "https://www.boyoscollective.nl/images/cover.png",
              alt: "Boyos Wonderland logo",
            },
          ],
          siteName: "Boyos Collective",
          locale: "en_GB",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Boyos Wonderland, Dine and Dance, house music, disco, afrobeat, Haarlem events",
          },
        ]}
      />
      {nextEvent && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicEvent",
            name: "Boyos Wonderland: Dine & Dance Christmas Special",
            startDate: "2025-12-19T18:00:00+01:00",
            endDate: "2025-12-20T01:00:00+01:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            isAccessibleForFree: true,
            genre: ["Disco", "House", "Soca", "Afrobeat"],
            image: [
              "https://www.boyoscollective.nl/images/events/wonderland_christmas_19_dec.png",
            ],
            location: {
              "@type": "Place",
              name: nextEvent.venueName,
              sameAs: nextEvent.venueUrl,
              address: {
                "@type": "PostalAddress",
                streetAddress: nextEvent.address.streetAddress,
                addressLocality: nextEvent.address.addressLocality,
                postalCode: nextEvent.address.postalCode,
                addressCountry: nextEvent.address.addressCountry,
              },
            },
            organizer: {
              "@type": "Organization",
              name: "Boyos Collective",
              url: "https://www.boyoscollective.nl",
            },
            performer: [
              { "@type": "MusicGroup", name: "Boyos Soundsystem" },
              { "@type": "MusicGroup", name: "Guest DJ TBA" },
            ],
            offers: [
              {
                "@type": "Offer",
                price: "22.50",
                priceCurrency: "EUR",
                url: nextEvent.ticketUrl,
                availability: "https://schema.org/InStock",
                category: "Vegetarian Dinner",
              },
              {
                "@type": "Offer",
                price: "25.00",
                priceCurrency: "EUR",
                url: nextEvent.ticketUrl,
                availability: "https://schema.org/InStock",
                category: "Non-vegetarian Dinner",
              },
              {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                url: "https://www.boyoscollective.nl/wonderland",
                availability: "https://schema.org/InStock",
                category: "Free Party Entry",
              },
            ],
            sameAs: [
              "https://www.boyoscollective.nl/wonderland",
              "https://www.instagram.com/boyos.wonderland/?hl=en",
            ],
            description:
              "Festive dinner and a warm, high-energy dance floor at Houtbaar in Haarlem, The Netherlands. Dinner at 18:00, dance from 20:00. Line-up: Boyos Soundsystem with guest DJ TBA.",
          }),
        }}
      />
      )}
      <div
        className="theme-core min-h-screen"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
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
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{
              backgroundColor: "#3F6949",
              color: "#F8F4E8",
              minHeight: `${QUICK_FACTS_HEIGHT}px`,
              boxShadow: showStickyCta
                ? "0 18px 40px rgba(27, 18, 18, 0.35)"
                : "none",
            }}
            aria-label="Event quick facts and actions"
          >
            <div className="mx-auto max-w-[500px] px-3 py-2 text-[12px] sm:text-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex items-center gap-2 sm:flex-shrink-0">
                  <p className="font-semibold leading-snug tracking-wide text-left text-[#F8F4E8] sm:flex-1 sm:truncate">
                    Fri 19 Dec - Boyos Wonderland Dine & Dance - Houtbaar,
                    Haarlem - Dinner 18:00 - Free Dance 20:00
                  </p>
                  <a
                    href={nextEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#FFB332] px-4 py-2 text-[#1B1212] text-sm font-semibold shadow shadow-[#1B1212]/10 transition-transform hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC75B]"
                  >
                    Tickets
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
              {nextEvent && (
              <a
                href={nextEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FFD700]"
                onClick={() => setMenuOpen(false)}
              >
                Tickets
              </a>
              )}
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
            id="events-old"
            className="hidden bg-[#F0E68C] text-[#8B008B] px-6 py-12"
          >
            <h2
              className="uppercase font-[anton] tracking-wider sticky z-10 bg-[#F0E68C] text-4xl text-[#8B008B] py-8 transition-all duration-300"
              style={{ top: stickyHeadlineOffset }}
            >
              No Events Scheduled
            </h2>
            {/* <div className="mb-12">
              <img
                src="/images/events/dine_and_dance_2.png"
                alt="Dine & Dance poster"
                className="mb-6"
              />
              <h3 className="uppercase text-3xl font-[anton] uppercase tracking-wider font-bold mb-6">
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
                  onClick={() => trackPiratepx("cta_whatsapp")}
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
                  onClick={() => trackPiratepx("cta_instagram")}
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
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="currentColor"
                      ></path>{" "}
                      <path
                        d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                        fill="currentColor"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                        fill="currentColor"
                      ></path>{" "}
                    </g>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </section>
          {/* FEATURE EVENT (Oct 17) */}
          <section
            id="events"
            className="relative theme-event"
            aria-labelledby="events-heading"
            style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
          >
            <div className="grain pointer-events-none absolute inset-0" />
            <div className="parallax-glow" aria-hidden="true" />
            <div className="px-6 py-16 text-left">
              <h2 id="events-heading" className="sr-only">
                Upcoming events
              </h2>
              <div className="mx-auto max-w-3xl">
                <div className="text-center py-12">
                  <h2 className="font-[anton] uppercase text-5xl sm:text-6xl leading-[0.95] mb-6" style={{ color: "var(--event-accent-1)" }}>
                    Brewing New Editions
                  </h2>
                  <p className="text-xl sm:text-2xl mb-6 leading-relaxed">
                    We currently have no Wonderland events scheduled, but we're working on something special.
                  </p>
                  <p className="text-lg opacity-90 mb-8">
                    Our Dine & Dance events and Mini Festival were incredible, and we're excited to bring you new experiences.
                  </p>
                  <p className="text-lg opacity-90 mb-8 font-semibold">
                    Stay tuned for updates — follow us to be the first to know when the next edition drops.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center items-center">
                    <a
                      href="https://chat.whatsapp.com/CB2AbyXgPYH3eUphbKVyQR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-lg font-bold underline hover:opacity-80 transition"
                      onClick={() => trackPiratepx("cta_whatsapp_brewing")}
                      style={{ color: "var(--event-accent-1)" }}
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
                      className="flex items-center gap-2 text-lg font-bold underline hover:opacity-80 transition"
                      onClick={() => trackPiratepx("cta_instagram_brewing")}
                      style={{ color: "var(--event-accent-1)" }}
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
                          {" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                            fill="currentColor"
                          ></path>{" "}
                          <path
                            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                            fill="currentColor"
                          ></path>{" "}
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                            fill="currentColor"
                          ></path>{" "}
                        </g>
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* PHOTO ALBUMS CAROUSEL */}
          <PhotoAlbums albums={photoAlbums} onTrack={trackPiratepx} />

          {/* Sticky mobile CTA */}
          {nextEvent && (
          <div
            className={`sm:hidden fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 ${
              showStickyCta
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3 pointer-events-none"
            }`}
          >
            <div
              className="flex items-center justify-between gap-3 rounded-full px-3 py-2"
              style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
            >
              <a
                href={nextEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reserve dinner for Boyos Wonderland Dine & Dance Christmas Special"
                onClick={() => trackPiratepx("cta_tickets_dec19_sticky")}
                className="flex-1 text-center px-4 py-3 text-black font-bold rounded-full focus-visible:outline focus-visible:outline-offset-2"
                style={{ backgroundColor: "var(--event-accent-1)" }}
              >
                Reserve Dinner
              </a>
              <span
                className="text-[11px] px-3 py-2 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "var(--event-off)",
                }}
              >
                Free from 20:00
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
  );
}
