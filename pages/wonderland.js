import { NextSeo } from "next-seo";
import { useState } from "react";
import dynamic from "next/dynamic";
import RadioPlayer from "../components/RadioPlayer";
import WonderlandLogo from "../components/WonderlandLogo";

export default function BoyosWonderlandPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
    ssr: false,
  });

  const CTAButton = ({ href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 text-2xl font-[moret]  px-6 py-2 bg-yellow-400 font-medium rounded-full max-w-fit w-fit flex-none hover:bg-yellow-500 text-[#1B1212] "
    >
      {label}
    </a>
  );

  const CTAButtonSecond = ({ href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex text-2xl font-[moret] font-bold underline gap-2 text-[#F0E2D4] hover:text-[#45120F] max-w-fit w-fit"
    >
      {label}
    </a>
  );

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

  return (
    <>
      <NextSeo
        title="Boyos Wonderland"
        description="Boyos Wonderland is a unique Amsterdam party series blending music, art, food, tattoos, and immersive experiences. Step into a world where groove sparks imagination and every rhythm invites adventure."
        openGraph={{
          url: "https://www.boyoscollective.nl/wonderland",
          title: "Boyos Wonderland",
          description:
            "Boyos Wonderland is a unique Amsterdam party series blending music, art, food, and immersive experiences. Step into a world where groove sparks imagination and every rhythm invites adventure.",
          images: [
            {
              url: "https://www.boyoscollective.nl/images/essential_groove.png",
              alt: "Boyos Wonderland og-image",
            },
          ],
          siteName: "Boyos Collective",
        }}
      />
      <div className="bg-[#FAF4EB]">
        <RadioPlayer
          channels={channels}
          clientId="sQHBwYwmzeqpmKktQSeKYpDpE1YsCSWl"
        />

        <div className="relative flex flex-col scroll-smooth max-w-[500px] mx-auto bg-neutral-100 text-[#1B1212] font-sans">
          {/* FLOATING MENU BUTTON */}
          <button
            className="fixed top-4 right-4 z-50 bg-[#F9ABC5] text-[#1B1212] font-bold p-3 rounded-full  shadow-lg hover:text-[#641B16]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            ☰
          </button>

          <img
            src="/images/cover.png"
            className="fixed top-0 bottom-0 left-0 h-screen object-none z-40 pointer-events-none"
            alt="essential groove logo"
          />

          {menuOpen && (
            <div
              id="mobile-menu"
              className="fixed inset-0 bg-[#F9ABC5]  text-[#1B1212] font-[moret] flex flex-col items-center justify-center gap-8 text-4xl font-bold z-50 "
              role="dialog"
              aria-modal="true"
            >
              <button
                className="absolute hover:text-[#641B16] font-bold top-6 right-6 text-3xl"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
              <a
                href="#about"
                className="hover:text-[#641B16]"
                onClick={() => setMenuOpen(false)}
              >
                Our Story
              </a>
              <a
                href="#events"
                className="hover:text-[#641B16]"
                onClick={() => setMenuOpen(false)}
              >
                Events
              </a>
              <a
                href="#cta"
                className="hover:text-[#641B16]"
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
            className="bg-[#F9ABC5] px-6 py-12 text-left text-[#641B16]"
          >
            <h2 className="uppercase  font-[pretoria] tracking-wider sticky top-0 z-10 bg-[#F9ABC5] text-4xl text-[#641B16]  py-8">
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
          <section id="events" className="bg-[#FAF4EB] px-6 py-12">
            <h2 className="uppercase  font-[pretoria] tracking-wider sticky top-0 z-10 bg-[#f9f4ec] text-4xl text-[#1B1212]  py-8">
              Events
            </h2>
            <div className="mb-12">
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
              {
                <CTAButton
                  href="https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=9f7eee1f-5e6f-4488-867a-39e7c8be3b9e"
                  label="Get Tickets"
                ></CTAButton>
              }
            </div>
            <div>
              <img
                src="/images/events/mini_festival.png"
                alt="Mini Festival poster"
                className="mb-6"
              />
              <h3 className="uppercase text-3xl font-[pretoria] tracking-wider font-bold mb-6">
                Mini Festival
              </h3>
              <p className="text-2xl font-[moret]  mb-1">
                Our season finale in Houtbaar’s garden. Live music, DJs, food,
                and tattoos. A day-to-night trip built around the essential
                groove.
              </p>
              <p className="text-2xl font-[moret] font-bold mb-6">
                28 June from 15:00 – 23:00 at Houtbaar
              </p>
              <p className="text-2xl font-[moret] mb-6">
                Early entry tickets from{" "}
                <span className="font-bold">€13.50</span>, limited spots
                available
              </p>
              {
                <CTAButton
                  href="https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=50d15694-0f22-4859-8c4c-df03dff309fc"
                  label="Get Tickets"
                ></CTAButton>
              }
            </div>
          </section>

          {/* CTA */}
          <section
            id="cta"
            className="bg-[#60B5C2] px-6 py-12 text-center text-[#1B1212]"
          >
            <h2 className="uppercase  sticky top-0 z-10 bg-[#60B5C2] text-4xl text-left text-[#1B1212]  py-8 font-[pretoria] tracking-wider">
              Stay Up to Date
            </h2>
            <p className="mb-8 max-w-sm text-left text-2xl font-[moret]">
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
              {/* {
            <CTAButtonSecond
              href=""
              label="Subscribe to our newsletter"
            ></CTAButtonSecond>
          } */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
