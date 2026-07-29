import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SignupForm, { SENDER_FORM_ID } from '../components/SignupForm'

describe('SignupForm', () => {
  afterEach(() => {
    delete window.senderForms
    delete window.senderFormsLoaded
  })

  it('renders and destroys the configured Sender form', () => {
    const renderForm = vi.fn()
    const destroyForm = vi.fn()
    window.senderFormsLoaded = true
    window.senderForms = {
      render: renderForm,
      destroy: destroyForm,
    }

    const { container, unmount } = render(<SignupForm />)

    expect(
      container.querySelector(`[data-sender-form-id="${SENDER_FORM_ID}"]`)
    ).toBeInTheDocument()
    expect(renderForm).toHaveBeenCalledWith(
      [SENDER_FORM_ID],
      expect.objectContaining({ onRender: expect.any(Function) })
    )

    unmount()

    expect(destroyForm).toHaveBeenCalledWith([SENDER_FORM_ID])
  })

  it('waits for the Sender SDK before rendering', () => {
    const renderForm = vi.fn()
    const destroyForm = vi.fn()

    const { unmount } = render(<SignupForm />)

    window.senderFormsLoaded = true
    window.senderForms = {
      render: renderForm,
      destroy: destroyForm,
    }
    fireEvent(window, new Event('onSenderFormsLoaded'))

    expect(renderForm).toHaveBeenCalledWith(
      [SENDER_FORM_ID],
      expect.objectContaining({ onRender: expect.any(Function) })
    )

    unmount()

    expect(destroyForm).toHaveBeenCalledWith([SENDER_FORM_ID])
  })

  it('loads the Boyos theme into the rendered Sender iframe', () => {
    window.senderFormsLoaded = true
    window.senderForms = {
      render: vi.fn((_formIds, config) => {
        const host = document.querySelector(
          `[data-sender-form-id="${SENDER_FORM_ID}"]`
        )
        const iframe = document.createElement('iframe')
        host.appendChild(iframe)
        iframe.contentDocument.body.innerHTML =
          '<form id="sender-form-content"></form>'
        config.onRender()
      }),
      destroy: vi.fn(),
    }

    const { container } = render(<SignupForm />)
    const iframe = container.querySelector('iframe')
    const stylesheet = iframe.contentDocument.querySelector(
      'link[data-boyos-sender-styles]'
    )

    expect(iframe).toHaveAttribute(
      'title',
      'Keep Wonderland in your inbox'
    )
    expect(stylesheet).toHaveAttribute('href', '/sender-form.css')
  })
})
