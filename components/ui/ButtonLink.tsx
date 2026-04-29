import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonTone = 'pink' | 'teal' | 'ink' | 'paper' | 'amber' | 'outline'

const toneClass: Record<ButtonTone, string> = {
  pink: 'btn-pink',
  teal: 'btn-teal',
  ink: 'btn-ink',
  paper: 'btn-paper',
  amber: 'btn-amber',
  outline: 'btn-outline',
}

type Props = {
  href: string
  children: ReactNode
  tone?: ButtonTone
  className?: string
}

export default function ButtonLink({
  href,
  children,
  tone = 'outline',
  className = '',
}: Props) {
  const classes = `btn type-control ${toneClass[tone]} ${className}`.trim()

  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
