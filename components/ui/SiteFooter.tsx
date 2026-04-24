import Image from 'next/image'
import Link from 'next/link'
import { footerNavigation } from '../../data/navigation'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="flex justify-center gap-4 md:justify-start">
          <Image
            src="/images/boyos_we_got_the_funk.png"
            alt="Boyos Soundsystem"
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-full object-contain opacity-75 transition hover:opacity-100"
          />
          <Image
            src="/images/essential_groove.png"
            alt="Essential Groove"
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-full object-contain opacity-75 transition hover:opacity-100"
          />
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/Boyos_logo_boxed.png"
            alt="Boyos Collective"
            width={116}
            height={38}
            className="h-[38px] w-auto opacity-70 invert"
          />
        </div>

        <nav className="footer-nav-stack md:items-end">
          {footerNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="site-footer-copy">
        <span>© 2026 Boyos Collective · Amsterdam</span>
        <span>boyoscollective.nl</span>
      </div>
    </footer>
  )
}
