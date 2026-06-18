import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Summer Jam structured data source', () => {
  it('keeps the Summer Jam offer validFrom date in the page schema', () => {
    const pageSource = fs.readFileSync(
      path.resolve(__dirname, '../pages/wonderland/summer-jam.js'),
      'utf8'
    )

    expect(pageSource).toContain("validFrom: '2026-05-03T00:00:00+02:00'")
  })
})
