import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

const documentSource = readSource('pages/_document.js')
const appSource = readSource('pages/_app.js')
const signupSource = readSource('components/SignupForm.jsx')
const wonderlandSource = readSource('pages/wonderland.js')
const netlifyConfig = readSource('netlify.toml')
const pagesWithoutSignup = [
  readSource('pages/index.js'),
  readSource('pages/wonderland/club-up-september-2026.js'),
  readSource('pages/wonderland/summer-jam.js'),
]

describe('Sender integration', () => {
  it('loads and initializes the Sender SDK exactly once', () => {
    expect(
      documentSource.match(
        /cdn\.sender\.net\/accounts_resources\/universal\.js/g
      )
    ).toHaveLength(1)
    expect(documentSource).toContain('universal.js?explicit=true')
    expect(documentSource).toContain("sender('d6a4bdbee64934')")
    expect(appSource).not.toContain('universal.js')
  })

  it('uses the confirmed form only on Wonderland', () => {
    expect(signupSource).toContain("SENDER_FORM_ID = 'en58jP'")
    expect(wonderlandSource).toContain(
      "import SignupForm from '../components/SignupForm'"
    )
    expect(wonderlandSource).toContain('<SignupForm />')

    pagesWithoutSignup.forEach((source) => {
      expect(source).not.toContain('SignupForm')
      expect(source).not.toContain('data-sender-form-id')
    })
  })

  it('themes the isolated Sender iframe with the local brand stylesheet', () => {
    expect(signupSource).toContain("SENDER_FORM_STYLESHEET = '/sender-form.css'")
    expect(signupSource).toContain('onRender: themeForm')
    expect(readSource('public/sender-form.css')).toContain(
      "font-family: 'Space Grotesk'"
    )
  })

  it('allows Sender and its reCAPTCHA through the production CSP', () => {
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
