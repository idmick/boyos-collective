import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const pagePath = path.join(process.cwd(), 'pages/wonderland/summer-jam.js')

describe('summer-jam page structured data', () => {
  it('includes the ticket offer validFrom date and performer mapping guards', async () => {
    const source = await fs.readFile(pagePath, 'utf8')

    expect(source).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
    expect(source).toContain(".filter((act) => act.name !== 'Open Jam')")
    expect(source).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(source).toContain("? 'MusicGroup'")
    expect(source).toContain(": 'Person'")
  })
})
