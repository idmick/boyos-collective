import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: 'none' | 'short' | 'medium' | 'long'
  variant?: 'default' | 'text' | 'media' | 'card'
}

const delayClass = {
  none: '',
  short: 'reveal-delay-short',
  medium: 'reveal-delay-medium',
  long: 'reveal-delay-long',
}

const variantClass = {
  default: '',
  text: 'reveal-text',
  media: 'reveal-media',
  card: 'reveal-card',
}

export default function Reveal({
  children,
  className = '',
  delay = 'none',
  variant = 'default',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${
        delayClass[delay]
      } ${variantClass[variant]} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
