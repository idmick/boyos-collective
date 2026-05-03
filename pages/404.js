import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { generateNextSeo } from 'next-seo/pages'
import BoyosBoxed from '../public/images/Boyos_logo_boxed.png'

const Page404 = () => {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Page Not Found | Boyos Collective',
          description:
            'This Boyos Collective page could not be found, but the music, events and community are still close by.',
          canonical: 'https://www.boyoscollective.nl/',
          noindex: true,
          openGraph: {
            url: 'https://www.boyoscollective.nl/',
            title: 'Page Not Found | Boyos Collective',
            description:
              'This Boyos Collective page could not be found, but the music, events and community are still close by.',
            images: [
              {
                url: 'https://www.boyoscollective.nl/images/Boyos_logo_boxed.png',
                width: 3260,
                height: 1284,
                type: 'image/png',
                alt: 'Boyos Collective logo',
              },
            ],
            siteName: 'Boyos Collective',
          },
          twitter: {
            cardType: 'summary_large_image',
          },
          additionalMetaTags: [
            {
              name: 'twitter:title',
              content: 'Page Not Found | Boyos Collective',
            },
            {
              name: 'twitter:description',
              content:
                'This Boyos Collective page could not be found, but the music, events and community are still close by.',
            },
            {
              name: 'twitter:image',
              content:
                'https://www.boyoscollective.nl/images/Boyos_logo_boxed.png',
            },
            {
              name: 'twitter:image:alt',
              content: 'Boyos Collective logo',
            },
          ],
        })}
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-brand-primary)] px-4 text-[var(--color-text-primary)]">
        <div className="flex flex-col items-center">
          <Image
            src={BoyosBoxed}
            width={300}
            height={300}
            alt="Boyos Collective Logo"
            className="mb-6"
          />
          <h1 className="type-display mb-2 text-7xl tracking-[0.08em]">
            404
          </h1>
          <h2 className="type-display mb-4 text-2xl">Page Not Found</h2>
          <p className="type-accent mb-8 max-w-md text-center text-lg leading-8">
            Oops! The page you’re looking for doesn’t exist.
            <br />
            But the groove never stops at Boyos Collective.
          </p>
          <Link href="/" passHref>
            <button
              type="button"
              className="btn btn-ink"
            >
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Page404
