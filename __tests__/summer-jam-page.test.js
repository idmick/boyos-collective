import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const summerJamSource = readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('pages/wonderland/summer-jam.js', () => {
  it('keeps the Summer Jam structured data offer validFrom date', () => {
    expect(summerJamSource).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
  })

  it('filters Open Jam out of the structured data performers', () => {
    expect(summerJamSource).toContain(".filter((act) => act.name !== 'Open Jam')")
  })

  it('maps group acts to MusicGroup and the rest to Person', () => {
    expect(summerJamSource).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(summerJamSource).toContain("? 'MusicGroup'")
    expect(summerJamSource).toContain(": 'Person'")
  })
})
