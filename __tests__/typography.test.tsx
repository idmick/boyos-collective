import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import ButtonLink from '../components/ui/ButtonLink'
import SectionTitle from '../components/ui/SectionTitle'

vi.mock('next/image', () => ({
  default: (props: any) => React.createElement('img', props),
}))

describe('typography roles', () => {
  it('applies shared typography role classes to section headings and controls', () => {
    render(
      <div>
        <SectionTitle eyebrow="The Sound" title="What We Play" />
        <ButtonLink href="/soundsystem">Book Boyos Soundsystem</ButtonLink>
      </div>
    )

    expect(screen.getByText('The Sound')).toHaveClass('eyebrow')
    expect(screen.getByRole('heading', { name: 'What We Play' })).toHaveClass(
      'type-display'
    )
    expect(
      screen.getByRole('link', { name: 'Book Boyos Soundsystem' })
    ).toHaveClass('type-control')
  })
})
