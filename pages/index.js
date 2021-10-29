import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import styles from './splash.module.css'

export default function Home() {
  return (
    <div 
      // class={['c-modal__dialog', style['no-transition'], style.popover]}
      className={`${styles['background-splash']} container`}>
      <Head>
        <title>Boyos Collective</title>
        <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Boyos Collective" />
      </main>

      <Footer />
    </div>
  )
}
