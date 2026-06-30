import fs from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'

const readPage = async (relativePath) =>
  fs.readFile(path.join(process.cwd(), relativePath), 'utf8')

describe('recent page structured-data regressions', () => {
  it('keeps the Soundsystem social preview metadata and served areas wired in source', async () => {
    const source = await readPage('pages/soundsystem.js')

    expect(source).toContain("'https://www.boyoscollective.nl/images/og/boyos-soundsystem.jpg'")
    expect(source).toContain('width: 1200')
    expect(source).toContain('height: 630')
    expect(source).toContain("type: 'image/jpeg'")
    expect(source).toContain("            areaServed: [")
    expect(source).toContain("              'Amsterdam'")
    expect(source).toContain("              'Haarlem'")
    expect(source).toContain("              'The Hague'")
    expect(source).toContain("              'Netherlands'")
  })

  it('keeps the Summer Jam offer timing and performer mapping intact in source', async () => {
    const source = await readPage('pages/wonderland/summer-jam.js')

    expect(source).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
    expect(source).toContain(".filter((act) => act.name !== 'Open Jam')")
    expect(source).toContain("? 'MusicGroup'")
    expect(source).toContain(": 'Person'")
  })
})
