import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

const summerJamPagePath = path.join(
  process.cwd(),
  'pages/wonderland/summer-jam.js'
)
const summerJamPageSource = fs.readFileSync(summerJamPagePath, 'utf8')

describe('pages/wonderland/summer-jam.js', () => {
  it('keeps the structured data offer validFrom date', () => {
    expect(summerJamPageSource).toContain(
      "validFrom: '2026-05-03T00:00:00+02:00'"
    )
  })

  it('omits the Open Jam slot from performer structured data', () => {
    expect(summerJamPageSource).toContain(
      ".filter((act) => act.name !== 'Open Jam')"
    )
  })

  it('maps group acts to MusicGroup in performer structured data', () => {
    expect(summerJamPageSource).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(summerJamPageSource).toContain("? 'MusicGroup'")
    expect(summerJamPageSource).toContain(": 'Person'")
  })
})
