import { useRouter } from "next/router";

import Image from "next/image";
import BoyosMerch from "../public/images/boyos_merch.jpeg";
import BoyosVinyl from "../public/images/boyos_vinyl.png";
// import ByMickey from "../public/images/artworks/Greg.png";
import BoyosBoxed from "../public/images/Boyos_logo_boxed.png";
import { NextSeo } from 'next-seo';

const Home = () => {
  const router = useRouter();

  return (
    <>
    <NextSeo
      title="Boyos Collective"
      description='Boyos Collective is a vibrant Amsterdam-based community of artists and creators. At the heart of Boyos is a close-knit group of friends, united by their shared passion for music, art, and fashion. The name "Boyos" itself is derived from an old Irish term meaning "good friend" or "brother," perfectly capturing the sense of camaraderie and collaboration that drives the collective forward. Whether through their music, their art, or their merchandise, Boyos Collective is dedicated to sharing their unique vision with the world, and bringing people together through the power of creativity and self-expression.'
      openGraph={{
        url: 'https://www.boyoscollective.nl/',
        title: 'Boyos Collective',
        description: 'Boyos Collective is a vibrant Amsterdam-based community of artists and creators. At the heart of Boyos is a close-knit group of friends, united by their shared passion for music, art, and fashion. The name "Boyos" itself is derived from an old Irish term meaning "good friend" or "brother," perfectly capturing the sense of camaraderie and collaboration that drives the collective forward. Whether through their music, their art, or their merchandise, Boyos Collective is dedicated to sharing their unique vision with the world, and bringing people together through the power of creativity and self-expression.',
        images: [
          {
            url: "https://www.boyoscollective.nl/images/Boyos_logo_boxed.png",
            alt: "boyoscollective.nl og-image",
          },
        ],
        siteName: 'Boyos Collective',
      }}
    />
      <div className="container px-4 mx-auto">
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
                Boyos Soundsystem, an Amsterdam-based trio of DJs - Nicolaas, Tomas, and Mick - are known for their electrifying sets across the Netherlands, transforming house parties into vibrant dance events. With their eclectic blend of Brazilian Boogie, Soca, Zouk, Italo, Disco, and Afro House, they have lit up stages at events such as De Zon Festival, Veerplas Festival, and the legendary Woodstock 69. Their performances are a unique journey through sound, creating unforgettable experiences. Join the groove and be part of their musical voyage. Stay groovy!
                </p>
                <div className="justify-end card-actions">
                  <button
                    className="btn btn-secondary btn-outline btn-block"
                    onClick={() => router.push("/soundsystem")}
                  >
                    Checkout the Groove
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full px-4 sm:w-4/12">
            <div className="card">
              <figure className="rounded-full">
                <Image
                  src={ByMickey}
                  layout="responsive"
                  objectFit="contain"
                  height={460}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-spicyrice text-center">
                  By Mickey
                </h2>
                <p>
                  Baseball, Sports and Custom Artworks made by Mickey Anthony.
                  Available in different sizes and materials (poster, aluminium /
                  dibond and canvas).
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
