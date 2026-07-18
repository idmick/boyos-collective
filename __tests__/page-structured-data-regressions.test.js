import fs from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'

const readPageSource = async (relativePath) =>
  fs.readFile(path.join(process.cwd(), relativePath), 'utf8')

describe('page structured data regressions', () => {
  it('keeps the Soundsystem social preview image and service area metadata', async () => {
    const source = await readPageSource('pages/soundsystem.js')

    expect(source).toContain(
      "url: 'https://www.boyoscollective.nl/images/og/boyos-soundsystem.jpg'"
    )
    expect(source).toContain('width: 1200')
    expect(source).toContain('height: 630')
    expect(source).toContain("type: 'image/jpeg'")
    expect(source).toContain("alt: 'Boyos Soundsystem'")
    expect(source).toContain("areaServed: [")
    expect(source).toContain("'Amsterdam'")
    expect(source).toContain("'Haarlem'")
    expect(source).toContain("'The Hague'")
    expect(source).toContain("'Netherlands'")
  })

  it('keeps the Summer Jam offer window and performer schema mapping', async () => {
    const source = await readPageSource('pages/wonderland/summer-jam.js')

    expect(source).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
    expect(source).toContain(".filter((act) => act.name !== 'Open Jam')")
    expect(source).toContain(
      "['Estafête', 'UMOJA', 'Boyos Soundsystem'].includes("
    )
    expect(source).toContain("? 'MusicGroup'")
    expect(source).toContain(": 'Person'")
  })
})
