import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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
    const { priority, fill, sizes, ...imageProps } = props

    void priority
    void fill
    void sizes

    return React.createElement('img', imageProps)
  },
}))

describe('SiteNav', () => {
  beforeEach(() => {
    mockRouter.pathname = '/'
    mockRouter.asPath = '/'
    window.history.replaceState({}, '', '/')
  })

  it('uses homepage navigation on the homepage', () => {
    render(React.createElement(SiteNav))

    expect(screen.getAllByRole('link', { name: /soundsystem/i })[0]).toHaveAttribute(
      'href',
      '/soundsystem'
    )
    expect(screen.getAllByRole('link', { name: /wonderland/i })[0]).toHaveAttribute(
      'href',
      '/wonderland'
    )
    expect(screen.getAllByRole('link', { name: /photos/i })[0]).toHaveAttribute(
      'href',
      '/wonderland#photos'
    )
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toHaveAttribute(
      'href',
      'mailto:info@boyoscollective.nl'
    )
  })

  it('opens the mobile drawer', () => {
    mockRouter.pathname = '/wonderland'
    mockRouter.asPath = '/wonderland'
    render(React.createElement(SiteNav))

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })

  it('highlights Photos instead of Wonderland at the photo anchor', () => {
    mockRouter.pathname = '/wonderland'
    mockRouter.asPath = '/wonderland#photos'
    window.history.replaceState({}, '', '/wonderland#photos')
    render(React.createElement(SiteNav))

    expect(screen.getAllByRole('link', { name: /^photos$/i })[0]).toHaveClass(
      'nav-link-active'
    )
    expect(
      screen.getAllByRole('link', { name: /^wonderland$/i })[0]
    ).not.toHaveClass('nav-link-active')
  })

  it('keeps Wonderland active at other Wonderland sections', () => {
    mockRouter.pathname = '/wonderland'
    mockRouter.asPath = '/wonderland#events'
    window.history.replaceState({}, '', '/wonderland#events')
    render(React.createElement(SiteNav))

    expect(
      screen.getAllByRole('link', { name: /^wonderland$/i })[0]
    ).toHaveClass('nav-link-active')
    expect(
      screen.getAllByRole('link', { name: /^photos$/i })[0]
    ).not.toHaveClass('nav-link-active')
  })

  it('reads a direct photo hash from the browser location after hydration', () => {
    mockRouter.pathname = '/wonderland'
    mockRouter.asPath = '/wonderland'
    window.history.replaceState({}, '', '/wonderland#photos')
    render(React.createElement(SiteNav))

    expect(screen.getAllByRole('link', { name: /^photos$/i })[0]).toHaveClass(
      'nav-link-active'
    )
    expect(
      screen.getAllByRole('link', { name: /^wonderland$/i })[0]
    ).not.toHaveClass('nav-link-active')
  })
})
