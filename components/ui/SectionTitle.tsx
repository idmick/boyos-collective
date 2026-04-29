type Props = {
  eyebrow?: string
  title: string
  dark?: boolean
}

export default function SectionTitle({ eyebrow, title, dark = true }: Props) {
  return (
    <div>
      {eyebrow ? (
        <span className={`eyebrow ${dark ? '' : 'eyebrow-dark'}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`section-title type-display ${dark ? '' : 'section-title-dark'}`}>
        {title}
      </h2>
    </div>
  )
}
