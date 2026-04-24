import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: 'none' | 'short' | 'medium' | 'long'
}

const delayClass = {
  none: '',
  short: 'reveal-delay-short',
  medium: 'reveal-delay-medium',
  long: 'reveal-delay-long',
}

export default function Reveal({
  children,
  className = '',
  delay = 'none',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
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
      } ${className}`.trim()}
    >
      {children}
    </div>
  )
}
