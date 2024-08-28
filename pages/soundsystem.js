import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import BoyosSoundsystem from "../public/images/boyos_we_got_the_funk.png";
import PastGigs from "../data/PastGigs.json";
import { NextSeo } from "next-seo";

const idGen = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const linkTree = [
  // {
  //   id: idGen(),
  //   title: "Like what you heard? Support us",
  //   url: "https://bunq.me/BoyosSoundsystem",
  // },
  {
    id: idGen(),
    title: "Tickets: Woodstock presents Sunday Night Fever [15-09]",
    url: "https://shop.eventix.io/8d4903df-ea79-4ef7-9512-9938f7678341/tickets?shop_code=tced3g96",
  },
  {
    id: idGen(),
    title: "Upcoming gigs",
    url: "https://www.instagram.com/p/C_NqbziIapk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: idGen(),
    title: "Instagram",
    url: "https://www.instagram.com/boyos.soundsystem/",
  },
  {
    id: idGen(),
    title: "Boyos Wonderland",
    url: "https://www.instagram.com/boyos.wonderland/",
  },
  {
    id: idGen(),
    title: "Join our WhatsApp Comunnity",
    url: "https://chat.whatsapp.com/CB2AbyXgPYH3eUphbKVyQR",
  },
  {
    id: idGen(),
    title: "Essential Groove - Spotify Playlist",
    url: "https://open.spotify.com/playlist/0sB9bNTv9HNaGlIC5KyLuH?si=8035d8a8a8bd4c7f",
  },
  {
    id: idGen(),
    title: "Resident Advisor",
    url: "https://ra.co/dj/boyossoundsystem",
  },
  {
    id: idGen(),
    title: "Book us - Get in contact",
    url: "mailto:soundsystem@boyoscollective.nl?subject=Booking: ...",
  },

  // {
  //   id: idGen(),
  //   title: "Twitch Live Streams",
  //   url: "https://www.twitch.tv/boyos_soundsystem",
  // },
  {
    id: idGen(),
    title: "Merch",
    url: "https://merch.boyoscollective.nl/",
  },
];

const pastGigs = PastGigs.pastGigs;

export default function Soundsystem() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startVinyl = () => {
    setIsPlaying(true);
  };
  const pauseVinyl = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <NextSeo
        title="Boyos Soundsystem"
        description="Boyos Soundsystem is a dynamic trio of DJs who bring a blend of vinyl and digital music to the dance floor. Their sets are filled with funky, high-energy beats across a variety of genres including Brazilian Boogie, Soca, Zouk, Italo, Disco, and (Afro) House. With their signature style and energy behind the decks, Boyos Soundsystem always knows how to get a crowd moving. Catch them at a venue near you and join in on the fun on the dance floor."
        openGraph={{
          url: "https://www.boyoscollective.nl/soundsystem",
          title: "Boyos Soundsystem",
          description:
            "Boyos Soundsystem is a dynamic trio of DJs who bring a blend of vinyl and digital music to the dance floor. Their sets are filled with funky, high-energy beats across a variety of genres including Brazilian Boogie, Soca, Zouk, Italo, Disco, and (Afro) House. With their signature style and energy behind the decks, Boyos Soundsystem always knows how to get a crowd moving. Catch them at a venue near you and join in on the fun on the dance floor.",
          images: [
            {
              url: "https://www.boyoscollective.nl/images/Boyos_we_got_the_funk - square.png",
              alt: "Boyos Soundsytem og-image",
            },
          ],
          siteName: "Boyos Collective",
        }}
      />
      <div className="container-fluid px-4 pb-10 mx-auto bg-secondary">
        <div className="flex flex-wrap justify-center items-center pt-5 mb-5">
          <div className="w-full sm:w-4/12 px-4 flex flex-col">
            <div
            // className={`${isPlaying ? "animate-spin-slow" : "animate-none"}`}
            >
              <Image
                src={BoyosSoundsystem}
                layout="responsive"
                objectFit="contain"
                height={450}
                alt="Boyos Soundsytem Logo"
              />
            </div>
            {/* <h1 className="text-3xl font-bold text-center mt-5 font-limelight text-primary-content">
            Boyos Soundsystem
          </h1> */}
            {/* <div className="flex justify-center relative mb-6">
            <span
              className="absolute bg-primary"
              style={{
                width: "222px",
                height: "1.5rem",
              }}
            />
            <span className="text-2xl font-bold font-limelight absolute top-1">
              We Got The Funk
            </span>
            <span
              className="text-2xl font-bold font-limelight absolute"
              style={{ color: "#EC90B0" }}
            >
              We Got The Funk
            </span>
          </div> */}
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-8/12 px-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-content underline  ">
              Our sets
            </h2>
            <ReactPlayer
              onPlay={startVinyl}
              onPause={pauseVinyl}
              // playing={true}
              url="https://soundcloud.com/boyos_soundsystem/"
              width="100%"
              height="225px"
              config={{
                soundcloud: {
                  options: {
                    color: "#EC90B0",
                    sharing: true,
                    auto_play: true,
                  },
                },
              }}
            />
            <div className="pt-5">
              <ReactPlayer
                onPlay={startVinyl}
                onPause={pauseVinyl}
                playing={false}
                url="https://www.youtube.com/embed/TY_hzG5HY3k?si=fMlySfcUR3f-JNEF"
                width="100%"
                height="225px"
              />
            </div>
            {linkTree.map((link) => {
              return (
                <div className="pt-5" key={link.id}>
                  <a
                    className="btn btn-block btn-primary"
                    href={link.url}
                    target={link.title === "Bookings" ? "" : "_blank"}
                  >
                    {link.title}
                  </a>
                </div>
              );
            })}
            <div className="pt-5">
              <ReactPlayer
                onPlay={startVinyl}
                onPause={pauseVinyl}
                playing={false}
                url="https://www.youtube.com/watch?v=ANB1UNfqitE&t=3359s"
                width="100%"
                height="225px"
              />
            </div>
            <h2
              id="past-gigs"
              className="text-xl font-semibold mb-2 text-primary-content mt-8 underline"
            >
              Past Gigs
            </h2>
            <div className="bg-black px-8 py-4 rounded">
              <ol className="relative border-l border-primary back bg-black">
                {pastGigs.map((gig) => {
                  return (
                    <li className="mb-10 ml-4">
                      <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-primary" />
                      <time className="mb-1 text-sm font-normal leading-none text-white">
                        {gig.monthYear}
                      </time>
                      <h3 className="text-lg font-bold text-primary">
                        {gig.title || gig.venue}
                      </h3>
                      <p
                        className="mb-4 text-semibold text-white"
                        style={{ color: "#EC90B0" }}
                      >
                        {gig.venue}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
