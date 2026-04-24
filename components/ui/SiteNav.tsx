import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getNavigationForPath } from '../../data/navigation'

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  if (!href.startsWith('/')) return false
  const clean = href.split('#')[0]
  return clean !== '/' && pathname.startsWith(clean)
}

export default function SiteNav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items = getNavigationForPath(router.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setOpen(false), [router.asPath])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[200] flex items-center justify-between px-5 py-3 transition duration-300 md:px-10 ${
          scrolled
            ? 'border-b border-[color:rgb(var(--color-border-subtle)/0.8)] bg-[color:rgb(var(--color-brand-deep)/0.92)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md bg-[var(--color-surface-paper)] px-2.5 py-1 transition hover:opacity-85"
          aria-label="Boyos Collective home"
        >
          <Image
            src="/images/Boyos_logo_boxed.png"
            alt="Boyos"
            width={92}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${
                  isActive(router.pathname, item.href) ? 'nav-link-active' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`nav-hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[190] flex flex-col items-center justify-center gap-2 bg-[color:rgb(var(--color-brand-deep)/0.97)] backdrop-blur-xl transition duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`type-display text-[clamp(2.4rem,10vw,4rem)] tracking-[0.08em] text-[color:rgb(var(--color-surface-paper-rgb)/0.65)] transition hover:text-[var(--color-surface-paper)] ${
              isActive(router.pathname, item.href)
                ? 'text-[var(--color-surface-paper)]'
                : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}
