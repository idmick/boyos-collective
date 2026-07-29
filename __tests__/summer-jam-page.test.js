import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import summerJamContent from '../data/summerJam.json'

const summerJamPageSource = readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

describe('Summer Jam page source', () => {
  it('keeps the offer validFrom metadata and current performer schema mapping', () => {
    const schemaPerformers = summerJamContent.page.lineup
      .filter((act) => act.schemaType)
      .map((act) => ({
        type: act.schemaType,
        name: act.schemaName || act.name,
      }))

    expect(summerJamPageSource).toContain(
      "validFrom: '2026-05-03T00:00:00+02:00'"
    )
    expect(summerJamPageSource).toContain('.filter((act) => act.schemaType)')
    expect(summerJamPageSource).toContain('name: act.schemaName || act.name')

    expect(schemaPerformers).toEqual([
      { type: 'Person', name: 'AEV.AYA' },
      { type: 'MusicGroup', name: 'Boyos Soundsystem' },
      { type: 'Person', name: 'Shamis' },
      { type: 'Person', name: 'Tommaso' },
      { type: 'MusicGroup', name: 'UMOJA' },
      { type: 'MusicGroup', name: 'Estafête' },
      { type: 'MusicGroup', name: '.Multibeat' },
      { type: 'Person', name: 'Yasper' },
      { type: 'Person', name: 'Rebiere' },
      { type: 'Person', name: 'Lezaam Beets' },
      { type: 'Person', name: 'D!ma Loginov' },
    ])
  })

  it('keeps partner logos optional for the last partner card', () => {
    expect(summerJamContent.page.partners).toHaveLength(4)
    expect(summerJamContent.page.partnerLogos).toHaveLength(3)
    expect(
      summerJamContent.page.partnerLogos.map((partnerLogo) => partnerLogo.name)
    ).toEqual(
      summerJamContent.page.partners
        .slice(0, summerJamContent.page.partnerLogos.length)
        .map((partner) => partner.name)
    )
    expect(summerJamPageSource).toContain('{partnerLogos[index] ? (')
  })
})
