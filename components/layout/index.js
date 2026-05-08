import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from './Header'
import { radioChannels } from '../../data/radio'

const RadioPlayer = dynamic(() => import('../RadioPlayer'), {
  ssr: false,
})

const Layout = ({ children }) => {
  const [showRadio, setShowRadio] = useState(false)

  useEffect(() => {
    const schedule =
      window.requestIdleCallback ||
      ((callback) => window.setTimeout(callback, 1200))
    const cancel =
      window.cancelIdleCallback || ((id) => window.clearTimeout(id))
    const id = schedule(() => setShowRadio(true))

    return () => cancel(id)
  }, [])

  return (
    <div className="min-h-screen bg-[rgb(var(--color-brand-deep))] pb-[128px] text-[var(--color-surface-paper)] md:pb-[86px]">
      <Header />
      <main>{children}</main>
      {showRadio ? <RadioPlayer channels={radioChannels} /> : null}
    </div>
  )
}

export default Layout
