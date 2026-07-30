import React from 'react'
import Layout from '../components/layout'
import Grain from '../components/ui/Grain'
import MotionEffects from '../components/ui/MotionEffects'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <React.StrictMode>
      <Grain />
      <MotionEffects />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  )
}

export default MyApp
