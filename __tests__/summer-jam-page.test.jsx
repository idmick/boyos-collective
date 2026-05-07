import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import SummerJamPage from '../pages/wonderland/summer-jam'

vi.mock('next/head', () => ({
  default: ({ children }) => <>{children}</>,
}))

vi.mock('next/image', () => ({
  default: ({ fill, priority, ...props }) => React.createElement('img', props),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }) =>
    React.createElement('a', { href, ...props }, children),
}))

vi.mock('next-seo/pages', () => ({
  generateNextSeo: ({
    title,
    description,
    canonical,
    additionalMetaTags = [],
    openGraph,
    twitter,
  }) => (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {additionalMetaTags.map((tag) => (
        <meta key={tag.name} {...tag} />
      ))}
      <meta property="og:title" content={openGraph?.title} />
      <meta property="og:image" content={openGraph?.images?.[0]?.url} />
      <meta name="twitter:card" content={twitter?.cardType} />
    </>
  ),
}))

describe('SummerJamPage', () => {
  it('renders CMS-driven metadata and updated summer jam content', () => {
    const { container } = render(<SummerJamPage />)

    expect(
      screen.getAllByRole('link', { name: 'Follow the build-up' })
    ).toHaveLength(2)
    expect(
      screen.getAllByRole('link', { name: 'Tickets from €20' })
    ).toHaveLength(2)
    screen
      .getAllByRole('link', { name: 'Tickets from €20' })
      .forEach((link) =>
        expect(link).toHaveAttribute(
          'href',
          'https://shop.weeztix.com/1e3b52ff-0405-11ec-b3c4-9e36bf7d673e/tickets?shop_code=mv8kegk9&event=6ea99d8c-4bc7-4656-a7f6-4157dddba51f'
        )
      )

    expect(screen.getByText('Good To Know')).toBeInTheDocument()
    expect(screen.getByText('Woudplein 2, 2031CZ Haarlem')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Powered by Oshi' })
    ).toBeInTheDocument()

    const syngaImage = screen.getByRole('img', { name: 'SYNGA' })
    expect(syngaImage).toHaveStyle({ objectPosition: 'center 18%' })

    const script = container.querySelector('script[type="application/ld+json"]')
    const structuredData = JSON.parse(script.textContent)

    expect(structuredData.image).toEqual([
      'https://www.boyoscollective.nl/images/summer-jam-poster.png',
    ])
    expect(structuredData.performer.map((performer) => performer.name)).toContain(
      'SYNGA'
    )
    expect(
      structuredData.performer.map((performer) => performer.name)
    ).not.toContain('Open Jam')

    expect(
      container.querySelector('meta[name="twitter:image"]')
    ).toHaveAttribute(
      'content',
      'https://www.boyoscollective.nl/images/summer-jam-poster.png'
    )
    expect(
      container.querySelector('meta[property="og:title"]')
    ).toHaveAttribute(
      'content',
      'Summer Jam Haarlem | Boyos Wonderland x INI Movement'
    )
    expect(container.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    )
  })
})
