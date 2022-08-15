import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import BoyosVinyl from "../public/images/boyos_vinyl.png";

const idGen = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const linkTree = [
  {
    id: idGen(),
    title: "Like what you heard? Support us",
    url: "https://bunq.me/BoyosSoundsystem",
  },
  {
    id: idGen(),
    title: "Instagram",
    url: "https://www.instagram.com/boyos.collective/",
  },
  {
    id: idGen(),
    title: "Bookings",
    url: "mailto:soundsystem@boyoscollective.nl?subject=Booking: ...",
  },
  {
    id: idGen(),
    title: "Resident Advisor",
    url: "https://ra.co/dj/boyossoundsystem",
  },
  {
    id: idGen(),
    title: "Twitch Live Streams",
    url: "https://www.twitch.tv/boyos_soundsystem",
  },
  {
    id: idGen(),
    title: "Spotify Playlist",
    url: "https://open.spotify.com/playlist/4x9nUqSbxBrwtTQ52iQ5lW?si=0a982c62d80e46b7",
  },
  {
    id: idGen(),
    title: "Merch",
    url: "https://merch.boyoscollective.nl/",
  },
];

const pastGigs = [
  {
    title: 'De Binnenstad',
    venue: 'Club Atelier',
    monthYear: 'Aug 2022'
  },
  {
    title: 'Night Café w// Boyos Soundsystem',
    venue: 'Club Atelier',
    monthYear: 'Jun 2022'
  },
  {
    title: 'Night Café w// Boyos Soundsystem',
    venue: 'Club Atelier',
    monthYear: 'Jun 2022'
  },
  {
    title: 'Chez Miné',
    venue: 'Chez Miné',
    monthYear: 'Jun 2022'
  },
  {
    title: 'Festival de Zon',
    venue: 'NDSM Werf',
    monthYear: 'Jun 2022'
  },
  {
    title: 'Chez Miné',
    venue: 'Chez Miné',
    monthYear: 'May 2022'
  },
  {
    title: 'Pizza Club',
    venue: 'Pizza Club @ Scheveningen strand',
    monthYear: 'May 2022'
  },
  {
    title: 'Chez Miné',
    venue: 'Chez Miné',
    monthYear: 'Apr 2022'
  },
  {
    title: 'Chez Miné',
    venue: 'Chez Miné',
    monthYear: 'Mar 2022'
  },
  {
    title: 'Barca',
    venue: 'Bar Barca',
    monthYear: 'Mar 2022'
  },
  {
    title: 'Mama Gaia Talks',
    venue: 'Mama Gaia',
    monthYear: 'Mar 2022'
  },
  {
    title: 'Mama Gaia Talks',
    venue: 'Mama Gaia',
    monthYear: 'Mar 2022'
  },
  {
    title: 'Burning Down The House',
    venue: 'Kano, Brussels',
    monthYear: 'Feb 2022'
  },
  {
    title: 'Mama Gaia Talks',
    venue: 'Mama Gaia',
    monthYear: 'Nov 2021'
  },
]

export default function Soundsystem() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startVinyl = () => {
    setIsPlaying(true);
  };
  const pauseVinyl = () => {
    setIsPlaying(false);
  };

  return (
    <div className="container-fluid px-4 pb-10 mx-auto bg-secondary">
      <div className="flex flex-wrap justify-center items-center pt-5 mb-5">
        <div className="w-full sm:w-4/12 px-4 flex flex-col">
          <div
            className={`${isPlaying ? "animate-spin-slow" : "animate-none"}`}
          >
            <Image
              src={BoyosVinyl}
              layout="responsive"
              objectFit="contain"
              height={450}
            />
          </div>
          <h1 className="text-3xl font-bold text-center mt-5 font-limelight text-primary-content">
            Boyos Soundsystem
          </h1>
          <div className="flex justify-center relative mb-6">
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
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-8/12 px-4">
          <h2 className="text-xl font-semibold mb-2 text-primary-content underline  ">
            Our DJ sets
          </h2>
          <ReactPlayer
            onPlay={startVinyl}
            onPause={pauseVinyl}
            url="https://soundcloud.com/boyos_soundsystem/"
            width="100%"
            height="225px"
          />
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
          <h2 className="text-xl font-semibold mb-2 text-primary-content mt-8 underline">
            Past Gigs
          </h2>
          <ol class="relative border-l border-gray-200">
            {pastGigs.map((gig) => {
              return (
                <li class="mb-10 ml-4">
                  <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                  <time class="mb-1 text-sm font-normal leading-none text-white">{gig.monthYear}</time>
                  <h3 class="text-lg font-bold">{gig.title || gig.venue}</h3>
                  <p class="mb-4 text-semibold text-white">{gig.venue}</p>
                </li>
              );
            })}

          </ol>
        </div>
      </div>
    </div>
  );
}
