import { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import BoyosVinyl from "../public/images/boyos_vinyl.png";

export default function Soundsystem() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startVinyl = () => {
    setIsPlaying(true);
  };
  const pauseVinyl = () => {
    setIsPlaying(false);
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap justify-center pt-20">
        <div className="w-full sm:w-4/12 px-4 flex flex-col">
          <div
            className={`${
              isPlaying ? "animate-spin-slow" : "animate-none"
            } mb-20`}
          >
            <Image
              src={BoyosVinyl}
              layout="responsive"
              objectFit="contain"
              height={450}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-4/12 px-4"></div>
        <ReactPlayer
          onPlay={startVinyl}
          onPause={pauseVinyl}
          url="https://soundcloud.com/boyos_soundsystem/"
          width="60%"
          height="250px"
        />
      </div>
    </div>
  );
}
