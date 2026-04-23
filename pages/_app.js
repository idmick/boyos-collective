import { DefaultSeo } from "next-seo";
import React from "react";
import Script from "next/script";

import defaultSEOConfig from "../next-seo.config";
import Layout from "components/layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <Layout>
        {/* <DefaultSeo {...defaultSEOConfig} /> */}
        <Component {...pageProps} />
      </Layout>
      <Script
        id="sender-universal"
        src="https://cdn.sender.net/accounts_resources/universal.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.sender) window.sender(process.env.NEXT_PUBLIC_SENDER_ID)
        }}
      />
    </React.StrictMode>
  );
};

export default MyApp;
