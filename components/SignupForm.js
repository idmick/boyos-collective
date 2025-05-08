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
        style={{ 'text-align': 'left' }}
        className="sender-form-field"
        data-sender-form-id="maf665nwen58jp3njnr"
      ></div>
    </div>
  )
}
