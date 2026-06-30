import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

const soundsystemPagePath = path.join(process.cwd(), 'pages/soundsystem.js')
const soundsystemPageSource = fs.readFileSync(soundsystemPagePath, 'utf8')

describe('pages/soundsystem.js', () => {
  it('keeps the updated soundsystem social preview image metadata', () => {
    expect(soundsystemPageSource).toContain(
      "url: 'https://www.boyoscollective.nl/images/og/boyos-soundsystem.jpg'"
    )
    expect(soundsystemPageSource).toContain('width: 1200')
    expect(soundsystemPageSource).toContain('height: 630')
    expect(soundsystemPageSource).toContain("type: 'image/jpeg'")
  })

  it('keeps the booking areaServed structured data coverage', () => {
    expect(soundsystemPageSource).toContain('areaServed: [')
    expect(soundsystemPageSource).toContain("'Amsterdam'")
    expect(soundsystemPageSource).toContain("'Haarlem'")
    expect(soundsystemPageSource).toContain("'The Hague'")
    expect(soundsystemPageSource).toContain("'Netherlands'")
  })
})
