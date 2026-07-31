import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import wonderlandContent from '../data/wonderland.json'

const homeSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/index.js'),
  'utf8'
)
const wonderlandSource = fs.readFileSync(
  path.join(process.cwd(), 'pages/wonderland.js'),
  'utf8'
)

describe('photo album discovery', () => {
  it('promotes the newest Decap-managed album on the homepage', () => {
    expect(wonderlandContent.albums[0].title).toBe('Summer Jam 25.07.26')
    expect(homeSource).toContain(
      'latestAlbum: wonderlandPageContent.albums[0] ?? null'
    )
    expect(homeSource).toContain('src={latestAlbum.cover}')
    expect(homeSource).toContain('href={latestAlbum.url}')
    expect(homeSource).toContain('href="/wonderland#photos"')
  })

  it('exposes stable Wonderland section anchors', () => {
    for (const anchor of ['story', 'events', 'archive', 'photos']) {
      expect(wonderlandSource).toContain(`id="${anchor}"`)
      expect(wonderlandSource).toContain(`href: '#${anchor}'`)
    }
  })
})
