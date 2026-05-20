import { describe, expect, it } from 'vitest'
import seoConfig from '../next-seo.config'

describe('next-seo.config', () => {
  it('uses the updated social preview image metadata', () => {
    expect(seoConfig.openGraph.images).toEqual([
      expect.objectContaining({
        url: 'https://www.boyoscollective.nl/images/og/boyos-collective.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Boyos Collective dancefloor',
      }),
    ])
  })
})
