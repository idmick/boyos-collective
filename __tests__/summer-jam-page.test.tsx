import { render, screen } from '@testing-library/react'
import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import summerJamContent from '../data/summerJam.json'
import SummerJamPage, {
  getStaticProps,
} from '../pages/wonderland/summer-jam'

vi.mock('next/head', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('next/image', () => ({
  default: React.forwardRef<HTMLImageElement, Record<string, unknown>>(
    function MockImage(props, ref) {
      const { priority, fill, sizes, ...imageProps } = props

      void priority
      void fill
      void sizes

      return React.createElement('img', { ...imageProps, ref })
    }
  ),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => React.createElement('a', { href, ...props }, children),
}))

vi.mock('next-seo/pages', () => ({
  generateNextSeo: () => null,
}))

vi.mock('../components/ui/Reveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../components/ui/SiteFooter', () => ({
  default: () => null,
}))

vi.mock('../components/ui/Ticker', () => ({
  default: () => null,
}))

vi.mock('../components/ui/SectionTitle', () => ({
  default: ({ title }: { title: string }) => <h2>{title}</h2>,
}))

const lineup = summerJamContent.page.lineup as Array<{
  name: string
  group: string
  image: string
  schemaName?: string
  schemaType?: 'Person' | 'MusicGroup'
}>

const renderPage = () => {
  const result = getStaticProps()
  render(<SummerJamPage currentEvent={result.props.currentEvent} />)
  return result.props.currentEvent
}

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

  it('includes all supplied artist cards and image assets', () => {
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

    expect(
      lineup
        .filter((act) => act.group === 'estafete')
        .map((act) => act.name)
    ).toEqual([
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

  it('renders the archive CTAs toward the current edition', () => {
    const currentEvent = renderPage()
    const archiveCtas = screen.getAllByRole('link', {
      name: summerJamContent.page.hero.primaryCtaLabel,
    })

    expect(archiveCtas).toHaveLength(2)
    archiveCtas.forEach((link) => {
      expect(link).toHaveAttribute('href', currentEvent.href)
    })
    expect(summerJamContent.page.hero.presentedBy).toContain('Past edition')
    expect(summerJamContent.page.finalCta.eyebrow).toBe('Past edition')
    expect(summerJamContent.page.press.url).toBe(
      'https://3voor12lokaal.vpro.nl/artikelen/summer-jam-bij-houtbaar-waar-estafete-live-acts-uitdaagt-en-warme-dj-sounds-de-overhand-hebben'
    )
  })

  it('emits archive JSON-LD without offers and with explicit performers', () => {
    const result = getStaticProps()
    const { container } = render(
      <SummerJamPage currentEvent={result.props.currentEvent} />
    )
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    )
    const structuredData = JSON.parse(script?.textContent ?? '')
    const expectedPerformers = lineup
      .filter((act) => act.schemaType)
      .map((act) => act.schemaName || act.name)

    expect(structuredData).toEqual(
      expect.objectContaining({
        '@type': 'MusicEvent',
        startDate: '2026-07-25T13:00:00+02:00',
        endDate: '2026-07-26T02:00:00+02:00',
      })
    )
    expect(structuredData).not.toHaveProperty('offers')
    expect(structuredData).not.toHaveProperty('validFrom')
    expect(
      structuredData.performer.map(
        (performer: { name: string }) => performer.name
      )
    ).toEqual(expectedPerformers)
    expect(structuredData.performer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', name: 'AEV.AYA' }),
        expect.objectContaining({ name: '.Multibeat' }),
      ])
    )
    expect(expectedPerformers).not.toContain('SYNGA')
    expect(expectedPerformers).not.toContain('Ephemeris Records')
    expect(expectedPerformers).not.toContain('Team de Boef')
  })
})
