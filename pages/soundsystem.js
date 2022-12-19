import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import BoyosVinyl from "../public/images/boyos_vinyl.png";
import PastGigs from "../data/PastGigs.json";

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
    title: "Open Source Radio 30/10/22 - Boyos Soundsysystem DJ Set (Youtube)",
    url: "https://www.youtube.com/watch?v=ANB1UNfqitE&t=3359s",
  },
  {
    id: idGen(),
    title: "Instagram",
    url: "https://www.instagram.com/boyos.soundsystem/",
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

const pastGigs = PastGigs.pastGigs

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
                  color: '#EC90B0',
                  sharing: true,
                  auto_play: true,
                }
              }
            }}
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
          <h2 id="past-gigs" className="text-xl font-semibold mb-2 text-primary-content mt-8 underline">
            Past Gigs
          </h2>
          <div className="bg-black px-8 py-4 rounded">
          <ol className="relative border-l border-primary back bg-black">
            {pastGigs.map((gig) => {
              return (
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-primary" />
                  <time className="mb-1 text-sm font-normal leading-none text-white">{gig.monthYear}</time>
                  <h3 className="text-lg font-bold text-primary">{gig.title || gig.venue}</h3>
                  <p className="mb-4 text-semibold text-white" style={{ color: "#EC90B0" }}>{gig.venue}</p>
                </li>
              );
            })}

          </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
