import React from "react";
import Script from "next/script";

import Layout from "components/layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <Script
        id="sender-universal"
        strategy="afterInteractive"
        src="https://cdn.sender.net/accounts_resources/universal.js"
        data-account-id={process.env.NEXT_PUBLIC_SENDER_ID}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  );
};

export default MyApp;
