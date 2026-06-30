import fs from 'fs/promises'
import path from 'path'
import { describe, expect, it } from 'vitest'

const soundsystemPagePath = path.join(process.cwd(), 'pages', 'soundsystem.js')

describe('pages/soundsystem.js', () => {
  it('uses the updated OG image metadata for social previews', async () => {
    const source = await fs.readFile(soundsystemPagePath, 'utf8')

    expect(source).toContain("url: 'https://www.boyoscollective.nl/images/og/boyos-soundsystem.jpg'")
    expect(source).toContain('width: 1200')
    expect(source).toContain('height: 630')
    expect(source).toContain(
      "content:\n                'https://www.boyoscollective.nl/images/og/boyos-soundsystem.jpg'"
    )
  })

  it('keeps booking coverage locations in the MusicGroup structured data', async () => {
    const source = await fs.readFile(soundsystemPagePath, 'utf8')

    expect(source).toContain('areaServed: [')
    expect(source).toContain("'Amsterdam'")
    expect(source).toContain("'Haarlem'")
    expect(source).toContain("'The Hague'")
    expect(source).toContain("'Netherlands'")
  })
})
