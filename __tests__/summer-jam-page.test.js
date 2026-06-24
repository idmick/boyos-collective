import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const summerJamPagePath = path.join(
  process.cwd(),
  'pages',
  'wonderland',
  'summer-jam.js'
)

describe('summer jam page source', () => {
  it('pins the structured-data offer and performer mapping', () => {
    const source = readFileSync(summerJamPagePath, 'utf8')

    expect(source).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
    expect(source).toContain(".filter((act) => act.name !== 'Open Jam')")
    expect(source).toContain(
      "'@type': ['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(source).toContain("? 'MusicGroup'")
    expect(source).toContain(": 'Person'")
  })
})
