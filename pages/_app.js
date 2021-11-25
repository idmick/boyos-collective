import { DefaultSeo } from "next-seo";

import defaultSEOConfig from "../next-seo.config";
import Layout from "components/layout";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <DefaultSeo {...defaultSEOConfig} />
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
