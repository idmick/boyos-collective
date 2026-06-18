import { fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RadioPlayer from '../components/RadioPlayer'

vi.mock('../components/Waveform', () => ({
  default: () => React.createElement('div', { 'aria-label': 'Waveform' }),
}))

vi.mock('next/script', () => ({
  default: ({ onReady, ...props }) =>
    React.createElement('button', {
      type: 'button',
      'data-testid': 'soundcloud-script',
      onClick: onReady,
      ...props,
    }),
}))

describe('RadioPlayer', () => {
  beforeEach(() => {
    delete window.SC
  })

  it('renders a fallback message when no channels are provided', () => {
    render(<RadioPlayer channels={[]} />)

    expect(screen.getByText('No channels provided')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
  })

  it('renders the channel selector and playback controls', () => {
    render(
      <RadioPlayer
        channels={[
          { name: 'Essential Groove Radio', url: 'https://soundcloud.com/one' },
          { name: 'Summer Jam Radio', url: 'https://soundcloud.com/two' },
        ]}
      />
    )

    expect(screen.getByRole('button', { name: /select channel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('opens the channel menu and shows all channel options', () => {
    render(
      <RadioPlayer
        channels={[
          { name: 'Essential Groove Radio', url: 'https://soundcloud.com/one' },
          { name: 'Summer Jam Radio', url: 'https://soundcloud.com/two' },
        ]}
      />
    )

    const selector = screen.getByRole('button', { name: /select channel/i })
    fireEvent.click(selector)

    expect(selector).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('menu')

    expect(menu).toBeInTheDocument()
    expect(within(menu).getByText('Essential Groove Radio')).toBeInTheDocument()
    expect(within(menu).getByText('Summer Jam Radio')).toBeInTheDocument()
  })

  it('waits for the SoundCloud script before creating the widget', () => {
    const bind = vi.fn()
    const widget = {
      bind,
      options: { iframe: document.createElement('iframe') },
      unbind: vi.fn(),
    }
    const Widget = vi.fn(() => widget)

    window.SC = {
      Widget,
    }
    window.SC.Widget.Events = {
      READY: 'ready',
      PLAY: 'play',
      PAUSE: 'pause',
      PLAY_PROGRESS: 'progress',
      FINISH: 'finish',
    }

    render(
      <RadioPlayer
        channels={[
          { name: 'Essential Groove Radio', url: 'https://soundcloud.com/one' },
        ]}
      />
    )

    expect(Widget).not.toHaveBeenCalled()

    fireEvent.click(screen.getByTestId('soundcloud-script'))

    expect(Widget).toHaveBeenCalledTimes(1)
    expect(bind).toHaveBeenCalled()
  })
})
