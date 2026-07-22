import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const summerJamSource = readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('Summer Jam page source', () => {
  it('keeps the ticket offer validFrom date in event schema', () => {
    expect(summerJamSource).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
  })

  it('excludes Open Jam from performers and preserves group mappings', () => {
    expect(summerJamSource).toContain(".filter((act) => act.name !== 'Open Jam')")
    expect(summerJamSource).toContain("'MusicGroup'")
    expect(summerJamSource).toContain(": 'Person'")
  })
})
