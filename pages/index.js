import Head from "next/head";
import Header from "@components/Header";

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

      <main className="container mx-auto">
        <Header title="Boyos Collective" />
      </main>
    </div>
  );
}
