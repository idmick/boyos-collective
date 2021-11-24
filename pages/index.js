import Head from "next/head";
import Header from "@components/Header";
import Page from "@components/Page";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Boyos Collective</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Limelight&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Page className="center-xs middle-xs">
          <Header title="Boyos Collective" />
        </Page>
      </main>
    </div>
  );
}
