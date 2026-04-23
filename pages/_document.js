import Document, { Html, Head, Main, NextScript } from 'next/document'

const APP_NAME = 'Boyos Collective'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Limelight&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preload"
            href="/fonts/Moret-Regular.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Moret-Bold.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <script src="https://w.soundcloud.com/player/api.js" async></script>

          <link rel="icon" href="/favicon.ico" />

          {/* add your own app-icon */}
          {/* <link
               rel="apple-touch-icon"
               sizes="180x180"
               href="/icons/apple-touch-icon.png"
             />
             <link rel="shortcut icon" href="/app-icon.png" /> */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Cloudflare Web Analytics */}
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}"}`}
          />
          {/* End Cloudflare Web Analytics */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
