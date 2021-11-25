/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Boyos Collective",
  titleTemplate: "%s | nextarter-daisy",
  defaultTitle: "Boyos Collective",
  description:
    "An Amsterdam based creative collective (Music, Art and Merch) that stems from a close group of friends. Hence boyos, which is an old Irish term for good friend / brother",
  canonical: "https://boyoscollective.nl",
  alt: "boyoscollective.nl",
  openGraph: {
    url: "https://boyoscollective.nl",
    title: "Boyos Collective",
    description:
      "An Amsterdam based creative collective (Music, Art and Merch) that stems from a close group of friends. Hence boyos, which is an old Irish term for good friend / brother",
    images: [
      {
        url: "https://www.boyoscollective.nl/images/Boyos_logo_boxed.png",
        alt: "boyoscollective.nl og-image",
      },
    ],
    site_name: "Boyos Collective",
  },
};

export default defaultSEOConfig;
