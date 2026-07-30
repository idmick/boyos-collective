'use client'

import { useEffect, useState } from 'react'

export const SENDER_FORM_ID = 'en58jP'
export const SENDER_FORM_LOAD_TIMEOUT_MS = 8000
const SENDER_FORM_STYLESHEET = '/sender-form.css'

export default function SignupForm() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let formObserver
    let isUnmounted = false
    let loadTimeout

    const themeForm = () => {
      const host = document.querySelector(
        `[data-sender-form-id="${SENDER_FORM_ID}"]`
      )
      const iframe = host?.querySelector('iframe')
      const iframeDocument = iframe?.contentDocument

      if (!iframe || !iframeDocument) return

      iframe.title = 'Keep Wonderland in your inbox'
      iframe.style.width = '100%'
      iframe.style.borderRadius = '0'

      const syncHeight = () => {
        const form = iframeDocument.querySelector('#sender-form-content')
        if (!form) return

        const height = Math.ceil(form.getBoundingClientRect().height)
        if (height > 0) iframe.style.height = `${height}px`
      }

      let stylesheet = iframeDocument.querySelector(
        'link[data-boyos-sender-styles]'
      )

      if (!stylesheet) {
        stylesheet = iframeDocument.createElement('link')
        stylesheet.rel = 'stylesheet'
        stylesheet.href = SENDER_FORM_STYLESHEET
        stylesheet.dataset.boyosSenderStyles = 'true'
        stylesheet.addEventListener('load', syncHeight, { once: true })
        iframeDocument.head.appendChild(stylesheet)
      }

      formObserver?.disconnect()
      formObserver = new MutationObserver(syncHeight)
      formObserver.observe(iframeDocument.body, {
        attributes: true,
        childList: true,
        subtree: true,
      })

      window.requestAnimationFrame(syncHeight)
      window.clearTimeout(loadTimeout)
      if (!isUnmounted) setStatus('ready')
    }

    const renderForm = () => {
      if (!window.senderForms?.render) return

      try {
        window.senderForms.render([SENDER_FORM_ID], {
          onRender: themeForm,
        })
      } catch {
        window.clearTimeout(loadTimeout)
        if (!isUnmounted) setStatus('unavailable')
      }
    }

    loadTimeout = window.setTimeout(() => {
      if (!isUnmounted) setStatus('unavailable')
    }, SENDER_FORM_LOAD_TIMEOUT_MS)

    if (window.senderFormsLoaded) {
      renderForm()
    } else {
      window.addEventListener('onSenderFormsLoaded', renderForm)
    }

    return () => {
      isUnmounted = true
      window.clearTimeout(loadTimeout)
      formObserver?.disconnect()
      window.removeEventListener('onSenderFormsLoaded', renderForm)
      window.senderForms?.destroy?.([SENDER_FORM_ID])
    }
  }, [])

  return (
    <div
      className="wonderland-signup-form"
      data-status={status}
      aria-busy={status === 'loading'}
    >
      <div
        className="sender-form-field"
        data-sender-form-id={SENDER_FORM_ID}
      ></div>
      {status === 'loading' && (
        <p className="wonderland-signup-status" role="status">
          Loading the email form…
        </p>
      )}
      {status === 'unavailable' && (
        <div className="wonderland-signup-fallback" role="status">
          <p className="wonderland-signup-fallback-title">
            The email form couldn&apos;t load.
          </p>
          <p>
            Your browser may be blocking Sender. Allow it for this page and
            reload, or use the WhatsApp link in this section.
          </p>
        </div>
      )}
    </div>
  )
}
