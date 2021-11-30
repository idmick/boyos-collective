import { useRouter } from "next/router";

import Image from "next/image";
import BoyosMerch from "../public/images/boyos_merch.jpeg";
import BoyosVinyl from "../public/images/boyos_vinyl.png";
import ByMickey from "../public/images/artworks/Greg.png";
import BoyosBoxed from "../public/images/Boyos_logo_boxed.png";

const Home = () => {
  const router = useRouter();

  return (
    <div className="container px-4 mx-auto h-screen">
      <div className="flex flex-wrap justify-center py-10 mb-10">
        <div className="w-full px-4 sm:w-4/12">
          <Image
            src={BoyosBoxed}
            layout="responsive"
            objectFit="contain"
            height={1000}
          />
          <p className="text-xl  text-center font-black font-limelight">
            a creative collective
          </p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full px-4 sm:w-4/12">
          <div className="card">
            <figure>
              <Image
                src={BoyosMerch}
                layout="responsive"
                objectFit="contain"
                height={600}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-limelight text-center">
                Boyos Merch
              </h2>
              <p>
                Boyos is an Amsterdam based fashion brand. Boyo is an old Irish
                term meaning good friend or brother. That is what Boyos is born
                from, a band of brothers. Join our band, buy our apparel
                designed by Mickey Anthony.
              </p>
              <div className="justify-end card-actions">
                <a
                  href="https://merch.boyoscollective.nl"
                  className="btn btn-secondary btn-outline btn-block"
                >
                  Checkout more
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:w-4/12">
          <div className="card">
            <figure>
              <Image
                src={BoyosVinyl}
                layout="responsive"
                objectFit="contain"
                height={450}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-limelight text-center">
                Boyos Soundsytem
              </h2>
              <p>
                Boyos Soundsystem is a group of three DJs (NMN, DiTomasso,
                Mickey) from Amsterdam, playing funky sets strictly on vinyl.
                Music ranges from Brazilian Boogie, Funky SOCA, to powerful
                Disco, House, and sometimes beyond. Key to our live sets is the
                energy we bring from behind the decks, which is loved and
                praised by the audience.
              </p>
              <div className="justify-end card-actions">
                <button
                  className="btn btn-secondary btn-outline btn-block"
                  onClick={() => router.push("/soundsystem")}
                >
                  Checkout more
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:w-4/12">
          <div className="card ">
            <figure className="rounded-full">
              <Image
                src={ByMickey}
                layout="responsive"
                objectFit="contain"
                height={4500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-limelight text-center">
                By Mickey
              </h2>
              <p>
                Baseball, Sports and Custom Artworks made by Mickey Anthony.
                Available in different sizes and materials (poster, aluminium /
                dibond en canvas).
              </p>
              <div className="justify-end card-actions">
                <a
                  href="https://www.bymickey.nl"
                  className="btn btn-secondary btn-outline btn-block"
                >
                  Checkout more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
