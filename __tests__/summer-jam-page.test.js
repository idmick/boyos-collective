import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const summerJamPageSource = readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('Summer Jam page source', () => {
  it('removes active offers and keeps explicit performer schema mapping', () => {
    expect(summerJamPageSource).not.toContain('offers:')
    expect(summerJamPageSource).not.toContain('validFrom:')
    expect(summerJamPageSource).toContain(
      '.filter((act) => act.schemaType)'
    )
    expect(summerJamPageSource).toContain("'@type': act.schemaType")
    expect(summerJamPageSource).toContain(
      'name: act.schemaName || act.name'
    )
  })
})
