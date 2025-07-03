import { useRouter } from 'next/router'
import Image from 'next/image'
// import BoyosMerch from "../public/images/boyos_merch.jpeg";
import BoyosVinyl from '../public/images/boyos_vinyl.png'
import BoyosBoxed from '../public/images/Boyos_logo_boxed.png'
import BoyosWonderland from '../public/images/essential_groove.png'
import { NextSeo, OrganizationJsonLd } from 'next-seo'
import Footer from '../components/layout/Footer'

const blocks = [
  {
    key: 'soundsystem',
    image: BoyosVinyl,
    imageProps: { objectFit: 'contain', height: 450 },
    title: 'Boyos Soundsystem',
    text: `Boyos Soundsystem, an Amsterdam-based trio of DJs - Nicolaas, Tomas, and Mick - are known for their electrifying sets across the Netherlands, transforming house parties into vibrant dance events. With their eclectic blend of Brazilian Boogie, Soca, Zouk, Italo, Disco, and Afro House, they have lit up stages at events such as De Zon Festival, Veerplas Festival, and the legendary Woodstock 69. Their performances are a unique journey through sound, creating unforgettable experiences. Join the groove and be part of their musical voyage. Stay groovy!`,
    cta: {
      type: 'button',
      label: 'CHECKOUT THE GROOVE',
      onClick: (router) => router.push('/soundsystem'),
      className:
        'w-full mt-2 py-2 px-4 border border-pink-300 text-pink-500 rounded transition hover:bg-pink-50 font-semibold',
    },
  },
  // {
  //   key: 'merch',
  //   image: BoyosMerch,
  //   imageProps: { objectFit: 'contain', height: 600 },
  //   title: 'Boyos Merch',
  //   text: `Boyos is an Amsterdam based fashion brand. Boyo is an old Irish term meaning good friend or brother. That is what Boyos is born from, a band of brothers. Join our band, buy our apparel designed by Mickey Anthony.`,
  //   cta: {
  //     type: 'link',
  //     label: 'CHECKOUT MORE',
  //     href: 'https://merch.boyoscollective.nl',
  //     className:
  //       'w-full mt-2 py-2 px-4 border border-pink-300 text-pink-500 rounded transition hover:bg-pink-100 font-semibold text-center',
  //   },
  // },
  {
    key: 'wonderland',
    image: BoyosWonderland,
    imageProps: { objectFit: 'cover', height: 460 },
    title: 'Boyos Wonderland',
    text: `Boyos Wonderland is our annual themed party in Amsterdam, bringing together music, art, and immersive experiences. Dive into a world of creativity and celebration with the Boyos crew!`,
    cta: {
      type: 'button',
      label: 'ENTER WONDERLAND',
      onClick: (router) => router.push('/wonderland'),
      className:
        'w-full mt-2 py-2 px-4 border border-pink-300 text-pink-500 rounded transition hover:bg-pink-100 font-semibold text-center',
    },
  },
]

const Home = () => {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title="Boyos Collective | DJ Collective Amsterdam, Haarlem & The Hague"
        description="Boyos Collective is a DJ collective based in Amsterdam, Haarlem & The Hague. We organize events, play at clubs and festivals, and bring people together through music, art, and creativity."
        canonical="https://www.boyoscollective.nl/"
        openGraph={{
          url: 'https://www.boyoscollective.nl/',
          title:
            'Boyos Collective | DJ Collective Amsterdam, Haarlem & The Hague',
          description:
            'Boyos Collective is a DJ collective based in Amsterdam, Haarlem & The Hague. We organize events, play at clubs and festivals, and bring people together through music, art, and creativity.',
          images: [
            {
              url: 'https://www.boyoscollective.nl/images/Boyos_logo_boxed.png',
              alt: 'Boyos Collective logo',
            },
          ],
          siteName: 'Boyos Collective',
        }}
      />
      <OrganizationJsonLd
        type="Organization"
        id="https://www.boyoscollective.nl"
        name="Boyos Collective"
        url="https://www.boyoscollective.nl"
        logo="https://www.boyoscollective.nl/images/Boyos_logo_boxed.png"
        sameAs={[
          'https://www.instagram.com/boyos.soundsystem/',
          'https://www.instagram.com/boyos.wonderland/',
          'https://ra.co/dj/boyossoundsystem',
          'https://soundcloud.com/boyos_soundsystem',
        ]}
        address={{
          streetAddress: 'N/A',
          addressLocality: 'Amsterdam',
          addressRegion: 'North Holland',
          postalCode: 'N/A',
          addressCountry: 'NL',
        }}
        contactPoint={[
          {
            telephone: 'N/A',
            contactType: 'Inquiries',
            email: 'info@boyoscollective.nl',
          },
        ]}
      />
      {/* Logo/Header */}
      <div className="w-full flex flex-col items-center py-10">
        <div className="w-full max-w-md flex flex-col items-center">
          <Image
            src={BoyosBoxed}
            layout="responsive"
            objectFit="contain"
            height={1000}
            alt="Boyos Collective Logo"
          />
          <p className="text-xl text-center font-black font-limelight mt-2">
            a creative collective
          </p>
        </div>
      </div>
      {/* Full-width, alternating blocks */}
      <div className="flex flex-col items-start md:flex-row w-full min-h-screen">
        {blocks.map((block, idx) => (
          <div
            key={block.key}
            className={`flex-1 flex flex-col justify-center items-center p-0 m-0`}
          >
            <div className="w-full max-w-lg flex flex-col items-center py-12 px-4">
              <div className="w-full">
                <Image
                  src={block.image}
                  layout="responsive"
                  objectFit={block.imageProps.objectFit}
                  height={block.imageProps.height}
                  alt={block.title}
                />
              </div>
              <h2 className="text-2xl font-[pretoria] font-bold text-center mt-4 mb-2 text-[#1B1212]">
                {block.title}
              </h2>
              <p className="text-sm text-[#1B1212] text-center mb-4">
                {block.text}
              </p>
              {block.cta.type === 'button' ? (
                <button
                  className={block.cta.className}
                  onClick={() => block.cta.onClick(router)}
                >
                  {block.cta.label}
                </button>
              ) : (
                <a
                  href={block.cta.href}
                  className={block.cta.className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.cta.label}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  )
}

export default Home
