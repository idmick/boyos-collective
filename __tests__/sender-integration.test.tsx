import { render } from '@testing-library/react'
import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import SignupForm, { SENDER_FORM_ID } from '../components/SignupForm'
import MyDocument from '../pages/_document'

vi.mock('next/document', () => {
  class MockDocument extends React.Component {
    static async getInitialProps() {
      return {}
    }
  }

  return {
    default: MockDocument,
    Html: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-next-document="html" {...props}>
        {children}
      </div>
    ),
    Head: ({ children }: { children: React.ReactNode }) => (
      <div data-next-document="head">{children}</div>
    ),
    Main: () => <main data-next-document="main" />,
    NextScript: () => <div data-next-document="scripts" />,
  }
})

const readProjectFile = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

describe('Sender integration', () => {
  it('renders and initializes the Sender SDK exactly once in the document', () => {
    const document = new MyDocument({})
    const markup = renderToStaticMarkup(document.render())
    const parsedDocument = new DOMParser().parseFromString(
      markup,
      'text/html'
    )
    const scripts = parsedDocument.querySelectorAll('#sender-universal')

    expect(scripts).toHaveLength(1)
    expect(scripts[0].textContent).toContain(
      'https://cdn.sender.net/accounts_resources/universal.js?explicit=true'
    )
    expect(scripts[0].textContent).toContain("sender('d6a4bdbee64934')")
  })

  it('renders the confirmed Sender form identifier', () => {
    const { container } = render(<SignupForm />)

    expect(SENDER_FORM_ID).toBe('en58jP')
    expect(
      container.querySelector('[data-sender-form-id="en58jP"]')
    ).toBeInTheDocument()
  })

  it('themes the isolated Sender iframe with the local stylesheet', () => {
    expect(readProjectFile('public/sender-form.css')).toContain(
      "font-family: 'Space Grotesk'"
    )
  })

  it('allows Sender and its reCAPTCHA through the production CSP', () => {
    const netlifyConfig = readProjectFile('netlify.toml')

    expect(netlifyConfig).toContain(
      'connect-src \'self\' https://api.github.com https://api.netlify.com https://unpkg.com https://cloudflareinsights.com https://wave.sndcdn.com https://cdn.sender.net https://stats.sender.net https://www.google.com/recaptcha/'
    )
    expect(netlifyConfig).toContain(
      'https://cdn.sender.net https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/'
    )
    expect(netlifyConfig).toContain(
      'https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/'
    )
  })
})
