'use client'

import { useEffect } from 'react'

export default function SignupForm() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.sender) {
      window.sender('load')
    }
  }, [])

  return (
    <div className="my-10">
      <div
        style={{ textAlign: 'left' }}
        className="sender-form-field"
        data-sender-form-id={process.env.NEXT_PUBLIC_SENDER_FORM_ID}
      ></div>
    </div>
  )
}
