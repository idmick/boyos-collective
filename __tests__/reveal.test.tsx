import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Reveal from '../components/ui/Reveal'

describe('Reveal', () => {
  it('applies the shared reveal variant classes', () => {
    render(
      <Reveal variant="card" delay="short">
        <div>Artist card</div>
      </Reveal>
    )

    const wrapper = screen.getByText('Artist card').parentElement

    expect(wrapper).toHaveClass('reveal')
    expect(wrapper).toHaveClass('reveal-card')
    expect(wrapper).toHaveClass('reveal-delay-short')
  })
})
