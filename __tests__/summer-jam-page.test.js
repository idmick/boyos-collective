import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const summerJamPageSource = readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('Summer Jam page source', () => {
  it('keeps the offer validFrom metadata and performer schema mapping', () => {
    expect(summerJamPageSource).toContain(
      "validFrom: '2026-05-03T00:00:00+02:00'"
    )
    expect(summerJamPageSource).toContain(
      ".filter((act) => act.name !== 'Open Jam')"
    )
    expect(summerJamPageSource).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(summerJamPageSource).toContain("? 'MusicGroup'")
    expect(summerJamPageSource).toContain(": 'Person'")
  })
})
