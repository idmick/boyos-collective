import dynamic from 'next/dynamic'
import Header from './Header'
import { radioChannels } from '../../data/radio'

const RadioPlayer = dynamic(() => import('../RadioPlayer'), {
  ssr: false,
})

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-brand-deep))] pb-[86px] text-[var(--color-surface-paper)]">
      <Header />
      <main>{children}</main>
      <RadioPlayer channels={radioChannels} />
    </div>
  )
}

export default Layout
