import { DefaultSeo } from "next-seo";
import React from "react";

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
    </React.StrictMode>
  );
};

export default MyApp;
