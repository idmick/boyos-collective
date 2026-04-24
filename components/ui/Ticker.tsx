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
  const repeated = [...items, ...items, ...items]
  return (
    <div
      className={`ticker ${reverse ? 'ticker-reverse' : ''} ticker-${tone}`}
      aria-hidden="true"
    >
      <div className="ticker-track">
        {repeated.map((item, index) => (
          <span className="ticker-item" key={`${item}-${index}`}>
            {label && index % items.length === 0 ? (
              <span className="ticker-label type-meta">{label}</span>
            ) : null}
            {item}
            <span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
