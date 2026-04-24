import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import SiteNav from '../components/ui/SiteNav'

const mockRouter = vi.hoisted(() => ({
  pathname: '/',
  asPath: '/',
}))

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}))

vi.mock('next/image', () => ({
  default: (props: any) => {
    return React.createElement('img', props)
  },
}))

describe('SiteNav', () => {
  it('uses homepage navigation on the homepage', () => {
    mockRouter.pathname = '/'
    render(React.createElement(SiteNav))

    expect(screen.getAllByRole('link', { name: /soundsystem/i })[0]).toHaveAttribute(
      'href',
      '/soundsystem'
    )
    expect(screen.getAllByRole('link', { name: /wonderland/i })[0]).toHaveAttribute(
      'href',
      '/wonderland'
    )
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toHaveAttribute(
      'href',
      'mailto:info@boyoscollective.nl'
    )
  })

  it('opens the mobile drawer', () => {
    mockRouter.pathname = '/wonderland'
    render(React.createElement(SiteNav))

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })
})
