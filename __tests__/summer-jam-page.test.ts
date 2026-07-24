import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import summerJamContent from '../data/summerJam.json'

const pageSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/wonderland/summer-jam.js'),
  'utf8'
)

const lineup = summerJamContent.page.lineup as Array<{
  name: string
  group: string
  image: string
  schemaType?: 'Person' | 'MusicGroup'
}>

describe('Summer Jam event page', () => {
  it('publishes the confirmed garden and afterparty timetable', () => {
    expect(summerJamContent.page.schedule.garden.items).toEqual([
      { time: '13:00', name: 'AEV.AYA' },
      { time: '14:00', name: 'Open Jam' },
      { time: '15:00', name: 'Boyos Soundsystem' },
      { time: '16:00', name: 'Open Jam' },
      { time: '17:00', name: 'Boyos Soundsystem' },
      { time: '18:00', name: 'Open Jam' },
      { time: '19:00', name: 'Shamis' },
      { time: '20:00', name: 'Estafête B2B Shamis' },
      { time: '21:00', name: 'Tommaso' },
      { time: '22:00', name: 'Estafête B2B Tommaso' },
      { time: '23:00', name: 'Garden closes' },
    ])
    expect(summerJamContent.page.schedule.afterparty.items).toEqual([
      { time: '23:00', name: 'UMOJA' },
      { time: '00:00', name: 'Boyos Soundsystem' },
      { time: '02:00', name: 'End' },
    ])
  })

  it('includes all fourteen supplied cards with exact artist identities', () => {
    expect(lineup.map((act) => act.name)).toEqual([
      'AEV.AYA',
      'SYNGA',
      'Boyos Soundsystem',
      'Shamis',
      'Tommaso',
      'UMOJA',
      'Estafête',
      '.Multibeat',
      'Yasper',
      'Rebiere',
      'Lezaam Beets',
      'D!ma Loginov',
      'Ephemeris Records',
      'Team de Boef',
    ])

    expect(lineup.filter((act) => act.group === 'estafete').map((act) => act.name))
      .toEqual([
        'Estafête',
        '.Multibeat',
        'Yasper',
        'Rebiere',
        'Lezaam Beets',
        'D!ma Loginov',
      ])

    lineup.forEach((act) => {
      expect(
        fs.existsSync(path.join(process.cwd(), 'public', act.image))
      ).toBe(true)
    })
  })

  it('keeps admission, ticket and press details exact', () => {
    const practicalCopy = JSON.stringify(
      summerJamContent.page.practicalSections
    )

    expect(summerJamContent.event.ticketUrl).toBe(
      'https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=6ea99d8c-4bc7-4656-a7f6-4157dddba51f'
    )
    expect(summerJamContent.page.finalCta.body).toContain(
      'Late tickets and tickets at the door are €25.'
    )
    expect(practicalCopy).toContain('18+')
    expect(practicalCopy).toContain('no re-entry')
    expect(practicalCopy).toContain('Indoor capacity is limited')
    expect(summerJamContent.page.press.url).toBe(
      'https://3voor12lokaal.vpro.nl/artikelen/summer-jam-bij-houtbaar-waar-estafete-live-acts-uitdaagt-en-warme-dj-sounds-de-overhand-hebben'
    )
  })

  it('emits the corrected event times and only explicit performers', () => {
    const structuredPerformers = lineup
      .filter((act) => act.schemaType)
      .map((act) => act.name)

    expect(structuredPerformers).not.toContain('SYNGA')
    expect(structuredPerformers).not.toContain('Ephemeris Records')
    expect(structuredPerformers).not.toContain('Team de Boef')
    expect(structuredPerformers).toContain('AEV.AYA')
    expect(structuredPerformers).toContain('.Multibeat')

    expect(pageSource).toContain(
      "startDate: '2026-07-25T13:00:00+02:00'"
    )
    expect(pageSource).toContain(
      "endDate: '2026-07-26T02:00:00+02:00'"
    )
    expect(pageSource).not.toContain(
      "endDate: '2026-07-26T03:00:00+02:00'"
    )
    expect(pageSource).toContain('.filter((act) => act.schemaType)')
    expect(pageSource).toContain('name: act.schemaName || act.name')
  })
})
