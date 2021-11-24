import Head from "next/head";
import Header from "@components/Header";
import Page from "@components/Page";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Boyos Collective</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Limelight&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css"
          type="text/css"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Page className="center-xs middle-xs">
          <Header title="Boyos Collective" />
          <div className="row fluid">
            <div className="col-xs-4">
              <div className={styles["box"]}>
                <h3>Merch</h3>
              </div>
            </div>
            <div className="col-xs-4">
              <div className={styles["box"]}>
                <h3>Boyos Soundsytem</h3>
              </div>
            </div>
            <div className="col-xs-4">
              <div className={styles["box"]}>
                <h3>Artworks</h3>
              </div>
            </div>
          </div>
        </Page>
      </main>
    </div>
  );
}
