'use client'

import { useEffect } from 'react'

export const SENDER_FORM_ID = 'en58jP'
const SENDER_FORM_STYLESHEET = '/sender-form.css'

export default function SignupForm() {
  useEffect(() => {
    let formObserver

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
    }

    const renderForm = () => {
      if (!window.senderForms?.render) return
      window.senderForms.render([SENDER_FORM_ID], {
        onRender: themeForm,
      })
    }

    if (window.senderFormsLoaded) {
      renderForm()
    } else {
      window.addEventListener('onSenderFormsLoaded', renderForm)
    }

    return () => {
      formObserver?.disconnect()
      window.removeEventListener('onSenderFormsLoaded', renderForm)
      window.senderForms?.destroy?.([SENDER_FORM_ID])
    }
  }, [])

  return (
    <div className="wonderland-signup-form">
      <div
        className="sender-form-field"
        data-sender-form-id={SENDER_FORM_ID}
      ></div>
    </div>
  )
}
