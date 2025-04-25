import { useState } from "react";
import { useRouter } from "next/router"; // <-- Add this import
import ReactPlayer from "react-player";
import Image from "next/image";
import BoyosSoundsystem from "../public/images/boyos_we_got_the_funk.png";
import PastGigs from "../data/PastGigs.json";
import { NextSeo } from "next-seo";
import Footer from "../components/layout/Footer";

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
    title: "Tickets: Boyos Wonderland, The Dine and Dance Edition #2 [16-05]",
    url: "https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=9f7eee1f-5e6f-4488-867a-39e7c8be3b9e",
  },
  {
    id: idGen(),
    title:
      "Tickets: Boyos Wonderland mini festival w/ Another Taste (live) & more [28-06]",
    url: "https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=50d15694-0f22-4859-8c4c-df03dff309fc",
  },
  {
    id: idGen(),
    title: "Photo's Boyos Wonderland Dine and Dance 12.04.25",
    url: "https://1drv.ms/a/c/3ffa6c8616c781f7/EvRL9_kDsXRMmsdl2k9GgeEBlhZhAoiiBPnaoetFuPNylA?e=JcMCOh",
  },
  {
    id: idGen(),
    title: "Upcoming gigs",
    url: "https://www.instagram.com/p/DHdqWvQoedX/",
  },
  {
    id: idGen(),
    title: "Instagram",
    url: "https://www.instagram.com/boyos.soundsystem/",
  },
  {
    id: idGen(),
    title: "Boyos Wonderland",
    url: "/wonderland/",
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
];

const pastGigs = PastGigs.pastGigs;

export default function Soundsystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter(); // <-- Add this

  const startVinyl = () => setIsPlaying(true);
  const pauseVinyl = () => setIsPlaying(false);

  const onWonderland = (router) => router.push("/soundsystem");

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
      <div className="min-h-screen  flex flex-col items-center">
        <div className="w-full max-w-[500px] bg-[#EC90B0] mx-auto flex flex-col items-center px-4 py-8">
          <div className="w-50 flex flex-col items-center mb-8">
            <Image
              src={BoyosSoundsystem}
              layout="responsive"
              objectFit="contain"
              height={250}
              alt="Boyos Soundsytem Logo"
            />
          </div>
          <h1 className="text-3xl font-[pretoria] font-bold text-center mb-6 text-[#1B1212]">
            Boyos Soundsystem
          </h1>
          <h2 className="text-xl font-semibold mb-2 text-[#1B1212] underline font-[pretoria]">
            Our sets
          </h2>
          <div className="mb-6">
            <ReactPlayer
              onPlay={startVinyl}
              onPause={pauseVinyl}
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
          </div>
          <div className="mb-6">
            <ReactPlayer
              onPlay={startVinyl}
              onPause={pauseVinyl}
              playing={false}
              url="https://www.youtube.com/embed/TY_hzG5HY3k?si=fMlySfcUR3f-JNEF"
              width="100%"
              height="225px"
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            {linkTree.map((link) =>
              link.title === "Boyos Wonderland" ? (
                <button
                  key={link.id}
                  className="w-full py-3 px-4 rounded-lg bg-[#0085D0] text-white text-m font-semibold text-center hover:bg-[#0072B2] transition"
                  onClick={() => router.push(link.url)}
                  type="button"
                >
                  {link.title}
                </button>
              ) : (
                <a
                  key={link.id}
                  className="w-full py-3 px-4 rounded-lg bg-[#0085D0] text-white text-m font-semibold text-center hover:bg-[#0072B2] transition"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              )
            )}
          </div>
          <div className="mb-6 mt-8">
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
            className="text-xl font-semibold mb-2 text-[#1B1212] mt-8 underline font-[pretoria]"
          >
            Past Gigs
          </h2>
          <div className="bg-black px-4 py-4 rounded w-full">
            <ol className="relative border-l border-[#0084d0] bg-black">
              {pastGigs.map((gig, i) => (
                <li className="mb-10 ml-4" key={i}>
                  <div className="absolute w-3 h-3 bg-[#0084d0] rounded-full mt-1.5 -left-1.5 border border-[#0084d0]" />
                  <time className="mb-1 text-sm font-normal leading-none text-[#0084d0]">
                    {gig.monthYear}
                  </time>
                  <h3 className="text-lg font-bold text-[#EC90B0] font-[moret]">
                    {gig.title || gig.venue}
                  </h3>
                  <p className="mb-4 text-semibold text-white">{gig.venue}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="w-full max-w-[500px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
