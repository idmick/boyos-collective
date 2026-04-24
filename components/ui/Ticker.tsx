import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Props = {
  items: string[]
  label?: string
  tone?: 'pink' | 'teal' | 'paper'
  reverse?: boolean
}

export default function Ticker({
  items,
  label,
  tone = 'pink',
  reverse = false,
}: Props) {
  const groupRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(36)

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const pixelsPerSecond = 80

    const updateDuration = () => {
      const singleLoopWidth = group.scrollWidth
      if (!singleLoopWidth) return
      const nextDuration = Math.max(
        20,
        Math.min(400, singleLoopWidth / pixelsPerSecond)
      )
      setDuration(nextDuration)
    }

    updateDuration()

    if (typeof ResizeObserver === 'undefined') return

    const resizeObserver = new ResizeObserver(() => {
      updateDuration()
    })

    resizeObserver.observe(group)
    return () => resizeObserver.disconnect()
  }, [items, label])

  const style = {
    '--ticker-duration': `${duration}s`,
  } as CSSProperties
  const renderGroup = (suffix: string) => (
    <div
      className="ticker-group"
      ref={suffix === 'primary' ? groupRef : undefined}
      aria-hidden={suffix !== 'primary'}
    >
      {items.map((item, index) => (
        <span className="ticker-item" key={`${suffix}-${item}-${index}`}>
          {label && index === 0 ? (
            <span className="ticker-label type-meta">{label}</span>
          ) : null}
          {item}
          <span className="ticker-dot">·</span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`ticker ${reverse ? 'ticker-reverse' : ''} ticker-${tone}`}
      aria-hidden="true"
    >
      <div className="ticker-track" style={style}>
        {renderGroup('primary')}
        {renderGroup('duplicate')}
      </div>
    </div>
  )
}
